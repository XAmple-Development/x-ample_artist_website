/* ============================================================================
 * X-AMPLE — Spotify catalogue (single source of truth)
 * ----------------------------------------------------------------------------
 * Every release on the site is driven by this file. The site works TODAY:
 * each release deep-links to Spotify so nothing is ever broken.
 *
 * To turn on inline, playable Spotify players, paste the release's Spotify ID
 * into `spotifyId` below and set the matching `kind` ('track' | 'album' |
 * 'playlist'). You find the ID in Spotify:  Share → Copy link →
 *   https://open.spotify.com/album/THIS_PART_IS_THE_ID?si=...
 *
 * Likewise, drop X-Ample's real Spotify artist ID into `artist.spotifyId`
 * to wire the "Follow" button and the artist player directly to the profile.
 * Until then, links resolve to a Spotify search for the artist + title.
 * ==========================================================================*/

export type ReleaseKind = 'track' | 'album' | 'playlist'

export interface Release {
  id: string
  title: string
  /** EP / Album / Single — shown as a label */
  format: string
  year: number
  /** short liner note */
  note: string
  /** Spotify content id — leave '' to fall back to a deep-link card */
  spotifyId: string
  kind: ReleaseKind
  /** seed used to generate the cover artwork gradient/waveform */
  seed: number
  featured?: boolean
}

export const artist = {
  name: 'X-Ample',
  /** X-Ample's Spotify artist id (the 22-char id only — never the ?si=… share suffix) */
  spotifyId: '3opv1Y9IZmh0Wt4Wj5e2pb',
}

/** Resolve a Spotify destination that always works. */
export function spotifyHref(release: Release): string {
  if (release.spotifyId) {
    return `https://open.spotify.com/${release.kind}/${release.spotifyId}`
  }
  return `https://open.spotify.com/search/${encodeURIComponent(
    `${artist.name} ${release.title}`,
  )}`
}

/** Embed URL — only meaningful once a real spotifyId is present. */
export function spotifyEmbed(release: Release): string | null {
  if (!release.spotifyId) return null
  return `https://open.spotify.com/embed/${release.kind}/${release.spotifyId}?theme=0`
}

export function artistHref(): string {
  if (artist.spotifyId) {
    return `https://open.spotify.com/artist/${artist.spotifyId}`
  }
  return `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`
}

export const releases: Release[] = [
  {
    id: '1z3uUuCShPmHI6QMZyiIBT',
    title: 'This Is X-Ample',
    format: 'Album',
    year: 2026,
    note: 'The latest album from X-Ample — out now on Spotify. Press play.',
    // Leave spotifyId empty to deep-link to Spotify; paste the album id
    // (open.spotify.com/album/THIS_PART) to swap in an inline player.
    spotifyId: '',
    kind: 'album',
    seed: 14,
    featured: true,
  },
  {
    id: 'kSBIFjhLAKVVB8Umwo195',
    title: 'Salt On Skin',
    format: 'Album',
    year: 2026,
    note: 'The latest single from X-Ample — out now on Spotify. Press play.',
    // Leave spotifyId empty to deep-link to Spotify; paste the album id
    // (open.spotify.com/album/THIS_PART) to swap in an inline player.
    spotifyId: '',
    kind: 'album',
    seed: 13,
    featured: false,
  },
]

export interface TourDate {
  date: string
  city: string
  venue: string
  status: 'tickets' | 'low' | 'sold'
}

export const tour: TourDate[] = [
  { date: 'JUL 02', city: 'Virtual', venue: 'Tresor', status: 'low' },
  { date: 'JUL 11', city: 'Virtual', venue: 'Shelter', status: 'tickets' },
  { date: 'JUL 19', city: 'Virtual', venue: 'FOLD', status: 'sold' },
  { date: 'AUG 03', city: 'Virtual', venue: 'Lux Frágil', status: 'tickets' },
  { date: 'AUG 16', city: 'Virtual', venue: 'Nitsa', status: 'tickets' },
  { date: 'SEP 05', city: 'Virtual', venue: 'Nowadays', status: 'low' },
]

export const links = {
  spotify: artistHref(),
  appleMusic: `https://music.apple.com/search?term=${encodeURIComponent(artist.name)}`,
  bandcamp: `https://bandcamp.com/search?q=${encodeURIComponent(artist.name)}`,
  soundcloud: `https://soundcloud.com/search?q=${encodeURIComponent(artist.name)}`,
  instagram: 'https://instagram.com',
}
