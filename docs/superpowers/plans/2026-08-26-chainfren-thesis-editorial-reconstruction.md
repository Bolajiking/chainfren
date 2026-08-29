# Chainfren Thesis Editorial Reconstruction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruct the existing Chainfren thesis so it recovers the older publication's strongest narrative argument, presents open rails enabled by blockchain as the unlock, and lists the public products with the approved names, statuses, and order.

**Architecture:** Keep the current nine-chapter MDX publication and its route structure. Change the canonical public configuration and schema first, then revise chapters and synchronized public records against tests, then regenerate and verify the current 2026.2 PDF and checksums. The implementation preserves the existing allowlist, denylist, server-rendered reader, ownership map, and artifact pipeline.

**Tech Stack:** Next.js 13.4.7 App Router, React 18.2, MDX 2, CSS Modules, Node's built-in test runner, Playwright PDF generation, existing Chainfren thesis validators.

---

## Required implementation skills

- Use `@superpowers:test-driven-development` for code and content-contract changes.
- Use `@humanizer:humanizer` for every revised chapter, the short read, map claims, metadata, and product summaries.
- Use `@superpowers:verification-before-completion` before reporting completion.
- Use `@superpowers:requesting-code-review` after all focused checks pass.
- Use the local browser QA workflow only after the source tests and production build pass.

## Worktree and scope

- Work in `/Users/controlla/chainfren-worktrees/chainfren-thesis-2026-2`.
- Preserve the nine chapter slugs and all existing public routes.
- Keep `THESIS_CONTENT_VERSION` at `2026.2`; this is a correction to the current unreleased publication, not a new edition.
- Do not modify the second-brain vault, TiVi repository, Indy repository, or other product repositories.
- Do not change global product pages or their commercial configuration unless a thesis import directly requires it.
- Do not deploy or integrate the branch.
- Do not weaken public-safety scans or release checks.
- Use `apply_patch` for file edits.

## Pre-draft source checkpoint

Before editing public copy, create an ignored private checkpoint at `.superpowers/2026-08-26-thesis-source-checkpoint.md` that records only:

- primary book read: *Read Write Own*;
- old publication revisions: `82026ba`, `57d8365`, and the approved 2026.1 design, plan, and release review;
- current publication revision: `b6bd259` plus the 2026.2 editorial design, plan, and release review;
- authoritative product sources checked for TiVi, Creator Growth OS, Creator Network, Community Engine, AI Agent Studio, Star Factor, Sabi, and Indy;
- the direct user decisions that override older records;
- the final public status mapping.

Do not put source excerpts, private operations, product security notes, finances, or local paths into any public content module or generated artifact.

## File map

### Canonical content and configuration

- Modify `content/chainfren-thesis/chapters/01-the-gap.mdx`: restore the older narrative movement for all Africans.
- Modify `content/chainfren-thesis/chapters/02-the-trap.mdx`: restore attract-then-extract inside the broader systemic diagnosis.
- Modify `content/chainfren-thesis/chapters/03-the-unlock.mdx`: make open rails the unlock and blockchain the enabling technology.
- Modify `content/chainfren-thesis/chapters/04-the-thesis.mdx`: reduce definitional density while keeping mission, ownership, and exit rights.
- Modify `content/chainfren-thesis/chapters/05-the-company.mdx`: preserve and humanize the distribution-first company argument.
- Modify `content/chainfren-thesis/chapters/06-what-we-build.mdx`: restore the approved opening and render the grouped product list only.
- Modify `content/chainfren-thesis/chapters/07-how-we-work.mdx`: keep the principles and remove policy-like phrasing.
- Modify `content/chainfren-thesis/chapters/08-the-road-ahead.mdx`: restore the older restraint and the approved African-built horizon.
- Modify `content/chainfren-thesis/chapters/09-build-with-us.mdx`: keep one public invitation.
- Modify `content/chainfren-thesis/short-read.mdx`: synchronize the complete revised argument.
- Modify `content/chainfren-thesis/manifest.mjs`: update summaries, claim ownership, and revision date.
- Modify `content/chainfren-thesis/claims.mjs`: rename stale claim IDs and synchronize public map language.
- Modify `content/chainfren-thesis/map-layout.mjs`: update coordinates for renamed claim IDs.
- Modify `content/chainfren-thesis/public-config.mjs`: apply exact product labels, stages, grouping, and order.
- Modify `content/chainfren-thesis/public-system.mjs`: synchronize TiVi, the distribution loop, and roadmap language.
- Modify `app/(mainpage)/thesis/short/page.jsx`: synchronize the short-read structured-data revision date.

