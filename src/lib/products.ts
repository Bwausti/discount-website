import { getBrandAssetBundle } from "./brand-assets";

export type BrandStatus = "primary" | "secondary" | "ask-in-store";

export type ProductCategory =
  | "Mattress"
  | "Adjustable base"
  | "Pillow"
  | "Protector"
  | "Bedding";

export interface Product {
  id: string;
  brandId: string;
  brand: string;
  model: string;
  category: ProductCategory;
  type: string;
  height?: string;
  firmness?: string;
  feel?: string;
  badge?: string;
  bestFor: string[];
  keyFeatures: string[];
  trial?: string;
  warranty?: string;
  image: string;
  gallery: string[];
  availability: string;
  onlinePrice?: ProductPrice;
  priceVariants?: readonly ProductPriceVariant[];
}

export interface ProductPrice {
  amount: string;
  label: string;
  sourceName: string;
  sourceUrl: string;
  asOf: string;
  note?: string;
}

export interface ProductPriceVariant {
  label: string;
  amount: string;
  sourceUrl: string;
}

interface ProductDraft extends Omit<Product, "brandId" | "brand" | "gallery"> {
  gallery?: string[];
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  showroomNote: string;
  status: BrandStatus;
  logo?: string;
  heroImage?: string;
  galleryImages: readonly string[];
  collectionHighlights: string[];
  products: Product[];
}

interface BrandDraft extends Omit<Brand, "logo" | "heroImage" | "galleryImages" | "products"> {
  products: ProductDraft[];
}

const OFFICIAL_PRICE_AS_OF = "May 1, 2026";

function officialOnlinePrice({
  amount,
  sourceName,
  sourceUrl,
  label = "Official online queen price",
  note,
}: Omit<ProductPrice, "asOf" | "label"> & { label?: string }): ProductPrice {
  return {
    amount,
    label,
    sourceName,
    sourceUrl,
    asOf: OFFICIAL_PRICE_AS_OF,
    note,
  };
}

const priceSources = {
  helixQueen: "https://helixsleep.com/pages/queen-size-mattresses",
  puffyQueen: "https://puffy.com/pages/queen-mattresses",
  puffyTwin: "https://puffy.com/pages/twin-mattresses",
  puffyTwinXl: "https://puffy.com/pages/twin-xl-mattresses",
  puffyFull: "https://puffy.com/pages/full-mattresses",
  puffyKing: "https://puffy.com/pages/king-mattresses",
  puffyCalKing: "https://puffy.com/pages/california-king-mattresses",
  puffySplitKing: "https://puffy.com/pages/split-king-mattresses",
  helixCore: "https://helixsleep.com/pages/queen-size-mattresses",
  helixLuxe: "https://helixsleep.com/products/midnight-luxe/queen-tencel",
  helixPlus: "https://helixsleep.com/products/plus",
  helixPlusLuxe: "https://helixsleep.com/products/helix-plus-luxe",
  helixPlusElite: "https://helixsleep.com/products/helix-plus-elite",
  helixSunsetLuxe: "https://helixsleep.com/products/sunset-luxe",
  helixMoonlightLuxe: "https://helixsleep.com/products/moonlight-luxe",
  helixMidnightLuxe: "https://helixsleep.com/products/midnight-luxe",
  helixDuskLuxe: "https://helixsleep.com/products/dusk-luxe",
  helixDawnLuxe: "https://helixsleep.com/products/dawn-luxe",
  helixTwilightLuxe: "https://helixsleep.com/products/twilight-luxe",
  helixSunsetElite: "https://helixsleep.com/products/sunset-elite",
  helixMoonlightElite: "https://helixsleep.com/products/moonlight-elite",
  helixMidnightElite: "https://helixsleep.com/products/midnight-elite",
  helixDuskElite: "https://helixsleep.com/products/dusk-elite",
  helixDawnElite: "https://helixsleep.com/products/dawn-elite",
  helixTwilightElite: "https://helixsleep.com/products/twilight-elite",
  dreamcloudClassicHybrid: "https://www.dreamcloudsleep.com/mattress/queen",
  dreamcloudClassicFoam: "https://www.dreamcloudsleep.com/mattresses/memory-foam-mattress/queen",
  dreamcloudPremier: "https://www.dreamcloudsleep.com/mattresses/premier-hybrid-mattress/queen",
  dreamcloudPremierFoam: "https://www.dreamcloudsleep.com/mattresses/premier-memory-foam-mattress/queen",
  dreamcloudLuxe: "https://www.dreamcloudsleep.com/mattresses/luxe-hybrid-mattress/queen",
  dreamcloudLuxeFoam: "https://www.dreamcloudsleep.com/mattresses/luxe-memory-foam-mattress/queen",
  dreamcloudUltraHybrid: "https://www.dreamcloudsleep.com/mattresses/ultra-hybrid-mattress/queen",
  dreamcloudUltraFoam: "https://www.dreamcloudsleep.com/mattresses/ultra-memory-foam-mattress/queen",
  dreamcloudPressureSmart: "https://www.dreamcloudsleep.com/mattresses/pressure-smart-mattress/queen",
  nectarClassic: "https://www.nectarsleep.com/mattress/queen",
  nectarPremier: "https://www.nectarsleep.com/mattresses/premier-memory-foam-mattress/queen",
  nectarLuxe: "https://www.nectarsleep.com/mattresses/luxe-memory-foam-mattress/queen",
  nectarUltra: "https://www.nectarsleep.com/mattresses/ultra-memory-foam-mattress/queen",
  nectarClassicHybrid: "https://www.nectarsleep.com/mattresses/hybrid-mattress/queen",
  nectarPremierHybrid: "https://www.nectarsleep.com/mattresses/premier-hybrid-mattress/queen",
  nectarLuxeHybrid: "https://www.nectarsleep.com/mattresses/luxe-hybrid-mattress/queen",
  nectarUltraHybrid: "https://www.nectarsleep.com/mattresses/ultra-hybrid-mattress/queen",
  nectarKids: "https://www.nectarsleep.com/mattresses/kids-mattress",
  bedgearM3: "https://bedgear.com/products/m3-performance-mattress",
  bedgearM5: "https://bedgear.com/products/m5-performance-mattress",
  bedgearStorm: "https://bedgear.com/products/storm-performance-pillow",
  bedgearBalance: "https://bedgear.com/products/balance-performance-pillow",
  bedgearDriTec: "https://bedgear.com/products/dri-tec-mattress-protector",
  naturepedicEos: "https://www.naturepedic.com/eos-classic-organic-mattress-buy",
  sertaIcomfort: "https://www.serta.com/mattresses/icomfort",
} as const;

const puffyVariantPrices = {
  cloud: [
    { label: "Twin", amount: "$449", sourceUrl: priceSources.puffyTwin },
    { label: "Twin XL", amount: "$649", sourceUrl: priceSources.puffyTwinXl },
    { label: "Full", amount: "$799", sourceUrl: priceSources.puffyFull },
    { label: "Queen", amount: "$949", sourceUrl: priceSources.puffyQueen },
    { label: "King", amount: "$1,249", sourceUrl: priceSources.puffyKing },
    { label: "Cal King", amount: "$1,249", sourceUrl: priceSources.puffyCalKing },
    { label: "Split King", amount: "$1,498", sourceUrl: priceSources.puffySplitKing },
  ],
  lux: [
    { label: "Twin", amount: "$749", sourceUrl: priceSources.puffyTwin },
    { label: "Twin XL", amount: "$1,099", sourceUrl: priceSources.puffyTwinXl },
    { label: "Full", amount: "$1,349", sourceUrl: priceSources.puffyFull },
    { label: "Queen", amount: "$1,549", sourceUrl: priceSources.puffyQueen },
    { label: "King", amount: "$1,749", sourceUrl: priceSources.puffyKing },
    { label: "Cal King", amount: "$1,749", sourceUrl: priceSources.puffyCalKing },
    { label: "Split King", amount: "$2,198", sourceUrl: priceSources.puffySplitKing },
  ],
  royal: [
    { label: "Twin", amount: "$1,089", sourceUrl: priceSources.puffyTwin },
    { label: "Twin XL", amount: "$1,499", sourceUrl: priceSources.puffyTwinXl },
    { label: "Full", amount: "$2,199", sourceUrl: priceSources.puffyFull },
    { label: "Queen", amount: "$2,449", sourceUrl: priceSources.puffyQueen },
    { label: "King", amount: "$2,749", sourceUrl: priceSources.puffyKing },
    { label: "Cal King", amount: "$2,749", sourceUrl: priceSources.puffyCalKing },
    { label: "Split King", amount: "$2,998", sourceUrl: priceSources.puffySplitKing },
  ],
  monarch: [
    { label: "Twin XL", amount: "$1,799", sourceUrl: priceSources.puffyTwinXl },
    { label: "Queen", amount: "$3,199", sourceUrl: priceSources.puffyQueen },
    { label: "King", amount: "$3,849", sourceUrl: priceSources.puffyKing },
    { label: "Cal King", amount: "$3,849", sourceUrl: priceSources.puffyCalKing },
    { label: "Split King", amount: "$3,898", sourceUrl: priceSources.puffySplitKing },
  ],
} as const satisfies Record<string, readonly ProductPriceVariant[]>;

