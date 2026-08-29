# Chainfren Thesis Editorial Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the existing Chainfren thesis so it expresses the approved mission, distribution-first model, blockchain position, and public product hierarchy without exposing internal company mechanics.

**Architecture:** Keep the existing nine-chapter publication, four reader modes, routes, components, and build pipeline. Update the manuscript and its structured registries as one versioned content system, enforce the new hierarchy through schema and tests, then regenerate the PDF and hashes from the approved source.

**Tech Stack:** MDX, JavaScript ES modules, Node.js test runner, Next.js 13, Playwright PDF generation, repository thesis validators.

**Design source:** `docs/superpowers/specs/2026-08-25-chainfren-thesis-editorial-revision-design.md`

---

## File map

### Manuscript

- Modify `content/chainfren-thesis/short-read.mdx`: dedicated five-minute edition.
- Modify `content/chainfren-thesis/chapters/01-the-gap.mdx`: Africans and the attention-value gap.
- Modify `content/chainfren-thesis/chapters/02-the-trap.mdx`: extractive systems and rented relationships.
- Modify `content/chainfren-thesis/chapters/03-the-unlock.mdx`: practical blockchain use and portability.
- Modify `content/chainfren-thesis/chapters/04-the-thesis.mdx`: mission and custodianship.
- Modify `content/chainfren-thesis/chapters/05-the-company.mdx`: distribution-first public company model.
- Modify `content/chainfren-thesis/chapters/06-what-we-build.mdx`: grouped product hierarchy.
- Modify `content/chainfren-thesis/chapters/07-how-we-work.mdx`: public ownership principles.
- Modify `content/chainfren-thesis/chapters/08-the-road-ahead.mdx`: African-built open rails and product direction.
- Modify `content/chainfren-thesis/chapters/09-build-with-us.mdx`: shared invitation.

### Structured public content

- Modify `content/chainfren-thesis/manifest.mjs`: chapter summaries and revision date.
- Modify `content/chainfren-thesis/claims.mjs`: twelve claims and edges.
- Modify `content/chainfren-thesis/map-layout.mjs` only if a stable claim ID cannot be retained.
- Modify `content/chainfren-thesis/public-config.mjs`: version, product groups, and maturity records.
- Modify `content/chainfren-thesis/public-system.mjs`: five-step distribution loop, value path, and horizons.
- Modify `lib/thesis/schema.mjs`: authoritative maturity and sequence contracts.
- Modify `lib/thesis/progress.mjs`: content version used to invalidate stale reading progress.

### Presentation and artifacts

- Modify `app/(mainpage)/thesis/components/ThesisHub.jsx`: all-Africans thesis framing and publication version label.
- Modify `app/(mainpage)/thesis/opengraph-image/route.jsx`: all-Africans social-card copy and public edition version label.
- Modify `app/(mainpage)/thesis/short/page.jsx`: short-read metadata, description, and revision date.
- Modify `app/(mainpage)/thesis/components/DistributionLoop.jsx`: resolve the TiVi display ID to the Media Launchpad maturity record.
- Modify `app/(mainpage)/thesis/download/page.jsx`: versioned PDF link and filename.
- Modify `scripts/generate-thesis-pdf.mjs`: versioned PDF and checksum paths.
- Modify `scripts/validate-thesis-content.mjs`: version contract and release artifact paths.
- Regenerate `content/chainfren-thesis/generated-content-hash.mjs`.
- Generate `public/downloads/chainfren-thesis-2026.2.pdf`.
- Generate `public/downloads/chainfren-thesis-2026.2.sha256`.
- Preserve the previous `2026.1` release artifacts as historical files unless the user separately authorizes removal.

### Tests and review record

- Create `tests/thesis-editorial-contract.test.mjs`: mission, audience, blockchain, distribution, hierarchy, and prohibited-framing assertions, added incrementally with each prose task.
- Modify `tests/thesis-schema.test.mjs`: version, maturity, and five-step loop assertions.
- Modify `tests/thesis-public-safety.test.mjs`: versioned artifacts and revised loop assertions.
- Modify `tests/thesis-pdf.test.mjs`: `2026.2` paths and checksum assertions.
- Modify `tests/thesis-routes.test.mjs`: hub, short-read metadata, social copy, version labels, and TiVi maturity alias assertions.
- Modify any focused thesis test that freezes old claim text or version labels.
- Create `docs/thesis-release-review-2026.2.md`: editorial, factual, Humanizer, ADS-STE100, safety, and artifact verification record.

---

### Task 1: Capture the worktree baseline

**Files:**
- Create: `.superpowers/chainfren-thesis-2026.2-base.txt`

- [ ] **Step 1: Record the starting commit and dirty-worktree paths**

Run:

```bash
mkdir -p .superpowers
git rev-parse HEAD > .superpowers/chainfren-thesis-2026.2-base.txt
git status --short >> .superpowers/chainfren-thesis-2026.2-base.txt
```

Expected: the first line is the exact base commit. Following lines preserve every pre-existing modified or untracked path so later scope checks can distinguish user work from thesis work. Do not commit this local bookkeeping file.

---

### Task 2: Implement the version, hierarchy, maturity, and distribution contracts

**Files:**
- Modify: `tests/thesis-schema.test.mjs`
- Modify: `tests/thesis-public-safety.test.mjs`
- Modify: `tests/thesis-public-presentation.test.mjs`
- Modify: `tests/thesis-routes.test.mjs`
- Modify: `content/chainfren-thesis/public-config.mjs`
- Modify: `content/chainfren-thesis/public-system.mjs`
- Modify: `lib/thesis/schema.mjs`
- Modify: `lib/thesis/progress.mjs`
- Modify: `lib/thesis/public-presentation.mjs`
- Modify: `scripts/validate-thesis-content.mjs`
- Modify: `app/(mainpage)/thesis/components/DistributionLoop.jsx`

- [ ] **Step 1: Write exact failing group, maturity, loop, version, and badge-alias tests**

Add assertions before implementation:

```js
assert.equal(THESIS_CONTENT_VERSION, '2026.2')
assert.deepEqual(PUBLIC_PRODUCT_GROUPS, [
  { id: 'flagship', label: 'Flagship product', itemIds: ['media-launchpad'] },
  { id: 'in-development', label: 'In development', itemIds: ['star-factor'] },
  { id: 'distribution', label: 'Supporting distribution products', itemIds: ['sabi', 'creator-network'] },
  { id: 'capabilities', label: 'Additional capabilities', itemIds: ['creator-growth-os', 'community-engine', 'ai-agent-studio'] },
  { id: 'roadmap', label: 'Roadmap', itemIds: ['indy'] },
])
assert.deepEqual(DISTRIBUTION_LOOP.map(({ id }) => id), [
  'sabi', 'creator-network', 'tivi', 'additional-capabilities', 'star-factor',
])
assert.deepEqual(
  Object.fromEntries([...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY].map(({ id, maturity }) => [id, maturity])),
  {
    'media-launchpad': 'early-access',
    'creator-growth-os': 'live-core',
    'community-engine': 'early-access',
    'ai-agent-studio': 'early-access',
    'creator-network': 'live',
    sabi: 'building',
    'star-factor': 'building',
    indy: 'directional',
  },
)
assert.equal(DISTRIBUTION_LOOP.find(({ id }) => id === 'tivi').maturityId, 'media-launchpad')
```

Add negative schema tests for duplicate group membership, missing item coverage, changed group order, changed item order, an unknown item ID, and a missing TiVi `maturityId`. Add a presentation test showing `normalizeMaturityStage('media-launchpad')` returns TiVi's visible label and `early-access` maturity. Add a route source test proving `DistributionLoop.jsx` passes `item.maturityId || item.id` to `MaturityBadge`.

- [ ] **Step 2: Run the focused tests and verify one bounded red state**

Run:

```bash
node --test tests/thesis-schema.test.mjs tests/thesis-public-safety.test.mjs tests/thesis-public-presentation.test.mjs tests/thesis-routes.test.mjs
```

Expected: FAIL because `PUBLIC_PRODUCT_GROUPS` does not exist, the version and maturity records are stale, the distribution loop is old, and TiVi has no maturity alias.

- [ ] **Step 3: Implement one canonical grouped product registry**

In `public-config.mjs`, set version `2026.2`, change the visible `media-launchpad` label to `TiVi / Media Launchpad`, change Community Engine to `early-access`, change Star Factor to `building`, and export the exact five `PUBLIC_PRODUCT_GROUPS` records from the test.

Use the config export as the canonical version. In `lib/thesis/progress.mjs`, import and re-export `THESIS_CONTENT_VERSION` from `public-config.mjs` rather than maintaining a second literal.

- [ ] **Step 4: Implement exact schema and validator coverage**

Add `validateProductGroups(groups, maturityRecords)` in `lib/thesis/schema.mjs`. It must require exact group IDs, labels, item order, unique membership, and complete coverage of all eight maturity records.

In `scripts/validate-thesis-content.mjs`:

```js
import { THESIS_CONTENT_VERSION, PUBLIC_CTAS, PUBLIC_PRODUCT_GROUPS, PUBLIC_PRODUCT_MATURITY, PUBLIC_INITIATIVE_MATURITY } from '../content/chainfren-thesis/public-config.mjs'
```

