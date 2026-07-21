import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { THESIS_CONTENT_VERSION, PUBLIC_CTAS, PUBLIC_PRODUCT_MATURITY, PUBLIC_INITIATIVE_MATURITY } from '../content/chainfren-thesis/public-config.mjs'
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
const scanGeneratedDirectory = (directory, errors, visited = new Set()) => {
  if (!directory) { errors.push('Generated thesis scan requires a directory'); return }
  if (!existsSync(directory)) { errors.push(`Generated thesis directory does not exist: ${directory}`); return }
  const root = resolve(directory)
  const rootStat = lstatSync(root)
  if (rootStat.isSymbolicLink()) { errors.push(`Generated thesis scan skipped symlink: ${root}`); return }
  if (!rootStat.isDirectory()) { errors.push(`Generated thesis path is not a directory: ${root}`); return }
  if (visited.has(root)) return
  visited.add(root)
  for (const name of readdirSync(root)) {
    const path = resolve(root, name)
    const entry = lstatSync(path)
    if (entry.isSymbolicLink()) errors.push(`Generated thesis scan skipped symlink: ${path}`)
    else if (entry.isDirectory()) scanGeneratedDirectory(path, errors, visited)
    else if (textArtifact(path)) errors.push(...collectSafetyViolations(readFileSync(path, 'utf8'), path))
  }
}

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
  } catch (error) { errors.push(error.message) }
  const scannedPaths = new Set()
  for (const chapter of THESIS_MANIFEST) {
    const path = chapterPath(contentDirectory, chapter)
    if (!existsSync(path)) { if (!allowMissingContent) errors.push(`Missing chapter MDX: chapters/${chapter.id}-${chapter.slug}.mdx`); continue }
    scannedPaths.add(path)
    errors.push(...collectSafetyViolations(readFileSync(path, 'utf8'), path))
  }
  if (existsSync(contentDirectory)) {
    for (const name of readdirSync(contentDirectory)) {
      const path = `${fileURLToPath(contentDirectory)}${name}`
      if (!scannedPaths.has(path) && /\.(?:mjs|mdx|txt)$/.test(name)) errors.push(...collectSafetyViolations(readFileSync(path, 'utf8'), name))
    }
  }
  if (generatedDirectoryRequested) scanGeneratedDirectory(generatedDirectory, errors)
  return errors
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const generatedIndex = process.argv.indexOf('--generated-dir')
  const generatedDirectory = generatedIndex === -1 ? undefined : process.argv[generatedIndex + 1]
  const errors = validateThesisContent({ allowMissingContent: process.argv.includes('--allow-missing-content'), generatedDirectory, generatedDirectoryRequested: generatedIndex !== -1 })
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 } else console.log('Thesis content validation passed.')
}
