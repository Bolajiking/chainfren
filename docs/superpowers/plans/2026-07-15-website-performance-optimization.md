# Website Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce Chainfren's measured mobile and desktop load time, JavaScript, transfer size, and speculative requests while preserving its current design, functionality, accessibility, SEO, and security.

**Architecture:** Keep the current Next.js 13 App Router architecture and responsive page layouts. Optimize the critical font path, turn the homepage shell into a Server Component with small client islands, defer weather and notification work until needed, replace hidden-link prefetching with intent-driven prefetching, scope legacy client state, and optimize safe image assets. Every group is measured against the same cold-load production baseline before the next group begins.

**Tech Stack:** Next.js 13.4.7 App Router, React 18.2, Tailwind CSS, Node's built-in test runner, Python Playwright 1.58, FontTools WOFF2 subsetting, Chromium/Lighthouse.

**Specification:** `docs/superpowers/specs/2026-07-15-website-performance-optimization-design.md`

---

## File map

### New files

- `scripts/performance/benchmark.py` — repeatable mobile/desktop cold-load benchmark with three-run medians and five-run retry on noisy metrics.
- `scripts/performance/regression_smoke.py` — route, interaction, console, metadata, and screenshot regression checks.
- `scripts/performance/run_measurement.sh` — fresh-build production-server lifecycle for every measured group.
- `scripts/performance/measure_group.sh` — fixed benchmark, smoke, and Lighthouse command bundle run against that server.
- `scripts/performance/requirements.txt` — pinned Playwright, FontTools WOFF2, and Brotli tooling.
- `scripts/performance/subset-fonts.sh` — deterministic two-file Inter subset generation.
- `tests/performance-harness.test.mjs` — static contract for repeatable benchmark profiles and output.
- `tests/test_performance_harness_runtime.py` — executable aggregation, retry, schema, and failure tests using synthetic runs.
- `tests/font-loading-performance.test.mjs` — font declaration, preload, and immutable-cache contract.
- `public/fonts/InterVariable-Latin-v1.woff2` — normal variable subset.
- `public/fonts/InterVariable-Italic-Latin-v1.woff2` — italic variable subset.
- `app/components/home/HomePlaybook.jsx` — homepage playbook carousel client island.
- `app/components/home/HomeNewsletter.jsx` — homepage newsletter client island.
- `app/components/home/HomeBackToTop.jsx` — homepage scroll control client island.
- `tests/homepage-client-boundary.test.mjs` — Server Component/client-island contract.
- `app/components/weather/weatherClient.mjs` — weather request deduplication and 10-minute session cache.
- `tests/weather-client.test.mjs` — cache, expiry, concurrency, and failure tests.
- `tests/weather-widget-performance.test.mjs` — viewport/timer source contract.
- `app/components/notifyEvents.js` — dependency-free notification open event.
- `tests/site-header-performance.test.mjs` — prefetch and modal-defer contract.
- `tests/provider-scope.test.mjs` — legacy provider route-scope contract.
- `tests/homepage-image-performance.test.mjs` — optimized image delivery contract.
- `docs/performance/benchmarks/baseline.json` — tracked byte-identical copy of the refreshed authoritative pre-change benchmark.
- `docs/performance/benchmarks/after.json` — final benchmark from the optimized build.
- `docs/performance/2026-07-15-performance-report.md` — final report and signoff evidence.

### Modified files

- `app/layout.jsx` — optimized preloads and removal of the global legacy provider.
- `app/globals.css` — two non-duplicated subset font declarations using `font-display: swap`.
- `next.config.js` — immutable cache headers for only the versioned subset fonts.
- `app/components/MainGrid.jsx` — Server Component shell that composes existing interactive islands.
- `app/components/WeatherWidget.jsx` — viewport activation, cached request, active-only clock, and optimized icons.
- `app/components/SiteHeader.jsx` — intent-driven route prefetch and conditional dynamic notification modal.
- `app/components/NotifyModal.jsx` — modal only; event helper removed.
- `app/components/StarFactorNotifyCard.jsx` — event helper import update.
- `app/(mainpage)/agency/page.jsx` — event helper import update.
- `app/(mainpage)/blog/layout.jsx` — locally scoped provider and removed render logging.
- `app/(learning)/layout.jsx` — locally scoped provider around legacy consumers.
- `app/components/AudienceCard.jsx` — optimized responsive image with unchanged geometry.
- `tests/homepage-mobile-audience-order.test.mjs` — keep the existing order assertion aligned with the Server Component shell if necessary.

