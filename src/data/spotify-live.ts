/* ============================================================================
 * X-AMPLE — Live Spotify catalogue
 * ----------------------------------------------------------------------------
 * Pulls the artist's releases straight from the Spotify Web API at request
 * time so the site stays in sync with Spotify automatically — no more editing
 * `spotify.ts` by hand. Results are cached in Netlify Blobs (1h) to stay well
 * under Spotify's rate limits, and everything degrades gracefully:
 *
 *   • No credentials set        → serve the static `releases` from spotify.ts
 *   • Spotify call fails         → serve the last good cache, else static
 *
 * Setup: create a Spotify app at https://developer.spotify.com/dashboard and
 * add two environment variables to the Netlify site:
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 * The artist is read from `artist.spotifyId` in spotify.ts.
 *
 * This runs only on the server (createServerFn), so the client/secret never
 * reach the browser.
 * ==========================================================================*/

import { createServerFn } from '@tanstack/react-start'
import { artist, releases as fallbackReleases, type Release } from './spotify'

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const API_BASE = 'https://api.spotify.com/v1'
const CACHE_STORE = 'spotify-catalogue'
const CACHE_KEY = 'releases'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

interface CachedCatalogue {
  fetchedAt: number
  releases: Release[]
}

interface SpotifyAlbum {
  id: string
  name: string
  album_type: 'album' | 'single' | 'compilation'
  release_date: string
  total_tracks: number
  images: Array<{ url: string; width: number; height: number }>
}

/** Stable, deterministic seed from a Spotify id (for the fallback cover art). */
function seedFromId(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 100000
  }
  return hash
}

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) {
    throw new Error(`Spotify token request failed: ${res.status}`)
  }
  const json = (await res.json()) as { access_token?: string }
  if (!json.access_token) throw new Error('Spotify token response missing access_token')
  return json.access_token
}

/** Fetch every album + single for the artist, following pagination. */
async function fetchArtistAlbums(token: string, artistId: string): Promise<SpotifyAlbum[]> {
  const albums: SpotifyAlbum[] = []
  let next: string | null =
    `${API_BASE}/artists/${artistId}/albums?include_groups=album,single&market=US&limit=50`

  while (next) {
    const res: Response = await fetch(next, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      throw new Error(`Spotify albums request failed: ${res.status}`)
    }
    const page = (await res.json()) as { items: SpotifyAlbum[]; next: string | null }
    albums.push(...page.items)
    next = page.next
  }

  return albums
}

/** Map raw Spotify albums to the site's Release shape, newest first, deduped. */
function toReleases(albums: SpotifyAlbum[]): Release[] {
  const sorted = [...albums].sort((a, b) =>
    (b.release_date ?? '').localeCompare(a.release_date ?? ''),
  )

  const seen = new Set<string>()
  const releases: Release[] = []

  for (const album of sorted) {
    const dedupeKey = album.name.trim().toLowerCase()
    if (seen.has(dedupeKey)) continue
    seen.add(dedupeKey)

    const tracks = album.total_tracks ?? 1
    const format =
      album.album_type === 'single'
        ? tracks > 1
          ? 'EP'
          : 'Single'
        : album.album_type === 'compilation'
          ? 'Compilation'
          : 'Album'

    releases.push({
      id: album.id,
      title: album.name,
      format,
      year: Number((album.release_date ?? '').slice(0, 4)) || new Date().getFullYear(),
      note: 'Out now on Spotify — press play.',
      spotifyId: album.id,
      kind: 'album',
      seed: seedFromId(album.id),
      image: album.images?.[0]?.url,
    })
  }

  if (releases.length > 0) {
    releases[0].featured = true
  }

  return releases
}

/**
 * Server function: returns the live catalogue, cached, with graceful fallback.
 * Called from the index route loader so it runs during SSR.
 */
export const getReleases = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Release[]> => {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    // No credentials or no artist configured → keep the hand-curated fallback.
    if (!clientId || !clientSecret || !artist.spotifyId) {
      return fallbackReleases
    }

    // Netlify Blobs is unavailable in some local contexts; never let that break SSR.
    let store: import('@netlify/blobs').Store | null = null
    try {
      const { getStore } = await import('@netlify/blobs')
      store = getStore(CACHE_STORE)
      const cached = (await store.get(CACHE_KEY, { type: 'json' })) as CachedCatalogue | null
      if (
        cached &&
        cached.releases?.length &&
        Date.now() - cached.fetchedAt < CACHE_TTL_MS
      ) {
        return cached.releases
      }
    } catch {
      store = null
    }

    try {
      const token = await getAccessToken(clientId, clientSecret)
      const albums = await fetchArtistAlbums(token, artist.spotifyId)
      const releases = toReleases(albums)
      if (!releases.length) return fallbackReleases

      if (store) {
        try {
          await store.setJSON(CACHE_KEY, {
            fetchedAt: Date.now(),
            releases,
          } satisfies CachedCatalogue)
        } catch {
          // Caching is best-effort; ignore write failures.
        }
      }

      return releases
    } catch {
      // Live fetch failed — serve the last good cache if we have one, else static.
      if (store) {
        try {
          const stale = (await store.get(CACHE_KEY, { type: 'json' })) as CachedCatalogue | null
          if (stale?.releases?.length) return stale.releases
        } catch {
          // fall through to static
        }
      }
      return fallbackReleases
    }
  },
)
