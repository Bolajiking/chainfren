export const DEFAULT_MAP_CLAIM = 'attention-to-ownership'

export function resolveMapClaim(claims, requestedClaim) {
  return claims.some((claim) => claim.id === requestedClaim) ? requestedClaim : DEFAULT_MAP_CLAIM
}

export const canLoadDesktopMap = (matchesDesktopBreakpoint) => matchesDesktopBreakpoint === true
