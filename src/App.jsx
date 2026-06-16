import { useEffect, useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import AuthPage from './pages/AuthPage.jsx'
import './App.css'

const parseRoute = () => {
  if (typeof window === 'undefined') {
    return '/'
  }
  return window.location.pathname === '/auth' ? '/auth' : '/'
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('gallery_theme', theme)
  }, [theme])

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
      <Header theme={theme} onToggleTheme={toggleTheme} onNavigate={navigate} />
      {route === '/auth' ? <AuthPage /> : <Main />}
      <Footer />
    </div>
  )
}
