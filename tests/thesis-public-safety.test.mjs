import test from 'node:test'
import assert from 'node:assert/strict'

import { collectSafetyViolations, validateThesisContent } from '../scripts/validate-thesis-content.mjs'

test('partial validation passes before chapter MDX publication begins', () => {
  assert.deepEqual(validateThesisContent({ allowMissingContent: true, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url) }), [])
})

test('strict validation reports each missing chapter MDX file', () => {
  const errors = validateThesisContent({ allowMissingContent: false, contentDirectory: new URL('../content/chainfren-thesis/', import.meta.url) })
  assert.equal(errors.filter((error) => error.includes('Missing chapter MDX')).length, 9)
})

test('safety helpers block local paths, sensitive operational terms, and dash punctuation', () => {
  const venture = ['Chain', 'fren', ' Ventures'].join('')
  const text = ['/Users/example/private', 'second-brain', 'CF-C-17', 'signed revenue', 'runway', 'decision-rights', 'control matrix', 'risk register', 'alpha—beta', venture].join('\n')
  const violations = collectSafetyViolations(text, 'fixture')
  assert.equal(violations.length, 10)
  assert.equal(collectSafetyViolations('generic revenue is not blocked', 'fixture').length, 0)
})