## Measurement invariants

- `.gstack/benchmark-reports/baselines/baseline.json` remains the canonical local baseline named by the approved design. `docs/performance/benchmarks/baseline.json` is a byte-identical tracked copy so the evidence travels with the branch.
- Initial-load metrics are frozen before any hover, focus, menu, accordion, scroll, or modal interaction. Interaction checks live in `regression_smoke.py`; optional post-intent traffic is reported separately and never included in the initial request, transfer, or JavaScript totals.
- Every measured group uses `run_measurement.sh`: build, start that build with a recorded PID, poll `/api/health` until ready, run the requested measurements, and terminate the server through a shell trap. A production server is never reused after another build.
- Both benchmark JSON files record network JavaScript transfer and build-level shared/homepage route JavaScript bytes. The build calculation uses the emitted Next build manifest and the unique files required by `/`, sums on-disk bytes once per file, and stores the file list so the greater-than-5% route-chunk gate is auditable.

## Task 1: Isolate execution and refresh the authoritative baseline

**Files:**
- Create: `scripts/performance/benchmark.py`
- Create: `scripts/performance/regression_smoke.py`
- Create: `scripts/performance/run_measurement.sh`
- Create: `scripts/performance/measure_group.sh`
- Create: `scripts/performance/requirements.txt`
- Create: `tests/performance-harness.test.mjs`
- Create: `tests/test_performance_harness_runtime.py`
- Create: `docs/performance/benchmarks/baseline.json`

- [ ] **Step 1: Create an isolated worktree after this plan is committed**

Commit this reviewed plan as a scoped documentation commit first. Use `@superpowers:using-git-worktrees` before editing application files. Create `/private/tmp/chainfren-website-performance` on branch `codex/website-performance` from that new plan commit, which contains both the approved spec and this checklist. Do not copy or stage the unrelated modified/untracked files from `/Users/controlla/chainfren`.

- [ ] **Step 2: Write the failing harness contract**

Create `tests/performance-harness.test.mjs` using `node:test`. Read the scripts as text and assert the fixed profiles, route matrix, clean initial-load boundary, lifecycle trap/PID/health polling, and output fields. At minimum assert:

```js
assert.match(benchmark, /ROUTES\s*=\s*\["\/", "\/solutions", "\/blog"\]/)
assert.match(benchmark, /"mobile"/)
assert.match(benchmark, /"desktop"/)
assert.match(benchmark, /MIN_RUNS\s*=\s*3/)
assert.match(benchmark, /MAX_RUNS\s*=\s*5/)
assert.match(benchmark, /SPREAD_THRESHOLD\s*=\s*0\.10/)
assert.match(regression, /"\/contact"/)
assert.match(regression, /desktop_solutions_menu/)
assert.match(regression, /mobile_menu/)
assert.match(benchmark, /buildJavaScript/)
assert.doesNotMatch(benchmark, /hover\(|openMenu|Solutions/)
assert.match(lifecycle, /trap/)
assert.match(lifecycle, /api\/health/)
assert.match(lifecycle, /CHROME_PATH/)
```

- [ ] **Step 3: Write executable failing harness tests**

Create `tests/test_performance_harness_runtime.py` with synthetic runs and temporary output paths. Import pure functions from `benchmark.py` and test:

- median/minimum/maximum and request-type byte totals;
- exactly 10% spread stays at three runs and greater than 10% requests five;
- zero medians use an explicit absolute-spread rule rather than division by zero;
- missing FCP/LCP/TBT/load values fail the run;
- a navigation failure produces a non-zero CLI exit and no authoritative output;
- malformed/unwritable output paths fail explicitly;
- the JSON schema includes every raw run, medians, min/max, profiles, versions, resource lists, and build-level JavaScript file/byte data.

- [ ] **Step 4: Run both harness tests and verify they fail**

Run: `node --test tests/performance-harness.test.mjs && python3 -m unittest discover -s tests -p 'test_*.py'`
Expected: FAIL because the tracked performance scripts do not exist.

- [ ] **Step 5: Bootstrap pinned tooling in the isolated worktree**

Create `scripts/performance/requirements.txt`:

