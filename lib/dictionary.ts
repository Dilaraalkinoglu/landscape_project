import type { Locale } from './i18n';

export interface SeasonalImage {
  spring: string;
  summer: string;
  autumn: string;
  winter: string;
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type Project = {
  id: string;
  title: { tr: string; en: string };
  category: 'residential' | 'commercial' | 'hardscape' | 'irrigation' | 'lighting' | 'maintenance';
  location: { tr: string; en: string };
  year: string;
  cover: string;
  gallery: (keyof typeof projectPhotoCaptions)[];
  description: { tr: string; en: string };
  scope: { tr: string[]; en: string[] };
};

export type Service = {
  id: string;
  icon: string;
  title: { tr: string; en: string };
  short: { tr: string; en: string };
  description: { tr: string; en: string };
  steps: { tr: { title: string; desc: string }[]; en: { title: string; desc: string }[] };
  scope: { tr: string[]; en: string[] };
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: { tr: string; en: string };
  project: { tr: string; en: string };
  rating: number;
  text: { tr: string; en: string };
};

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: { tr: string; en: string };
};

export type TeamMember = {
  name: string;
  role: { tr: string; en: string };
};

export type Dict = {
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    products: string;
    testimonials: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    scroll: string;
  };
  whyUs: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; desc: string }[];
  };
  servicesPreview: {
    title: string;
    subtitle: string;
    explore: string;
  };
  featuredProjects: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  productsPreview: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    selectCategory: string;
    allProducts: string;
  };
  productsPage: {
    hero: { badge: string; title: string; subtitle: string };
    allProducts: string;
    selectCategory: string;
    itemCount: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  stats: {
    title: string;
    subtitle: string;
    items: Stat[];
  };
  ctaSection: {
    title: string;
    subtitle: string;
    button: string;
    phone: string;
  };
  about: {
    hero: { badge: string; title: string; subtitle: string };
    story: { title: string; p1: string; p2: string; p3: string };
    values: { title: string; subtitle: string; items: { icon: string; title: string; desc: string }[] };
    team: { title: string; subtitle: string };
    certifications: { title: string; subtitle: string; items: string[] };
  };
  servicesPage: {
    hero: { badge: string; title: string; subtitle: string };
    explore: string;
    processTitle: string;
    scopeTitle: string;
    relatedProjects: string;
    backToServices: string;
  };
  portfolioPage: {
    hero: { badge: string; title: string; subtitle: string };
    filters: { all: string; residential: string; commercial: string; hardscape: string; irrigation: string; lighting: string; maintenance: string };
    close: string;
    location: string;
    year: string;
    scope: string;
    gallery: string;
    backToPortfolio: string;
  };
  contactPage: {
    hero: { badge: string; title: string; subtitle: string };
    form: { formTitle: string; name: string; phone: string; email: string; projectType: string; message: string; submit: string; success: string; error: string; projectTypes: string[] };
    info: { title: string; phone: string; email: string; hours: string; hoursValue: string; area: string; areaValue: string };
    map: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    services: string;
    contact: string;
    rights: string;
  };
  theme: { light: string; dark: string };
  language: string;
};

export const projectPhotoCaptions = {
  '/images/mediterranean/modern-villa.webp': {
    tr: 'Modern bir konutun girişini çevreleyen katmanlı bitkiler.',
    en: 'Layered planting frames the entrance to a modern home.',
  },
  '/images/mediterranean/garden-pool.webp': {
    tr: 'Taş yürüyüş yolu, havuz ve bahçe aydınlatması.',
    en: 'A stone path, a pool and garden lighting.',
  },
  '/images/mediterranean/terrace-garden.webp': {
    tr: 'Bahçeye açılan gölgeli teras ve geniş yapraklı bitkiler.',
    en: 'A shaded terrace opens onto a garden with broad-leaved plants.',
  },
  '/images/mediterranean/stone-villa.webp': {
    tr: 'Taş cephenin önünde kayalar ve katmanlı bitkiler.',
    en: 'Rocks and layered planting in front of a stone façade.',
  },
  '/images/mediterranean/garden-path.webp': {
    tr: 'Çimlerin arasından geçen taş yolu küçük bahçe fenerleri çevreliyor.',
    en: 'Low garden lanterns flank a stone path across the lawn.',
  },
  '/images/mediterranean/stone-garden.webp': {
    tr: 'Zeytin ağacı, beyaz çakıl taşları ve çim alan.',
    en: 'An olive tree, white pebbles and a lawn.',
  },
} satisfies Record<string, Record<Locale, string>>;

