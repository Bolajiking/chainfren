# The Chainfren Thesis Publication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public-safe, mobile-first Chainfren publication with a five-minute read, nine-chapter reader, ownership map, and downloadable PDF from one canonical content system.

**Architecture:** Add a dedicated `/thesis` route family to the existing Next.js 13.4.7 App Router project. Keep approved copy in local MDX, keep metadata and the twelve-claim graph in validated public modules, render all primary reading content on the server, and use small client islands only for reader progress, mobile contents, sharing, and the desktop map. Generate the PDF from a server-rendered print route so the website and PDF share the same content version.

**Tech Stack:** Next.js 13.4.7 App Router, React 18.2, `@next/mdx`, MDX 2, CSS Modules, Node's built-in test runner, Playwright for local PDF generation, existing Chainfren components and brand tokens.

---

## Required implementation skills

- Use `@superpowers:test-driven-development` for each code task.
- Use the vault's `chainfren-design` skill before visual implementation.
- Treat the `chainfren-design` skill, its tokens, and matching production components as the canonical brand contract. Reuse them at full fidelity.
- Use `@frontend-design` for the production interface.
- Use `@humanizer:humanizer` for every chapter and the short read.
- Use `@browse`, `@qa`, `@design-review`, and `@benchmark` for final browser verification.
- Use `@superpowers:verification-before-completion` before claiming completion.

## Worktree and scope rules

- Implement in a dedicated worktree created from commit `09caf35` or a later commit that contains this plan.
- Do not implement in the current dirty working directory.
- Preserve all existing untracked files and the modified `data/contact-submissions.json`.
- Add `.superpowers/` to `.gitignore`. Do not commit visual-companion files.
- Do not modify the second-brain vault.
- Read source material from the supplied vault, but commit only public-safe publication copy and public citations.
- Do not add Comeownity to public content, metadata, comments, fixtures, or generated artifacts.
- Do not add a private or gated edition.
- Do not refactor the global site shell, navigation system, or root context provider as part of this feature.

## Exact source map

Use these inputs in this order. Read them locally during editorial work, but never expose vault paths or private source metadata in a public route, bundle, PDF, citation, or social image.

1. Approved design specification: `docs/superpowers/specs/2026-07-21-chainfren-thesis-publication-design.md`.
2. Current product, route, stage, and public copy reality: `app/config/stack.js`, `app/config/solutionsContent.js`, `app/config/personaContent.js`, the current route files under `app/(mainpage)`, and the live site verified with `@browse`.
3. Canonical Chainfren brand system: `/Users/controlla/Library/Mobile Documents/iCloud~md~obsidian/Documents/second-brain/.agents/skills/chainfren-design/SKILL.md`, its complete `README.md`, `colors_and_type.css`, `frens/Frens.jsx`, `assets/`, and `ui_kits/website/`.
4. Current company architecture, for public-safe interpretation only: `wiki/sources/chainfren-operating-framework.md` and `wiki/companies/chainfren.md` inside the supplied second-brain vault.
5. Mission and founder cadence: vault files `wiki/writings/africa-better-internet.md`, `wiki/writings/africa-in-the-digital-age.md`, `wiki/writings/why-decentralization-matters.md`, `wiki/concepts/attract-then-extract.md`, and `wiki/concepts/crypto-counterweight-to-platform-extraction.md`.
6. Project grounding: vault files `wiki/projects/creator-network.md` and `wiki/projects/star-factor.md`, plus the current `/creator-network` and `/sabi` route implementations.
7. Mission and voice fallback only: vault file `wiki/sources/chainfren-company-brief-v4.md`. Its old company structure is superseded.
8. External market claims: current primary or authoritative public sources found and verified with `@browse`. Save only public HTTPS citation data.

For each source pass, create private scratch notes outside the repository or in ignored `.superpowers/` only. Add only the public-safe claim, citation record, and editorial decision to the committed thesis files.

## File structure

### Configuration and content

- Create `content/chainfren-thesis/public-config.mjs`: content version, approved CTA destinations, and public stage configuration.
- Create `content/chainfren-thesis/manifest.mjs`: canonical nine-chapter metadata.
- Create `content/chainfren-thesis/claims.mjs`: twelve public claims and graph edges.
- Create `content/chainfren-thesis/citations.mjs`: validated public citation records and claim mappings.
- Create `content/chainfren-thesis/public-system.mjs`: canonical distribution loop, value path, and public roadmap-horizon copy.
- Create `content/chainfren-thesis/map-layout.mjs`: desktop coordinates for the twelve claims.
- Create `content/chainfren-thesis/generated-content-hash.mjs`: generated deterministic canonical-source hash imported by website and print routes.
- Create `content/chainfren-thesis/short-read.mdx`: curated five-minute read.
- Create `content/chainfren-thesis/chapters/*.mdx`: nine full chapters.
- Create `mdx-components.js`: project-wide MDX component mapping required by `@next/mdx`.

### Validation and registries

- Create `lib/thesis/schema.mjs`: pure validation functions and allowed values.
- Create `lib/thesis/progress.mjs`: pure chapter-progress storage helpers.
- Create `lib/thesis/content-registry.js`: static MDX imports keyed by chapter slug.
- Create `lib/thesis/public-content.js`: server-only selectors for chapters, claims, stages, and CTAs.
- Create `lib/thesis/brand-contract.mjs`: approved production component paths, public asset paths, icon rules, and motion/token values used by thesis tests.
- Create `scripts/validate-thesis-content.mjs`: release validation and leakage scan.
- Create `scripts/hash-thesis-content.mjs`: deterministic canonical-source hash generator.
- Create `scripts/generate-thesis-pdf.mjs`: local PDF generation from `/thesis/print`.

### Routes

- Create `app/(mainpage)/thesis/layout.jsx`: thesis route metadata shell.
- Create `app/(mainpage)/thesis/page.jsx`: hub and the two approved entrances.
- Create `app/(mainpage)/thesis/short/page.jsx`: five-minute read.
- Create `app/(mainpage)/thesis/read/[chapter]/page.jsx`: static chapter reader.
- Create `app/(mainpage)/thesis/map/page.jsx`: ownership map route.
- Create `app/(mainpage)/thesis/download/page.jsx`: PDF download page.
- Create `app/(mainpage)/thesis/print/page.jsx`: no-index print route.
- Create `app/(mainpage)/thesis/opengraph-image.jsx`: publication social image.

### Components and styles

- Create `app/(mainpage)/thesis/components/ThesisNav.jsx`: publication navigation.
- Create `app/(mainpage)/thesis/components/ThesisHub.jsx`: cover and mode cards.
- Create `app/(mainpage)/thesis/components/ChapterArticle.jsx`: semantic article wrapper.
- Create `app/(mainpage)/thesis/components/ChapterRail.jsx`: desktop contents.
- Create `app/(mainpage)/thesis/components/MobileContentsPanel.jsx`: accessible mobile contents.
- Create `app/(mainpage)/thesis/components/ReaderChrome.jsx`: chapter progress and reader controls.
- Create `app/(mainpage)/thesis/components/ResumeReading.jsx`: device-local resume action.
- Create `app/(mainpage)/thesis/components/ShareControl.jsx`: native share and copy fallback.
- Create `app/(mainpage)/thesis/components/MaturityBadge.jsx`: approved public maturity label.
- Create `app/(mainpage)/thesis/components/PublicCitationList.jsx`: public source list.
- Create `app/(mainpage)/thesis/components/DistributionLoop.jsx`: Sabi, Creator Network, Star Factor, and Products and Solutions.
- Create `app/(mainpage)/thesis/components/ValuePath.jsx`: attention to participation to ownership to value.
- Create `app/(mainpage)/thesis/components/RoadmapHorizons.jsx`: public horizons only.
- Create `app/(mainpage)/thesis/components/OwnershipTree.jsx`: server-rendered accessible map fallback.
- Create `app/(mainpage)/thesis/components/OwnershipMapLoader.jsx`: desktop-only dynamic import boundary.
- Create `app/(mainpage)/thesis/components/OwnershipMapDesktop.jsx`: pan, zoom, fit, select, and detail controls.
- Create `app/(mainpage)/thesis/thesis.module.css`: scoped visual, responsive, motion, and print-adjacent styles.
- Create `app/(mainpage)/thesis/brand-tokens.module.css`: scoped exact Chainfren design tokens used by the publication.
- Create `app/(mainpage)/thesis/print/print.module.css`: PDF and print layout.

