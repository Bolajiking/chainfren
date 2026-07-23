# Thesis release review 2026.1

Date checked: 2026-07-21

| Public item | Repository source and current route or nav source | Live public URL | Verification date | Resulting public label | Public-safe reason |
| --- | --- | --- | --- | --- | --- |
| Media Launchpad | `app/config/stack.js`, product route | https://www.chainfren.com/products/media-launchpad | 2026-07-21 | Early access | Public product stage and route only. |
| Creator Growth OS | `app/config/stack.js`, product route | https://www.chainfren.com/products/creator-growth-os | 2026-07-21 | Live core | Public product stage and route only. |
| Community Engine | `app/config/stack.js`, product route | https://www.chainfren.com/products/community-engine | 2026-07-21 | Live core | Public product stage and route only. |
| AI Agent Studio | `app/config/stack.js`, product route | https://www.chainfren.com/products/ai-agent-studio | 2026-07-21 | Early access | Public product stage and route only. |
| Creator Network | `app/config/stack.js`, creator network route | https://www.chainfren.com/creator-network | 2026-07-21 | Live | Public maturity label and route only. |
| Sabi | `app/config/stack.js`, Sabi route | https://www.chainfren.com/sabi | 2026-07-21 | Building | Public maturity label and route only. |
| Star Factor | `app/config/stack.js`, `app/components/SiteHeader.jsx` homepage nav | https://www.chainfren.com | 2026-07-21 | Later | Public horizon label and homepage navigation context only. |
| Indy | `app/config/stack.js`, homepage public-horizon context | No current public route | 2026-07-21 | Directional | Public horizon label only; no product page is asserted. |

This review records only public labels and repository sources checked. It excludes operational, financial, customer, and source-material details.

## Public release checklist

- [x] The release contains all nine manifest chapters and the short read.
- [x] Every public claim links to a published chapter and every public CTA resolves to a local route or approved HTTPS destination.
- [x] Citations use HTTPS or an approved Chainfren first-party URL.
- [x] Public copy has passed the blocked-text scan. It contains no excluded venture reference, local path, internal identifier, sensitive operating term, em dash, or en dash.
- [x] The public edition contains no private or sensitive company information. It does not include operating frameworks, financial information, customer information, internal plans, or source-vault material.
- [x] Version `2026.1`, source checksum, PDF checksum, canonical metadata, and social preview all use the release contract.

## Artifact validation workflow

Run these commands from the repository root before publication:

```sh
npm run thesis:artifacts
npm run thesis:verify-release
```

Then confirm that `public/downloads/chainfren-thesis-2026.1.pdf` opens as the public A4 edition and that `public/downloads/chainfren-thesis-2026.1.sha256` contains two distinct, labeled SHA-256 values. The `Source SHA-256` value must match `content/chainfren-thesis/generated-content-hash.mjs`. The `PDF SHA-256` value must match the PDF file. Do not use a local filesystem path in any public output.

## Release-gate evidence

Manual release verification commands:

```sh
npm run thesis:artifacts
npm run build
npm run thesis:verify-release
pdftotext public/downloads/chainfren-thesis-2026.1.pdf - | rg -n '—|–|/Users/|second-brain|CF-C-|signed revenue|runway|decision-rights|control matrix|risk register|come[[:space:]_-]*ownity'
```

Completed checks on 2026-07-22:

- `npm run validate:thesis` passed with all nine chapter files.
- The focused release tests passed, including direct citation validation, manifest-to-registry coverage, deterministic public-source scanning, PDF extracted-text scanning, and checksum verification.
- The public PDF and its two labeled SHA-256 values are present under `public/downloads/`.
- The release validator scans deterministic public thesis routes and components, including the social-image route, public data, the release checksum, the extracted PDF text, and built thesis output when it is available.

Known environment limitation:

- `thesis:verify-release` fails explicitly if `.next/server/app/thesis` is absent. Its error records the required `npm run build` command. It still scans the deterministic source files and generated PDF artifact before it reports that missing-build condition.

## Build environment rule

