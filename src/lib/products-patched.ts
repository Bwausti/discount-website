import { brands as baseBrands, faqItems, productCategories, storeInfo } from "./products";
import type { Brand, Product, ProductPrice, ProductPriceVariant } from "./products";

export type {
  Brand,
  BrandStatus,
  Product,
  ProductCategory,
  ProductPrice,
  ProductPriceVariant,
} from "./products";

const asOf = "May 1, 2026";

function price(amount: string, sourceName: string, sourceUrl: string, label = "Starting price"): ProductPrice {
  return { amount, label, sourceName, sourceUrl, asOf };
}

function p(brand: Brand, item: Omit<Product, "brandId" | "brand" | "gallery"> & { gallery?: string[] }): Product {
  return { ...item, brandId: brand.id, brand: brand.name, gallery: item.gallery ?? [item.image] };
}

function patchBrand(
  base: Brand,
  patch: Omit<Brand, "logo" | "heroImage" | "galleryImages" | "products"> & {
    products: Array<Omit<Product, "brandId" | "brand" | "gallery"> & { gallery?: string[] }>;
  },
): Brand {
  const brand = { ...base, ...patch, products: [] };
  return { ...brand, products: patch.products.map((item) => p(brand, item)) };
}

const sources = {
  dreamcloudClassic: "https://www.dreamcloudsleep.com/mattress/queen",
  dreamcloudClassicFoam: "https://www.dreamcloudsleep.com/mattresses/memory-foam-mattress/queen",
  dreamcloudPremier: "https://www.dreamcloudsleep.com/mattresses/premier-hybrid-mattress/queen",
  dreamcloudPremierFoam: "https://www.dreamcloudsleep.com/mattresses/premier-memory-foam-mattress/queen",
  dreamcloudLuxe: "https://www.dreamcloudsleep.com/mattresses/luxe-hybrid-mattress/queen",
  dreamcloudLuxeFoam: "https://www.dreamcloudsleep.com/mattresses/luxe-memory-foam-mattress/queen",
  dreamcloudUltra: "https://www.dreamcloudsleep.com/mattresses/ultra-hybrid-mattress/queen",
  dreamcloudUltraFoam: "https://www.dreamcloudsleep.com/mattresses/ultra-memory-foam-mattress/queen",
  nectarClassic: "https://www.nectarsleep.com/mattress/queen",
  nectarClassicHybrid: "https://www.nectarsleep.com/mattresses/hybrid-mattress/queen",
  nectarPremier: "https://www.nectarsleep.com/mattresses/premier-memory-foam-mattress/queen",
  nectarPremierHybrid: "https://www.nectarsleep.com/mattresses/premier-hybrid-mattress/queen",
  nectarLuxe: "https://www.nectarsleep.com/mattresses/luxe-memory-foam-mattress/queen",
  nectarLuxeHybrid: "https://www.nectarsleep.com/mattresses/luxe-hybrid-mattress/queen",
  nectarUltra: "https://www.nectarsleep.com/mattresses/ultra-memory-foam-mattress/queen",
  nectarUltraHybrid: "https://www.nectarsleep.com/mattresses/ultra-hybrid-mattress/queen",
  nectarKids: "https://www.nectarsleep.com/mattresses/kids-mattress",
  naturepedicEosClassic: "https://www.naturepedic.com/eos-classic-organic-mattress-buy",
  naturepedicEosPillowTop: "https://www.naturepedic.com/eos-pillowtop-organic-mattress-buy",
  naturepedicConcerto: "https://www.naturepedic.com/concerto-organic-pillowtop-mattress-buy",
  naturepedicSerenade: "https://www.naturepedic.com/serenade-organic-mattress-buy",
  bedgearM3: "https://bedgear.com/products/m3-performance-mattress",
  bedgearM5: "https://bedgear.com/products/m5-performance-mattress",
  pranaKarmaElite: "https://pranasleep.com/products/karma-elite-2",
  pranaKarmaCollection: "https://pranasleep.com/collections/karma-collection",
  sertaIcomfort: "https://www.serta.com/products/icomfort-mattress",
  sertaIcomfortPro: "https://www.serta.com/products/icomfort-hybrid-mattress",
  sertaCascade: "https://www.serta.com/products/perfect-sleeper-mattres-2026",
  sertaCanyon: "https://www.serta.com/products/perfect-sleeper-cascade-canyon-firm-mattress",
  bedtechAdjustableBeds: "https://www.bedtech.com/collections/adjustable-beds",
  bedtechBases: "https://www.bedtech.com/collections/bases",
};

const pranaKarmaElitePrices: readonly ProductPriceVariant[] = [
  { label: "Twin starting", amount: "$2,749.95", sourceUrl: sources.pranaKarmaElite },
  { label: "Queen starting", amount: "$3,499.95", sourceUrl: sources.pranaKarmaCollection },
];

