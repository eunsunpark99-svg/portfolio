const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`

export const featuredWorks = [
  {
    slug: 'line-tape-installation',
    title: 'Line Tape Installation',
    meta: 'Spatial drawing / exhibition archive',
    year: '2026',
    medium: 'Line tape, wall drawing, installation documentation',
    image: assetPath('images/about-feature.jpg'),
    alt: 'Yellow installation wall with black line tape and a standing figure silhouette.',
    description:
      'A spatial drawing project that uses line tape to trace, divide, and activate the architectural surface.',
    details: [
      'The work treats the wall as a drawing field and the exhibition space as an extended surface.',
      'Lines move between image, installation, and documentation, allowing viewers to read the space through rhythm and boundary.',
      'This page can later hold full captions, venue information, installation views, and related texts.',
    ],
  },
  {
    slug: 'image-study',
    title: 'Image Study',
    meta: 'Artwork documentation',
    year: '2026',
    medium: 'Photography, image archive',
    image: assetPath('images/gallery-feature.jpg'),
    description:
      'A selected image archive for introducing visual studies, still images, and project documentation.',
    details: [
      'This section can be used for still images, documentation shots, and selected portfolio works.',
      'Each image entry can connect to a larger archive with captions, dates, materials, and exhibition context.',
      'The current image is a placeholder for building the browsing system before final works are uploaded.',
    ],
  },
  {
    slug: 'video-archive',
    title: 'Video Archive',
    meta: 'Moving image / project preview',
    year: '2026',
    medium: 'Video, exhibition walkthrough, digital archive',
    image: assetPath('images/video-feature.jpg'),
    alt: 'Video preview image with Korean title text.',
    description:
      'A video-oriented archive for moving image works, walkthroughs, interviews, and process documentation.',
    details: [
      'Video entries can introduce exhibition views, process records, interviews, and short visual essays.',
      'The page structure is prepared for embedded videos, stills, captions, and links to external platforms.',
      'This preview keeps the portfolio active even before the full video archive is finalized.',
    ],
  },
]

export const getFeaturedWorkBySlug = (slug) =>
  featuredWorks.find((work) => work.slug === slug)