export const projects: Project[] = [
  {
    id: 'cayyolu-residence',
    title: { tr: 'Çayyolu Konut Bahçesi', en: 'Çayyolu Residence Garden' },
    category: 'residential',
    location: { tr: 'Ankara, Çayyolu', en: 'Ankara, Çayyolu' },
    year: '2024',
    cover: '/images/mediterranean/modern-villa.webp',
    gallery: [
      '/images/mediterranean/modern-villa.webp',
      '/images/mediterranean/garden-pool.webp',
      '/images/mediterranean/terrace-garden.webp',
    ],
    description: {
      tr: 'Modern mimariyle uyumlu, düşük bakım gerektiren çok katmanlı bir konut bahçesi. Yerli bitki türleri ve doğal taş dokuları bir araya getirildi.',
      en: 'A multi-layered residential garden designed to complement modern architecture with low-maintenance native plants and natural stone textures.',
    },
    scope: {
      tr: ['Peyzaj tasarımı', 'Sert peyzaj', 'Sulama sistemi', 'Aydınlatma'],
      en: ['Landscape design', 'Hardscape', 'Irrigation system', 'Lighting'],
    },
  },
  {
    id: 'bilkent-patio',
    title: { tr: 'Bilkent Taş Patio', en: 'Bilkent Stone Patio' },
    category: 'hardscape',
    location: { tr: 'Ankara, Bilkent', en: 'Ankara, Bilkent' },
    year: '2024',
    cover: '/images/mediterranean/terrace-garden.webp',
    gallery: [
      '/images/mediterranean/terrace-garden.webp',
      '/images/mediterranean/stone-villa.webp',
    ],
    description: {
      tr: 'Doğal taş kaplama, oturma alanları ve bitki adalarıyla sıcak bir dış mekan oturma düzeni.',
      en: 'A warm outdoor living layout with natural stone paving, seating areas, and planted islands.',
    },
    scope: {
      tr: ['Doğal taş uygulama', 'Bitki tasarımı', 'Drenaj', 'Aydınlatma'],
      en: ['Natural stone work', 'Planting design', 'Drainage', 'Lighting'],
    },
  },
  {
    id: 'cankaya-commercial',
    title: { tr: 'Çankaya Ofis Girişi', en: 'Çankaya Office Entrance' },
    category: 'commercial',
    location: { tr: 'Ankara, Çankaya', en: 'Ankara, Çankaya' },
    year: '2023',
    cover: '/images/mediterranean/garden-path.webp',
    gallery: [
      '/images/mediterranean/garden-path.webp',
      '/images/mediterranean/terrace-garden.webp',
    ],
    description: {
      tr: 'Kurumsal kimliği yansıtan, bakımı kolay ve etkileyici bir ticari giriş peyzajı.',
      en: 'A low-maintenance, striking commercial entrance landscape reflecting corporate identity.',
    },
    scope: {
      tr: ['Ticari peyzaj', 'Otomatik sulama', 'Aydınlatma', 'Bakım sözleşmesi'],
      en: ['Commercial landscaping', 'Auto irrigation', 'Lighting', 'Maintenance contract'],
    },
  },
  {
    id: 'umitkoy-pool',
    title: { tr: 'Ümitköy Havuz Bahçesi', en: 'Ümitköy Pool Garden' },
    category: 'residential',
    location: { tr: 'Ankara, Ümitköy', en: 'Ankara, Ümitköy' },
    year: '2023',
    cover: '/images/mediterranean/garden-pool.webp',
    gallery: [
      '/images/mediterranean/garden-pool.webp',
      '/images/mediterranean/modern-villa.webp',
    ],
    description: {
      tr: 'Havuz çevresinde tropik ve yerli türlerin bir arada kullanıldığı, akşam kullanımı için aydınlatmalı bir dinlenme bahçesi.',
      en: 'A relaxation garden around the pool combining tropical and native species, with evening lighting.',
    },
    scope: {
      tr: ['Havuz çevresi peyzaj', 'Tropik bitkiler', 'Aydınlatma', 'Sulama'],
      en: ['Poolside landscaping', 'Tropical plants', 'Lighting', 'Irrigation'],
    },
  },
  {
    id: 'gazi-sprinkler',
    title: { tr: 'Gazi Park Sulama Sistemi', en: 'Gazi Park Irrigation System' },
    category: 'irrigation',
    location: { tr: 'Ankara, Gazi', en: 'Ankara, Gazi' },
    year: '2024',
    cover: '/images/mediterranean/garden-path.webp',
    gallery: [
      '/images/mediterranean/garden-path.webp',
      '/images/mediterranean/stone-garden.webp',
    ],
    description: {
      tr: 'Akıllı kontrol üniteli, su tasarruflu otomatik sulama sistemi. Yağmur sensörü ve bölgesel programlama ile %40 su tasarrufu.',
      en: 'Water-saving automatic irrigation system with smart controller, rain sensor, and zone programming for 40% water savings.',
    },
    scope: {
      tr: ['Otomatik sulama', 'Akıllı kontrol', 'Yağmur sensörü', 'Damlama sulama'],
      en: ['Automatic irrigation', 'Smart controller', 'Rain sensor', 'Drip irrigation'],
    },
  },
  {
    id: 'bahceli-lighting',
    title: { tr: 'Bahçelievler Aydınlatma', en: 'Bahçelievler Lighting' },
    category: 'lighting',
    location: { tr: 'Ankara, Bahçelievler', en: 'Ankara, Bahçelievler' },
    year: '2024',
    cover: '/images/mediterranean/modern-villa.webp',
    gallery: [
      '/images/mediterranean/modern-villa.webp',
      '/images/mediterranean/garden-path.webp',
      '/images/mediterranean/garden-pool.webp',
    ],
    description: {
      tr: 'Yürüyüş yolu, ağaç altı ve oturma alanlarını vurgulayan, sıcak tonlu LED aydınlatma tasarımı.',
      en: 'Warm-toned LED lighting design accentuating pathways, under-tree, and seating areas.',
    },
    scope: {
      tr: ['LED aydınlatma', 'Yol ışıkları', 'Ağaç altı aydınlatma', 'Otomatik kontrol'],
      en: ['LED lighting', 'Path lights', 'Under-tree lighting', 'Automatic control'],
    },
  },
  {
    id: 'orkun-maintenance',
    title: { tr: 'Orkun Sitesi Bakım', en: 'Orkun Site Maintenance' },
    category: 'maintenance',
    location: { tr: 'Ankara, Çankaya', en: 'Ankara, Çankaya' },
    year: '2024',
    cover: '/images/mediterranean/stone-garden.webp',
    gallery: [
      '/images/mediterranean/stone-garden.webp',
      '/images/mediterranean/stone-villa.webp',
      '/images/mediterranean/garden-path.webp',
    ],
    description: {
      tr: 'Yıllık bakım sözleşmesi kapsamında çim biçme, budama, gübreleme ve mevsimsel yenileme çalışmaları.',
      en: 'Annual maintenance contract covering mowing, pruning, fertilizing, and seasonal renewal.',
    },
    scope: {
      tr: ['Çim bakımı', 'Budama', 'Gübreleme', 'Mevsimsel yenileme'],
      en: ['Lawn care', 'Pruning', 'Fertilizing', 'Seasonal renewal'],
    },
  },
  {
    id: 'tropical-terrace',
    title: { tr: 'Tropik Teras Düzenleme', en: 'Tropical Terrace Design' },
    category: 'residential',
    location: { tr: 'Ankara, İncek', en: 'Ankara, İncek' },
    year: '2023',
    cover: '/images/mediterranean/terrace-garden.webp',
    gallery: [
      '/images/mediterranean/terrace-garden.webp',
      '/images/mediterranean/modern-villa.webp',
      '/images/mediterranean/garden-path.webp',
    ],
    description: {
      tr: 'Ahşap zemin, tropik bitkiler ve rahat oturma alanlarıyla bir teras vahası.',
      en: 'A terrace oasis with wooden decking, tropical plants, and comfortable seating.',
    },
    scope: {
      tr: ['Teras peyzajı', 'Ahşap zemin', 'Tropik bitkiler', 'Sulama'],
      en: ['Terrace landscaping', 'Wooden decking', 'Tropical plants', 'Irrigation'],
    },
  },
];

