import AsyncDataList from '../components/AsyncDataList.jsx'
import ContentTabs from '../components/ContentTabs.jsx'
import FaqSection from '../components/FaqSection.jsx'
import IntroCard from '../components/IntroCard.jsx'
import ProductList from '../components/ProductList.jsx'
import { siteContent } from '../data/siteContent.js'
import { formatTitle } from '../utils/formatTitle.js'

export default function HomePage() {
  return (
    <section className="app-shell">
      <IntroCard
        eyebrow={siteContent.eyebrow}
        title={formatTitle(siteContent.title)}
        description={siteContent.description}
      />
      <ContentTabs tabs={siteContent.tabs} />
      <ProductList />
      <AsyncDataList />
      <FaqSection faqs={siteContent.faqs} />
    </section>
  )
}
