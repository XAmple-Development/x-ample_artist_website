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
  /** Paste X-Ample's real Spotify artist id here, e.g. '4B9UYU8uyLi1F41Z42fKuu' */
  spotifyId: '',
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
    return `https://open.spotify.com/artist/3opv1Y9IZmh0Wt4Wj5e2pb?si=sbNNVszXQgeRylPoQuDdsA&nd=1&dlsi=3984b7807e8048ea`
  }
  return `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`
}

export const releases: Release[] = [
  {
    id: 'voltage-hymn',
    title: 'Voltage Hymn',
    format: 'Album',
    year: 2025,
    note: 'Eleven tracks built from a single sustained chord and the hum of a Berlin substation.',
    spotifyId: '',
    kind: 'album',
    seed: 14,
    featured: true,
  },
  {
    id: 'low-orbit',
    title: 'Low Orbit',
    format: 'Single · feat. Mara Kovač',
    year: 2025,
    note: 'A duet for modular synth and dial-tone, mixed at 3am.',
    spotifyId: '',
    kind: 'track',
    seed: 7,
  },
  {
    id: 'nightshift-frequencies',
    title: 'Nightshift Frequencies',
    format: 'EP',
    year: 2024,
    note: 'Four cuts written on the last train, for people on the last train.',
    spotifyId: '',
    kind: 'album',
    seed: 23,
  },
  {
    id: 'concrete-bloom',
    title: 'Concrete Bloom',
    format: 'Single',
    year: 2024,
    note: 'Field recordings from an empty car park, bent into a melody.',
    spotifyId: '',
    kind: 'track',
    seed: 31,
  },
  {
    id: 'after-the-siren',
    title: 'After the Siren',
    format: 'Single',
    year: 2023,
    note: 'The quiet ninety seconds once the warehouse empties out.',
    spotifyId: '',
    kind: 'track',
    seed: 5,
  },
  {
    id: 'static-cathedral',
    title: 'Static Cathedral',
    format: 'Album',
    year: 2022,
    note: 'The debut. Tape hiss treated like a pipe organ.',
    spotifyId: '',
    kind: 'album',
    seed: 18,
  },
]

export interface TourDate {
  date: string
  city: string
  venue: string
  status: 'tickets' | 'low' | 'sold'
}

export const tour: TourDate[] = [
  { date: 'JUL 02', city: 'Berlin', venue: 'Tresor', status: 'low' },
  { date: 'JUL 11', city: 'Amsterdam', venue: 'Shelter', status: 'tickets' },
  { date: 'JUL 19', city: 'London', venue: 'FOLD', status: 'sold' },
  { date: 'AUG 03', city: 'Lisbon', venue: 'Lux Frágil', status: 'tickets' },
  { date: 'AUG 16', city: 'Barcelona', venue: 'Nitsa', status: 'tickets' },
  { date: 'SEP 05', city: 'Brooklyn', venue: 'Nowadays', status: 'low' },
]

export const links = {
  spotify: artistHref(),
  appleMusic: `https://music.apple.com/search?term=${encodeURIComponent(artist.name)}`,
  bandcamp: `https://bandcamp.com/search?q=${encodeURIComponent(artist.name)}`,
  soundcloud: `https://soundcloud.com/search?q=${encodeURIComponent(artist.name)}`,
  instagram: 'https://instagram.com',
}
