import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  THESIS_CONTENT_VERSION,
  THESIS_PROGRESS_STORAGE_KEY,
  createThesisProgress,
  readThesisProgress,
  writeThesisProgress,
} from '../lib/thesis/progress.mjs'

const chapters = [
  { slug: 'the-gap', title: 'The Gap' },
  { slug: 'the-company', title: 'The Company' },
]

test('creates the minimal versioned thesis progress record', () => {
  const progress = createThesisProgress('the-gap', new Date('2026-07-21T12:00:00.000Z'))

  assert.deepEqual(progress, {
    chapterSlug: 'the-gap',
    updatedAt: '2026-07-21T12:00:00.000Z',
    contentVersion: THESIS_CONTENT_VERSION,
  })
  assert.deepEqual(Object.keys(progress), ['chapterSlug', 'updatedAt', 'contentVersion'])
})

test('reads only current progress for a known chapter', () => {
  const storage = {
    getItem: () => JSON.stringify({ chapterSlug: 'the-company', updatedAt: '2026-07-21T12:00:00.000Z', contentVersion: THESIS_CONTENT_VERSION }),
  }

  assert.deepEqual(readThesisProgress(storage, chapters), { chapterSlug: 'the-company', updatedAt: '2026-07-21T12:00:00.000Z', contentVersion: THESIS_CONTENT_VERSION })
})

test('rejects unavailable storage, malformed data, unknown chapters, and stale versions', () => {
  assert.equal(readThesisProgress(null, chapters), null)
  assert.equal(readThesisProgress({ getItem: () => '{broken' }, chapters), null)
  assert.equal(readThesisProgress({ getItem: () => JSON.stringify({ chapterSlug: 'missing', updatedAt: '2026-07-21T12:00:00.000Z', contentVersion: THESIS_CONTENT_VERSION }) }, chapters), null)
  assert.equal(readThesisProgress({ getItem: () => JSON.stringify({ chapterSlug: 'the-gap', updatedAt: '2026-07-21T12:00:00.000Z', contentVersion: '2025.1' }) }, chapters), null)
})

test('writes progress without throwing when storage is unavailable or rejects writes', () => {
  assert.equal(writeThesisProgress(null, 'the-gap', new Date('2026-07-21T12:00:00.000Z')), false)
  assert.equal(writeThesisProgress({ setItem: () => { throw new Error('blocked') } }, 'the-gap', new Date('2026-07-21T12:00:00.000Z')), false)

  let written
  assert.equal(writeThesisProgress({ setItem: (key, value) => { written = { key, value } } }, 'the-gap', new Date('2026-07-21T12:00:00.000Z')), true)
  assert.equal(written.key, THESIS_PROGRESS_STORAGE_KEY)
  assert.deepEqual(JSON.parse(written.value), createThesisProgress('the-gap', new Date('2026-07-21T12:00:00.000Z')))
})

test('progress UI keeps browser APIs inside client boundaries', () => {
  const root = new URL('..', import.meta.url)
  const source = (path) => readFileSync(new URL(path, root), 'utf8')

  assert.match(source('app/(mainpage)/thesis/components/ResumeReading.jsx'), /['"]use client['"]\;?/)
  assert.match(source('app/(mainpage)/thesis/components/ReaderChrome.jsx'), /ReadingProgress/)
  assert.match(source('app/(mainpage)/thesis/components/ShareControl.jsx'), /['"]use client['"]\;?/)
  assert.match(source('app/(mainpage)/thesis/components/ShareControl.jsx'), /navigator\.share/)
  assert.match(source('app/(mainpage)/thesis/components/ShareControl.jsx'), /navigator\.clipboard/)
  assert.match(source('app/(mainpage)/thesis/components/ShareControl.jsx'), /urlField\.current\?\.select\(\)/)
})
