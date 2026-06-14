/**
 * Deterministic cover artwork generated from a release seed. No image assets,
 * no broken URLs — every cover is unique SVG built from the same warm palette,
 * carrying the X-Ample amplitude motif.
 */
export function CoverArt({ seed, label }: { seed: number; label: string }) {
  // simple deterministic pseudo-random from the seed
  const rnd = (n: number) => {
    const x = Math.sin(seed * 99.7 + n * 17.3) * 43758.5453
    return x - Math.floor(x)
  }

  const angle = Math.floor(rnd(1) * 180)
  const cx = 20 + rnd(2) * 60
  const cy = 15 + rnd(3) * 50
  const id = `g${seed}`

  // build a jagged amplitude path
  const bars = 26
  const pts: string[] = []
  for (let i = 0; i <= bars; i++) {
    const p = i / bars
    const env = Math.sin(p * Math.PI)
    const y = 70 + (rnd(i + 4) - 0.5) * 60 * env
    pts.push(`${(p * 100).toFixed(1)},${y.toFixed(1)}`)
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="cover-art"
      role="img"
      aria-label={`${label} cover artwork`}
    >
      <defs>
        <linearGradient id={id} gradientTransform={`rotate(${angle} .5 .5)`}>
          <stop offset="0%" stopColor="#1c1816" />
          <stop offset="55%" stopColor="#241a14" />
          <stop offset="100%" stopColor="#0c0a09" />
        </linearGradient>
        <radialGradient id={`${id}r`} cx={`${cx}%`} cy={`${cy}%`} r="60%">
          <stop offset="0%" stopColor={rnd(9) > 0.5 ? '#ff4d1c' : '#ffb02e'} stopOpacity="0.85" />
          <stop offset="60%" stopColor="#ff4d1c" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ff4d1c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id})`} />
      <rect width="100" height="100" fill={`url(#${id}r)`} />
      {/* faint baseline grid */}
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#ece6dc" strokeOpacity="0.05" strokeWidth="0.4" />
      ))}
      {/* amplitude trace */}
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke="#ece6dc"
        strokeOpacity="0.5"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* the X mark */}
      <g stroke="#ff4d1c" strokeWidth="1.4" opacity="0.9">
        <line x1="8" y1="8" x2="18" y2="18" />
        <line x1="18" y1="8" x2="8" y2="18" />
      </g>
    </svg>
  )
}
