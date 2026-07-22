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

- In this desktop environment, `npm run build` can stall while a Next.js production worker terminates. Do not record a passing production-build result until that command completes normally on the release host.
- `thesis:verify-release` fails explicitly if `.next/server/app/thesis` is absent. Its error records the required `npm run build` command. It still scans the deterministic source files and generated PDF artifact before it reports that missing-build condition.
- The existing local thesis build output predates the final print-copy cleanup, so the release gate correctly rejects its stale em dash. Rebuild before release, then rerun the gate.
- The full thesis test command also includes a production metadata endpoint test that cannot reserve a local loopback port in this sandbox (`EPERM`). The focused release tests completed; rerun the full command on the release host.

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
