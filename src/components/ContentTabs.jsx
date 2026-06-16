import { useState } from 'react'

export default function ContentTabs({ tabs }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id)
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]

  if (!activeTab) {
    return null
  }

  return (
    <section className="content-tabs">
      <div className="tab-list" role="tablist" aria-label="Content sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTabId === tab.id ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <article
        className="tab-panel"
        role="tabpanel"
        id={`${activeTab.id}-panel`}
        aria-labelledby={`${activeTab.id}-tab`}
      >
        <div className={`tab-visual tab-visual-${activeTab.id}`}>
          {activeTab.image ? (
            <a
              className="tab-visual-link"
              href={activeTab.image.href}
              target="_blank"
              rel="noreferrer"
            >
              <img src={activeTab.image.src} alt={activeTab.image.alt} />
            </a>
          ) : (
            <span>{activeTab.label}</span>
          )}
        </div>
        <div className="tab-copy">
          <h2>{activeTab.title}</h2>
          <p>{activeTab.description}</p>
          <ul className="tab-items">
            {activeTab.items.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  )
}
