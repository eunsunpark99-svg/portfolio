import { useEffect, useState } from 'react'
import { featuredWorks } from '../data/featuredWorks.js'

export default function FeaturedWorkSlider({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredWorks.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  const activeWork = featuredWorks[activeIndex]
  const displayIndex = String(activeIndex + 1).padStart(2, '0')
  const total = String(featuredWorks.length).padStart(2, '0')
  const activeHref = `/works/${activeWork.slug}`

  const followWork = (event, href) => {
    event.preventDefault()
    onNavigate(href)
  }

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? featuredWorks.length - 1 : current - 1,
    )
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % featuredWorks.length)
  }

  return (
    <section className="featured-work-slider" aria-label="Featured works">
      <div className="featured-work-frame">
        <a
          className="featured-work-stage"
          href={activeHref}
          onClick={(event) => followWork(event, activeHref)}
          aria-label={`View details for ${activeWork.title}`}
        >
          {featuredWorks.map((work, index) => (
            <img
              key={work.image}
              className={`featured-work-image ${
                index === activeIndex ? 'is-active' : ''
              }`}
              src={work.image}
              alt={work.alt}
              aria-hidden={index === activeIndex ? 'false' : 'true'}
            />
          ))}

          <span className="featured-work-scrim" aria-hidden="true" />

          <span className="featured-work-label">
            <span>Park Eunsun</span>
            <strong>{activeWork.meta}</strong>
          </span>

          <span className="featured-work-title">
            <span>{activeWork.year}</span>
            <strong>{activeWork.title}</strong>
          </span>

          <span className="featured-work-note">
            <span>Archive</span>
            <strong>{activeWork.medium}</strong>
          </span>

          <span className="featured-work-cta">View work</span>
        </a>

        <div className="featured-work-footer">
          <div className="featured-work-caption">
            <a href={activeHref} onClick={(event) => followWork(event, activeHref)}>
              {activeWork.title}
            </a>
            <span>{activeWork.meta}</span>
          </div>

          <div className="featured-work-nav">
            <div className="featured-work-controls" aria-label={`${displayIndex} of ${total}`}>
              <button type="button" onClick={showPrevious}>
                backward
              </button>
              <button
                type="button"
                className="featured-control-arrow"
                onClick={showPrevious}
                aria-label="Previous featured work"
              >
                ◀
              </button>
              <strong>{displayIndex}/{total}</strong>
              <button
                type="button"
                className="featured-control-arrow"
                onClick={showNext}
                aria-label="Next featured work"
              >
                ▶
              </button>
              <button type="button" onClick={showNext}>
                forward
              </button>
            </div>

            <div className="featured-work-numbers" aria-label="Featured work numbers">
              {featuredWorks.map((work, index) => (
                <button
                  key={work.slug}
                  className={index === activeIndex ? 'is-active' : ''}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${work.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