### Tests and artifacts

- Create `tests/thesis-mdx-config.test.mjs`.
- Create `tests/thesis-schema.test.mjs`.
- Create `tests/thesis-public-safety.test.mjs`.
- Create `tests/thesis-routes.test.mjs`.
- Create `tests/thesis-progress.test.mjs`.
- Create `tests/thesis-map.test.mjs`.
- Create `tests/thesis-pdf.test.mjs`.
- Create `tests/thesis-accessibility-contract.test.mjs`.
- Create `tests/thesis-brand-fidelity.test.mjs`.
- Create `public/downloads/chainfren-thesis-2026.1.pdf` through the generator.
- Create `public/downloads/chainfren-thesis-2026.1.sha256` through the generator.
- Create `docs/thesis-release-review-2026.1.md`: public-safe editorial and verification record.

## Task 1: Add MDX support and thesis scripts

**Files:**
- Modify: `.gitignore`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `next.config.js`
- Modify: `tailwind.config.js`
- Create: `mdx-components.js`
- Create: `tests/thesis-mdx-config.test.mjs`

- [ ] **Step 1: Write the failing MDX configuration test**

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const nextConfig = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8')
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

test('the thesis build supports MDX without adding runtime CMS dependencies', () => {
  assert.match(nextConfig, /@next\/mdx/)
  assert.match(nextConfig, /pageExtensions/)
  assert.equal(pkg.scripts['test:thesis'], 'node --test tests/thesis-*.test.mjs')
  assert.equal(pkg.scripts['validate:thesis'], 'node scripts/validate-thesis-content.mjs')
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/thesis-mdx-config.test.mjs`  
Expected: FAIL because `@next/mdx`, `pageExtensions`, and thesis scripts are absent.

- [ ] **Step 3: Install only the MDX dependencies**

Run:

```bash
npm install @next/mdx@13.4.7 @mdx-js/loader@2.3.0 @mdx-js/react@2.3.0
```

Expected: `package.json` and `package-lock.json` update without unrelated dependency upgrades.

- [ ] **Step 4: Wrap the existing Next config with MDX**

Keep the existing image and redirect configuration unchanged.

```js
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  images: { /* keep existing value */ },
  async redirects() { /* keep existing rules */ },
}

module.exports = withMDX(nextConfig)
```

- [ ] **Step 5: Add the MDX component hook and Tailwind content path**

```js
export function useMDXComponents(components) {
  return { ...components }
}
```

Add `./content/**/*.{md,mdx}` to `tailwind.config.js`. Add these scripts to `package.json`:

```json
"test:thesis": "node --test tests/thesis-*.test.mjs",
"validate:thesis": "node scripts/validate-thesis-content.mjs"
```

- [ ] **Step 6: Ignore visual-companion artifacts**

Add `.superpowers/` to `.gitignore`. Do not add or remove any current untracked file.

- [ ] **Step 7: Run the focused test and build**

Run:

```bash
node --test tests/thesis-mdx-config.test.mjs
npm run build
```

Expected: PASS and a successful existing-site production build.

- [ ] **Step 8: Commit**

```bash
git add .gitignore package.json package-lock.json next.config.js tailwind.config.js mdx-components.js tests/thesis-mdx-config.test.mjs
git commit -m "build: add MDX support for Chainfren thesis"
```

## Task 2: Build the public schema, configuration, and safety validator

**Files:**
- Create: `content/chainfren-thesis/public-config.mjs`
- Create: `content/chainfren-thesis/manifest.mjs`
- Create: `content/chainfren-thesis/claims.mjs`
- Create: `content/chainfren-thesis/citations.mjs`
- Create: `content/chainfren-thesis/public-system.mjs`
- Create: `content/chainfren-thesis/map-layout.mjs`
- Create: `lib/thesis/schema.mjs`
- Create: `scripts/validate-thesis-content.mjs`
- Create: `tests/thesis-schema.test.mjs`
- Create: `tests/thesis-public-safety.test.mjs`
- Create: `docs/thesis-release-review-2026.1.md`

- [ ] **Step 1: Write failing schema tests**

Test these contracts:

```js
test('manifest defines nine unique canonical chapters', () => {
  assert.equal(THESIS_CHAPTERS.length, 9)
  assert.equal(new Set(THESIS_CHAPTERS.map((c) => c.slug)).size, 9)
  assert.deepEqual(THESIS_CHAPTERS.map((c) => c.id), ['01','02','03','04','05','06','07','08','09'])
})

test('map defines the approved twelve claims', () => {
  assert.equal(THESIS_CLAIMS.length, 12)
  assert.equal(new Set(THESIS_CLAIMS.map((c) => c.id)).size, 12)
})

test('public CTAs use approved existing routes', () => {
  assert.deepEqual(PUBLIC_CTAS.creators.href, '/for-creators')
  assert.deepEqual(PUBLIC_CTAS.brands.href, '/for-brands')
  assert.deepEqual(PUBLIC_CTAS.supporters.href, '/sabi')
})

test('public citations have unique ids and complete public evidence', () => {
  assert.equal(new Set(PUBLIC_CITATIONS.map((item) => item.id)).size, PUBLIC_CITATIONS.length)
  for (const citation of PUBLIC_CITATIONS) {
    assert.match(citation.url, /^https:\/\//)
    assert.match(citation.publishedAt, /^\d{4}-\d{2}-\d{2}$/)
    assert.match(citation.accessedAt, /^\d{4}-\d{2}-\d{2}$/)
  }
})

test('public system data preserves the approved sequences', () => {
  assert.deepEqual(DISTRIBUTION_LOOP.map((item) => item.id), ['sabi', 'creator-network', 'star-factor', 'products-and-solutions'])
  assert.deepEqual(VALUE_PATH.map((item) => item.id), ['attention', 'participation', 'ownership', 'value'])
  assert.equal(ROADMAP_HORIZONS.length, 4)
})
```

- [ ] **Step 2: Run the schema tests and verify they fail**

Run: `node --test tests/thesis-schema.test.mjs`  
Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement pure validation helpers**

```js
export const ALLOWED_STAGES = new Set(['live', 'live-core', 'early-access', 'building', 'directional', 'later'])
export const ALLOWED_CLAIM_TYPES = new Set(['context', 'diagnosis', 'mechanism', 'mission', 'distribution', 'proof', 'execution', 'outcome'])
export const ALLOWED_RELATIONS = new Set(['causes', 'constrains', 'enables', 'demonstrates', 'compounds'])

export function assertUnique(values, label) {
  if (new Set(values).size !== values.length) throw new Error(`${label} must be unique`)
}

export function validateManifest(chapters) {
  if (chapters.length !== 9) throw new Error('The public thesis requires nine chapters')
  assertUnique(chapters.map((item) => item.id), 'Chapter ids')
  assertUnique(chapters.map((item) => item.slug), 'Chapter slugs')
}
```

Add equivalent citation, public-system, claim, edge, layout, CTA, and stage validation. Citation records require `id`, `title`, `publisher`, public HTTPS `url`, `publishedAt`, `accessedAt`, and `claimIds`. A claim or chapter cannot reference an unknown citation ID. Public-system validation fixes the approved order, maturity references, real route destinations, and absence of dates, quarters, budgets, targets, and private metrics.

- [ ] **Step 4: Add the approved public configuration**

```js
export const THESIS_CONTENT_VERSION = '2026.1'

export const PUBLIC_CTAS = {
  creators: { label: 'Explore for creators', href: '/for-creators' },
  brands: { label: 'Explore for brands', href: '/for-brands' },
  partners: { label: 'Partner with Chainfren', href: '/contact' },
  talent: { label: 'Join the team', href: '/contact' },
  executives: { label: 'Build Chainfren with us', href: '/contact' },
  supporters: { label: 'Follow the work', href: '/sabi' },
}
```

Use the existing public site stage values for the four current products. Add explicit records for Creator Network as `live`, Sabi as `building`, Star Factor as `later`, and Indy as `directional`. Keep labels in configuration, not prose. Before freezing the values, verify `app/config/stack.js`, the relevant current route, and the live site with `@browse`. Record the checked source, URL or repository path, date, and resulting public label in `docs/thesis-release-review-2026.1.md`. If the sources disagree, use the least mature accurate public label and flag it for editorial review.

- [ ] **Step 5: Add the nine chapter metadata records**

Each record must include `id`, `slug`, `title`, `summary`, `lens`, `readingMinutes`, `mapClaimIds`, `publicCitationIds`, and `updatedAt`. Use these slugs:

```js
['the-gap', 'the-trap', 'the-unlock', 'the-thesis', 'the-company', 'what-we-build', 'how-we-work', 'the-road-ahead', 'build-with-us']
```

- [ ] **Step 5a: Create the public citation registry**

Add citation records only after verifying the live public URL with `@browse`. Map each citation to the claim IDs it supports. The initial registry can be empty for non-quantitative representative copy, but any market figure or external factual claim must have a complete record before its chapter is registered. Do not store vault paths, raw filenames, private notes, or copied source passages.

- [ ] **Step 5b: Create the canonical public-system data**

Define the four distribution-loop entries, four value-path entries, and four public roadmap horizons in `public-system.mjs`. Each record contains an ID, public title, public summary, maturity key when applicable, and real route or chapter destination. Components in Task 8 render these records without owning parallel visible copy. This module is part of the canonical-source hash.

- [ ] **Step 6: Add all twelve claims, approved edges, and layout coordinates**

Use the exact claim IDs from the design spec. Put coordinates in `map-layout.mjs`, keyed by claim ID. `attention-to-ownership` and `chainfren-mission` must occupy the visual center.

Use these exact claim records as the editorial baseline. `publicCitationIds` can be expanded only with validated citation-registry IDs.

```js
[
  { id: 'african-cultural-attention', title: 'African culture already commands attention', summary: 'African creators shape what people watch, wear, quote, and copy. The attention already exists.', type: 'context', chapterSlug: 'the-gap', order: 1, publicCitationIds: [] },
  { id: 'african-value-gap', title: "Africa's value gap", summary: 'The culture travels further than the economic value that returns to the people who make it.', type: 'diagnosis', chapterSlug: 'the-gap', order: 2, publicCitationIds: [] },
  { id: 'attract-then-extract', title: 'Attract, then extract', summary: 'Platforms make creation and growth easy, then tighten control once creators and audiences depend on them.', type: 'diagnosis', chapterSlug: 'the-trap', order: 3, publicCitationIds: [] },
  { id: 'rented-audience-relationship', title: 'Rented audience relationships', summary: 'A following is fragile when another company controls reach, data, payments, and access.', type: 'diagnosis', chapterSlug: 'the-trap', order: 4, publicCitationIds: [] },
  { id: 'open-economic-rails', title: 'Open economic rails', summary: 'Open networks can make identity, payments, access, and commitments portable across products and borders.', type: 'mechanism', chapterSlug: 'the-unlock', order: 5, publicCitationIds: [] },
  { id: 'attention-to-ownership', title: 'Attention must become ownership', summary: 'Attention becomes durable value when people can own the audience relationship, participation, and upside.', type: 'mission', chapterSlug: 'the-thesis', order: 6, publicCitationIds: [] },
  { id: 'chainfren-mission', title: "Chainfren's mission", summary: "We build the attention and ownership infrastructure that helps Africa's creator economy keep more of the value it creates.", type: 'mission', chapterSlug: 'the-company', order: 7, publicCitationIds: [] },
  { id: 'sabi-attention', title: 'Sabi builds attention', summary: 'Sabi gives Chainfren an owned media surface for ideas, stories, broadcasts, and cultural signal.', type: 'distribution', chapterSlug: 'what-we-build', order: 8, publicCitationIds: [] },
  { id: 'creator-network-distribution', title: 'Creator Network turns reach into distribution', summary: 'The network connects trusted creators, brands, and campaigns so attention can move with context and credibility.', type: 'distribution', chapterSlug: 'what-we-build', order: 9, publicCitationIds: [] },
  { id: 'star-factor-proof', title: 'Star Factor proves the thesis', summary: 'Star Factor is a later milestone designed to test staked entertainment and audience participation in an African context.', type: 'proof', chapterSlug: 'the-road-ahead', order: 10, publicCitationIds: [] },
  { id: 'products-owned-infrastructure', title: 'Products make ownership usable', summary: "Chainfren's products turn lessons from the market into practical infrastructure for audience relationships, payments, media, community, and growth.", type: 'execution', chapterSlug: 'what-we-build', order: 11, publicCitationIds: [] },
  { id: 'owned-value-outcome', title: 'Owned attention creates compounding value', summary: 'When creators and audiences keep the relationship, each cycle can create more data, participation, trust, and value.', type: 'outcome', chapterSlug: 'the-road-ahead', order: 12, publicCitationIds: [] },
]
```

Use this exact first-release edge set:

```js
[
  ['african-value-gap', 'owned-value-outcome', 'constrains'],
  ['attract-then-extract', 'rented-audience-relationship', 'causes'],
  ['rented-audience-relationship', 'attention-to-ownership', 'constrains'],
  ['open-economic-rails', 'attention-to-ownership', 'enables'],
  ['african-cultural-attention', 'attention-to-ownership', 'enables'],
  ['attention-to-ownership', 'chainfren-mission', 'enables'],
  ['chainfren-mission', 'sabi-attention', 'enables'],
  ['chainfren-mission', 'creator-network-distribution', 'enables'],
  ['chainfren-mission', 'products-owned-infrastructure', 'enables'],
  ['sabi-attention', 'creator-network-distribution', 'enables'],
  ['creator-network-distribution', 'star-factor-proof', 'enables'],
  ['star-factor-proof', 'attention-to-ownership', 'demonstrates'],
  ['products-owned-infrastructure', 'owned-value-outcome', 'enables'],
  ['creator-network-distribution', 'owned-value-outcome', 'enables'],
  ['attention-to-ownership', 'owned-value-outcome', 'enables'],
]
```

Generate stable edge IDs from `from`, `to`, and `relation`. Before Task 3 begins, render the claim titles, summaries, chapter links, and edges as a plain-text review table in ignored `.superpowers/`, then run an editorial check against the approved thesis. Do not add an edge or claim not present in this contract without updating the design specification first.

- [ ] **Step 7: Write the failing safety scan test**

Scan only `content/chainfren-thesis` and eventual generated publication text. Assert absence of:

```js
const BLOCKED = [
  new RegExp(['come', 'ownity'].join(''), 'i'),
  /\/Users\//,
  /second-brain/i,
  /CF-C-\d+/,
  /signed revenue/i,
  /runway/i,
  /decision-rights/i,
  /control matrix/i,
  /risk register/i,
  /[—–]/,
]
```

Do not block the generic word `revenue`; public product copy can use it.

- [ ] **Step 8: Implement `validate-thesis-content.mjs`**

The script must validate metadata, citations, public-system data, claim-to-citation mappings, claims, the exact edge set, layout coverage, approved CTAs, allowed stages, content version, blocked patterns, duplicate IDs, and missing chapter files. Add `--allow-missing-content` for Tasks 2 through 7 only. The default release mode must fail on any missing MDX file.

- [ ] **Step 9: Run schema and safety tests**

Run:

```bash
node --test tests/thesis-schema.test.mjs tests/thesis-public-safety.test.mjs
node scripts/validate-thesis-content.mjs --allow-missing-content
```

Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add content/chainfren-thesis lib/thesis/schema.mjs scripts/validate-thesis-content.mjs tests/thesis-schema.test.mjs tests/thesis-public-safety.test.mjs docs/thesis-release-review-2026.1.md
git commit -m "feat: define public Chainfren thesis content contract"
```

## Task 3: Add representative MDX content and the content registry

**Files:**
- Create: `content/chainfren-thesis/chapters/01-the-gap.mdx`
- Create: `content/chainfren-thesis/chapters/05-the-company.mdx`
- Create: `lib/thesis/content-registry.js`
- Create: `lib/thesis/public-content.js`
- Create: `app/(mainpage)/thesis/components/ChapterArticle.jsx`
- Create: `app/(mainpage)/thesis/components/PublicCitationList.jsx`
- Create: `app/(mainpage)/thesis/components/MaturityBadge.jsx`
- Create: `tests/thesis-routes.test.mjs`

- [ ] **Step 1: Write a failing registry test**

Read `lib/thesis/content-registry.js` and assert that `the-gap` and `the-company` use static MDX imports. Assert no dynamic path interpolation is used.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/thesis-routes.test.mjs`  
Expected: FAIL because the registry is absent.

- [ ] **Step 3: Draft Chapter 01 from approved sources**

Use the exact source-map files `wiki/writings/africa-better-internet.md`, `wiki/writings/africa-in-the-digital-age.md`, and `wiki/concepts/attract-then-extract.md`, then verify public market evidence with `@browse`. The chapter must cover:

- Africa is already online.
- African creators shape global culture.
- Value capture does not match cultural output.
- The infrastructure was built elsewhere and for different users.
- Being online is different from benefiting from being online.

Use no unverified market figure. Every market figure must reference an ID from `citations.mjs`; that record must contain the public URL, publisher, publication date, access date, and supported claim IDs.

- [ ] **Step 4: Draft Chapter 05 from approved sources**

The chapter must explain Products and Solutions, Creator Network, and Media led by Sabi. It must introduce the public compounding story without copying private operating frameworks.

- [ ] **Step 5: Run the humanizer process on both chapters**

For each chapter:

1. Produce a draft rewrite.
2. Ask what still reads like AI output.
3. Produce the final rewrite.
4. Remove all em and en dashes.
5. Apply ADS-STE100 to explanatory passages.
6. Verify Chainfren uses `we`.

- [ ] **Step 6: Create the static registry**

```js
import TheGap from '@/content/chainfren-thesis/chapters/01-the-gap.mdx'
import TheCompany from '@/content/chainfren-thesis/chapters/05-the-company.mdx'

export const CHAPTER_COMPONENTS = {
  'the-gap': TheGap,
  'the-company': TheCompany,
}
```

The registry is server-only. Do not pass source metadata to client components.

- [ ] **Step 7: Add semantic article components**

`ChapterArticle` must render `article`, chapter eyebrow, one `h1`, summary, MDX body, and public citations. `MaturityBadge` accepts only the approved stage configuration.

- [ ] **Step 8: Run focused tests and partial validation**

Run:

```bash
node --test tests/thesis-routes.test.mjs tests/thesis-public-safety.test.mjs
node scripts/validate-thesis-content.mjs --allow-missing-content
npm run build
```

Expected: PASS. The build contains no public thesis route yet, but MDX imports compile.

- [ ] **Step 9: Commit**

```bash
git add content/chainfren-thesis/chapters/01-the-gap.mdx content/chainfren-thesis/chapters/05-the-company.mdx lib/thesis app/\(mainpage\)/thesis/components tests/thesis-routes.test.mjs
git commit -m "content: add representative Chainfren thesis chapters"
```

## Task 4: Build the thesis hub and visual foundation

**Files:**
- Create: `app/(mainpage)/thesis/layout.jsx`
- Create: `app/(mainpage)/thesis/page.jsx`
- Create: `app/(mainpage)/thesis/components/ThesisNav.jsx`
- Create: `app/(mainpage)/thesis/components/ThesisHub.jsx`
- Create: `app/(mainpage)/thesis/components/ResumeReading.jsx`
- Create: `app/(mainpage)/thesis/brand-tokens.module.css`
- Create: `app/(mainpage)/thesis/thesis.module.css`
- Create: `lib/thesis/brand-contract.mjs`
- Create: `tests/thesis-brand-fidelity.test.mjs`
- Modify: `tests/thesis-routes.test.mjs`

- [ ] **Step 1: Extend the failing route contract test**

Assert:

- `/thesis` has a page file.
- The mission entrance links to `/thesis/read/the-gap`.
- The company entrance links to `/thesis/read/the-company`.
- Mode cards link to `/thesis/short`, `/thesis/read/the-gap`, `/thesis/map`, and `/thesis/download`.
- The route uses `ChainfrenWordmark` and no external font URL.

Add a separate brand-fidelity test that asserts:

- The publication imports the production `ChainfrenWordmark`, `ChainfrenIcon`, and `Fren` components instead of reproducing their SVG geometry.
- New UI icons come from the existing `lucide-react` dependency and are not Unicode symbols or hand-drawn replacements.
- Approved decorative media resolves to checksum-verified canonical files in `public`. Do not assume a similarly named file is canonical.
- Every asset used by a thesis component is present in `THESIS_BRAND_ASSETS`, and its repository SHA-256 matches the recorded canonical checksum.
- Publication styles consume the scoped brand tokens and do not introduce unapproved logo filters, stretched image dimensions, type families, heavy weights, colors, radii, borders, shadows, gradients, or motion curves.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/thesis-routes.test.mjs tests/thesis-brand-fidelity.test.mjs`  
Expected: FAIL because the route and brand contract do not exist.

- [ ] **Step 3: Build the server-rendered thesis layout and navigation**

Use a dedicated, low-JavaScript publication header rather than `SiteHeader`. Import the production `ChainfrenWordmark` unchanged. Use `ChainfrenIcon` and `Fren` only through their production components. Do not copy their SVG paths into thesis files.

Create `lib/thesis/brand-contract.mjs` as a testable allowlist of the canonical production sources used by the publication:

```js
export const THESIS_BRAND_COMPONENTS = {
  wordmark: 'app/components/ChainfrenWordmark.jsx',
  mark: 'app/components/ChainfrenIcon.jsx',
  frens: 'app/components/Frens.jsx',
}

export const THESIS_BRAND_ASSETS = [
  { path: '/3d.png', sha256: '48ed34495e63cf2e74bc35707d61edb1e577106a842aa38140ecdec75479c71a' },
  { path: '/3d2.png', sha256: 'fc430eb1c0850d9cbff8172679636ccbb801e1de111bbeddfc6f33d72a8ae13f' },
  { path: '/3d3.png', sha256: 'ac87da7183a19e340d72f847399c3c3340a8d527d17b11112f682fc9c475b161' },
  { path: '/3d4.png', sha256: '97914c232af07ac2a8e4e1f95570644da4155562330df047379f5f3566208526' },
  { path: '/randz1.png', sha256: 'c28a274eea580f23b6e383e5a84e6e55f8542af56e1c5945c123cb41147f8503' },
]

export const THESIS_MOTION = {
  enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
  hover: 'cubic-bezier(0.33, 1, 0.68, 1)',
  symmetric: 'cubic-bezier(0.65, 0, 0.35, 1)',
}
```

Compare the production components with the design-system source before use. The production components remain canonical when their logo geometry, fren pose geometry, type, color, and interaction contract match the design system. If a material mismatch exists, do not create a thesis-only approximation or silently change a shared component. Record the mismatch and resolve it as a separately reviewed shared-brand fix before thesis use.

- [ ] **Step 4: Build the hub with real approved content**

Required cards:

```jsx
<Link href="/thesis/short">The short read</Link>
<Link href="/thesis/read/the-gap">The full publication</Link>
<Link href="/thesis/map">The ownership map</Link>
<Link href="/thesis/download">Download PDF</Link>
```

The two entrances must be distinct from the four mode cards.

- [ ] **Step 5: Implement the mobile-first CSS foundation**

Rules:

- 360px works without horizontal overflow.
- Cards have two-pixel navy borders and 26 to 28 pixel radii.
- Default page is one column.
- Desktop adds an asymmetric card grid.
- Type never exceeds weight 500.
- Hover lifts cards without scaling.
- Reduced motion removes transforms and reveals.
- Above-the-fold content has no required image.

Map scoped CSS custom properties in `brand-tokens.module.css` to the exact canonical Chainfren token values. All thesis CSS must consume those properties. Keep raw token values in this one file only. Use Inter Display from the existing self-hosted font files. Georgia remains limited to approved accent roles. Use Lucide icons at two-pixel stroke width with round caps. Use only approved flat fills, the closing CTA gradient, production shadow families, and exact motion curves from `THESIS_MOTION`.

Use canonical frens and decorative assets contextually. Preserve intrinsic aspect ratio, original color treatment, and accessibility role. Do not add CSS filters, redraws, generated substitutes, stock art, emoji, or Unicode icons. Any wordmark delight, fren motion, card lift, reveal, blur, or glow must match an existing brand-system primitive and must stop under `prefers-reduced-motion`.

- [ ] **Step 6: Add a non-functional Resume placeholder only when storage data exists**

Create the component boundary now, but keep it hidden until Task 6 supplies tested storage helpers. Do not add placeholder text to the visible hub.

- [ ] **Step 7: Run tests and build**

Run:

```bash
node --test tests/thesis-routes.test.mjs tests/thesis-brand-fidelity.test.mjs
npm run build
```

Expected: PASS, the full brand-fidelity contract passes, and `/thesis` appears in build output.

- [ ] **Step 8: Capture first mobile and desktop screenshots with `@browse`**

Capture 390x844 and 1440x900. Confirm hierarchy, brand match, and no overflow before building the reader.

- [ ] **Step 9: Commit**

```bash
git add app/\(mainpage\)/thesis lib/thesis/brand-contract.mjs tests/thesis-routes.test.mjs tests/thesis-brand-fidelity.test.mjs
git commit -m "feat: add Chainfren thesis publication hub"
```

## Task 5: Build the responsive chapter reader

**Files:**
- Create: `app/(mainpage)/thesis/read/[chapter]/page.jsx`
- Create: `app/(mainpage)/thesis/components/ChapterRail.jsx`
- Create: `app/(mainpage)/thesis/components/ReaderChrome.jsx`
- Create: `app/(mainpage)/thesis/components/MobileContentsPanel.jsx`
- Modify: `app/(mainpage)/thesis/thesis.module.css`
- Modify: `tests/thesis-routes.test.mjs`
- Create: `tests/thesis-accessibility-contract.test.mjs`

- [ ] **Step 1: Write failing reader route tests**

Assert static params use the manifest, invalid slugs call `notFound`, and canonical Previous and Continue follow manifest order. Assert the page has a skip link, article landmark, one `h1`, contents control, and real chapter links.

- [ ] **Step 2: Run the tests and verify they fail**

Run:

```bash
node --test tests/thesis-routes.test.mjs tests/thesis-accessibility-contract.test.mjs
```

Expected: FAIL because the reader route is absent.

- [ ] **Step 3: Implement the static reader route**

```jsx
export function generateStaticParams() {
  return THESIS_CHAPTERS
    .filter((chapter) => CHAPTER_COMPONENTS[chapter.slug])
    .map((chapter) => ({ chapter: chapter.slug }))
}

export default function ChapterPage({ params }) {
  const chapter = getChapter(params.chapter)
  const Content = CHAPTER_COMPONENTS[params.chapter]
  if (!chapter || !Content) notFound()
  return <ChapterArticle chapter={chapter}><Content /></ChapterArticle>
}
```

- [ ] **Step 4: Build desktop orientation**

At widths above 960px, show a left chapter rail, center reading column, and small right context rail. The center column remains the focus. The right rail can link to short read, map, and share only.

- [ ] **Step 5: Build mobile reader controls**

Use a compact top progress bar and a floating bottom control with Previous, Contents, and Continue. The bottom control must reserve page padding so it never covers text.

- [ ] **Step 6: Build the accessible contents panel**

Requirements:

- 44px controls.
- Escape closes.
- Focus moves into the panel on open.
- Focus returns to the trigger on close.
- Body scroll locks only while open.
- Real chapter anchors remain usable without JavaScript.

- [ ] **Step 7: Style long-form reading**

Keep body measure between 60 and 72 characters. Use Inter Display for interface and headings. Use Georgia only for approved accent lines, numbers, and selected editorial details. Do not set the full body in Georgia unless visual testing proves it readable on small screens.

- [ ] **Step 8: Run focused tests, build, and browser checks**

Run:

```bash
node --test tests/thesis-routes.test.mjs tests/thesis-accessibility-contract.test.mjs
npm run build
```

Use `@browse` to verify direct routes for `the-gap` and `the-company` at 390x844 and 1440x900.

- [ ] **Step 8a: Pass the representative accessibility and performance gate**

Before adding the remaining chapters, run keyboard and accessibility checks on the hub plus both representative readers. Run `@benchmark` with three cold 390px slow-4G measurements for `/thesis`, `/thesis/read/the-gap`, and `/thesis/read/the-company`. Require median LCP below 2.5 seconds, median CLS below 0.1, median TBT below 200 milliseconds, route-specific JavaScript below 70 KB compressed, and critical first-load transfer below 500 KB compressed. Record results in `docs/thesis-release-review-2026.1.md`. Fix thesis-scoped failures now; if an inherited shell cost blocks a budget, isolate and document inherited versus thesis bytes before continuing.

- [ ] **Step 9: Commit**

```bash
git add app/\(mainpage\)/thesis/read app/\(mainpage\)/thesis/components app/\(mainpage\)/thesis/thesis.module.css tests/thesis-routes.test.mjs tests/thesis-accessibility-contract.test.mjs
git commit -m "feat: add responsive Chainfren thesis reader"
```

## Task 6: Add chapter-level progress, Resume, and sharing

**Files:**
- Create: `lib/thesis/progress.mjs`
- Create: `tests/thesis-progress.test.mjs`
- Modify: `app/(mainpage)/thesis/components/ReaderChrome.jsx`
- Modify: `app/(mainpage)/thesis/components/ResumeReading.jsx`
- Create: `app/(mainpage)/thesis/components/ShareControl.jsx`

- [ ] **Step 1: Write failing pure progress tests**

Cover valid data, stale version, unknown slug, malformed JSON, missing storage, and write failure.

```js
test('stale progress is ignored', () => {
  const storage = fakeStorage({ 'chainfren-thesis-progress-v1': JSON.stringify({ chapterSlug: 'the-gap', contentVersion: 'old' }) })
  assert.equal(readProgress(storage, '2026.1', new Set(['the-gap'])), null)
})
```

- [ ] **Step 2: Run the progress tests and verify they fail**

Run: `node --test tests/thesis-progress.test.mjs`  
Expected: FAIL because helpers are absent.

- [ ] **Step 3: Implement pure storage helpers**

Use key `chainfren-thesis-progress-v1`. Store only `chapterSlug`, ISO `updatedAt`, and `contentVersion`. Never store scroll position.

- [ ] **Step 4: Connect reader progress**

Write progress when a chapter route becomes active. Do not block render while reading or writing storage.

- [ ] **Step 5: Implement Resume on the hub**

Show `Resume at <chapter title>` only when data is valid for the current version. Hide the control when storage is missing, blocked, stale, or invalid.

- [ ] **Step 6: Implement sharing**

Use `navigator.share` when present. Fall back to `navigator.clipboard.writeText`. If both fail, expose a selected read-only URL field. Share the current chapter or claim deep link.

- [ ] **Step 7: Run tests and build**

Run:

```bash
node --test tests/thesis-progress.test.mjs tests/thesis-accessibility-contract.test.mjs
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add lib/thesis/progress.mjs tests/thesis-progress.test.mjs app/\(mainpage\)/thesis/components
git commit -m "feat: add thesis progress and sharing"
```

## Task 7: Write and review mission Chapters 02 through 04

**Files:**
- Create: `content/chainfren-thesis/chapters/02-the-trap.mdx`
- Create: `content/chainfren-thesis/chapters/03-the-unlock.mdx`
- Create: `content/chainfren-thesis/chapters/04-the-thesis.mdx`
- Modify: `lib/thesis/content-registry.js`
- Modify: `content/chainfren-thesis/manifest.mjs`
- Modify: `docs/thesis-release-review-2026.1.md`

- [ ] **Step 1: Extract public-safe claims for Chapter 02**

Use the exact source-map files `wiki/writings/why-decentralization-matters.md`, `wiki/writings/africa-better-internet.md`, `wiki/writings/africa-in-the-digital-age.md`, `wiki/concepts/attract-then-extract.md`, and `wiki/concepts/crypto-counterweight-to-platform-extraction.md`. Verify current platform examples with `@browse`. Record only public claims and citation-registry IDs in chapter metadata.

- [ ] **Step 2: Draft Chapter 02**

Required sequence: attract, lock in, extract; platform control of audience relationships; algorithm and take-rate changes; creator leverage; why the structure matters even when platforms behave well.

- [ ] **Step 3: Humanize and simplify Chapter 02**

Run the full humanizer draft, audit, and final loop. Apply ADS-STE100 to explanations. Run `node scripts/validate-thesis-content.mjs --allow-missing-content`.

- [ ] **Step 4: Extract and draft Chapter 03**

Explain open economic rails, mobile wallets, stable value, software-enforced commitments, payments, access, and participation. Crypto is the mechanism, not the protagonist. Do not use speculative token examples as current Chainfren products.

- [ ] **Step 5: Humanize and simplify Chapter 03**

Run the same editorial loop and validator.

- [ ] **Step 6: Extract and draft Chapter 04**

State the approved thesis, define attention, participation, ownership, and value, and label the default-attention-infrastructure statement as ambition. Introduce the distribution-first path that later chapters make concrete.

- [ ] **Step 7: Humanize and simplify Chapter 04**

Run the same editorial loop and validator.

- [ ] **Step 8: Register the chapters and verify routes**

Add static imports. Run:

```bash
node --test tests/thesis-*.test.mjs
node scripts/validate-thesis-content.mjs --allow-missing-content
npm run build
```

Expected: PASS. Static reader routes now include Chapters 01 through 05.

- [ ] **Step 9: Record the public-safe review result**

In `docs/thesis-release-review-2026.1.md`, record chapter, humanizer pass, ADS-STE100 pass, factual pass, public-safety pass, reviewer, and date. Do not include private source extracts.

- [ ] **Step 10: Commit**

```bash
git add content/chainfren-thesis/chapters content/chainfren-thesis/manifest.mjs lib/thesis/content-registry.js docs/thesis-release-review-2026.1.md
git commit -m "content: write Chainfren mission chapters"
```

## Task 8: Write and review company Chapters 06 through 09

**Files:**
- Create: `content/chainfren-thesis/chapters/06-what-we-build.mdx`
- Create: `content/chainfren-thesis/chapters/07-how-we-work.mdx`
- Create: `content/chainfren-thesis/chapters/08-the-road-ahead.mdx`
- Create: `content/chainfren-thesis/chapters/09-build-with-us.mdx`
- Create: `app/(mainpage)/thesis/components/DistributionLoop.jsx`
- Create: `app/(mainpage)/thesis/components/ValuePath.jsx`
- Create: `app/(mainpage)/thesis/components/RoadmapHorizons.jsx`
- Modify: `lib/thesis/content-registry.js`
- Modify: `docs/thesis-release-review-2026.1.md`

- [ ] **Step 1: Write source-contract tests for the public components**

Assert `public-system.mjs` names Sabi, Creator Network, Star Factor, and Products and Solutions in order. Assert its Value Path uses attention, participation, ownership, and value in order. Assert its Roadmap Horizons contains no dates, quarters, internal metrics, or private targets. Assert all three components import and render this canonical data rather than defining visible public copy locally.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/thesis-public-safety.test.mjs`  
Expected: FAIL because the components and chapters are absent.

- [ ] **Step 3: Draft and review Chapter 06**

Cover the four current solutions, Creator Network, Sabi, Indy as directional, and Star Factor as an important later mission milestone. Use maturity labels from public configuration, not prose literals. Do not mention the excluded venture.

- [ ] **Step 4: Build the Distribution Loop and Value Path**

Both are server components with semantic ordered-list fallbacks. They render titles, summaries, maturity keys, and destinations from `content/chainfren-thesis/public-system.mjs`. Animation is CSS-only and optional. The visible order is:

```text
Sabi -> Creator Network -> Star Factor -> Products and Solutions
Attention -> Participation -> Ownership -> Value
```

- [ ] **Step 5: Draft and review Chapter 07**

Publish customer ownership, done-with-you delivery, human truth, honest fit, crypto where useful, work as proof, and distribution as product. Do not expose governance, agent authority, scoreboards, or operating registers.

- [ ] **Step 6: Draft and review Chapter 08**

Use the approved public horizons only. Star Factor must appear as the major proof milestone for African audiences and staked entertainment. Indy remains directional. Do not include internal dates, gates, budgets, or revenue targets.

- [ ] **Step 7: Build Roadmap Horizons**

Render the four approved public horizons from `public-system.mjs`. Add maturity badges through `MaturityBadge`. Do not place alternate horizon copy in the component.

- [ ] **Step 8: Draft and review Chapter 09**

Use the six approved audience CTA labels and destinations from public configuration. Do not add form prefilling or query parameters.

- [ ] **Step 9: Run all chapter editorial loops**

For Chapters 06 through 09, run humanizer, ADS-STE100, factual, maturity, and public-safety passes. Update the release review record.

- [ ] **Step 10: Register all chapters and run release validation**

Run:

```bash
node --test tests/thesis-*.test.mjs
node scripts/validate-thesis-content.mjs
npm run build
```

Expected: PASS. All nine static chapter routes build.

- [ ] **Step 11: Commit**

```bash
git add content/chainfren-thesis/chapters lib/thesis/content-registry.js app/\(mainpage\)/thesis/components docs/thesis-release-review-2026.1.md tests/thesis-public-safety.test.mjs
git commit -m "content: complete Chainfren company chapters"
```

## Task 9: Write the curated five-minute read

**Files:**
- Create: `content/chainfren-thesis/short-read.mdx`
- Create: `app/(mainpage)/thesis/short/page.jsx`
- Modify: `lib/thesis/content-registry.js`
- Modify: `tests/thesis-routes.test.mjs`
- Modify: `docs/thesis-release-review-2026.1.md`

- [ ] **Step 1: Add a failing short-read route test**

Assert the route exists, imports the dedicated short read, and does not generate its copy by slicing or truncating full chapters.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/thesis-routes.test.mjs`  
Expected: FAIL.

- [ ] **Step 3: Draft the short read as a separate editorial artifact**

Target 900 to 1,200 words and about five minutes. It must include the gap, trap, unlock, thesis, company, distribution-first system, Star Factor milestone, public horizon, and invitation.

- [ ] **Step 4: Humanize and simplify the short read**

Run the full humanizer and ADS-STE100 passes. Verify the short version does not make any claim absent from the full publication.

- [ ] **Step 5: Implement the route**

Use the same reader typography without chapter controls. Provide links to the full work, map, and PDF.

- [ ] **Step 6: Test, validate, and build**

Run:

```bash
node --test tests/thesis-routes.test.mjs tests/thesis-public-safety.test.mjs
node scripts/validate-thesis-content.mjs
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add content/chainfren-thesis/short-read.mdx app/\(mainpage\)/thesis/short lib/thesis/content-registry.js tests/thesis-routes.test.mjs docs/thesis-release-review-2026.1.md
git commit -m "content: add five-minute Chainfren thesis"
```

## Task 10: Build the ownership tree, desktop map, and deep links

**Files:**
- Create: `app/(mainpage)/thesis/map/page.jsx`
- Create: `app/(mainpage)/thesis/components/OwnershipTree.jsx`
- Create: `app/(mainpage)/thesis/components/OwnershipMapLoader.jsx`
- Create: `app/(mainpage)/thesis/components/OwnershipMapDesktop.jsx`
- Create: `tests/thesis-map.test.mjs`
- Modify: `app/(mainpage)/thesis/thesis.module.css`

- [ ] **Step 1: Write failing graph contract tests**

Validate twelve nodes, allowed edges, layout coverage, valid chapter links, central claim IDs, and deep-link parsing. Assert the desktop loader uses a conditional dynamic import after a desktop media query matches.

- [ ] **Step 2: Run the map tests and verify they fail**

Run: `node --test tests/thesis-map.test.mjs`  
Expected: FAIL.

- [ ] **Step 3: Build the server-rendered ownership tree first**

Group nodes by type. The `mission` group starts open. Every claim renders its title, summary, and real chapter link. This tree is the mobile experience, screen-reader experience, and no-JavaScript fallback.

- [ ] **Step 4: Build the desktop-only loader**

Use a small client component that checks `matchMedia('(min-width: 960px)')` and imports `OwnershipMapDesktop` only after a match. Mobile must not request the desktop map chunk.

- [ ] **Step 5: Build the desktop map without a graph dependency**

Use the fixed public layout, DOM node cards, and an SVG edge layer. Support pan, zoom, fit, select, and detail show or hide. Do not create nested subgraphs.

- [ ] **Step 6: Implement claim deep links**

Read `searchParams.claim` on the server. Valid IDs focus or expand the claim. Invalid IDs show the default map. Client selection uses `history.replaceState` with `/thesis/map?claim=<id>`.

- [ ] **Step 7: Add keyboard behavior**

All controls and claims are reachable. Arrow keys are optional. Tab, Enter, Space, Escape, and visible focus are required. Fit, zoom, and detail controls have explicit accessible names.

- [ ] **Step 8: Run tests, build, and verify chunk behavior**

Run:

```bash
node --test tests/thesis-map.test.mjs tests/thesis-accessibility-contract.test.mjs
npm run build
```

Use browser network inspection at 390px to confirm the desktop map chunk is not requested. Verify valid and invalid deep links on mobile and desktop.

- [ ] **Step 9: Commit**

```bash
git add app/\(mainpage\)/thesis/map app/\(mainpage\)/thesis/components/Ownership* app/\(mainpage\)/thesis/thesis.module.css tests/thesis-map.test.mjs tests/thesis-accessibility-contract.test.mjs
git commit -m "feat: add Chainfren ownership map"
```

## Task 11: Generate the print route and downloadable PDF

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `app/(mainpage)/thesis/print/page.jsx`
- Create: `app/(mainpage)/thesis/print/print.module.css`
- Create: `app/(mainpage)/thesis/download/page.jsx`
- Create: `scripts/hash-thesis-content.mjs`
- Create: `scripts/generate-thesis-pdf.mjs`
- Create: `tests/thesis-pdf.test.mjs`
- Create: `content/chainfren-thesis/generated-content-hash.mjs`
- Create: `public/downloads/chainfren-thesis-2026.1.pdf`
- Create: `public/downloads/chainfren-thesis-2026.1.sha256`

- [ ] **Step 1: Write failing PDF and hash contract tests**

Assert the print route imports all chapter components, sets `robots: { index: false, follow: false }`, displays content version `2026.1`, imports the generated canonical-source hash, and excludes reader chrome. Assert the website metadata imports the same generated hash. Assert the download route links only to the PDF. Assert the `.sha256` file has distinct `source` and PDF-file checksum lines.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/thesis-pdf.test.mjs`  
Expected: FAIL.

- [ ] **Step 3: Install Playwright as a development dependency**

Run:

```bash
npm install --save-dev playwright
npx playwright install chromium
```

The lockfile pins the installed version. Playwright must not enter runtime route bundles.

- [ ] **Step 4: Build the print route**

Render cover, table of contents, all nine chapters, citations, page footer, page number, and content version. Do not render interactive instructions, mobile controls, map controls, or site navigation.

- [ ] **Step 5: Add print CSS**

Define A4 page size, safe margins, chapter page breaks, widow and orphan handling, grayscale-safe borders, visible URLs where needed, and no clipped cards.

- [ ] **Step 6: Build the deterministic canonical-source hash generator**

`hash-thesis-content.mjs` must sort and hash only the canonical public inputs: all chapter MDX, short-read MDX, manifest, claims, citations, public configuration, `public-system.mjs`, and map layout. Normalize path separators and line endings before hashing. Do not hash the generated hash module, PDF, checksum file, release review, build output, dates, or filesystem paths. Write the result to `content/chainfren-thesis/generated-content-hash.mjs` as `THESIS_CONTENT_HASH`. The website and print route import that value, so both embed the same source hash before the PDF is rendered.

- [ ] **Step 7: Build the PDF generator and managed server lifecycle**

```js
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(`${baseUrl}/thesis/print`, { waitUntil: 'networkidle' })
await page.emulateMedia({ media: 'print' })
await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true })
```

With `--start-server`, the script must spawn `npm run start -- --hostname 127.0.0.1 --port 3099`, poll `http://127.0.0.1:3099/thesis/print` until it returns 200 or a 30-second timeout expires, generate the PDF, and always stop the spawned process in `finally`. Send `SIGTERM`, wait up to five seconds, then send `SIGKILL` only to that exact child PID if needed. Fail clearly on startup, health-check, render, or cleanup errors.