```text
playwright==1.58.0
fonttools[woff]==4.59.1
brotli==1.1.0
```

Run:

```bash
npm ci
python3 -m venv .venv-performance
.venv-performance/bin/python -m pip install -r scripts/performance/requirements.txt
.venv-performance/bin/python -m playwright install chromium
```

Resolve the Chromium executable from the installed Playwright package (`sync_playwright().chromium.executable_path`), assert the file exists, and use that exact path for both the benchmark and Lighthouse. Use exact `lighthouse@13.4.0` through `npx --yes lighthouse@13.4.0`, running under the bundled Node 24 runtime with `CHROME_PATH` set to the resolved Playwright executable. Record the Node, npm, Python, Playwright, Chromium executable/version, and Lighthouse versions in baseline and after artifacts. Keep `.venv-performance`, browser downloads, and Lighthouse output under ignored/local paths.

- [ ] **Step 6: Promote and harden the benchmark script**

Use `/Users/controlla/chainfren/.gstack/run-performance-benchmark.py` as the verified starting implementation. Save the tracked version as `scripts/performance/benchmark.py` and change it to:

- accept `--base-url`, `--label`, and `--output` arguments;
- set `MIN_RUNS = 3`, `MAX_RUNS = 5`, and `SPREAD_THRESHOLD = 0.10`;
- run five contexts only when `(max - min) / median > 0.10` for FCP, LCP, TBT, or full load;
- record every run, median, minimum, maximum, build commit, profile settings, request types, and largest resources;
- write JSON to the requested output path and print a compact Markdown table;
- preserve the exact desktop/mobile throttling and PerformanceObserver logic already verified in `.gstack`;
- remove the inherited menu-opening step and freeze initial-load metrics before every interaction;
- expose pure aggregation, spread, schema, and build-manifest functions so the runtime tests exercise behavior instead of source shape;
- calculate the shared/homepage route JavaScript file list and unique on-disk bytes from the production build manifest.

- [ ] **Step 7: Promote and extend the regression script safely**

Use `/Users/controlla/chainfren/.gstack/run-regression-baseline.py` as the starting implementation. Save it as `scripts/performance/regression_smoke.py`, add `--base-url`, `--output-dir`, and `--json-output`, and preserve the condition-based mobile-menu close assertion. Add explicit checks for metadata, desktop/mobile keyboard focus and focus restoration, reduced-motion mode, notification chunk absence before activation and first-open behavior, invalid notification input, Blog and Learning provider-backed routes, newsletter payload routing, and responsive screenshots. Intercept `/api/contact` for form tests and assert the URL/payload without allowing an external call or local submission-file write.

- [ ] **Step 8: Implement the fresh-server lifecycle**

Create `run_measurement.sh` with `set -euo pipefail`. It accepts a label and measurement command; resolves `sync_playwright().chromium.executable_path` through `.venv-performance/bin/python`; asserts the executable exists; exports it as `CHROME_PATH`; runs `npm run build`; starts `npm start` on a configurable port in the background; records `$!`; installs an EXIT trap that terminates and waits for that PID; polls `/api/health` with a bounded timeout; exports `PERF_BASE_URL`; then runs only the requested command. It must fail if the browser path is missing, the server exits early, or health never becomes ready. Do not use an existing process on the port.

Create `measure_group.sh` with `set -euo pipefail`. It accepts a label and uses `PERF_BASE_URL` to run `benchmark.py`, `regression_smoke.py`, and exact `npx --yes lighthouse@13.4.0` for the fixed route/profile matrix. Baseline, intermediate, and final runs therefore cannot silently diverge in tooling or scope.

- [ ] **Step 9: Run the harness tests and the existing suite**

Run: `node --test tests/*.test.mjs && .venv-performance/bin/python -m unittest discover -s tests -p 'test_*.py'`
Expected: all tests PASS.

- [ ] **Step 10: Refresh pre-change measurements before application edits**

Use `run_measurement.sh` so the unchanged production build is started once, measured, and terminated:

```bash
scripts/performance/run_measurement.sh baseline -- scripts/performance/measure_group.sh baseline
```

The lifecycle supports a command bundle so benchmark, regression smoke, and exact `npx --yes lighthouse@13.4.0` mobile/desktop runs for `/`, `/solutions`, and `/blog` all execute against that same fresh build before termination. Copy the canonical `.gstack` baseline byte-for-byte to `docs/performance/benchmarks/baseline.json` and verify identical checksums. Capture Lighthouse JSON under `.gstack/lighthouse-baseline/` and record versions/scores in the tracked baseline artifact.

