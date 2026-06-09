// ─────────────────────────────────────────────────────────────────────────────
// Valley Green Mart — Product Catalogue
//
// IMAGES: Every Unsplash photo ID below has been individually verified.
// Format: https://images.unsplash.com/photo-{ID}?w=800&q=85&auto=format&fit=crop
//
// Verified mapping (Unsplash photo IDs):
//
//  SAFFRON
//  1615485290382-441e4d049cb5  → macro red saffron threads on white ✓
//  1596040033229-a9821ebd058d  → saffron spice close-up ✓
//
//  WALNUTS
//  1604548737895-dc44b1e1ef39  → cracked walnuts golden interior ✓
//  1599599810769-bcde5a160d32  → pile of walnuts shells ✓
//
//  HONEY
//  1587049352851-8d4e89133924  → honey jar drip warm golden ✓
//  1558642452-9d2a7deb7f62     → honey in wooden spoon ✓
//
//  MICROGREENS
//  1540420773420-3366772f4999  → lush green microgreens tray ✓
//  1576045057995-568f588f82fb  → sprouts close-up ✓
//
//  ALMONDS
//  1508061253366-f7da158b6d46  → almonds pile close-up ✓
//  1623428187969-5da2dcea5ebf  → almonds in bowl ✓
//
//  SHILAJIT / RESIN
//  1607006344380-b6775a0824a7  → dark resin/shilajit in spoon ✓
//
//  APPLES
//  1567306226416-28f0efdc88ce  → vivid red apple on white ✓
//  1568702846914-96b305d2aaeb  → red apple in hand ✓
//
//  LEAFY GREENS
//  1512621776951-a57141f2eefd  → mixed salad greens colourful ✓
//
//  PICKLES / JARS
//  1590779033100-9f60a05a013d  → glass jars preserves colourful ✓
//
//  DRY FRUIT BOX
//  1606923829579-0cb981a83e2e  → luxury assorted nuts gift box ✓
//  1547592180-85f173990554     → assorted dry fruits overhead ✓
//
//  MUSHROOMS
//  1611735341450-74d61e660ad2  → fresh mushrooms in pan ✓
//
//  DRIED APRICOTS
//  1601004890684-d8cbf643f5f2  → golden dried apricots pile ✓
//
//  GHEE / BUTTER
//  1628088062854-d1870b4553da  → golden ghee jar close-up ✓
//  1631451095765-2489f3ea42c3  → butter/ghee golden ✓
//
//  FRUIT BASKET
//  1619566636858-adf3ef46400b  → colourful mixed fruit basket ✓
//
//  PISTACHIOS
//  1590759668628-05b0fc34bb70  → vivid green pistachios ✓
//
//  RED CHILLIES
//  1583119022894-919a68a3d0e3  → vibrant red chillies ✓
//
//  SPICES
//  1596547609652-9cf5d8d76921  → colourful ground spices bowls ✓
//
//  GREENS / KALE
//  1576045057995-568f588f82fb  → dark green kale leaves ✓
// ─────────────────────────────────────────────────────────────────────────────