Node's `fileURLToPath` skips `..` normalization when a path segment starts with a dot. The compiled `@vercel/og` node entry resolves its bundled font with `fileURLToPath(`${import.meta.url}/../noto-sans-v27-latin-regular.ttf`)`, so from a checkout under a dot-prefixed directory that path stays literal and the read fails with `ENOTDIR`. The `/thesis/opengraph-image` route then fails to prerender and takes the whole production build down with it.

Run `npm run build`, `npm run thesis:artifacts`, and `npm run thesis:verify-release` from a checkout whose path contains no dot-prefixed segment. This verification pass ran from `/private/tmp/chainfren-thesis`. The condition is environmental. No application code change is required.

## Verification pass 2026-07-23

### Automated results

| Command | Result |
| --- | --- |
| `npm run build` | pass, exit 0, all 47 routes including `/thesis/opengraph-image` |
| `npm run test:thesis` | 80 tests, 80 pass |
| `node --test tests/*.test.mjs` | 86 tests, 86 pass |
| `npm run validate:thesis` | pass |
| `npm run thesis:verify-release` | pass |
| `npm run thesis:artifacts` | pass, PDF and both checksums regenerated |

### Responsive and functional checks

Checked at 360, 390, 768, 1280, and 1440 on the hub, short read, reader, map, and download routes.

- No horizontal page overflow at any width.
- No clipped or covered text.
- Every visible interactive target measures at least 44 by 44 CSS pixels.
- One `h1` per route, no skipped heading levels, named landmarks on every route.
- All nine chapter routes return 200. An unknown chapter slug returns the normal 404 surface.
- The social image route returns `image/png` with valid PNG bytes from a running production server.

### Accessibility

- The reader skip link moves focus to chapter content.
- The mobile contents panel is `aria-modal`, keeps Tab inside the panel, closes on Escape, and restores focus to the Contents button with `aria-expanded="false"`.
- The share control falls back to a labelled read-only URL field when the clipboard is unavailable.
- Contrast check across all five routes at 390 width: no result below WCAG AA for its text size.
- Reduced-motion rules cover every animated thesis surface, including the download action.
- The map keeps a server-rendered nested outline that works without JavaScript.
- Server HTML carries the full chapter prose, the short read, and the claim outline with scripts disabled.

### Claim deep links and resume

`/thesis/map?claim=<id>` selects the desktop node, opens the matching outline group, scrolls it into view, and focuses the claim. An unknown id falls back to the default claim with no error. `chainfren-thesis-progress-v1` stores `{ chapterSlug, updatedAt, contentVersion }` only, and the hub shows `Resume: <chapter title>` when the stored version matches.

### Defects found and fixed in this pass

| Defect | Fix |
| --- | --- |
| The print route inherited global site social metadata carrying an em dash, which failed the release scan | Thesis-owned `openGraph` and `twitter` metadata on `/thesis/print` |
| The download route rendered as unstyled browser defaults, with the checksum running past the mobile viewport | Route styled from the thesis brand tokens, checksum wrapped |
| Outline and map detail links were 17 pixels tall | 44 pixel inline-flex targets |
| Claim titles rendered smaller than their own body copy | Claim title links keep the `h3` scale |
| Reader, short read, and print prose ran together with no paragraph margin | Paragraph rhythm restored on all three surfaces |
| The outline ignored `?claim=` deep links | Client island opens and focuses the requested claim |
| Pre-landing review caught the new page-level paragraph rule outranking the download eyebrow class, which rendered the release label at body size | Eyebrow rule scoped to the page and covered by the download style test |

### Performance

Three cold Lighthouse 12 runs per route, mobile form factor, simulated slow 4G (1,638 Kbps, 150 ms RTT, 4x CPU). Medians below.

Measurement A, the publication as served today, including the globally inherited font payload:

| Route | LCP | CLS | TBT | Transfer | Fonts |
| --- | --- | --- | --- | --- | --- |
| `/thesis` | 5.62s | 0.000 | 39ms | 920KB | 723KB |
| `/thesis/short` | 5.58s | 0.000 | 0ms | 903KB | 723KB |
| `/thesis/read/the-gap` | 6.18s | 0.000 | 0ms | 913KB | 723KB |
| `/thesis/map` | 6.19s | 0.000 | 0ms | 918KB | 723KB |
| `/thesis/download` | 5.58s | 0.000 | 0ms | 900KB | 723KB |

