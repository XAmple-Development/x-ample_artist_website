import { useEffect, useRef } from 'react'

/**
 * Animated amplitude field — the visual signature of X-Ample.
 * A bank of layered sine waves rendered to canvas, drifting slowly like a
 * spectrum analyser at rest. Pure transform/opacity-free canvas work, throttled
 * to the display refresh and paused for reduced-motion users.
 */
export function Waveform() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const waves = [
      { amp: 0.34, freq: 1.6, speed: 0.18, color: 'rgba(255,77,28,0.9)', width: 2 },
      { amp: 0.22, freq: 2.7, speed: -0.26, color: 'rgba(255,176,46,0.55)', width: 1.4 },
      { amp: 0.46, freq: 1.0, speed: 0.12, color: 'rgba(236,230,220,0.16)', width: 1 },
      { amp: 0.16, freq: 4.1, speed: 0.34, color: 'rgba(255,77,28,0.35)', width: 1 },
    ]

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const mid = h * 0.52
      for (const wv of waves) {
        ctx.beginPath()
        ctx.lineWidth = wv.width
        ctx.strokeStyle = wv.color
        const step = 6
        for (let x = 0; x <= w; x += step) {
          const p = x / w
          // envelope keeps the wave loud in the centre, calm at the edges
          const env = Math.sin(p * Math.PI)
          const y =
            mid +
            Math.sin(p * Math.PI * 2 * wv.freq + t * wv.speed) *
              (h * 0.5 * wv.amp) *
              env +
            Math.sin(p * Math.PI * 6 + t * wv.speed * 1.7) * 4 * env
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      // standing amplitude bars under the waves
      const bars = Math.floor(w / 14)
      for (let i = 0; i < bars; i++) {
        const p = i / bars
        const env = Math.sin(p * Math.PI)
        const bh =
          (Math.abs(Math.sin(p * 9 + t * 0.5)) * 0.6 + 0.15) * h * 0.4 * env
        ctx.fillStyle = `rgba(255,77,28,${0.05 + env * 0.08})`
        ctx.fillRect(i * 14 + 4, mid - bh, 3, bh * 2)
      }
    }

    if (reduce) {
      draw(0)
      window.removeEventListener('resize', resize)
      return
    }

    let start: number | null = null
    const loop = (ts: number) => {
      if (start === null) start = ts
      draw((ts - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
