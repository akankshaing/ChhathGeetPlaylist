"use client";

import { NextIcon, PauseIcon, PlayIcon, PreviousIcon, ShuffleIcon } from "./icons";

type TransportControlsProps = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  shuffleOn: boolean;
  onToggleShuffle: () => void;
  playButtonSize?: number;
  sideButtonSize?: number;
  gapClassName?: string;
};

export function TransportControls({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  shuffleOn,
  onToggleShuffle,
  playButtonSize = 38,
  sideButtonSize = 32,
  gapClassName = "gap-1",
}: TransportControlsProps) {
  const sideIconSize = Math.round(sideButtonSize * 0.5);

  return (
    <div className={`flex items-center ${gapClassName}`}>
      <button
        type="button"
        onClick={onToggleShuffle}
        aria-label="Shuffle"
        aria-pressed={shuffleOn}
        style={{ width: sideButtonSize, height: sideButtonSize }}
        className={`flex items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
          shuffleOn ? "text-[var(--accent)]" : "text-white/70 hover:text-white"
        }`}
      >
        <ShuffleIcon size={sideIconSize} />
      </button>

      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous track"
        style={{ width: sideButtonSize, height: sideButtonSize }}
        className="flex items-center justify-center rounded-full text-white/85 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <PreviousIcon size={sideIconSize} />
      </button>

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_70%,black)] text-ink ring-1 ring-white/25 shadow-[0_8px_20px_-6px_var(--accent-soft)] transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ width: playButtonSize, height: playButtonSize }}
      >
        {isPlaying ? <PauseIcon size={playButtonSize * 0.42} /> : <PlayIcon size={playButtonSize * 0.42} />}
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        style={{ width: sideButtonSize, height: sideButtonSize }}
        className="flex items-center justify-center rounded-full text-white/85 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <NextIcon size={sideIconSize} />
      </button>
    </div>
  );
}