### Presentation and validation

- Modify `app/(mainpage)/thesis/components/MaturityBadge.jsx`: render a styled, human-readable status label.
- Modify `app/(mainpage)/thesis/thesis.module.css`: make statuses visually subordinate to product names.
- Modify `lib/thesis/schema.mjs`: enforce exact stages, groups, claims, and public-system meanings.
- Modify `lib/thesis/public-presentation.mjs`: expose the approved human-readable status safely if needed by the badge.
- Modify `docs/thesis-release-review-2026.2.md`: record public-safe editorial, grammar, artifact, and verification evidence.

### Tests and artifacts

- Modify `tests/thesis-editorial-contract.test.mjs`: enforce chapter structure, open-rails framing, product-list boundary, and public language.
- Modify `tests/thesis-schema.test.mjs`: enforce exact claim IDs, edges, stages, groups, order, and TiVi identity.
- Modify `tests/thesis-public-presentation.test.mjs`: enforce TiVi and status-label normalization.
- Modify `tests/thesis-public-safety.test.mjs`: keep synchronized public-system and denylist contracts.
- Modify `tests/thesis-ownership-map.test.mjs`: enforce renamed claim IDs and deep links.
- Modify `tests/thesis-routes.test.mjs`: enforce product-list semantics and status presentation.
- Modify artifact tests only when their exact expected hashes, dates, or text change.
- Regenerate `content/chainfren-thesis/generated-content-hash.mjs`.
- Regenerate `public/downloads/chainfren-thesis-2026.2.pdf`.
- Regenerate `public/downloads/chainfren-thesis-2026.2.sha256`.

## Task 1: Record the source checkpoint and freeze the revised contracts

**Files:**
- Create ignored: `.superpowers/2026-08-26-thesis-source-checkpoint.md`
- Modify: `tests/thesis-editorial-contract.test.mjs`
- Modify: `tests/thesis-schema.test.mjs`
- Modify: `tests/thesis-public-presentation.test.mjs`
- Modify: `tests/thesis-public-safety.test.mjs`
- Modify: `tests/thesis-ownership-map.test.mjs`

- [ ] **Step 1: Create the private source checkpoint**

Use `apply_patch` to create the ignored checkpoint with the source categories and direct decisions listed above. Record the final mapping exactly:

```text
Live: TiVi, Creator Growth OS, Creator Network
Early access: Community Engine, AI Agent Studio
Building: Star Factor, Sabi
Roadmap: Indy (Directional)
```

- [ ] **Step 2: Add failing product-contract tests**

Update `tests/thesis-schema.test.mjs` to require:

```js
assert.deepEqual(PUBLIC_PRODUCT_GROUPS, [
  { id: 'live', label: 'Live', itemIds: ['media-launchpad', 'creator-growth-os', 'creator-network'] },
  { id: 'early-access', label: 'Early access', itemIds: ['community-engine', 'ai-agent-studio'] },
  { id: 'building', label: 'Building', itemIds: ['star-factor', 'sabi'] },
  { id: 'roadmap', label: 'Roadmap', itemIds: ['indy'] },
])
```

Require the exact maturity mapping:

```js
{
  'media-launchpad': 'live',
  'creator-growth-os': 'live',
  'creator-network': 'live',
  'community-engine': 'early-access',
  'ai-agent-studio': 'early-access',
  'star-factor': 'building',
  sabi: 'building',
  indy: 'directional',
}
```

Assert that the visible label for `media-launchpad` is `TiVi`, and no visible product label or group contains `Media Launchpad`, `flagship`, or `live core`.

- [ ] **Step 3: Add failing claim and map tests**

Replace stale claim IDs in expected test data:

```js
'blockchain-open-rails' -> 'open-rails'
'tivi-flagship' -> 'tivi-product'
```

Require the claim titles to communicate:

```text
Open rails enabled by blockchain
TiVi gives participation a product home
```

Update expected edges and map-layout keys in schema and ownership-map tests.

- [ ] **Step 4: Add failing editorial tests**

In `tests/thesis-editorial-contract.test.mjs`, add or revise assertions so they require:

```js
assert.match(chapters.gap, /Africa is already online/i)
assert.match(chapters.gap, /value[^.]*travel back|value[^.]*return/i)
assert.match(chapters.trap, /attract[\s\S]{0,240}extract/i)
assert.match(chapters.trap, /foreign[^.]*African|African[^.]*foreign/i)
assert.match(chapters.unlock.split(/\n\s*\n/, 1)[0], /open rails/i)
assert.match(chapters.unlock, /enabled by blockchain|blockchain[^.]*enable/i)
assert.ok((chapters.unlock.match(/\bblockchain\b/gi) ?? []).length <= 3)
assert.match(chapters.products, /We build for the part after attention/i)
assert.match(chapters.products, /Our products and solutions are the practical layer/i)
assert.doesNotMatch(proseBlocks(chapters.products).slice(0, 2).join(' '), /TiVi|Star Factor|Sabi|Creator Network|Creator Growth OS|Community Engine|AI Agent Studio|Indy/i)
assert.doesNotMatch(chapters.products, /flagship|live core/i)
assert.match(chapters.horizon, /Africans[^.]*distribute[^.]*own[^.]*earn/i)
assert.match(chapters.horizon, /open rails built by Africans for Africans/i)
```

Update the product-renderer test to require description plus status as separate elements rather than a bare link and inline badge.

- [ ] **Step 5: Run the focused tests and confirm failure**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs tests/thesis-schema.test.mjs tests/thesis-public-presentation.test.mjs tests/thesis-public-safety.test.mjs tests/thesis-ownership-map.test.mjs
```

Expected: FAIL on the old group order, stages, stale claim IDs, old TiVi label, blockchain-first opening, and missing reconstructed prose.

- [ ] **Step 6: Commit the failing contracts**

```bash
git add tests/thesis-editorial-contract.test.mjs tests/thesis-schema.test.mjs tests/thesis-public-presentation.test.mjs tests/thesis-public-safety.test.mjs tests/thesis-ownership-map.test.mjs
git commit -m "test: define thesis reconstruction contracts"
```

Do not add the ignored `.superpowers` checkpoint.

## Task 2: Update canonical product, claim, and public-system data

**Files:**
- Modify: `content/chainfren-thesis/public-config.mjs`
- Modify: `content/chainfren-thesis/public-system.mjs`
- Modify: `content/chainfren-thesis/claims.mjs`
- Modify: `content/chainfren-thesis/map-layout.mjs`
- Modify: `content/chainfren-thesis/manifest.mjs`
- Modify: `lib/thesis/schema.mjs`
- Modify: `lib/thesis/public-presentation.mjs`

- [ ] **Step 1: Replace the public product records**

Keep the stable internal ID and route for TiVi, but change the visible record:

```js
export const PUBLIC_PRODUCT_MATURITY = [
  { id: 'media-launchpad', label: 'TiVi', description: 'A media channel for live and on-demand programming, commerce, direct payments, and audience relationships.', maturity: 'live', href: '/products/media-launchpad' },
  { id: 'creator-growth-os', label: 'Creator Growth OS', description: 'Tools and support that help creators turn attention into an audience business they can keep.', maturity: 'live', href: '/products/creator-growth-os' },
  { id: 'community-engine', label: 'Community Engine', description: 'An owned community layer for membership, loyalty, and fan participation.', maturity: 'early-access', href: '/products/community-engine' },
  { id: 'ai-agent-studio', label: 'AI Agent Studio', description: 'Practical AI systems for content, distribution, acquisition, and operations.', maturity: 'early-access', href: '/products/ai-agent-studio' },
]

