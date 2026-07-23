export const DEFAULT_MAP_CLAIM = 'attention-to-ownership'

export function resolveMapClaim(claims, requestedClaim) {
  const fallback = claims.find((claim) => claim.id === DEFAULT_MAP_CLAIM) || claims[0]
  return claims.some((claim) => claim.id === requestedClaim) ? requestedClaim : fallback?.id || ''
}

export const canLoadDesktopMap = (matchesDesktopBreakpoint) => matchesDesktopBreakpoint === true
