"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";

type SeekBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
};

export function SeekBar({ currentTime, duration, onSeek, className = "" }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragRatio, setDragRatio] = useState<number | null>(null);

  const ratioFromEvent = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const ratio = ratioFromEvent(e.clientX);
      setDragRatio(ratio);
    },
    [ratioFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (dragRatio === null) return;
      setDragRatio(ratioFromEvent(e.clientX));
    },
    [dragRatio, ratioFromEvent]
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (dragRatio === null) return;
      const ratio = ratioFromEvent(e.clientX);
      e.currentTarget.releasePointerCapture(e.pointerId);
      onSeek(ratio * (duration || 0));
      setDragRatio(null);
    },
    [dragRatio, duration, onSeek, ratioFromEvent]
  );

  const playedRatio = dragRatio ?? (duration > 0 ? currentTime / duration : 0);

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(currentTime)}
      className={`group relative flex h-6 touch-none items-center ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="relative h-[3px] w-full overflow-visible rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)] shadow-[0_0_10px_2px_var(--accent-soft)]"
          style={{ width: `${playedRatio * 100}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-0 shadow-[0_0_6px_1px_var(--accent-soft)] transition-opacity duration-150 group-hover:opacity-100"
          style={{ left: `${playedRatio * 100}%` }}
        />
      </div>
    </div>
  );
}