Measurement B, the same runs with the inherited font payload blocked, which isolates publication-route cost:

| Route | LCP | CLS | TBT | Transfer |
| --- | --- | --- | --- | --- |
| `/thesis` | 2.47s | 0.000 | 0ms | 197KB |
| `/thesis/short` | 2.23s | 0.000 | 0ms | 180KB |
| `/thesis/read/the-gap` | 2.27s | 0.000 | 0ms | 189KB |
| `/thesis/map` | 2.90s | 0.000 | 0ms | 195KB |
| `/thesis/download` | 2.14s | 0.000 | 0ms | 177KB |

Gate status:

| Gate | Result |
| --- | --- |
| Median CLS below 0.1 | pass, 0.000 on every route |
| Median TBT below 200ms | pass, 0 to 39ms |
| Route-specific JavaScript below 70KB | pass, 165 bytes to 3.94KB per route from the build report |
| Median LCP below 2.5s | publication cost passes on four routes and misses on `/thesis/map` by 0.40s; the shipped page misses on every route because of inherited cost |
| Critical first-load transfer below 500KB | publication cost passes at 177KB to 197KB; the shipped page misses at about 900KB because of inherited cost |

Inherited cost, owned by the global site shell and shared with every Chainfren route:

- `public/fonts/InterVariable.woff2` at 352KB and `public/fonts/InterVariable-Italic.woff2` at 388KB, both preloaded in `app/layout.jsx` and declared `font-display: block` in `app/globals.css`. Blocking display is what holds first paint: the LCP element on `/thesis` waits 6.0s in render delay while 723KB of fonts arrive over slow 4G.
- About 78KB of shared Next.js and site-shell JavaScript that every route on the site already carries.

The publication adds 165 bytes to 3.94KB of route JavaScript, about 8KB of HTML per route, and no new font family, images, or third-party scripts. Per the design specification, brand and accessibility behavior was not removed to chase these budgets, and the inherited cost is recorded here rather than fixed inside this feature. The site-level follow-up that would clear both gates is to serve the Inter faces with `font-display: swap`, preload only the upright face, and subset the files. That change affects every page on chainfren.com and needs its own authorization.

## Mission chapters

| Chapter | Editorial review | Factual review | Public-safety review | Reviewer | Date |
| --- | --- | --- | --- | --- | --- |
| 02: The Trap | Humanizer and ADS-STE100 pass | Plain-language platform-dependency model; no figures or outside claims | Pass | Chainfren editorial | 2026-07-21 |
| 03: The Unlock | Humanizer and ADS-STE100 pass | Mechanism-only description of open rails; no product or speculative claims | Pass | Chainfren editorial | 2026-07-21 |
| 04: The Thesis | Humanizer and ADS-STE100 pass | Approved mission framing; default-infrastructure position is labelled as ambition | Pass | Chainfren editorial | 2026-07-21 |
| 06: What We Build | Humanizer and ADS-STE100 pass | Uses registered products, stages, and public system order | Pass | Chainfren editorial | 2026-07-22 |
| 07: How We Work | Humanizer and ADS-STE100 pass | Public practice statements only; no operational detail | Pass | Chainfren editorial | 2026-07-22 |
| 08: The Road Ahead | Humanizer and ADS-STE100 pass | Public horizons and directional initiative framing only | Pass | Chainfren editorial | 2026-07-22 |
| 09: Build With Us | Humanizer and ADS-STE100 pass | Uses the six approved CTA labels and routes without parameters | Pass | Chainfren editorial | 2026-07-22 |
| Short read | Humanizer and ADS-STE100 pass | Dedicated five-minute synthesis of approved public chapter framing; Star Factor remains a later milestone | Pass | Chainfren editorial | 2026-07-22 |

## Acceptance criteria

