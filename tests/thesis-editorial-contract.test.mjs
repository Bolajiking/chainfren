import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(new URL('..', import.meta.url).pathname)
const thesisRoot = resolve(root, 'content/chainfren-thesis')
const chapter = (name) => readFileSync(resolve(thesisRoot, 'chapters', name), 'utf8')

const chapters = {
  gap: chapter('01-the-gap.mdx'),
  trap: chapter('02-the-trap.mdx'),
  unlock: chapter('03-the-unlock.mdx'),
  thesis: chapter('04-the-thesis.mdx'),
}

const assertNames = (source, terms) => {
  for (const term of terms) assert.match(source, new RegExp(`\\b${term}\\b`, 'i'))
}

const manuscriptPaths = [
  resolve(thesisRoot, 'short-read.mdx'),
  ...[
    '01-the-gap.mdx',
    '02-the-trap.mdx',
    '03-the-unlock.mdx',
    '04-the-thesis.mdx',
    '05-the-company.mdx',
    '06-what-we-build.mdx',
    '07-how-we-work.mdx',
    '08-the-road-ahead.mdx',
    '09-build-with-us.mdx',
  ].map((name) => resolve(thesisRoot, 'chapters', name)),
]

test('the gap names every contributor to African attention', () => {
  assertNames(chapters.gap, ['creators', 'brands', 'audiences'])
  assert.match(chapters.gap, /African attention/i)
  assert.match(chapters.gap, /African control/i)
})

test('the trap describes extraction as a system, wherever it is based', () => {
  assertNames(chapters.trap, ['platforms', 'middlemen', 'systems'])
  assert.match(chapters.trap, /extract\w*/i)
  assert.match(chapters.trap, /foreign or African/i)
  assertNames(chapters.trap, ['discovery', 'identity', 'data', 'relationships', 'distribution', 'payment'])
  assert.match(chapters.trap, /(?:does not|doesn't|need not|requires? no)\s+(?:require\s+)?bad (?:individual )?intent/i)
})

test('the unlock gives blockchain a practical and non-speculative purpose', () => {
  assert.match(chapters.unlock.split(/\n\s*\n/, 1)[0], /blockchain/i)
  assertNames(chapters.unlock, ['payments', 'identity', 'participation', 'settlement', 'portability'])
  assert.match(chapters.unlock, /transparent settlement/i)
  assert.match(chapters.unlock, /speculation is not (?:the )?(?:purpose|mission)/i)
  assertNames(chapters.unlock, ['devices', 'payment', 'languages', 'communities'])
})

test('the thesis states the mission and defines custodianship', () => {
  assert.match(chapters.thesis, /Chainfren exists to enable Africans to own the full value their attention generates on the internet\./i)
  assertNames(chapters.thesis, ['identity', 'relationships', 'data', 'distribution', 'participation', 'economic value'])
  assert.match(chapters.thesis, /right to leave/i)
})

test('the mission is presented as work to do, not an achieved ownership outcome', () => {
  const target = Object.values(chapters).join('\n')
  assert.doesNotMatch(target, /(?:Africans?|creators?|brands?|audiences?|communities?|people|we)\s+(?:already|now|currently)\s+(?:own|owns|control|controls|have ownership)/i)
  assert.doesNotMatch(target, /ownership\s+(?:is|has been)\s+(?:achieved|complete|completed|secured)/i)
})

test('the public manuscript contains no uncited numeral claims', () => {
  for (const path of manuscriptPaths) {
    assert.doesNotMatch(readFileSync(path, 'utf8'), /\d/, `${path} contains a numeral without an exact claim-level dated public citation`)
  }
})
