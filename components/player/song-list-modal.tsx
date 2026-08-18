"use client";

import { useEffect, useRef } from "react";
import type { Track } from "@/lib/playlists";
import { GLASS } from "../glass";
import { CloseIcon, PlayingIndicatorIcon } from "./icons";

type SongListModalProps = {
  open: boolean;
  onClose: () => void;
  sceneLabel: string;
  tracks: Track[];
  currentTrackId: string;
  isPlaying: boolean;
  onSelect: (index: number) => void;
};

export function SongListModal({
  open,
  onClose,
  sceneLabel,
  tracks,
  currentTrackId,
  isPlaying,
  onSelect,
}: SongListModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${sceneLabel} playlist`}
        className={`animate-rise flex max-h-[75vh] w-full max-w-md flex-col rounded-t-[28px] sm:rounded-[24px] ${GLASS}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-utility text-[10px] uppercase tracking-[0.25em] text-white/50">
              {sceneLabel} playlist
            </p>
            <p className="font-display text-lg text-cream">{tracks.length} songs</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close playlist"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
          {tracks.map((track, index) => {
            const active = track.id === currentTrackId;
            return (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                    active ? "bg-white/10" : "hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center font-utility text-xs tabular text-white/45">
                    {active ? (
                      <span className="text-[var(--accent)]">
                        <PlayingIndicatorIcon />
                      </span>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[14px] font-semibold ${
                        active ? "text-[var(--accent)]" : "text-cream"
                      }`}
                    >
                      {track.title}
                    </span>
                    <span className="block truncate text-[12px] text-white/60">{track.artist}</span>
                  </span>
                  {active && isPlaying && (
                    <span className="sr-only">Now playing</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