const helixVariantPrices = {
  core: [
    { label: "Twin", amount: "$799", sourceUrl: priceSources.helixCore },
    { label: "Twin XL", amount: "$899", sourceUrl: priceSources.helixCore },
    { label: "Full", amount: "$999", sourceUrl: priceSources.helixCore },
    { label: "Queen", amount: "$1,099", sourceUrl: priceSources.helixCore },
    { label: "King", amount: "$1,449", sourceUrl: priceSources.helixCore },
    { label: "CA King", amount: "$1,449", sourceUrl: priceSources.helixCore },
  ],
  luxe: [
    { label: "Twin", amount: "$1,149", sourceUrl: priceSources.helixLuxe },
    { label: "Twin XL", amount: "$1,349", sourceUrl: priceSources.helixLuxe },
    { label: "Full", amount: "$1,649", sourceUrl: priceSources.helixLuxe },
    { label: "Queen", amount: "$1,919", sourceUrl: priceSources.helixLuxe },
    { label: "King", amount: "$2,339", sourceUrl: priceSources.helixLuxe },
    { label: "CA King", amount: "$2,339", sourceUrl: priceSources.helixLuxe },
  ],
  plus: [
    { label: "Twin", amount: "$849", sourceUrl: priceSources.helixPlus },
    { label: "Twin XL", amount: "$949", sourceUrl: priceSources.helixPlus },
    { label: "Full", amount: "$1,049", sourceUrl: priceSources.helixPlus },
    { label: "Queen", amount: "$1,199", sourceUrl: priceSources.helixPlus },
    { label: "King", amount: "$1,449", sourceUrl: priceSources.helixPlus },
    { label: "CA King", amount: "$1,449", sourceUrl: priceSources.helixPlus },
  ],
  plusLuxe: [
    { label: "Twin", amount: "$1,218", sourceUrl: priceSources.helixPlusLuxe },
    { label: "Twin XL", amount: "$1,406", sourceUrl: priceSources.helixPlusLuxe },
    { label: "Full", amount: "$1,687", sourceUrl: priceSources.helixPlusLuxe },
    { label: "Queen", amount: "$1,874", sourceUrl: priceSources.helixPlusLuxe },
    { label: "King", amount: "$2,249", sourceUrl: priceSources.helixPlusLuxe },
    { label: "CA King", amount: "$2,249", sourceUrl: priceSources.helixPlusLuxe },
  ],
  elite: [
    { label: "Twin", amount: "$1,874", sourceUrl: priceSources.helixMidnightElite },
    { label: "Twin XL", amount: "$2,062", sourceUrl: priceSources.helixMidnightElite },
    { label: "Full", amount: "$2,483", sourceUrl: priceSources.helixMidnightElite },
    { label: "Queen", amount: "$2,998", sourceUrl: priceSources.helixMidnightElite },
    { label: "King", amount: "$3,374", sourceUrl: priceSources.helixMidnightElite },
    { label: "CA King", amount: "$3,374", sourceUrl: priceSources.helixMidnightElite },
  ],
} as const satisfies Record<string, readonly ProductPriceVariant[]>;

const nectarVariantPrices = {
  classic: [
    { label: "Twin", amount: "$369", sourceUrl: "https://www.nectarsleep.com/mattress/twin" },
    { label: "Twin XL", amount: "$549", sourceUrl: "https://www.nectarsleep.com/mattress/twin-xl" },
    { label: "Full", amount: "$599", sourceUrl: "https://www.nectarsleep.com/mattress/full" },
    { label: "Queen", amount: "$689", sourceUrl: priceSources.nectarClassic },
    { label: "King", amount: "$899", sourceUrl: "https://www.nectarsleep.com/mattress/king" },
    { label: "Cal King", amount: "$849", sourceUrl: "https://www.nectarsleep.com/mattress/cal-king" },
    { label: "Split King", amount: "$1,098", sourceUrl: "https://www.nectarsleep.com/mattress/split-king" },
  ],
  premier: [
    {
      label: "Twin",
      amount: "$549",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-memory-foam-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$749",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-memory-foam-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$899",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-memory-foam-mattress/full",
    },
    { label: "Queen", amount: "$949", sourceUrl: priceSources.nectarPremier },
    {
      label: "King",
      amount: "$1,099",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-memory-foam-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$1,099",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-memory-foam-mattress/cal-king",
    },
  ],
  luxe: [
    {
      label: "Twin",
      amount: "$999",
      sourceUrl: "https://www.nectarsleep.com/mattresses/luxe-memory-foam-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$1,099",
      sourceUrl: "https://www.nectarsleep.com/mattresses/luxe-memory-foam-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$1,199",
      sourceUrl: "https://www.nectarsleep.com/mattresses/luxe-memory-foam-mattress/full",
    },
    { label: "Queen", amount: "$1,249", sourceUrl: priceSources.nectarLuxe },
    {
      label: "King",
      amount: "$1,499",
      sourceUrl: "https://www.nectarsleep.com/mattresses/luxe-memory-foam-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$1,499",
      sourceUrl: "https://www.nectarsleep.com/mattresses/luxe-memory-foam-mattress/cal-king",
    },
  ],
  ultra: [
    { label: "Queen", amount: "$1,799", sourceUrl: priceSources.nectarUltra },
  ],
  classicHybrid: [
    {
      label: "Twin",
      amount: "$349",
      sourceUrl: "https://www.nectarsleep.com/mattresses/hybrid-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$749",
      sourceUrl: "https://www.nectarsleep.com/mattresses/hybrid-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$749",
      sourceUrl: "https://www.nectarsleep.com/mattresses/hybrid-mattress/full",
    },
    { label: "Queen", amount: "$799", sourceUrl: priceSources.nectarClassicHybrid },
    {
      label: "King",
      amount: "$999",
      sourceUrl: "https://www.nectarsleep.com/mattresses/hybrid-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$999",
      sourceUrl: "https://www.nectarsleep.com/mattresses/hybrid-mattress/cal-king",
    },
  ],
  premierHybrid: [
    {
      label: "Twin",
      amount: "$799",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-hybrid-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$999",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-hybrid-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$1,099",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-hybrid-mattress/full",
    },
    { label: "Queen", amount: "$1,099", sourceUrl: priceSources.nectarPremierHybrid },
    {
      label: "King",
      amount: "$1,299",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-hybrid-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$1,299",
      sourceUrl: "https://www.nectarsleep.com/mattresses/premier-hybrid-mattress/cal-king",
    },
  ],
  luxeHybrid: [
    {
      label: "Twin",
      amount: "$1,099",
      sourceUrl: "https://www.nectarsleep.com/mattresses/luxe-hybrid-mattress/twin",
    },
    { label: "Queen", amount: "$1,549", sourceUrl: priceSources.nectarLuxeHybrid },
  ],
  ultraHybrid: [
    {
      label: "Twin",
      amount: "$1,599",
      sourceUrl: "https://www.nectarsleep.com/mattresses/ultra-hybrid-mattress/twin",
    },
    { label: "Queen", amount: "$2,099", sourceUrl: priceSources.nectarUltraHybrid },
  ],
} as const satisfies Record<string, readonly ProductPriceVariant[]>;

const dreamcloudVariantPrices = {
  classicHybrid: [
    { label: "Twin", amount: "$349", sourceUrl: "https://www.dreamcloudsleep.com/mattress/twin" },
    { label: "Twin XL", amount: "$549", sourceUrl: "https://www.dreamcloudsleep.com/mattress/twin-xl" },
    { label: "Full", amount: "$599", sourceUrl: "https://www.dreamcloudsleep.com/mattress/full" },
    { label: "Queen", amount: "$649", sourceUrl: priceSources.dreamcloudClassicHybrid },
    { label: "King", amount: "$849", sourceUrl: "https://www.dreamcloudsleep.com/mattress/king" },
    { label: "Cal King", amount: "$849", sourceUrl: "https://www.dreamcloudsleep.com/mattress/cal-king" },
  ],
  classicFoam: [
    {
      label: "Twin",
      amount: "$299",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/memory-foam-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$649",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/memory-foam-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$699",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/memory-foam-mattress/full",
    },
    { label: "Queen", amount: "$749", sourceUrl: priceSources.dreamcloudClassicFoam },
    {
      label: "King",
      amount: "$949",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/memory-foam-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$949",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/memory-foam-mattress/cal-king",
    },
  ],
  premierHybrid: [
    {
      label: "Twin",
      amount: "$799",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-hybrid-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$899",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-hybrid-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$999",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-hybrid-mattress/full",
    },
    { label: "Queen", amount: "$1,099", sourceUrl: priceSources.dreamcloudPremier },
    {
      label: "King",
      amount: "$1,299",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-hybrid-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$1,299",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-hybrid-mattress/cal-king",
    },
  ],
  premierFoam: [
    {
      label: "Twin",
      amount: "$899",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-memory-foam-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$999",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-memory-foam-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$1,099",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-memory-foam-mattress/full",
    },
    { label: "Queen", amount: "$1,199", sourceUrl: priceSources.dreamcloudPremierFoam },
    {
      label: "King",
      amount: "$1,399",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-memory-foam-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$1,399",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/premier-memory-foam-mattress/cal-king",
    },
  ],
  luxeHybrid: [
    {
      label: "Twin",
      amount: "$1,099",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-hybrid-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$1,299",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-hybrid-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$1,399",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-hybrid-mattress/full",
    },
    { label: "Queen", amount: "$1,499", sourceUrl: priceSources.dreamcloudLuxe },
    {
      label: "King",
      amount: "$1,699",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-hybrid-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$1,699",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-hybrid-mattress/cal-king",
    },
  ],
  luxeFoam: [
    {
      label: "Twin",
      amount: "$1,199",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-memory-foam-mattress/twin",
    },
    {
      label: "Twin XL",
      amount: "$1,399",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-memory-foam-mattress/twin-xl",
    },
    {
      label: "Full",
      amount: "$1,499",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-memory-foam-mattress/full",
    },
    { label: "Queen", amount: "$1,599", sourceUrl: priceSources.dreamcloudLuxeFoam },
    {
      label: "King",
      amount: "$1,799",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-memory-foam-mattress/king",
    },
    {
      label: "Cal King",
      amount: "$1,799",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/luxe-memory-foam-mattress/cal-king",
    },
  ],
  ultraHybrid: [
    {
      label: "Twin",
      amount: "$1,369",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/ultra-hybrid-mattress/twin",
    },
    {
      label: "Full",
      amount: "$1,599",
      sourceUrl: "https://www.dreamcloudsleep.com/mattresses/ultra-hybrid-mattress/full",
    },
    { label: "Queen", amount: "$1,999", sourceUrl: priceSources.dreamcloudUltraHybrid },
  ],
  ultraFoam: [
    { label: "Queen", amount: "$2,199", sourceUrl: priceSources.dreamcloudUltraFoam },
  ],
} as const satisfies Record<string, readonly ProductPriceVariant[]>;

function withBrandAssets(brand: BrandDraft): Brand {
  const assetBundle = getBrandAssetBundle(brand.id);

  return {
    ...brand,
    logo: assetBundle?.logo,
    heroImage: assetBundle?.heroImage,
    galleryImages: assetBundle?.galleryImages ?? [],
    products: brand.products.map((product) => ({
      ...product,
      brandId: brand.id,
      brand: brand.name,
      gallery: product.gallery ?? [product.image],
    })),
  };
}

type HelixPriceTier = keyof typeof helixVariantPrices;

function helixPrices(tier: HelixPriceTier, sourceUrl: string) {
  return helixVariantPrices[tier].map((price) => ({
    ...price,
    sourceUrl,
  }));
}

