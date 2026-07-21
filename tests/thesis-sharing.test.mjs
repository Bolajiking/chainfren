import test from 'node:test'
import assert from 'node:assert/strict'
import { selectShareUrl, shareThesisChapter } from '../lib/thesis/sharing.mjs'

const data = { title: 'The Gap', url: 'https://chainfren.com/thesis/read/the-gap' }

test('uses native share when it succeeds', async () => {
  const calls = []
  const result = await shareThesisChapter(data, {
    share: async (value) => calls.push(value),
    clipboard: { writeText: async () => calls.push('clipboard') },
  })

  assert.equal(result, 'native')
  assert.deepEqual(calls, [data])
})

test('uses clipboard when native share rejects', async () => {
  const calls = []
  const result = await shareThesisChapter(data, {
    share: async () => { throw new Error('cancelled') },
    clipboard: { writeText: async (url) => calls.push(url) },
  })

  assert.equal(result, 'clipboard')
  assert.deepEqual(calls, [data.url])
})

test('returns manual fallback when clipboard rejects', async () => {
  const result = await shareThesisChapter(data, {
    share: async () => { throw new Error('unavailable') },
    clipboard: { writeText: async () => { throw new Error('denied') } },
  })

  assert.equal(result, 'manual')
})

test('selects the read-only URL field for manual sharing', () => {
  const calls = []
  selectShareUrl({ focus: () => calls.push('focus'), select: () => calls.push('select') })

  assert.deepEqual(calls, ['focus', 'select'])
})
