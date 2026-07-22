'use client'

import { useEffect, useState } from 'react'

export default function OwnershipMapLoader(props) {
  const [DesktopMap, setDesktopMap] = useState(null)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 960px)')
    let active = true
    const load = () => {
      if (query.matches && !DesktopMap) import('./OwnershipMapDesktop').then((module) => active && setDesktopMap(() => module.default))
    }
    load()
    query.addEventListener('change', load)
    return () => { active = false; query.removeEventListener('change', load) }
  }, [DesktopMap])

  return DesktopMap ? <DesktopMap {...props} /> : null
}
