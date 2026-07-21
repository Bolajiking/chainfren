export async function shareThesisChapter(data, browserNavigator) {
  try {
    if (browserNavigator?.share) {
      await browserNavigator.share(data)
      return 'native'
    }
  } catch {
    // A declined native share should still offer the next safe fallback.
  }

  try {
    if (browserNavigator?.clipboard?.writeText) {
      await browserNavigator.clipboard.writeText(data.url)
      return 'clipboard'
    }
  } catch {
    // Clipboard permissions are optional; expose a selectable URL instead.
  }

  return 'manual'
}

export const selectShareUrl = (field) => {
  field?.focus()
  field?.select()
}