Call `validateProductGroups` during strict validation and include `PUBLIC_PRODUCT_GROUPS` in `publicRecords()` so recursive safety scanning covers the new registry.

- [ ] **Step 5: Implement the five-step loop and TiVi maturity alias**

Use `id: 'tivi'` for the public loop and `maturityId: 'media-launchpad'` for badge resolution. Change `DistributionLoop.jsx` to pass `item.maturityId || item.id` into `MaturityBadge`. Require that alias in schema validation.

- [ ] **Step 6: Run the same focused suite to green**

Run:

```bash
node --test tests/thesis-schema.test.mjs tests/thesis-public-safety.test.mjs tests/thesis-public-presentation.test.mjs tests/thesis-routes.test.mjs
```

Expected: PASS with exact group, coverage, maturity, loop, version-equality, and TiVi badge-alias assertions.

- [ ] **Step 7: Commit only the explicit green files**

```bash
git add content/chainfren-thesis/public-config.mjs content/chainfren-thesis/public-system.mjs lib/thesis/schema.mjs lib/thesis/progress.mjs lib/thesis/public-presentation.mjs scripts/validate-thesis-content.mjs 'app/(mainpage)/thesis/components/DistributionLoop.jsx' tests/thesis-schema.test.mjs tests/thesis-public-safety.test.mjs tests/thesis-public-presentation.test.mjs tests/thesis-routes.test.mjs
git commit -m "feat: revise thesis product and distribution contracts"
```

---

### Task 3: Rewrite the mission argument in chapters 01 to 04

**Files:**
- Create: `tests/thesis-editorial-contract.test.mjs`
- Modify: `content/chainfren-thesis/chapters/01-the-gap.mdx`
- Modify: `content/chainfren-thesis/chapters/02-the-trap.mdx`
- Modify: `content/chainfren-thesis/chapters/03-the-unlock.mdx`
- Modify: `content/chainfren-thesis/chapters/04-the-thesis.mdx`

- [ ] **Step 1: Write failing mission, audience, and blockchain tests**

Create `tests/thesis-editorial-contract.test.mjs` with focused tests for chapters 01 to 04 only. Assert:

- Chapter 01 names creators, brands, and audiences as contributors to African attention.
- Chapter 02 names platforms, middlemen, and systems, and says extraction can be foreign or African.
- Chapter 03 names blockchain, payments, identity, participation, transparent settlement, portability, and speculation as not the purpose.
- Chapter 04 contains the mission concepts `Africans`, `full value`, and `attention`, defines at least identity, relationships, data, distribution, participation, and economic value, and names the right to leave.
- No chapter claims that ownership already exists as a completed outcome.
- No numeral appears in any of the ten manuscript files: the short read and chapters 01 to 09. Implement this as one helper that reads the complete manuscript set, so later tasks cannot introduce an unsupported number. If a numeric factual claim becomes necessary, add a claim-level citation record and a test that resolves that exact claim ID to a dated public citation before allowing the numeral.

- [ ] **Step 2: Run the mission contract and verify failure**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs
```

Expected: FAIL on creator-only audience framing, indirect blockchain framing, and the missing full-value mission.

- [ ] **Step 3: Draft Chapter 01 around all Africans**

Keep the current chapter length and narrative role. Establish creators, brands, and audiences as participants in the same attention economy. Replace creator-only claims with the broader gap between African attention and African control.

- [ ] **Step 4: Draft Chapter 02 around extraction as a system**

Name foreign extractive platforms, middlemen, and African extractive systems. Preserve the useful point that the diagnosis does not depend on individual bad intent. Explain the controlled assets: discovery, identity, data, relationships, distribution, and payment.

- [ ] **Step 5: Draft Chapter 03 around practical blockchain use**

Name blockchain in the opening section. Explain direct payments, portable identity, verifiable participation, transparent settlement, and shared economic involvement in plain language. Include the position that speculation is not the mission. Preserve the standard that technology must fit the devices, payment habits, languages, and communities people already use.

- [ ] **Step 6: Draft Chapter 04 around the approved mission**

State that Chainfren exists to enable Africans to own the full value their attention generates on the internet. Define custodianship as the control of identity, relationships, data, distribution, participation, and economic value. State that the right to leave is part of ownership.

- [ ] **Step 7: Run the exact mission contract and validator to green**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs
npm run validate:thesis
```

Expected: all chapter 01 to 04 contract tests PASS. Validator reports no blocked text or dash punctuation.

- [ ] **Step 8: Commit the mission chapters and their green contract**

```bash
git add tests/thesis-editorial-contract.test.mjs content/chainfren-thesis/chapters/01-the-gap.mdx content/chainfren-thesis/chapters/02-the-trap.mdx content/chainfren-thesis/chapters/03-the-unlock.mdx content/chainfren-thesis/chapters/04-the-thesis.mdx
git commit -m "docs: rewrite Chainfren thesis argument"
```