After generation, calculate a separate SHA-256 for the PDF file. Write two labeled lines to `public/downloads/chainfren-thesis-2026.1.sha256`: the canonical source hash and the PDF-file checksum. Write both values to the release review. Never require the different hashes to equal each other.

- [ ] **Step 8: Add scripts**

```json
"thesis:hash": "node scripts/hash-thesis-content.mjs",
"thesis:pdf": "node scripts/generate-thesis-pdf.mjs --start-server --url http://127.0.0.1:3099/thesis/print --output public/downloads/chainfren-thesis-2026.1.pdf",
"thesis:artifacts": "npm run thesis:hash && npm run build && npm run thesis:pdf"
```

- [ ] **Step 9: Generate and inspect the PDF**

Run `npm run thesis:artifacts`. Verify the managed production server exits. Render representative pages to images with the PDF skill, and inspect cover, TOC, Chapter 01, Chapter 06, Chapter 08, citations, source hash, and final CTA.

- [ ] **Step 10: Run tests and verify the download**

Run:

```bash
node --test tests/thesis-pdf.test.mjs
npm run build
```

Verify `/thesis/download` links to `/downloads/chainfren-thesis-2026.1.pdf` and no Markdown or HTML download appears.

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json app/\(mainpage\)/thesis/print app/\(mainpage\)/thesis/download scripts/hash-thesis-content.mjs scripts/generate-thesis-pdf.mjs tests/thesis-pdf.test.mjs content/chainfren-thesis/generated-content-hash.mjs public/downloads
git commit -m "feat: add Chainfren thesis PDF export"
```

## Task 12: Add metadata, social preview, and site discovery

**Files:**
- Modify: `app/(mainpage)/thesis/layout.jsx`
- Modify: `app/(mainpage)/thesis/read/[chapter]/page.jsx`
- Create: `app/(mainpage)/thesis/opengraph-image.jsx`
- Create: `app/(mainpage)/thesis/components/ArticleJsonLd.jsx`
- Modify: `app/config/stack.js`
- Modify: `tests/thesis-routes.test.mjs`

- [ ] **Step 1: Write failing metadata and discovery tests**

Assert publication metadata uses `https://www.chainfren.com/thesis`, chapter metadata is unique, the OG image uses Chainfren colors and title, and the Company footer column links to `/thesis` as `The Chainfren thesis`. Assert chapter and short-read routes emit server-rendered Article JSON-LD with canonical URL, headline, description, `dateModified`, content version, canonical-source hash, and public-safe Chainfren publisher data.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/thesis-routes.test.mjs`  
Expected: FAIL.

