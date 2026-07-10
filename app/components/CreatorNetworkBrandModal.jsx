'use client'
import React, { useEffect, useRef, useState } from 'react'

const BUDGET_OPTIONS = [
  ['under-10', 'Under $10K'],
  ['10-50', '$10K – $50K'],
  ['50-150', '$50K – $150K'],
  ['150-plus', '$150K+'],
  ['unsure', "Not sure yet — let's talk"],
]
const TIMELINE_OPTIONS = [
  ['this-month', 'This month'],
  ['1-3-months', 'Next 1–3 months'],
  ['exploring', 'Just exploring for now'],
]

const blankForm = {
  name: '', company: '', role: '', email: '',
  goal: '', budget: '', timeline: '', markets: '',
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

const Req = ({ c }) => <span style={{ color: c, marginLeft: 2 }}>*</span>

export default function CreatorNetworkBrandModal({ open, onClose, accent = '#5ACDFF' }) {
  const [data, setData] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstFieldRef.current?.focus(), 100)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) { setData(blankForm); setSent(false); setErrors({}); setSubmitError('') }
  }, [open])

  const set = (k, v) => setData((prev) => ({ ...prev, [k]: v }))

  const validate = () => {
    const e = {}
    if (!data.name.trim()) e.name = 'Tell us what to call you.'
    if (!data.company.trim()) e.company = 'Which company or project?'
    if (!data.email.trim()) e.email = 'We need a way to reply.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = "That email doesn't look right."
    if (!data.goal.trim()) e.goal = 'A few sentences is plenty.'
    if (!data.budget) e.budget = 'Pick the closest match.'
    if (!data.timeline) e.timeline = 'Pick the closest match.'
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
        body: JSON.stringify({ formType: 'creator-network-brand', ...data }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Submission failed.')
      }
      setSent(true)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hire the network"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(8, 1, 27, 0.78)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 'clamp(0px, 4vw, 56px) clamp(0px, 4vw, 32px)',
        overflowY: 'auto',
        animation: 'cnbm-fade-in 240ms cubic-bezier(0.22,1,0.36,1)',
        fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif',
      }}
    >
      <style jsx global>{`
        @keyframes cnbm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cnbm-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={{
        position: 'relative',
        width: '100%', maxWidth: 600,
        background: '#08153C',
        backgroundImage: `radial-gradient(ellipse at 90% -10%, ${accent}26, transparent 55%), radial-gradient(ellipse at -10% 100%, #3D1F7344, transparent 55%)`,
        color: '#fff',
        border: '1.5px solid rgba(255,255,255,0.14)',
        borderRadius: 'clamp(0px, 3vw, 28px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
        padding: 'clamp(28px, 5vw, 56px) clamp(20px, 5vw, 56px)',
        animation: 'cnbm-rise 320ms cubic-bezier(0.22,1,0.36,1)',
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 9999,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
          color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>

        {sent ? (
          <div style={{ padding: '8px 0' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: `${accent}26`, border: `1.5px solid ${accent}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: accent, marginBottom: 24,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)', fontWeight: 450, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 18 }}>
              Got it. We&apos;ll come back within 48 hours with next steps.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65, marginBottom: 28 }}>
              We&apos;ll match your brief against the network and follow up with a roster and plan. Prefer to talk directly? <a href="mailto:hello@chainfren.com" style={{ color: accent, textDecoration: 'underline' }}>hello@chainfren.com</a>
            </p>
            <button onClick={onClose} style={{
              padding: '14px 28px', borderRadius: 9999,
              background: 'transparent', color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.3)',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 450,
              letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
            }}>Close</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>
                Hire the network
              </span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)', fontWeight: 450,
                lineHeight: 1.05, letterSpacing: '-0.02em', margin: '14px 0 10px',
              }}>
                Tell us who you need to reach.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                We&apos;ll come back with a matched, vetted roster.
              </p>
            </div>

            <FormField id="name" label={<>Your name <Req c={accent} /></>} error={errors.name}>
              <DarkInput ref={firstFieldRef} value={data.name} onChange={(v) => set('name', v)} placeholder="Your name" autoComplete="name" />
            </FormField>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormField id="company" label={<>Company / project <Req c={accent} /></>} error={errors.company}>
                <DarkInput value={data.company} onChange={(v) => set('company', v)} placeholder="Company or project" />
              </FormField>
              <FormField id="role" label="Role">
                <DarkInput value={data.role} onChange={(v) => set('role', v)} placeholder="Growth, marketing, founder..." />
              </FormField>
            </div>

            <FormField id="email" label={<>Work email <Req c={accent} /></>} error={errors.email}>
              <DarkInput type="email" value={data.email} onChange={(v) => set('email', v)} placeholder="you@company.com" autoComplete="email" />
            </FormField>

            <FormField id="goal" label={<>What are you looking to achieve? <Req c={accent} /></>} error={errors.goal}>
              <DarkTextarea value={data.goal} onChange={(v) => set('goal', v)} placeholder="Campaign goals, audience, timelines — a few sentences is plenty." rows={4} />
            </FormField>

            <FormField id="budget" label={<>Budget band <Req c={accent} /></>} error={errors.budget}>
              <RadioGroup name="budget" value={data.budget} onChange={(v) => set('budget', v)} accent={accent}
                options={BUDGET_OPTIONS.map(([v, l]) => ({ value: v, label: l }))} />
            </FormField>

            <FormField id="timeline" label={<>Timeline <Req c={accent} /></>} error={errors.timeline}>
              <RadioGroup name="timeline" value={data.timeline} onChange={(v) => set('timeline', v)} accent={accent}
                options={TIMELINE_OPTIONS.map(([v, l]) => ({ value: v, label: l }))} />
            </FormField>

            <FormField id="markets" label={<span style={{ color: 'rgba(255,255,255,0.85)' }}>Target markets / audiences <em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.4)' }}>(optional)</em></span>}>
              <DarkInput value={data.markets} onChange={(v) => set('markets', v)} placeholder="e.g. Nigeria, pan-African, global crypto-native" />
            </FormField>

            {submitError && (
              <p style={{ fontSize: 13, color: '#FF8E8E', marginBottom: 12 }}>{submitError}</p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32 }}>
              <button type="submit" disabled={submitting} style={{
                width: '100%', padding: '18px 24px', borderRadius: 9999,
                background: accent, color: '#08153C', border: 'none',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 450,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                cursor: submitting ? 'wait' : 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                opacity: submitting ? 0.7 : 1,
              }}>
                {submitting ? 'Sending…' : <>Send brief <Arrow size={14} /></>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function FormField({ id, label, helper, error, children }) {
  return (
    <div id={`field-${id}`} style={{ marginBottom: 22 }}>
      <label htmlFor={id} style={{
        display: 'block', fontSize: 13.5, fontWeight: 420, color: '#fff',
        marginBottom: 8, letterSpacing: '-0.005em', lineHeight: 1.4,
      }}>{label}</label>
      {helper && (
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 10, lineHeight: 1.5 }}>
          {helper}
        </p>
      )}
      {children}
      {error && (
        <p style={{ fontSize: 12, color: '#FF8E8E', marginTop: 8, letterSpacing: '0.01em' }}>{error}</p>
      )}
    </div>
  )
}

const inputBase = {
  width: '100%', padding: '14px 18px', borderRadius: 14,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.16)',
  color: '#fff', fontFamily: 'inherit', fontSize: 15,
  outline: 'none', transition: 'border 200ms, background 200ms',
}

const DarkInput = React.forwardRef(function DarkInput({ value, onChange, ...rest }, ref) {
  return (
    <input ref={ref} value={value} onChange={(e) => onChange(e.target.value)} {...rest}
      style={inputBase}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(90,205,255,0.6)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.16)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
    />
  )
})

function DarkTextarea({ value, onChange, rows = 4, ...rest }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} {...rest}
      style={{ ...inputBase, resize: 'vertical', minHeight: rows * 24 + 28, lineHeight: 1.5 }}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(90,205,255,0.6)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.16)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
    />
  )
}

function RadioGroup({ name, value, onChange, options, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options.map((o) => {
        const sel = value === o.value
        return (
          <label key={o.value} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '14px 16px', borderRadius: 14,
            background: sel ? `${accent}1f` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${sel ? accent : 'rgba(255,255,255,0.14)'}`,
            cursor: 'pointer', transition: 'background 180ms, border-color 180ms',
            position: 'relative',
          }}>
            <span style={{
              flexShrink: 0, marginTop: 3,
              width: 18, height: 18, borderRadius: '50%',
              border: `2px solid ${sel ? accent : 'rgba(255,255,255,0.4)'}`,
              background: sel ? accent : 'transparent',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 180ms, border-color 180ms',
            }}>
              {sel && <span style={{ width: 6, height: 6, background: '#08153C', borderRadius: '50%' }} />}
            </span>
            <input type="radio" name={name} value={o.value} checked={sel} onChange={() => onChange(o.value)}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <span style={{ fontSize: 14.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.92)' }}>{o.label}</span>
          </label>
        )
      })}
    </div>
  )
}
