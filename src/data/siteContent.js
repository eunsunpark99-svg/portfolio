export const siteContent = {
  eyebrow: '',
  brandName: '박은선',
  title: '박은선 Eunsun Park',
  description: 'Artist · Curator · Web & Video',
  menuItems: [
    { label: 'Home', href: '/' },
    {
      label: 'Gallery',
      href: '/gallery',
      children: [
        { label: 'Paintings', href: '/gallery/paintings' },
        { label: 'Photography', href: '/gallery/photography' },
        { label: 'Exhibitions', href: '/gallery/exhibitions' },
      ],
    },
    { label: 'About', href: '/about' },
  ],
  tabs: [
    {
      id: 'images',
      label: 'Images',
      title: 'Curated Image Gallery',
      description:
        'Explore selected visual works with a clean layout for browsing artwork and project images.',
      image: {
        src: '/images/gallery-feature.jpg',
        alt: 'A blue cup on an orange table with a spoon lifting liquid from it.',
        href: 'https://www.instagram.com/park.eunsun_artist/',
      },
      items: [
        {
          title: 'Morning Landscape',
          meta: 'Digital image · 2026',
          description: 'A soft landscape placeholder for the gallery main feed.',
        },
        {
          title: 'Portrait Study',
          meta: 'Artwork preview · 1080x1080',
          description: 'Temporary portrait content for checking card spacing.',
        },
        {
          title: 'Color Archive',
          meta: 'Collection image · Draft',
          description: 'A sample image entry for future upload data.',
        },
      ],
    },
    {
      id: 'videos',
      label: 'Videos',
      title: 'Featured Video Room',
      description:
        'Switch to video content for exhibition clips, walkthroughs, and behind-the-scenes stories.',
      image: {
        src: '/images/video-feature.jpg',
        alt: 'A teal-toned airport lobby scene with Korean title text overlaid.',
        href: 'https://www.facebook.com/artepes',
      },
      items: [
        {
          title: 'Exhibition Tour',
          meta: '03:24 · Preview',
          description: 'A temporary walkthrough video item for the gallery page.',
        },
        {
          title: 'Artist Interview',
          meta: '12:08 · Interview',
          description: 'Mock video data for artist conversation content.',
        },
        {
          title: 'Studio Process',
          meta: '06:42 · Behind the scenes',
          description: 'Sample process video content before real media is added.',
        },
      ],
    },
    {
      id: 'about',
      label: 'About Site',
      title: '라인테이프로 확장되는 박은선의 작품세계',
      description:
        '박은선 작가는 라인테이프를 주요 매체로 삼아 공간의 표면과 구조를 새롭게 읽어내는 설치 작업을 선보입니다.',
      image: {
        src: '/images/about-feature.jpg',
        alt: 'A yellow installation wall with black line tape and a standing figure silhouette.',
        href: 'https://blog.naver.com/artepes',
      },
      items: [
        {
          title: '작업의 언어',
          meta: 'Line tape installation',
          description:
            '얇고 선명한 라인테이프는 벽, 바닥, 사물의 경계를 따라가며 익숙한 공간에 새로운 리듬과 방향성을 만듭니다.',
        },
        {
          title: '전시 활동',
          meta: 'Art Park solo and curated exhibitions',
          description:
            '아트파크에서 개인전과 기획전을 통해 설치 작업을 발표하며, 선과 공간이 만나는 방식에 대한 실험을 이어왔습니다.',
        },
        {
          title: '장항1931, 움직이는 경계',
          meta: 'Janghang 1931 exhibition project',
          description:
            '최근에는 장항 전시 <장항1931, 움직이는 경계>를 기획하며 작가의 작업 세계를 장소성과 지역적 맥락으로 확장하고 있습니다.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: '이 사이트는 어떤 목적의 포트폴리오인가요?',
      answer:
        '이미지, 영상, 작업 소개를 한곳에서 보여주기 위한 개인 포트폴리오형 갤러리 사이트입니다.',
    },
    {
      question: '이미지와 영상은 계속 추가할 수 있나요?',
      answer:
        '네. public/images 폴더에 파일을 추가하고 데이터 파일에 경로를 등록하면 콘텐츠를 확장할 수 있습니다.',
    },
    {
      question: '모바일 화면에서도 볼 수 있나요?',
      answer:
        '헤더, 탭 메뉴, 드롭다운, FAQ 영역 모두 모바일 화면에 맞춰 세로 구조로 정리되도록 구성했습니다.',
    },
    {
      question: '사이트 소개 문구는 나중에 바꿀 수 있나요?',
      answer:
        '가능합니다. src/data/siteContent.js 안의 문구만 수정하면 화면에 바로 반영됩니다.',
    },
  ],
}
