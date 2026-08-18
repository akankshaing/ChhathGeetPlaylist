"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Background } from "@/components/background";
import { GrainOverlay } from "@/components/grain-overlay";
import { PlaylistSelector } from "@/components/playlist-selector";
import { TopRow } from "@/components/top-row/top-row";
import { DesktopPlayer } from "@/components/player/desktop-player";
import { MobilePlayer } from "@/components/player/mobile-player";
import { SongListModal } from "@/components/player/song-list-modal";
import { useYouTubePlayer } from "@/components/player/use-youtube-player";
import { playlists, sceneCopy, type SceneKey } from "@/lib/playlists";
import { trackEvent } from "@/lib/analytics";

const DESKTOP_QUERY = "(min-width: 640px)";

function pickShuffleIndex(length: number, exclude: number, recentlyPlayed: Set<number>) {
  if (length <= 1) return 0;
  const candidates = Array.from({ length }, (_, i) => i).filter(
    (i) => i !== exclude && !recentlyPlayed.has(i)
  );
  const pool = candidates.length > 0 ? candidates : Array.from({ length }, (_, i) => i).filter((i) => i !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function Home() {
  const [scene, setScene] = useState<SceneKey>("morning");
  const [indexByScene, setIndexByScene] = useState<Record<SceneKey, number>>({
    morning: 0,
    evening: 0,
    night: 0,
  });
  const [shuffleOn, setShuffleOn] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const shuffleHistoryRef = useRef<Record<SceneKey, Set<number>>>({
    morning: new Set(),
    evening: new Set(),
    night: new Set(),
  });

  const desktopVinylMount = useRef<HTMLDivElement | null>(null);
  const mobileVinylMount = useRef<HTMLDivElement | null>(null);
  const hasLoadedFirstTrack = useRef(false);

  const player = useYouTubePlayer();

  const sceneRef = useRef(scene);
  const indexRef = useRef(indexByScene);
  const shuffleOnRef = useRef(shuffleOn);
  sceneRef.current = scene;
  indexRef.current = indexByScene;
  shuffleOnRef.current = shuffleOn;

  const currentTrack = playlists[scene][indexByScene[scene]];

  const { attachTo, loadTrack, setOnEnded, setOnError, togglePlay, seekTo, setVolume, toggleMute } = player;

  const attachVinylForBreakpoint = useCallback(
    (isDesktop: boolean) => {
      attachTo(isDesktop ? desktopVinylMount.current : mobileVinylMount.current);
    },
    [attachTo]
  );

  // Reparent the single live YouTube iframe between the desktop and
  // mobile vinyl slots as the viewport crosses the sm breakpoint.
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    attachVinylForBreakpoint(mql.matches);
    const handler = (e: MediaQueryListEvent) => attachVinylForBreakpoint(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [attachVinylForBreakpoint]);

  // Cue (don't autoplay) the very first track once the player is ready.
  useEffect(() => {
    if (player.isReady && !hasLoadedFirstTrack.current) {
      hasLoadedFirstTrack.current = true;
      loadTrack(currentTrack.videoId, { autoplay: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.isReady, loadTrack]);

  const goToIndex = useCallback(
    (targetScene: SceneKey, nextIndex: number, opts?: { autoplay?: boolean }) => {
      const track = playlists[targetScene][nextIndex];
      setIndexByScene((prev) => ({ ...prev, [targetScene]: nextIndex }));
      loadTrack(track.videoId, { autoplay: opts?.autoplay ?? true });
      trackEvent({ name: "track_started", scene: targetScene, trackId: track.id, title: track.title });
    },
    [loadTrack]
  );

  const handleSelectScene = useCallback(
    (nextScene: SceneKey) => {
      if (nextScene === scene) return;
      shuffleHistoryRef.current[nextScene] = new Set();
      setScene(nextScene);
      trackEvent({ name: "playlist_selected", scene: nextScene });
      goToIndex(nextScene, 0, { autoplay: true });
    },
    [scene, goToIndex]
  );

  const advance = useCallback(
    (direction: "next" | "previous", via: "manual" | "auto" = "manual") => {
      const activeScene = sceneRef.current;
      const list = playlists[activeScene];
      const current = indexRef.current[activeScene];

      if (direction === "next") {
        let nextIndex: number;
        if (shuffleOnRef.current) {
          const history = shuffleHistoryRef.current[activeScene];
          nextIndex = pickShuffleIndex(list.length, current, history);
          history.add(current);
          if (history.size >= list.length) history.clear();
        } else {
          nextIndex = (current + 1) % list.length;
        }
        goToIndex(activeScene, nextIndex, { autoplay: true });
        trackEvent({ name: "track_next", scene: activeScene, trackId: list[nextIndex].id, via });
      } else {
        const prevIndex = (current - 1 + list.length) % list.length;
        goToIndex(activeScene, prevIndex, { autoplay: true });
        trackEvent({ name: "track_previous", scene: activeScene, trackId: list[prevIndex].id });
      }
    },
    [goToIndex]
  );

  // Wire player-ended / error callbacks once.
  useEffect(() => {
    setOnEnded(() => {
      const activeScene = sceneRef.current;
      const list = playlists[activeScene];
      const current = indexRef.current[activeScene];
      trackEvent({ name: "track_completed", scene: activeScene, trackId: list[current].id, title: list[current].title });
      advance("next", "auto");
    });
    setOnError((code, videoId) => {
      trackEvent({ name: "playback_error", scene: sceneRef.current, videoId, code });
      advance("next", "auto");
    });
  }, [advance, setOnEnded, setOnError]);

  // Global spacebar play/pause, ignoring form fields.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isEditable =
        target?.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (isEditable) return;
      e.preventDefault();
      togglePlay();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [togglePlay]);

  const handleToggleShuffle = useCallback(() => {
    setShuffleOn((prev) => {
      const next = !prev;
      trackEvent({ name: "shuffle_toggled", scene: sceneRef.current, enabled: next });
      return next;
    });
  }, []);

  const handleSelectTrack = useCallback(
    (index: number) => {
      goToIndex(scene, index, { autoplay: true });
      setShowPlaylist(false);
    },
    [goToIndex, scene]
  );

  const handleVolumeChange = useCallback(
    (v: number) => {
      setVolume(v);
      trackEvent({ name: "volume_changed", volume: v, muted: v === 0 });
    },
    [setVolume]
  );

  const handleToggleMute = useCallback(() => {
    const willBeMuted = !player.muted;
    toggleMute();
    trackEvent({ name: "volume_changed", volume: player.volume, muted: willBeMuted });
  }, [toggleMute, player.muted, player.volume]);

  return (
    <main
      data-scene={scene}
      className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden"
    >
      <Background scene={scene} />
      <GrainOverlay />
      <TopRow />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
        <h1 className="max-w-xl font-display text-3xl font-medium text-cream sm:text-4xl">
          Chhath Radio
        </h1>
        <PlaylistSelector scene={scene} onChange={handleSelectScene} />
      </div>

      <div className="safe-b flex w-full justify-center px-4 pb-2">
        <DesktopPlayer
          track={currentTrack}
          isPlaying={player.isPlaying}
          currentTime={player.currentTime}
          duration={player.duration}
          onTogglePlay={togglePlay}
          onSeek={seekTo}
          onPrevious={() => advance("previous")}
          onNext={() => advance("next")}
          shuffleOn={shuffleOn}
          onToggleShuffle={handleToggleShuffle}
          volume={player.volume}
          muted={player.muted}
          onVolumeChange={handleVolumeChange}
          onToggleMute={handleToggleMute}
          onOpenPlaylist={() => setShowPlaylist(true)}
          vinylMountRef={(node) => {
            desktopVinylMount.current = node;
          }}
        />
        <MobilePlayer
          track={currentTrack}
          isPlaying={player.isPlaying}
          currentTime={player.currentTime}
          duration={player.duration}
          onTogglePlay={togglePlay}
          onSeek={seekTo}
          onPrevious={() => advance("previous")}
          onNext={() => advance("next")}
          shuffleOn={shuffleOn}
          onToggleShuffle={handleToggleShuffle}
          volume={player.volume}
          muted={player.muted}
          onVolumeChange={handleVolumeChange}
          onToggleMute={handleToggleMute}
          onOpenPlaylist={() => setShowPlaylist(true)}
          vinylMountRef={(node) => {
            mobileVinylMount.current = node;
          }}
        />
      </div>

      <SongListModal
        open={showPlaylist}
        onClose={() => setShowPlaylist(false)}
        sceneLabel={sceneCopy[scene].label}
        tracks={playlists[scene]}
        currentTrackId={currentTrack.id}
        isPlaying={player.isPlaying}
        onSelect={handleSelectTrack}
      />
    </main>
  );
}