export const PUBLIC_INITIATIVE_MATURITY = [
  { id: 'creator-network', label: 'Creator Network', description: 'Trusted distribution that connects creators and brands through cultural fit.', maturity: 'live', href: '/creator-network' },
  { id: 'sabi', label: 'Sabi', description: 'Chainfren\'s media and broadcasting product.', maturity: 'building', href: '/sabi' },
  { id: 'star-factor', label: 'Star Factor', description: 'A participatory entertainment product currently being built.', maturity: 'building', href: '/thesis/read/the-road-ahead' },
  { id: 'indy', label: 'Indy', description: 'A creator-focused AI business manager and roadmap direction.', maturity: 'directional', href: '/thesis/read/the-road-ahead' },
]
```

Add the exact four public groups from Task 1.

- [ ] **Step 2: Update the stage schema**

In `lib/thesis/schema.mjs`:

- remove `live-core` and `later` from the thesis stage allowlist;
- keep `live`, `early-access`, `building`, and `directional`;
- update the exact expected mapping;
- update product-group validation to require the four approved groups and exact membership;
- require every product record to have a non-empty public `description`;
- reject the visible phrases `TiVi / Media Launchpad`, `flagship`, and `live core`.

- [ ] **Step 3: Rename and rewrite the two stale claims**

In `claims.mjs`, replace:

```js
['open-rails', 'Open rails enabled by blockchain', 'Open rails can support portable identity, direct payments, transparent settlement, participation, and credible commitments without leaving one company with every key.', 'mechanism', 'the-unlock', 5]
['tivi-product', 'TiVi gives participation a product home', 'TiVi gives creators and organisations a media channel they can control and a place where audience relationships can continue after attention.', 'execution', 'what-we-build', 11]
```

Update every edge endpoint and `map-layout.mjs` key. Do not change unrelated coordinates unless the labels visibly clip during QA.

- [ ] **Step 4: Synchronize the public system**

Update TiVi's distribution-loop record to:

```js
{ id: 'tivi', title: 'TiVi', summary: 'A media channel where participation and audience relationships can continue.', maturity: 'live', maturityId: 'media-launchpad', href: '/products/media-launchpad' }
```

Keep Star Factor in development, Sabi building, and Indy directional. Rewrite the final roadmap horizon so it points toward Africans distributing, owning, and earning on open rails built by Africans for Africans.

- [ ] **Step 5: Synchronize the manifest**

Set every `updatedAt` to `2026-08-26`. Replace `blockchain-open-rails` with `open-rails` and `tivi-flagship` with `tivi-product`. Rewrite summaries so they match the approved chapter design and do not use `flagship`, `Media Launchpad`, or blockchain-first framing.

- [ ] **Step 6: Run canonical-data tests**

Run:

```bash
node --test tests/thesis-schema.test.mjs tests/thesis-public-presentation.test.mjs tests/thesis-public-safety.test.mjs tests/thesis-ownership-map.test.mjs
```

Expected: canonical-data assertions PASS. Editorial tests still fail because manuscript copy has not changed.

- [ ] **Step 7: Commit**

```bash
git add content/chainfren-thesis/public-config.mjs content/chainfren-thesis/public-system.mjs content/chainfren-thesis/claims.mjs content/chainfren-thesis/map-layout.mjs content/chainfren-thesis/manifest.mjs lib/thesis/schema.mjs lib/thesis/public-presentation.mjs tests
git commit -m "feat: align thesis public product system"
```

## Task 3: Reconstruct The Gap, The Trap, and The Unlock

**Files:**
- Modify: `content/chainfren-thesis/chapters/01-the-gap.mdx`
- Modify: `content/chainfren-thesis/chapters/02-the-trap.mdx`
- Modify: `content/chainfren-thesis/chapters/03-the-unlock.mdx`
- Modify: `docs/thesis-release-review-2026.2.md`

- [ ] **Step 1: Draft The Gap from the approved sequence**

Use six short paragraphs in this order:

```text
Africa is already online.
African culture, commerce, and community travel.
The value does not always travel back.
The systems beneath the relationship often sit elsewhere.
Visibility matters but is only the beginning.
The gap is African attention without enough African control and retained value.
```

Name creators, brands, and audiences naturally. Do not present them as definitions or make creators stand in for all Africans.

- [ ] **Step 2: Run the Humanizer draft audit on The Gap**

Ask of each paragraph:

- Does it sound like a person making an argument?
- Does it rely on abstract nouns where a human consequence would be clearer?
- Does it repeat the mission instead of advancing it?
- Does it make an achieved-ownership claim?

Apply the final rewrite and remove all dash characters.

- [ ] **Step 3: Draft The Trap with attract-then-extract**

Keep the current broad opening about platforms and middlemen. Add the explicit structural sequence:

```text
attract -> dependence -> extract
```

Explain that extraction can come from a foreign platform, an African middleman, or any concentrated system. Preserve the point that useful access should not become captivity.

- [ ] **Step 4: Run the Humanizer and ASD-STE audit on The Trap**

Keep one main claim per sentence where practical. Preserve the natural rhythm of the analogy. Avoid depicting every intermediary as malicious.

- [ ] **Step 5: Draft The Unlock around open rails**

The first paragraph must define open rails before naming blockchain. Use a formulation with this meaning:

```text
The unlock is open rails: shared ways to carry identity, payments, access, participation, and commitments beyond one company's system. Blockchain technology can enable those rails by keeping a shared record and enforcing rules that one company cannot quietly rewrite.
```

Then explain the practical capabilities as possibilities, not as shipped Chainfren claims. Keep the practical-use-versus-speculation boundary and the African interface test.

- [ ] **Step 6: Run the Humanizer and ASD-STE audit on The Unlock**

Limit `blockchain` to no more than three necessary uses. Prefer `open rails`, `shared record`, or the named practical capability elsewhere. Define technical terms at first use.

- [ ] **Step 7: Run focused tests and validation**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs
npm run validate:thesis:partial
```

