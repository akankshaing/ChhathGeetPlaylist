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

type MobilePlayerProps = {
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

export function MobilePlayer({
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
}: MobilePlayerProps) {
  return (
    <div className={`sm:hidden w-full rounded-[20px] p-3 ${GLASS}`}>
      <div className="flex items-center gap-2.5">
        <Vinyl size={46} isPlaying={isPlaying} vinylMountRef={vinylMountRef} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[13.5px] font-semibold leading-tight text-cream">
            {track.title}
          </p>
          <p className="truncate text-[11px] text-white/70">{track.artist}</p>
        </div>
        <VolumeControl volume={volume} muted={muted} onVolumeChange={onVolumeChange} onToggleMute={onToggleMute} compact />
        <button
          type="button"
          onClick={onOpenPlaylist}
          aria-label="View all songs"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <ListIcon size={16} />
        </button>
      </div>

      <div className="mt-2">
        <SeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />
      </div>

      <div className="mt-0.5 flex items-center justify-between">
        <span className="font-utility text-[10px] tabular text-white/55">{formatTime(currentTime)}</span>
        <TransportControls
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onPrevious={onPrevious}
          onNext={onNext}
          shuffleOn={shuffleOn}
          onToggleShuffle={onToggleShuffle}
          playButtonSize={42}
          sideButtonSize={36}
          gapClassName="gap-1.5"
        />
        <span className="font-utility text-[10px] tabular text-white/55">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