---

### Task 4: Rewrite the company and product chapters

**Files:**
- Modify: `content/chainfren-thesis/chapters/05-the-company.mdx`
- Modify: `content/chainfren-thesis/chapters/06-what-we-build.mdx`
- Modify: `content/chainfren-thesis/chapters/07-how-we-work.mdx`
- Modify: `content/chainfren-thesis/chapters/08-the-road-ahead.mdx`
- Modify: `content/chainfren-thesis/chapters/09-build-with-us.mdx`

- [ ] **Step 1: Append failing company, product-role, and horizon tests**

Add tests that assert:

- Chapter 05 uses `distribution-first` and names Sabi, Creator Network, and TiVi in that order.
- Chapter 06 imports and maps `PUBLIC_PRODUCT_GROUPS` rather than mapping a flat maturity list.
- The visible TiVi section precedes Star Factor, Sabi, Creator Network, Creator Growth OS, Community Engine, AI Agent Studio, and Indy.
- TiVi is called the flagship and Media Launchpad is identified as TiVi.
- Star Factor is described as being built and is not described as launched, live, available, or merely later.
- Sabi and Creator Network are identified as supporting distribution products.
- Creator Growth OS, Community Engine, and AI Agent Studio are identified as additional capabilities.
- Indy is identified as a roadmap product and not as currently available.
- Chapter 07 names portability and the right to leave.
- Chapter 08 separates present building, roadmap direction, and company ambition.
- Chapter 09 names all seven invited groups without separate sales claims.

- [ ] **Step 2: Run the editorial contract and verify the company section fails**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs
```

Expected: chapter 01 to 04 tests remain green; the newly added chapter 05 to 09 tests fail on the old company and product model.

- [ ] **Step 3: Rewrite Chapter 05 as a public distribution-first model**

Explain why Chainfren starts with distribution: infrastructure needs attention, trust, cultural context, and a real route into people's lives. State the public loop without financial sequencing, targets, internal organisation, or private operating mechanics.

- [ ] **Step 4: Rewrite Chapter 06 using grouped public products**

Import `PUBLIC_PRODUCT_GROUPS` plus the maturity records. Render semantic grouped lists with TiVi first and visible as the flagship. Explain that Media Launchpad is TiVi. Describe Star Factor as currently being built, Sabi and Creator Network as supporting distribution products, three additional capabilities, and Indy as roadmap.

Do not duplicate internal maturity labels in prose. Render the approved `MaturityBadge` where useful.

- [ ] **Step 5: Rewrite Chapter 07 as the ownership test**

State African context first, portability, voluntary participation, useful blockchain, human dignity, customer control, and the right to leave. Make clear that Chainfren must pass the same ownership test it applies to other platforms.

- [ ] **Step 6: Rewrite Chapter 08 as a public horizon**

Present Star Factor as being built without implying launch. Present Indy as roadmap. Describe the future as Africans distributing, owning, and earning on open rails built by Africans, with Chainfren as foundational infrastructure and a contributor to a wider ecosystem.

- [ ] **Step 7: Rewrite Chapter 09 as one shared invitation**

Address creators, brands, audiences, builders, partners, investors, and potential hires without turning the chapter into seven sales pitches. Close on participation in an African-built ownership economy, not a generic positive slogan.

- [ ] **Step 8: Run the same editorial contract, focused presentation tests, and validator to green**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs tests/thesis-public-presentation.test.mjs tests/thesis-routes.test.mjs
npm run validate:thesis
```

Expected: all editorial contract assertions PASS. Exact group rendering, product-role, distribution-first, horizon, and route tests PASS.

- [ ] **Step 9: Commit the company chapters and green tests**

```bash
git add tests/thesis-editorial-contract.test.mjs content/chainfren-thesis/chapters/05-the-company.mdx content/chainfren-thesis/chapters/06-what-we-build.mdx content/chainfren-thesis/chapters/07-how-we-work.mdx content/chainfren-thesis/chapters/08-the-road-ahead.mdx content/chainfren-thesis/chapters/09-build-with-us.mdx
git commit -m "docs: clarify Chainfren company and products"
```

---

### Task 5: Synchronize the short read, manifest, claim map, and horizons