- [ ] **Step 11: Commit the harness and baseline**

```bash
git add scripts/performance tests/performance-harness.test.mjs tests/test_performance_harness_runtime.py docs/performance/benchmarks/baseline.json
git commit -m "test: establish repeatable performance baseline"
```

## Task 2: Shrink and unblock the critical font path

**Files:**
- Create: `scripts/performance/subset-fonts.sh`
- Create: `tests/font-loading-performance.test.mjs`
- Create: `public/fonts/InterVariable-Latin-v1.woff2`
- Create: `public/fonts/InterVariable-Italic-Latin-v1.woff2`
- Modify: `app/globals.css:5-44`
- Modify: `app/layout.jsx:35-55`
- Modify: `next.config.js:1-18`

- [ ] **Step 1: Write the failing font contract**

Create `tests/font-loading-performance.test.mjs`. Assert that:

```js
assert.equal((css.match(/font-family:\s*'Inter Display'/g) || []).length, 2)
assert.match(css, /InterVariable-Latin-v1\.woff2/)
assert.match(css, /InterVariable-Italic-Latin-v1\.woff2/)
assert.equal((css.match(/font-display:\s*swap/g) || []).length, 2)
assert.doesNotMatch(layout, /href="\/fonts\/InterVariable\.woff2"/)
assert.doesNotMatch(layout, /href="\/fonts\/InterVariable-Italic\.woff2"/)
assert.match(config, /InterVariable-(?:Italic-)?Latin-v1\.woff2/)
assert.match(config, /immutable/)
```

Also assert both generated files exist and their combined byte size is less than 370,688 bytes, half the current full-font total.

- [ ] **Step 2: Run the font test and verify it fails**

Run: `node --test tests/font-loading-performance.test.mjs`
Expected: FAIL on the old font URLs, four declarations, blocking display mode, and missing subset files.

- [ ] **Step 3: Add deterministic subset generation**

Create `scripts/performance/subset-fonts.sh` with `set -euo pipefail`. It must call `pyftsubset` twice with:

```text
--flavor=woff2
--unicodes=U+0000-024F,U+2000-206F,U+20A0-20CF,U+2100-214F,U+2190-21FF,U+2700-27BF
--layout-features=*
--name-IDs=*
--name-legacy
--name-languages=*
--glyph-names
--symbol-cmap
--legacy-cmap
--notdef-glyph
--notdef-outline
--recommended-glyphs
```

Input/output pairs:

```text
public/fonts/InterVariable.woff2 -> public/fonts/InterVariable-Latin-v1.woff2
public/fonts/InterVariable-Italic.woff2 -> public/fonts/InterVariable-Italic-Latin-v1.woff2
```

Run the script from the performance virtual environment. Keep the full source fonts unchanged.

- [ ] **Step 4: Replace the four duplicated font declarations**

In `app/globals.css`, keep exactly one normal and one italic `@font-face`, both named `Inter Display`, both weight `100 900`, both `font-display: swap`, and each pointing to its versioned subset. Remove the redundant `Inter` aliases; the fallback chain remains `"Inter Display", Inter, system-ui, sans-serif`.

- [ ] **Step 5: Update preloads and cache headers**

In `app/layout.jsx`, preload the two versioned subset URLs and update the comment to describe immediate fallback rendering and small preloaded subsets.

In `next.config.js`, add `headers()` returning immutable one-year cache headers only for `/fonts/InterVariable-Latin-v1.woff2` and `/fonts/InterVariable-Italic-Latin-v1.woff2`:

```js
{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
```

Preserve all existing image and redirect configuration.

- [ ] **Step 6: Verify the font group**

Run:

```bash
node --test tests/font-loading-performance.test.mjs tests/*.test.mjs
scripts/performance/run_measurement.sh fonts -- scripts/performance/measure_group.sh fonts
```

`measure_group.sh` is a small checked-in command bundle used by every group; it runs the benchmark, regression smoke, and the fixed Lighthouse route/profile matrix against the lifecycle-provided URL. Expected: the fresh build passes; combined font bytes are under half baseline; mobile FCP and LCP improve beyond the hard gate; CLS stays below 0.1. Compare network resources to prove the old fonts are not requested.

