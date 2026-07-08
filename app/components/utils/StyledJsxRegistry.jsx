'use client'
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

// App Router does not inline styled-jsx styles during SSR on its own. Without
// this registry, every client component that uses `<style jsx>` (the nav, the
// agency/media pages, etc.) ships its markup with no CSS in the server HTML,
// so pages flash unstyled on load/reload until hydration injects the styles.
// This collects the styles during the server render and flushes them into the
// streamed HTML head, so the first paint is fully styled — no FOUC.
export default function StyledJsxRegistry({ children }) {
  const [registry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = registry.styles()
    registry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={registry}>{children}</StyleRegistry>
}
