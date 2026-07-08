import Link from 'next/link'
import ChainfrenWordmark from './ChainfrenWordmark'
import { CF, FOOTER_COLUMNS } from '../config/stack'

// Footer generated from the living stack config — nav, footer and sitemap
// can never drift apart. The full engine/stack map lives here (backgrounding:
// the three engines retire from the homepage into footer-level storytelling).
export default function SiteFooter({ maxWidth = 1480 }) {
  return (
    <footer style={{ maxWidth, margin: '64px auto 0', padding: '0 24px 28px', fontFamily: 'var(--font-inter), "Inter Display", "Inter", sans-serif' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, paddingBottom: 36, borderBottom: '1px solid rgba(8,21,60,0.12)' }}>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <div style={{ fontSize: 11, fontWeight: 450, letterSpacing: '0.14em', textTransform: 'uppercase', color: CF.subtle, marginBottom: 12 }}>{col.heading}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {col.links.map(([label, href]) => (
                <Link key={label + href} href={href} style={{ fontSize: 13.5, color: CF.dark, textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ChainfrenWordmark fontSize={22} />
          <span style={{ fontSize: 12, color: CF.subtle }}>© {new Date().getFullYear()} Chainfren. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: 22, fontSize: 12, color: CF.subtle, fontWeight: 420, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <a href="https://x.com/chainfren" style={{ color: 'inherit', textDecoration: 'none' }}>X</a>
          <a href="https://chainfren.com" style={{ color: 'inherit', textDecoration: 'none' }}>chainfren.com</a>
          <a href="mailto:hello@chainfren.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@chainfren.com</a>
        </div>
      </div>
    </footer>
  )
}
