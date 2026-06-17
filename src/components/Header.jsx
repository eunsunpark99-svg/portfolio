import { useState } from 'react'
import { siteContent } from '../data/siteContent.js'

const languageOptions = [
  { label: 'Language', value: '' },
  { label: 'English', value: 'en' },
  { label: 'Korean', value: 'ko' },
  { label: 'Japanese', value: 'ja' },
  { label: 'French', value: 'fr' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Italiano', value: 'it' },
  { label: 'Hebrew', value: 'he' },
  { label: 'Other languages', value: 'other' },
]

const socialLinks = [
  {
    label: 'Instagram',
    mark: 'IG',
    href: 'https://www.instagram.com/park.eunsun_artist/',
  },
  {
    label: 'Facebook',
    mark: 'f',
    href: 'https://www.facebook.com/artepes',
  },
  {
    label: 'Blog',
    mark: 'B',
    href: 'https://blog.naver.com/artepes',
  },
]

export default function Header({ theme, onToggleTheme, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

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
              className="social-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
              onClick={closeMenu}
            >
              {link.mark}
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
