#!/bin/bash
# Subset the self-hosted Inter variable faces to the character set this site renders.
#
# The full Inter variable files ship ~2,850 mapped glyphs each. This site renders
# fewer than 100 distinct characters, but both faces are preloaded and declared
# font-display: block, so every visitor waits for the whole payload before any
# text paints. Subsetting keeps the exact same typeface, both variable axes
# (opsz, wght), and every OpenType feature the CSS uses, at about a fifth of the
# bytes.
#
# Run this after replacing public/fonts/*.woff2 with a newer Inter release.
# Requires fonttools and brotli:
#   python3 -m venv .venv && .venv/bin/pip install fonttools brotli
#
# Usage: scripts/subset-fonts.sh <path-to-pyftsubset> <path-to-original-fonts-dir>
set -eu

PYFTSUBSET=${1:?path to pyftsubset}
SRC=${2:?directory holding the original InterVariable woff2 files}
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/fonts"

# Latin, Latin Extended-A, combining marks and Latin Extended Additional (Yoruba
# and other African diacritics), general punctuation, super/subscripts, currency
# (naira U+20A6), letterlike symbols, arrows, and the individual math operators
# the site uses. Verified against every rendered page: no character falls outside
# this set.
RANGES='U+0000-00FF,U+0100-017F,U+0300-036F,U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20A0-20BF,U+2100-214F,U+2190-21FF,U+2202,U+2206,U+220F,U+2211-2212,U+2215,U+221A,U+221E,U+222B,U+2248,U+2260,U+2264-2265,U+FEFF,U+FFFD'

# Kerning, ligatures, contextual alternates, mark positioning for diacritics,
# localised forms, and tabular numbers, which globals.css requests directly.
FEATURES='kern,liga,clig,calt,ccmp,mark,mkmk,locl,rlig,tnum,rvrn,dnom,numr'

for face in InterVariable InterVariable-Italic; do
  "$PYFTSUBSET" "$SRC/$face.woff2" \
    --output-file="$DEST/$face.woff2" \
    --flavor=woff2 \
    --unicodes="$RANGES" \
    --layout-features="$FEATURES" \
    --name-IDs='*' \
    --notdef-outline \
    --recommended-glyphs
  printf '%-26s %8s -> %8s bytes\n' "$face.woff2" \
    "$(stat -f%z "$SRC/$face.woff2")" "$(stat -f%z "$DEST/$face.woff2")"
done
