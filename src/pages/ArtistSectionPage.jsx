const sectionContent = {
  '/gallery': {
    kicker: 'Works',
    title: 'Selected Works',
    description:
      'A focused archive of image-based works, installation views, spatial drawings, and visual studies.',
    image: '/images/gallery-feature.jpg',
    imageAlt: 'Blue cup and spoon artwork preview.',
    items: [
      {
        title: 'Line and Space',
        meta: 'Installation / spatial drawing',
        text: 'Works that use lines, surface, and architectural space as active materials.',
      },
      {
        title: 'Image Studies',
        meta: 'Photography / digital archive',
        text: 'A developing visual archive for documenting works, exhibitions, and site-specific projects.',
      },
      {
        title: 'Portfolio Archive',
        meta: 'Ongoing',
        text: 'This section will expand as final artwork images and captions are added.',
      },
    ],
  },
  '/about': {
    kicker: 'Biography',
    title: 'Biography',
    description:
      'Park Eunsun is an artist, curator, and web/video maker working across visual art, exhibition planning, and digital presentation.',
    image: '/images/about-feature.jpg',
    imageAlt: 'Yellow installation wall with black line tape and figure silhouette.',
    items: [
      {
        title: 'Practice',
        meta: 'Artist · Curator · Web & Video',
        text: 'Her practice connects installation, documentation, online presentation, and exhibition-making.',
      },
      {
        title: 'Approach',
        meta: 'Spatial and visual thinking',
        text: 'The site is being shaped as an international portfolio that can hold artworks, writing, video, and curatorial projects.',
      },
    ],
  },
  '/gallery/exhibitions': {
    kicker: 'Exhibitions',
    title: 'Exhibitions',
    description:
      'Selected solo, group, and curated exhibition projects will be organized here with dates, venues, and documentation.',
    image: '/images/about-feature.jpg',
    imageAlt: 'Installation documentation preview.',
    items: [
      {
        title: 'Janghang 1931',
        meta: 'Curatorial / exhibition project',
        text: 'A developing exhibition archive connecting place, memory, and visual practice.',
      },
      {
        title: 'Art Park',
        meta: 'Solo and curated exhibitions',
        text: 'Documentation and exhibition records will be added as the portfolio grows.',
      },
    ],
  },
  '/gallery/video': {
    kicker: 'Video',
    title: 'Video',
    description:
      'Video works, exhibition walkthroughs, interviews, and process documentation will be collected here.',
    image: '/images/video-feature.jpg',
    imageAlt: 'Video preview image with Korean title text.',
    items: [
      {
        title: 'Exhibition Video',
        meta: 'Walkthrough / archive',
        text: 'A place for documenting installations and exhibition views through moving image.',
      },
      {
        title: 'Studio Process',
        meta: 'Video documentation',
        text: 'Process videos and short-form visual essays can be added here.',
      },
    ],
  },
  '/contact': {
    kicker: 'Contact',
    title: 'Contact',
    description:
      'For exhibitions, collaborations, curatorial projects, and portfolio inquiries.',
    image: '/images/gallery-feature.jpg',
    imageAlt: 'Artwork image preview.',
    items: [
      {
        title: 'Email',
        meta: 'park.eunsun.artist@gmail.com',
        text: 'Please use this address for professional inquiries and project conversations.',
      },
      {
        title: 'Social',
        meta: 'Instagram / blog / archive links',
        text: 'Additional links can be added here as the portfolio is finalized.',
      },
    ],
  },
}

export default function ArtistSectionPage({ route }) {
  const content = sectionContent[route] ?? sectionContent['/gallery']

  return (
    <section className="artist-page">
      <header className="artist-page-header">
        <p>{content.kicker}</p>
        <h1>{content.title}</h1>
        <span>{content.description}</span>
      </header>

      <figure className="artist-page-feature">
        <img src={content.image} alt={content.imageAlt} />
      </figure>

      <div className="artist-page-list">
        {content.items.map((item) => (
          <article className="artist-page-item" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.meta}</p>
            <span>{item.text}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
