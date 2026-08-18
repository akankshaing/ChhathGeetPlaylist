"use client";

type VolumeControlProps = {
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
  compact?: boolean;
};

function SpeakerIcon({ volume, muted }: { volume: number; muted: boolean }) {
  const silent = muted || volume === 0;
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9v6h4l5 5V4L8 9H4Z"
        fill="currentColor"
      />
      {!silent && (
        <path
          d="M16.5 8.5a5 5 0 0 1 0 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
      {!silent && volume > 55 && (
        <path
          d="M19 5.5a9 9 0 0 1 0 13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
      )}
      {silent && (
        <path
          d="M16 9l4 6M20 9l-4 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function VolumeControl({ volume, muted, onVolumeChange, onToggleMute, compact = false }: VolumeControlProps) {
  return (
    <div className={`flex items-center gap-1.5 ${compact ? "" : "min-w-[6.5rem]"}`}>
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
        aria-pressed={muted}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <SpeakerIcon volume={volume} muted={muted} />
      </button>
      {!compact && (
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          aria-label="Volume"
          className="h-5 w-16 cursor-pointer accent-[var(--accent)]"
        />
      )}
    </div>
  );
}