- [ ] **Step 7: Commit the font optimization**

```bash
git add app/globals.css app/layout.jsx next.config.js public/fonts/InterVariable-Latin-v1.woff2 public/fonts/InterVariable-Italic-Latin-v1.woff2 scripts/performance/subset-fonts.sh tests/font-loading-performance.test.mjs
git commit -m "perf: shrink the critical font path"
```

## Task 3: Convert the homepage shell to a Server Component

**Files:**
- Create: `app/components/home/HomePlaybook.jsx`
- Create: `app/components/home/HomeNewsletter.jsx`
- Create: `app/components/home/HomeBackToTop.jsx`
- Create: `tests/homepage-client-boundary.test.mjs`
- Modify: `app/components/MainGrid.jsx`
- Modify: `tests/homepage-mobile-audience-order.test.mjs` only if its source slicing needs the new component names

- [ ] **Step 1: Write the failing client-boundary contract**

Assert in `tests/homepage-client-boundary.test.mjs` that `MainGrid.jsx` does not begin with `use client`, does not import `useState`/`useEffect`, and imports all three focused client islands. Assert each island begins with `use client`. Assert the existing mobile markers and `<ForCreatorsSection />` before `<WhatWeBuild />` ordering remain.

- [ ] **Step 2: Run the boundary test and verify it fails**

Run: `node --test tests/homepage-client-boundary.test.mjs tests/homepage-mobile-audience-order.test.mjs`
Expected: FAIL because `MainGrid` is still a monolithic Client Component.

- [ ] **Step 3: Extract the playbook carousel verbatim**

Move `playbookTabs`, `currentPlaybookTab`, `nextPlaybookTab`, `prevPlaybookTab`, and the current `PlaybookSection` JSX into `app/components/home/HomePlaybook.jsx`. Export a zero-prop component. Preserve copy, masks, links, button labels, dimensions, and classes exactly.

- [ ] **Step 4: Extract the newsletter verbatim**

Move the email/status state, validation, `/api/contact` request, and current newsletter JSX into `app/components/home/HomeNewsletter.jsx`. Export a zero-prop component. Preserve `formType: 'newsletter'`, `source: 'homepage-sabi'`, accessible name, copy, and layout.

- [ ] **Step 5: Extract the scroll control**

Create `HomeBackToTop.jsx` with the current button markup and `window.scrollTo({ top: 0, behavior: 'smooth' })`. Keep the existing accessible button text and SVG.

- [ ] **Step 6: Make MainGrid the server shell**

Remove `use client`, React hooks, and state from `MainGrid.jsx`. Import the three islands. Keep static section functions in the server file. Define:

```jsx
const PlaybookSection = () => <HomePlaybook />
const NewsletterSection = () => <HomeNewsletter />
```

Replace only the inline return-to-top button with `<HomeBackToTop />`. Do not change mobile/desktop wrappers, ordering, dimensions, copy, or interactive-card imports.

- [ ] **Step 7: Verify behavior and bundle impact**

Run the boundary tests and full Node suite, then use `run_measurement.sh` with `measure_group.sh homepage-boundary`. Expected: the lifecycle produces and measures a fresh build; homepage route-specific JavaScript on disk and browser JavaScript transfer are both at least 5% below the refreshed baseline; screenshots preserve current geometry and copy.

- [ ] **Step 8: Commit the server/client boundary**

```bash
git add app/components/MainGrid.jsx app/components/home tests/homepage-client-boundary.test.mjs tests/homepage-mobile-audience-order.test.mjs
git commit -m "perf: server-render the homepage shell"
```

## Task 4: Defer and deduplicate weather work

**Files:**
- Create: `app/components/weather/weatherClient.mjs`
- Create: `tests/weather-client.test.mjs`
- Create: `tests/weather-widget-performance.test.mjs`
- Modify: `app/components/WeatherWidget.jsx`

- [ ] **Step 1: Write failing cache tests**

Import `getWeather`, `resetWeatherCache`, `CACHE_KEY`, and `TTL_MS` from `weatherClient.mjs`. With fake `fetcher`, `storage`, and `now`, test:

- two concurrent calls produce one fetch;
- a successful result is read from storage after memory reset;
- a stored result older than 600,000 ms triggers a new fetch;
- a rejected/non-OK response is not cached;
- storage exceptions fall back to memory without rejecting a successful fetch.

