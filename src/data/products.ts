// Mock data for the Amptek shop — engineering parts & equipment relevant to
// Amptek Engineering's business. Swap for a real API/CMS later; shapes are simple.

export type Product = {
  id: string;
  name: string;
  price: number;
  /** Sale price. When set (and lower than `price`) the card shows a discount badge. */
  discountPrice?: number;
  image: string;
  category: string;
  /** Long-form copy for the product detail page. */
  description?: string;
};

export type Category = {
  id: string;
  name: string;
  /** URL slug for /category/[slug]. */
  slug: string;
  image: string;
};

export type Banner = {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  cta?: string;
  /** Tailwind gradient classes used as an overlay for legible text. */
  accent?: string;
  /** Render the image only (no gradient/text) — for fully-designed banners. */
  imageOnly?: boolean;
};

// Placeholder images via picsum.photos. A stable `seed` keeps the same image
// across reloads so the layout doesn't flicker between visits.
//
// All product photos and category images now live in /public/products and are
// referenced directly. picsum remains only for the banners below (and the
// projects page in ./company.ts).
const img = (seed: string, w = 600, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const banners: Banner[] = [
  {
    // Official Amptek banner — shown full-bleed (object-cover) with no overlay.
    id: "b0",
    image: "/banners/amptek-banner.jpg",
    imageOnly: true,
  },
  {
    id: "b1",
    title: "Power & Distribution Equipment",
    subtitle: "HT/LT switchgear, vacuum circuit breakers & distribution transformers",
    cta: "Shop Power",
    image: img("amptek-banner-power", 1600, 600),
    accent: "from-brand-blue-dark/90 to-brand-blue/10",
  },
  {
    id: "b2",
    title: "Fire Safety Systems",
    subtitle: "NFPA detection, FM-200 suppression & hydrant equipment",
    cta: "Explore Fire Safety",
    image: img("amptek-banner-fire", 1600, 600),
    accent: "from-brand-red-dark/90 to-brand-red/10",
  },
  {
    id: "b3",
    title: "Automation & Controls",
    subtitle: "PLCs, HMIs & industrial automation components",
    cta: "Browse Automation",
    image: img("amptek-banner-automation", 1600, 600),
    accent: "from-brand-blue-dark/90 to-brand-blue/10",
  },
];

export const categories: Category[] = [
  { id: "c1", name: "Switchgear & Transformers", slug: "switchgear-transformers", image: "/products/circuit-breaker.jpg" },
  { id: "c2", name: "Cables & BBT", slug: "cables-bbt", image: "/products/cables-bbt.jpeg" },
  { id: "c3", name: "Fire Detection & Alarm", slug: "fire-detection-alarm", image: "/products/fire-alarm.jpg" },
  { id: "c4", name: "Fire Suppression", slug: "fire-suppression", image: "/products/fire-suppression.jpg" },
  { id: "c5", name: "HVAC & Boiler Parts", slug: "hvac-boiler-parts", image: "/products/hvac.jpeg" },
  { id: "c6", name: "PLC & Automation", slug: "plc-automation", image: "/products/plc-module.jpg" },
  { id: "c7", name: "Lightning Protection", slug: "lightning-protection", image: "/products/lightning-rod.jpeg" },
  { id: "c8", name: "Safety Equipment", slug: "safety-equipment", image: "/products/safety-equipment.jpeg" },
];

export const featuredProducts: Product[] = [
  {
    id: "p1",
    name: "HT Vacuum Circuit Breaker 11kV",
    price: 285000,
    discountPrice: 249000,
    image: "/products/circuit-breaker.jpg",
    category: "Switchgear & Transformers",
  },
  {
    id: "p2",
    name: "11/0.4kV Distribution Transformer 500kVA",
    price: 1250000,
    image: "/products/transformer.jpeg",
    category: "Switchgear & Transformers",
  },
  {
    id: "p3",
    name: "FM-200 Suppression Cylinder 40L",
    price: 185000,
    discountPrice: 159000,
    image: "/products/fire-suppression.jpg",
    category: "Fire Suppression",
  },
  {
    id: "p4",
    name: "Addressable Smoke Detector",
    price: 4500,
    discountPrice: 3650,
    image: "/products/smoke-detector.jpeg",
    category: "Fire Detection & Alarm",
  },
  {
    id: "p5",
    name: "PLC Module — 16 Digital I/O",
    price: 32000,
    discountPrice: 27500,
    image: "/products/plc-module.jpg",
    category: "PLC & Automation",
  },
  {
    id: "p6",
    name: "Lightning Arrester Rod 1m (ESE)",
    price: 18500,
    image: "/products/lightning-rod.jpeg",
    category: "Lightning Protection",
  },
  {
    id: "p7",
    name: "Sandwich Busbar Trunking 800A (3m)",
    price: 96000,
    discountPrice: 87000,
    image: "/products/cables-bbt.jpeg",
    category: "Cables & BBT",
  },
  {
    id: "p8",
    name: "Industrial Air Handling Unit (AHU)",
    price: 420000,
    image: "/products/hvac.jpeg",
    category: "HVAC & Boiler Parts",
  },
];

export const newArrivals: Product[] = [
  {
    id: "n1",
    name: "XLPE Power Cable 4C×95mm² (per meter)",
    price: 1850,
    discountPrice: 1599,
    image: "/products/cables-bbt.jpeg",
    category: "Cables & BBT",
  },
  {
    id: "n2",
    name: "Conventional Heat Detector",
    price: 2200,
    image: "/products/fire-alarm.jpg",
    category: "Fire Detection & Alarm",
  },
  {
    id: "n3",
    name: "Fire Hydrant Pillar (Double Outlet)",
    price: 38000,
    discountPrice: 32500,
    image: "/products/fire-suppression.jpg",
    category: "Fire Suppression",
  },
  {
    id: "n4",
    name: "Boiler Feed Water Pump 5HP",
    price: 64000,
    image: "/products/hvac.jpeg",
    category: "HVAC & Boiler Parts",
  },
  {
    id: "n5",
    name: 'HMI Touch Panel 7"',
    price: 42000,
    discountPrice: 36000,
    image: "/products/plc-module.jpg",
    category: "PLC & Automation",
  },
  {
    id: "n6",
    name: "Copper Earthing Electrode 17mm×3m",
    price: 7800,
    discountPrice: 6500,
    image: "/products/lightning-rod.jpeg",
    category: "Lightning Protection",
  },
  {
    id: "n7",
    name: "Industrial Safety Helmet (ANSI Z89.1)",
    price: 1200,
    image: "/products/safety-equipment.jpeg",
    category: "Safety Equipment",
  },
  {
    id: "n8",
    name: "Insulated Electrical Gloves 11kV",
    price: 5800,
    discountPrice: 4900,
    image: "/products/safety-equipment.jpeg",
    category: "Safety Equipment",
  },
];

// Flash deals reuse a curated subset; in a real app these'd be time-boxed.
export const flashDeals: Product[] = [
  featuredProducts[0],
  featuredProducts[2],
  featuredProducts[3],
  featuredProducts[6],
  newArrivals[0],
  newArrivals[2],
  newArrivals[7],
];

// Every catalog product, flattened for lookup. featured + newArrivals have
// distinct ids (p1–p8, n1–n8); flashDeals reuses those objects so we skip it.
export const allProducts: Product[] = [...featuredProducts, ...newArrivals];

// Detail-page copy, keyed by product id. Kept separate from the grid data so
// the cards stay lightweight; merged in by getProductById.
const productDescriptions: Record<string, string> = {
  p1: "Indoor 11kV vacuum circuit breaker for HT switchgear panels. Maintenance-free vacuum interrupters deliver reliable short-circuit protection and long electrical life, with motorized spring-charged operating mechanism and trip-free operation.",
  p2: "Oil-immersed 500kVA distribution transformer stepping 11kV down to 0.4kV for industrial and commercial distribution. Copper windings, ONAN cooling, and off-circuit tap changer — built to IEC standards for dependable, efficient service.",
  p3: "40-litre FM-200 (HFC-227ea) clean-agent suppression cylinder for total-flooding protection of server rooms, control panels, and critical assets. Discharges in under 10 seconds, leaving no residue and safe for occupied spaces.",
  p4: "Intelligent addressable photoelectric smoke detector for NFPA-compliant fire alarm systems. Individually addressable for precise location, with onboard LED status indication and low-profile design for commercial and industrial installations.",
  p5: "Compact PLC expansion module providing 16 digital I/O points (8 in / 8 out) for industrial automation and control. DIN-rail mountable with removable terminal blocks for fast wiring and easy maintenance.",
  p6: "1-metre Early Streamer Emission (ESE) lightning arrester rod offering an enhanced protection radius for buildings and industrial structures. Corrosion-resistant construction for long outdoor service life.",
  p7: "Sandwich-type busbar trunking rated 800A, supplied in 3-metre sections, for efficient high-current power distribution. Compact aluminium/copper conductors with high short-circuit withstand and low voltage drop.",
  p8: "Industrial air handling unit for centralized HVAC systems. Includes blower, filtration, and cooling/heating coil sections in a modular insulated casing — engineered for reliable climate control in large facilities.",
  n1: "Cross-linked polyethylene (XLPE) insulated 4-core 95mm² power cable for LT distribution. High thermal rating, excellent dielectric strength, and durable sheathing for underground and tray installations. Priced per meter.",
  n2: "Conventional fixed-temperature heat detector for areas unsuitable for smoke detection. Reliable thermal sensing element, easy two-wire connection, and wide ambient tolerance for kitchens, plant rooms, and dusty environments.",
  n3: "Double-outlet fire hydrant pillar for external hydrant networks. Cast construction with corrosion-resistant finish and standard instantaneous outlets — a core component of NFPA-compliant firefighting water systems.",
  n4: "5HP centrifugal boiler feed water pump for steam and hot-water boiler systems. Stainless impeller, high head, and continuous-duty motor for reliable feedwater supply in process and HVAC plants.",
  n5: '7-inch industrial HMI touch panel for machine control and SCADA visualization. High-brightness color display, multiple communication ports, and rugged front-panel rating for plant-floor environments.',
  n6: "17mm × 3m copper-bonded earthing electrode for grounding and lightning protection systems. Low earth resistance, threaded couplings for extension, and excellent corrosion resistance for long-term performance.",
  n7: "ANSI Z89.1-rated industrial safety helmet with adjustable ratchet suspension. Lightweight high-impact shell and electrical insulation rating for protection on construction and plant sites.",
  n8: "Class-rated insulated electrical gloves for live working up to 11kV. Tested dielectric protection, ergonomic fit, and durable construction — essential PPE for switchgear and HT maintenance work.",
};

/** Look up a single product by id, with its detail description merged in. */
export function getProductById(id: string): Product | undefined {
  const product = allProducts.find((p) => p.id === id);
  if (!product) return undefined;
  return { ...product, description: productDescriptions[id] ?? product.description };
}

/** Look up a category by its URL slug. */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** All products in a given category (matched by category name). */
export function getProductsByCategory(categoryName: string): Product[] {
  return allProducts.filter((p) => p.category === categoryName);
}

/** Find products whose name or category matches the query (case-insensitive). */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
}

/** The price actually charged — the discount price if there is one, else list price. */
export function effectivePrice(product: Product): number {
  return product.discountPrice ?? product.price;
}

/** Format a number as Bangladeshi Taka, matching the bdshop.com vibe. */
export function formatPrice(value: number): string {
  return `৳${value.toLocaleString("en-BD")}`;
}

/** Percentage off, rounded — only meaningful when a discountPrice exists. */
export function discountPercent(price: number, discountPrice?: number): number | null {
  if (!discountPrice || discountPrice >= price) return null;
  return Math.round(((price - discountPrice) / price) * 100);
}