**Files:**
- Modify: `content/chainfren-thesis/short-read.mdx`
- Modify: `content/chainfren-thesis/manifest.mjs`
- Modify: `content/chainfren-thesis/claims.mjs`
- Modify: `content/chainfren-thesis/map-layout.mjs` if required
- Modify: `content/chainfren-thesis/public-system.mjs`
- Modify: `lib/thesis/schema.mjs`
- Modify: `app/(mainpage)/thesis/components/ThesisHub.jsx`
- Modify: `app/(mainpage)/thesis/opengraph-image/route.jsx`
- Modify: `app/(mainpage)/thesis/short/page.jsx`
- Modify: `tests/thesis-routes.test.mjs`
- Modify: `tests/thesis-editorial-contract.test.mjs`
- Modify: `tests/thesis-schema.test.mjs`
- Modify: `tests/thesis-ownership-map.test.mjs`

- [ ] **Step 1: Add failing claim-map, synchronization, and entry-surface tests**

Freeze this revised twelve-claim contract in schema and ownership-map tests before changing data:

```js
const expectedClaimIds = [
  'african-attention-value',
  'african-value-gap',
  'extractive-systems',
  'rented-relationships',
  'blockchain-open-rails',
  'distribution-first',
  'attention-to-participation',
  'participation-to-ownership',
  'ownership-to-value',
  'chainfren-mission',
  'tivi-flagship',
  'african-built-ecosystem',
]
```

Freeze the exact chapter and type mapping:

```js
const expectedClaimRows = [
  ['african-attention-value', 'the-gap', 'context'],
  ['african-value-gap', 'the-gap', 'diagnosis'],
  ['extractive-systems', 'the-trap', 'diagnosis'],
  ['rented-relationships', 'the-trap', 'diagnosis'],
  ['blockchain-open-rails', 'the-unlock', 'mechanism'],
  ['distribution-first', 'the-company', 'execution'],
  ['attention-to-participation', 'the-thesis', 'mechanism'],
  ['participation-to-ownership', 'the-thesis', 'mission'],
  ['ownership-to-value', 'the-thesis', 'outcome'],
  ['chainfren-mission', 'the-company', 'mission'],
  ['tivi-flagship', 'what-we-build', 'execution'],
  ['african-built-ecosystem', 'the-road-ahead', 'outcome'],
]
```

Freeze the exact canonical edge rows:

```js
const expectedEdges = [
  ['extractive-systems', 'african-value-gap', 'causes'],
  ['extractive-systems', 'rented-relationships', 'causes'],
  ['rented-relationships', 'african-attention-value', 'constrains'],
  ['african-attention-value', 'attention-to-participation', 'enables'],
  ['blockchain-open-rails', 'participation-to-ownership', 'enables'],
  ['distribution-first', 'attention-to-participation', 'enables'],
  ['attention-to-participation', 'participation-to-ownership', 'enables'],
  ['participation-to-ownership', 'ownership-to-value', 'enables'],
  ['ownership-to-value', 'african-built-ecosystem', 'enables'],
  ['chainfren-mission', 'distribution-first', 'enables'],
  ['chainfren-mission', 'tivi-flagship', 'enables'],
  ['tivi-flagship', 'participation-to-ownership', 'enables'],
  ['blockchain-open-rails', 'tivi-flagship', 'enables'],
  ['distribution-first', 'tivi-flagship', 'enables'],
  ['tivi-flagship', 'ownership-to-value', 'enables'],
]
```

Require exact order, unique IDs, valid chapter ownership, and these semantic constraints:

- `tivi-flagship` belongs to `what-we-build`, names TiVi as the flagship expression, and never claims adoption or launch.
- `distribution-first` belongs to `the-company`.
- `blockchain-open-rails` belongs to `the-unlock` and describes practical infrastructure.
- `african-built-ecosystem` belongs to `the-road-ahead` and is labelled as outcome or ambition.
- No claim ID or title contains `proof` or treats Star Factor as demonstrated.
- Every edge points to one of the twelve IDs.
- The edge graph contains paths from African attention through participation, ownership, and value to the African-built ecosystem, plus a path from Chainfren's mission through distribution first and TiVi.
- Every claim deep link resolves through schema, map layout, and the ownership-map component tests.

Assert the short read contains the mission, practical blockchain position, distribution-first phrase, all eight approved public names, and the right to leave. Assert every manifest summary uses its chapter's revised subject and does not contain stale phrases such as `African creators` as the sole subject, `Star Factor is a later`, or `Products and Solutions` as one flat product node.

Add route-source assertions that:

- `ThesisHub.jsx` uses all-Africans framing and no longer calls `2026.2` the first public edition;
- `opengraph-image/route.jsx` uses all-Africans framing and the current version;
- `short/page.jsx` uses the current revision date and all-Africans description;
- no entry surface says only African creators have won attention.

