import ContentTabs from '../components/ContentTabs.jsx'
import { siteContent } from '../data/siteContent.js'

export default function HomePage() {
  return (
    <section className="artist-home">
      <section className="artist-hero" aria-labelledby="artist-title">
        <aside className="artist-intro">
          <p className="artist-kicker">Portfolio</p>
          <h1 id="artist-title">{siteContent.title}</h1>
          <p>{siteContent.description}</p>
          <nav className="artist-index" aria-label="Artist sections">
            <a href="/gallery">Works</a>
            <a href="/about">Biography</a>
            <a href="/gallery/exhibitions">Exhibitions</a>
            <a href="/gallery/video">Video</a>
            <a href="mailto:park.eunsun.artist@gmail.com">Contact</a>
          </nav>
        </aside>

        <figure className="artist-feature">
          <img
            src="/images/about-feature.jpg"
            alt="Line tape installation wall with a figure silhouette."
          />
          <figcaption>
            <strong>Park Eunsun</strong>
            <span>Line tape installation, spatial drawing and exhibition archive</span>
          </figcaption>
        </figure>
      </section>

      <ContentTabs tabs={siteContent.tabs} />
    </section>
  )
}