Expected: Gap, Trap, and Unlock assertions PASS. Remaining manuscript assertions may still fail until later tasks.

- [ ] **Step 8: Record the public-safe editorial pass**

In `docs/thesis-release-review-2026.2.md`, record Humanizer, ASD-STE, grammar, factual-position, and public-safety results without source excerpts or private working notes.

- [ ] **Step 9: Commit**

```bash
git add content/chainfren-thesis/chapters/01-the-gap.mdx content/chainfren-thesis/chapters/02-the-trap.mdx content/chainfren-thesis/chapters/03-the-unlock.mdx docs/thesis-release-review-2026.2.md
git commit -m "docs: reconstruct thesis opening argument"
```

## Task 4: Humanize The Thesis, The Company, How We Work, and Build With Us

**Files:**
- Modify: `content/chainfren-thesis/chapters/04-the-thesis.mdx`
- Modify: `content/chainfren-thesis/chapters/05-the-company.mdx`
- Modify: `content/chainfren-thesis/chapters/07-how-we-work.mdx`
- Modify: `content/chainfren-thesis/chapters/09-build-with-us.mdx`
- Modify: `docs/thesis-release-review-2026.2.md`

- [ ] **Step 1: Revise The Thesis**

Keep the exact mission sentence. Preserve attention, participation, ownership, value, custodianship, and the right to leave. Replace category-heavy definitions with examples and consequences. Keep the mission explicitly unfinished.

- [ ] **Step 2: Revise The Company**

Keep `distribution-first`, `route into people's lives`, trust, and cultural context. Describe media, trusted relationships, and products as a public loop without turning the chapter into a product list.

- [ ] **Step 3: Revise How We Work**

Keep African context first, voluntary participation, customer control, portability, human dignity, the right to leave, and Chainfren's self-applied ownership test. Replace internal-doctrine phrases with public principles.

- [ ] **Step 4: Revise Build With Us**

Keep creators, brands, audiences, builders, partners, investors, and potential hires in one shared invitation. Keep one `/contact` link and one imperative close.

- [ ] **Step 5: Run the Humanizer audit across all four chapters**

Check for repeated sentence shapes, forced triads, vague institutional language, inflated claims, and abstract conclusions. Apply ASD-STE only where it improves explanation.

- [ ] **Step 6: Run focused tests**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs
npm run validate:thesis:partial
```

Expected: assertions for Chapters 04, 05, 07, and 09 PASS.

- [ ] **Step 7: Commit**

```bash
git add content/chainfren-thesis/chapters/04-the-thesis.mdx content/chainfren-thesis/chapters/05-the-company.mdx content/chainfren-thesis/chapters/07-how-we-work.mdx content/chainfren-thesis/chapters/09-build-with-us.mdx docs/thesis-release-review-2026.2.md
git commit -m "docs: humanize thesis company principles"
```

## Task 5: Rebuild What We Build and its status presentation

**Files:**
- Modify: `content/chainfren-thesis/chapters/06-what-we-build.mdx`
- Modify: `app/(mainpage)/thesis/components/MaturityBadge.jsx`
- Modify: `app/(mainpage)/thesis/thesis.module.css`
- Modify: `lib/thesis/public-presentation.mjs`
- Modify: `tests/thesis-routes.test.mjs`
- Modify: `tests/thesis-public-presentation.test.mjs`

- [ ] **Step 1: Add a failing status-presentation test**

Require `MaturityBadge` and the product-group headings to render dedicated metadata styles, and require normalized public labels:

```js
assert.match(badgeSource, /className={styles\.maturityBadge}/)
assert.match(productsSource, /className={styles\.productGroupHeading}/)
assert.match(badgeSource, /approvedStage\.displayMaturity/)
assert.deepEqual(normalizeMaturityStage('community-engine'), {
  label: 'Community Engine',
  maturity: 'early-access',
  displayMaturity: 'Early access',
})
```

- [ ] **Step 2: Implement safe status normalization**

In `lib/thesis/public-presentation.mjs`, add a fixed display map:

```js
const MATURITY_LABELS = {
  live: 'Live',
  'early-access': 'Early access',
  building: 'Building',
  directional: 'Directional',
}
```

Return `displayMaturity` only for approved registered stages.

- [ ] **Step 3: Style the badge as metadata**

Import thesis CSS into `MaturityBadge.jsx` and render:

```jsx
<span className={styles.maturityBadge} aria-label={`${approvedStage.label}: ${approvedStage.displayMaturity}`}>
  {approvedStage.displayMaturity}
