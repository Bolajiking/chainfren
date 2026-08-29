# Chainfren About Page Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the long About page with a concise public overview containing the intro, four-step argument, seven-offering list, and four visitor paths.

**Architecture:** Keep the existing `/about` route, content module, and page component. Use the thesis public configuration as the source for product names, descriptions, links, and visitor destinations, while omitting maturity data from the About page. Remove deleted sections from rendering, content, metadata, and structured data so the route has one coherent public contract.

**Tech Stack:** Next.js 13 App Router, React, JavaScript modules, Node test runner, gstack browser QA

---

## File map

- Create `tests/about-page.test.mjs`: source and data contract for the simplified About page.
- Modify `app/config/aboutContent.js`: keep only the intro, concise argument, seven public offerings, and four visitor paths.
- Modify `app/components/AboutPage.jsx`: render only the four approved sections and remove dead helpers, state, and imports.
- Modify `app/(mainpage)/about/page.jsx`: remove founder and FAQ structured data while keeping AboutPage, Organization references, and breadcrumb data.

### Task 1: Define the simplified About page contract

**Files:**
- Create: `tests/about-page.test.mjs`

- [ ] **Step 1: Write the failing content contract**

Create `tests/about-page.test.mjs` with checks that import the canonical public product records and read the three About page source files:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  PUBLIC_CTAS,
  PUBLIC_INITIATIVE_MATURITY,
  PUBLIC_PRODUCT_MATURITY,
} from '../content/chainfren-thesis/public-config.mjs'

const contentPath = new URL('../app/config/aboutContent.js', import.meta.url)
const componentPath = new URL('../app/components/AboutPage.jsx', import.meta.url)
const routePath = new URL('../app/(mainpage)/about/page.jsx', import.meta.url)

const contentSource = readFileSync(contentPath, 'utf8')
const componentSource = readFileSync(componentPath, 'utf8')
const routeSource = readFileSync(routePath, 'utf8')
const publicRecords = [...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY]

const offeringIds = [
  'media-launchpad',
  'creator-growth-os',
  'community-engine',
  'ai-agent-studio',
  'creator-network',
  'sabi',
  'star-factor',
]

test('about content selects the seven approved public offerings in order', () => {
  assert.match(contentSource, /PUBLIC_ABOUT_OFFERING_IDS\s*=\s*\[[\s\S]*'media-launchpad'[\s\S]*'creator-growth-os'[\s\S]*'community-engine'[\s\S]*'ai-agent-studio'[\s\S]*'creator-network'[\s\S]*'sabi'[\s\S]*'star-factor'[\s\S]*\]/)
  for (const id of offeringIds) {
    assert.ok(publicRecords.some((record) => record.id === id))
  }
  assert.doesNotMatch(contentSource, /\bIndy\b/)
  assert.match(contentSource, /Media Launchpad \(TiVi\)/)
})

test('about product rendering omits status and platform metadata', () => {
  assert.doesNotMatch(componentSource, /StageChip|STAGE_TONE|\.stage\b|runsOn|Runs on/)
  assert.match(componentSource, /ABOUT\.build\.items\.map/)
  assert.match(componentSource, /it\.name/)
  assert.match(componentSource, /it\.line/)
})

test('about renders only the approved sections', () => {
  for (const key of ['hero', 'argument', 'build', 'join']) {
    assert.match(componentSource, new RegExp(`ABOUT\\.${key}\\b`))
  }
  for (const key of ['numbers', 'company', 'principles', 'road', 'founder', 'faq']) {
    assert.doesNotMatch(componentSource, new RegExp(`ABOUT\\.${key}\\b`))
    assert.doesNotMatch(contentSource, new RegExp(`\\b${key}:`))
  }
})

