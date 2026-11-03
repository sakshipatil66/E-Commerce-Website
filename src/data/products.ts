import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'vel-01',
    name: 'The Grand Élysée Structured Tote',
    slug: 'the-grand-elysee-structured-tote',
    tagline: 'Architectural silhouette in vegetable-tanned Tuscan calfskin.',
    description: 'Designed for daily presence and effortless organization. Hand-burnished edges, solid champagne brass hardware, and a suede-lined main compartment with a dedicated 15-inch laptop sleeve and interior zippered security pocket.',
    category: 'handbags',
    collection: 'permanent',
    price: 680,
    originalPrice: 750,
    featured: true,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    images: [
      '/src/assets/images/product_cognac_tote_1793685125366.jpg',
      '/src/assets/images/hero_velane_atelier_1793685125060.jpg',
      '/src/assets/images/artisan_craftsmanship_1793685127113.jpg'
    ],
    variants: [
      { id: 'v1-cognac', name: 'Caramel Cognac', colorName: 'Caramel Cognac', colorHex: '#A85A2A', inStock: true, stockCount: 14 },
      { id: 'v1-noir', name: 'Obsidian Noir', colorName: 'Obsidian Noir', colorHex: '#18181B', inStock: true, stockCount: 8 },
      { id: 'v1-taupe', name: 'Alabaster Taupe', colorName: 'Alabaster Taupe', colorHex: '#C5B7A5', inStock: true, stockCount: 5 }
    ],
    material: '100% Full-Grain Vegetable-Tanned Italian Calfskin',
    hardware: 'Hand-Polished Solid Champagne Brass',
    dimensions: '38 cm (W) x 29 cm (H) x 14 cm (D)',
    weight: '1.18 kg',
    strapDrop: '24 cm (Dual Top Handles)',
    madeIn: 'Florence, Italy',
    stock: 27,
    tags: ['Tote', 'Work Bag', 'Italian Leather', 'Bestseller']
  },
  {
    id: 'vel-02',
    name: 'The Pavilion Box Crossbody',
    slug: 'the-pavilion-box-crossbody',
    tagline: 'Minimalist geometry with sculpted push-lock clasp.',
    description: 'A structured study in modern proportion. Crafted with rigid box calfskin that retains its pristine shape through decades of wear. Features an accordion interior, card slots, and an adjustable shoulder strap for shoulder or crossbody styling.',
    category: 'crossbody',
    collection: 'architectural',
    price: 495,
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.95,
    reviewCount: 52,
    images: [
      '/src/assets/images/product_obsidian_crossbody_1793685126315.jpg',
      '/src/assets/images/product_cognac_tote_1793685125366.jpg'
    ],
    variants: [
      { id: 'v2-noir', name: 'Obsidian Noir', colorName: 'Obsidian Noir', colorHex: '#18181B', inStock: true, stockCount: 12 },
      { id: 'v2-burgundy', name: 'Cordovan Merlot', colorName: 'Cordovan Merlot', colorHex: '#4A1D24', inStock: true, stockCount: 7 },
      { id: 'v2-cognac', name: 'Cognac Saddle', colorName: 'Cognac Saddle', colorHex: '#9E5B2D', inStock: true, stockCount: 9 }
    ],
    material: 'Box Calfskin with Microfiber Suede Lining',
    hardware: 'Brushed Champagne Gold Push-Lock Mechanism',
    dimensions: '22 cm (W) x 16 cm (H) x 7.5 cm (D)',
    weight: '0.62 kg',
    strapDrop: '48 – 56 cm (Adjustable)',
    madeIn: 'Scandicci, Italy',
    stock: 28,
    tags: ['Crossbody', 'Evening', 'Minimalist', 'New']
  },
  {
    id: 'vel-03',
    name: 'The San Lorenzo Weekend Duffel',
    slug: 'the-san-lorenzo-weekend-duffel',
    tagline: 'Hand-buffed suede and bridle leather travel companion.',
    description: 'Engineered for seamless getaways and cabin-overhead travel. Combines tactile water-resistant Italian suede with full-grain bridle leather reinforcement at high-stress points. Features reinforced brass feet, two-way heavy zippers, and a detachable padded shoulder strap.',
    category: 'travel',
    collection: 'autumn-suede',
    price: 840,
    originalPrice: 920,
    featured: true,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.88,
    reviewCount: 29,
    images: [
      '/src/assets/images/product_weekend_duffel_1793685127397.jpg',
      '/src/assets/images/artisan_craftsmanship_1793685127113.jpg'
    ],
    variants: [
      { id: 'v3-olive', name: 'Tuscan Olive Suede', colorName: 'Tuscan Olive Suede', colorHex: '#525739', inStock: true, stockCount: 8 },
      { id: 'v3-chestnut', name: 'Rich Chestnut Leather', colorName: 'Rich Chestnut Leather', colorHex: '#69381E', inStock: true, stockCount: 6 },
      { id: 'v3-slate', name: 'Charcoal Storm', colorName: 'Charcoal Storm', colorHex: '#2B2F38', inStock: true, stockCount: 4 }
    ],
    material: 'Silky Waterproof Suede & Bridle Vegetable-Tanned Leather',
    hardware: 'Antiqued Matte Brass Two-Way Zippers',
    dimensions: '52 cm (W) x 30 cm (H) x 26 cm (D)',
    weight: '1.75 kg',
    strapDrop: '50 – 62 cm (Detachable Padded Strap)',
    madeIn: 'Milan, Italy',
    stock: 18,
    tags: ['Travel', 'Duffel', 'Suede', 'Weekender']
  },
  {
    id: 'vel-04',
    name: 'The Vendôme Saddle Flap Bag',
    slug: 'the-vendome-saddle-flap-bag',
    tagline: 'Curved silhouette inspired by equestrian leathercraft heritage.',
    description: 'An homage to artisanal saddle craft. Featuring a distinct contour silhouette, hand-waxed saddle stitching, and magnetic concealed snap closure beneath the heritage buckle.',
    category: 'crossbody',
    collection: 'permanent',
    price: 520,
    featured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 17,
    images: [
      '/src/assets/images/product_obsidian_crossbody_1793685126315.jpg',
      '/src/assets/images/product_cognac_tote_1793685125366.jpg'
    ],
    variants: [
      { id: 'v4-caramel', name: 'Caramel Honey', colorName: 'Caramel Honey', colorHex: '#B26E35', inStock: true, stockCount: 11 },
      { id: 'v4-black', name: 'Noir Eclipse', colorName: 'Noir Eclipse', colorHex: '#141414', inStock: true, stockCount: 9 }
    ],
    material: 'Pebbled Grain French Calfskin',
    hardware: 'Dull Nickel-Plated Brass',
    dimensions: '24 cm (W) x 18 cm (H) x 8 cm (D)',
    weight: '0.68 kg',
    strapDrop: '52 cm',
    madeIn: 'Florence, Italy',
    stock: 20,
    tags: ['Crossbody', 'Saddle Bag', 'Everyday']
  },
  {
    id: 'vel-05',
    name: 'The Monolith Briefcase & Folio',
    slug: 'the-monolith-briefcase-folio',
    tagline: 'Architectural executive briefcase for modern connoisseurs.',
    description: 'Razor-sharp lines and minimal bulk. Features twin gusseted compartments, magnetic quick-access passport pocket, and precision edge paint applied in four individual passes.',
    category: 'handbags',
    collection: 'architectural',
    price: 740,
    featured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.85,
    reviewCount: 14,
    images: [
      '/src/assets/images/product_cognac_tote_1793685125366.jpg',
      '/src/assets/images/artisan_craftsmanship_1793685127113.jpg'
    ],
    variants: [
      { id: 'v5-cognac', name: 'Saddle Cognac', colorName: 'Saddle Cognac', colorHex: '#8C4D20', inStock: true, stockCount: 10 },
      { id: 'v5-black', name: 'Pure Obsidian', colorName: 'Pure Obsidian', colorHex: '#111215', inStock: true, stockCount: 15 }
    ],
    material: 'Vachetta Full-Grain Leather with Cotton Twill Lining',
    hardware: 'Solid Brushed Brass Keyhole Latch',
    dimensions: '40 cm (W) x 30 cm (H) x 8 cm (D)',
    weight: '1.35 kg',
    strapDrop: '45 – 55 cm (Detachable Leather Strap)',
    madeIn: 'Veneto, Italy',
    stock: 25,
    tags: ['Briefcase', 'Work', 'Laptop', 'Executive']
  },
  {
    id: 'vel-06',
    name: 'The Palais Zip Accordion Wallet',
    slug: 'the-palais-zip-accordion-wallet',
    tagline: 'Slim pocket companion with 12 card slots and coin divider.',
    description: 'Precision stitched and impeccably compact. Offers twelve card slots, two full-length currency pockets, and a centered zip pouch for coins and keys. Fits neatly in all VÉLANE totes.',
    category: 'accessories',
    collection: 'permanent',
    price: 210,
    featured: false,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.92,
    reviewCount: 44,
    images: [
      '/src/assets/images/artisan_craftsmanship_1793685127113.jpg',
      '/src/assets/images/product_cognac_tote_1793685125366.jpg'
    ],
    variants: [
      { id: 'v6-cognac', name: 'Caramel Cognac', colorName: 'Caramel Cognac', colorHex: '#A85A2A', inStock: true, stockCount: 22 },
      { id: 'v6-black', name: 'Obsidian Noir', colorName: 'Obsidian Noir', colorHex: '#18181B', inStock: true, stockCount: 19 },
      { id: 'v6-olive', name: 'Tuscan Olive', colorName: 'Tuscan Olive', colorHex: '#525739', inStock: true, stockCount: 14 }
    ],
    material: 'Smooth Box Calfskin with Lambskin Lining',
    hardware: 'Excella Swiss Zip Runner in Gold',
    dimensions: '19.5 cm (W) x 10 cm (H) x 2.2 cm (D)',
    weight: '0.22 kg',
    strapDrop: 'N/A',
    madeIn: 'Florence, Italy',
    stock: 55,
    tags: ['Wallet', 'Small Leather Goods', 'Gift']
  },
  {
    id: 'vel-07',
    name: 'The Horizon Passport & Travel Folio',
    slug: 'the-horizon-passport-travel-folio',
    tagline: 'RFID-shielded dual passport holder with boarding pass slip.',
    description: 'The definitive traveler’s essential. Holds two international passports, six boarding passes or currency slips, four cards, and a micro SIM / ejector pin slot in vegetable-tanned bridle leather.',
    category: 'accessories',
    collection: 'autumn-suede',
    price: 165,
    featured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.86,
    reviewCount: 19,
    images: [
      '/src/assets/images/artisan_craftsmanship_1793685127113.jpg',
      '/src/assets/images/product_weekend_duffel_1793685127397.jpg'
    ],
    variants: [
      { id: 'v7-olive', name: 'Olive Drab', colorName: 'Olive Drab', colorHex: '#525739', inStock: true, stockCount: 16 },
      { id: 'v7-cognac', name: 'Raw Honey Tan', colorName: 'Raw Honey Tan', colorHex: '#C07D3E', inStock: true, stockCount: 20 }
    ],
    material: 'Natural Tuscan Vegetable-Tanned Leather',
    hardware: 'Debossed Blind Atelier Stamp',
    dimensions: '14.5 cm (W) x 10.5 cm (H) x 1.5 cm (D)',
    weight: '0.12 kg',
    strapDrop: 'N/A',
    madeIn: 'Milan, Italy',
    stock: 36,
    tags: ['Passport', 'Travel', 'Accessory']
  },
  {
    id: 'vel-08',
    name: 'The Arcos Sculptural Shoulder Bag',
    slug: 'the-arcos-sculptural-shoulder-bag',
    tagline: 'Crescent architectural silhouette with ergonomic shoulder curve.',
    description: 'Designed to mold organically against the body. Made with supple semi-aniline leather that drapes naturally, accented with sculpted hollow brass chain accents.',
    category: 'handbags',
    collection: 'architectural',
    price: 580,
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.94,
    reviewCount: 22,
    images: [
      '/src/assets/images/product_obsidian_crossbody_1793685126315.jpg',
      '/src/assets/images/hero_velane_atelier_1793685125060.jpg'
    ],
    variants: [
      { id: 'v8-ivory', name: 'Bone Alabaster', colorName: 'Bone Alabaster', colorHex: '#EAE6DD', inStock: true, stockCount: 9 },
      { id: 'v8-black', name: 'Obsidian Noir', colorName: 'Obsidian Noir', colorHex: '#18181B', inStock: true, stockCount: 11 }
    ],
    material: 'Supple Semi-Aniline Nappa Leather',
    hardware: 'Sculpted Champagne Brass Links',
    dimensions: '31 cm (W) x 21 cm (H) x 9 cm (D)',
    weight: '0.74 kg',
    strapDrop: '28 cm',
    madeIn: 'Scandicci, Italy',
    stock: 20,
    tags: ['Shoulder Bag', 'Sculptural', 'Modern']
  }
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'LUXE10',
    discountPercent: 10,
    minSpend: 150,
    description: '10% off on luxury leather orders over $150'
  },
  {
    code: 'SUPERVISOR20',
    discountPercent: 20,
    minSpend: 250,
    description: '20% off VIP Internship Review Discount'
  },
  {
    code: 'WELCOME50',
    discountAmount: 50,
    minSpend: 350,
    description: '$50 off your inaugural order over $350'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    productId: 'vel-01',
    userName: 'Camille Laurent',
    rating: 5,
    title: 'Flawless craftsmanship and remarkable durability',
    comment: 'The Grand Élysée tote exceeded every expectation. The leather has that deep, natural vegetable-tanned aroma and develops a gorgeous patina after just two weeks of use. It holds my laptop and files with ease.',
    date: 'October 14, 2026',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    productId: 'vel-01',
    userName: 'Marcus Vance',
    rating: 5,
    title: 'The gold standard of work totes',
    comment: 'The brass hardware has real weight and elegance. The handles sit comfortably on the shoulder without slipping. Worth every cent.',
    date: 'September 28, 2026',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    productId: 'vel-02',
    userName: 'Elena Rostova',
    rating: 5,
    title: 'Pure architectural beauty',
    comment: 'The push-lock mechanism is immensely satisfying. The box leather is rigid and structured, exactly what you look for in a piece like Céline or The Row.',
    date: 'October 20, 2026',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    productId: 'vel-03',
    userName: 'Julian K.',
    rating: 5,
    title: 'My favorite cabin duffel for weekend getaways',
    comment: 'Took this on a 4-day flight to Zurich. It fit neatly into the overhead bin, the suede is rich and water-resistant, and the brass zippers glide like butter.',
    date: 'November 1, 2026',
    verifiedPurchase: true
  }
];
