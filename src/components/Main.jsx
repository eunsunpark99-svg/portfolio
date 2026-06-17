import ArtistSectionPage from '../pages/ArtistSectionPage.jsx'
import HomePage from '../pages/HomePage.jsx'

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
      {sectionRoutes.has(route) ? (
        <ArtistSectionPage route={route} />
      ) : (
        <HomePage onNavigate={onNavigate} />
      )}
    </main>
  )
}
