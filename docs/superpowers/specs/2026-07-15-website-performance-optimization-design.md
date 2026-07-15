# Website Performance Optimization Design

**Date:** 2026-07-15  
**Status:** Approved design, pending specification review  
**Scope:** Local implementation and verification on the current Chainfren branch. Production deployment is excluded unless separately authorized.

## Goal

Make the Chainfren website load and respond considerably faster on mobile and desktop while preserving its functionality, visual identity, accessibility, SEO, security, and reliability. The work must produce reproducible before-and-after evidence rather than relying on subjective impressions.

## Baseline and problem statement

The untouched production build at commit `937789f` was tested in Chromium with two cold browser contexts per route. The mobile profile used a 390x844 viewport, 1.6 Mbps download throughput, 150 ms latency, and 4x CPU throttling. The desktop profile used a 1440x900 viewport, 10 Mbps download throughput, 40 ms latency, and no CPU throttling.

The source baseline is `.gstack/benchmark-reports/baselines/baseline.json`. Before application edits begin, refresh it to three cold browser contexts per route. Use the median for comparisons and record the minimum and maximum for each timing metric. If the run-to-run spread for a metric exceeds 10% of its median, collect five runs and use the median of five.

### Mobile baseline

| Route | FCP | LCP | TBT | CLS | Full load | Requests | Transfer | JavaScript |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 918 ms | 4,270 ms | 101 ms | 0.000 | 7,339 ms | 37 | 1.39 MB | 204 KB |
| `/solutions` | 924 ms | 3,776 ms | 42 ms | 0.000 | 6,016 ms | 30 | 1.13 MB | 206 KB |
| `/blog` | 898 ms | 5,928 ms | 11 ms | 0.003 | 6,057 ms | 34 | 1.13 MB | 205 KB |

### Desktop baseline

| Route | FCP | LCP | TBT | CLS | Full load | Requests | Transfer | JavaScript |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 444 ms | 812 ms | 0 ms | 0.000 | 1,460 ms | 46 | 1.44 MB | 240 KB |
| `/solutions` | 282 ms | 1,052 ms | 0 ms | 0.011 | 1,057 ms | 39 | 1.18 MB | 243 KB |
| `/blog` | 274 ms | 1,050 ms | 0 ms | 0.003 | 1,059 ms | 42 | 1.18 MB | 242 KB |

The production build passed. It generated 144,901 bytes of static homepage HTML, an 82,981-byte global stylesheet, a 62,339-byte homepage route chunk, and 77.7 KB of shared first-load JavaScript as reported by Next.js.

## Bottlenecks

### 1. Fonts dominate the critical path

The normal and italic Inter variable fonts total 741,376 bytes on disk. Both are globally preloaded and use `font-display: block`. The browser transfers about 756,802 bytes for the global stylesheet and font resources on every measured route, accounting for 55–67% of the mobile payload. Text remains blocked while those files load, directly delaying FCP and LCP.

### 2. Static homepage content is inside one large client boundary

`app/components/MainGrid.jsx` is a Client Component that contains static copy, layout, and decorative markup alongside the interactive playbook, newsletter, weather, carousels, and return-to-top action. This requires React to ship and hydrate code for content that does not need client-side behavior.

### 3. Responsive duplicate trees execute unnecessary work

The homepage renders separate mobile and desktop trees and hides one with CSS. Both trees mount duplicate weather widgets and other interactive cards. A full responsive-tree rewrite would risk visual regressions, but duplicate API requests, timers, and other side effects can be removed without changing layout.

### 4. Hidden navigation initiates speculative requests

Links inside closed desktop mega-menus and the closed mobile overlay use automatic Next.js prefetching. The baseline records 7–11 fetch requests on the homepage before the visitor expresses navigation intent.

### 5. Global and deferred UI ship too early

The root layout wraps all routes in a legacy global state provider even though only the learning and legacy blog surfaces consume it. `NotifyModal` also ships as part of the navigation bundle even when it is never opened. The Blog layout is a client boundary solely to read legacy dark-mode state and currently logs during rendering.

### 6. Non-critical images are not consistently optimized

Several homepage images use raw `<img>` elements without lazy decoding or the Next.js image pipeline. Three image requests account for about 275 KB on the homepage baseline. Images outside the initial viewport should not compete with critical text and navigation.

## Chosen approach

Use a targeted optimization pass. It addresses the largest measured costs while avoiding a full homepage or navigation rewrite.

Two alternatives were rejected:

