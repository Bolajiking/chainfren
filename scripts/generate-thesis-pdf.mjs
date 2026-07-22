import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { THESIS_CONTENT_HASH } from '../content/chainfren-thesis/generated-content-hash.mjs'
import { waitForOwnedServerReadiness } from '../lib/thesis/owned-server-readiness.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))
const defaultOutput = join(root, 'public/downloads/chainfren-thesis-2026.1.pdf')
const port = 3099
const baseUrl = `http://127.0.0.1:${port}`
const ownsServer = process.argv.includes('--start-server')
const arg = (name, fallback) => process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : fallback
const output = arg('--output', defaultOutput)
const printUrl = arg('--url', ownsServer ? `${baseUrl}/thesis/print` : 'http://127.0.0.1:3099/thesis/print')
let server

const sha256 = async (path) => createHash('sha256').update(await readFile(path)).digest('hex')
async function waitForHealth() {
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    try { if ((await fetch(`${baseUrl}/thesis/print`)).ok) return } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`Timed out waiting for ${baseUrl}/thesis/print after 30 seconds`)
}
async function waitForExit(child, timeout) {
  if (child.exitCode !== null) return true
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      child.removeListener('exit', onExit)
      resolve(false)
    }, timeout)
    function onExit() {
      clearTimeout(timer)
      resolve(true)
    }
    child.once('exit', onExit)
  })
}
function sendSignal(signal) {
  try {
    if (!server.kill(signal)) throw new Error(`managed thesis server rejected ${signal}`)
  } catch (error) {
    throw new Error(`Could not stop managed thesis server with ${signal}: ${error.message}`, { cause: error })
  }
}
async function stopServer() {
  if (!server || server.exitCode !== null) return
  sendSignal('SIGTERM')
  if (await waitForExit(server, 5_000)) return
  sendSignal('SIGKILL')
  if (!await waitForExit(server, 5_000)) throw new Error('Managed thesis server did not exit within 5 seconds of SIGKILL')
}

let primaryError
try {
  if (ownsServer) {
    server = spawn('npm', ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', '3099'], { cwd: root, stdio: 'inherit' })
    await waitForOwnedServerReadiness(server, waitForHealth())
  }
  await mkdir(join(root, 'public/downloads'), { recursive: true })
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page.goto(printUrl, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'print' })
    await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true })
  } finally { await browser.close() }
  console.log(`Source SHA-256: ${THESIS_CONTENT_HASH}`)
  console.log(`PDF SHA-256: ${await sha256(output)}`)
  await writeFile(join(root, 'public/downloads/chainfren-thesis-2026.1.sha256'), `Source SHA-256: ${THESIS_CONTENT_HASH}\nPDF SHA-256: ${await sha256(output)}\n`)
  console.log(`PDF: ${output}`)
} catch (error) {
  primaryError = error
  throw error
} finally {
  try {
    await stopServer()
  } catch (cleanupError) {
    const message = `Managed thesis server cleanup failed: ${cleanupError.message}`
    if (primaryError) console.error(message)
    else throw new Error(message, { cause: cleanupError })
  }
}