- [ ] **Step 2: Write the failing widget source contract**

Assert `WeatherWidget.jsx` contains `IntersectionObserver`, `visibilitychange`, `getWeather`, a root `ref`, and `next/image`; assert it does not render `Loading...` or an initial spinner.

- [ ] **Step 3: Run both tests and verify they fail**

Run: `node --test tests/weather-client.test.mjs tests/weather-widget-performance.test.mjs`.

- [ ] **Step 4: Implement the cache module**

Implement the following public contract in `weatherClient.mjs`:

```js
export const CACHE_KEY = 'chainfren:weather:v1'
export const TTL_MS = 10 * 60 * 1000
let memoryEntry = null
let inFlight = null

export async function getWeather({ fetcher = fetch, storage = globalThis.sessionStorage, now = Date.now() } = {})
export function resetWeatherCache() { memoryEntry = null; inFlight = null }
```

Validate cached objects as `{ value, expiresAt }`. Return unexpired memory first, then unexpired storage, then the shared in-flight promise. Fetch `/api/weather`, require `response.ok`, cache only successful JSON, swallow storage read/write failures, and clear `inFlight` in `finally`.

- [ ] **Step 5: Activate WeatherWidget only near the viewport**

Add a root ref and an `IntersectionObserver` with `rootMargin: '300px 0px'`. Set `active` only while intersecting. Render the Lagos fallback immediately. When active, call `getWeather()` and update the card; retain the fallback on error.

Move the one-second clock into a separate effect that runs only while `active && document.visibilityState === 'visible'`. Listen for `visibilitychange`, clear the interval on deactivation/unmount, and update immediately on activation.

Use `next/image` for the four 128x128 weather icons with `quality={90}`, `sizes="128px"`, and default lazy loading.

- [ ] **Step 6: Verify network and timers**

Run unit tests and the full suite, then use the fresh-server lifecycle for browser smoke. In a fresh homepage context, assert no `/api/weather` request before scrolling. Scroll a weather card near the viewport and assert exactly one request even though both responsive instances exist. Verify the visible clock advances and stops while the page is hidden.

- [ ] **Step 7: Benchmark and commit**

Run `run_measurement.sh` with `measure_group.sh weather`. Benchmark all three routes from a fresh build. Confirm homepage initial request count decreases and no metric violates hard gates.

```bash
git add app/components/WeatherWidget.jsx app/components/weather tests/weather-client.test.mjs tests/weather-widget-performance.test.mjs
git commit -m "perf: defer and deduplicate weather work"
```

## Task 5: Replace hidden-link prefetching with intent prefetching

**Files:**
- Create: `tests/site-header-performance.test.mjs`
- Modify: `app/components/SiteHeader.jsx`

- [ ] **Step 1: Write the failing navigation performance contract**

