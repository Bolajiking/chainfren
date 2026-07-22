import { createHash } from 'node:crypto'
import { mkdir, readFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { THESIS_CONTENT_HASH } from '../lib/thesis/content-hash.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))
const output = join(root, 'public/artifacts/Chainfren-Thesis.pdf')
const port = 3099
const baseUrl = `http://127.0.0.1:${port}`
const ownsServer = process.argv.includes('--start-server')
let server

const sha256 = async (path) => createHash('sha256').update(await readFile(path)).digest('hex')
async function waitForHealth() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try { if ((await fetch(`${baseUrl}/api/health`)).ok) return } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`Timed out waiting for ${baseUrl}/api/health`)
}

try {
  if (ownsServer) {
    server = spawn('npm', ['start', '--', '-p', String(port)], { cwd: root, stdio: 'inherit' })
    await waitForHealth()
  }
  await mkdir(join(root, 'public/artifacts'), { recursive: true })
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.goto(`${baseUrl}/thesis/print`, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'print' })
    await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true })
  } finally { await browser.close() }
  console.log(`Source SHA-256: ${THESIS_CONTENT_HASH}`)
  console.log(`PDF SHA-256: ${await sha256(output)}`)
  console.log(`PDF: ${output}`)
} finally {
  if (server && !server.killed) server.kill('SIGTERM')
}
