'use client'
import React, { forwardRef, useEffect, useRef, useState } from 'react'

const FORM_LS_KEY = 'cf_agency_intake_v1'
const FORM_TS_KEY = 'cf_agency_intake_ts_v1'
const DEFAULT_ACCENT = '#40ACFF'

const TYPE_OPTIONS = [
  ['creator',         'Creator',                                          'musician, podcaster, athlete, public figure, content creator'],
  ['creator-brand',   'Creator-led brand or business',                    ''],
  ['media',           'Media, event, or entertainment company',           ''],
  ['community',       'Church, sports league, or community organization', ''],
  ['cultural',        'Cultural, lifestyle, or fashion brand',            ''],
  ['web3',            'Web3 protocol or ecosystem',                       ''],
  ['other',           'Something else',                                   ''],
]
const SIZE_OPTIONS = [
  ['starting',   'Just starting out (under 5K)'],
  ['momentum',   'Building momentum (5K – 50K)'],
  ['established','Established (50K – 500K)'],
  ['major',      'Major (500K+)'],
  ['multi',      'Multiple audiences across platforms'],
  ['prelaunch',  'Pre-launch — no audience yet'],
]
const BUDGET_OPTIONS = [
  ['under-5',  "Under $5K — let's start with an Audit"],
  ['5-25',     '$5K – $25K — focused engagement'],
  ['25-100',   '$25K – $100K — full Program'],
  ['100-plus', '$100K+ — Program with extended scope'],
  ['retainer', 'Ongoing retainer'],
  ['unsure',   "Not sure yet — let's talk"],
]
const TIMELINE_OPTIONS = [
  ['this-month', 'This month'],
  ['1-3-months', 'Next 1–3 months'],
  ['exploring',  'Just exploring for now'],
]

const blankForm = {
  name: '', email: '', phone: '',
  who: '', project: '', size: '', budget: '',
  url: '', telegram: '', timeline: '', source: '',
}

