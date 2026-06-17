import ArtistSectionPage from '../pages/ArtistSectionPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import SearchPage from '../pages/SearchPage.jsx'
import WorkDetailPage from '../pages/WorkDetailPage.jsx'

const sectionRoutes = new Set([
  '/gallery',
  '/about',
  '/gallery/exhibitions',
  '/gallery/video',
  '/contact',
])

export default function Main({ route, language, onNavigate }) {
  return (
    <main className="app-main">
      {route === '/search' ? (
        <SearchPage language={language} onNavigate={onNavigate} />
      ) : route.startsWith('/works/') ? (
        <WorkDetailPage route={route} onNavigate={onNavigate} />
      ) : sectionRoutes.has(route) ? (
        <ArtistSectionPage language={language} route={route} />
      ) : (
        <HomePage language={language} onNavigate={onNavigate} />
      )}
    </main>
  )
}