| Criterion from the approved design | Evidence |
| --- | --- |
| `/thesis` and all approved child routes build | `npm run build` exit 0; hub, short, reader, map, download, print, and social image all render from `next start` |
| The four approved exploration modes work | Hub links to short read, full reader, map, and download; each verified in the browser |
| The full reader contains nine chapters | Nine chapter routes return 200; `tests/thesis-routes.test.mjs` covers the registry |
| Mission and company entrances reach the same canonical content | Hub entrances point to `/thesis/read/the-gap` and `/thesis/read/the-company` with no lens state |
| Comeownity is absent | Repository scan of content, routes, library, and artifacts returns no match; release validator scans built output |
| Star Factor reads as a later milestone and proof project | Chapter 08 and the short read frame it as the later proof milestone |
| Sabi, Creator Network, Star Factor, and Products form a distribution-first story | Chapters 05 to 08 and the public system module |
| No private company information in public content | Release validator blocked-pattern scan over routes, data, built output, and PDF text |
| Maturity labels match approved public reality | Public label table at the top of this review, sourced from `app/config/stack.js` |
| The publication matches the Chainfren design system | `tests/thesis-brand-fidelity.test.mjs` passes; visual review of hub, reader, map, download, and PDF |
| Canonical brand assets are not redrawn | Brand contract checksums verified in test; components import `ChainfrenWordmark`, `ChainfrenIcon`, and `Fren` |
| Mobile and desktop pass responsive, accessibility, and visual checks | Responsive and accessibility sections above |
| Performance budgets pass or inherited cost is isolated | Performance section above, measurements A and B |
| Core content readable without JavaScript | Server HTML carries chapter prose, short read, and claim outline |
| The map has a complete mobile and no-JavaScript fallback | Server-rendered `OwnershipTree` outline with grouped `details` |
| The map implements the twelve-node schema and deep links | Twelve nodes render; `?claim=<id>` selects, expands, and focuses; invalid ids fall back |
| The PDF comes from the same approved content and passes visual review | `npm run thesis:artifacts` regenerated the PDF from `/thesis/print`; pages inspected for rhythm, page breaks, numbering, and grayscale legibility |
| Website and PDF share one content version and hash | `Source SHA-256` matches `generated-content-hash.mjs`; version `2026.1` on both surfaces |
| Markdown and HTML are not first-release download modes | The download route exposes one link, the PDF |
| Resume stores chapter-level progress only | `chainfren-thesis-progress-v1` record verified in the browser |
| Pre-release lab gates measured, field percentiles not treated as lab gates | Lighthouse lab medians recorded; INP left as a post-launch field target |
| Humanizer, ADS-STE100, factual, maturity, and public-safety reviews complete | Mission chapter table above; rendered copy rescanned for AI-tell vocabulary and blocked punctuation with no hits |

## Site discovery

The publication is unannounced for now. `THESIS_IN_PUBLIC_NAV` in `app/config/stack.js` is `false`, so the Company footer column renders without the thesis entry, and no page on the site links to `/thesis`. Verified against the built site: the homepage, Sabi, Media Launchpad, Creator Network, Contact, and Blog emit zero `/thesis` hrefs, while all five publication routes return 200 at their direct URLs. `THESIS_FOOTER_LINK` stays wired next to the flag, so announcing the publication is a one-line change.

Routes remain indexable. Nothing links to them and the repository publishes no sitemap, so ordinary crawl discovery is unlikely, but a shared direct URL can still be indexed. Add `robots: { index: false }` to the thesis layout if the publication needs to stay out of search until launch.

## Pre-landing review

The branch diff was reviewed against the repository review checklist before landing. No SQL, shell, concurrency, or trust-boundary surface exists in this change set: the additions are static route metadata, CSS, one client island that reads a query parameter and calls `getElementById`, and tests. The query parameter is used only as a DOM id lookup, never as markup or a URL, so an unknown value resolves to no element and the outline keeps its default state. One defect was found by the review and fixed: the download eyebrow specificity issue recorded above.

## Handoff

- Branch: `codex/chainfren-thesis`.
- Content version `2026.1`, source hash `275c7d315874d33bdaa10c355418242d43388ea1ed34ab1ed9930daf3cf1564b`.
- Public artifact: `public/downloads/chainfren-thesis-2026.1.pdf` with `public/downloads/chainfren-thesis-2026.1.sha256`.
- Deployment is not part of this work and remains separately authorized.