test('about keeps four simple public visitor paths', () => {
  for (const key of ['creators', 'brands', 'partners', 'talent']) {
    assert.match(contentSource, new RegExp(`PUBLIC_CTAS\\.${key}`))
    assert.ok(PUBLIC_CTAS[key].href)
  }
  assert.doesNotMatch(contentSource, /PUBLIC_CTAS\.supporters/)
  assert.match(componentSource, /j\.label/)
  assert.doesNotMatch(componentSource, /j\.cta/)
})

test('about structured data matches visible content', () => {
  assert.match(routeSource, /'@type': 'AboutPage'/)
  assert.match(routeSource, /mainEntity: \{ '@id': ID\.org \}/)
  assert.match(routeSource, /breadcrumbSchema/)
  assert.doesNotMatch(routeSource, /FAQPage|about#faq|about#founder|'@type': 'Person'|ABOUT\.faq|ABOUT\.founder/)
})
```

- [ ] **Step 2: Run the test and confirm the old page fails the new contract**

Run:

```bash
node --test tests/about-page.test.mjs
```

Expected: FAIL because the current page includes status chips, extra sections, founder data, and FAQ data.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/about-page.test.mjs
git commit -m "test: define simplified about page contract"
```

### Task 2: Replace the About content with the concise public copy

**Files:**
- Modify: `app/config/aboutContent.js`
- Test: `tests/about-page.test.mjs`

- [ ] **Step 1: Import the canonical public records and define the approved selection**

At the top of `app/config/aboutContent.js`, import:

```js
import {
  PUBLIC_CTAS,
  PUBLIC_INITIATIVE_MATURITY,
  PUBLIC_PRODUCT_MATURITY,
} from '../../content/chainfren-thesis/public-config.mjs'

const PUBLIC_ABOUT_OFFERING_IDS = [
  'media-launchpad',
  'creator-growth-os',
  'community-engine',
  'ai-agent-studio',
  'creator-network',
  'sabi',
  'star-factor',
]

const publicOfferingRecords = [
  ...PUBLIC_PRODUCT_MATURITY,
  ...PUBLIC_INITIATIVE_MATURITY,
]

const ABOUT_OFFERINGS = PUBLIC_ABOUT_OFFERING_IDS.map((id) => {
  const record = publicOfferingRecords.find((item) => item.id === id)
  if (!record) throw new Error(`Missing public About offering: ${id}`)
  return {
    name: id === 'media-launchpad' ? 'Media Launchpad (TiVi)' : record.label,
    line: id === 'sabi'
      ? "Chainfren's home for broadcasts and publications on blockchains, AI, and the technologies unlocking the African economy."
      : record.description,
    href: record.href,
  }
})
```

Do not copy `maturity` into the About page records.

- [ ] **Step 2: Replace the metadata and hero supporting copy**

Use:

```js
meta: {
  title: 'About Chainfren: Ownership Infrastructure for the African Creator Economy',
  description: 'Chainfren is a distribution-first company building products that help Africans own the value their attention generates on the internet.',
},
hero: {
  eyebrow: 'About Chainfren',
  h1: ['African creators have already won the attention. The next fight is ', 'ownership', '.'],
  sub: 'Chainfren is a distribution-first company built to enable Africans to own the full value their attention generates on the internet. We build for creators, brands, and their audiences.',
  meta: [
    ['Founded', '2025'],
    ['Based in', 'Lagos, Nigeria'],
    ['Building for', 'Africa and worldwide'],
  ],
},
```

- [ ] **Step 3: Tighten the four argument steps**

Keep the existing `argument` shape and use this public copy:

```js
argument: {
  eyebrow: 'What we believe',
  title: 'The argument, in four steps.',
  intro: 'The short version of the Chainfren thesis.',
  more: { label: 'Read the full thesis', href: '/thesis' },
  steps: [
    {
      n: '01',
      t: 'The gap',
      lead: 'Africa is online. The value still leaves.',
      body: 'African creators, brands, and audiences shape what the internet watches and values. Too little of that value returns as lasting control, direct relationships, or income.',
    },
    {
      n: '02',
      t: 'The trap',
      lead: 'Attract, build dependence, then extract.',
      body: 'Platforms and middlemen help people find an audience. The problem begins when that access becomes dependence and someone else can change discovery, data, distribution, or payment without a practical way to leave.',
    },
    {
      n: '03',
      t: 'The unlock',
      lead: 'Open rails make another model possible.',
      body: 'Open rails, enabled by blockchain technology where it is useful, can support direct payments, portable identity, and participation beyond one company. The work is to turn those capabilities into products people can use.',
    },
    {
      n: '04',
      t: 'The thesis',
      lead: 'Africans should own the value their attention creates.',
      body: 'Chainfren works where attention becomes a relationship and that relationship can produce durable value. We build so Africans can keep what they create and still have the freedom to leave.',
    },
  ],
},
```

- [ ] **Step 4: Define the product list and visitor paths**

Keep only:

```js
build: {
  eyebrow: 'What we build',
  title: 'Products for the part after attention.',
  intro: 'We turn what we learn from culture and distribution into products people can use.',
  items: ABOUT_OFFERINGS,
},
join: {
  eyebrow: 'Work with us',
  title: 'Find your way in.',
  intro: 'Choose the path that fits what you want to build.',
  items: [
    { who: 'Creators', line: 'Build a business around the audience you earned.', ...PUBLIC_CTAS.creators },
    { who: 'Brands', line: 'Reach culture through products and distribution built for participation.', ...PUBLIC_CTAS.brands },
    { who: 'Partners', line: 'Bring infrastructure, distribution, or capital that fits the mission.', ...PUBLIC_CTAS.partners },
    { who: 'Potential hires', line: 'Help build the products and systems behind the mission.', ...PUBLIC_CTAS.talent },
  ],
},
```

Delete `numbers`, `company`, `principles`, `road`, `founder`, and `faq` from `ABOUT`. Delete comments that describe removed sections or private review notes.

- [ ] **Step 5: Run the humanizer audit on all visible copy**

Check the draft for inflated claims, promotional language, generic conclusions, repetitive cadence, passive voice, and em or en dashes. Preserve the approved meaning and revise any remaining AI patterns. Confirm the serialized visible copy contains no `—` or `–` characters.

- [ ] **Step 6: Run the focused test**

Run:

```bash
node --test tests/about-page.test.mjs
```

Expected: Some tests still fail because the component and route still render removed sections. The content-selection checks pass.

- [ ] **Step 7: Commit the content change**

```bash
git add app/config/aboutContent.js tests/about-page.test.mjs
git commit -m "docs: simplify about page copy"
```

### Task 3: Reduce the page component and structured data

**Files:**
- Modify: `app/components/AboutPage.jsx`
- Modify: `app/(mainpage)/about/page.jsx`
- Test: `tests/about-page.test.mjs`

- [ ] **Step 1: Remove dead component state and helpers**

In `AboutPage.jsx`:

- Change `import React, { useState } from 'react'` to `import React from 'react'`.
- Remove `AgencyContactModal` and its open state if the header CTA becomes a normal `/contact` link.
- Remove `STAGE_TONE` and `StageChip`.
- Remove CSS selectors used only by founder and FAQ layouts.
- Keep `Reveal`, `Eyebrow`, `SectionHead`, `cardBase`, and the responsive grid styles used by the four retained sections.
- Configure `SiteHeader` with `cta={{ label: 'Work with us', href: '/contact' }}`.

- [ ] **Step 2: Remove the deleted section renderers**

Delete the JSX blocks for:

- The arithmetic
- The company
- Principles
- The road ahead
- Founder note
- FAQ
- The current large closing banner
- `AgencyContactModal`

Keep the hero and argument section structure.

- [ ] **Step 3: Simplify the product renderer**

Replace the current product card header and footer with a plain linked card:

```jsx
{ABOUT.build.items.map((it, i) => {
  const card = (
    <div className="ab-lift ab-card" style={{ ...cardBase, background: CF.white, padding: '26px', height: '100%' }}>
      <h3 style={{ fontSize: 19, fontWeight: 500, color: CF.dark, letterSpacing: '-0.015em' }}>{it.name}</h3>
      <p style={{ fontSize: 14.5, color: CF.muted, lineHeight: 1.6, marginTop: 12 }}>{it.line}</p>
      {it.href && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 18, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: CF.dark }}>
          Explore <ArrowUpRight size={13} />
        </span>
      )}
    </div>
  )
  return (
    <Reveal key={it.name} delay={i * 0.04}>
      {it.href ? <Link href={it.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{card}</Link> : card}
    </Reveal>
  )
})}
```

Do not render status, maturity, or `runsOn` fields.

- [ ] **Step 4: Simplify the final visitor paths**

Render `ABOUT.join.items` as four compact linked cards. Reuse the existing card grid and `ArrowRight`. Render the canonical call-to-action text with `{j.label}`, not `{j.cta}`, because spreading `PUBLIC_CTAS` creates `label` and `href` fields. Do not add another banner after the cards.

- [ ] **Step 5: Align the route schema with visible content**

In `app/(mainpage)/about/page.jsx`, keep only:

```jsx
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE.url}/about#webpage`,
    url: `${SITE.url}/about`,
    name: ABOUT.meta.title,
    description: ABOUT.meta.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.org },
    mainEntity: { '@id': ID.org },
    inLanguage: 'en',
    significantLink: [
      `${SITE.url}/products`,
      `${SITE.url}/for-creators`,
      `${SITE.url}/for-brands`,
      `${SITE.url}/creator-network`,
      `${SITE.url}/sabi`,
      `${SITE.url}/contact`,
    ],
  },
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]),
]
```

Delete Person, founder Organization overlay, and FAQPage entries and their comments.

- [ ] **Step 6: Run the contract and production checks**

Run:

```bash
node --test tests/about-page.test.mjs
npm run test:thesis
npm run validate:thesis
npm run build
```

Expected: All commands pass. Existing nonblocking build warnings may remain unchanged.

- [ ] **Step 7: Commit the page simplification**

```bash
git add app/components/AboutPage.jsx 'app/(mainpage)/about/page.jsx' tests/about-page.test.mjs
git commit -m "feat: simplify chainfren about page"
```

### Task 4: Browser and responsive verification

**Files:**
- Modify only if verification finds an in-scope defect.

- [ ] **Step 1: Start or reuse the local development server**

Run:

```bash
npm run dev
```

Expected: `/about` is available at `http://localhost:3000/about`.