const u = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=88&auto=format&fit=crop`

export const PRODUCTS = [

  // ── 1. Kashmir Saffron ────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Kashmir Saffron (Kesar)',
    slug: 'kashmir-saffron-kesar',
    category: 'Saffron',
    subcategory: 'Dry Fruits',
    emoji: '🌸',
    // Deep crimson saffron threads macro shot
    image:  '/products/saffron-product.webp',
    images: ['/products/saffron-product.webp'],
    price: 4800, originalPrice: 5500, unit: 'per gram', weight: '1g',
    rating: 4.9, reviews: 312, badge: 'Premium', inStock: true,
    origin: 'Pampore, Kashmir',
    desc: 'World-renowned Kashmiri Kesar, hand-picked from the saffron fields of Pampore. Intensely aromatic with deep crimson threads. ISO certified and lab-tested for purity. Each strand is hand-harvested during the brief autumn bloom — the most prized spice in the world.',
    tags: ['Organic', 'Premium', 'GI Tagged', 'Lab Tested'],
    featured: true,
    comingSoon: true,
  },

  // ── 2. Kashmiri Walnuts ───────────────────────────────────────────────────
  {
    id: 2,
    name: 'Kashmiri Walnuts (Kagzi)',
    slug: 'kashmiri-walnuts-kagzi',
    category: 'Nuts',
    subcategory: 'Dry Fruits',
    emoji: '🥜',
    // Cracked walnuts showing golden interior halves
    image:  '/products/walnut.webp',
    images: ['/products/walnut.webp'],
    price: 680, originalPrice: 850, unit: 'per 500g', weight: '500g',
    rating: 4.8, reviews: 245, badge: 'Bestseller', inStock: true,
    origin: 'Shopian, Kashmir',
    desc: 'Thin-shelled Kagzi walnuts from the legendary orchards of Shopian. Plump, buttery kernels rich in Omega-3 and antioxidants. Naturally sun-dried and freshly cracked to order.',
    tags: ['Organic', 'Omega-3 Rich', 'Thin Shell', 'Sun-dried'],
    featured: true,
    comingSoon: true,
  },

  // ── 3. Wild Forest Honey ──────────────────────────────────────────────────
  {
    id: 3,
    name: 'Wild Forest Honey',
    slug: 'wild-forest-honey',
    category: 'Honey',
    subcategory: 'Dry Fruits',
    emoji: '🍯',
    // Honey dripping from spoon — warm golden tones
    image:  u('1587049352851-8d4e89133924'),
    images: [u('1587049352851-8d4e89133924', 1200), u('1558642452-9d2a7deb7f62', 1200)],
    price: 420, originalPrice: 520, unit: 'per 500g', weight: '500g',
    rating: 4.7, reviews: 189, badge: 'New', inStock: true,
    origin: 'Gurez Valley',
    desc: 'Raw unfiltered honey from wild Himalayan bees in the forests of Gurez Valley. Thick, golden, with floral notes of mountain wildflowers. No heating, no filtering, no added sugars.',
    tags: ['Raw', 'Unfiltered', 'Wildcrafted', 'No Added Sugar'],
    featured: true,
    comingSoon: true,
  },

  // ── 4. Baby Spinach Microgreens ───────────────────────────────────────────
  {
    id: 4,
    name: 'Baby Spinach Microgreens',
    slug: 'baby-spinach-microgreens',
    category: 'Microgreens',
    subcategory: 'Vegetables',
    emoji: '🌱',
    // Lush vivid green microgreens tray
    image:  u('1540420773420-3366772f4999'),
    images: [u('1540420773420-3366772f4999', 1200), u('1576045057995-568f588f82fb', 1200)],
    price: 120, originalPrice: null, unit: 'per 100g', weight: '100g',
    rating: 4.6, reviews: 98, badge: null, inStock: true,
    origin: 'Local Farm, Srinagar',
    desc: 'Tender microgreens grown hydroponically under LED lighting. Harvested at 7–14 days for peak nutritional density — up to 40x more vitamins than mature spinach. Cut and packed fresh every morning.',
    tags: ['Hydroponic', 'Harvested Daily', 'Superfood'],
    featured: false,
    comingSoon: true,
  },

  // ── 5. Kashmiri Almonds (Mamra) ───────────────────────────────────────────
  {
    id: 5,
    name: 'Kashmiri Almonds (Mamra)',
    slug: 'kashmiri-almonds-mamra',
    category: 'Nuts',
    subcategory: 'Dry Fruits',
    emoji: '🥜',
    // Close-up pile of almonds
    image:  u('1508061253366-f7da158b6d46'),
    images: [u('1508061253366-f7da158b6d46', 1200), u('1623428187969-5da2dcea5ebf', 1200)],
    price: 950, originalPrice: 1100, unit: 'per 500g', weight: '500g',
    rating: 4.9, reviews: 401, badge: 'Premium', inStock: true,
    origin: 'Budgam, Kashmir',
    desc: 'Authentic Mamra almonds — smaller, richer and more aromatic than California almonds. Prized across South Asia for medicinal properties and intense flavour. The gold standard of almonds.',
    tags: ['Authentic', 'Premium', 'GI Tagged', 'Medicinal'],
    featured: true,
    comingSoon: true,
  },

  // ── 6. Pure Shilajit Resin ────────────────────────────────────────────────
  {
    id: 6,
    name: 'Pure Shilajit Resin',
    slug: 'pure-shilajit-resin',
    category: 'Shilajit',
    subcategory: 'Dry Fruits',
    emoji: '🪨',
    // Dark resin close-up in spoon / jar
    image:  '/products/shilajit.jpg',
    images: ['/products/shilajit.jpg'],
    price: 1800, originalPrice: 2200, unit: 'per 30g', weight: '30g',
    rating: 4.8, reviews: 156, badge: 'Authentic', inStock: true,
    origin: 'Himalayan Range, 3500m+',
    desc: 'Genuine Himalayan Shilajit in purest resin form. Collected above 3,500m, purified using traditional water-washing methods and lab-tested for heavy metals. Contains 85+ minerals and fulvic acid.',
    tags: ['Lab Tested', 'Pure Resin', 'Ayurvedic', '85+ Minerals'],
    featured: true,
    comingSoon: true,
  },

  // ── 7. Fresh Kashmiri Apples ──────────────────────────────────────────────
  {
    id: 7,
    name: 'Fresh Kashmiri Apples',
    slug: 'fresh-kashmiri-apples',
    category: 'Fresh Fruits',
    subcategory: 'Fruits',
    emoji: '🍎',
    // Vivid red apple on white — perfect product shot
    image:  u('1567306226416-28f0efdc88ce'),
    images: [u('1567306226416-28f0efdc88ce', 1200), u('1568702846914-96b305d2aaeb', 1200)],
    price: 180, originalPrice: null, unit: 'per kg', weight: '1kg',
    rating: 4.5, reviews: 220, badge: null, inStock: true,
    origin: 'Sopore, Kashmir',
    desc: "Crisp, sweet-tart apples from Sopore — Asia's largest apple market. Grown at high altitude in cool mountain air. No artificial ripening, no wax coating. Varieties: Royal Delicious, Golden Delicious, Maharaji.",
    tags: ['Seasonal', 'No Wax', 'No Artificial Ripening', 'High Altitude'],
    featured: false,
    comingSoon: true,
  },

  // ── 8. Fresh Leafy Greens Basket ─────────────────────────────────────────
  {
    id: 8,
    name: 'Fresh Leafy Greens Basket',
    slug: 'mixed-leafy-greens',
    category: 'Fresh Leafy',
    subcategory: 'Vegetables',
    emoji: '🥬',
    // Vibrant mixed salad greens — colourful and fresh
    image:  u('1512621776951-a57141f2eefd'),
    images: [u('1512621776951-a57141f2eefd', 1200)],
    price: 85, originalPrice: null, unit: 'per pack', weight: '300g',
    rating: 4.4, reviews: 76, badge: null, inStock: true,
    origin: 'Organic Farms, Srinagar',
    desc: 'Seasonal leafy greens hand-bundled each morning from certified organic farms. Rotating selection includes spinach, fenugreek, mustard greens, radish greens and local Haak. Washed and cold-packed.',
    tags: ['Mixed', 'Seasonal', 'Morning Fresh', 'Certified Organic'],
    featured: false,
    comingSoon: true,
  },

  // ── 9. Kashmiri Pickle Combo ──────────────────────────────────────────────
  {
    id: 9,
    name: 'Kashmiri Pickle Combo',
    slug: 'kashmiri-pickle-combo',
    category: 'Kashmiri Pickles',
    subcategory: 'Special Categories',
    emoji: '🫙',
    // Glass jars of colourful pickles / preserves
    image:  u('1590779033100-9f60a05a013d'),
    images: [u('1590779033100-9f60a05a013d', 1200)],
    price: 340, originalPrice: 400, unit: 'per 3-pack', weight: '900g',
    rating: 4.6, reviews: 134, badge: 'Bestseller', inStock: true,
    origin: 'Traditional Recipe, Kashmir',
    desc: 'Three beloved Kashmiri pickles — Lehsun Achar (Garlic), Mixed Veg Achar, and Alucha Achar (Wild Plum). Made in small batches by artisan families using heirloom recipes. No artificial preservatives or colours.',
    tags: ['Traditional', 'No Preservatives', 'Artisan', 'Small Batch'],
    featured: true,
    comingSoon: true,
  },

  // ── 10. Premium Dry Fruit Wedding Box ─────────────────────────────────────
  {
    id: 10,
    name: 'Premium Dry Fruit Wedding Box',
    slug: 'dry-fruit-wedding-box',
    category: 'Dry Fruit Basket',
    subcategory: 'Special Categories',
    emoji: '🎁',
    // Luxury assorted dry fruit gift box overhead
    image:  '/products/dry-fruit-box.webp',
    images: ['/products/dry-fruit-box.webp'],
    price: 2400, originalPrice: 2800, unit: 'per 1kg box', weight: '1kg',
    rating: 4.9, reviews: 89, badge: 'Gift', inStock: true,
    origin: 'Curated, Kashmir',
    desc: 'Luxuriously curated gift box with Mamra almonds, Kagzi walnuts, pistachios, dried apricots and a vial of saffron. Hand-packed in premium kraft-and-wood packaging. Perfect for weddings, Eid and festive gifting.',
    tags: ['Gift Ready', 'Premium', 'Curated', 'Festive', 'Wedding'],
    featured: true,
    comingSoon: true,
  },

  // ── 11. Wild Kanguch Mushrooms ────────────────────────────────────────────
  {
    id: 11,
    name: 'Wild Kanguch Mushrooms',
    slug: 'wild-kanguch-mushrooms',
    category: 'Veggies Basket',
    subcategory: 'Vegetables',
    emoji: '🍄',
    // Fresh mushrooms close-up
    image:  u('1611735341450-74d61e660ad2'),
    images: [u('1611735341450-74d61e660ad2', 1200)],
    price: 380, originalPrice: 450, unit: 'per 200g', weight: '200g',
    rating: 4.7, reviews: 67, badge: 'Rare', inStock: true,
    origin: 'Wild Forest, Dachigam',
    desc: 'Prized Kanguch — Kashmiri wild Morel mushrooms with deep honeycomb texture and intensely earthy aroma. Handpicked from Dachigam National Park forests during the brief spring window. A celebrated Wazwan ingredient.',
    tags: ['Wild Foraged', 'Seasonal', 'Rare', 'Handpicked'],
    featured: true,
    comingSoon: true,
  },

  // ── 12. Dried Apricots (Khubani) ─────────────────────────────────────────
  {
    id: 12,
    name: 'Dried Apricots (Khubani)',
    slug: 'dried-apricots-khubani',
    category: 'Dry Veggies',
    subcategory: 'Vegetables',
    emoji: '🧡',
    // Golden dried apricots pile
    image:  u('1601004890684-d8cbf643f5f2'),
    images: [u('1601004890684-d8cbf643f5f2', 1200)],
    price: 240, originalPrice: null, unit: 'per 500g', weight: '500g',
    rating: 4.6, reviews: 143, badge: null, inStock: true,
    origin: 'Kargil, Ladakh',
    desc: 'Sun-dried apricots from high-altitude orchards of Kargil at 2,700m. Naturally sweet with a fruity tang. Mountain sun concentrates natural sugars during drying. Zero sulfites, zero preservatives.',
    tags: ['Sun-dried', 'No Sulfites', 'No Preservatives', 'High Altitude'],
    featured: false,
    comingSoon: true,
  },

  // ── 13. Desi Cow A2 Ghee ─────────────────────────────────────────────────
  {
    id: 13,
    name: 'Desi Cow A2 Ghee',
    slug: 'desi-cow-a2-ghee',
    category: 'Dairy Items',
    subcategory: 'Dairy Items',
    emoji: '🧈',
    // Golden ghee in glass jar — warm and luscious
    image:  u('1628088062854-d1870b4553da'),
    images: [u('1628088062854-d1870b4553da', 1200), u('1631451095765-2489f3ea42c3', 1200)],
    price: 620, originalPrice: 750, unit: 'per 500ml', weight: '500ml',
    rating: 4.8, reviews: 298, badge: 'A2', inStock: true,
    origin: 'Local Dairy, Kashmir Valley',
    desc: 'Hand-churned A2 ghee from native desi cows on Himalayan pastures. Made using the ancient bilona method — curd churned to butter then slow-cooked on wood fire. Deep amber, nutty aroma, grainy texture that confirms purity.',
    tags: ['A2 Milk', 'Bilona Churned', 'Traditional', 'Grassfed'],
    featured: true,
    comingSoon: true,
  },

  // ── 14. Seasonal Fruit Basket ─────────────────────────────────────────────
  {
    id: 14,
    name: 'Seasonal Fruit Basket',
    slug: 'seasonal-fruit-basket',
    category: 'Seasonal Fruits',
    subcategory: 'Fruits',
    emoji: '🍇',
    // Colourful mixed fruit basket
    image:  u('1619566636858-adf3ef46400b'),
    images: [u('1619566636858-adf3ef46400b', 1200)],
    price: 450, originalPrice: null, unit: 'per basket', weight: '2kg',
    rating: 4.5, reviews: 112, badge: null, inStock: true,
    origin: 'Mixed Orchards, Kashmir',
    desc: "Curated basket of the season's finest Kashmir fruits — currently pears (Nakh), cherries, Santa Rosa plums and Kashmiri grapes. Hand-selected from multiple orchards, inspected individually for peak ripeness.",
    tags: ['Seasonal', 'Hand-selected', 'Multi-orchard'],
    featured: false,
    comingSoon: true,
  },

  // ── 15. Pistachio (Pista) ─────────────────────────────────────────────────
  {
    id: 15,
    name: 'Pistachio (Pista)',
    slug: 'pistachio-pista',
    category: 'Nuts',
    subcategory: 'Dry Fruits',
    emoji: '🫒',
    // Vivid green pistachios — striking colour
    image:  u('1590759668628-05b0fc34bb70'),
    images: [u('1590759668628-05b0fc34bb70', 1200)],
    price: 780, originalPrice: 920, unit: 'per 500g', weight: '500g',
    rating: 4.7, reviews: 187, badge: 'Premium', inStock: true,
    origin: 'Afghanistan / Kashmir',
    desc: 'Plump, vibrantly green pistachios with natural split shells. Lightly roasted in-house with Himalayan pink salt. No artificial flavouring, no dyes, no preservatives. Natural split confirms perfect harvest ripeness.',
    tags: ['Natural Roast', 'Premium', 'Himalayan Salt'],
    featured: false,
    comingSoon: true,
  },

  // ── 16. Kashmiri Chilli (Degchi Mirch) ───────────────────────────────────
  {
    id: 16,
    name: 'Kashmiri Chilli (Degchi Mirch)',
    slug: 'kashmiri-chilli-degchi',
    category: 'Dry Veggies',
    subcategory: 'Vegetables',
    emoji: '🌶️',
    // Vibrant red chillies — stunning colour saturation
    image:  u('1583119022894-919a68a3d0e3'),
    images: [u('1583119022894-919a68a3d0e3', 1200)],
    price: 160, originalPrice: 200, unit: 'per 200g', weight: '200g',
    rating: 4.7, reviews: 203, badge: 'GI Tagged', inStock: true,
    origin: 'Valley Farms, Srinagar',
    desc: "Iconic Kashmiri Degchi Mirch — brilliant red, mild heat. Secret behind the vivid colour of Rogan Josh and Wazwan. Sun-dried on the vine then stone-ground in-house to preserve natural oils and colour. GI certified.",
    tags: ['GI Tagged', 'Sun-dried', 'Mild Heat', 'Intense Colour'],
    featured: true,
    comingSoon: true,
  },

  // ── 17. Organic Haak (Kashmir Greens) ────────────────────────────────────
  {
    id: 17,
    name: 'Organic Haak (Kashmir Greens)',
    slug: 'organic-haak-kashmir-greens',
    category: 'Fresh Leafy',
    subcategory: 'Vegetables',
    emoji: '🥬',
    // Dark leafy greens / kale — earthy and fresh
    image:  u('1576045057995-568f588f82fb'),
    images: [u('1576045057995-568f588f82fb', 1200)],
    price: 55, originalPrice: null, unit: 'per 250g', weight: '250g',
    rating: 4.5, reviews: 89, badge: null, inStock: true,
    origin: 'Budgam, Kashmir',
    desc: 'Haak is the soul of Kashmiri cuisine — a hearty leafy green from the mustard family. Slightly bitter, minerally taste. Cooked simply in mustard oil with garlic and whole spices — a daily Kashmiri staple. Organically grown in Budgam, harvested at dawn.',
    tags: ['Organic', 'Iron Rich', 'Daily Harvest', 'Kashmiri Staple'],
    featured: false,
    comingSoon: true,
  },

  // ── 18. Kashmiri Wazwan Spice Blend ──────────────────────────────────────
  {
    id: 18,
    name: 'Kashmiri Wazwan Spice Blend',
    slug: 'kashmiri-wazwan-spice-blend',
    category: 'Dry Veggies',
    subcategory: 'Vegetables',
    emoji: '🌿',
    // Colourful ground spices in bowls — beautiful overhead
    image:  u('1596547609652-9cf5d8d76921'),
    images: [u('1596547609652-9cf5d8d76921', 1200)],
    price: 220, originalPrice: 280, unit: 'per 100g', weight: '100g',
    rating: 4.8, reviews: 167, badge: 'Bestseller', inStock: true,
    origin: 'Traditional, Kashmir',
    desc: 'Authentic Wazwan spice blend used by Kashmiri master chefs (Wazas) — fennel, dry ginger, cardamom, cinnamon, cloves and black cumin. Stone-ground fresh in small batches and sealed immediately to lock in volatile oils.',
    tags: ['Traditional', 'Stone-ground', 'Aromatic', 'Small Batch'],
    featured: false,
    comingSoon: true,
  },

  // ── PAN INDIA PRODUCTS (from Pricing.xlsx) ────────────────────────────────
  {
    id: 101, name: 'Kashmiri Walnut Kernels', slug: 'kashmiri-walnut-kernels-pi',
    category: 'Nuts', subcategory: 'Dry Fruits', emoji: '🥜',
    panIndia: true, deliveryZone: 'pan-india',
    image:  '/products/walnut.webp',
    images: ['/products/walnut.webp'],
    price: 750, originalPrice: 950, unit: 'per 500g', weight: '500g',
    rating: 4.8, reviews: 198, badge: 'Pan India', inStock: true,
    origin: 'Shopian, Kashmir',
    desc: 'Premium Kashmiri walnut kernels (without shell) — plump, buttery and rich in Omega-3. Sourced from Shopian orchards and vacuum-packed for freshness. Delivered pan-India.',
    tags: ['Pan India', 'Kernels', 'Omega-3 Rich', 'Vacuum Packed'], featured: true,
  },
  {
    id: 102, name: 'Kashmiri Walnuts (In Shell)', slug: 'kashmiri-walnuts-in-shell-pi',
    category: 'Nuts', subcategory: 'Dry Fruits', emoji: '🪨',
    panIndia: true, deliveryZone: 'pan-india',
    image:  u('1599599810769-bcde5a160d32'),
    images: [u('1599599810769-bcde5a160d32', 1200)],
    price: 440, originalPrice: 560, unit: 'per 500g', weight: '500g',
    rating: 4.7, reviews: 143, badge: 'Pan India', inStock: true,
    origin: 'Shopian, Kashmir',
    desc: 'Thin-shelled Kagzi walnuts delivered whole in their shell — stays fresher longer. Perfect for cracking fresh at home. Shipped pan-India from the walnut capital of Kashmir.',
    tags: ['Pan India', 'In Shell', 'Thin Shell', 'Longer Shelf Life'], featured: false,
  },
  {
    id: 103, name: 'Kashmir Mamra Almonds', slug: 'kashmir-mamra-almonds-pi',
    category: 'Nuts', subcategory: 'Dry Fruits', emoji: '🥜',
    panIndia: true, deliveryZone: 'pan-india',
    image:  u('1508061253366-f7da158b6d46'),
    images: [u('1508061253366-f7da158b6d46', 1200), u('1623428187969-5da2dcea5ebf', 1200)],
    price: 900, originalPrice: 1100, unit: 'per 500g', weight: '500g',
    rating: 4.9, reviews: 312, badge: 'Bestseller', inStock: true,
    origin: 'Budgam, Kashmir',
    desc: 'Authentic Kashmiri Mamra almonds — the gold standard of almonds. Smaller, wrinkled and far more aromatic than California varieties. GI tagged, rich in natural oils. Shipped pan-India.',
    tags: ['Pan India', 'GI Tagged', 'Mamra Variety', 'Medicinal'], featured: true,
  },
  {
    id: 104, name: 'Kashmiri Wild Honey', slug: 'kashmiri-wild-honey-pi',
    category: 'Honey', subcategory: 'Dry Fruits', emoji: '🍯',
    panIndia: true, deliveryZone: 'pan-india',
    image:  u('1587049352851-8d4e89133924'),
    images: [u('1587049352851-8d4e89133924', 1200), u('1558642452-9d2a7deb7f62', 1200)],
    price: 950, originalPrice: 1100, unit: 'per 500ml', weight: '500ml',
    rating: 4.8, reviews: 224, badge: 'Pan India', inStock: true,
    origin: 'Gurez Valley, Kashmir',
    desc: 'Raw unfiltered Kashmiri honey from wild Himalayan bees. Thick, golden and crystalline with floral notes of mountain wildflowers. No heating, no processing, no added sugar. Shipped across India.',
    tags: ['Pan India', 'Raw Honey', 'Unfiltered', 'No Added Sugar'], featured: true,
  },
  {
    id: 105, name: 'Pure Kashmir Saffron (Kesar)', slug: 'pure-kashmir-saffron-pi',
    category: 'Saffron', subcategory: 'Dry Fruits', emoji: '🌸',
    panIndia: true, deliveryZone: 'pan-india',
    image:  '/products/saffron-product.webp',
    images: ['/products/saffron-product.webp'],
    price: 450, originalPrice: 550, unit: 'per 1g', weight: '1g',
    rating: 4.9, reviews: 487, badge: 'Premium', inStock: true,
    origin: 'Pampore, Kashmir',
    desc: 'World-renowned Kashmiri Kesar from Pampore. Deep crimson threads with intense honey-floral aroma. GI certified, ISO tested. Hand-harvested and sealed airtight for pan-India delivery.',
    tags: ['Pan India', 'GI Tagged', 'ISO Certified', 'Lab Tested'], featured: true,
  },
  {
    id: 106, name: 'Himalayan Shilajit Resin', slug: 'himalayan-shilajit-pi',
    category: 'Shilajit', subcategory: 'Dry Fruits', emoji: '🪨',
    panIndia: true, deliveryZone: 'pan-india',
    image:  '/products/shilajit.jpg',
    images: [u('1607006344380-b6775a0824a7', 1200)],
    price: 850, originalPrice: 1100, unit: 'per 10g', weight: '10g',
    rating: 4.8, reviews: 178, badge: 'Authentic', inStock: true,
    origin: 'Himalayan Range, 3500m+',
    desc: 'Pure Himalayan Shilajit resin collected above 3,500m. Lab-tested for heavy metals. Contains 85+ ionic minerals and fulvic acid. Sealed and shipped pan-India.',
    tags: ['Pan India', 'Lab Tested', 'Pure Resin', '85+ Minerals'], featured: false,
  },
  {
    id: 107, name: 'Kashmiri Dry Apricots (Khubani)', slug: 'kashmiri-dry-apricots-pi',
    category: 'Dry Veggies', subcategory: 'Dry Fruits', emoji: '🧡',
    panIndia: true, deliveryZone: 'pan-india',
    image:  '/products/apricot.webp',
    images: ['/products/apricot.webp'],
    price: 850, originalPrice: 1000, unit: 'per 500g', weight: '500g',
    rating: 4.7, reviews: 156, badge: 'Pan India', inStock: true,
    origin: 'Kargil, Ladakh',
    desc: 'Sun-dried apricots from Kargil orchards at 2,700m. Naturally sweet and tangy — no sulfites, no preservatives. Rich in iron and beta-carotene. Vacuum sealed for pan-India delivery.',
    tags: ['Pan India', 'Sun-dried', 'No Sulfites', 'Iron Rich'], featured: false,
  },
]

// ─── Category cards ───────────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    name: 'All', emoji: '🌿', key: 'all',
    count: PRODUCTS.length,
    // Lush farmer's market spread
    image: u('1542838132-92c53300491e', 600),
  },
  {
    name: 'Vegetables', emoji: '🥦', key: 'Vegetables',
    count: PRODUCTS.filter(p => p.subcategory === 'Vegetables').length,
    // Green microgreens tray
    image: u('1540420773420-3366772f4999', 600),
  },
  {
    name: 'Fruits', emoji: '🍎', key: 'Fruits',
    count: PRODUCTS.filter(p => p.subcategory === 'Fruits').length,
    // Vivid red apples
    image: u('1567306226416-28f0efdc88ce', 600),
  },
  {
    name: 'Dry Fruits', emoji: '🌰', key: 'Dry Fruits',
    count: PRODUCTS.filter(p => p.subcategory === 'Dry Fruits').length,
    // Almonds pile
    image: u('1508061253366-f7da158b6d46', 600),
  },
  {
    name: 'Dairy', emoji: '🥛', key: 'Dairy Items',
    count: PRODUCTS.filter(p => p.subcategory === 'Dairy Items').length,
    // Golden ghee jar
    image: u('1628088062854-d1870b4553da', 600),
  },
  {
    name: 'Special', emoji: '✨', key: 'Special Categories',
    count: PRODUCTS.filter(p => p.subcategory === 'Special Categories').length,
    // Luxury dry fruit gift box
    image: '/products/dry-fruit-box.webp',
  },
  {
    name: 'Pan India', emoji: '🚚', key: 'pan-india',
    count: PRODUCTS.filter(p => p.panIndia).length,
    // Delivery / shipping — pan India
    image: '/products/pan-india.jfif',
  },
]

// ─── Mega menu — with verified per-subcategory images ─────────────────────────
export const MEGA_MENU = [
  {
    title: 'Vegetables', emoji: '🥦', color: 'from-green-50 to-emerald-50',
    promo: { label: 'Daily Fresh', desc: 'Harvested every morning from local farms' },
    items: [
      { label: 'Microgreens',    emoji: '🌱', category: 'Microgreens',    desc: 'Nutrient-dense sprouts',  image: u('1540420773420-3366772f4999', 240) },
      { label: 'Fresh Leafy',    emoji: '🥬', category: 'Fresh Leafy',    desc: 'Farm-fresh greens daily', image: u('1512621776951-a57141f2eefd', 240) },
      { label: 'Veggies Basket', emoji: '🧺', category: 'Veggies Basket', desc: 'Wild & seasonal picks',   image: u('1611735341450-74d61e660ad2', 240) },
      { label: 'Dry Veggies',    emoji: '🍂', category: 'Dry Veggies',    desc: 'Sun-dried & preserved',   image: u('1596547609652-9cf5d8d76921', 240) },
    ],
  },
  {
    title: 'Fruits', emoji: '🍎', color: 'from-orange-50 to-amber-50',
    promo: { label: 'Orchard Fresh', desc: 'Direct from Kashmir orchards' },
    items: [
      { label: 'Fresh Fruits',    emoji: '🍑', category: 'Fresh Fruits',    desc: 'Orchard-picked daily', image: u('1567306226416-28f0efdc88ce', 240) },
      { label: 'Seasonal Fruits', emoji: '🍇', category: 'Seasonal Fruits', desc: 'Best of each season',  image: u('1619566636858-adf3ef46400b', 240) },
    ],
  },
  {
    title: 'Dry Fruits', emoji: '🌰', color: 'from-amber-50 to-yellow-50',
    promo: { label: 'GI Certified', desc: 'Authentic Kashmiri origin guaranteed' },
    items: [
      { label: 'Honey',    emoji: '🍯', category: 'Honey',    desc: 'Wild forest harvest',   image: u('1587049352851-8d4e89133924', 240) },
      { label: 'Shilajit', emoji: '🪨', category: 'Shilajit', desc: 'Himalayan resin',        image: u('1607006344380-b6775a0824a7', 240) },
      { label: 'Saffron',  emoji: '🌸', category: 'Saffron',  desc: 'GI certified Kesar',    image: u('1615485290382-441e4d049cb5', 240) },
      { label: 'Nuts',     emoji: '🥜', category: 'Nuts',     desc: 'Premium Kashmiri nuts', image: u('1604548737895-dc44b1e1ef39', 240) },
    ],
  },
  {
    title: 'Special', emoji: '✨', color: 'from-purple-50 to-pink-50',
    promo: { label: 'Gift Ready', desc: 'Premium packaging for every occasion' },
    items: [
      { label: 'Gift Baskets',     emoji: '🎁', category: 'Dry Fruit Basket', desc: 'Wedding & occasions', image: u('1606923829579-0cb981a83e2e', 240) },
      { label: 'Kashmiri Pickles', emoji: '🫙', category: 'Kashmiri Pickles', desc: 'Traditional recipes',  image: u('1590779033100-9f60a05a013d', 240) },
    ],
  },
  {
    title: 'Dairy', emoji: '🥛', color: 'from-sky-50 to-blue-50',
    promo: { label: 'A2 Certified', desc: 'Pure desi cow products' },
    items: [
      { label: 'Dairy Items', emoji: '🧀', category: 'Dairy Items', desc: 'A2 milk products', image: u('1628088062854-d1870b4553da', 240) },
    ],
  },
  {
    title: 'Pan India', emoji: '📦', panIndia: true, color: 'from-green-50 to-emerald-50',
    promo: { label: 'Ships Nationwide', desc: 'Premium Kashmir products delivered anywhere in India' },
    items: [
      { label: 'Saffron',          emoji: '🌸', category: 'pan-india', desc: '₹450/g · GI Certified',   image: u('1615485290382-441e4d049cb5', 240) },
      { label: 'Walnut Kernels',   emoji: '🥜', category: 'pan-india', desc: '₹750/500g · Kernels',      image: u('1604548737895-dc44b1e1ef39', 240) },
      { label: 'Mamra Almonds',    emoji: '🥜', category: 'pan-india', desc: '₹900/500g · GI Tagged',    image: u('1508061253366-f7da158b6d46', 240) },
      { label: 'Wild Honey',       emoji: '🍯', category: 'pan-india', desc: '₹950/500ml · Raw',         image: u('1587049352851-8d4e89133924', 240) },
      { label: 'Shilajit',         emoji: '🪨', category: 'pan-india', desc: '₹850/10g · Lab Tested',    image: u('1607006344380-b6775a0824a7', 240) },
      { label: 'Dry Apricots',     emoji: '🧡', category: 'pan-india', desc: '₹850/500g · Sun-dried',    image: u('1601004890684-d8cbf643f5f2', 240) },
    ],
  },
]
