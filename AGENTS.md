# AGENTS.md

Project overview for developers and AI agents working on this codebase.

## What this is

A single-page promotional website for the electronic music artist **X-Ample**. It showcases the artist, deep-links the full catalogue to Spotify, lists tour dates, and collects mailing-list sign-ups via Netlify Forms. The visual identity is a bespoke "after-hours warehouse" aesthetic (warm near-black, molten-voltage accent, animated amplitude/waveform motif).

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (React 19, SSR) |
| Routing | TanStack Router v1 (file-based, `src/routes/`) |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 + CSS-variable design system in `src/styles.css` |
| Forms | Netlify Forms |
| Hosting | Netlify |
| Language | TypeScript 5.9 (strict), `@/*` → `src/*` alias |

## Directory map

```
public/
  __forms.html            # Static skeleton so Netlify detects the "signal-list" form at build time
  favicon.ico
src/
  data/
    spotify.ts            # SINGLE SOURCE OF TRUTH — artist, releases, tour, links + Spotify URL/embed helpers
  components/
    Waveform.tsx          # Canvas 2D animated amplitude field (hero background)
    CoverArt.tsx          # Deterministic SVG cover art generated from a release seed
    Reveal.tsx            # IntersectionObserver scroll-reveal wrapper
    Marquee.tsx           # Seamless infinite marquee strip
    ReleaseCard.tsx       # Release card (Spotify embed when ID present, else deep-link card) + SpotifyGlyph
    NewsletterForm.tsx    # "Signal list" sign-up, posts to Netlify Forms via AJAX
  routes/
    __root.tsx            # HTML shell: fonts, SEO meta, atmosphere/grain/vignette layers
    index.tsx             # The entire single-page experience (nav, hero, about, releases, live, signal, footer)
  router.tsx              # Router factory
  styles.css              # Design system: CSS variables, fonts, keyframes, component classes
netlify.toml              # build = vite build, publish = dist/client
```

## Spotify integration (the important part)

`src/data/spotify.ts` drives every release on the page. Design goals:

- **Never broken.** With no `spotifyId`, a release deep-links to a Spotify *search* for the artist + title. The site is fully functional out of the box.
- **Upgradeable to inline players.** Set a release's `spotifyId` + `kind` and `ReleaseCard` renders the official `open.spotify.com/embed/...` iframe.
- **Artist profile.** `artist.spotifyId` wires the "Follow"/profile links directly to the Spotify artist page; otherwise they resolve to an artist search.

Helpers: `spotifyHref(release)`, `spotifyEmbed(release)`, `artistHref()`. Cover art needs no image files — it is generated from `release.seed`.

## Conventions

- Components are PascalCase; data/helpers camelCase; route files kebab-case.
- Styling is Tailwind utilities plus semantic classes (`.btn-voltage`, `.reveal`, `.tour-row`, `.cover`, …) defined in `styles.css`. Theme tokens are CSS variables (`--ink`, `--voltage`, `--bone`, …).
- Animations only touch `transform`/`opacity`; grain/vignette are fixed non-scrolling overlays. A `prefers-reduced-motion` block disables motion.
- Fonts: Syne (display), Archivo (body), IBM Plex Mono (labels), loaded in `__root.tsx`.

## Netlify Forms

The newsletter is the form named `signal-list`. Its fields (`email`, `city`, `bot-field` honeypot) are mirrored in `public/__forms.html` so Netlify registers the form at build time. `NewsletterForm.tsx` POSTs URL-encoded data to `/__forms.html` (never `/`, which the SSR function would intercept). Submissions only process on a deployed site, not in local dev. If form fields change, update both the component and `public/__forms.html`, then re-run the netlify-forms `enable.cjs` script.

## Local development

```bash
npm install
netlify dev --port 8889
```

Do not run `vite build`/`tsc` manually — the Netlify pipeline validates builds automatically.
