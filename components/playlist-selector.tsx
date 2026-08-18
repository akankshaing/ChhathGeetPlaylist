"use client";

import { GLASS } from "./glass";
import type { SceneKey } from "@/lib/playlists";

const OPTIONS: SceneKey[] = ["morning", "evening", "night"];
const LABELS: Record<SceneKey, string> = {
  morning: "Morning",
  evening: "Evening",
  night: "Night",
};

function FlameGlyph() {
  return (
    <svg
      width="9"
      height="12"
      viewBox="0 0 9 12"
      className="animate-flicker text-[var(--accent)]"
      style={{ transformOrigin: "bottom center" }}
      aria-hidden="true"
    >
      <path
        d="M4.5 0C4.5 2 2 2.6 2 5.4A2.5 2.5 0 0 0 4.5 8 2.5 2.5 0 0 0 7 5.4C7 4 6 3.4 6 2.4c0 1-.6 1.4-.6 2.2 0 .7.5 1 .5 1.7A1.4 1.4 0 0 1 4.5 7.6 1.5 1.5 0 0 1 3 6.1c0-1.6 1.5-2.3 1.5-4.1V0Z"
        fill="currentColor"
      />
    </svg>
  );
}

type PlaylistSelectorProps = {
  scene: SceneKey;
  onChange: (scene: SceneKey) => void;
};

export function PlaylistSelector({ scene, onChange }: PlaylistSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose time of day"
      className={`flex w-full max-w-sm items-stretch gap-1 rounded-full p-1 ${GLASS}`}
    >
      {OPTIONS.map((option) => {
        const active = option === scene;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={`relative flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.1em] transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
              active
                ? "bg-white/12 text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                : "text-white/60 hover:text-white/85"
            }`}
          >
            {active && <FlameGlyph />}
            <span>{LABELS[option].toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
