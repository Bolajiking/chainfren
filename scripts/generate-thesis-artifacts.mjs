import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
for (const [command, args] of [[process.execPath, ['scripts/hash-thesis-content.mjs']], [process.execPath, ['scripts/generate-thesis-pdf.mjs', '--start-server']]]) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit' })
    child.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`${join(command, ...args)} exited ${code}`)))
  })
}
