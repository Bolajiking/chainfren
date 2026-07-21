import { existsSync } from 'node:fs'

const thesisContentDirectory = new URL('../content/chainfren-thesis/', import.meta.url)

// Task 1 has no thesis content yet. Task 2 must replace this bootstrap with
// strict validation once it adds content/chainfren-thesis and its validation data.
if (existsSync(thesisContentDirectory)) {
  console.error(
    'Task 2 thesis content is present, but strict thesis validation has not replaced the Task 1 bootstrap.'
  )
  process.exitCode = 1
} else {
  console.log('Thesis content is not present yet; Task 2 will install strict validation.')
}