Assert the header imports `useRouter`, has a `prefetchedRoutes` set and `prefetchEngine` callback, supplies `prefetch={false}` or `prefetch: false` to every link rendered inside `MegaContent`, featured cards, `ForYouStrip`, `MobileUtility`, and mobile accordions, and calls `prefetchEngine` from desktop open intent and mobile accordion open.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/site-header-performance.test.mjs tests/site-header-mobile-utility.test.mjs`.

- [ ] **Step 3: Implement deduplicated intent prefetch**

Import `useRouter`. Add `const prefetchedRoutes = useRef(new Set())`. `prefetchEngine(key)` must collect `exploreHref`, offering hrefs, featured href, and mobile-row hrefs for `ENGINES[key]`, strip hashes only for deduplication, skip external URLs and the current pathname, and call `router.prefetch(href)` once per route.

Call it at the start of `openMenu(name, ...)` and when opening (not closing) `toggleAcc(name)`. Add `prefetch={false}` to closed-menu `Link` elements and `prefetch: false` to dynamic `Link` props. Leave the visible logo and CTA prefetch behavior unchanged.

- [ ] **Step 4: Verify initial and intent request behavior**

In Playwright, capture fetch requests on a fresh homepage for 1.5 seconds without interaction and assert closed navigation causes none. Hover/focus Solutions and assert its route-data prefetches begin. Click a prefetched destination and verify navigation succeeds. Repeat with the mobile accordion and keyboard focus.

- [ ] **Step 5: Build, benchmark, and commit**

Run full tests, then `run_measurement.sh` with `measure_group.sh navigation-prefetch`. Request count must fall on the frozen initial-load sample without navigation regressions; intent traffic is recorded separately by smoke coverage.

```bash
git add app/components/SiteHeader.jsx tests/site-header-performance.test.mjs
git commit -m "perf: prefetch navigation on intent"
```

## Task 6: Defer the notification modal and scope legacy context

**Files:**
- Create: `app/components/notifyEvents.js`
- Create: `tests/provider-scope.test.mjs`
- Modify: `app/components/SiteHeader.jsx`
- Modify: `app/components/NotifyModal.jsx`
- Modify: `app/components/StarFactorNotifyCard.jsx`
- Modify: `app/(mainpage)/agency/page.jsx`
- Modify: `app/layout.jsx`
- Modify: `app/(mainpage)/blog/layout.jsx`
- Modify: `app/(learning)/layout.jsx`
- Modify: `tests/site-header-performance.test.mjs`

- [ ] **Step 1: Extend failing contracts**

Assert `notifyEvents.js` exports `openNotify`; `NotifyModal.jsx` no longer exports it; all callers import the helper module. Assert `SiteHeader` imports `dynamic`, declares `dynamic(() => import('./NotifyModal'), { ssr: false })`, and renders it only inside `notifyOpen && ...`.

In `provider-scope.test.mjs`, assert the root layout does not import `Provider`; Blog and Learning layouts do import and render it; and Blog layout contains no `console.log`.

- [ ] **Step 2: Run focused tests and verify they fail**

Run: `node --test tests/site-header-performance.test.mjs tests/provider-scope.test.mjs`.

- [ ] **Step 3: Split the event helper and conditionally load the modal**

Create `notifyEvents.js` containing only:

```js
export function openNotify(source = 'unknown') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cf:open-notify', { detail: { source } }))
  }
}
```

Update all three callers. Remove the helper export from `NotifyModal.jsx`. In `SiteHeader`, keep the existing always-mounted event listener and state, add the dynamic import, and replace the unconditional modal with:

```jsx
{notifyOpen && (
  <NotifyModal open onClose={() => setNotifyOpen(false)} source={notifySource} accent={accent} />
)}
```

- [ ] **Step 4: Scope the legacy provider**

Remove `ContextProvider` from `app/layout.jsx` while keeping `StyledJsxRegistry`.

In each legacy layout, render `ContextProvider` above a small inner component that calls `useGlobalContext`; a component must never call the context hook before its own provider. Blog's inner component applies the existing `dark` class. Learning's inner component applies the existing class and renders `Nav2`. Remove the Blog `console.log`.

- [ ] **Step 5: Verify first-open and route behavior**

Run focused/full tests, then use the fresh-server lifecycle. In a fresh browser, confirm the modal chunk is absent before activation, activate Star Factor once, wait for the dialog, submit invalid input with `/api/contact` intercepted, close with Escape, verify focus restoration, and reopen. Verify Blog article rich text and Learning routes still render without provider errors.

- [ ] **Step 6: Benchmark and commit**

Run `run_measurement.sh` with `measure_group.sh modal-provider`. Confirm shared/route JavaScript decreases and no route regresses beyond gates.

```bash
git add app/layout.jsx 'app/(mainpage)/blog/layout.jsx' 'app/(learning)/layout.jsx' 'app/(mainpage)/agency/page.jsx' app/components/SiteHeader.jsx app/components/NotifyModal.jsx app/components/StarFactorNotifyCard.jsx app/components/notifyEvents.js tests/provider-scope.test.mjs tests/site-header-performance.test.mjs
git commit -m "perf: defer modal and scope legacy state"
```

## Task 7: Optimize safe homepage images

**Files:**
- Create: `tests/homepage-image-performance.test.mjs`
- Modify: `app/components/MainGrid.jsx`
- Modify: `app/components/AudienceCard.jsx`

- [ ] **Step 1: Write the failing image contract**

Assert both files import `next/image`; `AudienceCard` supplies `width={402}`, `height={402}`, `quality={90}`, and `sizes`; MainGrid's `/randz1.png` image supplies explicit intrinsic dimensions, `quality={90}`, and `sizes`. Assert neither optimized image uses `priority`.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/homepage-image-performance.test.mjs`.

- [ ] **Step 3: Convert only the two safe images**