- A font-only pass would be low-risk but would leave unnecessary JavaScript, hidden-layout side effects, and speculative requests unresolved.
- A complete responsive homepage rewrite into one DOM tree could reduce HTML and hydration further, but preserving the current masonry-like desktop layout and mobile ordering would require a broad architectural change with disproportionate visual-regression risk.

## Design

### A. Critical font path

Create exactly two versioned WOFF2 subset files from the existing Inter variable fonts: one normal file and one italic file. Each file combines the Basic Latin, Latin-1 Supplement, Latin Extended, General Punctuation, currency, arrow, and site-used symbol ranges needed by the current English-language site. The subsets must preserve the current variable weight range and glyph shaping. Retain the existing full source files in the repository for future non-Latin expansion, but serve the two smaller versioned subsets to current pages.

Update the four duplicate `@font-face` declarations into one normal and one italic declaration. Use `font-display: swap` so text can paint immediately, with the existing system-font fallback chain. Preload only files required by above-the-fold content; because the homepage hero uses both normal and italic Inter, both optimized subsets may remain preloaded if their combined measured cost is lower than the current normal file alone.

Give versioned font assets an immutable long-lived cache header. Do not apply immutable caching to unversioned public assets.

Acceptance requirements:

- The served font transfer must fall materially below the 741 KB baseline.
- The final rendered typeface, variable weights, italic treatment, wordmark, and responsive line breaks must match the visual baseline after fonts load.
- CLS must remain below 0.1 on all measured routes and must not regress materially from baseline.
- FCP and LCP must improve on the throttled mobile profile.

### B. Server/client boundary reduction on the homepage

Convert `MainGrid` into a Server Component. Extract only the stateful units into focused Client Components:

- playbook carousel;
- newsletter form;
- return-to-top control;
- existing interactive cards, which remain separate Client Components.

Static hero, mission, social, catalogue, and decorative sections remain server-rendered. Their markup, copy, Tailwind classes, responsive dimensions, link destinations, and ordering must remain unchanged.

This refactor must not attempt to merge the mobile and desktop layout trees. That broader change is explicitly deferred. The current layout geometry is the authority.

Acceptance requirements:

- The homepage route-specific initial JavaScript must be smaller than the 62,339-byte on-disk baseline and browser JavaScript transfer must decrease.
- All interactive units must retain their current behavior and accessible names.
- Server-rendered content, headings, links, and SEO-visible copy must remain present without client hydration.

### C. Weather request and timer control

Keep the visible weather card and its fallback data. Replace duplicate immediate requests with the two-layer cache below so responsive duplicates cannot request the same data concurrently or repeatedly within the validity window.

Use `IntersectionObserver` to start the request only when the visible weather card approaches the viewport. A CSS-hidden duplicate will not intersect and must not start network or timer work. Show the existing fallback content immediately instead of replacing the card with a loading spinner. Start the live clock only for the intersecting card, and stop it when the card leaves the viewport or the document becomes hidden.

Use two cache layers with an explicit boundary: a module-scope promise/result cache deduplicates concurrent mounts during the current document lifecycle, and `sessionStorage` persists a successful response across full reloads in the same browser tab. Cache entries expire after 10 minutes. Failed requests are not cached. If storage is unavailable, the module cache remains the fallback and functionality must continue.

Acceptance requirements:

- No weather request may occur during the initial homepage load before a weather card approaches the viewport.
- At most one `/api/weather` request may occur per browser-tab session during each 10-minute validity window.
- The visible card must still update with live weather and time once activated.
- Hidden responsive instances must not run one-second timers.

### D. Intent-driven navigation prefetching

Set `prefetch={false}` on links that live inside closed mega-menu, accordion, utility, and overlay content. Preserve prefetching for visible high-value CTAs where it is already useful.

When a desktop trigger is hovered or focused, prefetch the destinations for that menu. On mobile, prefetch the destinations for an accordion when the visitor opens it. Deduplicate route prefetches within the current session.

Acceptance requirements:

- Closed navigation must not trigger route-data fetches during initial load.
- Opening or focusing a menu must preserve fast subsequent navigation by initiating route prefetch on intent.
- All links remain real crawlable anchors with unchanged destinations and keyboard behavior.

### E. Deferred modal and scoped legacy state

Move the global `openNotify` event helper into a dependency-free module. `SiteHeader`, which is already always loaded, remains the owner of the custom-event listener and `notifyOpen`/`notifySource` state. On the first event it records the requested open state immediately; that state conditionally renders a dynamically imported `NotifyModal`, so the first activation is retained while the modal chunk loads. Preserve the existing custom-event API and focus/keyboard behavior.

Move the legacy context provider out of the root layout and into only the route-group layouts that still consume it. Remove render-time console logging from the Blog layout. Do not rewrite legacy state behavior.

