import PublicCitationList from './PublicCitationList'

export default function ChapterArticle({ chapter, Content, citations = [] }) {
  if (!chapter || !Content) return null

  return (
    <article aria-labelledby={`chapter-${chapter.slug}`}>
      <header>
        <p>{chapter.lens}</p>
        <h1 id={`chapter-${chapter.slug}`}>{chapter.title}</h1>
        <p>{chapter.summary}</p>
      </header>
      <Content />
      <PublicCitationList citations={citations} />
    </article>
  )
}
