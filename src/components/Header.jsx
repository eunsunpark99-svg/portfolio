import { useState } from 'react'
import { siteContent } from '../data/siteContent.js'
import { getCopy, languageOptions } from '../data/translations.js'

const socialLinks = [
  {
    label: 'Instagram',
    type: 'instagram',
    href: 'https://www.instagram.com/park.eunsun_artist/',
  },
  {
    label: 'Facebook',
    type: 'facebook',
    href: 'https://www.facebook.com/artepes',
  },
  {
    label: 'Blog',
    type: 'blog',
    href: 'https://blog.naver.com/artepes',
  },
]

const SocialIcon = ({ type }) => {
  if (type === 'instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="instagram-muted-gradient" x1="5" y1="29" x2="27" y2="3" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e0a93f" />
            <stop offset="0.36" stopColor="#d76062" />
            <stop offset="0.68" stopColor="#c04f9d" />
            <stop offset="1" stopColor="#755bd7" />
          </linearGradient>
        </defs>
        <rect className="social-icon-bg" x="2" y="2" width="28" height="28" rx="8" fill="url(#instagram-muted-gradient)" />
        <rect className="social-icon-line" x="8.2" y="8.2" width="15.6" height="15.6" rx="5.1" />
        <circle className="social-icon-line" cx="16" cy="16" r="4.2" />
        <circle className="social-icon-dot" cx="21.25" cy="10.75" r="1.45" />
      </svg>
    )
  }

  if (type === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <rect className="social-icon-bg" x="2" y="2" width="28" height="28" rx="8" />
        <path className="social-icon-mark" d="M18.55 28V17.85h3.38l.52-3.95h-3.9v-2.52c0-1.15.32-1.93 1.96-1.93h2.1V5.92a28.2 28.2 0 0 0-3.05-.16c-3.02 0-5.09 1.84-5.09 5.23v2.91h-3.42v3.95h3.42V28h4.08Z" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path className="social-icon-bg" d="M7.5 3.5h17A5.5 5.5 0 0 1 30 9v11.2a5.5 5.5 0 0 1-5.5 5.5h-5.8L16 30l-2.7-4.3H7.5A5.5 5.5 0 0 1 2 20.2V9a5.5 5.5 0 0 1 5.5-5.5Z" />
      <text className="social-icon-text" x="16" y="18.2" textAnchor="middle">blog</text>
    </svg>
  )
}

export default function Header({
  language,
  theme,
  onLanguageChange,
  onToggleTheme,
  onNavigate,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const copy = getCopy(language)

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }

  const toggleDropdown = (label) => {
    setOpenDropdown((current) => (current === label ? null : label))
  }

  const changeLanguage = (event) => {
    const nextLanguage = event.target.value

    if (!nextLanguage || typeof window === 'undefined') {
      return
    }

    if (nextLanguage === 'other') {
      const currentUrl = window.location.href
      window.location.href = `https://translate.google.com/?sl=auto&op=websites&text=${encodeURIComponent(
        currentUrl,
      )}`
      return
    }

    onLanguageChange(nextLanguage)
  }

  const followLink = (event, href) => {
    if (!href.startsWith('/')) {
      closeMenu()
      return
    }

    event.preventDefault()
    onNavigate(href)
    closeMenu()
  }

  const submitSearch = (event) => {
    event.preventDefault()
    const query = searchTerm.trim()

    if (!query) {
      return
    }

    onNavigate(`/search?q=${encodeURIComponent(query)}`)
    closeMenu()
  }

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={(event) => followLink(event, '/')}>
        <span className="brand-mark" aria-hidden="true">E</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="site-menu"
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="site-menu"
        className={`header-actions ${isMenuOpen ? 'is-open' : ''}`}
      >
        <nav className="site-nav" aria-label="Main menu">
          {siteContent.menuItems.map((item) => {
            const hasDropdown = item.children?.length > 0
            const isDropdownOpen = openDropdown === item.label

            if (!hasDropdown) {
              return (
                <a
                  key={item.href}
                  className="nav-link"
                  href={item.href}
                  onClick={(event) => followLink(event, item.href)}
                >
                  {copy.nav[item.href] ?? item.label}
                </a>
              )
            }

            return (
              <div
                key={item.href}
                className={`nav-item has-dropdown ${
                  isDropdownOpen ? 'is-open' : ''
                }`}
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="nav-link dropdown-trigger"
                  type="button"
                  aria-expanded={isDropdownOpen}
                  aria-controls={`${item.label.toLowerCase()}-dropdown`}
                  onClick={() => toggleDropdown(item.label)}
                >
                  {item.label}
                  <span className="dropdown-arrow" aria-hidden="true">
                    v
                  </span>
                </button>
                <div
                  id={`${item.label.toLowerCase()}-dropdown`}
                  className="dropdown-menu"
                >
                  {item.children.map((child) => (
                    <a
                      key={child.href}
                      className="dropdown-link"
                      href={child.href}
                      onClick={(event) => followLink(event, child.href)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>
        <form className="header-search" role="search" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="site-search">
            Search site
          </label>
          <input
            id="site-search"
            type="search"
            value={searchTerm}
            placeholder={copy.ui.search}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit" aria-label="Search">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>
        </form>
        <button
          className="theme-toggle-button"
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? copy.ui.light : copy.ui.dark}
        </button>
        <label className="language-field">
          <span className="sr-only">Translate page</span>
          <select
            className="language-select"
            value={language}
            aria-label="Translate page"
            onChange={changeLanguage}
          >
            <option value="">{copy.ui.language}</option>
            {languageOptions.map((language) => (
              <option key={language.value || language.label} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </label>
        <div className="social-links" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              className={`social-link social-link-${link.type}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              onClick={closeMenu}
            >
              <SocialIcon type={link.type} />
            </a>
          ))}
        </div>
        <button
          className="login-button"
          type="button"
          onClick={() => {
            onNavigate('/auth')
            closeMenu()
          }}
        >
          Login
        </button>
        <button
          className="signup-button"
          type="button"
          onClick={() => {
            onNavigate('/auth')
            closeMenu()
          }}
        >
          Signup
        </button>
      </div>
    </header>
  )
}
