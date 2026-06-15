import { createFileRoute } from '@tanstack/react-router'
import { Waveform } from '@/components/Waveform'
import { Reveal } from '@/components/Reveal'
import { Marquee } from '@/components/Marquee'
import { ReleaseCard, SpotifyGlyph } from '@/components/ReleaseCard'
import { NewsletterForm } from '@/components/NewsletterForm'
import { artistHref, links, releases, tour } from '@/data/spotify'

export const Route = createFileRoute('/')({
  component: Home,
})

const NAV = [
  { label: 'Sound', href: '#sound' },
  { label: 'Releases', href: '#releases' },
  { label: 'Live', href: '#live' },
  { label: 'Signal', href: '#signal' },
]

const STATS = [
  { k: 'Releases', v: '1' },
  { k: 'Virtual Sessions', v: '74' },
  { k: 'Operating since', v: '2017' },
]

function Equalizer() {
  return (
    <span className="flex items-end gap-[3px]" aria-hidden="true">
      {[0, 0.2, 0.4, 0.15, 0.32].map((d, i) => (
        <span key={i} className="eq-bar" style={{ animationDelay: `${d}s` }} />
      ))}
    </span>
  )
}

function Home() {
  const featured = releases.filter((r) => r.featured)
  const rest = releases.filter((r) => !r.featured)

  return (
    <main className="relative z-10">
      {/* ---------------- NAV ---------------- */}
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--ink)]/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#top" className="flex items-center gap-3">
            <Equalizer />
            <span className="font-display text-xl font-extrabold uppercase tracking-tight">
              X&#8209;Ample
            </span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="ul-sweep font-mono text-xs uppercase tracking-widest text-[var(--dim)] hover:text-[var(--bone)]"
              >
                {n.label}
              </a>
            ))}
          </div>
          <a
            href={artistHref()}
            target="_blank"
            rel="noreferrer"
            className="btn-voltage flex items-center gap-2 px-4 py-2 text-xs font-semibold"
          >
            <SpotifyGlyph className="h-4 w-4" />
            <span className="hidden sm:inline">Follow</span>
          </a>
        </nav>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section
        id="top"
        className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-5 pb-16 pt-20 md:px-10"
      >
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <Waveform />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]">
          <div className="load-rise mb-6 flex items-center gap-4" style={{ animationDelay: '0.1s' }}>
            <span className="kicker">Electronic producer · Live act</span>
            <span className="rule w-16 md:w-32" />
            <span className="font-mono text-xs text-[var(--faint)]">EST. LONDON, UK</span>
          </div>

          <h1 className="display-xl text-[20vw] leading-[0.78] md:text-[15vw] lg:text-[13.5rem]">
            <span className="load-rise block" style={{ animationDelay: '0.18s' }}>
              X&#8209;Ample
            </span>
          </h1>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <p
              className="load-rise max-w-xl text-lg leading-relaxed text-[var(--dim)] md:text-xl"
              style={{ animationDelay: '0.32s' }}
            >
              Machine music for human rooms. Substation hum, tape hiss and a
              kick drum that arrives like weather. Every release lives on
              Spotify — press play below.
            </p>
            <div
              className="load-rise flex flex-wrap items-center gap-3"
              style={{ animationDelay: '0.42s' }}
            >
              <a
                href={artistHref()}
                target="_blank"
                rel="noreferrer"
                className="btn-voltage flex items-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                <SpotifyGlyph className="h-5 w-5" />
                <span>Listen on Spotify</span>
              </a>
              <a href="#releases" className="btn-ghost px-6 py-3 text-sm">
                The catalogue
              </a>
            </div>
          </div>
        </div>

        <a
          href="#sound"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.4em] text-[var(--faint)] md:block"
        >
          ↓ Scroll
        </a>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee
        items={[
          'New album — This Is X-Ample',
          'Out now on Spotify',
          'Summer tour 2026',
          'Modular / Tape / Concrete',
          'Press play',
        ]}
      />

      {/* ---------------- SOUND / ABOUT ---------------- */}
      <section id="sound" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <Reveal>
            <div className="kicker mb-5">[ 01 ] The signal</div>
            <p className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight md:text-5xl">
              Built from the
              <span className="text-[var(--voltage)]"> hum </span>
              of empty buildings.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {STATS.map((s, i) => (
                <Reveal key={s.k} delay={i * 90}>
                  <div className="border-t border-[var(--line-strong)] pt-3">
                    <div className="font-display text-3xl font-extrabold md:text-4xl">
                      {s.v}
                    </div>
                    <div className="eyebrow mt-1">{s.k}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-6 text-base leading-relaxed text-[var(--dim)] md:text-lg">
            <p>
              X-Ample started as a tape loop left running overnight in a disused
              Kreuzberg transformer hall. The room had a tone — a low, steady
              hum — and the loop learned to sing over it. Nine years on, the
              method hasn't changed: find a space, listen to what it already
              sounds like, and build the track around it.
            </p>
            <p>
              The records sit somewhere between dub techno, ambient and the kind
              of broken-clock dance music that only makes sense at 4am. They've
              soundtracked planetarium shows in Helsinki and a 600-person
              warehouse in Lisbon in the same week.
            </p>
            <p className="border-l-2 border-[var(--voltage)] pl-5 font-display text-xl font-bold uppercase leading-snug text-[var(--bone)] md:text-2xl">
              "Most of my songs are just one good sound, amplified until it
              becomes a room you can stand inside."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- RELEASES ---------------- */}
      <section id="releases" className="border-t border-[var(--line)] bg-[var(--ink-2)]/40 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="kicker mb-4">[ 02 ] The catalogue</div>
              <h2 className="display-xl text-5xl md:text-7xl">Every release</h2>
            </div>
            <a
              href={artistHref()}
              target="_blank"
              rel="noreferrer"
              className="ul-sweep flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--dim)] hover:text-[var(--bone)]"
            >
              <SpotifyGlyph className="h-4 w-4 text-[#1DB954]" />
              Full profile on Spotify →
            </a>
          </Reveal>

          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-2">
            {featured.map((r) => (
              <Reveal key={r.id} className="lg:col-span-2">
                <ReleaseCard release={r} featured />
              </Reveal>
            ))}
            {rest.map((r, i) => (
              <Reveal key={r.id} delay={(i % 2) * 90}>
                <ReleaseCard release={r} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 rounded-2xl border border-dashed border-[var(--line-strong)] p-6 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--faint)]">
              Each cover deep-links to Spotify. Add real release IDs in
              <span className="text-[var(--dim)]"> src/data/spotify.ts </span>
              to embed playable inline players.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- LIVE / TOUR ---------------- */}
      <section id="live" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-12">
          <div className="kicker mb-4">[ 03 ] On the road</div>
          <h2 className="display-xl text-5xl md:text-7xl">Live dates</h2>
        </Reveal>

        <div className="border-t border-[var(--line)]">
          {tour.map((d, i) => (
            <Reveal as="div" key={`${d.city}-${d.date}`} delay={i * 60}>
              <div className="tour-row group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-[var(--line)] px-1 py-6 md:gap-10 md:py-7">
                <div className="font-mono text-sm tracking-widest text-[var(--voltage)] group-hover:text-[var(--ink)] md:text-base">
                  {d.date}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-2xl font-bold uppercase leading-none tracking-tight md:text-4xl">
                    {d.city}
                  </div>
                  <div className="tour-venue mt-1 font-mono text-xs uppercase tracking-widest text-[var(--faint)]">
                    {d.venue}
                  </div>
                </div>
                <div>
                  {d.status === 'sold' ? (
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--faint)]">
                      Sold out
                    </span>
                  ) : (
                    <span className="tour-rsvp flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2 font-mono text-xs uppercase tracking-widest">
                      {d.status === 'low' ? 'Few left' : 'Tickets'}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SIGNAL / NEWSLETTER ---------------- */}
      <section id="signal" className="border-t border-[var(--line)] bg-[var(--ink-2)]/40 py-24 md:py-32">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
            <Reveal>
              <div className="kicker mb-4">[ 04 ] The signal list</div>
              <h2 className="display-xl text-4xl md:text-6xl">
                Tune in
                <br />
                first.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--dim)]">
                One short message per drop: new music, presale codes and the odd
                unreleased edit sent straight to your inbox.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <NewsletterForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-[var(--line)] px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <a href="#top" className="font-display text-6xl font-extrabold uppercase leading-none tracking-tight md:text-8xl">
                X&#8209;Ample
              </a>
              <p className="mt-4 max-w-xs text-sm text-[var(--faint)]">
                Machine music for human rooms. Booking &amp; press:
                <a href="mailto:booking@x-ample.fm" className="ul-sweep ml-1 text-[var(--dim)]">
                  booking@x-ample.fm
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: 'Spotify', href: links.spotify },
                { label: 'Apple Music', href: links.appleMusic },
                { label: 'Bandcamp', href: links.bandcamp },
                { label: 'SoundCloud', href: links.soundcloud },
                { label: 'Instagram', href: links.instagram },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ul-sweep font-mono text-xs uppercase tracking-widest text-[var(--dim)] hover:text-[var(--bone)]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--line)] pt-6 font-mono text-[0.7rem] uppercase tracking-widest text-[var(--faint)] md:flex-row md:justify-between">
            <span>© {2026} X-Ample. All frequencies reserved.</span>
            <span>Built for the dark. Best played loud.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