export const services: Service[] = [
  {
    id: 'design',
    icon: 'PenTool',
    title: { tr: 'Peyzaj Tasarımı', en: 'Landscape Design' },
    short: {
      tr: 'Saha analizi, konsept ve uygulama projeleriyle mekanınıza özel tasarım.',
      en: 'Site analysis, concept, and implementation projects tailored to your space.',
    },
    description: {
      tr: 'Her projeye saha ziyareti ile başlarız. Toprak, iklim ve kullanım ihtiyaçlarını analiz ederek, bitki seçimi, sert peyzaj ve su yönetimiyle bütüncül bir tasarım sunarız. 3D görselleştirme ile kararı görürsünüz.',
      en: 'Every project begins with a site visit. We analyze soil, climate, and usage needs, then deliver a holistic design with planting, hardscape, and water management. You see the result with 3D visualization.',
    },
    steps: {
      tr: [
        { title: 'Saha Keşfi', desc: 'Toprak analizi, ölçüm, iklim ve mevcut bitki örtüsü değerlendirmesi.' },
        { title: 'Konsept Tasarım', desc: 'İhtiyaç programı, kullanım alanları ve stil yönü belirlenir.' },
        { title: 'Uygulama Projesi', desc: 'Bitki planı, sert peyzaj detayları, sulama ve aydınlatma planı.' },
        { title: '3D Görselleştirme', desc: 'Projeyi görselleştirip revizyonları birlikte yaparız.' },
      ],
      en: [
        { title: 'Site Survey', desc: 'Soil analysis, measurement, climate, and existing vegetation assessment.' },
        { title: 'Concept Design', desc: 'Program of needs, use areas, and stylistic direction defined.' },
        { title: 'Implementation Project', desc: 'Planting plan, hardscape details, irrigation, and lighting plans.' },
        { title: '3D Visualization', desc: 'We visualize the project and revise together with you.' },
      ],
    },
    scope: {
      tr: ['Saha analizi', 'Konsept plan', 'Uygulama projesi', '3D render', 'Bitki planı', 'Sulama planı', 'Aydınlatma planı'],
      en: ['Site analysis', 'Concept plan', 'Implementation project', '3D render', 'Planting plan', 'Irrigation plan', 'Lighting plan'],
    },
    image: '/images/mediterranean/garden-pool.webp',
  },
  {
    id: 'implementation',
    icon: 'Trees',
    title: { tr: 'Bahçe Uygulama', en: 'Garden Implementation' },
    short: {
      tr: 'Toprak düzenleme, bitkilendirme ve çim uygulamalarıyla tasarımı hayata geçirme.',
      en: 'Bringing designs to life with grading, planting, and lawn installation.',
    },
    description: {
      tr: 'Tasarım onayından sonra uygulama ekibimiz sahaya gelir. Toprak hazırlığı, bitkilendirme, çim serimi ve geçiş alanları profesyonel ekipmanlarla tamamlanır.',
      en: 'After design approval, our implementation team arrives on site. Soil preparation, planting, sodding, and transition areas are completed with professional equipment.',
    },
    steps: {
      tr: [
        { title: 'Saha Hazırlığı', desc: 'Toprak işleme, tesviye, drenaj ve kalıntı temizliği.' },
        { title: 'Bitkilendirme', desc: 'Ağaç, çalı, yer örtücü ve mevsimlik bitkilerin dikimi.' },
        { title: 'Çim Uygulaması', desc: 'Tohum veya rulo çim ile çim alanları oluşturma.' },
        { title: 'Teslim', desc: 'Bakım talimatları ve ilk ay bakımı dahil teslim.' },
      ],
      en: [
        { title: 'Site Preparation', desc: 'Soil work, grading, drainage, and debris clearance.' },
        { title: 'Planting', desc: 'Installation of trees, shrubs, groundcovers, and seasonal plants.' },
        { title: 'Lawn Installation', desc: 'Seeding or sod installation for lawn areas.' },
        { title: 'Handover', desc: 'Care instructions and first-month maintenance included.' },
      ],
    },
    scope: {
      tr: ['Toprak hazırlığı', 'Bitkilendirme', 'Çim serimi', 'Mulch uygulaması', 'İlk ay bakımı'],
      en: ['Soil preparation', 'Planting', 'Sod installation', 'Mulching', 'First-month care'],
    },
    image: '/images/mediterranean/modern-villa.webp',
  },
  {
    id: 'hardscape',
    icon: 'Brick',
    title: { tr: 'Sert Peyzaj', en: 'Hardscape' },
    short: {
      tr: 'Doğal taş, ahşap ve beton elemanlarla kalıcı yapılar.',
      en: 'Permanent structures with natural stone, wood, and concrete elements.',
    },
    description: {
      tr: 'Patios, yürüyüş yolları, retaining duvarlar, pergolalar ve dış mekan mutfakları. Doğal malzemelerle uzun ömürlü, estetik dış mekan yapıları.',
      en: 'Patios, walkways, retaining walls, pergolas, and outdoor kitchens. Durable, aesthetic outdoor structures with natural materials.',
    },
    steps: {
      tr: [
        { title: 'Altyapı', desc: 'Kazı, alt temel ve drenaj katmanı hazırlığı.' },
        { title: 'Yapı', desc: 'Duvar, zemin kaplama ve taşıyıcı elemanlar.' },
        { title: 'Detay', desc: 'Derz dolgu, kenar bitirme ve temizlik.' },
        { title: 'Teslim', desc: 'Kullanıma hazır, garanti kapsamında teslim.' },
      ],
      en: [
        { title: 'Infrastructure', desc: 'Excavation, sub-base, and drainage layer preparation.' },
        { title: 'Structure', desc: 'Walls, surface paving, and structural elements.' },
        { title: 'Detail', desc: 'Joint filling, edge finishing, and cleaning.' },
        { title: 'Handover', desc: 'Ready for use, delivered with warranty.' },
      ],
    },
    scope: {
      tr: ['Doğal taş kaplama', 'Retaining duvar', 'Pergola', 'Dış mekan mutfak', 'Yürüyüş yolu'],
      en: ['Natural stone paving', 'Retaining wall', 'Pergola', 'Outdoor kitchen', 'Walkway'],
    },
    image: '/images/mediterranean/stone-villa.webp',
  },
  {
    id: 'irrigation',
    icon: 'Droplets',
    title: { tr: 'Sulama Sistemleri', en: 'Irrigation Systems' },
    short: {
      tr: 'Akıllı, su tasarruflu otomatik sulama çözümleri.',
      en: 'Smart, water-saving automatic irrigation solutions.',
    },
    description: {
      tr: 'Yağmur sensörü, akıllı kontrol ünitesi ve bölgesel programlama ile her bitki türüne uygun su verme. Damlama ve yağmurlama sistemleri.',
      en: 'Rain sensor, smart controller, and zone programming to water each plant type appropriately. Drip and sprinkler systems.',
    },
    steps: {
      tr: [
        { title: 'İhtiyaç Analizi', desc: 'Bitki türleri, alan ve su kaynağı değerlendirmesi.' },
        { title: 'Sistem Tasarımı', desc: 'Bölge planı, başlık ve boru güzergahı.' },
        { title: 'Montaj', desc: 'Boru hattı, başlıklar ve kontrol ünitesi kurulumu.' },
        { title: 'Programlama', desc: 'Bölgesel program ve yağmur sensörü ayarı.' },
      ],
      en: [
        { title: 'Needs Analysis', desc: 'Plant types, area, and water source assessment.' },
        { title: 'System Design', desc: 'Zone plan, head, and pipe routing.' },
        { title: 'Installation', desc: 'Pipeline, heads, and controller installation.' },
        { title: 'Programming', desc: 'Zone scheduling and rain sensor setup.' },
      ],
    },
    scope: {
      tr: ['Otomatik kontrol', 'Yağmur sensörü', 'Damlama sulama', 'Yağmurlama', 'Bakım'],
      en: ['Automatic controller', 'Rain sensor', 'Drip irrigation', 'Sprinkler', 'Maintenance'],
    },
    image: '/images/mediterranean/garden-path.webp',
  },
  {
    id: 'maintenance',
    icon: 'Scissors',
    title: { tr: 'Bahçe Bakımı', en: 'Garden Maintenance' },
    short: {
      tr: 'Düzenli bakım sözleşmeleriyle bahçenizin her zaman güzel kalması.',
      en: 'Regular maintenance contracts to keep your garden beautiful year-round.',
    },
    description: {
      tr: 'Çim biçme, budama, gübreleme, hastalık ve zararlı kontrolü, mevsimsel yenileme. Yıllık sözleşmelerle planlı ve düzenli bakım.',
      en: 'Mowing, pruning, fertilizing, pest control, and seasonal renewal. Planned, regular care with annual contracts.',
    },
    steps: {
      tr: [
        { title: 'Değerlendirme', desc: 'Mevcut bahçe durumu ve ihtiyaçların belirlenmesi.' },
        { title: 'Planlama', desc: 'Yıllık bakım takvimi ve ziyaret sıklığı.' },
        { title: 'Uygulama', desc: 'Düzenli ziyaretler ile bakım işlemleri.' },
        { title: 'Raporlama', desc: 'Aylık rapor ve öneriler.' },
      ],
      en: [
        { title: 'Assessment', desc: 'Current garden status and needs identified.' },
        { title: 'Planning', desc: 'Annual maintenance calendar and visit frequency.' },
        { title: 'Execution', desc: 'Maintenance operations with regular visits.' },
        { title: 'Reporting', desc: 'Monthly reports and recommendations.' },
      ],
    },
    scope: {
      tr: ['Çim biçma', 'Budama', 'Gübreleme', 'Zararlı kontrolü', 'Mevsimsel yenileme'],
      en: ['Mowing', 'Pruning', 'Fertilizing', 'Pest control', 'Seasonal renewal'],
    },
    image: '/images/mediterranean/stone-garden.webp',
  },
  {
    id: 'lighting',
    icon: 'Lightbulb',
    title: { tr: 'Peyzaj Aydınlatması', en: 'Landscape Lighting' },
    short: {
      tr: 'Akşam kullanımı ve güvenlik için sıcak tonlu LED aydınlatma.',
      en: 'Warm-toned LED lighting for evening use and security.',
    },
    description: {
      tr: 'Yürüyüş yolu, ağaç altı, oturma alanı ve su özelliklerini vurgulayan, düşük enerjili LED aydınlatma sistemleri. Otomatik zamanlayıcı ve hareket sensörü seçenekleri.',
      en: 'Low-energy LED lighting systems accentuating pathways, under-tree, seating areas, and water features. Automatic timer and motion sensor options.',
    },
    steps: {
      tr: [
        { title: 'Tasarım', desc: 'Aydınlatma planı, nokta seçimi ve ışık seviyesi.' },
        { title: 'Altyapı', desc: 'Kablo hattı, trafo ve kontrol ünitesi yerleşimi.' },
        { title: 'Montaj', desc: 'Aydınlatma elemanları ve bağlantı.' },
        { title: 'Programlama', desc: 'Zamanlayıcı ve sensör ayarları.' },
      ],
      en: [
        { title: 'Design', desc: 'Lighting plan, fixture selection, and light levels.' },
        { title: 'Infrastructure', desc: 'Cable routing, transformer, and controller placement.' },
        { title: 'Installation', desc: 'Lighting fixtures and connections.' },
        { title: 'Programming', desc: 'Timer and sensor configuration.' },
      ],
    },
    scope: {
      tr: ['LED aydınlatma', 'Yol ışıkları', 'Ağaç altı', 'Hareket sensörü', 'Otomatik kontrol'],
      en: ['LED lighting', 'Path lights', 'Under-tree', 'Motion sensor', 'Automatic control'],
    },
    image: '/images/mediterranean/modern-villa.webp',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Mehmet K.',
    location: { tr: 'Ankara, Çayyolu', en: 'Ankara, Çayyolu' },
    project: { tr: 'Konut bahçesi', en: 'Residential garden' },
    rating: 5,
    text: {
      tr: 'Arka bahçemizi 3 günde yeniden tasarladılar. Şimdi her akşam dışarıda oturuyoruz. Taş işçiliği gerçekten çok kaliteli.',
      en: 'They redesigned our backyard in 3 days. Now we sit outside every evening. The stonework is truly high quality.',
    },
  },
  {
    id: 't2',
    name: 'Ayşe D.',
    location: { tr: 'Ankara, Bilkent', en: 'Ankara, Bilkent' },
    project: { tr: 'Taş patio', en: 'Stone patio' },
    rating: 5,
    text: {
      tr: 'Sulama sistemi sayesinde bahçe kendiliğinden sulanıyor, su faturamız da düştü. Profesyonel ve zamanında iş.',
      en: 'Thanks to the irrigation system the garden waters itself, and our water bill dropped. Professional and on-time work.',
    },
  },
  {
    id: 't3',
    name: 'Can Ö.',
    location: { tr: 'Ankara, Çankaya', en: 'Ankara, Çankaya' },
    project: { tr: 'Ticari girişpeyzajı', en: 'Commercial entrance' },
    rating: 5,
    text: {
      tr: 'Ofis binamızın girişi artık çok daha davetkar. Müşterilerimiz hep olumlu yorum yapıyor. Bakım sözleşmesi de çok rahat.',
      en: 'Our office entrance is much more inviting now. Clients always comment positively. The maintenance contract is very convenient.',
    },
  },
  {
    id: 't4',
    name: 'Zeynep A.',
    location: { tr: 'Ankara, Ümitköy', en: 'Ankara, Ümitköy' },
    project: { tr: 'Havuz bahçesi', en: 'Pool garden' },
    rating: 5,
    text: {
      tr: 'Havuz çevresini tropik bitkilerle düzenlediler, akşam aydınlatması muhteşem. Çocuklarımız çok seviyor.',
      en: 'They arranged the poolside with tropical plants, and the evening lighting is stunning. Our kids love it.',
    },
  },
  {
    id: 't5',
    name: 'Murat T.',
    location: { tr: 'Ankara, İncek', en: 'Ankara, İncek' },
    project: { tr: 'Teras peyzajı', en: 'Terrace landscaping' },
    rating: 5,
    text: {
      tr: 'Terasımızı bir vaha gibi yaptılar. Ahşap zemin ve bitkilerle artık en sevdiğimiz mekan oldu.',
      en: 'They turned our terrace into an oasis. With wooden decking and plants it is now our favorite space.',
    },
  },
];

