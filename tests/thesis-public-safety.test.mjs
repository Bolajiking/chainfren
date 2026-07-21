import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { collectSafetyViolations, validateThesisContent } from '../scripts/validate-thesis-content.mjs'

test('partial validation passes before chapter MDX publication begins', () => {
  assert.deepEqual(validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url) }), [])
})

test('strict validation reports each missing chapter MDX file', () => {
  const errors = validateThesisContent({ allowMissingContent: false, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url) })
  assert.equal(errors.filter((error) => error.includes('Missing chapter MDX')).length, 9)
})

test('strict validation uses the numbered chapter publication paths', () => {
  const errors = validateThesisContent({ allowMissingContent: false, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url) })
  assert(errors.some((error) => error.includes('chapters/01-the-gap.mdx')))
  assert(errors.some((error) => error.includes('chapters/09-build-with-us.mdx')))
})

test('explicit generated thesis directories are recursively safety scanned', () => {
  const generatedDirectory = mkdtempSync(join(tmpdir(), 'chainfren-thesis-generated-'))
  try {
    const excluded = ['come', 'ownity'].join('')
    writeFileSync(join(generatedDirectory, 'publication.txt'), `Public draft ${excluded}`)
    const errors = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory })
    assert(errors.some((error) => error.includes('excluded venture')))
  } finally {
    rmSync(generatedDirectory, { recursive: true, force: true })
  }
})

test('explicit generated directories reject missing, nonexistent, and non-directory paths', () => {
  const generatedDirectory = mkdtempSync(join(tmpdir(), 'chainfren-thesis-generated-'))
  try {
    const missingArgument = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory: '' })
    const nonexistent = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory: join(generatedDirectory, 'missing') })
    const file = join(generatedDirectory, 'not-a-directory.txt')
    writeFileSync(file, 'text')
    const nonDirectory = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory: file })
    assert(missingArgument.some((error) => error.includes('requires a directory')))
    assert(nonexistent.some((error) => error.includes('does not exist')))
    assert(nonDirectory.some((error) => error.includes('is not a directory')))
  } finally { rmSync(generatedDirectory, { recursive: true, force: true }) }
})

test('generated scanning does not follow outside symlinks', () => {
  const root = mkdtempSync(join(tmpdir(), 'chainfren-thesis-generated-'))
  const outside = mkdtempSync(join(tmpdir(), 'chainfren-thesis-outside-'))
  try {
    const excluded = ['come', 'ownity'].join('')
    mkdirSync(join(root, 'nested'))
    writeFileSync(join(outside, 'private.txt'), excluded)
    symlinkSync(outside, join(root, 'nested', 'outside-link'))
    const errors = validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url), generatedDirectory: root })
    assert(!errors.some((error) => error.includes('excluded venture')))
    assert(errors.some((error) => error.includes('skipped symlink')))
  } finally { rmSync(root, { recursive: true, force: true }); rmSync(outside, { recursive: true, force: true }) }
})

test('safety helpers block local paths, sensitive operational terms, and dash punctuation', () => {
  const venture = ['come', 'ownity'].join('')
  const text = ['/Users/example/private', 'second-brain', 'CF-C-17', 'signed revenue', 'runway', 'decision-rights', 'control matrix', 'risk register', 'alpha—beta', venture].join('\n')
  const violations = collectSafetyViolations(text, 'fixture')
  assert.equal(violations.length, 10)
  assert.equal(collectSafetyViolations('generic revenue is not blocked', 'fixture').length, 0)
})