- [ ] **Step 3: Implement route metadata**

Hub, short read, each chapter, map, and download page need descriptive title, description, canonical URL, Open Graph data, and Twitter card. The print route stays no-index.

Render `ArticleJsonLd` on the short read and each chapter route. Serialize only validated public fields. Use an Article `mainEntityOfPage`, canonical `url`, headline, description, `dateModified`, `version: THESIS_CONTENT_VERSION`, `identifier: THESIS_CONTENT_HASH`, and publisher name and canonical public URL. Do not include private authorship, vault paths, local files, internal IDs, or unsupported organization claims.

- [ ] **Step 4: Build the publication OG image**

Use `ImageResponse` with white or warm paper, navy type, cyan or mint accent, the title, and the approved line `African creators have already won the attention. The next fight is ownership.` Do not add remote assets or fonts.

- [ ] **Step 5: Add a footer discovery link only**

Add `['The Chainfren thesis', '/thesis']` to the Company footer column. Do not add a new top-level desktop navigation item or change the two-menu structure.

- [ ] **Step 6: Test and build**

Run:

```bash
node --test tests/thesis-routes.test.mjs
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app/\(mainpage\)/thesis app/config/stack.js tests/thesis-routes.test.mjs
git commit -m "feat: add thesis metadata and discovery"
```

