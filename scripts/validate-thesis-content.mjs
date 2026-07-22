import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { THESIS_CONTENT_VERSION, PUBLIC_CTAS, PUBLIC_PRODUCT_MATURITY, PUBLIC_INITIATIVE_MATURITY } from '../content/chainfren-thesis/public-config.mjs'
import { THESIS_CONTENT_HASH } from '../content/chainfren-thesis/generated-content-hash.mjs'
import { THESIS_MANIFEST } from '../content/chainfren-thesis/manifest.mjs'
import { PUBLIC_CITATIONS } from '../content/chainfren-thesis/citations.mjs'
import { THESIS_CLAIMS, THESIS_EDGES } from '../content/chainfren-thesis/claims.mjs'
import { THESIS_MAP_LAYOUT } from '../content/chainfren-thesis/map-layout.mjs'
import { DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS } from '../content/chainfren-thesis/public-system.mjs'
import { validateManifest, validateCitations, validateClaims, validateEdges, validateLayout, validateCtas, validatePublicSystem, validateStages, validateReferences } from '../lib/thesis/schema.mjs'

const blockedPatterns = [
  [/\/Users\//, 'local user path'], [/second-brain/i, 'private knowledge store'], [/CF-C-\d+/i, 'internal identifier'],
  [/signed\s+revenue/i, 'sensitive commercial term'], [/runway/i, 'sensitive operating term'], [/decision-rights/i, 'sensitive governance term'], [/control\s+matrix/i, 'sensitive control term'], [/risk\s+register/i, 'sensitive risk term'], [/\u2014|\u2013/, 'dash punctuation'],
  [new RegExp(['come', 'ownity'].join(''), 'i'), 'excluded venture'],
]

export function collectSafetyViolations(text, source) {
  return blockedPatterns.filter(([pattern]) => pattern.test(text)).map(([, label]) => `${source}: blocked ${label}`)
}

const chapterPath = (directory, chapter) => `${fileURLToPath(directory)}chapters/${chapter.id}-${chapter.slug}.mdx`
const textArtifact = (path) => /\.(?:html|md|mdx|txt)$/i.test(path)
const scanTextTree = (directory, errors, scannedPaths, label, visited = new Set()) => {
  const root = resolve(directory)
  if (visited.has(root)) return
  visited.add(root)
  for (const name of readdirSync(root)) {
    const path = resolve(root, name)
    const entry = lstatSync(path)
    if (entry.isSymbolicLink()) errors.push(`${label} scan skipped symlink: ${path}`)
    else if (entry.isDirectory()) scanTextTree(path, errors, scannedPaths, label, visited)
    else if (textArtifact(path) && !scannedPaths.has(path)) {
      scannedPaths.add(path)
      errors.push(...collectSafetyViolations(readFileSync(path, 'utf8'), path))
    }
  }
}

const scanGeneratedDirectory = (directory, errors, scannedPaths = new Set()) => {
  if (!directory) { errors.push('Generated thesis scan requires a directory'); return }
  if (!existsSync(directory)) { errors.push(`Generated thesis directory does not exist: ${directory}`); return }
  const root = resolve(directory)
  const rootStat = lstatSync(root)
  if (rootStat.isSymbolicLink()) { errors.push(`Generated thesis scan skipped symlink: ${root}`); return }
  if (!rootStat.isDirectory()) { errors.push(`Generated thesis path is not a directory: ${root}`); return }
  scanTextTree(root, errors, scannedPaths, 'Generated thesis')
}

const APP_ROOT = fileURLToPath(new URL('../app/', import.meta.url))
const PROJECT_ROOT = fileURLToPath(new URL('../', import.meta.url))
const APPROVED_FIRST_PARTY_HOSTS = new Set(['chainfren.com', 'www.chainfren.com'])

const collectRoutePatterns = (directory = APP_ROOT, routes = []) => {
  for (const name of readdirSync(directory)) {
    const path = resolve(directory, name)
    const entry = lstatSync(path)
    if (entry.isSymbolicLink()) continue
    if (entry.isDirectory()) collectRoutePatterns(path, routes)
    else if (/^page\.(?:js|jsx|ts|tsx)$/.test(name)) {
      const segments = relative(APP_ROOT, directory).split('/').filter((segment) => segment && !/^\(.+\)$/.test(segment))
      routes.push(`/${segments.join('/')}`.replace(/\/$/, '') || '/')
    }
  }
  return routes
}

const routeMatches = (href, route) => {
  const routePattern = route.split('/').map((segment) => /^\[.+\]$/.test(segment) ? '[^/]+' : segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('/')
  return new RegExp(`^${routePattern}$`).test(href)
}

export function validatePublicDestinations(hrefs, routePatterns = collectRoutePatterns()) {
  const errors = []
  for (const href of hrefs) {
    if (href.startsWith('/')) {
      if (!routePatterns.some((route) => routeMatches(href, route))) errors.push(`Public CTA destination has no matching route file: ${href}`)
      continue
    }
    try {
      const url = new URL(href)
      if (url.protocol !== 'https:' && !APPROVED_FIRST_PARTY_HOSTS.has(url.hostname)) errors.push(`Public CTA destination must use HTTPS or an approved first-party URL: ${href}`)
    } catch { errors.push(`Public CTA destination is invalid: ${href}`) }
  }
  return errors
}

const publicDestinations = () => [
  ...Object.values(PUBLIC_CTAS).map(({ href }) => href),
  ...PUBLIC_PRODUCT_MATURITY.map(({ href }) => href),
  ...PUBLIC_INITIATIVE_MATURITY.map(({ href }) => href),
  ...DISTRIBUTION_LOOP.map(({ href }) => href),
  ...VALUE_PATH.map(({ href }) => href),
  ...ROADMAP_HORIZONS.map(({ href }) => href),
]

const publicRecords = () => ({
  manifest: THESIS_MANIFEST,
  claims: THESIS_CLAIMS,
  citations: PUBLIC_CITATIONS,
  ctas: PUBLIC_CTAS,
  productMaturity: PUBLIC_PRODUCT_MATURITY,
  initiativeMaturity: PUBLIC_INITIATIVE_MATURITY,
  distributionLoop: DISTRIBUTION_LOOP,
  valuePath: VALUE_PATH,
  roadmapHorizons: ROADMAP_HORIZONS,
})

export function validateThesisContent({ allowMissingContent = false, contentDirectory = new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory, generatedDirectoryRequested = generatedDirectory !== undefined } = {}) {
  const errors = []
  try {
    if (THESIS_CONTENT_VERSION !== '2026.1') throw new Error('Content version must be 2026.1')
    validateManifest(THESIS_MANIFEST)
    const claimIds = new Set(THESIS_CLAIMS.map((claim) => claim.id))
    validateCitations(PUBLIC_CITATIONS, claimIds)
    validateClaims(THESIS_CLAIMS, new Set(THESIS_MANIFEST.map((chapter) => chapter.slug)), new Set(PUBLIC_CITATIONS.map((citation) => citation.id)))
    validateEdges(THESIS_EDGES, claimIds)
    validateLayout(THESIS_MAP_LAYOUT, claimIds)
    validateCtas(PUBLIC_CTAS)
    validatePublicSystem({ DISTRIBUTION_LOOP, VALUE_PATH, ROADMAP_HORIZONS }, new Set(THESIS_MANIFEST.map((chapter) => chapter.slug)))
    validateStages([...PUBLIC_PRODUCT_MATURITY, ...PUBLIC_INITIATIVE_MATURITY])
    validateReferences(THESIS_MANIFEST, THESIS_CLAIMS, PUBLIC_CITATIONS)
    errors.push(...validatePublicDestinations(publicDestinations()))
  } catch (error) { errors.push(error.message) }
  errors.push(...collectSafetyViolations(JSON.stringify(publicRecords()), 'Public thesis records'))
  const scannedPaths = new Set()
  for (const chapter of THESIS_MANIFEST) {
    const path = chapterPath(contentDirectory, chapter)
    if (!existsSync(path)) { if (!allowMissingContent) errors.push(`Missing chapter MDX: chapters/${chapter.id}-${chapter.slug}.mdx`); continue }
    if (lstatSync(path).isSymbolicLink()) { errors.push(`Content thesis scan skipped symlink: ${path}`); continue }
    scannedPaths.add(resolve(path))
    errors.push(...collectSafetyViolations(readFileSync(path, 'utf8'), path))
  }
  if (existsSync(contentDirectory)) {
    const root = fileURLToPath(contentDirectory)
    const rootStat = lstatSync(root)
    if (rootStat.isSymbolicLink()) errors.push(`Content thesis scan skipped symlink: ${resolve(root)}`)
    else if (rootStat.isDirectory()) scanTextTree(root, errors, scannedPaths, 'Content thesis')
  }
  if (generatedDirectoryRequested) scanGeneratedDirectory(generatedDirectory, errors)
  return errors
}

const releaseTextArtifact = (path) => /\.(?:css|html|js|jsx|json|md|mdx|mjs|rsc|svg|txt)$/i.test(path)
const defaultReleaseSourcePaths = (projectRoot) => [
  join(projectRoot, 'app/(mainpage)/thesis'),
  join(projectRoot, 'content/chainfren-thesis'),
  join(projectRoot, 'lib/thesis/public-content.js'),
  join(projectRoot, 'lib/thesis/public-presentation.mjs'),
  join(projectRoot, 'lib/thesis/json-ld.js'),
  join(projectRoot, 'public/downloads/chainfren-thesis-2026.1.sha256'),
]

const scanReleasePath = (path, errors, scannedPaths, label) => {
  if (!existsSync(path)) { errors.push(`${label} is missing: ${path}`); return }
  const entry = lstatSync(path)
  if (entry.isSymbolicLink()) { errors.push(`${label} scan skipped symlink: ${path}`); return }
  if (entry.isDirectory()) {
    const root = resolve(path)
    const visited = new Set()
    const scan = (directory) => {
      if (visited.has(directory)) return
      visited.add(directory)
      for (const name of readdirSync(directory)) {
        const child = resolve(directory, name)
        const childEntry = lstatSync(child)
        if (childEntry.isSymbolicLink()) errors.push(`${label} scan skipped symlink: ${child}`)
        else if (childEntry.isDirectory()) scan(child)
        else if (releaseTextArtifact(child) && !scannedPaths.has(child)) {
          scannedPaths.add(child)
          errors.push(...collectSafetyViolations(readFileSync(child, 'utf8'), child))
        }
      }
    }
    scan(root)
  } else if (releaseTextArtifact(path) && !scannedPaths.has(resolve(path))) {
    scannedPaths.add(resolve(path))
    errors.push(...collectSafetyViolations(readFileSync(path, 'utf8'), path))
  }
}

const defaultPdfTextExtractor = (pdfPath) => {
  const result = spawnSync('pdftotext', [pdfPath, '-'], { encoding: 'utf8', timeout: 10_000 })
  if (result.error) throw new Error(`pdftotext is required to scan the release PDF: ${result.error.message}`)
  if (result.status !== 0) throw new Error(`pdftotext failed for the release PDF: ${result.stderr || `exit ${result.status}`}`)
  return result.stdout
}

const releaseTreeContains = (directory, value) => {
  const visited = new Set()
  const scan = (path) => {
    const resolvedPath = resolve(path)
    if (visited.has(resolvedPath)) return false
    visited.add(resolvedPath)
    const entry = lstatSync(resolvedPath)
    if (entry.isSymbolicLink()) return false
    if (!entry.isDirectory()) return releaseTextArtifact(resolvedPath) && readFileSync(resolvedPath, 'utf8').includes(value)
    return readdirSync(resolvedPath).some((name) => scan(join(resolvedPath, name)))
  }
  return scan(directory)
}

export function validateReleaseOutputs({
  projectRoot = PROJECT_ROOT,
  sourcePaths = defaultReleaseSourcePaths(projectRoot),
  pdfPath = join(projectRoot, 'public/downloads/chainfren-thesis-2026.1.pdf'),
  buildDirectory = join(projectRoot, '.next/server/app/thesis'),
  extractPdfText = defaultPdfTextExtractor,
} = {}) {
  const errors = []
  const scannedPaths = new Set()
  for (const path of sourcePaths) scanReleasePath(path, errors, scannedPaths, 'Deterministic public release source')

  if (!existsSync(pdfPath)) errors.push(`Release PDF is missing: ${pdfPath}`)
  else {
    try { errors.push(...collectSafetyViolations(extractPdfText(pdfPath), `${pdfPath} extracted text`)) }
    catch (error) { errors.push(error.message) }
  }

  if (!existsSync(buildDirectory) || !lstatSync(buildDirectory).isDirectory()) {
    errors.push(`Production thesis build outputs are unavailable at ${buildDirectory}. Run npm run build, then npm run thesis:verify-release.`)
  } else {
    scanReleasePath(buildDirectory, errors, scannedPaths, 'Production thesis build output')
    if (!releaseTreeContains(buildDirectory, THESIS_CONTENT_VERSION)) {
      errors.push(`Production thesis build outputs are stale: expected current thesis content version ${THESIS_CONTENT_VERSION}. Run npm run build, then npm run thesis:verify-release.`)
    }
    if (!releaseTreeContains(buildDirectory, THESIS_CONTENT_HASH)) {
      errors.push(`Production thesis build outputs are stale: expected current thesis content hash ${THESIS_CONTENT_HASH}. Run npm run build, then npm run thesis:verify-release.`)
    }
  }
  return errors
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const generatedIndex = process.argv.indexOf('--generated-dir')
  const generatedDirectory = generatedIndex === -1 ? undefined : process.argv[generatedIndex + 1]
  const errors = validateThesisContent({ allowMissingContent: process.argv.includes('--allow-missing-content'), generatedDirectory, generatedDirectoryRequested: generatedIndex !== -1 })
  if (process.argv.includes('--release')) errors.push(...validateReleaseOutputs())
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 } else console.log('Thesis content validation passed.')
}
