import { useEffect, useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import AuthPage from './pages/AuthPage.jsx'
import { getCopy } from './data/translations.js'
import './App.css'

const supportedRoutes = new Set([
  '/',
  '/auth',
  '/gallery',
  '/about',
  '/gallery/exhibitions',
  '/gallery/video',
  '/contact',
  '/search',
])

const parseRoute = () => {
  if (typeof window === 'undefined') {
    return '/'
  }

  if (window.location.pathname.startsWith('/works/')) {
    return window.location.pathname
  }

  return supportedRoutes.has(window.location.pathname) ? window.location.pathname : '/'
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const persisted = window.localStorage.getItem('gallery_theme')
    return persisted === 'dark' ? 'dark' : 'light'
  })
  const [route, setRoute] = useState(parseRoute)
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'en'
    }

    return window.localStorage.getItem('gallery_language') ?? 'en'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('gallery_theme', theme)
  }, [theme])

  useEffect(() => {
    const copy = getCopy(language)
    document.documentElement.lang = language
    document.documentElement.dir = copy.dir
    window.localStorage.setItem('gallery_language', language)
  }, [language])

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  const navigate = (path) => {
    if (path === route) {
      return
    }
    window.history.pushState({}, '', path)
    setRoute(parseRoute())
  }

  return (
    <div className="app">
      <Header
        language={language}
        theme={theme}
        onLanguageChange={setLanguage}
        onToggleTheme={toggleTheme}
        onNavigate={navigate}
      />
      {route === '/auth' ? (
        <AuthPage />
      ) : (
        <Main route={route} language={language} onNavigate={navigate} />
      )}
      <Footer />
    </div>
  )
}
