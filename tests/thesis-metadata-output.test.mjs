import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { createServer } from 'node:net'
import { spawn } from 'node:child_process'
import test from 'node:test'

const buildIdPath = new URL('../.next/BUILD_ID', import.meta.url)
const nextBinPath = new URL('../node_modules/next/dist/bin/next', import.meta.url)

function reservePort() {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      server.close((error) => error ? reject(error) : resolve(port))
    })
  })
}

async function waitForResponse(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs
  let lastError
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)
      if (response.ok) return response
      lastError = new Error(`Expected ${url} to return 2xx, received ${response.status}.`)
    } catch (error) {
      lastError = error
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  throw lastError || new Error(`Timed out waiting for ${url}.`)
}

async function stopServer(server) {
  if (server.exitCode !== null || server.signalCode) return
  server.kill('SIGTERM')
  await new Promise((resolve) => {
    const timeout = setTimeout(() => {
      if (server.exitCode === null && !server.signalCode) server.kill('SIGKILL')
      resolve()
    }, 5_000)
    server.once('exit', () => {
      clearTimeout(timeout)
      resolve()
    })
  })
}

test('a production thesis page emits canonical metadata and a PNG social card', async () => {
  assert.ok(existsSync(buildIdPath), 'Run npm run build before checking production thesis metadata.')

  const port = await reservePort()
  const baseUrl = `http://127.0.0.1:${port}`
  const server = spawn(process.execPath, [nextBinPath.pathname, 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: new URL('..', import.meta.url),
    stdio: 'ignore',
  })

  try {
    const chapterResponse = await waitForResponse(`${baseUrl}/thesis/read/the-gap`)
    const chapterHtml = await chapterResponse.text()
    assert.match(chapterHtml, /<link rel="canonical" href="https:\/\/www\.chainfren\.com\/thesis\/read\/the-gap"/)
    assert.match(chapterHtml, /<meta property="og:url" content="https:\/\/www\.chainfren\.com\/thesis\/read\/the-gap"/)
    assert.match(chapterHtml, /<meta property="og:image" content="https:\/\/www\.chainfren\.com\/thesis\/opengraph-image"/)
    assert.doesNotMatch(chapterHtml, /https:\/\/www\.chainfren\.com\/thesis\/thesis\//)

    const imageResponse = await waitForResponse(`${baseUrl}/thesis/opengraph-image`)
    const imageBytes = new Uint8Array(await imageResponse.arrayBuffer())
    assert.match(imageResponse.headers.get('content-type') || '', /^image\/png/)
    assert.ok(imageBytes.byteLength > 1000, 'The social image must contain rendered PNG bytes.')
    assert.deepEqual([...imageBytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10])
  } finally {
    await stopServer(server)
  }
})
