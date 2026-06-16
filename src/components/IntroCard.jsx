export default function IntroCard({ eyebrow, title, description }) {
  return (
    <section className="intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="description">{description}</p>
    </section>
  )
}
