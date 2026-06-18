import { useEffect, useState } from 'react'
import { featuredWorks } from '../data/featuredWorks.js'

export default function FeaturedWorkSlider({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredWorks.length)
    }, 2000)

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

  return (
    <section className="featured-work-slider" aria-label="Featured works">
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
        <span className="featured-work-cta">View work</span>
      </a>

      <div className="featured-work-caption">
        <div>
          <a href={activeHref} onClick={(event) => followWork(event, activeHref)}>
            {activeWork.title}
          </a>
          <span>{activeWork.meta}</span>
        </div>
        <div className="featured-work-progress" aria-label={`${displayIndex} of ${total}`}>
          <span>{displayIndex}</span>
          <div className="featured-work-dots" aria-hidden="true">
            {featuredWorks.map((work, index) => (
              <button
                key={work.image}
                className={index === activeIndex ? 'is-active' : ''}
                type="button"
                tabIndex={-1}
              />
            ))}
          </div>
          <span>{total}</span>
        </div>
      </div>
    </section>
  )
}
