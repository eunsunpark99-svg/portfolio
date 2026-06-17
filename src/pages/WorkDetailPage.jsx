import { getFeaturedWorkBySlug } from '../data/featuredWorks.js'

export default function WorkDetailPage({ route, onNavigate }) {
  const slug = route.replace('/works/', '')
  const work = getFeaturedWorkBySlug(slug)

  const backToWorks = (event) => {
    event.preventDefault()
    onNavigate('/gallery')
  }

  if (!work) {
    return (
      <section className="work-detail-page">
        <header className="work-detail-header">
          <p>Work</p>
          <h1>Work not found</h1>
          <span>The selected work is not available yet.</span>
        </header>
        <a className="work-back-link" href="/gallery" onClick={backToWorks}>
          Back to works
        </a>
      </section>
    )
  }

  return (
    <section className="work-detail-page">
      <nav className="work-detail-nav" aria-label="Work navigation">
        <a href="/gallery" onClick={backToWorks}>
          Back to works
        </a>
      </nav>

      <article className="work-detail-layout">
        <figure className="work-detail-image">
          <img src={work.image} alt={work.alt} />
        </figure>

        <div className="work-detail-copy">
          <header className="work-detail-header">
            <p>{work.meta}</p>
            <h1>{work.title}</h1>
            <span>{work.description}</span>
          </header>

          <dl className="work-detail-meta">
            <div>
              <dt>Year</dt>
              <dd>{work.year}</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>{work.medium}</dd>
            </div>
          </dl>

          <div className="work-detail-notes">
            {work.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        </div>
      </article>
    </section>
  )
}