Replace the AudienceCard artwork `<img>` with `Image` while preserving its absolute positioning, 402x402 geometry, opacity, rotation, z-index, transition, empty alt, and `aria-hidden` semantics.

Replace `/randz1.png` in `ThreeDIconSection` with `Image`, preserve its classes and empty alt, set intrinsic dimensions from the source PNG, `quality={90}`, and a responsive `sizes` value capped to the card width. Leave CSS backgrounds, masks, and navigation decorative images unchanged.

- [ ] **Step 4: Verify visual and transfer behavior**

Run tests, then use the fresh-server lifecycle. Capture 1x and 2x screenshots at 390x844 and 1440x900 after network idle. Compare crops, dimensions, colors, and compression with the baseline. Verify lazy image requests do not start before the relevant section approaches the viewport and their combined transfer decreases.

- [ ] **Step 5: Benchmark and commit**

Run `run_measurement.sh` with `measure_group.sh images` and reject the group if a hard gate fails.

```bash
git add app/components/MainGrid.jsx app/components/AudienceCard.jsx tests/homepage-image-performance.test.mjs
git commit -m "perf: optimize homepage image delivery"
```

## Task 8: Full completion audit and final report

**Files:**
- Create: `docs/performance/benchmarks/after.json`
- Create: `docs/performance/2026-07-15-performance-report.md`
- Update: performance scripts/tests only if final verification exposes a harness defect

- [ ] **Step 1: Run the complete deterministic suite**

Run:

```bash
node --test tests/*.test.mjs
npm run build
```

Expected: all tests pass and all application routes compile. Treat Contentful missing-environment stub messages as expected local warnings, not failures.

- [ ] **Step 2: Run production browser regression coverage**

Use `run_measurement.sh` so the final build, regression smoke, benchmark, and Lighthouse matrix share one fresh server and the server is terminated afterward. Verify Home, Solutions, Blog, and Contact status/title/headings, metadata, no page or console errors, desktop menu, mobile menu/Escape/focus restoration, newsletter and notification payloads through intercepted `/api/contact`, notification chunk absence/first-open behavior, reduced motion, Blog/Learning context, and responsive screenshots.

- [ ] **Step 3: Capture final benchmark and Lighthouse evidence**

Write the final three-or-five-run benchmark to `docs/performance/benchmarks/after.json`. Run exact `npx --yes lighthouse@13.4.0` with the same Node 24 runtime/profile/route matrix used for baseline. Record all run values, medians, min/max, scores, tool versions, initial-load network JavaScript, and manifest-derived shared/homepage route JavaScript files and bytes.

- [ ] **Step 4: Evaluate every hard gate**

Create an explicit pass/fail table for:

- FCP and LCP improvement on all routes (>5% or >=100 ms);
- homepage JS transfer and route chunk reduction >5%;
- homepage request and transfer reduction;
- no >5% regressions, using the approved TBT zero-baseline tolerance of 50 ms;
- TBT under 200 ms mobile and 150 ms desktop;
- CLS below 0.1;
- no critical functional, visual, accessibility, SEO, security, or reliability regression.

Do not declare completion while any hard gate is unproven or failing.

- [ ] **Step 5: Write the final report**

`docs/performance/2026-07-15-performance-report.md` must include:

1. environment and method;
2. original baseline;
3. bottlenecks;
4. changes by commit and purpose;
5. before/after tables with absolute and percentage deltas;
6. Lighthouse score comparison;
7. regression evidence;
8. remaining limitations;
9. deferred recommendations, including the separate responsive-tree rewrite and framework upgrade;
10. production deployment status explicitly marked not performed unless separately authorized.

- [ ] **Step 6: Review the final diff**

Use `@superpowers:requesting-code-review` and the Vercel React performance guidance. Address only actionable findings, rerun affected verification, and ensure unrelated original worktree files remain untouched.

- [ ] **Step 7: Commit the report and final evidence**

```bash
git add docs/performance scripts/performance tests
git commit -m "docs: report website performance improvements"
```

- [ ] **Step 8: Integrate the isolated branch safely**

Use `@superpowers:finishing-a-development-branch`. From `codex/network-accessibility-hardening`, first prove the user's pre-existing modified/untracked files will not be overwritten, then run `git merge --ff-only codex/website-performance`. Otherwise leave the completed branch isolated and report the exact branch and commit for manual integration.
