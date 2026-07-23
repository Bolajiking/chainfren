'use client'

import { useEffect } from 'react'

export default function ClaimDeepLink() {
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('claim')
    if (!requested) return
    const claim = document.getElementById(`claim-${requested}`)
    if (!claim) return
    const group = claim.closest('details')
    if (group) group.open = true
    claim.scrollIntoView({ block: 'center' })
    const target = claim.querySelector('a')
    if (target) target.focus({ preventScroll: true })
  }, [])

  return null
}