## Task 13: Enforce release safety and canonical-content consistency

**Files:**
- Modify: `scripts/validate-thesis-content.mjs`
- Modify: `tests/thesis-public-safety.test.mjs`
- Modify: `tests/thesis-pdf.test.mjs`
- Modify: `package.json`
- Modify: `docs/thesis-release-review-2026.1.md`

- [ ] **Step 1: Add failing release-level tests**

Assert:

- Every manifest chapter has an MDX file and registry entry.
- Short read exists.
- Website and PDF version are `2026.1`.
- All public CTAs resolve to existing route files or approved external URLs.
- All claims link to valid chapters.
- All public citations use HTTPS or an approved first-party reference.
- Generated public text contains no blocked pattern, em dash, or en dash.
- Recomputed canonical-source hash matches `generated-content-hash.mjs` and the hash embedded by website and PDF.
- PDF-file checksum matches the PDF line in the `.sha256` artifact. It is not required to equal the canonical-source hash.

- [ ] **Step 2: Run the tests and verify they fail for missing checks**

Run:

```bash
node --test tests/thesis-public-safety.test.mjs tests/thesis-pdf.test.mjs
```

Expected: FAIL until release validation is complete.

- [ ] **Step 3: Complete the validator**

The default command is strict and has no partial mode in release use. Add `npm run prebuild` only if it does not interfere with unrelated development workflows. Otherwise make `npm run build` preceded by `npm run validate:thesis` in the release checklist, not globally.