Acceptance requirements:

- Modern public routes that do not consume legacy context must not hydrate the provider.
- The notification modal must not be part of initial page JavaScript, but must open on first activation without functional or accessibility regressions.
- Blog and learning routes must retain their current theme/context behavior.

### F. Image delivery

Move non-critical fixed-size homepage images that are safe for the Next.js optimizer to `next/image`, with explicit dimensions, responsive sizing, lazy loading, and async decoding. Use an image quality setting of at least 90 for the current artwork. Do not convert decorative CSS backgrounds when doing so would alter masks, crops, or layout behavior.

Acceptance requirements:

- Below-the-fold images must not compete with the initial text render.
- Image transfer must decrease, use quality 90 or higher, and show no crop, dimension, color, or visible compression regression in side-by-side checks at 1x and 2x device pixel ratios.
- Explicit dimensions or reserved containers must prevent layout shift.

## Data flow and failure handling

- Fonts and static images are served by Next.js/Vercel with versioned caching where safe.
- Contentful data remains build-time/static on the measured Blog route. No data-fetching rewrite is required.
- Weather remains best-effort. The existing Lagos fallback stays visible if geolocation or weather providers fail, and deferred loading must not introduce an error surface.
- Contact, newsletter, authentication, and analytics behavior remain unchanged except for moving client code behind existing interaction boundaries.
- Prefetch failures are non-fatal and must never block navigation.

## Testing and measurement

### Automated checks after each meaningful group

1. Run focused static or unit tests for the changed behavior.
2. Run `npm run build` and confirm every route still compiles.
3. Start the production server and rerun the same Chromium performance profile against `/`, `/solutions`, and `/blog` using three cold contexts per route.
4. Use the median, record each run and its min/max range, and collect five runs when spread exceeds 10% of the median.
5. Compare FCP, LCP, TBT, CLS, full-load time, request count, total transfer, and JavaScript transfer against `.gstack/benchmark-reports/baselines/baseline.json`.

### Regression checks

- Re-run `.gstack/run-regression-baseline.py` against the optimized build.
- Verify `/`, `/solutions`, `/blog`, and `/contact` return 200 with correct titles and headings and no browser errors.
- Verify desktop mega-menu open/navigation and mobile open/Escape/focus behavior.
- Verify newsletter and notification forms remain enabled and submit to the same endpoint.
- Verify reduced-motion behavior, keyboard focus, responsive layouts, and metadata.
- Capture new 1440x900 and 390x844 screenshots and compare them with `.gstack/visual-baseline/`.

### Completion thresholds

The implementation is complete only if every hard gate below passes:

- Median mobile LCP and FCP improve on all three measured routes. A change within 5% of baseline is treated as measurement noise, not as a proven improvement, so each route must improve by more than 5% or at least 100 ms.
- Homepage browser JavaScript transfer and route-specific JavaScript both decrease by more than 5%.
- Homepage initial request count and total transfer both decrease. Request counts are exact; total-transfer changes within 5% are treated as noise.
- No measured route regresses by more than 5% in LCP, FCP, total transfer, or JavaScript transfer. For TBT baselines of 50 ms or more, the same 5% rule applies. For TBT baselines below 50 ms, an absolute increase of up to 50 ms is the measurement tolerance. Final TBT must also remain below Chrome's fast thresholds of 200 ms on mobile and 150 ms on desktop.
- CLS stays below 0.1 on every measured route.
- No critical visual, functional, accessibility, SEO, security, or reliability regression is found.
- The final report documents exact before/after figures, bottlenecks, changes, limitations, and deferred recommendations.

The stronger target for each optimized metric is at least a 10% median improvement or an absolute improvement of at least 200 ms for timing metrics, and at least a 10% reduction for byte metrics. Missing a stronger target does not waive any hard gate and does not by itself block completion; the report must identify the measured result and explain why further optimization was unsafe or impractical. Failing a hard gate leaves the implementation incomplete.

## Out of scope

- Production deployment or DNS changes without separate authorization.
- Upgrading Next.js or React during this optimization pass.
- Replacing the design system, navigation architecture, Contentful, or contact integrations.
- Merging the separate mobile and desktop homepage layout trees.
- Removing animation, branding, SEO content, or user-facing functionality to improve scores.
- Broad dependency upgrades unrelated to a measured bottleneck.

## Deliverables

- Optimized application code and assets.
- Focused tests and reusable local performance/regression scripts.
- Updated before-and-after benchmark artifacts.
- A final report with the original baseline, discovered bottlenecks, implemented changes, measured results, remaining limitations, and future recommendations.
