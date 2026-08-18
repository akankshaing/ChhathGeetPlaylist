"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./youtube-types";

let apiPromise: Promise<void> | null = null;

function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);
  });

  return apiPromise;
}

const DEFAULT_VOLUME = 80;

type PendingLoad = { videoId: string; options?: { autoplay?: boolean } };

export function useYouTubePlayer() {
  const playerRef = useRef<YT.Player | null>(null);
  // hostRef holds a plain DOM node created outside React so we can move
  // it between the desktop and mobile vinyl slots on breakpoint changes
  // without React ever unmounting/remounting the iframe underneath it.
  const hostRef = useRef<HTMLDivElement | null>(null);
  const currentVideoIdRef = useRef<string | null>(null);
  const onEndedRef = useRef<() => void>(() => {});
  const onErrorRef = useRef<(code: number, videoId: string) => void>(() => {});

  // The YT.Player object exists synchronously after `new YT.Player(...)`,
  // but its methods (loadVideoById, playVideo, etc.) aren't actually bound
  // until the API's internal onReady handshake finishes. `isReady` state is
  // fine for render/UI, but a `useCallback`-memoized function like
  // `loadTrack` can be invoked from an effect that ran before this state
  // update ever flowed back through, so it needs a ref it can check
  // synchronously instead of a possibly-stale closure over `isReady`.
  const isReadyRef = useRef(false);
  // If `loadTrack` is called before the player is ready, we can't drop the
  // request on the floor — queue it and flush it as soon as onReady fires.
  const pendingLoadRef = useRef<PendingLoad | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    const host = document.createElement("div");
    host.style.width = "100%";
    host.style.height = "100%";
    host.setAttribute("data-yt-host", "true");
    hostRef.current = host;

    let cancelled = false;

    loadYouTubeIframeAPI().then(() => {
      if (cancelled || !hostRef.current) return;
      const mountPoint = document.createElement("div");
      mountPoint.style.width = "100%";
      mountPoint.style.height = "100%";
      hostRef.current.appendChild(mountPoint);

      playerRef.current = new window.YT.Player(mountPoint, {
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(DEFAULT_VOLUME);
            isReadyRef.current = true;
            setIsReady(true);

            // Flush whatever loadTrack call arrived before we got here.
            const pending = pendingLoadRef.current;
            if (pending) {
              pendingLoadRef.current = null;
              if (pending.options?.autoplay === false) {
                event.target.cueVideoById(pending.videoId);
              } else {
                event.target.loadVideoById(pending.videoId);
              }
            }
          },
          onStateChange: (event) => {
            const state = event.data;
            if (state === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setDuration(event.target.getDuration());
            } else if (state === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (state === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              onEndedRef.current();
            }
          },
          onError: (event) => {
            onErrorRef.current(event.data, currentVideoIdRef.current ?? "");
          },
        },
      });
    });

    return () => {
      cancelled = true;
      isReadyRef.current = false;
      pendingLoadRef.current = null;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 400);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  /** Move the live iframe into whichever vinyl slot is currently visible. */
  const attachTo = useCallback((container: HTMLElement | null) => {
    if (!container || !hostRef.current) return;
    if (hostRef.current.parentElement !== container) {
      container.appendChild(hostRef.current);
    }
  }, []);

  const loadTrack = useCallback((videoId: string, options?: { autoplay?: boolean }) => {
    currentVideoIdRef.current = videoId;
    setCurrentTime(0);
    setDuration(0);

    if (!playerRef.current || !isReadyRef.current) {
      // Player isn't constructed yet, or is constructed but the onReady
      // handshake hasn't completed — loadVideoById/cueVideoById would be
      // undefined or a no-op right now. Queue it; onReady will flush it.
      pendingLoadRef.current = { videoId, options };
      return;
    }

    // A queued load is now stale since a newer one just arrived synchronously.
    pendingLoadRef.current = null;

    if (options?.autoplay === false) {
      playerRef.current.cueVideoById(videoId);
    } else {
      playerRef.current.loadVideoById(videoId);
    }
  }, []);

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);

  const setVolume = useCallback(
    (nextVolume: number) => {
      playerRef.current?.setVolume(nextVolume);
      setVolumeState(nextVolume);
      if (nextVolume === 0 && !muted) {
        playerRef.current?.mute();
        setMutedState(true);
      } else if (nextVolume > 0 && muted) {
        playerRef.current?.unMute();
        setMutedState(false);
      }
    },
    [muted]
  );

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      setMutedState(false);
    } else {
      playerRef.current.mute();
      setMutedState(true);
    }
  }, [muted]);

  const setOnEnded = useCallback((fn: () => void) => {
    onEndedRef.current = fn;
  }, []);

  const setOnError = useCallback((fn: (code: number, videoId: string) => void) => {
    onErrorRef.current = fn;
  }, []);

  return {
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    attachTo,
    loadTrack,
    play,
    pause,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    setOnEnded,
    setOnError,
  };
}