import { getCopy } from '../data/translations.js'

const sectionContent = {
  '/gallery': {
    kicker: 'Works',
    title: 'Selected Works',
    description:
      'A focused archive of image-based works, installation views, spatial drawings, and visual studies.',
    image: '/images/gallery-feature.jpg',
    imageAlt: 'Blue cup and spoon artwork preview.',
    items: [
      {
        title: 'Line and Space',
        meta: 'Installation / spatial drawing',
        text: 'Works that use lines, surface, and architectural space as active materials.',
      },
      {
        title: 'Image Studies',
        meta: 'Photography / digital archive',
        text: 'A developing visual archive for documenting works, exhibitions, and site-specific projects.',
      },
      {
        title: 'Portfolio Archive',
        meta: 'Ongoing',
        text: 'This section will expand as final artwork images and captions are added.',
      },
    ],
  },
  '/about': {
    kicker: 'Biography',
    title: 'Biography',
    description:
      'Park Eunsun is an artist, curator, and web/video maker working across visual art, exhibition planning, and digital presentation.',
    image: '/images/about-feature.jpg',
    imageAlt: 'Yellow installation wall with black line tape and figure silhouette.',
    items: [
      {
        title: 'Practice',
        meta: 'Artist · Curator · Web & Video',
        text: 'Her practice connects installation, documentation, online presentation, and exhibition-making.',
      },
      {
        title: 'Approach',
        meta: 'Spatial and visual thinking',
        text: 'The site is being shaped as an international portfolio that can hold artworks, writing, video, and curatorial projects.',
      },
    ],
  },
  '/gallery/exhibitions': {
    kicker: 'Exhibitions',
    title: 'Exhibitions',
    description:
      'Selected solo, group, and curated exhibition projects will be organized here with dates, venues, and documentation.',
    image: '/images/about-feature.jpg',
    imageAlt: 'Installation documentation preview.',
    items: [
      {
        title: 'Janghang 1931',
        meta: 'Curatorial / exhibition project',
        text: 'A developing exhibition archive connecting place, memory, and visual practice.',
      },
      {
        title: 'Art Park',
        meta: 'Solo and curated exhibitions',
        text: 'Documentation and exhibition records will be added as the portfolio grows.',
      },
    ],
  },
  '/gallery/video': {
    kicker: 'Video',
    title: 'Video',
    description:
      'Video works, exhibition walkthroughs, interviews, and process documentation will be collected here.',
    image: '/images/video-feature.jpg',
    imageAlt: 'Video preview image with Korean title text.',
    items: [
      {
        title: 'Exhibition Video',
        meta: 'Walkthrough / archive',
        text: 'A place for documenting installations and exhibition views through moving image.',
      },
      {
        title: 'Studio Process',
        meta: 'Video documentation',
        text: 'Process videos and short-form visual essays can be added here.',
      },
    ],
  },
  '/contact': {
    kicker: 'Contact',
    title: 'Contact',
    description:
      'For exhibitions, collaborations, curatorial projects, and portfolio inquiries.',
    image: '/images/gallery-feature.jpg',
    imageAlt: 'Artwork image preview.',
    items: [
      {
        title: 'Email',
        meta: 'park.eunsun.artist@gmail.com',
        text: 'Please use this address for professional inquiries and project conversations.',
      },
      {
        title: 'Social',
        meta: 'Instagram / blog / archive links',
        text: 'Additional links can be added here as the portfolio is finalized.',
      },
    ],
  },
}

