'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const CF = {
  dark: '#08153C',
  white: '#FFFFFF',
  muted: '#4A5568',
  mint: '#CBF0B8',
  cyan: '#5ACDFF',
}

const CATEGORY_OPTIONS = ['Music', 'Comedy', 'Sport', 'Lifestyle', 'Tech', 'Crypto / Web3', 'Other']
const OPENNESS_OPTIONS = [
  ['new', "New to crypto — I'd need onboarding"],
  ['some', 'Some familiarity — comfortable learning fast'],
  ['native', 'Crypto-native — I already live in this world'],
]

const blankForm = {
  name: '', creatorName: '', primaryPlatform: '', allPlatforms: '',
  category: '', location: '', audience: '', pastDeals: '', rate: '',
  openness: '', email: '', contactMethod: '', links: '',
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>
  )
}

const inputBase = {
  width: '100%', padding: '14px 18px', borderRadius: 14,
  background: CF.white, border: `1.5px solid rgba(8,21,60,0.18)`,
  color: CF.dark, fontFamily: 'inherit', fontSize: 15,
  outline: 'none', transition: 'border 200ms',
}

function Field({ label, required, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13.5, fontWeight: 500, color: CF.dark, marginBottom: 8 }}>
        {label} {required && <span style={{ color: '#0091FF' }}>*</span>}
      </label>
      {children}
      {error && <p style={{ fontSize: 12, color: '#E23F3F', marginTop: 6 }}>{error}</p>}
    </div>
  )
}

function TextInput({ value, onChange, ...rest }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} style={inputBase}
      onFocus={(e) => { e.target.style.borderColor = CF.dark }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(8,21,60,0.18)' }}
      {...rest} />
  )
}

function TextArea({ value, onChange, rows = 3, ...rest }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
      style={{ ...inputBase, resize: 'vertical', lineHeight: 1.5 }}
      onFocus={(e) => { e.target.style.borderColor = CF.dark }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(8,21,60,0.18)' }}
      {...rest} />
  )
}

function PillRadioRow({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((opt) => {
        const sel = value === opt
        return (
          <button key={opt} type="button" onClick={() => onChange(opt)} style={{
            padding: '9px 16px', borderRadius: 9999,
            border: `1.5px solid ${CF.dark}`,
            background: sel ? CF.dark : CF.white,
            color: sel ? CF.white : CF.dark,
            fontFamily: 'inherit', fontSize: 13, fontWeight: 450,
            cursor: 'pointer', transition: 'background 160ms, color 160ms, border-color 160ms',
          }}>{opt}</button>
        )
      })}
    </div>
  )
}

export default function CreatorApplyForm() {
  const [data, setData] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const set = (k, v) => setData((prev) => ({ ...prev, [k]: v }))

  const validate = () => {
    const e = {}
    if (!data.name.trim()) e.name = 'Tell us your name.'
    if (!data.creatorName.trim()) e.creatorName = 'What name/handle do you create under?'
    if (!data.primaryPlatform.trim()) e.primaryPlatform = 'Your main platform + handle.'
    if (!data.category) e.category = 'Pick the closest match.'
    if (!data.location.trim()) e.location = 'Where are you based?'
    if (!data.email.trim()) e.email = 'We need a way to reach you.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = "That email doesn't look right."
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
        body: JSON.stringify({ formType: 'creator-network-creator', ...data }),
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

  if (sent) {
    return (
      <div style={{
        maxWidth: 640, margin: '0 auto', textAlign: 'center',
        padding: 'clamp(32px, 6vw, 64px) 20px',
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%', margin: '0 auto 24px',
          background: `${CF.mint}`, border: `2px solid ${CF.dark}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: CF.dark,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 450, color: CF.dark, letterSpacing: '-0.02em', marginBottom: 16 }}>
          Application received.
        </h1>
        <p style={{ fontSize: 17, color: CF.muted, lineHeight: 1.6, marginBottom: 32 }}>
          We review every application personally. If it&apos;s a fit, we&apos;ll reach out.
        </p>
        <Link href="/creator-network" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '14px 28px', borderRadius: 9999, border: `2px solid ${CF.dark}`,
          color: CF.dark, textDecoration: 'none', fontSize: 13, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>Back to the network <Arrow /></Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ maxWidth: 640, margin: '0 auto', padding: '0 20px 80px' }}>
      <Field label="Your name" required error={errors.name}>
        <TextInput value={data.name} onChange={(v) => set('name', v)} placeholder="Your full name" autoComplete="name" />
      </Field>

      <Field label="Creator name / handle" required error={errors.creatorName}>
        <TextInput value={data.creatorName} onChange={(v) => set('creatorName', v)} placeholder="How your audience knows you" />
      </Field>

      <Field label="Primary platform + handle" required error={errors.primaryPlatform}>
        <TextInput value={data.primaryPlatform} onChange={(v) => set('primaryPlatform', v)} placeholder="e.g. Instagram @yourhandle" />
      </Field>

      <Field label="All platforms + follower counts">
        <TextArea value={data.allPlatforms} onChange={(v) => set('allPlatforms', v)} rows={2} placeholder="IG 200K, TikTok 400K, YouTube 50K..." />
      </Field>

      <Field label="Category" required error={errors.category}>
        <PillRadioRow options={CATEGORY_OPTIONS} value={data.category} onChange={(v) => set('category', v)} />
      </Field>

      <Field label="Location" required error={errors.location}>
        <TextInput value={data.location} onChange={(v) => set('location', v)} placeholder="City, country" />
      </Field>

      <Field label="Audience description">
        <TextArea value={data.audience} onChange={(v) => set('audience', v)} rows={2} placeholder="Who follows you, and where" />
      </Field>

      <Field label="Past brand deals">
        <TextArea value={data.pastDeals} onChange={(v) => set('pastDeals', v)} rows={2} placeholder="Brands you've worked with, if any" />
      </Field>

      <Field label="Rate expectations">
        <TextInput value={data.rate} onChange={(v) => set('rate', v)} placeholder="Rough range is fine" />
      </Field>

      <Field label="Openness to crypto / Web3 campaigns">
        <PillRadioRow options={OPENNESS_OPTIONS.map(([, l]) => l)} value={data.openness} onChange={(v) => set('openness', v)} />
      </Field>

      <Field label="Email" required error={errors.email}>
        <TextInput type="email" value={data.email} onChange={(v) => set('email', v)} placeholder="you@email.com" autoComplete="email" />
      </Field>

      <Field label="Preferred contact method">
        <TextInput value={data.contactMethod} onChange={(v) => set('contactMethod', v)} placeholder="Email, WhatsApp, Telegram..." />
      </Field>

      <Field label="Links to best work">
        <TextArea value={data.links} onChange={(v) => set('links', v)} rows={2} placeholder="A few links that show your best work" />
      </Field>

      {submitError && <p style={{ fontSize: 13, color: '#E23F3F', marginBottom: 16 }}>{submitError}</p>}

      <button type="submit" disabled={submitting} style={{
        width: '100%', padding: '18px 24px', borderRadius: 9999,
        background: CF.dark, color: CF.white, border: 'none',
        fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        cursor: submitting ? 'wait' : 'pointer', marginTop: 12,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        opacity: submitting ? 0.7 : 1,
      }}>
        {submitting ? 'Sending…' : <>Apply to join <Arrow /></>}
      </button>
    </form>
  )
}
