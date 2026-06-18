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
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2.2 2.2v11.6h9.6V6.2H7.2Zm4.8 2.45a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7Zm0 1.9a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9Zm3.9-2.2a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1Z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  if (type === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm8.1 15v-5.25h1.75l.28-2.05H13.1v-1.32c0-.6.18-1 1.05-1h1.08V7.55a14.5 14.5 0 0 0-1.62-.08c-1.6 0-2.7.98-2.7 2.78v1.45H9.1v2.05h1.8V19h2.2Z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M5 4h14a1 1 0 0 1 1 1v10.4a1 1 0 0 1-1 1h-5.8L9.3 20v-3.6H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2.2 2.2v8h4.1v1.35l1.25-1.35h5.25v-8H7.2Zm3.05 2.05h2.05c1.35 0 2.18.7 2.18 1.78 0 .56-.24 1.02-.7 1.34.62.3.96.8.96 1.5 0 1.2-.9 1.95-2.35 1.95h-2.14V8.25Zm1.5 2.35h.45c.48 0 .76-.2.76-.56s-.27-.55-.75-.55h-.46v1.11Zm0 2.98h.56c.52 0 .84-.25.84-.66 0-.42-.32-.66-.86-.66h-.54v1.32Z"
        clipRule="evenodd"
      />
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