const localizedDescriptions = {
  en: {
    '/gallery': 'A focused archive of image-based works, installation views, spatial drawings, and visual studies.',
    '/about': 'Park Eunsun is an artist, curator, and web/video maker working across visual art, exhibition planning, and digital presentation.',
    '/gallery/exhibitions': 'Selected solo, group, and curated exhibition projects will be organized here with dates, venues, and documentation.',
    '/gallery/video': 'Video works, exhibition walkthroughs, interviews, and process documentation will be collected here.',
    '/contact': 'For exhibitions, collaborations, curatorial projects, and portfolio inquiries.',
  },
  ko: {
    '/gallery': '이미지 기반 작업, 설치 전경, 공간 드로잉과 시각 아카이브를 정리하는 공간입니다.',
    '/about': '박은선은 시각예술, 전시기획, 웹과 영상을 넘나들며 작업하는 작가이자 큐레이터입니다.',
    '/gallery/exhibitions': '개인전, 단체전, 기획 전시 프로젝트를 날짜, 장소, 기록과 함께 정리합니다.',
    '/gallery/video': '영상 작업, 전시 기록, 인터뷰와 작업 과정 영상을 모아두는 공간입니다.',
    '/contact': '전시, 협업, 기획 프로젝트와 포트폴리오 문의를 위한 페이지입니다.',
  },
  zh: {
    '/gallery': '整理图像作品、装置现场、空间绘画和视觉档案的页面。',
    '/about': 'Park Eunsun 是一位跨越视觉艺术、展览策划、网页与视频实践的艺术家和策展人。',
    '/gallery/exhibitions': '这里将整理个展、群展和策展项目，包括日期、地点与相关记录。',
    '/gallery/video': '这里收集视频作品、展览记录、访谈和创作过程影像。',
    '/contact': '用于展览、合作、策展项目和作品集相关咨询。',
  },
  hi: {
    '/gallery': 'छवि-आधारित कृतियों, इंस्टॉलेशन दृश्यों, स्थानिक ड्रॉइंग और दृश्य आर्काइव को व्यवस्थित करने वाला पृष्ठ.',
    '/about': 'Park Eunsun दृश्य कला, प्रदर्शनी योजना, वेब और वीडियो के बीच काम करने वाली कलाकार और क्यूरेटर हैं.',
    '/gallery/exhibitions': 'यहाँ एकल, समूह और क्यूरेटोरियल प्रदर्शनी परियोजनाएँ तारीख, स्थान और दस्तावेज़ों के साथ व्यवस्थित होंगी.',
    '/gallery/video': 'यहाँ वीडियो कार्य, प्रदर्शनी वॉकथ्रू, साक्षात्कार और कार्य प्रक्रिया के अभिलेख एकत्र होंगे.',
    '/contact': 'प्रदर्शनियों, सहयोग, क्यूरेटोरियल परियोजनाओं और पोर्टफोलियो संबंधी पूछताछ के लिए.',
  },
  ja: {
    '/gallery': 'イメージ作品、インスタレーションビュー、空間ドローイング、視覚アーカイブをまとめる場所です。',
    '/about': 'Park Eunsunは、視覚芸術、展覧会企画、ウェブと映像を横断して活動するアーティスト／キュレーターです。',
    '/gallery/exhibitions': '個展、グループ展、キュレーション企画を、日付、会場、記録とともに整理します。',
    '/gallery/video': '映像作品、展覧会記録、インタビュー、制作過程の映像を集めます。',
    '/contact': '展覧会、協働、キュレーション企画、ポートフォリオに関するお問い合わせページです。',
  },
  fr: {
    '/gallery': 'Une archive consacrée aux œuvres visuelles, vues d’installation, dessins spatiaux et études d’image.',
    '/about': 'Park Eunsun est artiste, curatrice et créatrice web/vidéo, travaillant entre art visuel, exposition et présentation numérique.',
    '/gallery/exhibitions': 'Les expositions personnelles, collectives et projets curatoriaux seront organisés avec dates, lieux et documents.',
    '/gallery/video': 'Œuvres vidéo, visites d’exposition, entretiens et documents de processus seront rassemblés ici.',
    '/contact': 'Pour les expositions, collaborations, projets curatoriaux et demandes de portfolio.',
  },
  ar: {
    '/gallery': 'أرشيف مركّز للأعمال البصرية ومشاهد التركيبات والرسوم المكانية والدراسات المرئية.',
    '/about': 'بارك أونسن فنانة وقيّمة وصانعة ويب وفيديو تعمل بين الفن البصري وتنظيم المعارض والعرض الرقمي.',
    '/gallery/exhibitions': 'سيتم تنظيم المعارض الفردية والجماعية والمشاريع القيّمية مع التواريخ والأماكن والوثائق.',
    '/gallery/video': 'تُجمع هنا أعمال الفيديو وجولات المعارض والمقابلات وتوثيق عملية العمل.',
    '/contact': 'للاستفسارات حول المعارض والتعاون والمشاريع القيّمية والملف الفني.',
  },
  it: {
    '/gallery': 'Un archivio dedicato a opere visive, viste di installazione, disegni spaziali e studi d’immagine.',
    '/about': 'Park Eunsun è artista, curatrice e autrice web/video, attiva tra arte visiva, progettazione espositiva e presentazione digitale.',
    '/gallery/exhibitions': 'Mostre personali, collettive e progetti curatoriali saranno organizzati con date, sedi e documentazione.',
    '/gallery/video': 'Qui saranno raccolti video, walkthrough di mostre, interviste e documentazione del processo.',
    '/contact': 'Per mostre, collaborazioni, progetti curatoriali e richieste sul portfolio.',
  },
  he: {
    '/gallery': 'ארכיון ממוקד לעבודות חזותיות, תיעוד מיצבים, רישום מרחבי ומחקרי דימוי.',
    '/about': 'פארק אונסון היא אמנית, אוצרת ויוצרת ווב/וידאו הפועלת בין אמנות חזותית, תערוכות והצגה דיגיטלית.',
    '/gallery/exhibitions': 'תערוכות יחיד, קבוצתיות ופרויקטים אוצרותיים יאורגנו כאן עם תאריכים, מקומות ותיעוד.',
    '/gallery/video': 'כאן ייאספו עבודות וידאו, סיורי תערוכה, ראיונות ותיעוד תהליך.',
    '/contact': 'לפניות בנושא תערוכות, שיתופי פעולה, פרויקטים אוצרותיים ופורטפוליו.',
  },
}

export default function ArtistSectionPage({ language, route }) {
  const content = sectionContent[route] ?? sectionContent['/gallery']
  const copy = getCopy(language)
  const description =
    localizedDescriptions[language]?.[route] ?? localizedDescriptions.en[route]
  const title = copy.nav[route] ?? content.title

  return (
    <section className="artist-page">
      <header className="artist-page-header">
        <p>{title}</p>
        <h1>{title}</h1>
        <span>{description}</span>
      </header>

      <figure className="artist-page-feature">
        <img src={content.image} alt={content.imageAlt} />
      </figure>

      <div className="artist-page-list">
        {content.items.map((item) => (
          <article className="artist-page-item" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.meta}</p>
            <span>{item.text}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
