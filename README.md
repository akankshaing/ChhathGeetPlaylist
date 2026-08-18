# Chhath Radio

A single-page nostalgia listening room for Chhath Puja — Morning, Evening, and
Night, each with its own scene and playlist, driven by the YouTube IFrame
Player API.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project shape

```
app/
  layout.tsx        root layout, fonts, viewport-fit, analytics
  globals.css        Tailwind v4 @theme tokens, scene backgrounds, animations
  page.tsx           all state: scene, track index, shuffle, keyboard, wiring
components/
  background.tsx           fixed crossfading scene background
  grain-overlay.tsx         fixed grain layer
  playlist-selector.tsx     the Morning/Evening/Night pill
  glass.ts                  shared glassmorphism class string
  top-row/                  clock, listener count, social links
  player/
    use-youtube-player.ts   YouTube IFrame API hook (single persistent instance)
    vinyl.tsx                spinning vinyl / video-art mount (module scope)
    seek-bar.tsx             pointer-based seek bar
    volume-control.tsx       real YouTube volume control
    transport-controls.tsx   prev / play-pause / next / shuffle
    desktop-player.tsx       floating glass pill
    mobile-player.tsx        stacked glass card
    icons.tsx                inline SVG icon set
lib/
  playlists.ts        Track type + the three playlists
  analytics.ts         @vercel/analytics event wrapper
public/bg/
  morning-wide.png / morning-tall.png
  evening-wide.png / evening-tall.png
  night-wide.png / night-tall.png
```

## Adding a song

Add one object to the matching array in `lib/playlists.ts`:

```ts
{ id: "morning-22", title: "...", artist: "...", film: "Chhath Geet", year: 0, duration: 0, videoId: "..." }
```
