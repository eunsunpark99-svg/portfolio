export default function IntroCard({ eyebrow, title, description }) {
  return (
    <section className="intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      <p className="description">{description}</p>
    </section>
  )
}