function loadDraft() {
  try {
    const ts = parseInt(localStorage.getItem(FORM_TS_KEY) || '0', 10)
    if (ts && Date.now() - ts > 1000 * 60 * 60 * 24) return blankForm
    const v = JSON.parse(localStorage.getItem(FORM_LS_KEY) || 'null')
    return v && typeof v === 'object' ? { ...blankForm, ...v } : blankForm
  } catch (e) { return blankForm }
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

export default function AgencyContactModal({ open, onClose, accent = DEFAULT_ACCENT }) {
  const [data, setData] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (open && !sent) setData(loadDraft())
  }, [open, sent])

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
    if (!open || sent) return
    try {
      localStorage.setItem(FORM_LS_KEY, JSON.stringify(data))
      localStorage.setItem(FORM_TS_KEY, String(Date.now()))
    } catch (e) {}
  }, [data, open, sent])

  const set = (k, v) => setData((prev) => ({ ...prev, [k]: v }))

  const validate = () => {
    const e = {}
    if (!data.name.trim()) e.name = 'Tell us what to call you.'
    if (!data.email.trim()) e.email = 'We need a way to reply.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = "That email doesn't look right."
    if (!data.who) e.who = 'Pick the closest match.'
    if (!data.project.trim()) e.project = 'A few sentences is plenty.'
    if (!data.size) e.size = 'Pick the closest match.'
    if (!data.budget) e.budget = 'Pick the closest match.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    setSubmitError('')
    if (!validate()) {
      const firstKey = ['name','email','who','project','size','budget'].find((k) => errors[k])
      const el = firstKey && document.getElementById(`field-${firstKey}`)
      el && el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'agency-intake', ...data }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Submission failed.')
      }
      setSent(true)
      try {
        localStorage.removeItem(FORM_LS_KEY)
        localStorage.removeItem(FORM_TS_KEY)
      } catch (e) {}
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
      aria-label="Tell us what you're building"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(8, 1, 27, 0.78)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 'clamp(0px, 4vw, 56px) clamp(0px, 4vw, 32px)',
        overflowY: 'auto',
        animation: 'cf-fade-in 240ms cubic-bezier(0.22,1,0.36,1)',
        fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif',
      }}
    >
      <style jsx global>{`
        @keyframes cf-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cf-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={{
        position: 'relative',
        width: '100%', maxWidth: 640,
        background: '#08153C',
        backgroundImage: `radial-gradient(ellipse at 90% -10%, ${accent}26, transparent 55%), radial-gradient(ellipse at -10% 100%, #3D1F7344, transparent 55%)`,
        color: '#fff',
        border: '1.5px solid rgba(255,255,255,0.14)',
        borderRadius: 'clamp(0px, 3vw, 28px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
        padding: 'clamp(28px, 5vw, 56px) clamp(20px, 5vw, 56px)',
        animation: 'cf-rise 320ms cubic-bezier(0.22,1,0.36,1)',
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
          <ThankYou accent={accent} email={data.email} onClose={onClose} />
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>
                Tell us what you&apos;re building
              </span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)', fontWeight: 450,
                lineHeight: 1.05, letterSpacing: '-0.02em', margin: '14px 0 10px',
              }}>
                Tell us what you&apos;re building.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                60 seconds. Real conversation in 24 hours.
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 14, letterSpacing: '0.04em' }}>
                Required fields marked with <span style={{ color: accent }}>*</span>
              </p>
            </div>

            <FormField id="name" label={<>What should we call you? <Req c={accent} /></>} error={errors.name}>
              <DarkInput ref={firstFieldRef} value={data.name} onChange={(v) => set('name', v)} placeholder="Your name" autoComplete="name" />
            </FormField>

            <FormField id="email" label={<>Where can we reach you? <Req c={accent} /></>} error={errors.email}
              helper="Phone or WhatsApp also works if you prefer.">
              <DarkInput type="email" value={data.email} onChange={(v) => set('email', v)} placeholder="your@email.com" autoComplete="email" />
            </FormField>

            <FormField id="phone" label={<span style={{ color: 'rgba(255,255,255,0.6)' }}>Phone / WhatsApp <em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.4)' }}>(optional)</em></span>}>
              <DarkInput type="tel" value={data.phone} onChange={(v) => set('phone', v)} placeholder="+234..." autoComplete="tel" />
            </FormField>

            <FormField id="who" label={<>Which of these sounds most like you? <Req c={accent} /></>} error={errors.who}>
              <RadioGroup name="who" value={data.who} onChange={(v) => set('who', v)} accent={accent}
                options={TYPE_OPTIONS.map(([v, l, h]) => ({ value: v, label: l, hint: h }))} />
            </FormField>

            <FormField id="project" label={<>What are you trying to build, fix, or grow? <Req c={accent} /></>} error={errors.project}>
              <DarkTextarea value={data.project} onChange={(v) => set('project', v)} placeholder="A few sentences is plenty. We'll dig deeper on the call." rows={4} />
            </FormField>

            <FormField id="size" label={<>Roughly how big is your audience right now? <Req c={accent} /></>} error={errors.size}>
              <RadioGroup name="size" value={data.size} onChange={(v) => set('size', v)} accent={accent}
                options={SIZE_OPTIONS.map(([v, l]) => ({ value: v, label: l }))} />
            </FormField>

            <FormField id="budget" label={<>What&apos;s the budget range you&apos;re thinking about? <Req c={accent} /></>} error={errors.budget}
              helper="We're upfront about budget so we can match you to the right engagement. If your budget doesn't fit, we'll point you somewhere that does.">
              <RadioGroup name="budget" value={data.budget} onChange={(v) => set('budget', v)} accent={accent}
                options={BUDGET_OPTIONS.map(([v, l]) => ({ value: v, label: l }))} />
            </FormField>

            <FormField id="url" label={<span style={{ color: 'rgba(255,255,255,0.85)' }}>Got a website or main social we should look at?</span>}>
              <DarkInput value={data.url} onChange={(v) => set('url', v)} placeholder="URL or @handle — Instagram, X, YouTube, anywhere" />
            </FormField>

            <FormField id="telegram" label={<span style={{ color: 'rgba(255,255,255,0.6)' }}>Telegram username <em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.4)' }}>(optional)</em></span>}
              helper="Optional — useful if you're Web3-native and that's where you actually communicate.">
              <DarkInput value={data.telegram} onChange={(v) => set('telegram', v)} placeholder="@yourhandle" />
            </FormField>

            <FormField id="timeline" label={<span style={{ color: 'rgba(255,255,255,0.85)' }}>When are you hoping to start?</span>}>
              <RadioGroup name="timeline" value={data.timeline} onChange={(v) => set('timeline', v)} accent={accent}
                options={TIMELINE_OPTIONS.map(([v, l]) => ({ value: v, label: l }))} />
            </FormField>

            <FormField id="source" label={<span style={{ color: 'rgba(255,255,255,0.85)' }}>How&apos;d you hear about Chainfren?</span>}>
              <DarkInput value={data.source} onChange={(v) => set('source', v)} placeholder="Optional — but useful for us" />
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
                transition: 'transform 200ms, opacity 200ms',
                opacity: submitting ? 0.7 : 1,
              }}>
                {submitting ? 'Sending…' : <>Send <Arrow size={14} /></>}
              </button>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                We respond within 24 hours. Usually faster.
              </p>
            </div>

            <input type="text" name="company_extra" tabIndex={-1} autoComplete="off"
              style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
              onChange={() => {}} />
          </form>
        )}
      </div>
    </div>
  )
}

