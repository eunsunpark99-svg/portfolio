import { useState } from 'react'
import { siteContent } from '../data/siteContent.js'

const languageOptions = [
  { label: 'Language', value: '' },
  { label: 'English', value: 'en' },
  { label: '한국어', value: 'ko' },
  { label: '日本語', value: 'ja' },
  { label: 'Français', value: 'fr' },
  { label: 'العربية', value: 'ar' },
  { label: 'Italiano', value: 'it' },
  { label: 'עברית', value: 'he' },
  { label: 'More languages', value: 'other' },
]

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
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <circle cx="16.2" cy="7.8" r="1" />
      </svg>
    )
  }

  if (type === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M14.1 8.3h2V5.1c-.9-.1-1.8-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6v2.6H6v3.6h2.9V23h3.8v-7.3h3l.5-3.6h-3.5V9.9c0-1 .3-1.6 1.4-1.6Z" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4.5 5.5h15v10.6h-8.1L7.6 20v-3.9H4.5V5.5Z" />
      <path d="M8.2 9h2.7c1.3 0 2.1.7 2.1 1.7 0 .6-.3 1.1-.8 1.4.7.3 1.1.8 1.1 1.6 0 1.2-.9 2-2.3 2H8.2V9Zm2.5 2.4c.5 0 .8-.2.8-.6s-.3-.6-.8-.6H9.8v1.2h.9Zm.2 3c.5 0 .8-.3.8-.7 0-.4-.3-.7-.9-.7h-1v1.4h1.1Z" />
    </svg>
  )
}

export default function Header({ theme, onToggleTheme, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  const translatePage = (event) => {
    const language = event.target.value

    if (!language || typeof window === 'undefined') {
      return
    }

    const currentUrl = window.location.href

    if (language === 'other') {
      window.location.href = `https://translate.google.com/?sl=auto&op=websites&text=${encodeURIComponent(
        currentUrl,
      )}`
      return
    }

    window.location.href = `https://translate.google.com/translate?sl=auto&tl=${language}&u=${encodeURIComponent(
      currentUrl,
    )}`
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
        <span className="brand-mark">P</span>
        <span>{siteContent.brandName}</span>
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
                  {item.label}
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
            placeholder="Search"
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
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <label className="language-field">
          <span className="sr-only">Translate page</span>
          <select
            className="language-select"
            defaultValue=""
            aria-label="Translate page"
            onChange={translatePage}
          >
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
              rel="noreferrer"
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
