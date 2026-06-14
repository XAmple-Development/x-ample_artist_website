/**
 * Infinite marquee strip. The content is duplicated once and the track is
 * translated -50% so the loop is seamless. Pauses on hover (see styles.css).
 */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="marquee-track">
      {items.map((it, i) => (
        <span key={i} className="mx-7 inline-flex items-center gap-7">
          <span className="font-display text-2xl font-bold uppercase tracking-tight">
            {it}
          </span>
          <span className="text-[var(--voltage)]" aria-hidden="true">
            ✺
          </span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee-wrap relative flex overflow-hidden border-y border-[var(--line)] bg-[var(--ink-2)] py-4">
      {row}
      {row}
    </div>
  )
}
