"use client";

import type { Track } from "@/lib/playlists";
import { GLASS } from "../glass";
import { ListIcon } from "./icons";
import { SeekBar } from "./seek-bar";
import { TransportControls } from "./transport-controls";
import { Vinyl } from "./vinyl";
import { VolumeControl } from "./volume-control";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type DesktopPlayerProps = {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onSeek: (s: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  shuffleOn: boolean;
  onToggleShuffle: () => void;
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
  onOpenPlaylist: () => void;
  vinylMountRef: (node: HTMLDivElement | null) => void;
};

export function DesktopPlayer({
  track,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onSeek,
  onPrevious,
  onNext,
  shuffleOn,
  onToggleShuffle,
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  onOpenPlaylist,
  vinylMountRef,
}: DesktopPlayerProps) {
  return (
    <div
      className={`hidden sm:flex w-full max-w-2xl items-center gap-3 rounded-full p-2 pr-3.5 ${GLASS}`}
    >
      <Vinyl size={52} isPlaying={isPlaying} vinylMountRef={vinylMountRef} />

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[13.5px] font-semibold leading-tight text-cream">
          {track.title}
        </p>
        <p className="truncate text-[11px] text-white/70">{track.artist}</p>
        <div className="mt-1 flex items-center gap-2">
          <SeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} className="flex-1" />
        </div>
        <div className="mt-0.5 flex justify-between font-utility text-[10px] tabular text-white/55">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <TransportControls
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onPrevious={onPrevious}
        onNext={onNext}
        shuffleOn={shuffleOn}
        onToggleShuffle={onToggleShuffle}
        playButtonSize={38}
        sideButtonSize={30}
      />

      <div className="h-5 w-px bg-white/10" />

      <VolumeControl
        volume={volume}
        muted={muted}
        onVolumeChange={onVolumeChange}
        onToggleMute={onToggleMute}
      />

      <button
        type="button"
        onClick={onOpenPlaylist}
        aria-label="View all songs"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <ListIcon size={16} />
      </button>
    </div>
  );
}
