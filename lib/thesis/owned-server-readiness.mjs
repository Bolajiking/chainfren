export async function waitForOwnedServerReadiness(child, endpointReady) {
  if (child.exitCode !== null) throw new Error(`Owned thesis server exited before readiness with code ${child.exitCode}`)
  let onExit
  let onError
  const childFailure = new Promise((_, reject) => {
    onExit = (code, signal) => reject(new Error(`Owned thesis server exited before readiness with code ${code}${signal ? ` (${signal})` : ''}`))
    onError = (error) => reject(new Error(`Owned thesis server failed before readiness: ${error.message}`, { cause: error }))
    child.once('exit', onExit)
    child.once('error', onError)
  })
  try {
    const ownershipVerified = await Promise.race([endpointReady, childFailure])
    if (ownershipVerified !== true) {
      // An HTTP 200 from a process that does not hold this child's random token
      // is not usable. Keep listening for the child failure instead of exporting
      // from that unrelated process.
      await childFailure
    }
    if (child.exitCode !== null) throw new Error(`Owned thesis server exited before readiness with code ${child.exitCode}`)
  } finally {
    child.removeListener('exit', onExit)
    child.removeListener('error', onError)
  }
}