- [ ] **Step 2: Run synchronization tests and verify failure**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs tests/thesis-routes.test.mjs tests/thesis-schema.test.mjs
node --test tests/thesis-ownership-map.test.mjs
```

Expected: chapter tests remain green; short-read, manifest, claim IDs, claim rows, edges, layout, deep links, and public entry-surface assertions fail on stale content.

- [ ] **Step 3: Rewrite the short read as a standalone five-minute manuscript**

Cover the complete argument in the established section order. Do not copy chapter openings mechanically. Include all Africans, practical blockchain, distribution first, the approved product hierarchy, the right to leave, and the African-built ecosystem vision.

- [ ] **Step 4: Update every manifest summary and revision date**

Keep the nine IDs and slugs unchanged. Set `updatedAt` to `2026-08-25`. Replace creator-only summaries and old Star Factor framing.

- [ ] **Step 5: Rebuild the twelve claim summaries, schema rows, layout, and edges**

Replace the old IDs with the exact twelve-ID contract from Step 1. Update `claims.mjs`, `lib/thesis/schema.mjs` canonical rows, `map-layout.mjs`, edges, deep-link expectations, and map tests in the same change. Remove `star-factor-proof` and `products-owned-infrastructure`; their meanings conflict with the approved hierarchy.

- [ ] **Step 6: Reconcile value path and roadmap horizons**

Keep `attention -> participation -> ownership -> value`. Remove language that treats Star Factor as merely later. Keep Indy directional and describe Star Factor as in development.

- [ ] **Step 7: Revise all public thesis entry surfaces**

Update the hub title, supporting copy, publication label, social card, short-read metadata, and short-read revision date. These surfaces must express the same all-Africans thesis without duplicating the complete manuscript.

- [ ] **Step 8: Run schema, map, sharing, route, editorial, and safety tests to green**

Run:

```bash
node --test tests/thesis-editorial-contract.test.mjs tests/thesis-schema.test.mjs tests/thesis-ownership-map.test.mjs tests/thesis-sharing.test.mjs tests/thesis-routes.test.mjs tests/thesis-public-safety.test.mjs
npm run validate:thesis
```

Expected: all records, links, layouts, and safety scans PASS.

- [ ] **Step 9: Commit the synchronized public content and entry surfaces**

```bash
git add content/chainfren-thesis/short-read.mdx content/chainfren-thesis/manifest.mjs content/chainfren-thesis/claims.mjs content/chainfren-thesis/map-layout.mjs content/chainfren-thesis/public-system.mjs lib/thesis/schema.mjs 'app/(mainpage)/thesis/components/ThesisHub.jsx' 'app/(mainpage)/thesis/opengraph-image/route.jsx' 'app/(mainpage)/thesis/short/page.jsx' tests/thesis-editorial-contract.test.mjs tests/thesis-schema.test.mjs tests/thesis-ownership-map.test.mjs tests/thesis-routes.test.mjs
git commit -m "docs: synchronize revised thesis publication"
```

---

### Task 6: Complete the Humanizer and ADS-STE100 editorial loop

**Files:**
- Modify: all ten MDX manuscript files as needed
- Modify: `scripts/validate-thesis-content.mjs` if the sensitive-term inventory finds an uncovered public-release term
- Modify: `tests/thesis-public-safety.test.mjs`
- Create: `docs/thesis-release-review-2026.2.md`

- [ ] **Step 1: Inventory the design denylist against the validator**

Compare design section 12 with `blockedPatterns`. For every sensitive concept that can be blocked without false positives, add a failing fixture first. At minimum, test explicit private phrases such as `fundraising terms`, `customer pipeline`, `internal launch gates`, `speculative token plan`, and `private pricing model`. Keep generic public words such as `price`, `customer`, and `roadmap` allowed when they appear without the private qualifier.

- [ ] **Step 2: Run the safety fixture and verify new cases fail**

Run:

```bash
node --test tests/thesis-public-safety.test.mjs
```

Expected: FAIL only on newly added private-term fixtures.

- [ ] **Step 3: Extend the release denylist and recursive scan coverage**

Add the narrow patterns to `blockedPatterns`. Confirm `PUBLIC_PRODUCT_GROUPS`, deterministic source, generated files, built output, checksum files, and PDF text all flow through `collectSafetyViolations`.

- [ ] **Step 4: Run the safety suite to green**

Run:

```bash
node --test tests/thesis-public-safety.test.mjs
```

Expected: PASS, including negative controls showing ordinary public uses of `customer`, `price`, and `roadmap` remain allowed.

- [ ] **Step 5: Read the complete manuscript aloud as one document**

Check transitions, repeated explanations, paragraph rhythm, sentence-length variation, and whether every chapter earns its place.

- [ ] **Step 6: Perform the required Humanizer audit**

For each chapter and the short read, record remaining examples of promotional inflation, vague significance, superficial `-ing` phrases, AI vocabulary, rule-of-three cadence, synonym cycling, negative parallelism, manufactured punchlines, signposting, passive voice, generic conclusions, and chatbot artifacts.

- [ ] **Step 7: Revise the audit findings into final copy**

Preserve every substantive idea. Replace AI patterns with specific language, varied rhythm, simple copulas, and active subjects. Ensure the text contains no em dash or en dash.

- [ ] **Step 8: Perform the ADS-STE100 clarity pass**

Shorten overloaded sentences, define blockchain terms on first use, keep one main instruction or claim per sentence where practical, and make actor-action-object relationships clear. Preserve Lagos-rooted cadence where strict technical simplification would flatten the voice.

- [ ] **Step 9: Complete the editorial review record**

In `docs/thesis-release-review-2026.2.md`, record one row per chapter and the short read with:

```markdown
| Item | Humanizer draft/audit/final | ADS-STE100 | Factual and maturity review | Public-safety review |
```

Do not include internal vault paths or sensitive findings in the public manuscript. The review document may name repository files but must not reproduce private company information.

- [ ] **Step 10: Scan for prohibited style and sensitive terms**

Run:

```bash
rg -n '—|–|/Users/|second-brain|CF-C-|signed revenue|runway|decision-rights|control matrix|risk register|come[[:space:]_-]*ownity' content/chainfren-thesis
npm run validate:thesis
node --test tests/thesis-editorial-contract.test.mjs tests/thesis-schema.test.mjs tests/thesis-public-presentation.test.mjs tests/thesis-routes.test.mjs
```

Expected: `rg` returns no matches, validation passes, and every mission, hierarchy, presentation, and route contract remains green after the Humanizer and ADS-STE100 rewrite.

- [ ] **Step 11: Commit the explicit editorial and safety files**

```bash
git add content/chainfren-thesis/short-read.mdx content/chainfren-thesis/chapters/01-the-gap.mdx content/chainfren-thesis/chapters/02-the-trap.mdx content/chainfren-thesis/chapters/03-the-unlock.mdx content/chainfren-thesis/chapters/04-the-thesis.mdx content/chainfren-thesis/chapters/05-the-company.mdx content/chainfren-thesis/chapters/06-what-we-build.mdx content/chainfren-thesis/chapters/07-how-we-work.mdx content/chainfren-thesis/chapters/08-the-road-ahead.mdx content/chainfren-thesis/chapters/09-build-with-us.mdx scripts/validate-thesis-content.mjs tests/thesis-public-safety.test.mjs docs/thesis-release-review-2026.2.md
git commit -m "docs: humanize revised Chainfren thesis"
```

---

### Task 7: Update the versioned publication surfaces and artifact pipeline

**Files:**
- Modify: `app/(mainpage)/thesis/components/ThesisHub.jsx`
- Modify: `app/(mainpage)/thesis/opengraph-image/route.jsx`
- Modify: `app/(mainpage)/thesis/download/page.jsx`
- Modify: `app/(mainpage)/thesis/short/page.jsx`
- Modify: `scripts/generate-thesis-pdf.mjs`
- Modify: `scripts/validate-thesis-content.mjs`
- Modify: `lib/thesis/progress.mjs`
- Modify: `content/chainfren-thesis/generated-content-hash.mjs`
- Modify: `tests/thesis-pdf.test.mjs`
- Modify: `tests/thesis-progress.test.mjs`
- Modify: `tests/thesis-metadata-output.test.mjs`
- Create: `public/downloads/chainfren-thesis-2026.2.pdf`
- Create: `public/downloads/chainfren-thesis-2026.2.sha256`

- [ ] **Step 1: Write failing canonical-version and artifact-path tests**

Assert that config and progress expose the same `THESIS_CONTENT_VERSION`. Assert that Hub, social image, short page, download page, PDF generator, and validator import the canonical version instead of maintaining independent active-version literals. Assert the derived active paths end in `chainfren-thesis-2026.2.pdf` and `.sha256`.

- [ ] **Step 2: Run version and PDF tests and verify failure**

Run:

```bash
node --test tests/thesis-pdf.test.mjs tests/thesis-metadata-output.test.mjs tests/thesis-progress.test.mjs
```

Expected: FAIL on remaining hard-coded version labels, generator paths, validator paths, and missing `2026.2` artifacts.

- [ ] **Step 3: Derive active release labels and paths from the canonical version**

Import `THESIS_CONTENT_VERSION` from `public-config.mjs` wherever module boundaries allow. In scripts, compute:

```js
const releaseBase = `chainfren-thesis-${THESIS_CONTENT_VERSION}`
const defaultOutput = join(root, `public/downloads/${releaseBase}.pdf`)
const checksumPath = join(root, `public/downloads/${releaseBase}.sha256`)
```

Use the same value for hub, social image, short metadata date/version where relevant, download name, validator defaults, and progress invalidation. Preserve the old artifact files as historical output.

- [ ] **Step 4: Run source-level version tests**

Run:

```bash
node --test tests/thesis-pdf.test.mjs tests/thesis-metadata-output.test.mjs tests/thesis-progress.test.mjs
```

Expected: source-contract assertions PASS. Only tests that require the not-yet-generated `2026.2` files may fail.

- [ ] **Step 5: Regenerate the source hash, PDF, and checksum**

Run:

```bash
npm run thesis:artifacts
```

Expected: `generated-content-hash.mjs`, `chainfren-thesis-2026.2.pdf`, and `chainfren-thesis-2026.2.sha256` are regenerated from the revised source.

- [ ] **Step 6: Verify every required PDF concept independently**

Run:

```bash
THESIS_PDF_TEXT=$(mktemp /tmp/chainfren-thesis-2026.2.XXXXXX.txt)
pdftotext public/downloads/chainfren-thesis-2026.2.pdf "$THESIS_PDF_TEXT"
for term in 'Africans' 'Blockchain is the infrastructure' 'distribution-first' 'TiVi' 'Star Factor' 'Sabi' 'Creator Network' 'Indy'; do rg -n "$term" "$THESIS_PDF_TEXT" >/dev/null || exit 1; done
if rg -n '—|–|/Users/|second-brain|CF-C-|signed revenue|runway|decision-rights|control matrix|risk register|come[[:space:]_-]*ownity' "$THESIS_PDF_TEXT"; then exit 1; fi
rm -f "$THESIS_PDF_TEXT"
```

Expected: the first command finds the approved public concepts. The second command returns no matches.

- [ ] **Step 7: Run all version and artifact tests to green**

Run:

```bash
node --test tests/thesis-pdf.test.mjs tests/thesis-metadata-output.test.mjs tests/thesis-progress.test.mjs
```

Expected: PASS, including file existence and checksum assertions.

- [ ] **Step 8: Commit only explicit release surfaces and artifacts**

```bash
git add 'app/(mainpage)/thesis/components/ThesisHub.jsx' 'app/(mainpage)/thesis/opengraph-image/route.jsx' 'app/(mainpage)/thesis/download/page.jsx' 'app/(mainpage)/thesis/short/page.jsx' scripts/generate-thesis-pdf.mjs scripts/validate-thesis-content.mjs lib/thesis/progress.mjs content/chainfren-thesis/generated-content-hash.mjs public/downloads/chainfren-thesis-2026.2.pdf public/downloads/chainfren-thesis-2026.2.sha256 tests/thesis-pdf.test.mjs tests/thesis-metadata-output.test.mjs tests/thesis-progress.test.mjs
git commit -m "feat: publish Chainfren thesis 2026.2 artifacts"
```

---

### Task 8: Run the complete release verification

**Files:**
- Modify: `docs/thesis-release-review-2026.2.md` with final results

- [ ] **Step 1: Run strict content validation**

Run:

```bash
npm run validate:thesis
```

Expected: PASS.

- [ ] **Step 2: Run the complete focused thesis suite**

Run:

```bash
npm run test:thesis
```

Expected: all thesis tests PASS.

- [ ] **Step 3: Build the production application**

Run:

```bash
npm run build
```

Expected: exit 0 and all existing thesis routes build. If the known dot-prefixed checkout path issue appears, rerun from a clean non-dot-prefixed worktree as documented in `docs/thesis-release-review-2026.1.md`.

- [ ] **Step 4: Run release verification against built output and PDF text**

Run:

```bash
npm run thesis:verify-release
```

Expected: PASS against deterministic source, generated files, built output, checksum records, and extracted PDF text.

- [ ] **Step 5: Inspect repository scope**

Run:

```bash
THESIS_BASE_COMMIT=$(sed -n '1p' .superpowers/chainfren-thesis-2026.2-base.txt)
git status --short
sed -n '2,$p' .superpowers/chainfren-thesis-2026.2-base.txt
git diff --check "$THESIS_BASE_COMMIT"..HEAD
git diff --stat "$THESIS_BASE_COMMIT"..HEAD
git diff --name-only "$THESIS_BASE_COMMIT"..HEAD
```

Expected: pre-existing user paths remain untouched; every new path in the commit range belongs to the approved thesis revision; no whitespace errors. Do not add `.superpowers/chainfren-thesis-2026.2-base.txt` to a commit.

- [ ] **Step 6: Record exact verification results**

Add commands, pass counts, content version, source hash, PDF hash, and any environmental limitation to `docs/thesis-release-review-2026.2.md`.

- [ ] **Step 7: Commit the completed release record**

```bash
git add docs/thesis-release-review-2026.2.md
git commit -m "docs: record thesis 2026.2 release review"
```