</span>
```

Add `.maturityBadge` with a smaller font size, regular weight, muted colour, compact padding, and no heading or link inheritance. Add `.productGroupHeading` with a smaller size and lighter weight than `.productName`, clear spacing from the list, and the same quiet metadata role. Keep WCAG AA contrast and visible text at browser zoom.

- [ ] **Step 4: Restore the approved opening**

Use exactly these two opening paragraphs, subject only to final punctuation review:

```text
We build for the part after attention. A creator, a brand, or a community needs a way to keep the relationship that brought people together. That can mean a clearer way to reach people, a useful place to gather, or a product that makes participation feel worth returning to.

Our products and solutions are the practical layer. They let us turn what we learn from culture and distribution into tools people can use.
```

- [ ] **Step 5: Render the product list from canonical records**

For each group, render:

```jsx
<div
  id={`product-group-${group.id}`}
  className={styles.productGroupHeading}
  role="heading"
  aria-level={headingLevel}
>
  {group.label}
</div>
<li key={product.id} className={styles.productEntry}>
  <div className={styles.productEntryHeader}>
    <a href={product.href} className={styles.productName}>{product.label}</a>
    <MaturityBadge stage={product.id} />
  </div>
  <p className={styles.productDescription}>{product.description}</p>
</li>
```

Do not add prose paragraphs about individual products before or after the list. Remove the old Distribution Loop and Value Path from Chapter 06 if they make the products part of the chapter's argument. They may remain available elsewhere in the publication when synchronized with the thesis.

- [ ] **Step 6: Run presentation and route tests**

Run:

```bash
node --test tests/thesis-public-presentation.test.mjs tests/thesis-routes.test.mjs tests/thesis-editorial-contract.test.mjs
```

Expected: product hierarchy, separate descriptions, normalized statuses, and status styling PASS.

- [ ] **Step 7: Commit**

```bash
git add content/chainfren-thesis/chapters/06-what-we-build.mdx app/\(mainpage\)/thesis/components/MaturityBadge.jsx app/\(mainpage\)/thesis/thesis.module.css lib/thesis/public-presentation.mjs tests/thesis-routes.test.mjs tests/thesis-public-presentation.test.mjs
git commit -m "feat: clarify thesis product presentation"
```

## Task 6: Restore The Road Ahead and synchronize the short read

**Files:**
- Modify: `content/chainfren-thesis/chapters/08-the-road-ahead.mdx`
- Modify: `content/chainfren-thesis/short-read.mdx`
- Modify: `content/chainfren-thesis/manifest.mjs`
- Modify: `content/chainfren-thesis/claims.mjs`
- Modify: `content/chainfren-thesis/public-system.mjs`
- Modify: `app/(mainpage)/thesis/short/page.jsx`
- Modify: `docs/thesis-release-review-2026.2.md`

- [ ] **Step 1: Restore The Road Ahead's restrained shape**

Use this sequence:

```text
The direction is public without pretending every part is settled.
Star Factor is being built as a proof milestone for participatory entertainment.
Indy remains a longer directional product.
The purpose is participation and durable value, not a trading screen.
Africans distribute, own, and earn on open rails built by Africans for Africans.
```

Do not use internal dates, gates, funding needs, operating terms, or availability claims.

- [ ] **Step 2: Rewrite the short read as a synchronized editorial artifact**

Keep the same headings and cover:

- the widened Gap;
- attract-then-extract;
- open rails enabled by blockchain;
- the mission and right to leave;
- distribution-first company logic;
- the complete grouped product picture with exact statuses;
- how Chainfren works;
- the restored road ahead;
- one shared invitation.

Do not copy the full product renderer into the short read. State the product groups in compact prose while preserving exact names and statuses.

- [ ] **Step 3: Synchronize map claims, manifest summaries, and public-system copy**

Review all public records together. Remove stale occurrences of:

```text
Blockchain as practical open rails
Media Launchpad is TiVi
TiVi is the flagship expression
TiVi / Media Launchpad
Live core
Present building
Indy directional (when it reads as a product name)
```

Keep `Directional` as Indy's status and `media launchpad` only as an optional plain-language description of TiVi.

Update the hard-coded `dateModified` in `app/(mainpage)/thesis/short/page.jsx` from `2026-08-25` to `2026-08-26`. Search thesis route metadata for any other stale `2026-08-25` values and update only records that describe revised publication content.

- [ ] **Step 4: Run the full Humanizer, ASD-STE, and grammar audit on synchronized text**

Review chapters, short read, manifest, claims, public system, product descriptions, status labels, metadata, and map text. Check grammar, parallelism, pronouns, tense, punctuation, product naming, and public context.

Apply an explicit ASD-STE review to Chapter 06, Chapter 08, the short read, metadata, map copy, and every public product summary. Prefer active voice, one term for one concept, defined technical terms, and one main claim per sentence where practical. Preserve natural cadence where strict sentence shortening would flatten the voice.

- [ ] **Step 5: Run all source-level thesis tests**

Run:

```bash
npm run test:thesis
npm run validate:thesis
```

Expected: all tests and validation PASS before artifact regeneration.

- [ ] **Step 6: Commit**

```bash
git add content/chainfren-thesis docs/thesis-release-review-2026.2.md tests
git commit -m "docs: synchronize reconstructed thesis publication"
```

## Task 7: Review the rendered publication and correct public-language defects

**Files:**
- Modify only files implicated by findings under `app/(mainpage)/thesis`, `content/chainfren-thesis`, `lib/thesis`, and focused tests.
- Modify: `docs/thesis-release-review-2026.2.md`

- [ ] **Step 1: Build the production site**

Run:

```bash
npm run build
```

Expected: exit 0 and all existing thesis routes generated.

- [ ] **Step 2: Start or reuse the local server**

If the existing development server is still running, confirm it serves the current worktree. Otherwise run `npm run dev` and retain the session ID.

- [ ] **Step 3: Inspect every chapter and the short read in the browser**

Check the hub, short read, all nine chapter routes, map, and download page at mobile and desktop widths. Verify:

- no grammatical fragments or internal notes;
- the stronger narrative transitions render naturally;
- product groups appear Live, Early access, Building, Roadmap;
- TiVi reads as one Live product;
- status labels are visually subordinate;
- group headings are visually subordinate to product names;
- no product status looks like part of its name;
- no clipping, overflow, broken heading hierarchy, or covered text;
- ownership-map deep links still select the renamed claims.

- [ ] **Step 4: Fix only verified defects**

For each defect, add or update a focused regression assertion before the fix when practical. Do not redesign unrelated publication surfaces.

- [ ] **Step 5: Re-run source tests and build**

Run:

```bash
npm run test:thesis
npm run validate:thesis
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/\(mainpage\)/thesis content/chainfren-thesis lib/thesis tests docs/thesis-release-review-2026.2.md
git commit -m "fix: polish reconstructed thesis publication"
```

## Task 8: Regenerate and verify the PDF release artifacts

**Files:**
- Modify generated: `content/chainfren-thesis/generated-content-hash.mjs`
- Modify generated: `public/downloads/chainfren-thesis-2026.2.pdf`
- Modify generated: `public/downloads/chainfren-thesis-2026.2.sha256`
- Modify when implicated by artifact findings: canonical files under `content/chainfren-thesis/`
- Modify when implicated by artifact findings: `app/(mainpage)/thesis/print/print.module.css`
- Modify when implicated by artifact findings: `scripts/generate-thesis-pdf.mjs`
- Modify when implicated by artifact findings: focused tests under `tests/`
- Modify: `docs/thesis-release-review-2026.2.md`

- [ ] **Step 1: Generate the canonical artifacts**

Run:

```bash
npm run thesis:artifacts
```

Expected: the source hash, tagged PDF, and two-line checksum file are regenerated from the revised canonical content.

- [ ] **Step 2: Run release verification**

Run:

```bash
npm run thesis:verify-release
```

Expected: public-safety scan, built-output scan, source hash, PDF checksum, PDF text, and all thesis tests PASS.

- [ ] **Step 3: Inspect PDF structure and text**

Run:

```bash
pdfinfo public/downloads/chainfren-thesis-2026.2.pdf
pdftotext public/downloads/chainfren-thesis-2026.2.pdf -
```

Verify A4 page size, tagged PDF status, chapter order, exact product names and statuses, open-rails framing, no stale flagship or live-core language, and no internal material.

- [ ] **Step 4: Render and inspect representative PDF pages**

Inspect the cover, contents, The Gap, The Unlock, What We Build, The Road Ahead, and closing invitation. Check clipping, page breaks, status hierarchy, links, page numbers, grayscale legibility, and text extraction order.

- [ ] **Step 5: Correct and repeat any failed artifact check**

If inspection finds clipping, broken page breaks, weak status hierarchy, broken links, page-number defects, grayscale problems, or incorrect extraction order:

1. add or update a focused PDF or presentation regression test when practical;
2. correct the canonical source, print CSS, or PDF generator at the narrowest responsible layer;
3. run `npm run thesis:artifacts`;
4. run `npm run thesis:verify-release`;
5. render and inspect the affected page plus its adjacent pages again;
6. repeat until the artifact passes.

- [ ] **Step 6: Record current artifact evidence**

Update `docs/thesis-release-review-2026.2.md` with command results, test count, source hash, PDF hash, page count, tagged status, safety result, and visual-review result. Do not paste private source notes.

- [ ] **Step 7: Commit**

```bash
git add content/chainfren-thesis app/\(mainpage\)/thesis/print/print.module.css scripts/generate-thesis-pdf.mjs public/downloads/chainfren-thesis-2026.2.pdf public/downloads/chainfren-thesis-2026.2.sha256 docs/thesis-release-review-2026.2.md tests
git commit -m "feat: publish reconstructed thesis artifacts"
```

## Task 9: Final verification and review

**Files:**
- Modify only files required by verified review findings.
- Modify: `docs/thesis-release-review-2026.2.md`

- [ ] **Step 1: Run the complete verification suite from a clean worktree**

Run:

```bash
git diff --check
npm run test:thesis
npm run validate:thesis
npm run build
npm run thesis:verify-release
```

Expected: all commands exit 0.

- [ ] **Step 2: Search for stale or forbidden public language**

Search canonical content, route output, built output, and extracted PDF text for:

```text
TiVi / Media Launchpad
Media Launchpad is TiVi
flagship
live core
blockchain is the unlock
Indy directional
internal
runway
signed revenue
control matrix
risk register
local source paths
```

Interpret `media launchpad` only as allowed when it is a lower-case description of TiVi, never a separate product or visible label. All other stale or private matches must be absent from public output.

- [ ] **Step 3: Run `@superpowers:verification-before-completion`**

Verify current evidence rather than relying on earlier task results.

- [ ] **Step 4: Request independent code and publication review**

Use `@superpowers:requesting-code-review`. Ask the reviewer to check spec compliance, product identities and statuses, open-rails framing, grammar, public safety, map synchronization, and PDF integrity.

- [ ] **Step 5: Fix blocking findings and repeat verification**

Add regression tests for any functional or synchronization defect. Re-run the focused test. If a fix changes canonical content, public configuration, map data, route metadata, print layout, or PDF generation, run `npm run thesis:artifacts` before repeating the full verification suite. Confirm the regenerated source hash and PDF checksum replace the stale values.

- [ ] **Step 6: Commit the final review record**

```bash
git add docs/thesis-release-review-2026.2.md app/\(mainpage\)/thesis content/chainfren-thesis lib/thesis scripts/generate-thesis-pdf.mjs tests public/downloads
git commit -m "docs: record reconstructed thesis release review"
```

- [ ] **Step 7: Hand off without deployment or integration**

Report the branch, commit range, routes, PDF path, test results, build result, source hash, PDF checksum, and any non-blocking limits. Do not merge, deploy, or alter the base branch without separate authorization.
