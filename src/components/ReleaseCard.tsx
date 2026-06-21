import { CoverArt } from './CoverArt'
import { spotifyEmbed, spotifyHref, type Release } from '@/data/spotify'

export function SpotifyGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.31a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.59 11.66 1.34.36.22.47.69.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.8c4.37-1.32 9.79-.68 13.49 1.6.44.27.58.85.31 1.29zm.13-3.41C15.13 8.27 8.9 8.05 5.3 9.14a1.12 1.12 0 1 1-.65-2.15c4.13-1.25 11.02-1 15.37 1.58a1.12 1.12 0 1 1-1.15 1.93z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function ReleaseCard({
  release,
  featured = false,
}: {
  release: Release
  featured?: boolean
}) {
  const embed = spotifyEmbed(release)
  const href = spotifyHref(release)

  return (
    <article className={`release-card group ${featured ? 'lg:col-span-2' : ''}`}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--voltage)]"
        aria-label={`Listen to ${release.title} on Spotify`}
      >
        <div className={`cover ${featured ? 'aspect-[16/9]' : 'aspect-square'} rounded-xl border border-[var(--line)]`}>
          {release.image ? (
            <img
              src={release.image}
              alt={`${release.title} cover artwork`}
              className="cover-art h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <CoverArt seed={release.seed} label={release.title} />
          )}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-5">
            <div>
              <div className="eyebrow mb-1">
                {release.format} · {release.year}
              </div>
              <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight md:text-3xl">
                {release.title}
              </h3>
            </div>
            <span className="play-pill flex shrink-0 items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--ink)]/70 px-3 py-2 text-xs backdrop-blur">
              <PlayIcon />
              <SpotifyGlyph className="h-4 w-4" />
            </span>
          </div>
        </div>
      </a>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--dim)]">
        {release.note}
      </p>

      {embed ? (
        <div className="sp-frame mt-4">
          <iframe
            title={`${release.title} on Spotify`}
            src={embed}
            width="100%"
            height={release.kind === 'track' ? 152 : 352}
            frameBorder="0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="ul-sweep mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--bone)]"
        >
          <SpotifyGlyph className="h-4 w-4 text-[#1DB954]" />
          Open on Spotify
        </a>
      )}
    </article>
  )
}