const naturepedicPrices = {
  eosClassic: [
    { label: "Twin", amount: "$2,399", sourceUrl: sources.naturepedicEosClassic },
    { label: "Twin XL", amount: "$2,699", sourceUrl: sources.naturepedicEosClassic },
    { label: "Full", amount: "$3,399", sourceUrl: sources.naturepedicEosClassic },
    { label: "Queen", amount: "$3,799", sourceUrl: sources.naturepedicEosClassic },
    { label: "King", amount: "$4,699", sourceUrl: sources.naturepedicEosClassic },
    { label: "Cal King", amount: "$4,699", sourceUrl: sources.naturepedicEosClassic },
  ],
  eosPillowTop: [
    { label: "Twin", amount: "$3,299", sourceUrl: sources.naturepedicEosPillowTop },
    { label: "Twin XL", amount: "$3,599", sourceUrl: sources.naturepedicEosPillowTop },
    { label: "Full", amount: "$4,599", sourceUrl: sources.naturepedicEosPillowTop },
    { label: "Queen", amount: "$4,999", sourceUrl: sources.naturepedicEosPillowTop },
    { label: "King", amount: "$5,999", sourceUrl: sources.naturepedicEosPillowTop },
    { label: "Cal King", amount: "$5,999", sourceUrl: sources.naturepedicEosPillowTop },
  ],
  concerto: [
    { label: "Twin", amount: "$1,439", sourceUrl: sources.naturepedicConcerto },
    { label: "Twin XL", amount: "$1,679", sourceUrl: sources.naturepedicConcerto },
    { label: "Full", amount: "$2,239", sourceUrl: sources.naturepedicConcerto },
    { label: "Queen", amount: "$2,399", sourceUrl: sources.naturepedicConcerto },
    { label: "King", amount: "$3,039", sourceUrl: sources.naturepedicConcerto },
    { label: "Cal King", amount: "$3,039", sourceUrl: sources.naturepedicConcerto },
  ],
  serenade: [
    { label: "Twin", amount: "$1,119", sourceUrl: sources.naturepedicSerenade },
    { label: "Twin XL", amount: "$1,279", sourceUrl: sources.naturepedicSerenade },
    { label: "Full", amount: "$1,439", sourceUrl: sources.naturepedicSerenade },
    { label: "Queen", amount: "$1,599", sourceUrl: sources.naturepedicSerenade },
    { label: "King", amount: "$2,239", sourceUrl: sources.naturepedicSerenade },
    { label: "Cal King", amount: "$2,239", sourceUrl: sources.naturepedicSerenade },
  ],
} as const satisfies Record<string, readonly ProductPriceVariant[]>;

function mattress(
  id: string,
  model: string,
  type: string,
  image: string,
  amount: string | undefined,
  sourceUrl: string | undefined,
  extra: Partial<Omit<Product, "id" | "brandId" | "brand" | "model" | "category" | "type" | "image" | "gallery" | "availability" | "bestFor" | "keyFeatures">> & {
    gallery?: string[];
    bestFor?: string[];
    keyFeatures?: string[];
    availability?: string;
    sourceName?: string;
  } = {},
): Omit<Product, "brandId" | "brand" | "gallery"> & { gallery?: string[] } {
  const { gallery, bestFor, keyFeatures, availability, sourceName, ...rest } = extra;
  return {
    id,
    model,
    category: "Mattress",
    type,
    image,
    gallery,
    bestFor: bestFor ?? ["Showroom comparison", "Comfort guidance", "Local availability"],
    keyFeatures: keyFeatures ?? ["Premium comfort", "Supportive design", "Compare in store"],
    availability: availability ?? "Call or visit to confirm current showroom availability.",
    onlinePrice: amount && sourceUrl ? price(amount, sourceName ?? model.split(" ")[0], sourceUrl) : undefined,
    ...rest,
  };
}

function bedtechProduct(
  id: string,
  model: string,
  type: string,
  amount: string,
  sourceUrl: string,
  image: string,
  extra: Partial<Omit<Product, "id" | "brandId" | "brand" | "model" | "category" | "type" | "image" | "gallery" | "availability" | "bestFor" | "keyFeatures" | "onlinePrice">> & {
    gallery?: string[];
    bestFor?: string[];
    keyFeatures?: string[];
    availability?: string;
  } = {},
): Omit<Product, "brandId" | "brand" | "gallery"> & { gallery?: string[] } {
  const { gallery, bestFor, keyFeatures, availability, ...rest } = extra;
  return {
    id,
    model,
    category: "Adjustable base",
    type,
    image,
    gallery,
    bestFor: bestFor ?? ["Mattress upgrades", "Better bed support", "Complete sleep systems"],
    keyFeatures: keyFeatures ?? ["Pairs with compatible mattresses", "Clean bedroom profile", "Supportive foundation"],
    availability: availability ?? "Call or visit to confirm current sizes and showroom availability.",
    onlinePrice: price(amount, "BedTech", sourceUrl),
    ...rest,
  };
}

