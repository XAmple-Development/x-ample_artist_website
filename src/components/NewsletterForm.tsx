import { useState } from 'react'

const FORM_NAME = 'signal-list'

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

/**
 * "Signal list" sign-up — wired to Netlify Forms. Posts to the static skeleton
 * at /__forms.html so Netlify's form handler intercepts it (never to `/`, which
 * the SSR function would swallow). Detection skeleton lives in public/__forms.html.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState('error')
      return
    }
    setState('sending')
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, email, city }),
      })
      setState('done')
      setEmail('')
      setCity('')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-2xl border border-[var(--voltage)] bg-[var(--ink-2)] p-8">
        <div className="kicker mb-3">Transmission received</div>
        <p className="font-display text-3xl font-bold uppercase leading-none">
          You're on the list.
        </p>
        <p className="mt-3 text-sm text-[var(--dim)]">
          Drops, tour codes and the occasional unreleased edit. No noise.
        </p>
      </div>
    )
  }

  return (
    <form
      name={FORM_NAME}
      onSubmit={submit}
      className="rounded-2xl border border-[var(--line)] bg-[var(--ink-2)] p-6 md:p-8"
      noValidate
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p hidden>
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="eyebrow mb-2 block">Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (state === 'error') setState('idle')
              }}
              placeholder="you@frequency.fm"
              required
              className="w-full border-b border-[var(--line-strong)] bg-transparent py-2 font-mono text-sm text-[var(--bone)] outline-none placeholder:text-[var(--faint)] focus:border-[var(--voltage)]"
            />
          </label>
          <label className="block">
            <span className="eyebrow mb-2 block">City (optional)</span>
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="So we route a show your way"
              className="w-full border-b border-[var(--line-strong)] bg-transparent py-2 font-mono text-sm text-[var(--bone)] outline-none placeholder:text-[var(--faint)] focus:border-[var(--voltage)]"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn-voltage h-[46px] self-end px-7 text-xs font-semibold disabled:opacity-60"
        >
          <span>{state === 'sending' ? 'Sending…' : 'Join the signal'}</span>
        </button>
      </div>

      {state === 'error' && (
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--voltage)]">
          Enter a valid email to tune in.
        </p>
      )}
    </form>
  )
}
