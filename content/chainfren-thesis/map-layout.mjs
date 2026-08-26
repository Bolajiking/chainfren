export const THESIS_MAP_GEOMETRY = {
  canvas: { width: 1600, height: 900 },
  node: { width: 240, height: 60, edgePadding: 8 },
  // At the rendered uppercase font size, seven pixels per character covers the
  // longest relation word. The remaining space protects the label and arrowhead.
  label: { characterWidth: 7, horizontalPadding: 16, height: 18, clearance: 18, arrowClearance: 20 },
}

export const THESIS_MAP_LAYOUT = {
  'extractive-systems': { x: 30, y: 200 }, 'african-value-gap': { x: 30, y: 0 },
  'rented-relationships': { x: 30, y: 430 }, 'african-attention-value': { x: 30, y: 670 },
  'blockchain-open-rails': { x: 1330, y: 435 }, 'chainfren-mission': { x: 680, y: 0 },
  'distribution-first': { x: 430, y: 200 }, 'attention-to-participation': { x: 430, y: 670 },
  'tivi-flagship': { x: 930, y: 200 }, 'participation-to-ownership': { x: 930, y: 670 },
  'ownership-to-value': { x: 680, y: 435 }, 'african-built-ecosystem': { x: 680, y: 670 },
}

export const THESIS_MAP_ROUTES = {
  'extractive-systems:causes:african-value-gap': { points: [{ x: 150, y: 200 }, { x: 150, y: 60 }], labelSegment: 0 },
  'extractive-systems:causes:rented-relationships': { points: [{ x: 150, y: 260 }, { x: 150, y: 430 }], labelSegment: 0 },
  'rented-relationships:constrains:african-attention-value': { points: [{ x: 150, y: 490 }, { x: 150, y: 670 }], labelSegment: 0 },
  'african-attention-value:enables:attention-to-participation': { points: [{ x: 270, y: 700 }, { x: 430, y: 700 }], labelSegment: 0 },
  'blockchain-open-rails:enables:participation-to-ownership': { points: [{ x: 1450, y: 495 }, { x: 1450, y: 590 }, { x: 1200, y: 590 }, { x: 1200, y: 700 }, { x: 1170, y: 700 }], labelSegment: 1 },
  'distribution-first:enables:attention-to-participation': { points: [{ x: 550, y: 260 }, { x: 550, y: 670 }], labelSegment: 0 },
  'attention-to-participation:enables:participation-to-ownership': { points: [{ x: 550, y: 730 }, { x: 550, y: 790 }, { x: 1050, y: 790 }, { x: 1050, y: 730 }], labelSegment: 1 },
  'participation-to-ownership:enables:ownership-to-value': { points: [{ x: 1000, y: 670 }, { x: 1000, y: 520 }, { x: 920, y: 520 }, { x: 920, y: 465 }], labelSegment: 0 },
  'ownership-to-value:enables:african-built-ecosystem': { points: [{ x: 680, y: 465 }, { x: 640, y: 465 }, { x: 640, y: 600 }, { x: 800, y: 600 }, { x: 800, y: 670 }], labelSegment: 2 },
  'chainfren-mission:enables:distribution-first': { points: [{ x: 680, y: 30 }, { x: 640, y: 30 }, { x: 640, y: 170 }, { x: 550, y: 170 }, { x: 550, y: 200 }], labelSegment: 1 },
  'chainfren-mission:enables:tivi-flagship': { points: [{ x: 920, y: 30 }, { x: 960, y: 30 }, { x: 960, y: 170 }, { x: 1050, y: 170 }, { x: 1050, y: 200 }], labelSegment: 1 },
  'tivi-flagship:enables:participation-to-ownership': { points: [{ x: 1100, y: 260 }, { x: 1100, y: 670 }], labelSegment: 0 },
  'blockchain-open-rails:enables:tivi-flagship': { points: [{ x: 1450, y: 435 }, { x: 1450, y: 340 }, { x: 1200, y: 340 }, { x: 1200, y: 230 }, { x: 1170, y: 230 }], labelSegment: 1 },
  'distribution-first:enables:tivi-flagship': { points: [{ x: 670, y: 230 }, { x: 930, y: 230 }], labelSegment: 0 },
  'tivi-flagship:enables:ownership-to-value': { points: [{ x: 930, y: 230 }, { x: 800, y: 435 }], labelSegment: 0 },
}