const Req = ({ c }) => <span style={{ color: c, marginLeft: 2 }}>*</span>

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

const DarkInput = forwardRef(function DarkInput({ value, onChange, ...rest }, ref) {
  return (
    <input ref={ref} value={value} onChange={(e) => onChange(e.target.value)} {...rest}
      style={inputBase}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(64,172,255,0.6)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.16)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
    />
  )
})

function DarkTextarea({ value, onChange, rows = 4, ...rest }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} {...rest}
      style={{ ...inputBase, resize: 'vertical', minHeight: rows * 24 + 28, lineHeight: 1.5 }}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(64,172,255,0.6)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
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
            cursor: 'pointer', transition: 'all 180ms',
            position: 'relative',
          }}>
            <span style={{
              flexShrink: 0, marginTop: 3,
              width: 18, height: 18, borderRadius: '50%',
              border: `2px solid ${sel ? accent : 'rgba(255,255,255,0.4)'}`,
              background: sel ? accent : 'transparent',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 180ms',
            }}>
              {sel && <span style={{ width: 6, height: 6, background: '#08153C', borderRadius: '50%' }} />}
            </span>
            <input type="radio" name={name} value={o.value} checked={sel} onChange={() => onChange(o.value)}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <span style={{ fontSize: 14.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.92)' }}>
              {o.label}
              {o.hint && <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: 6 }}>— {o.hint}</span>}
            </span>
          </label>
        )
      })}
    </div>
  )
}

function ThankYou({ accent, email, onClose }) {
  const [subEmail, setSubEmail] = useState(email || '')
  const [subbed, setSubbed] = useState(false)
  return (
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
        Thanks. We&apos;ve got it.
      </h2>
      <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65, marginBottom: 16 }}>
        A real human from the Chainfren team will reach out within 24 hours — usually much faster. We&apos;ll have read your form before we email you, so the first conversation can start where you actually are, not where the small talk would have taken us.
      </p>
      <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: 24 }}>
        While you wait — read <a href="/sabi" style={{ color: accent, textDecoration: 'underline' }}>Sabi</a>, Chainfren&apos;s media network. The work we do with creators and brands gets documented there.
      </p>

      <div style={{
        marginTop: 14, padding: 20,
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
      }}>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.78)', marginBottom: 12, lineHeight: 1.5 }}>
          Want updates from the Chainfren team while you wait?
        </p>
        {subbed ? (
          <p style={{ fontSize: 14, color: accent, fontWeight: 420 }}>
            Subscribed. Welcome to Sabi.
          </p>
        ) : (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input value={subEmail} onChange={(e) => setSubEmail(e.target.value)} placeholder="your@email.com"
              style={{ ...inputBase, flex: '1 1 200px' }} />
            <button onClick={() => setSubbed(true)} style={{
              padding: '14px 22px', borderRadius: 14,
              background: accent, color: '#08153C', border: 'none',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 450,
              letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>Subscribe to Sabi</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 28 }}>
        <button onClick={onClose} style={{
          padding: '14px 28px', borderRadius: 9999,
          background: 'transparent', color: '#fff',
          border: '1.5px solid rgba(255,255,255,0.3)',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 450,
          letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Close</button>
      </div>
    </div>
  )
}
