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
    await Promise.race([endpointReady, childFailure])
    // A different process can already answer the print URL while this child is
    // still about to report EADDRINUSE. Give the spawned process one event-loop
    // turn to surface that failure before accepting readiness as its own.
    await Promise.race([new Promise((resolve) => setImmediate(resolve)), childFailure])
    if (child.exitCode !== null) throw new Error(`Owned thesis server exited before readiness with code ${child.exitCode}`)
  } finally {
    child.removeListener('exit', onExit)
    child.removeListener('error', onError)
  }
}
