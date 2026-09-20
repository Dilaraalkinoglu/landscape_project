export type ProductCategory = 'turf' | 'plants' | 'lighting' | 'furniture';

export interface ProductItem {
  id: string;
  category: ProductCategory;
  title: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  image: string;
  tag: { tr: string; en: string };
  specs?: { tr: string; en: string };
}

export const PRODUCT_CATEGORIES: { id: ProductCategory; name: { tr: string; en: string }; icon: string }[] = [
  { id: 'turf', name: { tr: 'Çimler', en: 'Lawns & Turf' }, icon: '🌱' },
  { id: 'plants', name: { tr: 'Bitkiler', en: 'Plants & Trees' }, icon: '🌿' },
  { id: 'lighting', name: { tr: 'Bahçe Aydınlatması', en: 'Garden Lighting' }, icon: '💡' },
  { id: 'furniture', name: { tr: 'Bahçe Mobilyası', en: 'Garden Furniture' }, icon: '🪑' },
];

export const PRODUCTS_LIST: ProductItem[] = [
  // ÇİMLER (Turf) - 4 Ürün
  {
    id: 'turf-1',
    category: 'turf',
    title: { tr: 'Premium Doğal Rulo Çim', en: 'Premium Sod Grass' },
    subtitle: { tr: 'Sıcağa ve yoğun basılmaya dayanıklı, 1. sınıf hazır rulo çim.', en: 'Heat & high-traffic resistant first-grade sod.' },
    image: '/images/products/çim-1.jpg',
    tag: { tr: 'En Çok Satan', en: 'Best Seller' },
    specs: { tr: 'Yoğun Doku · Hızlı Köklenme', en: 'Dense Texture · Fast Rooting' },
  },
  {
    id: 'turf-2',
    category: 'turf',
    title: { tr: 'Gölge Alan Özel Karışım Çim', en: 'Shade-Tolerant Lawn Blend' },
    subtitle: { tr: 'Ağaç altları ve az güneş alan bahçeler için koyu yeşil örtü.', en: 'Lush green carpet for under-tree and low-light gardens.' },
    image: '/images/products/çim-2.jpg',
    tag: { tr: 'Gölge Uyumlu', en: 'Shade Tolerant' },
    specs: { tr: 'Festuca Ağırlıklı · Dayanıklı', en: 'Festuca Based · Hardy' },
  },
  {
    id: 'turf-3',
    category: 'turf',
    title: { tr: 'Spor & Aktivite Çimi', en: 'Sports & Activity Turf' },
    subtitle: { tr: 'Çocuk oyun alanları ve evcil hayvan dostu ultra dayanıklı çim tabakası.', en: 'Pet & child friendly ultra-durable turf surface.' },
    image: '/images/products/çim-3.jpg',
    tag: { tr: 'Ağır Hizmet', en: 'Heavy Duty' },
    specs: { tr: 'Kendini Onaran · Esnek', en: 'Self-Repairing · Flexible' },
  },
  {
    id: 'turf-4',
    category: 'turf',
    title: { tr: 'Kurakçıl Düşük Su Tüketimli Çim', en: 'Drought-Tolerant Eco Turf' },
    subtitle: { tr: '%50 daha az su tüketen, sürdürülebilir çevre dostu çim dokusu.', en: 'Uses 50% less water, sustainable eco-friendly blend.' },
    image: '/images/products/çim-4.jpg',
    tag: { tr: 'Ekolojik', en: 'Eco-Friendly' },
    specs: { tr: 'Derin Kök · Su Tasarruflu', en: 'Deep Root · Water Saving' },
  },

  // BİTKİLER (Plants) - 3 Ürün
  {
    id: 'plant-1',
    category: 'plants',
    title: { tr: 'Asırlık Formlu Zeytin Ağacı', en: 'Centuries-Style Olive Tree' },
    subtitle: { tr: 'Peyzaj odak noktası olan, budanmış heykelsi gövdeli yaşlı zeytin.', en: 'Focal landscape centerpiece with sculptural ancient trunk.' },
    image: '/images/products/zeytin-ağacı.jpg',
    tag: { tr: 'Odak Noktası', en: 'Signature Plant' },
    specs: { tr: 'Olea Europaea · Akdeniz Havası', en: 'Olea Europaea · Mediterranean' },
  },
  {
    id: 'plant-2',
    category: 'plants',
    title: { tr: 'Japon Kırmızı Akçaağaç (Acer)', en: 'Japanese Red Maple (Acer)' },
    subtitle: { tr: 'Sonbaharda alev kırmızısına dönen zarif yapraklı özel tasarım ağaççık.', en: 'Graceful leaves that turn flaming red in autumn.' },
    image: '/images/products/japon-kırmızı.jpg',
    tag: { tr: 'Koleksiyon', en: 'Collector' },
    specs: { tr: 'Acer Palmatum · Canlı Renk', en: 'Acer Palmatum · Vivid Color' },
  },
  {
    id: 'plant-3',
    category: 'plants',
    title: { tr: 'Lavanta & Biberiye Bordür Seti', en: 'Lavender & Rosemary Border' },
    subtitle: { tr: 'Koku yayan, arı dostu ve kuraklığa tam dayanıklı bordür çalıları.', en: 'Aromatic, pollinator friendly & drought-hardy shrubs.' },
    image: '/images/products/lavanta.jpg',
    tag: { tr: 'Aromatik', en: 'Aromatic' },
    specs: { tr: 'Sürekli Çiçek · Az Bakım', en: 'Continuous Bloom · Low Care' },
  },

  // BAHÇE AYDINLATMASI (Lighting) - 7 Ürün
  {
    id: 'light-1',
    category: 'lighting',
    title: { tr: 'Modern Bahçe Bollard Aydınlatma', en: 'Modern Garden Path Bollard' },
    subtitle: { tr: 'Zarif dikey form, kamaşmasız homojen zemin ve yol aydınlatması.', en: 'Elegant vertical form with glare-free path lighting.' },
    image: '/images/products/aydınlatma.jpg',
    tag: { tr: 'Yol & Bordür', en: 'Pathway' },
    specs: { tr: '3000K Sıcak Işık · IP65 Koruma', en: '3000K Warm Light · IP65' },
  },
  {
    id: 'light-2',
    category: 'lighting',
    title: { tr: 'Dekoratif Peyzaj Feneri', en: 'Decorative Landscape Lantern' },
    subtitle: { tr: 'Bahçe köşeleri ve dinlenme alanları için atmosferik ortam ışığı.', en: 'Atmospheric ambient lighting for patio and corners.' },
    image: '/images/products/aydınlatma-2.jpg',
    tag: { tr: 'Ortam Işığı', en: 'Ambient' },
    specs: { tr: 'Alüminyum Gövde · Su Geçirmez', en: 'Aluminum Body · Waterproof' },
  },
  {
    id: 'light-3',
    category: 'lighting',
    title: { tr: 'Bitki & Ağaç Vurgu Projektörü', en: 'Plant Accent Spotlight' },
    subtitle: { tr: 'Ağaç gövdeleri ve bitki gruplarını alttan aydınlatan ayarlanabilir spot.', en: 'Adjustable ground spotlight for tree and shrub highlights.' },
    image: '/images/products/aydınlatma-3.jpg',
    tag: { tr: 'Vurgu Spotu', en: 'Accent Spot' },
    specs: { tr: 'Açı Ayarlı · Güçlü LED', en: 'Adjustable Angle · Powerful LED' },
  },
  {
    id: 'light-4',
    category: 'lighting',
    title: { tr: 'Minimalist Bahçe Direk Lambası', en: 'Minimalist Garden Post Light' },
    subtitle: { tr: 'Yürüyüş aksları boyunca modern ve mimari aydınlatma direği.', en: 'Architectural lighting pole along walkways.' },
    image: '/images/products/aydınlatma-4.jpg',
    tag: { tr: 'Mimari', en: 'Architectural' },
    specs: { tr: 'Korozyona Dayanıklı · 12V Güvenli', en: 'Corrosion Resistant · 12V' },
  },
  {
    id: 'light-5',
    category: 'lighting',
    title: { tr: 'Gömme Zemin Yürüyüş Spotu', en: 'In-Ground Walkway Uplight' },
    subtitle: { tr: 'Üzerine basılabilir paslanmaz çelik gömme zemin armatürü.', en: 'Walk-over stainless steel recessed in-ground fixture.' },
    image: '/images/products/aydınlatma-5.jpg',
    tag: { tr: 'Gömme Spot', en: 'In-Ground' },
    specs: { tr: 'IP67 Koruma · Çelik Çerçeve', en: 'IP67 Rated · Steel Bezel' },
  },
  {
    id: 'light-6',
    category: 'lighting',
    title: { tr: 'Doğal Işık Yayılımlı Park Armatürü', en: 'Park & Lawn Area Light' },
    subtitle: { tr: 'Geniş çim alanlar ve oturma bölümleri için 360 derece ışık dağılımı.', en: '360-degree light distribution for open lawns.' },
    image: '/images/products/aydınlatma-6.jpg',
    tag: { tr: 'Geniş Açı', en: 'Wide Angle' },
    specs: { tr: 'Düşük Tüketim · Uzun Ömür', en: 'Low Power · Long Life' },
  },
  {
    id: 'light-7',
    category: 'lighting',
    title: { tr: 'Mimari Duvar & Cephe Apliği', en: 'Architectural Wall Sconce Spot' },
    subtitle: { tr: 'Bahçe duvarlarında yukarı/aşağı ışık huzmeleri oluşturan çift yönlü aplik.', en: 'Up/down bidirectional beam wall sconce fixture.' },
    image: '/images/products/duvar-spotu.jpg',
    tag: { tr: 'Duvar Spotu', en: 'Wall Spot' },
    specs: { tr: 'Çift Yönlü Işık · Alüminyum', en: 'Dual Beam · Aluminum' },
  },

  // BAHÇE MOBİLYASI (Furniture) - 5 Ürün
  {
    id: 'furn-1',
    category: 'furniture',
    title: { tr: 'Lüks Dış Mekan Köşe Koltuk Takımı', en: 'Luxury Outdoor Sectional Lounge' },
    subtitle: { tr: 'Su itici kumaşlı, paslanmaz iskeletli 4 mevsim oturma grubu.', en: 'Water-repellent fabric with all-weather rustproof frame.' },
    image: '/images/products/bahçe-mobilyası.jpg',
    tag: { tr: 'Köşe Takımı', en: 'Sectional' },
    specs: { tr: 'Dış Mekan Kumaş · Geniş Oturum', en: 'Outdoor Fabric · Spacious' },
  },
  {
    id: 'furn-2',
    category: 'furniture',
    title: { tr: 'Masif Tik Ahşap Bahçe Masası', en: 'Solid Teak Garden Dining Table' },
    subtitle: { tr: 'Doğal tik ağacından imal edilen, geniş aile toplantıları için masa.', en: 'Handcrafted natural teak wood dining table.' },
    image: '/images/products/bahçe-mobilyası-1.jpg',
    tag: { tr: 'Doğal Ahşap', en: 'Natural Teak' },
    specs: { tr: '1. Sınıf Tik · 8 Kişilik', en: 'First-Grade Teak · 8-Seat' },
  },
  {
    id: 'furn-3',
    category: 'furniture',
    title: { tr: 'Modern Bahçe Berjeri & Sehpası', en: 'Modern Garden Armchair & Side Table' },
    subtitle: { tr: 'Balkon, veranda ve teraslar için hafif ve ergonomik tasarım.', en: 'Lightweight ergonomic design for patio and veranda.' },
    image: '/images/products/bahçe-mobilyası-2.jpg',
    tag: { tr: 'Ergonomik', en: 'Ergonomic' },
    specs: { tr: 'UV Korumalı · Kolay Temizlenir', en: 'UV Protected · Easy Clean' },
  },
  {
    id: 'furn-4',
    category: 'furniture',
    title: { tr: 'Teras & Veranda Dinlenme Takımı', en: 'Terrace & Veranda Relaxation Set' },
    subtitle: { tr: 'Güneş ışınlarına ve neme tam dayanıklı çağdaş oturma seti.', en: 'Contemporary seating fully resistant to sun & humidity.' },
    image: '/images/products/bahçe-mobilyası-3.jpg',
    tag: { tr: 'Teras Takımı', en: 'Terrace Set' },
    specs: { tr: 'Alüminyum İskelet · Konforlu Minder', en: 'Aluminum Frame · Plush Cushion' },
  },
  {
    id: 'furn-5',
    category: 'furniture',
    title: { tr: 'Güneş Korunaklı Bahçe Daybed & Şezlong', en: 'Garden Daybed & Canopy Sunlounger' },
    subtitle: { tr: 'Havuz başı ve gölgelikli bahçeler için maksimum konforlu dinlenme yatağı.', en: 'Maximum comfort daybed for poolside and garden retreats.' },
    image: '/images/products/bahçe-mobilyası-4.jpg',
    tag: { tr: 'Lüks Daybed', en: 'Luxury Daybed' },
    specs: { tr: 'Korumalı Tente · Ekstra Yumuşak', en: 'Canopy Shade · Extra Plush' },
  },
];

