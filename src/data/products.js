// ─────────────────────────────────────────────────────────────────────────────
// Valley Green Mart — Product Catalogue
// All images: hand-picked from Unsplash for maximum visual appeal
// Format: ?w=800&q=85&auto=format&fit=crop  (sharp, fast, beautiful)
// ─────────────────────────────────────────────────────────────────────────────

export const PRODUCTS = [
  // ── 1. Kashmir Saffron ────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Kashmir Saffron (Kesar)',
    slug: 'kashmir-saffron-kesar',
    category: 'Saffron',
    subcategory: 'Dry Fruits',
    emoji: '🌸',
    // Gorgeous close-up of saffron threads — deep crimson on white
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 4800,
    originalPrice: 5500,
    unit: 'per gram',
    weight: '1g',
    rating: 4.9,
    reviews: 312,
    badge: 'Premium',
    inStock: true,
    origin: 'Pampore, Kashmir',
    desc: 'World-renowned Kashmiri Kesar, hand-picked from the saffron fields of Pampore. Intensely aromatic with deep crimson threads and a rich honey-like sweetness. ISO certified and lab-tested for purity. Each strand is carefully hand-harvested during the brief autumn bloom — the most expensive spice in the world, and worth every rupee.',
    tags: ['Organic', 'Premium', 'GI Tagged', 'Lab Tested', 'ISO Certified'],
    featured: true,
  },

  // ── 2. Kashmiri Walnuts ───────────────────────────────────────────────────
  {
    id: 2,
    name: 'Kashmiri Walnuts (Kagzi)',
    slug: 'kashmiri-walnuts-kagzi',
    category: 'Nuts',
    subcategory: 'Dry Fruits',
    emoji: '🥜',
    // Beautiful overhead shot of cracked walnuts showing golden interior
    image: 'https://images.unsplash.com/photo-1604548737895-dc44b1e1ef39?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1604548737895-dc44b1e1ef39?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 680,
    originalPrice: 850,
    unit: 'per 500g',
    weight: '500g',
    rating: 4.8,
    reviews: 245,
    badge: 'Bestseller',
    inStock: true,
    origin: 'Shopian, Kashmir',
    desc: 'Thin-shelled Kagzi walnuts from the legendary orchards of Shopian — the walnut capital of Kashmir. Plump, buttery kernels bursting with Omega-3 and antioxidants. Naturally sun-dried and freshly cracked to order for maximum freshness.',
    tags: ['Organic', 'Omega-3 Rich', 'Thin Shell', 'Sun-dried'],
    featured: true,
  },

  // ── 3. Wild Forest Honey ──────────────────────────────────────────────────
  {
    id: 3,
    name: 'Wild Forest Honey',
    slug: 'wild-forest-honey',
    category: 'Honey',
    subcategory: 'Dry Fruits',
    emoji: '🍯',
    // Stunning golden honey drip with warm bokeh background
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1471943038886-a76a4651e60e?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 420,
    originalPrice: 520,
    unit: 'per 500g',
    weight: '500g',
    rating: 4.7,
    reviews: 189,
    badge: 'New',
    inStock: true,
    origin: 'Gurez Valley',
    desc: 'Raw, unfiltered honey collected from wild Himalayan bees deep in the pristine forests of Gurez Valley. Thick, crystalline-golden with floral notes of mountain wildflowers. 100% natural — no heating, no filtering, no added sugars. Retains all enzymes, pollen and antioxidants.',
    tags: ['Raw', 'Unfiltered', 'Antibiotic-free', 'Wildcrafted', 'No Added Sugar'],
    featured: true,
  },

  // ── 4. Baby Spinach Microgreens ───────────────────────────────────────────
  {
    id: 4,
    name: 'Baby Spinach Microgreens',
    slug: 'baby-spinach-microgreens',
    category: 'Microgreens',
    subcategory: 'Vegetables',
    emoji: '🌱',
    // Lush vivid green microgreens tray — vibrant and fresh
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 120,
    originalPrice: null,
    unit: 'per 100g',
    weight: '100g',
    rating: 4.6,
    reviews: 98,
    badge: null,
    inStock: true,
    origin: 'Local Farm, Srinagar',
    desc: 'Tender, vibrant microgreens grown hydroponically under controlled LED lighting. Harvested at the 7–14 day stage for peak nutritional density — up to 40x more vitamins than mature spinach. Cut and packed fresh every morning.',
    tags: ['Hydroponic', 'Harvested Daily', 'Superfood', '40x Nutrients'],
    featured: false,
  },

  // ── 5. Kashmiri Almonds (Mamra) ───────────────────────────────────────────
  {
    id: 5,
    name: 'Kashmiri Almonds (Mamra)',
    slug: 'kashmiri-almonds-mamra',
    category: 'Nuts',
    subcategory: 'Dry Fruits',
    emoji: '🥜',
    // Elegant almonds with soft shadows — premium look
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600189020440-be33b3b53e1a?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 950,
    originalPrice: 1100,
    unit: 'per 500g',
    weight: '500g',
    rating: 4.9,
    reviews: 401,
    badge: 'Premium',
    inStock: true,
    origin: 'Budgam, Kashmir',
    desc: 'Authentic Mamra almonds — the original Kashmiri variety, smaller and wrinkled compared to California almonds but infinitely more aromatic and flavourful. Prized across South Asia for their medicinal properties, richer oil content, and traditional use in Unani medicine. The gold standard of almonds.',
    tags: ['Authentic', 'Premium', 'GI Tagged', 'Medicinal', 'Unani'],
    featured: true,
  },

  // ── 6. Pure Shilajit Resin ────────────────────────────────────────────────
  {
    id: 6,
    name: 'Pure Shilajit Resin',
    slug: 'pure-shilajit-resin',
    category: 'Shilajit',
    subcategory: 'Dry Fruits',
    emoji: '🪨',
    // Dark resin with earthy, powerful aesthetic
    image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 1800,
    originalPrice: 2200,
    unit: 'per 30g',
    weight: '30g',
    rating: 4.8,
    reviews: 156,
    badge: 'Authentic',
    inStock: true,
    origin: 'Himalayan Range, 3500m+',
    desc: 'Genuine Himalayan Shilajit in purest resin form. Collected by skilled harvesters at altitudes above 3,500m where it seeps from rock crevices during summer heat. Carefully purified using traditional water-washing methods and lab-tested for heavy metals. Contains 85+ ionic minerals, fulvic acid and dibenzo-alpha-pyrones.',
    tags: ['Lab Tested', 'Pure Resin', 'Ayurvedic', '85+ Minerals', 'Fulvic Acid'],
    featured: true,
  },

  // ── 7. Fresh Kashmiri Apples ──────────────────────────────────────────────
  {
    id: 7,
    name: 'Fresh Kashmiri Apples',
    slug: 'fresh-kashmiri-apples',
    category: 'Fresh Fruits',
    subcategory: 'Fruits',
    emoji: '🍎',
    // Perfect vivid red apples with gorgeous colour and lighting
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 180,
    originalPrice: null,
    unit: 'per kg',
    weight: '1kg',
    rating: 4.5,
    reviews: 220,
    badge: null,
    inStock: true,
    origin: 'Sopore, Kashmir',
    desc: "Crisp, sweet-tart apples from Sopore — the 'Apple Town' of Kashmir and the largest apple market in Asia. Grown at high altitude in cool mountain air with rich volcanic soil, these apples develop exceptional flavour and crunch. No artificial ripening, no wax coating. Varieties include Royal Delicious, Golden Delicious, and heritage Maharaji.",
    tags: ['Seasonal', 'No Wax Coating', 'No Artificial Ripening', 'High Altitude'],
    featured: false,
  },

  // ── 8. Fresh Leafy Greens Basket ─────────────────────────────────────────
  {
    id: 8,
    name: 'Fresh Leafy Greens Basket',
    slug: 'mixed-leafy-greens',
    category: 'Fresh Leafy',
    subcategory: 'Vegetables',
    emoji: '🥬',
    // Vibrant mixed greens — stunning colour and freshness
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 85,
    originalPrice: null,
    unit: 'per pack',
    weight: '300g',
    rating: 4.4,
    reviews: 76,
    badge: null,
    inStock: true,
    origin: 'Organic Farms, Srinagar',
    desc: 'A lush basket of seasonal leafy greens — hand-bundled each morning from certified organic farms on the outskirts of Srinagar. Rotating seasonal selection includes spinach, fenugreek (methi), mustard greens, radish greens, and local Kashmir greens (Haak). Washed, sorted and cold-packed for maximum shelf life.',
    tags: ['Mixed', 'Seasonal', 'Morning Fresh', 'Certified Organic', 'Washed'],
    featured: false,
  },

  // ── 9. Kashmiri Pickle Combo ──────────────────────────────────────────────
  {
    id: 9,
    name: 'Kashmiri Pickle Combo',
    slug: 'kashmiri-pickle-combo',
    category: 'Kashmiri Pickles',
    subcategory: 'Special Categories',
    emoji: '🫙',
    // Beautiful glass jars of colourful pickles
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 340,
    originalPrice: 400,
    unit: 'per 3-pack',
    weight: '900g',
    rating: 4.6,
    reviews: 134,
    badge: 'Bestseller',
    inStock: true,
    origin: 'Traditional Recipe, Kashmir',
    desc: 'Three beloved Kashmiri pickles in one gift-ready set — Lehsun Achar (Garlic Pickle), Mixed Veg Achar (seasonal vegetables), and Alucha Achar (Wild Plum Pickle). Made in small batches by local artisan families using heirloom recipes passed down generations. No artificial preservatives, no artificial colours.',
    tags: ['Traditional', 'No Preservatives', 'Artisan', 'Small Batch', 'Handmade'],
    featured: true,
  },

  // ── 10. Premium Dry Fruit Wedding Box ─────────────────────────────────────
  {
    id: 10,
    name: 'Premium Dry Fruit Wedding Box',
    slug: 'dry-fruit-wedding-box',
    category: 'Dry Fruit Basket',
    subcategory: 'Special Categories',
    emoji: '🎁',
    // Luxurious assorted dry fruits — warm, premium aesthetic
    image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 2400,
    originalPrice: 2800,
    unit: 'per 1kg box',
    weight: '1kg',
    rating: 4.9,
    reviews: 89,
    badge: 'Gift',
    inStock: true,
    origin: 'Curated, Kashmir',
    desc: 'A luxuriously curated gift box, hand-packed with the finest of Kashmir — Mamra almonds, Kagzi walnuts, pistachios, dried apricots, raisins and a sealed vial of pure saffron. Presented in premium kraft-and-wood packaging tied with natural twine. Ideal for weddings, Eid, Diwali and corporate gifting.',
    tags: ['Gift Ready', 'Premium', 'Curated', 'Festive', 'Wedding', 'Corporate'],
    featured: true,
  },

  // ── 11. Wild Kanguch (Morel) Mushrooms ────────────────────────────────────
  {
    id: 11,
    name: 'Wild Kanguch Mushrooms',
    slug: 'wild-kanguch-mushrooms',
    category: 'Veggies Basket',
    subcategory: 'Vegetables',
    emoji: '🍄',
    // Stunning morel mushrooms — earthy and beautiful
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 380,
    originalPrice: 450,
    unit: 'per 200g',
    weight: '200g',
    rating: 4.7,
    reviews: 67,
    badge: 'Rare',
    inStock: true,
    origin: 'Wild Forest, Dachigam',
    desc: 'Prized Kanguch — Kashmiri wild Morel mushrooms (Morchella esculenta) with a deep honeycomb texture and intensely earthy, smoky aroma. Handpicked from the ancient forests of Dachigam National Park during the brief spring window. The most celebrated ingredient in traditional Wazwan cuisine. Extremely seasonal and limited.',
    tags: ['Wild Foraged', 'Seasonal', 'Rare', 'Handpicked', 'Limited Stock'],
    featured: true,
  },

  // ── 12. Dried Apricots (Khubani) ─────────────────────────────────────────
  {
    id: 12,
    name: 'Dried Apricots (Khubani)',
    slug: 'dried-apricots-khubani',
    category: 'Dry Veggies',
    subcategory: 'Vegetables',
    emoji: '🧡',
    // Beautiful golden dried apricots — warm amber tones
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 240,
    originalPrice: null,
    unit: 'per 500g',
    weight: '500g',
    rating: 4.6,
    reviews: 143,
    badge: null,
    inStock: true,
    origin: 'Kargil, Ladakh',
    desc: 'Sun-dried apricots from the high-altitude orchards of Kargil at 2,700m. Naturally sweet with a fruity tang and chewy texture. The intense mountain sun concentrates the natural sugars and nutrients during the drying process. Zero added sulfites, zero preservatives — just pure, honest fruit.',
    tags: ['Sun-dried', 'No Sulfites', 'No Preservatives', 'High Altitude', '2700m'],
    featured: false,
  },

  // ── 13. Desi Cow A2 Ghee ─────────────────────────────────────────────────
  {
    id: 13,
    name: 'Desi Cow A2 Ghee',
    slug: 'desi-cow-a2-ghee',
    category: 'Dairy Items',
    subcategory: 'Dairy Items',
    emoji: '🧈',
    // Golden, luscious ghee in a jar — warm and inviting
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631451095765-2489f3ea42c3?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 620,
    originalPrice: 750,
    unit: 'per 500ml',
    weight: '500ml',
    rating: 4.8,
    reviews: 298,
    badge: 'A2',
    inStock: true,
    origin: 'Local Dairy, Kashmir Valley',
    desc: 'Traditionally hand-churned A2 ghee from native Kashmiri desi cows that graze freely on Himalayan pastures. Made using the ancient bilona (wooden churning) method — curd is churned into butter, then slow-cooked over wood fire. The result is a deep amber ghee with rich nutty aroma and grainy texture that confirms purity.',
    tags: ['A2 Milk', 'Bilona Churned', 'Traditional', 'Grassfed', 'Wood-fire Made'],
    featured: true,
  },

  // ── 14. Seasonal Fruit Basket ─────────────────────────────────────────────
  {
    id: 14,
    name: 'Seasonal Fruit Basket',
    slug: 'seasonal-fruit-basket',
    category: 'Seasonal Fruits',
    subcategory: 'Fruits',
    emoji: '🍇',
    // Abundant, colourful fruit basket — gorgeous and inviting
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 450,
    originalPrice: null,
    unit: 'per basket',
    weight: '2kg',
    rating: 4.5,
    reviews: 112,
    badge: null,
    inStock: true,
    origin: 'Mixed Orchards, Kashmir',
    desc: "A generously curated basket of the season's finest Kashmir fruits — hand-selected from multiple orchards for peak ripeness. Current season features Kashmiri pears (Nakh), dark Cherries, Santa Rosa plums, and Kashmiri grapes. Selection rotates monthly. Each basket is inspected individually.",
    tags: ['Seasonal', 'Hand-selected', 'Multi-orchard', 'Rotating Selection'],
    featured: false,
  },

  // ── 15. Pistachio (Pista) ─────────────────────────────────────────────────
  {
    id: 15,
    name: 'Pistachio (Pista)',
    slug: 'pistachio-pista',
    category: 'Nuts',
    subcategory: 'Dry Fruits',
    emoji: '🫒',
    // Vivid green pistachios — beautiful colour contrast
    image: 'https://images.unsplash.com/photo-1590759668628-05b0fc34bb70?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590759668628-05b0fc34bb70?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590760475226-60ada5127a6f?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 780,
    originalPrice: 920,
    unit: 'per 500g',
    weight: '500g',
    rating: 4.7,
    reviews: 187,
    badge: 'Premium',
    inStock: true,
    origin: 'Afghanistan / Kashmir',
    desc: 'Plump, vibrantly green pistachios sourced from the finest orchards. The natural split shell confirms they were harvested at perfect ripeness. Lightly roasted in-house with Himalayan pink salt to bring out their natural buttery sweetness. No artificial flavouring, no dyes, no preservatives.',
    tags: ['Natural Roast', 'Premium', 'Himalayan Salt', 'No Artificial Flavour'],
    featured: false,
  },

  // ── 16. Kashmiri Chilli (Degchi Mirch) ───────────────────────────────────
  {
    id: 16,
    name: 'Kashmiri Chilli (Degchi Mirch)',
    slug: 'kashmiri-chilli-degchi',
    category: 'Dry Veggies',
    subcategory: 'Vegetables',
    emoji: '🌶️',
    // Vibrant red chillies — stunning colour
    image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 160,
    originalPrice: 200,
    unit: 'per 200g',
    weight: '200g',
    rating: 4.7,
    reviews: 203,
    badge: 'GI Tagged',
    inStock: true,
    origin: 'Valley Farms, Srinagar',
    desc: "The iconic Kashmiri Degchi Mirch — celebrated worldwide for its brilliant lipstick-red colour and surprisingly mild heat. The secret behind the vibrant colour of Rogan Josh, Kashmiri Dum Aloo and Wazwan. Sun-dried whole on the vine, then stone-ground in-house to preserve the natural oils and aroma. GI tag certified.",
    tags: ['GI Tagged', 'Sun-dried', 'Mild Heat', 'Intense Colour', 'Stone-ground'],
    featured: true,
  },

  // ── 17. Organic Haak (Kashmiri Greens) ───────────────────────────────────
  {
    id: 17,
    name: 'Organic Haak (Kashmir Greens)',
    slug: 'organic-haak-kashmir-greens',
    category: 'Fresh Leafy',
    subcategory: 'Vegetables',
    emoji: '🥬',
    // Deep green kale-like leaves — earthy and fresh
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 55,
    originalPrice: null,
    unit: 'per 250g',
    weight: '250g',
    rating: 4.5,
    reviews: 89,
    badge: null,
    inStock: true,
    origin: 'Budgam, Kashmir',
    desc: "Haak is the soul of Kashmiri cuisine — a hearty leafy green from the mustard family with a slightly bitter, minerally taste. Cooked simply in mustard oil with garlic and whole spices, it's a daily staple in Kashmiri homes. Our Haak is organically grown in Budgam's fertile fields and harvested at dawn.",
    tags: ['Organic', 'Iron Rich', 'Daily Harvest', 'Traditional', 'Kashmiri Staple'],
    featured: false,
  },

  // ── 18. Kashmiri Spice Blend ──────────────────────────────────────────────
  {
    id: 18,
    name: 'Kashmiri Wazwan Spice Blend',
    slug: 'kashmiri-wazwan-spice-blend',
    category: 'Dry Veggies',
    subcategory: 'Vegetables',
    emoji: '🌿',
    // Beautiful warm spices in overhead shot — deeply atmospheric
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=800&q=88&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=1200&q=88&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1200&q=88&auto=format&fit=crop',
    ],
    price: 220,
    originalPrice: 280,
    unit: 'per 100g',
    weight: '100g',
    rating: 4.8,
    reviews: 167,
    badge: 'Bestseller',
    inStock: true,
    origin: 'Traditional, Kashmir',
    desc: 'The authentic Wazwan spice blend used by Kashmiri master chefs (Wazas) — a fragrant marriage of Saunf (fennel), Soonth (dry ginger), Elaichi (cardamom), Dalchini (cinnamon), Laung (cloves) and Kala Zeera (black cumin). Stone-ground fresh in small batches and sealed immediately to lock in volatile oils.',
    tags: ['Traditional', 'Stone-ground', 'Aromatic', 'Small Batch', 'Fresh Ground'],
    featured: false,
  },
]

