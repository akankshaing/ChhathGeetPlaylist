import { track } from "@vercel/analytics";

type PlayerEvent =
  | { name: "playlist_selected"; scene: string }
  | { name: "track_started"; scene: string; trackId: string; title: string }
  | { name: "track_completed"; scene: string; trackId: string; title: string }
  | { name: "track_next"; scene: string; trackId: string; via: "manual" | "auto" }
  | { name: "track_previous"; scene: string; trackId: string }
  | { name: "shuffle_toggled"; scene: string; enabled: boolean }
  | { name: "playback_error"; scene: string; videoId: string; code: number }
  | { name: "volume_changed"; volume: number; muted: boolean };

export function trackEvent(event: PlayerEvent) {
  const { name, ...rest } = event;
  try {
    track(name, rest as Record<string, string | number | boolean>);
  } catch {
    // Analytics should never break playback.
  }
}
