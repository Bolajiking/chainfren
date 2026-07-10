'use client'
import React, { forwardRef, useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────
// One modal, three variants — the CTA ladder from the Media Launchpad
// Buildout §4. Every lead arrives pre-routed via the hidden `solution` /
// `vertical` tags. Opened by dispatching `cf:open-lead` with a detail of
// { variant, solution, vertical } or by passing open/variant props.
//   variant: 'sales' | 'demo' | 'early-access'
// ─────────────────────────────────────────────────────────────────────────

const DEFAULT_ACCENT = '#40ACFF'

const VERTICAL_OPTIONS = [
  ['sports', 'Sports & Leagues'],
  ['churches', 'Churches & Ministries'],
  ['events', 'Events & Concerts'],
  ['film', 'Film & Cinema'],
  ['music', 'Music & Artists'],
  ['creators', 'Content Creators'],
  ['other', 'Something else'],
]
const AUDIENCE_BANDS = [
  ['starting', 'Just starting out (under 5K)'],
  ['momentum', 'Building momentum (5K – 50K)'],
  ['established', 'Established (50K – 500K)'],
  ['major', 'Major (500K+)'],
  ['prelaunch', 'Pre-launch — no audience yet'],
]
const BUDGET_BANDS = [
  ['under-5', 'Under $5K'],
  ['5-25', '$5K – $25K'],
  ['25-100', '$25K – $100K'],
  ['100-plus', '$100K+'],
  ['unsure', 'Not sure yet'],
]
const TIMELINE_BANDS = [
  ['this-month', 'This month'],
  ['1-3-months', 'Next 1–3 months'],
  ['exploring', 'Just exploring'],
]

const VARIANT = {
  sales: {
    eyebrow: 'Talk to sales',
    title: 'Tell us what you’re building.',
    sub: 'The form takes 60 seconds. If we’re not the right team, we’ll point you to who is.',
    submit: 'Tell us what you’re building',
    success: 'Got it. We’ll come back within 48 hours with next steps — including pricing.',
    formType: 'solution-sales',
  },
  demo: {
    eyebrow: 'Book a demo',
    title: 'Book a free demo.',
    sub: 'We’ll come with a channel mocked up for you — the demo is personalized.',
    submit: 'Book my demo',
    success: 'You’re booked. We’ll come with a channel mocked up for you.',
    formType: 'solution-demo',
  },
  'early-access': {
    eyebrow: 'Request early access',
    title: 'Request early access.',
    sub: 'We onboard in waves. Three fields, nothing more.',
    submit: 'Request Early Access',
    success: 'You’re on the list. We onboard in waves — watch your inbox.',
    formType: 'solution-early-access',
  },
  access: {
    eyebrow: 'Request access',
    title: 'Request access.',
    sub: 'Tell us who you are and we’ll get you set up. We onboard in waves and reply within 48 hours.',
    submit: 'Request access',
    success: 'Got it. We onboard in waves — watch your inbox for your access.',
    formType: 'solution-access',
  },
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

export default function SolutionLeadModal({ open, variant = 'sales', solution = '', solutionName = '', vertical = '', accent = DEFAULT_ACCENT, onClose }) {
  const cfg = VARIANT[variant] || VARIANT.sales
  // The vertical picker (Sports/Churches/Film…) only applies to Media Launchpad.
  // Other solutions (Creator Growth OS, Community Engine) skip it entirely.
  const showVertical = solution === 'media-launchpad' || Boolean(vertical)
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const firstRef = useRef(null)

  useEffect(() => { if (open) { setSent(false); setErrors({}); setSubmitError('') } }, [open, variant])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstRef.current?.focus(), 100)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); clearTimeout(t) }
  }, [open, onClose])

  const set = (k, v) => setData((p) => ({ ...p, [k]: v }))

  const requiredByVariant = () => {
    if (variant === 'access') return ['name', 'email']
    if (variant === 'demo') return showVertical ? ['name', 'email', 'vertical', 'project'] : ['name', 'email', 'project']
    if (variant === 'early-access') return showVertical ? ['email', 'channel', 'vertical'] : ['email', 'channel']
    return ['name', 'email', 'project']
  }

  const validate = () => {
    const e = {}
    const req = requiredByVariant()
    req.forEach((k) => { if (!String(data[k] || '').trim()) e[k] = 'Required.' })
    if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = 'That email doesn’t look right.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    setSubmitError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: cfg.formType, solution, solutionName, vertical: data.vertical || vertical, ...data }),
      })
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error || 'Submission failed.') }
      setSent(true)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Try again.')
    } finally { setSubmitting(false) }
  }

  if (!open) return null

  return (
    <div
      role="dialog" aria-modal="true" aria-label={cfg.title}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(8, 1, 27, 0.78)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 'clamp(0px, 4vw, 56px) clamp(0px, 4vw, 32px)', overflowY: 'auto',
        animation: 'cf-lead-fade 240ms cubic-bezier(0.22,1,0.36,1)',
        fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif',
      }}
    >
      <style jsx global>{`
        @keyframes cf-lead-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cf-lead-rise { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      <div style={{
        position: 'relative', width: '100%', maxWidth: 600, background: '#08153C',
        backgroundImage: `radial-gradient(ellipse at 90% -10%, ${accent}26, transparent 55%), radial-gradient(ellipse at -10% 100%, #3D1F7344, transparent 55%)`,
        color: '#fff', border: '1.5px solid rgba(255,255,255,0.14)', borderRadius: 'clamp(0px, 3vw, 28px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)', padding: 'clamp(28px, 5vw, 52px) clamp(20px, 5vw, 52px)',
        animation: 'cf-lead-rise 320ms cubic-bezier(0.22,1,0.36,1)',
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 9999,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
          color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>
        </button>

        {sent ? (
          <div style={{ padding: '8px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${accent}26`, border: `1.5px solid ${accent}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: accent, marginBottom: 24 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.25rem)', fontWeight: 450, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 16 }}>{cfg.success}</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 24 }}>
              A real human from the Chainfren team reads every submission. While you wait, read <a href="/media" style={{ color: accent, textDecoration: 'underline' }}>Sabi</a> — where the work gets documented.
            </p>
            <button onClick={onClose} style={{ padding: '14px 28px', borderRadius: 9999, background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', fontFamily: 'inherit', fontSize: 13, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div style={{ marginBottom: 26 }}>
              <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>
                {cfg.eyebrow}{solutionName ? ` · ${solutionName}` : ''}
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.25rem)', fontWeight: 450, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '14px 0 10px' }}>{cfg.title}</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{cfg.sub}</p>
            </div>

            {variant !== 'early-access' && (
              <Field id="name" label="Name" error={errors.name}>
                <Inp ref={firstRef} value={data.name || ''} onChange={(v) => set('name', v)} placeholder="Your name" autoComplete="name" accent={accent} />
              </Field>
            )}

            <Field id="email" label="Email" error={errors.email}>
              <Inp ref={variant === 'early-access' ? firstRef : undefined} type="email" value={data.email || ''} onChange={(v) => set('email', v)} placeholder="your@email.com" autoComplete="email" accent={accent} />
            </Field>

            {(variant === 'sales' || variant === 'access') && (
              <Field id="company" label="Company / creator name">
                <Inp value={data.company || ''} onChange={(v) => set('company', v)} placeholder="Company or creator name" accent={accent} />
              </Field>
            )}

            {variant === 'demo' && (
              <Field id="company" label="Organization / channel name">
                <Inp value={data.company || ''} onChange={(v) => set('company', v)} placeholder="Organization or channel name" accent={accent} />
              </Field>
            )}

            {variant === 'early-access' && (
              <Field id="channel" label="Channel / brand name" error={errors.channel}>
                <Inp value={data.channel || ''} onChange={(v) => set('channel', v)} placeholder="Your channel or brand" accent={accent} />
              </Field>
            )}

            {(variant === 'demo' || variant === 'early-access') && showVertical && (
              <Field id="vertical" label="Vertical" error={errors.vertical}>
                <Sel value={data.vertical || vertical || ''} onChange={(v) => set('vertical', v)} options={VERTICAL_OPTIONS} accent={accent} placeholder="Pick your vertical" />
              </Field>
            )}

            {variant === 'access' && (
              <Field id="project" label="Anything we should know? (optional)">
                <Area value={data.project || ''} onChange={(v) => set('project', v)} placeholder="A sentence or two — optional." accent={accent} />
              </Field>
            )}

            {variant === 'demo' && (
              <>
                <Field id="audience" label="Audience size">
                  <Sel value={data.audience || ''} onChange={(v) => set('audience', v)} options={AUDIENCE_BANDS} accent={accent} placeholder="Roughly how big?" />
                </Field>
                <Field id="project" label="What do you want to launch?" error={errors.project}>
                  <Area value={data.project || ''} onChange={(v) => set('project', v)} placeholder="A few sentences is plenty." accent={accent} />
                </Field>
              </>
            )}

            {variant === 'sales' && (
              <>
                <Field id="project" label="What are you building?" error={errors.project}>
                  <Area value={data.project || ''} onChange={(v) => set('project', v)} placeholder="A few sentences is plenty. We’ll dig deeper on the call." accent={accent} />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <Field id="budget" label="Budget band (optional)">
                    <Sel value={data.budget || ''} onChange={(v) => set('budget', v)} options={BUDGET_BANDS} accent={accent} placeholder="Optional" />
                  </Field>
                  <Field id="timeline" label="Timeline (optional)">
                    <Sel value={data.timeline || ''} onChange={(v) => set('timeline', v)} options={TIMELINE_BANDS} accent={accent} placeholder="Optional" />
                  </Field>
                </div>
              </>
            )}

            {submitError && <p style={{ fontSize: 13, color: '#FF8E8E', marginBottom: 12 }}>{submitError}</p>}

            <button type="submit" disabled={submitting} style={{
              width: '100%', padding: '18px 24px', borderRadius: 9999, background: accent, color: '#08153C', border: 'none',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 450, letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: submitting ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginTop: 12, opacity: submitting ? 0.7 : 1,
            }}>
              {submitting ? 'Sending…' : <>{cfg.submit} <Arrow /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const inputBase = {
  width: '100%', padding: '13px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.16)', color: '#fff', fontFamily: 'inherit', fontSize: 15,
  outline: 'none', transition: 'border 200ms, background 200ms',
}

function Field({ id, label, error, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: 13, fontWeight: 420, color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: 12, color: '#FF8E8E', marginTop: 6 }}>{error}</p>}
    </div>
  )
}

const Inp = forwardRef(function Inp({ value, onChange, accent, ...rest }, ref) {
  return (
    <input ref={ref} value={value} onChange={(e) => onChange(e.target.value)} {...rest} style={inputBase}
      onFocus={(e) => { e.target.style.borderColor = `${accent}99`; e.target.style.background = 'rgba(255,255,255,0.08)' }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.16)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} />
  )
})

function Area({ value, onChange, accent, ...rest }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} {...rest}
      style={{ ...inputBase, resize: 'vertical', minHeight: 96, lineHeight: 1.5 }}
      onFocus={(e) => { e.target.style.borderColor = `${accent}99`; e.target.style.background = 'rgba(255,255,255,0.08)' }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.16)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} />
  )
}

function Sel({ value, onChange, options, accent, placeholder }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{ ...inputBase, appearance: 'none', cursor: 'pointer', color: value ? '#fff' : 'rgba(255,255,255,0.5)' }}
      onFocus={(e) => { e.target.style.borderColor = `${accent}99` }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.16)' }}>
      <option value="" style={{ color: '#08153C' }}>{placeholder}</option>
      {options.map(([v, l]) => <option key={v} value={v} style={{ color: '#08153C' }}>{l}</option>)}
    </select>
  )
}