- [ ] **Step 4: Verify the public content boundary manually**

Search built HTML, route data, JavaScript, PDF text, and social image source. Record the command and result in the release review. Do not search or alter unrelated user files.

- [ ] **Step 5: Run full content validation and regenerate the PDF**

Run:

```bash
npm run validate:thesis
npm run thesis:artifacts
npm run validate:thesis
```

Expected: PASS with a stable canonical-source hash, a separately verified PDF checksum, and no production server left running after artifact generation.

- [ ] **Step 6: Commit**

```bash
git add scripts/validate-thesis-content.mjs scripts/hash-thesis-content.mjs tests/thesis-public-safety.test.mjs tests/thesis-pdf.test.mjs package.json content/chainfren-thesis/generated-content-hash.mjs public/downloads docs/thesis-release-review-2026.1.md
git commit -m "test: enforce thesis publication safety"
```

## Task 14: Run responsive, accessibility, design, and performance verification

**Files:**
- Modify: `app/(mainpage)/thesis/thesis.module.css`
- Modify: focused thesis components only when a test finds a defect
- Modify: `docs/thesis-release-review-2026.1.md`

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
npm run test:thesis
npm run validate:thesis
node --test tests/*.test.mjs
npm run build
```

Expected: all tests pass and all routes build.

- [ ] **Step 2: Start the production server and run `@qa`**

Test hub, short read, Chapters 01, 05, 06, and 08, map, download, print, and one invalid chapter URL.

- [ ] **Step 3: Verify required viewports with `@browse`**

Capture and inspect:

- 360x800.
- 390x844.
- 768x1024 portrait and 1024x768 landscape.
- 1280x720.
- 1440x900.

Check no horizontal overflow, no covered text, clear reader controls, readable line length, correct card geometry, and stable map behavior.

- [ ] **Step 4: Run `@design-review`**

Review immersion, hierarchy, spacing, typography, mobile polish, desktop expansion, transition quality, full-fidelity use of canonical logos, marks, frens, icons, assets, animations, effects, and whether any surface feels like a generic documentation template. Compare rendered instances against the design-system previews and production components. Fix only thesis-scoped findings.

- [ ] **Step 5: Verify accessibility**

Use keyboard-only navigation and accessibility snapshots. Check skip link, heading order, landmark names, focus trap and restoration, focus visibility, 44px targets, contrast, large text, reduced motion, map fallback, and print link text.

- [ ] **Step 5a: Run the canonical brand-fidelity audit**

Run `node --test tests/thesis-brand-fidelity.test.mjs`, then compare the hub, reader, map, and PDF against the Chainfren design-system previews for logo marks, wordmark, fren poses, icon language, type scale, colors, cards, radii, shadows, gradients, and motion. Confirm every used asset is the canonical repository file or an exact copied source with a recorded checksum. Confirm no logo filter, aspect-ratio distortion, traced SVG, heavy font weight, substitute icon, invented animation, or unapproved effect appears. Record the audit in the release review.

- [ ] **Step 6: Run `@benchmark` for publication routes**

Use at least three cold mobile runs per route under one documented slow-4G profile. Measure `/thesis`, `/thesis/short`, `/thesis/read/the-gap`, `/thesis/map`, and `/thesis/download`.

Hard pre-release gates:

- Median lab LCP below 2.5 seconds.
- Median lab CLS below 0.1.
- Median TBT below 200 milliseconds.
- Route-specific JavaScript below 70 KB compressed.
- Critical first-load transfer below 500 KB compressed.
- Desktop map chunk absent from 390px reader and map-tree sessions.

If the global site shell causes a budget miss, document inherited and thesis-specific bytes separately. Do not remove brand or accessibility behavior to pass.

- [ ] **Step 7: Re-run humanizer and ADS-STE100 audits on rendered text**

Review the text as users see it, including buttons, map claims, maturity labels, metadata, and PDF. Record all passes in the release review.

- [ ] **Step 8: Regenerate and re-inspect the final PDF**

The PDF must match the final content version and content hash. Inspect grayscale output and links.

- [ ] **Step 9: Commit verified fixes and report**

```bash
git add app/\(mainpage\)/thesis content/chainfren-thesis docs/thesis-release-review-2026.1.md public/downloads
git commit -m "test: verify Chainfren thesis experience"
```

## Task 15: Final release gate and handoff

**Files:**
- Modify: `docs/thesis-release-review-2026.1.md`
- Modify: `README.md` only if the repository already documents feature routes there

- [ ] **Step 1: Run the final clean verification**

Run from a clean implementation worktree:

```bash
git status --short
npm run test:thesis
npm run validate:thesis
node --test tests/*.test.mjs
npm run build
```

Expected: only intended generated verification artifacts are present before staging, all tests pass, and build succeeds.

- [ ] **Step 2: Verify acceptance criteria against the design spec**

Check every acceptance item in `docs/superpowers/specs/2026-07-21-chainfren-thesis-publication-design.md`. Link evidence in the release review.

- [ ] **Step 3: Run `@superpowers:verification-before-completion`**

Do not claim completion until the skill confirms current evidence.

- [ ] **Step 4: Request code review**

Use `@superpowers:requesting-code-review` or the repository's `/review` workflow. Address blocking findings, rerun focused tests, then rerun the final verification.

- [ ] **Step 5: Commit the final review record**

```bash
git add docs/thesis-release-review-2026.1.md README.md
git commit -m "docs: record Chainfren thesis release evidence"
```

- [ ] **Step 6: Hand off without deploying**

Report routes, content version, PDF path, test results, performance results, known limits, and exact commit range. Production deployment remains separately authorized.
