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

## A note on the supplied playlist — please read before deploying

Most of the tracks you gave me (Sharda Sinha's recordings especially, plus
the T-Series/label-style uploads) look like commercially released,
copyrighted recordings rather than independent or public-domain uploads. I
haven't hidden or re-hosted any audio or video — the site only ever streams
the videos live from YouTube's own player, using the IDs you provided, and
nothing is downloaded or cached. That said, I can't verify for each of the
~50 IDs whether the uploading channel is the actual rights holder or has
embedding enabled, and that verification is on you before this goes out
publicly:

- Spot-check a handful of the `videoId`s in your browser and confirm the
  uploading channel is the artist/label's official channel.
- If a video's owner has disabled embedding, the IFrame API will throw an
  error for that track — the app already auto-skips to the next track and
  logs it (`playback_error` with the code and `videoId`), so broken embeds
  won't stall playback, but you'll want to swap those IDs out.
- If you're not confident about a track's rights status, the safest move is
  to drop it from the array rather than publish with it.

## Design tokens

- Palette: marigold `#e8a33d`, diya orange `#ff7a3d`, brass `#c98a3e`, cream
  `#fdf3e2`, deep indigo `#1b1330`/`#0f0a1c`, ink `#241206`.
- Type: Fraunces (display), Manrope (body), IBM Plex Mono (clock/time/labels).
- The active time-of-day scene sets `data-scene` on `<main>`, which drives
  `--accent`/`--accent-soft` for the whole player and selector, and the
  background image via CSS custom properties.