// ─── Category display cards ────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    name: 'All', emoji: '🌿', key: 'all',
    count: PRODUCTS.length,
    // Lush farmer's market spread
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=88&auto=format&fit=crop',
  },
  {
    name: 'Vegetables', emoji: '🥦', key: 'Vegetables',
    count: PRODUCTS.filter(p => p.subcategory === 'Vegetables').length,
    // Vibrant colourful vegetable arrangement
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=88&auto=format&fit=crop',
  },
  {
    name: 'Fruits', emoji: '🍎', key: 'Fruits',
    count: PRODUCTS.filter(p => p.subcategory === 'Fruits').length,
    // Stunning red apple close-up
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=88&auto=format&fit=crop',
  },
  {
    name: 'Dry Fruits', emoji: '🌰', key: 'Dry Fruits',
    count: PRODUCTS.filter(p => p.subcategory === 'Dry Fruits').length,
    // Assorted nuts in warm tones
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&q=88&auto=format&fit=crop',
  },
  {
    name: 'Dairy', emoji: '🥛', key: 'Dairy Items',
    count: PRODUCTS.filter(p => p.subcategory === 'Dairy Items').length,
    // Golden ghee pour
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&q=88&auto=format&fit=crop',
  },
  {
    name: 'Special', emoji: '✨', key: 'Special Categories',
    count: PRODUCTS.filter(p => p.subcategory === 'Special Categories').length,
    // Luxurious gift box of dry fruits
    image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&q=88&auto=format&fit=crop',
  },
]

