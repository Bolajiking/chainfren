'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'
import { CF, solutionByKey } from '../../../../config/stack'

const ACCENT = solutionByKey('media-launchpad').accent
const VERTICALS = [['sports', 'Sports & Leagues'], ['churches', 'Churches & Ministries'], ['events', 'Events & Concerts'], ['film', 'Film & Cinema'], ['music', 'Music & Artists'], ['creators', 'Content Creators'], ['other', 'Something else']]
const BANDS = [['starting', 'Under 5K'], ['momentum', '5K – 50K'], ['established', '50K – 500K'], ['major', '500K+'], ['prelaunch', 'Pre-launch']]

export default function DemoPage() {
  const [data, setData] = useState({ name: '', company: '', email: '', vertical: '', audience: '', project: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))
  const inp = { width: '100%', padding: '14px 16px', borderRadius: 14, background: '#fff', border: `2px solid ${CF.dark}22`, color: CF.dark, fontFamily: 'inherit', fontSize: 15, outline: 'none' }

  const onSubmit = async (e) => {
    e.preventDefault()
    const er = {}
    ;['name', 'email', 'vertical', 'project'].forEach((k) => { if (!String(data[k]).trim()) er[k] = 'Required.' })
    if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) er.email = 'Invalid email.'
    setErrors(er)
    if (Object.keys(er).length) return
    setSubmitting(true)
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ formType: 'solution-demo', solution: 'media-launchpad', solutionName: 'Media Launchpad', ...data }) })
      setDone(true)
    } catch (_) {} finally { setSubmitting(false) }
  }

  return (
    <div style={{ background: '#F5F4EE', minHeight: '100vh', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif', color: CF.dark }}>
      <SiteHeader badgeLabel="Products" accent={ACCENT} cta={{ label: 'Tell us what you\'re building', href: '/products/media-launchpad' }} />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px 0' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: 8, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', color: CF.muted, marginBottom: 20 }}>
          <Link href="/products" style={{ color: CF.muted, textDecoration: 'none' }}>Solutions</Link><span>›</span>
          <Link href="/products/media-launchpad" style={{ color: CF.muted, textDecoration: 'none' }}>Media Launchpad</Link><span>›</span>
          <span style={{ color: CF.dark }}>Demo</span>
        </nav>

        <div style={{ borderRadius: 26, border: `2px solid ${CF.dark}`, background: CF.dark, color: '#fff', padding: 'clamp(28px, 5vw, 48px)', backgroundImage: `radial-gradient(ellipse at 90% 0%, ${ACCENT}44, transparent 55%)` }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT }}>Book a demo · Media Launchpad</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.03, margin: '16px 0 12px' }}>See your channel, mocked up.</h1>
          <p style={{ fontSize: 16.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>Tell us what you want to launch and we’ll come to the call with a channel already mocked up for you.</p>
        </div>

        <div style={{ borderRadius: 26, border: `2px solid ${CF.dark}`, background: '#fff', padding: 'clamp(24px, 4vw, 40px)', margin: '8px 0 64px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: CF.mint, border: `2px solid ${CF.dark}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={CF.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 500, color: CF.dark, marginBottom: 10 }}>You’re booked.</h2>
              <p style={{ fontSize: 15.5, color: CF.muted, lineHeight: 1.6 }}>We’ll come with a channel mocked up for you. Watch your inbox for a scheduling link.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[['name', 'Name', 'text'], ['company', 'Organization / channel name', 'text'], ['email', 'Email', 'email']].map(([k, label, type]) => (
                <div key={k}>
                  <label style={{ display: 'block', fontSize: 13.5, fontWeight: 500, marginBottom: 8 }}>{label}{['name', 'email'].includes(k) && <span style={{ color: ACCENT }}> *</span>}</label>
                  <input type={type} value={data[k]} onChange={(e) => set(k, e.target.value)} style={inp} placeholder={label} />
                  {errors[k] && <p style={{ fontSize: 12, color: '#E5484D', marginTop: 6 }}>{errors[k]}</p>}
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 13.5, fontWeight: 500, marginBottom: 8 }}>Vertical<span style={{ color: ACCENT }}> *</span></label>
                <select value={data.vertical} onChange={(e) => set('vertical', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer', color: data.vertical ? CF.dark : CF.dim }}>
                  <option value="">Pick your vertical</option>
                  {VERTICALS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                {errors.vertical && <p style={{ fontSize: 12, color: '#E5484D', marginTop: 6 }}>{errors.vertical}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13.5, fontWeight: 500, marginBottom: 8 }}>Audience size</label>
                <select value={data.audience} onChange={(e) => set('audience', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer', color: data.audience ? CF.dark : CF.dim }}>
                  <option value="">Roughly how big?</option>
                  {BANDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13.5, fontWeight: 500, marginBottom: 8 }}>What do you want to launch?<span style={{ color: ACCENT }}> *</span></label>
                <textarea value={data.project} onChange={(e) => set('project', e.target.value)} rows={4} style={{ ...inp, resize: 'vertical', minHeight: 100, lineHeight: 1.5 }} placeholder="A few sentences is plenty." />
                {errors.project && <p style={{ fontSize: 12, color: '#E5484D', marginTop: 6 }}>{errors.project}</p>}
              </div>
              <button type="submit" disabled={submitting} style={{ width: '100%', padding: '17px 24px', borderRadius: 9999, background: CF.dark, color: '#fff', border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 6 }}>{submitting ? 'Sending…' : 'Book my demo →'}</button>
              <p style={{ fontSize: 12.5, color: CF.muted, textAlign: 'center' }}>The form takes 60 seconds. If we’re not the right team, we’ll point you to who is.</p>
            </form>
          )}
        </div>
        <SiteFooter maxWidth={720} />
      </main>
    </div>
  )
}