// 4 kategori arasında dengeli ve karışık olarak harmanlanmış deterministik liste.
// SSR ve Client tarafında birebir aynı sırayla üretilir; Next.js hydration hatası oluşmaz.
export const ALL_PRODUCTS_MIXED: ProductItem[] = [
  PRODUCTS_LIST[0],  // turf-1: Doğal Rulo Çim
  PRODUCTS_LIST[4],  // plant-1: Asırlık Zeytin Ağacı
  PRODUCTS_LIST[7],  // light-1: Modern Bollard Aydınlatma
  PRODUCTS_LIST[14], // furn-1: Lüks Köşe Koltuk
  PRODUCTS_LIST[1],  // turf-2: Gölge Çim
  PRODUCTS_LIST[5],  // plant-2: Japon Kırmızı Akçaağaç
  PRODUCTS_LIST[8],  // light-2: Peyzaj Feneri
  PRODUCTS_LIST[15], // furn-2: Tik Ahşap Masa
  PRODUCTS_LIST[2],  // turf-3: Spor Çimi
  PRODUCTS_LIST[6],  // plant-3: Lavanta Bordür
  PRODUCTS_LIST[9],  // light-3: Ağaç Vurgu Projektörü
  PRODUCTS_LIST[16], // furn-3: Modern Bahçe Berjeri
  PRODUCTS_LIST[3],  // turf-4: Kurakçıl Çim
  PRODUCTS_LIST[10], // light-4: Direk Lambası
  PRODUCTS_LIST[17], // furn-4: Teras Takımı
  PRODUCTS_LIST[11], // light-5: Gömme Zemin Spotu
  PRODUCTS_LIST[18], // furn-5: Bahçe Daybed
  PRODUCTS_LIST[12], // light-6: Park Armatürü
  PRODUCTS_LIST[13], // light-7: Duvar Spotu
];

export function getShuffledProducts(): ProductItem[] {
  return ALL_PRODUCTS_MIXED;
}