function helixDraft({
  id,
  model,
  type,
  height,
  firmness,
  feel,
  badge,
  bestFor,
  keyFeatures,
  image,
  gallery,
  sourceUrl,
  priceTier,
}: Omit<ProductDraft, "brand" | "brandId" | "category" | "availability" | "onlinePrice" | "priceVariants" | "trial" | "warranty"> & {
  sourceUrl: string;
  priceTier: HelixPriceTier;
}): ProductDraft {
  const priceVariants = helixPrices(priceTier, sourceUrl);

  return {
    id,
    model,
    category: "Mattress",
    type,
    height,
    firmness,
    feel,
    badge,
    bestFor,
    keyFeatures,
    trial: "120 nights",
    warranty: "Limited lifetime",
    image,
    gallery,
    availability: "Call to confirm current showroom availability.",
    onlinePrice: officialOnlinePrice({
      amount: priceVariants[0]?.amount ?? "Call",
      label: "Starting price",
      sourceName: "Helix",
      sourceUrl,
    }),
    priceVariants,
  };
}

const helixCoreComforts = [
  {
    id: "helix-sunset",
    model: "Helix Sunset",
    firmness: "Soft",
    feel: "Plush pressure relief",
    badge: "Side sleeper",
    bestFor: ["Side sleepers", "Shoulder pressure", "Plush comfort"],
    keyFeatures: ["Soft comfort layers", "Wrapped coil support", "Pressure-relieving surface"],
    image: "/product-assets/helix/helix-sunset-core-1.png",
  },
  {
    id: "helix-moonlight",
    model: "Helix Moonlight",
    firmness: "Medium-soft",
    feel: "Light contouring",
    bestFor: ["Back sleepers", "Stomach sleepers", "Gentler support"],
    keyFeatures: ["Soft feel", "Balanced sink", "Easy moving comfort"],
    image: "/product-assets/helix/helix-moonlight-core-1.png",
    gallery: [
      "/product-assets/helix/helix-moonlight-core-1.png",
      "/product-assets/helix/helix-moonlight-core-2.png",
    ],
  },
  {
    id: "helix-midnight",
    model: "Helix Midnight",
    firmness: "Medium",
    feel: "Balanced support",
    badge: "Best seller",
    bestFor: ["Side sleepers", "Couples", "All-around comfort"],
    keyFeatures: ["Medium feel", "Motion isolation", "Wrapped coil lift"],
    image: "/product-assets/helix/helix-midnight-1.webp",
    gallery: [
      "/product-assets/helix/helix-midnight-1.webp",
      "/product-assets/helix/helix-midnight-2.jpg",
      "/product-assets/helix/helix-midnight-3.jpg",
    ],
  },
  {
    id: "helix-dusk",
    model: "Helix Dusk",
    firmness: "Medium-firm",
    feel: "Even support",
    bestFor: ["Back sleepers", "Stomach sleepers", "Support seekers"],
    keyFeatures: ["Responsive comfort", "Durable edge support", "Hybrid construction"],
    image: "/product-assets/helix/helix-dusk-core-1.png",
  },
  {
    id: "helix-dawn",
    model: "Helix Dawn",
    firmness: "Firm",
    feel: "Traditional firm",
    bestFor: ["Back sleepers", "Stomach sleepers", "Minimal sink"],
    keyFeatures: ["Firm top feel", "Stable coil support", "Low-profile contouring"],
    image: "/product-assets/helix/helix-dawn-core-1.png",
  },
  {
    id: "helix-twilight",
    model: "Helix Twilight",
    firmness: "Firm",
    feel: "Firm pressure relief",
    bestFor: ["Side sleepers", "Higher support needs", "Firm mattress shoppers"],
    keyFeatures: ["Firm comfort surface", "High-density foams", "Hybrid lift"],
    image: "/product-assets/helix/helix-twilight-core-1.png",
  },
] satisfies Array<Omit<Parameters<typeof helixDraft>[0], "type" | "height" | "sourceUrl" | "priceTier">>;

const helixLuxeComforts = [
  {
    base: "Sunset",
    id: "helix-sunset-luxe",
    firmness: "Soft",
    feel: "Plush pillow top",
    badge: "Luxe",
    bestFor: ["Side sleepers", "Pressure relief", "Pillow top comfort"],
    image: "/product-assets/helix/helix-sunset-luxe-1.webp",
    gallery: [
      "/product-assets/helix/helix-sunset-luxe-1.webp",
      "/product-assets/helix/helix-sunset-luxe-2.jpg",
      "/product-assets/helix/helix-sunset-luxe-3.jpg",
    ],
    sourceUrl: priceSources.helixSunsetLuxe,
  },
  {
    base: "Moonlight",
    id: "helix-moonlight-luxe",
    firmness: "Medium-soft",
    feel: "Soft contour with lumbar support",
    bestFor: ["Back sleepers", "Stomach sleepers", "Softer luxury feel"],
    image: "/product-assets/helix/helix-moonlight-luxe-1.png",
    gallery: [
      "/product-assets/helix/helix-moonlight-luxe-1.png",
      "/product-assets/helix/helix-moonlight-luxe-2.png",
    ],
    sourceUrl: priceSources.helixMoonlightLuxe,
  },
  {
    base: "Midnight",
    id: "helix-midnight-luxe",
    firmness: "Medium",
    feel: "Plush top, supportive core",
    badge: "Premium pick",
    bestFor: ["Side sleepers", "Couples", "Cooling upgrade shoppers"],
    image: "/product-assets/helix/helix-midnight-luxe-2.webp",
    gallery: [
      "/product-assets/helix/helix-midnight-luxe-2.webp",
      "/product-assets/helix/helix-midnight-luxe-3.png",
    ],
    sourceUrl: priceSources.helixMidnightLuxe,
  },
  {
    base: "Dusk",
    id: "helix-dusk-luxe",
    firmness: "Medium-firm",
    feel: "Balanced luxury support",
    bestFor: ["Back sleepers", "Stomach sleepers", "Couples"],
    image: "/product-assets/helix/helix-dusk-luxe-1.png",
    sourceUrl: priceSources.helixDuskLuxe,
  },
  {
    base: "Dawn",
    id: "helix-dawn-luxe",
    firmness: "Firm",
    feel: "Firm pillow top",
    bestFor: ["Back sleepers", "Stomach sleepers", "Firm luxury shoppers"],
    image: "/product-assets/helix/helix-dawn-luxe-1.png",
    sourceUrl: priceSources.helixDawnLuxe,
  },
  {
    base: "Twilight",
    id: "helix-twilight-luxe",
    firmness: "Firm",
    feel: "Firm pressure relief",
    bestFor: ["Side sleepers", "Firm feel shoppers", "Lumbar support"],
    image: "/product-assets/helix/helix-twilight-luxe-1.png",
    sourceUrl: priceSources.helixTwilightLuxe,
  },
] satisfies Array<{
  base: string;
  id: string;
  firmness: string;
  feel: string;
  badge?: string;
  bestFor: string[];
  image: string;
  gallery?: string[];
  sourceUrl: string;
}>;

const helixEliteComforts = [
  {
    base: "Sunset",
    id: "helix-sunset-elite",
    firmness: "Soft",
    feel: "Ultra-plush cooling luxury",
    image: "/product-assets/helix/helix-sunset-elite-1.png",
    gallery: [
      "/product-assets/helix/helix-sunset-elite-1.png",
      "/product-assets/helix/helix-sunset-elite-2.png",
    ],
    sourceUrl: priceSources.helixSunsetElite,
  },
  {
    base: "Moonlight",
    id: "helix-moonlight-elite",
    firmness: "Medium-soft",
    feel: "Soft Elite support",
    image: "/brand-assets/helix/hero.webp",
    sourceUrl: priceSources.helixMoonlightElite,
  },
  {
    base: "Midnight",
    id: "helix-midnight-elite",
    firmness: "Medium",
    feel: "Elite side-sleeper comfort",
    image: "/product-assets/helix/helix-midnight-elite-1.png",
    sourceUrl: priceSources.helixMidnightElite,
  },
  {
    base: "Dusk",
    id: "helix-dusk-elite",
    firmness: "Medium-firm",
    feel: "Elite balanced support",
    image: "/product-assets/helix/helix-dusk-elite-1.png",
    gallery: [
      "/product-assets/helix/helix-dusk-elite-1.png",
      "/product-assets/helix/helix-dusk-elite-2.png",
    ],
    sourceUrl: priceSources.helixDuskElite,
  },
  {
    base: "Dawn",
    id: "helix-dawn-elite",
    firmness: "Firm",
    feel: "Elite firm support",
    image: "/product-assets/helix/helix-dawn-elite-1.png",
    sourceUrl: priceSources.helixDawnElite,
  },
  {
    base: "Twilight",
    id: "helix-twilight-elite",
    firmness: "Firm",
    feel: "Elite firm pressure relief",
    image: "/product-assets/helix/helix-twilight-elite-1.png",
    gallery: [
      "/product-assets/helix/helix-twilight-elite-1.png",
      "/product-assets/helix/helix-twilight-elite-2.png",
    ],
    sourceUrl: priceSources.helixTwilightElite,
  },
] satisfies Array<{
  base: string;
  id: string;
  firmness: string;
  feel: string;
  image: string;
  gallery?: string[];
  sourceUrl: string;
}>;

const helixProducts: ProductDraft[] = [
  ...helixCoreComforts.map((product) =>
    helixDraft({
      ...product,
      type: "Hybrid",
      height: "11.5 in",
      sourceUrl: priceSources.helixCore,
      priceTier: "core",
    }),
  ),
  helixDraft({
    id: "helix-plus",
    model: "Helix Plus",
    type: "Hybrid",
    height: "13 in",
    firmness: "Firm",
    feel: "Extra supportive",
    badge: "Plus support",
    bestFor: ["Big and tall sleepers", "Couples", "Long-term durability"],
    keyFeatures: ["Higher density materials", "Extra support layer", "Reinforced edge feel"],
    image: "/product-assets/helix/helix-plus-core-1.png",
    sourceUrl: priceSources.helixPlus,
    priceTier: "plus",
  }),
  ...helixLuxeComforts.map((product) =>
    helixDraft({
      id: product.id,
      model: `Helix ${product.base} Luxe`,
      type: "Luxury hybrid",
      height: "13.5 in",
      firmness: product.firmness,
      feel: product.feel,
      badge: product.badge,
      bestFor: product.bestFor,
      keyFeatures: [
        "Premium quilted pillow top",
        "Zoned lumbar support",
        "TENCEL and GlacioTex cooling options",
      ],
      image: product.image,
      gallery: product.gallery,
      sourceUrl: product.sourceUrl,
      priceTier: "luxe",
    }),
  ),
  helixDraft({
    id: "helix-plus-luxe",
    model: "Helix Plus Luxe",
    type: "Luxury hybrid",
    height: "13.5 in",
    firmness: "Medium-firm",
    feel: "Plus-size support with pillow top comfort",
    badge: "Plus Luxe",
    bestFor: ["Plus-size sleepers", "All sleeping positions", "Back support"],
    keyFeatures: [
      "Premium pillow top",
      "ErgoAlign support option",
      "GlacioTex cooling cover option",
    ],
    image: "/product-assets/helix/helix-plus-luxe-1.png",
    sourceUrl: priceSources.helixPlusLuxe,
    priceTier: "plusLuxe",
  }),
  ...helixEliteComforts.map((product) =>
    helixDraft({
      id: product.id,
      model: `Helix ${product.base} Elite`,
      type: "Elite luxury hybrid",
      height: "15 in",
      firmness: product.firmness,
      feel: product.feel,
      badge: "Elite",
      bestFor: ["Premium comfort", "Hot sleepers", "Advanced support"],
      keyFeatures: [
        "GlacioTex Elite cooling cover",
        "ErgoAlign contour layer",
        "Microcoil comfort layers",
      ],
      image: product.image,
      gallery: product.gallery,
      sourceUrl: product.sourceUrl,
      priceTier: "elite",
    }),
  ),
  helixDraft({
    id: "helix-plus-elite",
    model: "Helix Plus Elite",
    type: "Elite luxury hybrid",
    height: "15 in",
    firmness: "Medium-firm",
    feel: "Top-tier plus-size support",
    badge: "Elite Plus",
    bestFor: ["Plus-size sleepers", "Hot sleepers", "Maximum support"],
    keyFeatures: [
      "GlacioTex Elite cooling cover",
      "ErgoAlign contour layer",
      "Reinforced support up to 2000 lbs",
    ],
    image: "/product-assets/helix/helix-plus-elite-1.png",
    sourceUrl: priceSources.helixPlusElite,
    priceTier: "elite",
  }),
];

