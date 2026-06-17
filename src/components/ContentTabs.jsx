import { useState } from 'react'

const localizedTabs = {
  ko: {
    images: ['이미지', '선별 이미지 아카이브', '작품 이미지와 프로젝트 기록을 차분한 레이아웃으로 살펴봅니다.'],
    videos: ['영상', '영상 아카이브', '전시 영상, 작업 과정, 인터뷰와 비하인드 기록을 모아봅니다.'],
    about: ['소개', '작가와 작업 세계', '라인테이프와 공간 드로잉을 중심으로 확장되는 박은선의 작업을 소개합니다.'],
  },
  zh: {
    images: ['图像', '精选图像档案', '以简洁的版面浏览作品图像和项目记录。'],
    videos: ['视频', '视频档案', '汇集展览影像、创作过程、访谈和相关记录。'],
    about: ['介绍', '艺术家与创作实践', '介绍 Park Eunsun 围绕线条、胶带和空间展开的创作。'],
  },
  ja: {
    images: ['画像', '選ばれた画像アーカイブ', '作品画像とプロジェクト記録を静かなレイアウトで紹介します。'],
    videos: ['映像', '映像アーカイブ', '展覧会映像、制作過程、インタビューをまとめます。'],
    about: ['紹介', '作家と作品世界', 'ラインテープと空間ドローイングを中心に広がる作品を紹介します。'],
  },
  fr: {
    images: ['Images', 'Archive d’images sélectionnées', 'Découvrez les images d’œuvres et les archives de projets dans une mise en page sobre.'],
    videos: ['Vidéos', 'Archive vidéo', 'Vidéos d’exposition, processus de travail, entretiens et documents associés.'],
    about: ['À propos', 'L’artiste et sa pratique', 'Une présentation du travail de Park Eunsun autour de la ligne, du ruban et de l’espace.'],
  },
  ar: {
    images: ['صور', 'أرشيف صور مختار', 'استكشف صور الأعمال وسجلات المشاريع ضمن تخطيط هادئ.'],
    videos: ['فيديو', 'أرشيف الفيديو', 'فيديوهات المعارض وعمليات العمل والمقابلات والمواد المرتبطة بها.'],
    about: ['نبذة', 'الفنانة وممارستها', 'تعريف بعمل Park Eunsun حول الخط والشريط والفضاء.'],
  },
  it: {
    images: ['Immagini', 'Archivio immagini selezionate', 'Esplora immagini delle opere e documentazione dei progetti con un layout essenziale.'],
    videos: ['Video', 'Archivio video', 'Video di mostre, processi di lavoro, interviste e materiali correlati.'],
    about: ['Profilo', 'L’artista e la pratica', 'Una presentazione del lavoro di Park Eunsun tra linea, nastro e spazio.'],
  },
  he: {
    images: ['דימויים', 'ארכיון דימויים נבחר', 'עיון בדימויי עבודות ותיעוד פרויקטים בפריסה שקטה.'],
    videos: ['וידאו', 'ארכיון וידאו', 'סרטוני תערוכה, תהליכי עבודה, ראיונות וחומרים קשורים.'],
    about: ['אודות', 'האמנית והפרקטיקה', 'הצגת עבודתה של Park Eunsun סביב קו, סרט ומרחב.'],
  },
}

const localizeTab = (tab, language) => {
  const localized = localizedTabs[language]?.[tab.id]

  if (!localized) {
    return tab
  }

  return {
    ...tab,
    label: localized[0],
    title: localized[1],
    description: localized[2],
  }
}

export default function ContentTabs({ language, tabs }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id)
  const localizedTabList = tabs.map((tab) => localizeTab(tab, language))
  const activeTab =
    localizedTabList.find((tab) => tab.id === activeTabId) ?? localizedTabList[0]

  if (!activeTab) {
    return null
  }

  return (
    <section className="content-tabs">
      <div className="tab-list" role="tablist" aria-label="Content sections">
        {localizedTabList.map((tab) => (
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
