// The italic Inter face is only rendered by the marketing surfaces. Preloading
// it from the root layout made every route pay for it, including routes that
// use Georgia for their italic accents and never request the file.
//
// Surfaces that render Inter italic include this component so the face still
// arrives in the same critical batch as the HTML, which is what keeps the
// no-FOUT guarantee that font-display: block relies on. Surfaces that do not
// render Inter italic simply leave it out.
export default function ItalicFontPreload() {
  return (
    <link
      rel="preload"
      href="/fonts/InterVariable-Italic.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  )
}
