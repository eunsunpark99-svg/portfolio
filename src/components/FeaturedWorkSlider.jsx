import { useEffect, useState } from 'react'

const featuredWorks = [
  {
    title: 'Line Tape Installation',
    meta: 'Spatial drawing / exhibition archive',
    image: '/images/about-feature.jpg',
    alt: 'Yellow installation wall with black line tape and a standing figure silhouette.',
  },
  {
    title: 'Image Study',
    meta: 'Artwork documentation',
    image: '/images/gallery-feature.jpg',
    alt: 'Blue cup and spoon artwork preview.',
  },
  {
    title: 'Video Archive',
    meta: 'Moving image / project preview',
    image: '/images/video-feature.jpg',
    alt: 'Video preview image with Korean title text.',
  },
]

export default function FeaturedWorkSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredWorks.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [])

  const activeWork = featuredWorks[activeIndex]
  const displayIndex = String(activeIndex + 1).padStart(2, '0')
  const total = String(featuredWorks.length).padStart(2, '0')

  return (
    <section className="featured-work-slider" aria-label="Featured works">
      <div className="featured-work-stage">
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
      </div>

      <div className="featured-work-caption">
        <div>
          <p>{activeWork.title}</p>
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
