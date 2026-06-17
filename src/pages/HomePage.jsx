import ContentTabs from '../components/ContentTabs.jsx'
import FeaturedWorkSlider from '../components/FeaturedWorkSlider.jsx'
import { siteContent } from '../data/siteContent.js'
import { getCopy } from '../data/translations.js'

export default function HomePage({ language, onNavigate }) {
  const copy = getCopy(language)

  const followLink = (event, href) => {
    event.preventDefault()
    onNavigate(href)
  }

  return (
    <section className="artist-home">
      <FeaturedWorkSlider onNavigate={onNavigate} />

      <section className="artist-hero" aria-labelledby="artist-title">
        <aside className="artist-intro">
          <h1 id="artist-title">{copy.home.title}</h1>
          <p>{copy.home.description}</p>
          <nav className="artist-index" aria-label="Artist sections">
            <a href="/gallery" onClick={(event) => followLink(event, '/gallery')}>
              {copy.nav['/gallery']}
            </a>
            <a href="/about" onClick={(event) => followLink(event, '/about')}>
              {copy.nav['/about']}
            </a>
            <a
              href="/gallery/exhibitions"
              onClick={(event) => followLink(event, '/gallery/exhibitions')}
            >
              {copy.nav['/gallery/exhibitions']}
            </a>
            <a
              href="/gallery/video"
              onClick={(event) => followLink(event, '/gallery/video')}
            >
              {copy.nav['/gallery/video']}
            </a>
            <a href="/contact" onClick={(event) => followLink(event, '/contact')}>
              {copy.nav['/contact']}
            </a>
          </nav>
        </aside>

        <figure className="artist-feature">
          <img
            src="/images/about-feature.jpg"
            alt="Line tape installation wall with a figure silhouette."
          />
          <figcaption>
            <strong>{copy.home.captionTitle}</strong>
            <span>{copy.home.caption}</span>
          </figcaption>
        </figure>
      </section>

      <ContentTabs language={language} tabs={siteContent.tabs} />
    </section>
  )
}
