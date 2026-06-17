import { siteContent } from '../data/siteContent.js'

const baseResults = [
  {
    title: 'Works',
    path: '/gallery',
    type: 'Section',
    text: 'Selected works, image-based projects, installation views, and visual archive.',
  },
  {
    title: 'Biography',
    path: '/about',
    type: 'Section',
    text: 'Artist, curator, web and video practice by Park Eunsun.',
  },
  {
    title: 'Exhibitions',
    path: '/gallery/exhibitions',
    type: 'Section',
    text: 'Solo, group, and curated exhibition projects with dates, venues, and documentation.',
  },
  {
    title: 'Video',
    path: '/gallery/video',
    type: 'Section',
    text: 'Video works, walkthroughs, interviews, and process documentation.',
  },
  {
    title: 'Contact',
    path: '/contact',
    type: 'Section',
    text: 'Exhibition, collaboration, curatorial project, and portfolio inquiries.',
  },
]

const tabResults = siteContent.tabs.flatMap((tab) => [
  {
    title: tab.title,
    path: tab.id === 'videos' ? '/gallery/video' : tab.id === 'about' ? '/about' : '/gallery',
    type: tab.label,
    text: tab.description,
  },
  ...tab.items.map((item) => ({
    title: item.title,
    path: tab.id === 'videos' ? '/gallery/video' : tab.id === 'about' ? '/about' : '/gallery',
    type: item.meta,
    text: item.description,
  })),
])

const getQuery = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return new URLSearchParams(window.location.search).get('q')?.trim() ?? ''
}

export default function SearchPage({ onNavigate }) {
  const query = getQuery()
  const normalizedQuery = query.toLowerCase()
  const results = [...baseResults, ...tabResults].filter((item) =>
    `${item.title} ${item.type} ${item.text}`.toLowerCase().includes(normalizedQuery),
  )

  const followResult = (event, path) => {
    event.preventDefault()
    onNavigate(path)
  }

  return (
    <section className="search-page">
      <header className="search-page-header">
        <p>Search</p>
        <h1>{query ? `Results for "${query}"` : 'Search the archive'}</h1>
        <span>
          Browse pages, works, exhibition notes, video references, and portfolio
          content.
        </span>
      </header>

      {query && results.length > 0 ? (
        <div className="search-results">
          {results.map((item) => (
            <a
              key={`${item.path}-${item.title}`}
              className="search-result"
              href={item.path}
              onClick={(event) => followResult(event, item.path)}
            >
              <span>{item.type}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="search-empty">
          {query
            ? 'No matching content yet. Try Works, Video, Biography, Exhibition, or Contact.'
            : 'Enter a keyword in the header search field.'}
        </p>
      )}
    </section>
  )
}