export const brands: Brand[] = baseBrands.map((base) => {
  if (base.id === "bedtech") {
    const adjustableGallery = [
      "/brand-assets/bedtech/official-hero-bases.jpg",
      "/brand-assets/bedtech/bt6500.webp",
      "/brand-assets/bedtech/bt3000.webp",
      "/brand-assets/bedtech/btx4.webp",
    ];

    return patchBrand(base, {
      id: base.id,
      name: base.name,
      status: "primary",
      tagline: "Adjustable beds and bedroom bases for a complete sleep setup.",
      description:
        "BedTech adds the support layer under the mattress: adjustable beds for head and foot elevation plus platform and foundation bases for cleaner support.",
      showroomNote: "Compare adjustable features, heights, remotes, and foundation options with the mattress you are considering.",
      collectionHighlights: ["Adjustable beds", "Platform bases", "Foundation upgrades"],
      products: [
        bedtechProduct("bedtech-bt6500", "BT6500 Adjustable Bed", "Premium adjustable bed", "$1,999", sources.bedtechAdjustableBeds, "/brand-assets/bedtech/bt6500.webp", {
          badge: "Top Tier",
          feel: "Premium adjustability",
          bestFor: ["Primary bedrooms", "Premium feature shoppers", "Head and foot elevation"],
          keyFeatures: ["Advanced positioning", "Comfort presets", "Premium support system"],
          gallery: adjustableGallery,
        }),
        bedtechProduct("bedtech-bt3000", "BT3000 Adjustable Bed", "Adjustable bed", "$1,499", sources.bedtechAdjustableBeds, "/brand-assets/bedtech/bt3000.webp", {
          badge: "Featured",
          feel: "Comfort upgrade",
          bestFor: ["Couples", "Lifestyle comfort", "Base upgrade shoppers"],
          keyFeatures: ["Head and foot articulation", "Preset positions", "Quiet operation"],
          gallery: ["/brand-assets/bedtech/bt3000.webp", "/brand-assets/bedtech/official-hero-bases.jpg", "/brand-assets/bedtech/btx4.webp"],
        }),
        bedtechProduct("bedtech-bt2500", "BT2500 Adjustable Bed", "Adjustable bed", "$1,299", sources.bedtechAdjustableBeds, "/brand-assets/bedtech/official-hero-bases.jpg", {
          feel: "Step-up adjustability",
          bestFor: ["Head and foot elevation", "Guest suites", "Everyday comfort upgrades"],
          keyFeatures: ["Adjustable comfort", "Wireless control", "Compatible mattress support"],
          gallery: adjustableGallery,
        }),
        bedtechProduct("bedtech-bt2000", "BT2000 Adjustable Bed", "Adjustable bed", "$1,149", sources.bedtechAdjustableBeds, "/brand-assets/bedtech/bt2000.webp", {
          feel: "Everyday adjustability",
          bestFor: ["Entry adjustable bed", "Simple elevation", "Guest rooms"],
          keyFeatures: ["Head lift", "Remote control", "Easy mattress pairing"],
          gallery: ["/brand-assets/bedtech/bt2000.webp", "/brand-assets/bedtech/official-hero-bases.jpg", "/brand-assets/bedtech/btx4.webp"],
        }),
        bedtechProduct("bedtech-btx5", "BTX5 Adjustable Bed", "Adjustable bed", "$1,249", sources.bedtechAdjustableBeds, "/brand-assets/bedtech/official-hero-bases.jpg", {
          feel: "Feature-rich value",
          bestFor: ["Adjustable comfort", "Better bedroom setup", "Value-focused upgrades"],
          keyFeatures: ["Head and foot elevation", "Wireless control", "Modern support profile"],
          gallery: adjustableGallery,
        }),
        bedtechProduct("bedtech-btx4", "BTX4 Adjustable Bed", "Adjustable bed", "$1,049", sources.bedtechAdjustableBeds, "/brand-assets/bedtech/btx4.webp", {
          badge: "Adjustable",
          feel: "Lifestyle upgrade",
          bestFor: ["Head elevation", "Reading in bed", "Base upgrades"],
          keyFeatures: ["Wireless control", "Head and foot articulation", "Modern base profile"],
          gallery: ["/brand-assets/bedtech/btx4.webp", "/brand-assets/bedtech/official-hero-bases.jpg", "/brand-assets/bedtech/bt3000.webp"],
        }),
        bedtechProduct("bedtech-bthu", "BTHU Adjustable Bed", "Adjustable bed", "$749", sources.bedtechAdjustableBeds, "/brand-assets/bedtech/official-hero-bases.jpg", {
          badge: "Value",
          feel: "Simple adjustability",
          bestFor: ["First adjustable bed", "Value shoppers", "Head elevation"],
          keyFeatures: ["Adjustable support", "Straightforward controls", "Easy mattress pairing"],
          gallery: adjustableGallery,
        }),
        bedtechProduct("bedtech-upholstered-platform", "Upholstered Platform", "Platform base", "$239", sources.bedtechBases, "/brand-assets/bedtech/official-lifestyle.jpg", {
          feel: "Upholstered support",
          bestFor: ["Clean bedroom style", "Platform support", "Simple mattress setup"],
          keyFeatures: ["Upholstered finish", "Platform-style support", "No box spring needed with compatible mattresses"],
          gallery: ["/brand-assets/bedtech/official-lifestyle.jpg", "/brand-assets/bedtech/official-hero-bases.jpg"],
        }),
        bedtechProduct("bedtech-standard-foundation", "Standard Foundation", "Foundation base", "$169", sources.bedtechBases, "/brand-assets/bedtech/official-lifestyle.jpg", {
          feel: "Classic foundation support",
          bestFor: ["Traditional bed setup", "Mattress support", "Value foundation shoppers"],
          keyFeatures: ["Stable foundation", "Clean profile", "Easy pairing with compatible frames"],
          gallery: ["/brand-assets/bedtech/official-lifestyle.jpg", "/brand-assets/bedtech/official-hero-bases.jpg"],
        }),
        bedtechProduct("bedtech-high-rise-platform", "High Rise Platform", "Platform base", "$159", sources.bedtechBases, "/brand-assets/bedtech/official-lifestyle.jpg", {
          feel: "Raised platform support",
          bestFor: ["Extra under-bed clearance", "Simple support", "Guest rooms"],
          keyFeatures: ["High-rise profile", "Platform support", "Storage-friendly clearance"],
          gallery: ["/brand-assets/bedtech/official-lifestyle.jpg", "/brand-assets/bedtech/official-hero-bases.jpg"],
        }),
        bedtechProduct("bedtech-modern-platform", "Modern Platform", "Platform base", "$159", sources.bedtechBases, "/brand-assets/bedtech/official-lifestyle.jpg", {
          feel: "Modern platform support",
          bestFor: ["Minimal bedroom style", "Simple support", "Value base shoppers"],
          keyFeatures: ["Modern low-profile look", "Platform support", "Easy bedroom setup"],
          gallery: ["/brand-assets/bedtech/official-lifestyle.jpg", "/brand-assets/bedtech/official-hero-bases.jpg"],
        }),
      ],
    });
  }

  if (base.id === "posh-and-lavish") {
    return patchBrand(base, {
      id: base.id,
      name: base.name,
      status: "primary",
      tagline: "Boutique luxury mattresses made to be experienced in person.",
      description:
        "Posh and Lavish is best shopped in the showroom: feel the materials, compare the support, and let the team guide the right fit.",
      showroomNote: "Visit the showroom to experience Posh and Lavish comfort and confirm current floor models.",
      collectionHighlights: ["Showroom-only guidance", "Premium materials", "Luxury comfort"],
      products: [
        mattress("posh-and-lavish-showroom", "Explore Posh and Lavish in Store", "Luxury mattress collection", "/brand-assets/posh-and-lavish/official-hero.avif", undefined, undefined, {
          firmness: "Multiple comfort options",
          feel: "Premium, responsive comfort",
          badge: "Luxury",
          bestFor: ["Luxury shoppers", "In-store comfort testing", "Premium bedrooms"],
          keyFeatures: ["Experience the materials in person", "Compare comfort levels with local guidance", "Confirm current showroom availability"],
          warranty: "Ask in store",
          gallery: ["/brand-assets/posh-and-lavish/official-hero.avif", "/brand-assets/posh-and-lavish/dm-product.webp", "/brand-assets/posh-and-lavish/providence-detail.png"],
          availability: "Posh and Lavish is best shopped in person. Call or visit to see what is currently on the floor.",
        }),
      ],
    });
  }

  if (base.id === "dreamcloud") {
    return patchBrand(base, {
      id: base.id,
      name: base.name,
      status: "primary",
      tagline: "Classic, Premier, Luxe, and Ultra comfort in hybrid and memory foam.",
      description: "DreamCloud pairs quilted tops, cooling comfort layers, and strong support in a full lineup that is easy to compare.",
      showroomNote: "A strong fit for shoppers who want a luxury mattress feel with clear step-up options.",
      collectionHighlights: ["Hybrid and memory foam", "Classic to Ultra", "365-night trial"],
      products: [
        mattress("dreamcloud-classic-hybrid", "DreamCloud Classic Hybrid", "Hybrid", "/brand-assets/dreamcloud/classic-product.webp", "$349", sources.dreamcloudClassic, { height: "12 in", firmness: "Firm", feel: "Supportive comfort", badge: "Best Value", sourceName: "DreamCloud" }),
        mattress("dreamcloud-classic-memory-foam", "DreamCloud Classic Memory Foam", "Memory foam", "/brand-assets/dreamcloud/classic-product.webp", "$299", sources.dreamcloudClassicFoam, { height: "12 in", firmness: "Firm", feel: "Contouring support", sourceName: "DreamCloud" }),
        mattress("dreamcloud-premier", "DreamCloud Premier Hybrid", "Hybrid", "/product-assets/dreamcloud/dreamcloud-premier-1.webp", "$799", sources.dreamcloudPremier, { height: "13 in", firmness: "Medium-firm", feel: "Luxury support", badge: "Most Popular", sourceName: "DreamCloud", gallery: ["/product-assets/dreamcloud/dreamcloud-premier-1.webp", "/product-assets/dreamcloud/dreamcloud-premier-2.webp", "/product-assets/dreamcloud/dreamcloud-premier-3.webp"] }),
        mattress("dreamcloud-premier-memory-foam", "DreamCloud Premier Memory Foam", "Memory foam", "/product-assets/dreamcloud/dreamcloud-premier-1.webp", "$899", sources.dreamcloudPremierFoam, { height: "13 in", firmness: "Medium-firm", feel: "Cushioned contour", sourceName: "DreamCloud" }),
        mattress("dreamcloud-luxe-hybrid", "DreamCloud Luxe Hybrid", "Hybrid", "/product-assets/dreamcloud/dreamcloud-rest-1.webp", "$1,099", sources.dreamcloudLuxe, { height: "14 in", firmness: "Medium", feel: "Targeted support", badge: "Luxury", sourceName: "DreamCloud", gallery: ["/product-assets/dreamcloud/dreamcloud-rest-1.webp", "/product-assets/dreamcloud/dreamcloud-rest-2.webp"] }),
        mattress("dreamcloud-luxe-memory-foam", "DreamCloud Luxe Memory Foam", "Memory foam", "/product-assets/dreamcloud/dreamcloud-rest-1.webp", "$1,199", sources.dreamcloudLuxeFoam, { height: "14 in", firmness: "Medium", feel: "Plush contour", sourceName: "DreamCloud" }),
        mattress("dreamcloud-ultra-hybrid", "DreamCloud Ultra Hybrid", "Hybrid", "/product-assets/dreamcloud/dreamcloud-rest-3.webp", "$1,369", sources.dreamcloudUltra, { height: "15 in", firmness: "Medium-soft", feel: "Indulgent plush support", badge: "Top Tier", sourceName: "DreamCloud" }),
        mattress("dreamcloud-ultra-memory-foam", "DreamCloud Ultra Memory Foam", "Memory foam", "/product-assets/dreamcloud/dreamcloud-premier-3.webp", "$2,199", sources.dreamcloudUltraFoam, { height: "15 in", firmness: "Medium", feel: "Deep contour", badge: "Top Tier", sourceName: "DreamCloud" }),
        mattress("dreamcloud-pressuresmart", "DreamCloud PressureSmart", "Specialty", "/product-assets/dreamcloud/dreamcloud-rest-3.webp", undefined, undefined, { firmness: "Ask in store", feel: "Targeted comfort", badge: "New" }),
      ],
    });
  }

  if (base.id === "nectar") {
    return patchBrand(base, {
      id: base.id,
      name: base.name,
      status: "primary",
      tagline: "Award-winning memory foam and hybrid mattresses from Classic to Ultra.",
      description: "Nectar is easy to compare: Classic, Premier, Luxe, and Ultra each step up cooling, pressure relief, and support in foam or hybrid builds.",
      showroomNote: "Best for shoppers who want a proven online brand with clear comfort upgrades and local showroom help.",
      collectionHighlights: ["Memory foam and hybrid", "Classic to Ultra", "365-night trial"],
      products: [
        mattress("nectar-classic", "Nectar Classic Memory Foam", "Memory foam", "/product-assets/nectar/nectar-classic-1.webp", "$369", sources.nectarClassic, { height: "12 in", firmness: "Medium-firm", feel: "Supportive contour", badge: "Value", sourceName: "Nectar", gallery: ["/product-assets/nectar/nectar-classic-1.webp", "/product-assets/nectar-refresh/classic-memory-detail.png", "/product-assets/nectar-refresh/classic-memory.png"] }),
        mattress("nectar-classic-hybrid", "Nectar Classic Hybrid", "Hybrid", "/product-assets/nectar-refresh/classic-hybrid.png", "$349", sources.nectarClassicHybrid, { height: "12 in", firmness: "Medium-firm", feel: "Responsive support", badge: "Hybrid value", sourceName: "Nectar", gallery: ["/product-assets/nectar-refresh/classic-hybrid.png", "/product-assets/nectar-refresh/classic-hybrid-detail.png", "/brand-assets/nectar/feature-02.jpg"] }),
        mattress("nectar-premier", "Nectar Premier Memory Foam", "Memory foam", "/product-assets/nectar-refresh/premier-memory.png", "$549", sources.nectarPremier, { height: "13 in", firmness: "Medium", feel: "Cool contouring", sourceName: "Nectar", gallery: ["/product-assets/nectar-refresh/premier-memory.png", "/product-assets/nectar-refresh/premier-memory-detail.png", "/product-assets/nectar/nectar-premier-3.webp"] }),
        mattress("nectar-premier-hybrid", "Nectar Premier Hybrid", "Hybrid", "/product-assets/nectar-refresh/premier-hybrid.png", "$799", sources.nectarPremierHybrid, { height: "13 in", firmness: "Medium", feel: "Cool hybrid contour", badge: "Best seller", sourceName: "Nectar", gallery: ["/product-assets/nectar-refresh/premier-hybrid.png", "/product-assets/nectar-refresh/premier-hybrid-detail.png", "/brand-assets/nectar/feature-03.jpg"] }),
        mattress("nectar-luxe-memory-foam", "Nectar Luxe Memory Foam", "Memory foam", "/product-assets/nectar-refresh/luxe-memory.png", "$999", sources.nectarLuxe, { height: "14 in", firmness: "Medium", feel: "Premium cooling foam", badge: "Luxe", sourceName: "Nectar", gallery: ["/product-assets/nectar-refresh/luxe-memory.png", "/product-assets/nectar-refresh/luxe-memory-detail.png", "/brand-assets/nectar/feature-04.jpg"] }),
        mattress("nectar-luxe-hybrid", "Nectar Luxe Hybrid", "Hybrid", "/product-assets/nectar-refresh/luxe-hybrid.png", "$1,099", sources.nectarLuxeHybrid, { height: "14 in", firmness: "Medium", feel: "Cool, supportive lift", badge: "Cooling", sourceName: "Nectar", gallery: ["/product-assets/nectar-refresh/luxe-hybrid.png", "/product-assets/nectar-refresh/luxe-hybrid-detail.png", "/product-assets/nectar/nectar-copper-2.webp"] }),
        mattress("nectar-ultra-memory-foam", "Nectar Ultra Memory Foam", "Memory foam", "/product-assets/nectar-refresh/ultra-memory.png", "$1,799", sources.nectarUltra, { height: "15 in", firmness: "Medium-soft", feel: "Deep pressure relief", badge: "Top Tier", sourceName: "Nectar", gallery: ["/product-assets/nectar-refresh/ultra-memory.png", "/product-assets/nectar-refresh/ultra-memory-detail.png", "/brand-assets/nectar/ultra-product.webp"] }),
        mattress("nectar-ultra-hybrid", "Nectar Ultra Hybrid", "Hybrid", "/product-assets/nectar-refresh/ultra-hybrid.png", "$1,599", sources.nectarUltraHybrid, { height: "15 in", firmness: "Medium-soft", feel: "Plush cooling support", badge: "Top Tier", sourceName: "Nectar", gallery: ["/product-assets/nectar-refresh/ultra-hybrid.png", "/product-assets/nectar-refresh/ultra-hybrid-detail.png", "/brand-assets/nectar/ultra-product.webp"] }),
        mattress("nectar-kids", "Nectar Kids Mattress", "Kids mattress", "/product-assets/nectar-refresh/kids.png", undefined, sources.nectarKids, { firmness: "Medium-firm", feel: "Supportive kids comfort", gallery: ["/product-assets/nectar-refresh/kids.png", "/product-assets/nectar-refresh/kids-detail.png", "/product-assets/nectar/nectar-classic-3.webp"] }),
      ],
    });
  }

  if (base.id === "naturepedic") {
    return patchBrand(base, {
      id: base.id,
      name: base.name,
      status: "primary",
      tagline: "Certified organic mattresses with cleaner materials and customizable comfort.",
      description:
        "Naturepedic focuses on certified organic materials, glueless encased coils, latex comfort, and mattress designs made without flame retardants or polyurethane foam.",
      showroomNote:
        "Compare EOS Classic, EOS Pillow Top, Concerto Pillow Top, and Serenade in store to find the right organic comfort level.",
      collectionHighlights: ["Certified organic", "Customizable EOS", "Cleaner materials"],
      products: [
        mattress(
          "naturepedic-eos-classic",
          "EOS Classic",
          "Organic latex hybrid",
          "/brand-assets/naturepedic/eos-classic.webp",
          "$3,799",
          sources.naturepedicEosClassic,
          {
            height: "12 in",
            firmness: "Extra-firm to plush",
            feel: "Customizable organic comfort",
            badge: "Customizable",
            sourceName: "Naturepedic",
            onlinePrice: price(
              "$3,799",
              "Naturepedic",
              sources.naturepedicEosClassic,
              "Official queen price",
            ),
            priceVariants: naturepedicPrices.eosClassic,
            bestFor: ["Couples", "Custom comfort", "Organic-material shoppers"],
            keyFeatures: [
              "3 inches of organic latex over 8-inch encased coils",
              "12-inch zippered design with swappable comfort layers",
              "Queen, king, and California king can be configured by side",
            ],
            warranty: "25-year warranty",
            gallery: [
              "/brand-assets/naturepedic/eos-classic.webp",
              "/brand-assets/naturepedic/eos-detail.webp",
              "/brand-assets/naturepedic/lifestyle.jpg",
            ],
          },
        ),
        mattress(
          "naturepedic-eos-pillow-top",
          "EOS Pillow Top",
          "Organic pillow top latex hybrid",
          "/brand-assets/naturepedic/eos-detail.webp",
          "$4,999",
          sources.naturepedicEosPillowTop,
          {
            height: "15 in",
            firmness: "Firm to ultra-plush",
            feel: "Customizable pillow top comfort",
            badge: "Pillow Top",
            sourceName: "Naturepedic",
            onlinePrice: price(
              "$4,999",
              "Naturepedic",
              sources.naturepedicEosPillowTop,
              "Official queen price",
            ),
            priceVariants: naturepedicPrices.eosPillowTop,
            bestFor: ["Plush comfort", "Couples", "Layer-swap flexibility"],
            keyFeatures: [
              "6 inches of organic latex over 8-inch encased coils",
              "15-inch two-compartment zippered pillow top design",
              "Comfort levels from firm through ultra-plush",
            ],
            warranty: "25-year warranty",
            gallery: [
              "/brand-assets/naturepedic/eos-detail.webp",
              "/brand-assets/naturepedic/eos-classic.webp",
              "/brand-assets/naturepedic/hero.jpg",
            ],
          },
        ),
        mattress(
          "naturepedic-concerto-pillow-top",
          "Concerto Pillow Top",
          "Organic pillow top hybrid",
          "/brand-assets/naturepedic/lifestyle.jpg",
          "$2,399",
          sources.naturepedicConcerto,
          {
            height: "13 in",
            firmness: "Pillow top plush",
            feel: "Hotel-style organic plush comfort",
            badge: "Plush",
            sourceName: "Naturepedic",
            onlinePrice: price(
              "$2,399",
              "Naturepedic",
              sources.naturepedicConcerto,
              "Official queen price",
            ),
            priceVariants: naturepedicPrices.concerto,
            bestFor: ["Side sleepers", "Plush comfort", "Organic pillow top feel"],
            keyFeatures: [
              "Organic latex, encased support coils, and high-density microcoils",
              "Tufted pillow top design with organic cotton and wool",
              "13-inch plush profile with strong breathability",
            ],
            warranty: "25-year warranty",
            gallery: [
              "/brand-assets/naturepedic/lifestyle.jpg",
              "/brand-assets/naturepedic/eos-detail.webp",
              "/brand-assets/naturepedic/showroom.jpeg",
            ],
          },
        ),
        mattress(
          "naturepedic-serenade",
          "Serenade",
          "Organic latex hybrid",
          "/brand-assets/naturepedic/showroom.jpeg",
          "$1,599",
          sources.naturepedicSerenade,
          {
            height: "11 in",
            firmness: "Firm, cushion-firm, or plush",
            feel: "Simple, balanced organic comfort",
            badge: "Organic",
            sourceName: "Naturepedic",
            onlinePrice: price(
              "$1,599",
              "Naturepedic",
              sources.naturepedicSerenade,
              "Official queen price",
            ),
            priceVariants: naturepedicPrices.serenade,
            bestFor: ["Organic value", "Back sleepers", "Balanced support"],
            keyFeatures: [
              "2 inches of organic latex over 8-inch encased coils",
              "11-inch profile in firm, cushion-firm, or plush",
              "Made without flame retardants, polyurethane foam, glues, or adhesives",
            ],
            warranty: "25-year warranty",
            gallery: [
              "/brand-assets/naturepedic/showroom.jpeg",
              "/brand-assets/naturepedic/lifestyle.jpg",
              "/brand-assets/naturepedic/eos-classic.webp",
            ],
          },
        ),
      ],
    });
  }

  if (base.id === "bedgear") {
    const kept = base.products.filter((item) => item.id !== "bedgear-m3");
    const brand = { ...base, tagline: "Performance sleep systems built around airflow, fit, and recovery.", description: "Bedgear is built for people who want a cooler, cleaner, more personalized sleep system.", showroomNote: "Visit the showroom to compare M3 and M5 comfort levels, feel the cooling covers, and build the right mattress-and-pillow setup.", collectionHighlights: ["Modular comfort", "Cooling airflow", "Washable covers"] };
    return { ...brand, products: [
      p(brand, mattress("bedgear-m3", "BEDGEAR M3 Performance Mattress", "Modular hybrid", "/brand-assets/bedgear/m3-product.png", "$2,999.99", sources.bedgearM3, { height: "12 in", firmness: "Multiple options", feel: "Personalized, breathable support", badge: "Modular", sourceName: "BEDGEAR", gallery: ["/brand-assets/bedgear/m3-product.png", "/brand-assets/bedgear/wide-detail.jpg"] })),
      p(brand, mattress("bedgear-m5", "BEDGEAR M5 Performance Mattress", "Modular hybrid", "/brand-assets/bedgear/wide-detail.jpg", "$3,999.99", sources.bedgearM5, { height: "14 in", firmness: "Multiple options", feel: "Advanced cooling and adaptive support", badge: "Premium", sourceName: "BEDGEAR", gallery: ["/brand-assets/bedgear/wide-detail.jpg", "/brand-assets/bedgear/m3-product.png"] })),
      ...kept,
    ] };
  }

  if (base.id === "pranasleep") {
    return patchBrand(base, {
      id: base.id,
      name: base.name,
      status: "primary",
      tagline: "Karma Elite 2 luxury latex hybrids in Firm, Plush, and Super Cush.",
      description:
        "PranaSleep Karma Elite 2 combines natural Talalay latex comfort, individually wrapped coils, and a hand-finished cooling quilt in three distinct comfort levels.",
      showroomNote:
        "Try Firm, Plush, and Super Cush in the showroom to choose the comfort that fits your sleep style.",
      collectionHighlights: ["Karma Elite 2", "Talalay latex", "Three comfort levels"],
      products: [
        mattress(
          "pranasleep-karma-elite-firm",
          "Karma Elite 2 Hybrid Firm",
          "Latex hybrid",
          "/brand-assets/pranasleep/karma-elite.webp",
          "$3,499.95",
          sources.pranaKarmaCollection,
          {
            height: "13.5 in",
            firmness: "Firm",
            feel: "Stable, supportive latex comfort",
            badge: "Firm",
            sourceName: "PranaSleep",
            onlinePrice: price(
              "$3,499.95",
              "PranaSleep",
              sources.pranaKarmaCollection,
              "Official queen starting price",
            ),
            priceVariants: pranaKarmaElitePrices,
            bestFor: ["Back sleepers", "Stomach sleepers", "Extra lower-back support"],
            keyFeatures: [
              "Natural Talalay latex comfort over individually wrapped coils",
              "pranaCOOL quilted cover with copper-infused Talalay latex",
              "Firm support profile for a more stable feel",
            ],
            warranty: "15-year warranty",
            gallery: [
              "/brand-assets/pranasleep/karma-elite.webp",
              "/brand-assets/pranasleep/product-01.avif",
              "/brand-assets/pranasleep/product-02.avif",
            ],
          },
        ),
        mattress(
          "pranasleep-karma-elite-plush",
          "Karma Elite 2 Hybrid Plush",
          "Latex hybrid",
          "/brand-assets/pranasleep/product-01.avif",
          "$3,499.95",
          sources.pranaKarmaCollection,
          {
            height: "13.5 in",
            firmness: "Plush",
            feel: "Soft pressure relief with responsive support",
            badge: "Plush",
            sourceName: "PranaSleep",
            onlinePrice: price(
              "$3,499.95",
              "PranaSleep",
              sources.pranaKarmaCollection,
              "Official queen starting price",
            ),
            priceVariants: pranaKarmaElitePrices,
            bestFor: ["Side sleepers", "Back sleepers", "Softer pressure relief"],
            keyFeatures: [
              "Natural Talalay latex buoyancy with a softer comfort profile",
              "Pocketed coil support with reinforced edges",
              "Cooling quilt package designed for pressure relief",
            ],
            warranty: "15-year warranty",
            gallery: [
              "/brand-assets/pranasleep/product-01.avif",
              "/brand-assets/pranasleep/karma-elite.webp",
              "/brand-assets/pranasleep/product-02.avif",
            ],
          },
        ),
        mattress(
          "pranasleep-karma-elite-super-cush",
          "Karma Elite 2 Hybrid Super Cush",
          "Latex hybrid",
          "/brand-assets/pranasleep/product-02.avif",
          "$3,499.95",
          sources.pranaKarmaCollection,
          {
            height: "15 in",
            firmness: "Super Cush",
            feel: "Extra-cushioned latex comfort",
            badge: "Super Cush",
            sourceName: "PranaSleep",
            onlinePrice: price(
              "$3,499.95",
              "PranaSleep",
              sources.pranaKarmaCollection,
              "Official queen starting price",
            ),
            priceVariants: pranaKarmaElitePrices,
            bestFor: ["Side sleepers", "Pressure-point relief", "A softer luxury feel"],
            keyFeatures: [
              "Extra cushioning for deeper pressure relief",
              "Natural Talalay latex comfort over responsive coils",
              "Thicker 15-inch Super Cush construction",
            ],
            warranty: "15-year warranty",
            gallery: [
              "/brand-assets/pranasleep/product-02.avif",
              "/brand-assets/pranasleep/karma-elite.webp",
              "/brand-assets/pranasleep/product-01.avif",
            ],
          },
        ),
      ],
    });
  }

  if (base.id === "serta") {
    return patchBrand(base, {
      id: base.id,
      name: base.name,
      status: "secondary",
      tagline: "Trusted cooling comfort and Perfect Sleeper support.",
      description: "Serta brings two clear paths into the showroom: iComfort for cooling memory foam comfort and Perfect Sleeper Cascade for zoned innerspring support.",
      showroomNote: "Best for shoppers who want a familiar national brand, cooling materials, and Cascade comfort profiles to compare in person.",
      collectionHighlights: ["iComfort cooling", "Cascade support", "National brand"],
      products: [
        mattress("serta-icomfort", "Serta iComfort Mattress", "Memory foam", "/product-assets/serta/serta-icomfort-1.jpg", "$999", sources.sertaIcomfort, { height: "11.5-14 in", firmness: "Firm, medium, or plush", feel: "Cool-to-the-touch foam comfort", badge: "Cooling", sourceName: "Serta", gallery: ["/product-assets/serta/serta-icomfort-1.jpg", "/product-assets/serta/serta-icomfort-2.jpg"] }),
        mattress("serta-icomfort-pro", "Serta iComfortPro Mattress", "Premium cooling mattress", "/brand-assets/serta/icomfort-preview.jpg", undefined, sources.sertaIcomfortPro, { firmness: "Extra firm or medium", feel: "Advanced cooling support", badge: "Premium" }),
        mattress("serta-cascade-ridge-plush", "Serta Cascade Ridge Plush", "Perfect Sleeper innerspring", "/brand-assets/serta/sheep-lifestyle.jpg", "$599", sources.sertaCascade, { height: "12.5 in", firmness: "Plush", feel: "Cushioned support", badge: "Perfect Sleeper", sourceName: "Serta" }),
        mattress("serta-cascade-canyon-firm", "Serta Cascade Canyon Firm", "Perfect Sleeper innerspring", "/brand-assets/serta/sheep-stretch.jpg", "$699", sources.sertaCanyon, { height: "13 in", firmness: "Firm", feel: "Firm zoned support", sourceName: "Serta" }),
        mattress("serta-cascade-canyon-medium", "Serta Cascade Canyon Medium", "Perfect Sleeper innerspring", "/brand-assets/serta/sheep-lifestyle.jpg", undefined, sources.sertaCascade, { height: "13 in", firmness: "Medium", feel: "Balanced support" }),
        mattress("serta-cascade-canyon-plush", "Serta Cascade Canyon Plush", "Perfect Sleeper innerspring", "/brand-assets/serta/sheep-lifestyle.jpg", undefined, sources.sertaCascade, { height: "13.5 in", firmness: "Plush", feel: "Softer Cascade comfort" }),
        mattress("serta-cascade-pillow-top", "Serta Cascade Canyon Pillow Top", "Perfect Sleeper pillow top", "/brand-assets/serta/sheep-stretch.jpg", undefined, sources.sertaCascade, { height: "14 in", firmness: "Medium or plush", feel: "Cushioned pillow top", badge: "Pillow Top" }),
        mattress("serta-cascade-range", "Serta Cascade Range", "Perfect Sleeper innerspring", "/brand-assets/serta/sheep-lifestyle.jpg", undefined, sources.sertaCascade, { height: "14-15 in", firmness: "Extra firm, medium, firm pillow top, or plush pillow top", feel: "Upgraded Cascade support", badge: "Upgrade" }),
      ],
    });
  }

  return base;
});

export const products = brands.flatMap((brand) => brand.products);
export const featuredBrands = brands.filter((brand) => brand.status === "primary");
export const featuredProducts = ["helix-midnight", "puffy-monarch", "dreamcloud-premier", "nectar-premier", "naturepedic-eos-classic", "bedtech-btx4"].map((id) => products.find((item) => item.id === id)!);
export const sleepSystemAddOns = [
  "bedtech-bt6500",
  "bedtech-bt3000",
  "bedtech-bt2500",
  "bedtech-bt2000",
  "bedtech-btx5",
  "bedtech-btx4",
  "bedtech-bthu",
  "bedtech-upholstered-platform",
  "bedtech-standard-foundation",
  "bedtech-high-rise-platform",
  "bedtech-modern-platform",
  "bedgear-storm",
  "bedgear-balance",
].map((id) => products.find((item) => item.id === id)!);

export { faqItems, productCategories, storeInfo };

export function getBrandById(id: string) {
  return brands.find((brand) => brand.id === id);
}

export function getProductById(id: string) {
  return products.find((item) => item.id === id);
}