export const brands: Brand[] = [
  withBrandAssets({
    id: "helix",
    name: "Helix",
    status: "primary",
    tagline: "Personalized hybrids for every sleep style.",
    description:
      "Helix gives shoppers an easy way to compare soft, medium, firm, Luxe, Elite, and Plus options in one clear lineup.",
    showroomNote:
      "Best for shoppers who know their sleep position and want a clear comfort recommendation.",
    collectionHighlights: [
      "Core, Luxe, and Elite",
      "ErgoAlign support options",
      "GlacioTex cooling covers",
    ],
    products: helixProducts,
  }),
  withBrandAssets({
    id: "puffy",
    name: "Puffy",
    status: "primary",
    tagline: "Cloud-like comfort with premium cooling upgrades.",
    description:
      "Puffy is a simple comfort ladder from the Cloud through Lux, Royal, and Monarch models.",
    showroomNote:
      "Best for shoppers who want a soft, pressure-relieving mattress with an easy good-better-best story.",
    collectionHighlights: ["Foam and hybrid choices", "Cooling comfort", "Made in USA story"],
    products: [
      {
        id: "puffy-cloud",
        model: "Puffy Cloud",
        category: "Mattress",
        type: "Memory foam",
        height: "10 in",
        firmness: "Medium-firm",
        feel: "Adaptive foam",
        bestFor: ["All sleep positions", "Value shoppers", "Memory foam comfort"],
        keyFeatures: ["Cooling gel cloud layer", "Stain-resistant cover", "Pressure relief"],
        trial: "101 nights",
        warranty: "Lifetime",
        image: "/product-assets/puffy-refresh/cloud-crop-01.webp",
        gallery: [
          "/product-assets/puffy-refresh/cloud-crop-01.webp",
          "/product-assets/puffy-refresh/cloud-crop-02.webp",
          "/product-assets/puffy-refresh/cloud-crop-03.webp",
        ],
        availability: "Call for current Puffy offers.",
        onlinePrice: officialOnlinePrice({
          amount: "$449",
          label: "Starting sale price",
          sourceName: "Puffy",
          sourceUrl: priceSources.puffyTwin,
        }),
        priceVariants: puffyVariantPrices.cloud,
      },
      {
        id: "puffy-lux",
        model: "Puffy Lux",
        category: "Mattress",
        type: "Memory foam",
        height: "12 in",
        firmness: "Medium",
        feel: "Cooling contour",
        badge: "Cooling",
        bestFor: ["Side sleepers", "Back sleepers", "Pressure relief"],
        keyFeatures: ["Cooling gel foam", "Climate comfort layer", "Deep contouring"],
        trial: "101 nights",
        warranty: "Lifetime",
        image: "/product-assets/puffy-refresh/lux-crop-01.webp",
        gallery: [
          "/product-assets/puffy-refresh/lux-crop-01.webp",
          "/product-assets/puffy-refresh/lux-crop-02.webp",
          "/product-assets/puffy-refresh/lux-crop-03.webp",
        ],
        availability: "Ask to compare Lux foam and hybrid options.",
        onlinePrice: officialOnlinePrice({
          amount: "$749",
          label: "Starting sale price",
          sourceName: "Puffy",
          sourceUrl: priceSources.puffyTwin,
        }),
        priceVariants: puffyVariantPrices.lux,
      },
      {
        id: "puffy-lux-hybrid",
        model: "Puffy Lux Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "12 in",
        firmness: "Medium",
        feel: "Contour with lift",
        bestFor: ["Couples", "Combination sleepers", "Hybrid shoppers"],
        keyFeatures: ["Coil support", "Cooling foam", "Better edge response"],
        trial: "101 nights",
        warranty: "Lifetime",
        image: "/product-assets/puffy-refresh/lux-crop-02.webp",
        availability: "Call for current hybrid availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$749",
          label: "Starting sale price",
          sourceName: "Puffy",
          sourceUrl: priceSources.puffyTwin,
        }),
        priceVariants: puffyVariantPrices.lux,
      },
      {
        id: "puffy-royal-hybrid",
        model: "Puffy Royal Hybrid",
        category: "Mattress",
        type: "Luxury hybrid",
        height: "14 in",
        firmness: "Medium",
        feel: "Luxury plush",
        bestFor: ["Luxury shoppers", "Pressure relief", "Couples"],
        keyFeatures: ["Quilted comfort top", "Advanced cooling", "Responsive support"],
        trial: "101 nights",
        warranty: "Lifetime",
        image: "/product-assets/puffy-refresh/royal-crop-01.webp",
        gallery: [
          "/product-assets/puffy-refresh/royal-crop-01.webp",
          "/product-assets/puffy-refresh/royal-crop-02.webp",
          "/product-assets/puffy-refresh/royal-crop-03.webp",
        ],
        availability: "Ask the showroom team about Royal and Monarch comparisons.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,089",
          label: "Starting sale price",
          sourceName: "Puffy",
          sourceUrl: priceSources.puffyTwin,
        }),
        priceVariants: puffyVariantPrices.royal,
      },
      {
        id: "puffy-monarch",
        model: "Puffy Monarch",
        category: "Mattress",
        type: "Ultra-luxury hybrid",
        height: "16 in",
        firmness: "Medium",
        feel: "Tall, plush, premium",
        badge: "Top tier",
        bestFor: ["Premium comfort", "Hot sleepers", "Showpiece bedrooms"],
        keyFeatures: ["Diamond foam", "Ultra-premium profile", "Cloud-like pressure relief"],
        trial: "101 nights",
        warranty: "Lifetime",
        image: "/product-assets/puffy-refresh/monarch-crop-01.webp",
        gallery: [
          "/product-assets/puffy-refresh/monarch-crop-01.webp",
          "/product-assets/puffy-refresh/monarch-crop-02.webp",
          "/product-assets/puffy-refresh/monarch-crop-03.webp",
        ],
        availability: "Call for today's Monarch availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,799",
          label: "Starting sale price",
          sourceName: "Puffy",
          sourceUrl: priceSources.puffyTwinXl,
        }),
        priceVariants: puffyVariantPrices.monarch,
      },
    ],
  }),
  withBrandAssets({
    id: "dreamcloud",
    name: "DreamCloud",
    status: "primary",
    tagline: "Classic, Premier, Luxe, and Ultra comfort in hybrid and memory foam.",
    description:
      "DreamCloud pairs quilted tops, cooling comfort layers, and strong support in a full lineup that is easy to compare.",
    showroomNote:
      "A strong fit for shoppers who want a luxury mattress feel with clear step-up options.",
    collectionHighlights: ["Hybrid and memory foam", "Classic to Ultra", "365-night trial"],
    products: [
      {
        id: "dreamcloud-classic-hybrid",
        model: "DreamCloud Classic Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "12 in",
        firmness: "Firm",
        feel: "Supportive comfort",
        badge: "Best Value",
        bestFor: ["Back sleepers", "Stomach sleepers", "Value shoppers"],
        keyFeatures: ["CloudQuilt cover", "Cooling fibers", "Individually wrapped coils"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/brand-assets/dreamcloud/classic-product.webp",
        gallery: [
          "/brand-assets/dreamcloud/classic-product.webp",
          "/product-assets/dreamcloud/dreamcloud-premier-1.webp",
          "/brand-assets/dreamcloud/comparison.png",
        ],
        availability: "Call for current DreamCloud availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$349",
          label: "Starting price",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudClassicHybrid,
        }),
        priceVariants: dreamcloudVariantPrices.classicHybrid,
      },
      {
        id: "dreamcloud-classic-memory-foam",
        model: "DreamCloud Classic Memory Foam",
        category: "Mattress",
        type: "Memory foam",
        height: "12 in",
        firmness: "Firm",
        feel: "Contouring support",
        bestFor: ["Foam shoppers", "Pressure relief", "Lower motion transfer"],
        keyFeatures: ["CloudQuilt cover", "Cooling fibers", "Memory foam comfort"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/brand-assets/dreamcloud/classic-product.webp",
        gallery: [
          "/brand-assets/dreamcloud/classic-product.webp",
          "/product-assets/dreamcloud/dreamcloud-premier-2.webp",
        ],
        availability: "Call for current DreamCloud availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$299",
          label: "Starting price",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudClassicFoam,
        }),
        priceVariants: dreamcloudVariantPrices.classicFoam,
      },
      {
        id: "dreamcloud-premier",
        model: "DreamCloud Premier Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "13 in",
        firmness: "Medium-firm",
        feel: "Luxury support",
        badge: "Most Popular",
        bestFor: ["Couples", "Back sleepers", "Luxury feel"],
        keyFeatures: ["Euro top feel", "Extra cooling fibers", "Hybrid support"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/dreamcloud/dreamcloud-premier-1.webp",
        gallery: [
          "/product-assets/dreamcloud/dreamcloud-premier-1.webp",
          "/product-assets/dreamcloud/dreamcloud-premier-2.webp",
          "/product-assets/dreamcloud/dreamcloud-premier-3.webp",
        ],
        availability: "Call for current DreamCloud availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$799",
          label: "Starting price",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudPremier,
        }),
        priceVariants: dreamcloudVariantPrices.premierHybrid,
      },
      {
        id: "dreamcloud-premier-memory-foam",
        model: "DreamCloud Premier Memory Foam",
        category: "Mattress",
        type: "Memory foam",
        height: "13 in",
        firmness: "Medium-firm",
        feel: "Cushioned contour",
        bestFor: ["Foam shoppers", "Couples", "Pressure relief"],
        keyFeatures: ["Euro top feel", "Extra memory foam", "Cooling fibers"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/dreamcloud/dreamcloud-premier-1.webp",
        gallery: [
          "/product-assets/dreamcloud/dreamcloud-premier-1.webp",
          "/product-assets/dreamcloud/dreamcloud-premier-3.webp",
        ],
        availability: "Call for current DreamCloud availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$899",
          label: "Starting price",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudPremierFoam,
        }),
        priceVariants: dreamcloudVariantPrices.premierFoam,
      },
      {
        id: "dreamcloud-luxe-hybrid",
        model: "DreamCloud Luxe Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "14 in",
        firmness: "Medium",
        feel: "Targeted support",
        badge: "Luxury",
        bestFor: ["Back support", "Side sleepers", "Cooling comfort"],
        keyFeatures: ["Tri-zone support", "CloudQuilt+ euro top", "Phase-change cooling"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/dreamcloud/dreamcloud-rest-1.webp",
        gallery: [
          "/product-assets/dreamcloud/dreamcloud-rest-1.webp",
          "/product-assets/dreamcloud/dreamcloud-rest-2.webp",
          "/product-assets/dreamcloud/dreamcloud-rest-3.webp",
        ],
        availability: "Call for current DreamCloud availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,099",
          label: "Starting price",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudLuxe,
        }),
        priceVariants: dreamcloudVariantPrices.luxeHybrid,
      },
      {
        id: "dreamcloud-luxe-memory-foam",
        model: "DreamCloud Luxe Memory Foam",
        category: "Mattress",
        type: "Memory foam",
        height: "14 in",
        firmness: "Medium",
        feel: "Plush contour",
        badge: "Luxury",
        bestFor: ["Pressure relief", "Side sleepers", "Foam comfort"],
        keyFeatures: ["Tri-zone support", "CloudQuilt+ euro top", "Cooling comfort"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/dreamcloud/dreamcloud-rest-1.webp",
        gallery: [
          "/product-assets/dreamcloud/dreamcloud-rest-1.webp",
          "/product-assets/dreamcloud/dreamcloud-rest-2.webp",
        ],
        availability: "Call for current DreamCloud availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,199",
          label: "Starting price",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudLuxeFoam,
        }),
        priceVariants: dreamcloudVariantPrices.luxeFoam,
      },
      {
        id: "dreamcloud-ultra-hybrid",
        model: "DreamCloud Ultra Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "15 in",
        firmness: "Medium-soft",
        feel: "Indulgent plush support",
        badge: "Top Tier",
        bestFor: ["Side sleepers", "Cooling comfort", "Pressure relief"],
        keyFeatures: ["Five-zone support", "4 in euro top", "Advanced cooling"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/dreamcloud/dreamcloud-rest-3.webp",
        gallery: [
          "/product-assets/dreamcloud/dreamcloud-rest-3.webp",
          "/product-assets/dreamcloud/dreamcloud-rest-1.webp",
        ],
        availability: "Call for current DreamCloud availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,369",
          label: "Starting price",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudUltraHybrid,
        }),
        priceVariants: dreamcloudVariantPrices.ultraHybrid,
      },
      {
        id: "dreamcloud-ultra-memory-foam",
        model: "DreamCloud Ultra Memory Foam",
        category: "Mattress",
        type: "Memory foam",
        height: "15 in",
        firmness: "Medium",
        feel: "Deep contour",
        badge: "Top Tier",
        bestFor: ["Premium foam comfort", "Cooling comfort", "Pressure relief"],
        keyFeatures: ["Five-zone support", "4 in euro top", "Phase-change cooling"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/dreamcloud/dreamcloud-premier-3.webp",
        gallery: [
          "/product-assets/dreamcloud/dreamcloud-premier-3.webp",
          "/product-assets/dreamcloud/dreamcloud-rest-2.webp",
        ],
        availability: "Call for current DreamCloud availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$2,199",
          label: "Queen price",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudUltraFoam,
        }),
        priceVariants: dreamcloudVariantPrices.ultraFoam,
      },
      {
        id: "dreamcloud-pressuresmart",
        model: "DreamCloud PressureSmart",
        category: "Mattress",
        type: "Specialty",
        firmness: "Ask in store",
        feel: "Targeted comfort",
        badge: "New",
        bestFor: ["Pressure relief", "Back support", "In-store comparison"],
        keyFeatures: ["Pressure relief", "DreamCloud comfort", "Showroom guidance"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/dreamcloud/dreamcloud-rest-3.webp",
        availability: "Call to confirm local availability.",
        onlinePrice: officialOnlinePrice({
          amount: "Call",
          label: "Current pricing",
          sourceName: "DreamCloud",
          sourceUrl: priceSources.dreamcloudPressureSmart,
        }),
      },
    ],
  }),
  withBrandAssets({
    id: "nectar",
    name: "Nectar",
    status: "primary",
    tagline: "Award-winning memory foam and hybrid mattresses from Classic to Ultra.",
    description:
      "Nectar is easy to compare: Classic, Premier, Luxe, and Ultra each step up cooling, pressure relief, and support in foam or hybrid builds.",
    showroomNote:
      "Best for shoppers who want a proven online brand with clear comfort upgrades and local showroom help.",
    collectionHighlights: ["Memory foam and hybrid", "Classic to Ultra", "365-night trial"],
    products: [
      {
        id: "nectar-classic",
        model: "Nectar Classic Memory Foam",
        category: "Mattress",
        type: "Memory foam",
        height: "12 in",
        firmness: "Medium-firm",
        feel: "Supportive contour",
        badge: "Value",
        bestFor: ["Back sleepers", "Stomach sleepers", "Value shoppers"],
        keyFeatures: ["Gel memory foam", "Quilted cooling cover", "Breathable support core"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/nectar/nectar-classic-1.webp",
        gallery: [
          "/product-assets/nectar/nectar-classic-1.webp",
          "/product-assets/nectar/nectar-classic-3.webp",
        ],
        availability: "Call for current Nectar specials.",
        onlinePrice: officialOnlinePrice({
          amount: "$369",
          label: "Starting price",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarClassic,
        }),
        priceVariants: nectarVariantPrices.classic,
      },
      {
        id: "nectar-classic-hybrid",
        model: "Nectar Classic Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "12 in",
        firmness: "Medium-firm",
        feel: "Responsive support",
        badge: "Hybrid value",
        bestFor: ["Combination sleepers", "Couples", "Edge support"],
        keyFeatures: ["Memory foam comfort", "Individually wrapped coils", "Breathable airflow"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/nectar/nectar-classic-1.webp",
        gallery: [
          "/product-assets/nectar/nectar-classic-1.webp",
          "/product-assets/nectar/nectar-classic-3.webp",
          "/brand-assets/nectar/feature-01.jpg",
        ],
        availability: "Call for current Nectar Hybrid availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$349",
          label: "Starting price",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarClassicHybrid,
        }),
        priceVariants: nectarVariantPrices.classicHybrid,
      },
      {
        id: "nectar-premier",
        model: "Nectar Premier Memory Foam",
        category: "Mattress",
        type: "Memory foam",
        height: "13 in",
        firmness: "Medium",
        feel: "Cool contouring",
        bestFor: ["Side sleepers", "Combination sleepers", "Cooling upgrade shoppers"],
        keyFeatures: ["Extra cooling fibers", "Phase change material", "Enhanced pressure relief"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/nectar/nectar-premier-1.webp",
        gallery: [
          "/product-assets/nectar/nectar-premier-1.webp",
          "/product-assets/nectar/nectar-premier-2.webp",
          "/product-assets/nectar/nectar-premier-3.webp",
        ],
        availability: "A strong upgrade to compare against Classic.",
        onlinePrice: officialOnlinePrice({
          amount: "$549",
          label: "Starting price",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarPremier,
        }),
        priceVariants: nectarVariantPrices.premier,
      },
      {
        id: "nectar-premier-hybrid",
        model: "Nectar Premier Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "13 in",
        firmness: "Medium",
        feel: "Cool hybrid contour",
        badge: "Best seller",
        bestFor: ["Couples", "Side sleepers", "Cooling upgrade shoppers"],
        keyFeatures: ["More cooling fibers", "Extra memory foam", "Hybrid support"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/nectar/nectar-premier-1.webp",
        gallery: [
          "/product-assets/nectar/nectar-premier-1.webp",
          "/product-assets/nectar/nectar-premier-2.webp",
          "/brand-assets/nectar/feature-02.jpg",
        ],
        availability: "Call for current Premier Hybrid availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$799",
          label: "Starting price",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarPremierHybrid,
        }),
        priceVariants: nectarVariantPrices.premierHybrid,
      },
      {
        id: "nectar-luxe-memory-foam",
        model: "Nectar Luxe Memory Foam",
        category: "Mattress",
        type: "Memory foam",
        height: "14 in",
        firmness: "Medium",
        feel: "Premium cooling foam",
        badge: "Luxe",
        bestFor: ["Hot sleepers", "Side sleepers", "Premium foam shoppers"],
        keyFeatures: ["More cooling fibers", "Pressure relief", "Premium quilted feel"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/nectar/nectar-copper-1.webp",
        gallery: [
          "/product-assets/nectar/nectar-copper-1.webp",
          "/product-assets/nectar/nectar-copper-2.webp",
          "/product-assets/nectar/nectar-copper-3.webp",
        ],
        availability: "Call for current Luxe model availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$999",
          label: "Starting price",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarLuxe,
        }),
        priceVariants: nectarVariantPrices.luxe,
      },
      {
        id: "nectar-luxe-hybrid",
        model: "Nectar Luxe Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "14 in",
        firmness: "Medium",
        feel: "Cool, supportive lift",
        badge: "Cooling",
        bestFor: ["Hot sleepers", "Couples", "Premium hybrid shoppers"],
        keyFeatures: ["Enhanced cooling", "Pressure relief", "Individually wrapped coils"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/nectar/nectar-copper-2.webp",
        gallery: [
          "/product-assets/nectar/nectar-copper-2.webp",
          "/product-assets/nectar/nectar-copper-3.webp",
          "/brand-assets/nectar/feature-03.jpg",
        ],
        availability: "Call for current Luxe Hybrid availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,099",
          label: "Starting price",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarLuxeHybrid,
        }),
        priceVariants: nectarVariantPrices.luxeHybrid,
      },
      {
        id: "nectar-ultra-memory-foam",
        model: "Nectar Ultra Memory Foam",
        category: "Mattress",
        type: "Memory foam",
        height: "15 in",
        firmness: "Medium-soft",
        feel: "Deep pressure relief",
        badge: "Top Tier",
        bestFor: ["Side sleepers", "Pressure relief", "Maximum cooling"],
        keyFeatures: ["Zoned ergonomic support", "More contouring foam", "Phase-change cooling"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/brand-assets/nectar/ultra-product.webp",
        gallery: [
          "/brand-assets/nectar/ultra-product.webp",
          "/brand-assets/nectar/feature-04.jpg",
          "/product-assets/nectar/nectar-copper-3.webp",
        ],
        availability: "Call for current Ultra availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,799",
          label: "Queen price",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarUltra,
        }),
        priceVariants: nectarVariantPrices.ultra,
      },
      {
        id: "nectar-ultra-hybrid",
        model: "Nectar Ultra Hybrid",
        category: "Mattress",
        type: "Hybrid",
        height: "15 in",
        firmness: "Medium-soft",
        feel: "Plush cooling support",
        badge: "Top Tier",
        bestFor: ["Premium hybrid shoppers", "Side sleepers", "Cooling comfort"],
        keyFeatures: ["Zoned ergonomic support", "Advanced cooling", "Hybrid lift"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/brand-assets/nectar/ultra-product.webp",
        gallery: [
          "/brand-assets/nectar/ultra-product.webp",
          "/product-assets/nectar/nectar-premier-3.webp",
          "/brand-assets/nectar/feature-04.jpg",
        ],
        availability: "Call for current Ultra Hybrid availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,599",
          label: "Starting price",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarUltraHybrid,
        }),
        priceVariants: nectarVariantPrices.ultraHybrid,
      },
      {
        id: "nectar-kids",
        model: "Nectar Kids Mattress",
        category: "Mattress",
        type: "Kids mattress",
        firmness: "Medium-firm",
        feel: "Supportive kids comfort",
        bestFor: ["Kids rooms", "Guest rooms", "Growing sleepers"],
        keyFeatures: ["Kid-friendly comfort", "Supportive feel", "Nectar warranty program"],
        trial: "365 nights",
        warranty: "Forever",
        image: "/product-assets/nectar/nectar-classic-3.webp",
        availability: "Call to confirm Nectar Kids availability.",
        onlinePrice: officialOnlinePrice({
          amount: "Call",
          label: "Current pricing",
          sourceName: "Nectar",
          sourceUrl: priceSources.nectarKids,
        }),
      },
    ],
  }),
  withBrandAssets({
    id: "bedgear",
    name: "Bedgear",
    status: "primary",
    tagline: "Performance sleep systems built around airflow, fit, and recovery.",
    description:
      "Bedgear is built for people who want a cooler, cleaner, more personalized sleep system. The modular M-Series mattresses let each side of the bed choose its own comfort, while breathable fabrics and washable covers help the mattress stay fresh.",
    showroomNote:
      "Visit the showroom to compare M3 and M5 comfort levels, feel the cooling covers, and build the right mattress-and-pillow setup.",
    collectionHighlights: ["Modular comfort", "Cooling airflow", "Washable covers"],
    products: [
      {
        id: "bedgear-m3",
        model: "BEDGEAR M3 Performance Mattress",
        category: "Mattress",
        type: "Modular hybrid",
        height: "12 in",
        firmness: "Multiple options",
        feel: "Personalized, breathable support",
        badge: "Modular",
        bestFor: ["Couples", "Different comfort needs", "Hot sleepers"],
        keyFeatures: [
          "Interchangeable firmness units for each side",
          "Ver-Tex cooling cover and Air-X side panels",
          "Removable, washable top cover",
        ],
        warranty: "10 years",
        image: "/brand-assets/bedgear/m3-product.png",
        gallery: [
          "/brand-assets/bedgear/m3-product.png",
          "/brand-assets/bedgear/wide-detail.jpg",
          "/brand-assets/bedgear/hero.jpg",
        ],
        availability: "Call or visit to compare M3 firmness options in the showroom.",
        onlinePrice: officialOnlinePrice({
          amount: "$2,999.99",
          label: "Queen price",
          sourceName: "BEDGEAR",
          sourceUrl: priceSources.bedgearM3,
        }),
      },
      {
        id: "bedgear-m5",
        model: "BEDGEAR M5 Performance Mattress",
        category: "Mattress",
        type: "Modular hybrid",
        height: "14 in",
        firmness: "Multiple options",
        feel: "Advanced cooling and adaptive support",
        badge: "Premium",
        bestFor: ["Premium cooling", "Couples", "Pressure relief"],
        keyFeatures: [
          "Enhanced React comfort layer",
          "Interchangeable Independent Suspension units",
          "Ver-Tex cooling cover with Air-X airflow",
        ],
        warranty: "10 years",
        image: "/brand-assets/bedgear/wide-detail.jpg",
        gallery: [
          "/brand-assets/bedgear/wide-detail.jpg",
          "/brand-assets/bedgear/m3-product.png",
          "/brand-assets/bedgear/hero.jpg",
        ],
        availability: "Call or visit to compare M5 with the M3 and confirm current stock.",
        onlinePrice: officialOnlinePrice({
          amount: "$3,999.99",
          label: "Queen price",
          sourceName: "BEDGEAR",
          sourceUrl: priceSources.bedgearM5,
        }),
      },
      {
        id: "bedgear-storm",
        model: "Storm Performance Pillow",
        category: "Pillow",
        type: "Performance pillow",
        firmness: "Multiple heights",
        feel: "Instant cooling",
        badge: "Cooling",
        bestFor: ["Hot sleepers", "Side sleepers", "Pillow fitting"],
        keyFeatures: ["Cooling cover", "React foam crown", "Breathable build"],
        warranty: "1 year",
        image: "/product-assets/bedgear/bedgear-storm-1.jpg",
        gallery: [
          "/product-assets/bedgear/bedgear-storm-1.jpg",
          "/product-assets/bedgear/bedgear-storm-2.jpg",
          "/product-assets/bedgear/bedgear-storm-3.jpg",
        ],
        availability: "Try pillow heights in store.",
        onlinePrice: officialOnlinePrice({
          amount: "$199.99",
          label: "Official online pillow price",
          sourceName: "BEDGEAR",
          sourceUrl: priceSources.bedgearStorm,
        }),
      },
      {
        id: "bedgear-balance",
        model: "Balance Performance Pillow",
        category: "Pillow",
        type: "Performance pillow",
        firmness: "Multiple heights",
        feel: "Moisture-wicking comfort",
        bestFor: ["Back sleepers", "Side sleepers", "Breathable comfort"],
        keyFeatures: ["Moisture-wicking cover", "Hypoallergenic fill", "Curved support"],
        warranty: "1 year",
        image: "/product-assets/bedgear/bedgear-balance-1.jpg",
        gallery: [
          "/product-assets/bedgear/bedgear-balance-1.jpg",
          "/product-assets/bedgear/bedgear-balance-2.jpg",
          "/product-assets/bedgear/bedgear-balance-3.jpg",
        ],
        availability: "Ask for pillow fitting help.",
        onlinePrice: officialOnlinePrice({
          amount: "$99.99",
          label: "Official online pillow price",
          sourceName: "BEDGEAR",
          sourceUrl: priceSources.bedgearBalance,
        }),
      },
      {
        id: "bedgear-dri-tec",
        model: "Dri-Tec Mattress Protector",
        category: "Protector",
        type: "Waterproof protector",
        feel: "Cool, quiet protection",
        bestFor: ["Mattress protection", "Families", "Hot sleepers"],
        keyFeatures: ["Waterproof barrier", "Breathable surface", "Machine washable"],
        warranty: "1 year",
        image: "/product-assets/bedgear/bedgear-dritec-1.jpg",
        gallery: [
          "/product-assets/bedgear/bedgear-dritec-1.jpg",
          "/product-assets/bedgear/bedgear-dritec-2.jpg",
          "/product-assets/bedgear/bedgear-dritec-3.jpg",
        ],
        availability: "Available with most mattress purchases.",
        onlinePrice: officialOnlinePrice({
          amount: "$159.99",
          label: "Official online queen protector price",
          sourceName: "BEDGEAR",
          sourceUrl: priceSources.bedgearDriTec,
        }),
      },
    ],
  }),
  withBrandAssets({
    id: "naturepedic",
    name: "Naturepedic",
    status: "primary",
    tagline: "Organic materials with customizable comfort.",
    description:
      "Naturepedic is the organic-focused collection for shoppers who care about natural materials and adjustable comfort.",
    showroomNote:
      "Best for families, organic-material shoppers, and anyone sensitive to conventional mattress materials.",
    collectionHighlights: ["Organic cotton and wool", "Latex comfort", "Customizable EOS"],
    products: [
      {
        id: "naturepedic-eos",
        model: "EOS Classic",
        category: "Mattress",
        type: "Organic hybrid",
        height: "12 in",
        firmness: "Customizable",
        feel: "Natural latex lift",
        badge: "Organic",
        bestFor: ["Organic shoppers", "Couples", "Custom firmness"],
        keyFeatures: ["Organic cotton", "Wool fire barrier", "Latex and coil support"],
        trial: "Ask in store",
        warranty: "20 years",
        image: "/product-assets/naturepedic/naturepedic-eos-1.jpg",
        gallery: [
          "/product-assets/naturepedic/naturepedic-eos-1.jpg",
          "/product-assets/naturepedic/naturepedic-eos-2.jpg",
          "/product-assets/naturepedic/naturepedic-eos-3.jpg",
        ],
        availability: "Ask which EOS configurations are on display.",
        onlinePrice: officialOnlinePrice({
          amount: "$3,799",
          sourceName: "Naturepedic",
          sourceUrl: priceSources.naturepedicEos,
        }),
      },
      {
        id: "naturepedic-eos-trilux",
        model: "EOS Trilux",
        category: "Mattress",
        type: "Organic latex",
        height: "12 in",
        firmness: "Customizable",
        feel: "Layered latex",
        bestFor: ["Latex lovers", "Firmness tuning", "Organic comfort"],
        keyFeatures: ["Three latex layers", "Organic cover", "Split comfort options"],
        trial: "Ask in store",
        warranty: "20 years",
        image: "/brand-assets/naturepedic/eos-detail.webp",
        availability: "Call for current EOS Trilux availability.",
        onlinePrice: officialOnlinePrice({
          amount: "$4,399",
          sourceName: "Naturepedic",
          sourceUrl: priceSources.naturepedicEos,
        }),
      },
      {
        id: "naturepedic-chorus",
        model: "Chorus",
        category: "Mattress",
        type: "Organic hybrid",
        height: "10 in",
        firmness: "Medium",
        feel: "Easy organic comfort",
        bestFor: ["Organic value", "Guest rooms", "Kids and teens"],
        keyFeatures: ["Organic cotton cover", "Breathable design", "Supportive coil unit"],
        trial: "Ask in store",
        warranty: "20 years",
        image: "/product-assets/naturepedic/naturepedic-chorus-1.jpg",
        gallery: [
          "/product-assets/naturepedic/naturepedic-chorus-1.jpg",
          "/product-assets/naturepedic/naturepedic-chorus-2.jpg",
          "/product-assets/naturepedic/naturepedic-chorus-3.jpg",
        ],
        availability: "Ask the team to compare Chorus and EOS.",
      },
    ],
  }),
  withBrandAssets({
    id: "posh-and-lavish",
    name: "Posh and Lavish",
    status: "primary",
    tagline: "Boutique luxury mattresses made to be experienced in person.",
    description:
      "Posh and Lavish is the kind of premium mattress brand that makes more sense in the showroom: feel the materials, compare the support, and let the team guide the right fit.",
    showroomNote:
      "Visit the showroom to experience Posh and Lavish comfort in person and confirm the current floor models.",
    collectionHighlights: ["Showroom-only guidance", "Premium materials", "Luxury comfort"],
    products: [
      {
        id: "posh-and-lavish-showroom",
        model: "Explore Posh and Lavish in Store",
        category: "Mattress",
        type: "Luxury mattress collection",
        firmness: "Multiple comfort options",
        feel: "Premium, responsive comfort",
        badge: "Luxury",
        bestFor: ["Luxury shoppers", "In-store comfort testing", "Premium bedrooms"],
        keyFeatures: [
          "Experience the materials in person",
          "Compare comfort levels with local guidance",
          "Confirm current showroom availability",
        ],
        warranty: "Ask in store",
        image: "/brand-assets/posh-and-lavish/official-hero.avif",
        gallery: [
          "/brand-assets/posh-and-lavish/official-hero.avif",
          "/brand-assets/posh-and-lavish/dm-product.webp",
          "/brand-assets/posh-and-lavish/providence-detail.png",
          "/brand-assets/posh-and-lavish/official-craftsmanship.jpg",
        ],
        availability:
          "Posh and Lavish is best shopped in person. Call or visit Discount Mattress to see what is currently on the floor.",
      },
    ],
  }),
  withBrandAssets({
    id: "pranasleep",
    name: "PranaSleep",
    status: "primary",
    tagline: "Latex luxury with deep, restorative comfort.",
    description:
      "PranaSleep focuses on natural-feel latex comfort, supportive cores, and premium model lines like Karma.",
    showroomNote:
      "Best for shoppers who want to step above commodity mattresses into a more restorative luxury feel.",
    collectionHighlights: ["Karma collection", "Talalay latex feel", "Luxury comfort"],
    products: [
      {
        id: "pranasleep-karma-elite",
        model: "Karma Elite Hybrid",
        category: "Mattress",
        type: "Latex hybrid",
        firmness: "Multiple options",
        feel: "Supportive latex luxury",
        badge: "Showroom favorite",
        bestFor: ["Luxury shoppers", "Latex feel", "Pressure relief"],
        keyFeatures: ["Latex comfort", "Hybrid support", "Premium quilt package"],
        warranty: "Ask in store",
        image: "/brand-assets/pranasleep/karma-elite.webp",
        gallery: [
          "/brand-assets/pranasleep/karma-elite.webp",
          "/brand-assets/pranasleep/product-01.avif",
          "/brand-assets/pranasleep/product-02.avif",
        ],
        availability: "Ask which Karma comfort levels are on display.",
      },
      {
        id: "pranasleep-karma-classic",
        model: "Karma Classic",
        category: "Mattress",
        type: "Latex hybrid",
        firmness: "Multiple options",
        feel: "Balanced luxury",
        bestFor: ["Back sleepers", "Couples", "Premium value"],
        keyFeatures: ["Responsive comfort", "Durable support core", "Luxury cover feel"],
        warranty: "Ask in store",
        image: "/brand-assets/pranasleep/product-01.avif",
        availability: "Call for current Karma model details.",
      },
    ],
  }),
  withBrandAssets({
    id: "bedtech",
    name: "BedTech",
    status: "primary",
    tagline: "Adjustable bases and sleep technology upgrades.",
    description:
      "BedTech helps turn the mattress into a complete sleep system with adjustable bases and support accessories.",
    showroomNote:
      "Best for shoppers who want head and foot elevation, easier TV reading, or a more complete sleep setup.",
    collectionHighlights: ["Adjustable bases", "Head and foot lift", "Lifestyle comfort"],
    products: [
      {
        id: "bedtech-btx4",
        model: "BTX4 Adjustable Base",
        category: "Adjustable base",
        type: "Adjustable base",
        firmness: "Powered support",
        feel: "Lifestyle upgrade",
        badge: "Adjustable",
        bestFor: ["Head elevation", "Reading in bed", "Base upgrades"],
        keyFeatures: ["Wireless control", "Head and foot articulation", "Modern base profile"],
        warranty: "Ask in store",
        image: "/brand-assets/bedtech/official-hero-bases.jpg",
        gallery: [
          "/brand-assets/bedtech/official-hero-bases.jpg",
          "/brand-assets/bedtech/bt3000.webp",
          "/brand-assets/bedtech/btx4.webp",
        ],
        availability: "Call for current base sizes and stock.",
      },
      {
        id: "bedtech-bt2000",
        model: "BT2000 Adjustable Base",
        category: "Adjustable base",
        type: "Adjustable base",
        feel: "Everyday adjustability",
        bestFor: ["Entry adjustable base", "Guest rooms", "Simple elevation"],
        keyFeatures: ["Head lift", "Remote control", "Easy mattress pairing"],
        warranty: "Ask in store",
        image: "/brand-assets/bedtech/bt2000.webp",
        availability: "Ask what sizes are in stock.",
      },
      {
        id: "bedtech-bt3000",
        model: "BT3000 Adjustable Base",
        category: "Adjustable base",
        type: "Adjustable base",
        feel: "Comfort upgrade",
        bestFor: ["Couples", "Lifestyle comfort", "Base upgrade shoppers"],
        keyFeatures: ["Head and foot articulation", "Preset positions", "Quiet operation"],
        warranty: "Ask in store",
        image: "/brand-assets/bedtech/bt3000.webp",
        availability: "Compare base features in the showroom.",
      },
      {
        id: "bedtech-bt6500",
        model: "BT6500 Adjustable Base",
        category: "Adjustable base",
        type: "Adjustable base",
        feel: "Premium adjustability",
        bestFor: ["Premium bases", "Feature shoppers", "Primary bedrooms"],
        keyFeatures: ["Advanced positioning", "Comfort presets", "Premium support system"],
        warranty: "Ask in store",
        image: "/brand-assets/bedtech/bt6500.webp",
        availability: "Call for current BT6500 availability.",
      },
    ],
  }),
  withBrandAssets({
    id: "serenity-sleep",
    name: "Serenity Sleep",
    status: "secondary",
    tagline: "Regional comfort options with showroom-friendly value.",
    description:
      "Serenity Sleep adds local-market mattress choices that are easy to compare in person.",
    showroomNote:
      "Best for value-minded shoppers who want to test multiple comfort levels side by side.",
    collectionHighlights: ["Plush and euro top options", "Hybrid support", "Value comfort"],
    products: [
      {
        id: "serenity-alpine-plush",
        model: "Alpine Plush",
        category: "Mattress",
        type: "Hybrid",
        firmness: "Plush",
        feel: "Soft comfort",
        bestFor: ["Side sleepers", "Plush shoppers", "Pressure relief"],
        keyFeatures: ["Plush comfort top", "Supportive coil unit", "Comfortable value"],
        warranty: "Ask in store",
        image: "/brand-assets/serenity-sleep/alpine-plush.png",
        availability: "Confirm current Serenity Sleep floor models.",
      },
      {
        id: "serenity-andes-euro-top",
        model: "Andes Euro Top",
        category: "Mattress",
        type: "Euro top",
        firmness: "Medium",
        feel: "Cushioned support",
        bestFor: ["Couples", "Guest rooms", "Medium comfort"],
        keyFeatures: ["Euro top feel", "Balanced support", "Approachable price tier"],
        warranty: "Ask in store",
        image: "/brand-assets/serenity-sleep/andes-euro-top.png",
        availability: "Ask about Serenity Sleep model selection.",
      },
      {
        id: "serenity-sonora-hybrid",
        model: "Sonora Hybrid",
        category: "Mattress",
        type: "Hybrid",
        firmness: "Medium-firm",
        feel: "Supportive hybrid",
        bestFor: ["Back sleepers", "Value hybrid shoppers", "Support seekers"],
        keyFeatures: ["Hybrid construction", "Cushioned top", "Stable support"],
        warranty: "Ask in store",
        image: "/brand-assets/serenity-sleep/sonora-hybrid.png",
        availability: "Call for current availability.",
      },
    ],
  }),
  withBrandAssets({
    id: "jamison",
    name: "Jamison",
    status: "secondary",
    tagline: "Hotel-inspired bedding heritage.",
    description:
      "Jamison brings hospitality-style comfort and traditional mattress construction into the catalog.",
    showroomNote:
      "Best for shoppers who like a classic mattress feel with hotel-style familiarity.",
    collectionHighlights: ["Hotel feel", "Classic support", "Comfort heritage"],
    products: [
      {
        id: "jamison-resort-hotel",
        model: "Resort Hotel Collection",
        category: "Mattress",
        type: "Innerspring",
        firmness: "Medium",
        feel: "Hotel-style comfort",
        bestFor: ["Guest rooms", "Traditional feel", "Hospitality comfort"],
        keyFeatures: ["Classic support", "Comfort top", "Hotel mattress feel"],
        warranty: "Ask in store",
        image: "/brand-assets/jamison/hotel-bed.png",
        availability: "Exact model list should be confirmed with the store.",
      },
      {
        id: "jamison-innerspring",
        model: "Innerspring Comfort",
        category: "Mattress",
        type: "Innerspring",
        firmness: "Medium-firm",
        feel: "Traditional support",
        bestFor: ["Firm support", "Guest rooms", "Value shoppers"],
        keyFeatures: ["Innerspring unit", "Classic mattress profile", "Everyday comfort"],
        warranty: "Ask in store",
        image: "/brand-assets/jamison/innerspring-hotel.png",
        availability: "Call for current Jamison availability.",
      },
    ],
  }),
  withBrandAssets({
    id: "serta",
    name: "Serta",
    status: "secondary",
    tagline: "A familiar national brand with cooling comfort options.",
    description:
      "Serta gives shoppers a trusted name, including iComfort-style cooling and supportive models.",
    showroomNote:
      "Best for shoppers who want a recognized brand and cooling-focused foam or hybrid options.",
    collectionHighlights: ["Cooling foam", "National brand", "Supportive comfort"],
    products: [
      {
        id: "serta-icomfort-blue",
        model: "iComfort Blue",
        category: "Mattress",
        type: "Memory foam",
        height: "12 in",
        firmness: "Medium",
        feel: "Cooling foam",
        badge: "Cooling",
        bestFor: ["Hot sleepers", "Foam shoppers", "Back sleepers"],
        keyFeatures: ["Cooling foam", "Memory foam comfort", "Supportive base"],
        trial: "Ask in store",
        warranty: "10 years",
        image: "/product-assets/serta/serta-icomfort-1.jpg",
        gallery: [
          "/product-assets/serta/serta-icomfort-1.jpg",
          "/product-assets/serta/serta-icomfort-2.jpg",
          "/product-assets/serta/serta-icomfort-3.jpg",
        ],
        availability: "Ask for current Serta and iComfort floor models.",
        onlinePrice: officialOnlinePrice({
          amount: "$1,199",
          label: "Official online selected price",
          sourceName: "Serta",
          sourceUrl: priceSources.sertaIcomfort,
        }),
      },
      {
        id: "serta-icomfort-hybrid",
        model: "iComfort Hybrid",
        category: "Mattress",
        type: "Cooling hybrid",
        firmness: "Medium",
        feel: "Cool lift",
        bestFor: ["Couples", "Hot sleepers", "Hybrid shoppers"],
        keyFeatures: ["Cooling surface", "Coil support", "Foam comfort layers"],
        warranty: "10 years",
        image: "/brand-assets/serta/icomfort-preview.jpg",
        availability: "Call for current Serta model details.",
      },
    ],
  }),
  withBrandAssets({
    id: "corsicana",
    name: "Corsicana",
    status: "ask-in-store",
    tagline: "Value-focused mattress options.",
    description:
      "Corsicana appears in the broader catalog history and should be treated as an ask-in-store line until the current floor set is confirmed.",
    showroomNote:
      "Best as a value or special-order conversation if the store confirms availability.",
    collectionHighlights: ["Value line", "Traditional comfort", "Confirm availability"],
    products: [
      {
        id: "corsicana-value-hybrid",
        model: "Value Hybrid Collection",
        category: "Mattress",
        type: "Hybrid",
        firmness: "Multiple options",
        feel: "Everyday support",
        bestFor: ["Budget shoppers", "Guest rooms", "Traditional comfort"],
        keyFeatures: ["Hybrid support", "Accessible price tier", "Multiple comfort options"],
        warranty: "Ask in store",
        image: "/brand-assets/corsicana/hero.png",
        availability: "Ask the store whether Corsicana is currently carried.",
      },
    ],
  }),
  withBrandAssets({
    id: "malouf",
    name: "Malouf",
    status: "ask-in-store",
    tagline: "Accessories, bedding, pillows, and protectors.",
    description:
      "Malouf appears as an accessory brand candidate for pillows, protectors, and bedding pieces.",
    showroomNote:
      "Best for add-ons if the current accessory assortment is confirmed.",
    collectionHighlights: ["Pillows", "Protectors", "Bedding"],
    products: [
      {
        id: "malouf-cooling-pillow",
        model: "Cooling Pillow Collection",
        category: "Pillow",
        type: "Accessory",
        feel: "Cool support",
        bestFor: ["Hot sleepers", "Pillow upgrades", "Accessory bundles"],
        keyFeatures: ["Cooling fabric", "Supportive feel", "Bedroom add-on"],
        warranty: "Ask in store",
        image: "/brand-assets/malouf/cooling-pillows.jpg",
        availability: "Ask the team which Malouf accessories are stocked.",
      },
      {
        id: "malouf-protector",
        model: "Mattress Protector Collection",
        category: "Protector",
        type: "Accessory",
        feel: "Quiet protection",
        bestFor: ["Mattress protection", "Families", "Accessory bundles"],
        keyFeatures: ["Protective surface", "Easy bedding add-on", "Clean comfort"],
        warranty: "Ask in store",
        image: "/brand-assets/malouf/protector.jpg",
        availability: "Call for current accessory selection.",
      },
    ],
  }),
  withBrandAssets({
    id: "icomfort",
    name: "iComfort by Serta",
    status: "ask-in-store",
    tagline: "Cooling-focused Serta comfort collection.",
    description:
      "iComfort is best handled as a Serta collection page when the exact current models are confirmed.",
    showroomNote:
      "Best for shoppers asking specifically for Serta cooling foam and hybrid models.",
    collectionHighlights: ["Cooling foam", "Plush to firm", "Serta collection"],
    products: [
      {
        id: "icomfort-medium",
        model: "iComfort Medium",
        category: "Mattress",
        type: "Memory foam",
        firmness: "Medium",
        feel: "Cooling contour",
        bestFor: ["Hot sleepers", "Foam shoppers", "Back sleepers"],
        keyFeatures: ["Cooling comfort", "Memory foam contour", "Supportive base"],
        warranty: "Ask in store",
        image: "/brand-assets/icomfort/hero-medium.jpg",
        availability: "Ask which iComfort models are currently carried.",
      },
      {
        id: "icomfort-firm",
        model: "iComfort Firm",
        category: "Mattress",
        type: "Memory foam",
        firmness: "Firm",
        feel: "Cool firm support",
        bestFor: ["Back sleepers", "Stomach sleepers", "Firm mattress shoppers"],
        keyFeatures: ["Firm support", "Cooling foam", "Stable comfort"],
        warranty: "Ask in store",
        image: "/brand-assets/icomfort/hero-firm.jpg",
        availability: "Call for current iComfort availability.",
      },
    ],
  }),
  withBrandAssets({
    id: "serta-sleep-retreat",
    name: "Serta Sleep Retreat",
    status: "ask-in-store",
    tagline: "Older Serta collection candidate to confirm in store.",
    description:
      "Sleep Retreat appears in the sourced asset set as a Serta-related collection and should be listed carefully until availability is confirmed.",
    showroomNote:
      "Best as an ask-in-store collection if a shopper is looking for specific older Serta models.",
    collectionHighlights: ["Serta collection", "Confirm availability", "Value options"],
    products: [
      {
        id: "sleep-retreat-sugar-beach",
        model: "Sugar Beach",
        category: "Mattress",
        type: "Innerspring",
        firmness: "Medium",
        feel: "Classic comfort",
        bestFor: ["Traditional shoppers", "Guest rooms", "Value comfort"],
        keyFeatures: ["Classic profile", "Comfort top", "Serta-related collection"],
        warranty: "Ask in store",
        image: "/brand-assets/serta-sleep-retreat/sugar-beach-01.jpg",
        availability: "Ask the store before publishing as currently available.",
      },
      {
        id: "sleep-retreat-pearl-beach",
        model: "Pearl Beach",
        category: "Mattress",
        type: "Innerspring",
        firmness: "Medium",
        feel: "Traditional support",
        bestFor: ["Guest rooms", "Budget shoppers", "Classic support"],
        keyFeatures: ["Supportive build", "Classic Serta styling", "Comfort top"],
        warranty: "Ask in store",
        image: "/brand-assets/serta-sleep-retreat/pearl-beach.jpg",
        availability: "Confirm availability with the showroom.",
      },
    ],
  }),
];