- [ ] **Step 2: Inspect the page in the browser**

Use the gstack browse skill to inspect `http://localhost:3000/about`. Confirm the visible section order is Intro, What we believe, What we build, Work with us. Confirm there are no console errors.

- [ ] **Step 3: Check desktop and mobile layouts**

Capture desktop and mobile views. Confirm:

- The hero remains readable and balanced.
- Argument cards do not clip or produce awkward single-word lines.
- Product descriptions have consistent rhythm without status labels.
- All four visitor paths are visible and easy to tap.
- Removed sections do not leave large empty gaps.

- [ ] **Step 4: Verify links**

Confirm the full thesis link, seven product links, and four visitor links resolve to intended local routes without a 404 response. Star Factor should resolve to `/thesis/read/the-road-ahead`.

- [ ] **Step 5: Fix and retest any in-scope defects**

If browser QA finds a defect, add or tighten the focused regression test first, make the smallest correction, and rerun Task 3 Step 6 plus the affected browser check.

- [ ] **Step 6: Commit verified fixes if needed**

```bash
git add app/config/aboutContent.js app/components/AboutPage.jsx 'app/(mainpage)/about/page.jsx' tests/about-page.test.mjs
git commit -m "fix: polish simplified about page"
```

- [ ] **Step 7: Confirm a clean handoff**

Run:

```bash
git diff --check
git status --short
```

Expected: `git diff --check` prints nothing. The worktree has no uncommitted files from this task.
