import ArtistSectionPage from '../pages/ArtistSectionPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import SearchPage from '../pages/SearchPage.jsx'

const sectionRoutes = new Set([
  '/gallery',
  '/about',
  '/gallery/exhibitions',
  '/gallery/video',
  '/contact',
])

export default function Main({ route, onNavigate }) {
  return (
    <main className="app-main">
      {route === '/search' ? (
        <SearchPage onNavigate={onNavigate} />
      ) : sectionRoutes.has(route) ? (
        <ArtistSectionPage route={route} />
      ) : (
        <HomePage onNavigate={onNavigate} />
      )}
    </main>
  )
}