export const products = brands.flatMap((brand) => brand.products);

export const featuredBrands = brands.filter((brand) => brand.status === "primary");

export const featuredProducts = [
  "helix-midnight",
  "puffy-monarch",
  "dreamcloud-premier",
  "nectar-premier",
  "naturepedic-eos",
  "bedtech-btx4",
].map((id) => products.find((product) => product.id === id)!);

export const sleepSystemAddOns = [
  "bedtech-btx4",
  "bedtech-bt3000",
  "bedgear-storm",
  "bedgear-balance",
].map((id) => products.find((product) => product.id === id)!);

export const productCategories = [
  "Mattress",
  "Adjustable base",
  "Pillow",
  "Protector",
  "Bedding",
] as const satisfies readonly ProductCategory[];

export function getBrandById(id: string) {
  return brands.find((brand) => brand.id === id);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export const storeInfo = {
  name: "Discount Mattress",
  tagline: "Sleep Better for Less in Bowling Green",
  primaryPhone: "(270) 495-1603",
  primaryPhoneHref: "tel:2704951603",
  outletPhone: "(270) 842-3888",
  outletPhoneHref: "tel:2708423888",
  email: "bgmattress@yahoo.com",
  locations: [
    {
      name: "Discount Mattress",
      address: "1555 Campbell Ln",
      city: "Bowling Green",
      state: "KY",
      zip: "42104",
      phone: "(270) 495-1603",
      phoneHref: "tel:2704951603",
      hours: "Mon-Sat: 10:00 AM-6:00 PM",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=1555%20Campbell%20Ln%20Bowling%20Green%20KY%2042104",
      note: "Main showroom with premium brand comparisons.",
    },
    {
      name: "Discount Mattress Outlet",
      address: "2734 Russellville Rd",
      city: "Bowling Green",
      state: "KY",
      zip: "42101",
      phone: "(270) 842-3888",
      phoneHref: "tel:2708423888",
      hours: "Mon-Sat: 9:00 AM-5:30 PM; Sun: 12:00 PM-5:00 PM",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=2734%20Russellville%20Rd%20Bowling%20Green%20KY%2042101",
      note: "Outlet location for value finds and fast local help.",
    },
  ],
};

export const faqItems = [
  {
    question: "Can I buy online?",
    answer:
      "This site is built for local shopping. Call or visit either Bowling Green showroom for current pricing, floor models, and delivery options.",
  },
  {
    question: "Do you show prices?",
    answer:
      "The site shows available prices by size for many models. Local Discount Mattress pricing, size availability, and promotions should still be confirmed by phone or in the showroom.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Financing is available through store-supported partners. Terms, approvals, and current programs should be confirmed with the store.",
  },
  {
    question: "What is the comfort exchange policy?",
    answer:
      "The public terms say refunds follow store policies. The exact comfort exchange language should be confirmed by Discount Mattress before publishing firm promises.",
  },
  {
    question: "Do warranties come from Discount Mattress or the brand?",
    answer:
      "Warranty coverage varies by brand and model. The product pages summarize known brand programs and direct shoppers to confirm details before purchase.",
  },
];
