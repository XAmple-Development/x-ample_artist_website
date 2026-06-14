# X-Ample

An immersive, single-page website for the electronic producer and live act **X-Ample**. Every release deep-links to Spotify, the tour is laid out as an interactive list, and fans can join the mailing list via Netlify Forms.

The design is a custom "after-hours warehouse" aesthetic — warm near-black concrete, a molten-voltage accent, massive stamped display type, an animated amplitude/waveform canvas (the visual signature behind the name *X-Ample*), film grain, and scroll-choreographed reveals.

## Key technologies

- **TanStack Start** (React 19) — file-based routing and SSR
- **Tailwind CSS v4** — utility styling on top of a CSS-variable design system (`src/styles.css`)
- **Canvas 2D** — the hero amplitude animation (`src/components/Waveform.tsx`)
- **Netlify Forms** — the "signal list" newsletter sign-up
- **Netlify** — hosting and build (`netlify.toml`)

## Spotify integration

All music is driven by a single source of truth: **`src/data/spotify.ts`**.

- The site works immediately — each release deep-links to Spotify (a search for the artist + title), so no link is ever broken.
- To enable inline, playable Spotify players, paste a release's Spotify ID into its `spotifyId` field and set `kind` (`track` | `album` | `playlist`). The card then renders the official Spotify embed.
- Paste X-Ample's real Spotify **artist** ID into `artist.spotifyId` to point the "Follow" button and profile links straight at the artist page.

Cover artwork is generated deterministically from each release's `seed` (`src/components/CoverArt.tsx`) — no image assets required.

## Run locally

```bash
npm install
netlify dev --port 8889
```

Then open http://localhost:8889.

> Netlify Forms submissions only process on a deployed Netlify site (or deploy preview), not in local dev.

## Build

The Netlify build pipeline runs `vite build` automatically. The published directory is `dist/client`.
