import test from 'node:test'
import assert from 'node:assert/strict'

import { PUBLIC_PRODUCT_MATURITY } from '../content/chainfren-thesis/public-config.mjs'
import { normalizeMaturityStage, normalizePublicCitations } from '../lib/thesis/public-presentation.mjs'

test('maturity normalization accepts approved public records and keys only', () => {
  const record = PUBLIC_PRODUCT_MATURITY[0]

  assert.deepEqual(normalizeMaturityStage(record), { label: record.label, maturity: record.maturity })
  assert.deepEqual(normalizeMaturityStage(record.id), { label: record.label, maturity: record.maturity })
  assert.equal(normalizeMaturityStage({ ...record }), null)
  assert.equal(normalizeMaturityStage({ label: 'Anything', maturity: 'live' }), null)
  assert.equal(normalizeMaturityStage('anything'), null)
})

test('citation normalization returns rendering-ready public records and rejects forged data', () => {
  const registered = {
    id: 'public-example', title: 'Public example', publisher: 'Chainfren', url: 'https://example.com/source',
    publishedAt: '2026-01-01', accessedAt: '2026-01-02', claimIds: [],
  }

  assert.deepEqual(normalizePublicCitations([registered], [registered]), [{ title: registered.title, publisher: registered.publisher, url: registered.url }])
  assert.deepEqual(normalizePublicCitations([{ ...registered }], [registered]), [])
  assert.deepEqual(normalizePublicCitations([{ ...registered, url: 'http://example.com/source' }], [{ ...registered, url: 'http://example.com/source' }]), [])
})
