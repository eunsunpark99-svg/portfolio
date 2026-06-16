import { useState } from 'react'

export default function FaqSection({ faqs }) {
  const [openItem, setOpenItem] = useState(null)

  const toggleItem = (question) => {
    setOpenItem((current) => (current === question ? null : question))
  }

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-title">자주 묻는 질문</h2>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openItem === faq.question
          const panelId = `faq-panel-${index}`

          return (
            <article
              key={faq.question}
              className={`faq-item ${isOpen ? 'is-open' : ''}`}
            >
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(faq.question)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? '-' : '+'}
                </span>
              </button>
              <p id={panelId} className="faq-answer" hidden={!isOpen}>
                {faq.answer}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