// ─── Mega menu — category groups with curated images ──────────────────────────
export const MEGA_MENU = [
  {
    title: 'Vegetables',
    emoji: '🥦',
    color: 'from-green-50 to-emerald-50',
    promo: { label: 'Daily Fresh', desc: 'Harvested every morning from local farms' },
    items: [
      {
        label: 'Microgreens',
        emoji: '🌱',
        category: 'Microgreens',
        desc: 'Nutrient-dense sprouts',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=240&q=80&auto=format&fit=crop',
      },
      {
        label: 'Fresh Leafy',
        emoji: '🥬',
        category: 'Fresh Leafy',
        desc: 'Farm-fresh greens daily',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=240&q=80&auto=format&fit=crop',
      },
      {
        label: 'Veggies Basket',
        emoji: '🧺',
        category: 'Veggies Basket',
        desc: 'Seasonal assortments',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=240&q=80&auto=format&fit=crop',
      },
      {
        label: 'Dry Veggies',
        emoji: '🍂',
        category: 'Dry Veggies',
        desc: 'Sun-dried & preserved',
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=240&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Fruits',
    emoji: '🍎',
    color: 'from-orange-50 to-amber-50',
    promo: { label: 'Orchard Fresh', desc: 'Direct from Kashmir orchards' },
    items: [
      {
        label: 'Fresh Fruits',
        emoji: '🍑',
        category: 'Fresh Fruits',
        desc: 'Orchard-picked daily',
        image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=240&q=80&auto=format&fit=crop',
      },
      {
        label: 'Seasonal Fruits',
        emoji: '🍇',
        category: 'Seasonal Fruits',
        desc: 'Best of each season',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=240&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Dry Fruits',
    emoji: '🌰',
    color: 'from-amber-50 to-yellow-50',
    promo: { label: 'GI Certified', desc: 'Authentic Kashmiri origin guaranteed' },
    items: [
      {
        label: 'Honey',
        emoji: '🍯',
        category: 'Honey',
        desc: 'Wild forest harvest',
        image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=240&q=80&auto=format&fit=crop',
      },
      {
        label: 'Shilajit',
        emoji: '🪨',
        category: 'Shilajit',
        desc: 'Himalayan resin',
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=240&q=80&auto=format&fit=crop',
      },
      {
        label: 'Saffron',
        emoji: '🌸',
        category: 'Saffron',
        desc: 'GI certified Kesar',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=240&q=80&auto=format&fit=crop',
      },
      {
        label: 'Nuts',
        emoji: '🥜',
        category: 'Nuts',
        desc: 'Premium Kashmiri nuts',
        image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=240&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Special',
    emoji: '✨',
    color: 'from-purple-50 to-pink-50',
    promo: { label: 'Gift Ready', desc: 'Premium packaging for every occasion' },
    items: [
      {
        label: 'Gift Baskets',
        emoji: '🎁',
        category: 'Dry Fruit Basket',
        desc: 'Wedding & occasions',
        image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=240&q=80&auto=format&fit=crop',
      },
      {
        label: 'Kashmiri Pickles',
        emoji: '🫙',
        category: 'Kashmiri Pickles',
        desc: 'Traditional recipes',
        image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=240&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    title: 'Dairy',
    emoji: '🥛',
    color: 'from-sky-50 to-blue-50',
    promo: { label: 'A2 Certified', desc: 'Pure desi cow products' },
    items: [
      {
        label: 'Dairy Items',
        emoji: '🧀',
        category: 'Dairy Items',
        desc: 'A2 milk products',
        image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=240&q=80&auto=format&fit=crop',
      },
    ],
  },
]