export const team: TeamMember[] = [
  {
    name: 'Deniz Yılmaz',
    role: { tr: 'Kurucu & Peyzaj Mimarı', en: 'Founder & Landscape Architect' },
  },
  {
    name: 'Selin Kaya',
    role: { tr: 'Tasarım Lideri', en: 'Design Lead' },
  },
  {
    name: 'Burak Demir',
    role: { tr: 'Uygulama Şefi', en: 'Implementation Lead' },
  },
];

export const heroSeasonalImages: SeasonalImage = {
  spring: '/images/seasons/hero-spring.webp',
  summer: '/images/mediterranean/garden-pool.webp',
  autumn: '/images/seasons/hero-autumn.webp',
  winter: '/images/seasons/hero-winter.webp',
};

export const aboutHeroImage = '/images/mediterranean/stone-garden.webp';

export const contactGardenImage = '/images/mediterranean/contact-garden.webp';

const dictionaries: Record<Locale, Dict> = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      services: 'Hizmetler',
      portfolio: 'Portföy',
      products: 'Ürünlerimiz',
      testimonials: 'Referanslar',
      contact: 'İletişim',
      cta: 'Ücretsiz Keşif',
    },
    hero: {
      badge: '15 yıllık deneyim',
      title: 'Doğayla buluşan mekanlar tasarlıyoruz',
      subtitle: 'Konut ve ticari peyzaj projelerinde tasarım, uygulama ve bakımın tek çatı altında. Toprakla başlayan, detayda güzelleşen işçilik.',
      primaryCta: 'Ücretsiz Keşif Talep Et',
      secondaryCta: 'Projelerimizi İncele',
      scroll: 'Aşağı kaydırın',
    },
    whyUs: {
      title: 'Neden Biz?',
      subtitle: 'Sadece bahçe yapmıyoruz; yaşayan, nefes alan mekanlar tasarlıyoruz.',
      items: [
        { icon: 'Leaf', title: 'Doğal Yaklaşım', desc: 'Yerli bitki türleri ve doğal malzemelerle sürdürülebilir peyzaj.' },
        { icon: 'Award', title: '15 Yıl Deneyim', desc: 'Yüzlerce tamamlanan proje ve memnun müşteri.' },
        { icon: 'Ruler', title: 'Detaylı Tasarım', desc: '3D görselleştirme ile teslimden önce projeyi görürsünüz.' },
        { icon: 'ShieldCheck', title: 'Garantili İşçilik', desc: 'Tüm uygulamalarımızda işçilik garantisi ve bakım desteği.' },
      ],
    },
    servicesPreview: {
      title: 'Hizmetlerimiz',
      subtitle: 'Tasarımdan bakıma, peyzajın her aşamasında yanınızdayız.',
      explore: 'Detaylı İncele',
    },
    featuredProjects: {
      title: 'Öne Çıkan Projeler',
      subtitle: 'Tamamladığımız çalışmalardan bir seçki.',
      viewAll: 'Tüm Projeler',
    },
    productsPreview: {
      badge: 'Özel Koleksiyon',
      title: 'Ürünlerimiz & Peyzaj Koleksiyonu',
      subtitle: 'Bahçeniz için özenle seçilmiş rulo çimler, heykelsi bitkiler, mimari aydınlatma ve dış mekan mobilyaları.',
      viewAll: 'Tüm Ürünleri İncele',
      selectCategory: 'Kategori Seçin',
      allProducts: 'Tüm Ürünler',
    },
    productsPage: {
      hero: {
        badge: 'Doğal Yaşam & Peyzaj',
        title: 'Peyzaj & Bahçe Ürünleri Koleksiyonu',
        subtitle: 'Açık hava yaşam alanlarınıza değer katan 1. sınıf hazır rulo çimler, tasarım bitkiler, dış mekan aydınlatmaları ve lüks bahçe mobilyaları.',
      },
      allProducts: 'Tüm Ürünler',
      selectCategory: 'Kategoriye Göre Filtrele',
      itemCount: 'Ürün',
    },
    testimonials: {
      title: 'Müşterilerimiz Ne Diyor?',
      subtitle: 'Bizim için en büyük ödül, memnun müşterilerimizin yorumları.',
    },
    stats: {
      title: 'Rakamlarla Biz',
      subtitle: '15 yılda biriken deneyim.',
      items: [
        { id: 's1', value: 250, suffix: '+', label: { tr: 'Tamamlanan Proje', en: 'Completed Projects' } },
        { id: 's2', value: 15, suffix: '', label: { tr: 'Yıl Deneyim', en: 'Years of Experience' } },
        { id: 's3', value: 180, suffix: '+', label: { tr: 'Mutlu Müşteri', en: 'Happy Clients' } },
        { id: 's4', value: 12, suffix: '', label: { tr: 'Uzman Ekip', en: 'Expert Team' } },
      ],
    },
    ctaSection: {
      title: 'Bahçenizi hayal ettiğiniz gibi tasarlamaya hazırız',
      subtitle: 'Ücretsiz saha keşfi ve tasarım önerisi için bize ulaşın. İlk 30 dakika görüşme tamamen ücretsiz.',
      button: 'Hemen Başvur',
      phone: '+90 312 123 45 67',
    },
    about: {
      hero: {
        badge: 'Hakkımızda',
        title: 'Toprakla başlayan, detayda güzelleşen işçilik',
        subtitle: '2009\'dan beri Ankara\'da konut ve ticari peyzaj projeleri üretiyoruz.',
      },
      story: {
        title: 'Hikayemiz',
        p1: 'Yeşil Toprak Peyzaj, 2009 yılında peyzaj mimarı Deniz Yılmaz tarafından kuruldu. İlk günümüzden beri inandığımız tek şey var: iyi peyzaj, doğayı taklit etmek değil onunla iş birliği yapmaktır.',
        p2: 'Yıllar içinde ekibimiz büyüdü, projelerimiz çeşitlendi. Ama yaklaşımız değişmedi: her sahada önce toprağı, iklimi ve insanı dinleriz. Sonra tasarlarız.',
        p3: 'Bugün 12 kişilik uzman ekibimizle yılda ortalama 30 proje tamamlıyoruz. Her projenin sonunda bir müşteri değil, bir bahçe dostu kazanmayı hedefliyoruz.',
      },
      values: {
        title: 'Değerlerimiz',
        subtitle: 'Bizi biz yapan ilkeler.',
        items: [
          { icon: 'Leaf', title: 'Sürdürülebilirlik', desc: 'Su tasarrufu, yerli türler ve organik bakım.' },
          { icon: 'Heart', title: 'Müşteri Odaklılık', desc: 'Her kararınızda sizinle birlikte, şeffaf.' },
          { icon: 'Award', title: 'İşçilik Kalitesi', desc: 'Detaylara özen, garantili uygulama.' },
          { icon: 'Clock', title: 'Zamanında Teslim', desc: 'Söz verdiğimiz tarihte, söz verdiğimiz gibi.' },
        ],
      },
      team: {
        title: 'Ekibimiz',
        subtitle: 'Alanında uzman, doğayı seven bir ekip.',
      },
      certifications: {
        title: 'Sertifikalar & Üyelikler',
        subtitle: 'Profesyonellik belgelerimiz.',
        items: ['Peyzaj Mimarları Odası Üyesi', 'TS-EN 1176 Sertifikalı', 'ISO 9001 Kalite Yönetimi', 'Bahçe Bakımı Sertifikası'],
      },
    },
    servicesPage: {
      hero: {
        badge: 'Hizmetler',
        title: 'Peyzajın her aşamasında yanınızdayız',
        subtitle: 'Tasarımdan bakıma, tek elden, bütüncül hizmet.',
      },
      explore: 'Detaylı İncele',
      processTitle: 'Süreç Adımları',
      scopeTitle: 'Kapsam',
      relatedProjects: 'İlgili Projeler',
      backToServices: 'Hizmetlere Dön',
    },
    portfolioPage: {
      hero: {
        badge: 'Portföy',
        title: 'Tamamladığımız projeler',
        subtitle: 'Her biri farklı bir ihtiyaç, farklı bir mekan. Filtreleyerek inceleyin.',
      },
      filters: {
        all: 'Tümü',
        residential: 'Konut',
        commercial: 'Ticari',
        hardscape: 'Sert Peyzaj',
        irrigation: 'Sulama',
        lighting: 'Aydınlatma',
        maintenance: 'Bakım',
      },
      close: 'Kapat',
      location: 'Konum',
      year: 'Yıl',
      scope: 'Kapsam',
      gallery: 'Galeri',
      backToPortfolio: 'Portföye Dön',
    },
    contactPage: {
      hero: {
        badge: 'İletişim',
        title: 'Birlikte çalışalım',
        subtitle: 'Projeniz için bize ulaşın, 24 saat içinde dönüş yapalım.',
      },
      form: {
        formTitle: 'Proje Talep Formu',
        name: 'Ad Soyad',
        phone: 'Telefon',
        email: 'E-posta',
        projectType: 'Proje Türü',
        message: 'Mesajınız',
        submit: 'Gönder',
        success: 'Mesajınız alındı. En kısa sürede dönüş yapacağız.',
        error: 'Bir hata oluştu. Lütfen tekrar deneyin veya telefonla ulaşın.',
        projectTypes: ['Peyzaj Tasarımı', 'Bahçe Uygulama', 'Sert Peyzaj', 'Sulama Sistemi', 'Bahçe Bakımı', 'Aydınlatma', 'Diğer'],
      },
      info: {
        title: 'İletişim Bilgileri',
        phone: 'Telefon',
        email: 'E-posta',
        hours: 'Çalışma Saatleri',
        hoursValue: 'Pzt - Cmt: 08:00 - 18:00',
        area: 'Hizmet Bölgesi',
        areaValue: 'Ankara ve çevre iller',
      },
      map: 'Harita',
    },
    footer: {
      tagline: 'Doğayla buluşan mekanlar tasarlıyoruz.',
      quickLinks: 'Hızlı Erişim',
      services: 'Hizmetler',
      contact: 'İletişim',
      rights: 'Tüm hakları saklıdır.',
    },
    theme: { light: 'Açık mod', dark: 'Koyu mod' },
    language: 'Dil',
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      products: 'Our Products',
      testimonials: 'Testimonials',
      contact: 'Contact',
      cta: 'Free Consultation',
    },
    hero: {
      badge: '15 years of experience',
      title: 'We design spaces that meet nature',
      subtitle: 'Design, implementation, and maintenance under one roof for residential and commercial landscape projects. Craft that starts with soil and shines in detail.',
      primaryCta: 'Request Free Consultation',
      secondaryCta: 'View Our Projects',
      scroll: 'Scroll down',
    },
    whyUs: {
      title: 'Why Us?',
      subtitle: 'We don\'t just make gardens; we design living, breathing spaces.',
      items: [
        { icon: 'Leaf', title: 'Natural Approach', desc: 'Sustainable landscaping with native plants and natural materials.' },
        { icon: 'Award', title: '15 Years Experience', desc: 'Hundreds of completed projects and happy clients.' },
        { icon: 'Ruler', title: 'Detailed Design', desc: 'See your project with 3D visualization before delivery.' },
        { icon: 'ShieldCheck', title: 'Guaranteed Craftsmanship', desc: 'Workmanship warranty and maintenance support on all projects.' },
      ],
    },
    servicesPreview: {
      title: 'Our Services',
      subtitle: 'From design to maintenance, we are with you at every stage of landscaping.',
      explore: 'Learn More',
    },
    featuredProjects: {
      title: 'Featured Projects',
      subtitle: 'A selection of our completed work.',
      viewAll: 'All Projects',
    },
    productsPreview: {
      badge: 'Exclusive Collection',
      title: 'Our Products & Landscape Collection',
      subtitle: 'Curated premium sod lawns, sculptural plants, architectural lighting, and outdoor living furniture.',
      viewAll: 'Explore All Products',
      selectCategory: 'Select Category',
      allProducts: 'All Products',
    },
    productsPage: {
      hero: {
        badge: 'Outdoor Living & Landscapes',
        title: 'Landscape & Garden Collection',
        subtitle: 'First-class sod grass, designer specimen trees, exterior illumination, and luxury all-weather furniture.',
      },
      allProducts: 'All Products',
      selectCategory: 'Filter by Category',
      itemCount: 'Items',
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Our biggest reward is the words of our happy clients.',
    },
    stats: {
      title: 'By the Numbers',
      subtitle: 'Experience accumulated over 15 years.',
      items: [
        { id: 's1', value: 250, suffix: '+', label: { tr: 'Tamamlanan Proje', en: 'Completed Projects' } },
        { id: 's2', value: 15, suffix: '', label: { tr: 'Yıl Deneyim', en: 'Years of Experience' } },
        { id: 's3', value: 180, suffix: '+', label: { tr: 'Mutlu Müşteri', en: 'Happy Clients' } },
        { id: 's4', value: 12, suffix: '', label: { tr: 'Uzman Ekip', en: 'Expert Team' } },
      ],
    },
    ctaSection: {
      title: 'We are ready to design your garden as you imagined',
      subtitle: 'Contact us for a free site survey and design proposal. The first 30-minute consultation is completely free.',
      button: 'Apply Now',
      phone: '+90 312 123 45 67',
    },
    about: {
      hero: {
        badge: 'About Us',
        title: 'Craft that starts with soil and shines in detail',
        subtitle: 'We have been producing residential and commercial landscape projects in Ankara since 2009.',
      },
      story: {
        title: 'Our Story',
        p1: 'Yeşil Toprak Peyzaj was founded in 2009 by landscape architect Deniz Yılmaz. From our first day, we have believed one thing: good landscaping is not imitating nature but collaborating with it.',
        p2: 'Over the years our team grew and our projects diversified. But our approach did not change: on every site we first listen to the soil, the climate, and the people. Then we design.',
        p3: 'Today our 12-person expert team completes an average of 30 projects per year. At the end of every project we aim to gain not a customer but a garden friend.',
      },
      values: {
        title: 'Our Values',
        subtitle: 'The principles that make us who we are.',
        items: [
          { icon: 'Leaf', title: 'Sustainability', desc: 'Water savings, native species, and organic care.' },
          { icon: 'Heart', title: 'Client Focus', desc: 'Transparent and together at every decision.' },
          { icon: 'Award', title: 'Craft Quality', desc: 'Attention to detail, guaranteed workmanship.' },
          { icon: 'Clock', title: 'On-Time Delivery', desc: 'On the date we promised, as we promised.' },
        ],
      },
      team: {
        title: 'Our Team',
        subtitle: 'A team of experts who love nature.',
      },
      certifications: {
        title: 'Certifications & Memberships',
        subtitle: 'Our professional credentials.',
        items: ['Chamber of Landscape Architects Member', 'TS-EN 1176 Certified', 'ISO 9001 Quality Management', 'Garden Maintenance Certificate'],
      },
    },
    servicesPage: {
      hero: {
        badge: 'Services',
        title: 'We are with you at every stage of landscaping',
        subtitle: 'From design to maintenance, comprehensive service from a single source.',
      },
      explore: 'Learn More',
      processTitle: 'Process Steps',
      scopeTitle: 'Scope',
      relatedProjects: 'Related Projects',
      backToServices: 'Back to Services',
    },
    portfolioPage: {
      hero: {
        badge: 'Portfolio',
        title: 'Our completed projects',
        subtitle: 'Each one a different need, a different space. Filter and explore.',
      },
      filters: {
        all: 'All',
        residential: 'Residential',
        commercial: 'Commercial',
        hardscape: 'Hardscape',
        irrigation: 'Irrigation',
        lighting: 'Lighting',
        maintenance: 'Maintenance',
      },
      close: 'Close',
      location: 'Location',
      year: 'Year',
      scope: 'Scope',
      gallery: 'Gallery',
      backToPortfolio: 'Back to Portfolio',
    },
    contactPage: {
      hero: {
        badge: 'Contact',
        title: 'Let\'s work together',
        subtitle: 'Reach out about your project and we will respond within 24 hours.',
      },
      form: {
        formTitle: 'Project Request Form',
        name: 'Full Name',
        phone: 'Phone',
        email: 'Email',
        projectType: 'Project Type',
        message: 'Your Message',
        submit: 'Send',
        success: 'Your message has been received. We will get back to you shortly.',
        error: 'An error occurred. Please try again or call us.',
        projectTypes: ['Landscape Design', 'Garden Implementation', 'Hardscape', 'Irrigation System', 'Garden Maintenance', 'Lighting', 'Other'],
      },
      info: {
        title: 'Contact Information',
        phone: 'Phone',
        email: 'Email',
        hours: 'Working Hours',
        hoursValue: 'Mon - Sat: 08:00 - 18:00',
        area: 'Service Area',
        areaValue: 'Ankara and surrounding provinces',
      },
      map: 'Map',
    },
    footer: {
      tagline: 'We design spaces that meet nature.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    theme: { light: 'Light mode', dark: 'Dark mode' },
    language: 'Language',
  },
};

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
