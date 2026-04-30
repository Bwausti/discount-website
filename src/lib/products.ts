// Product catalog data for Discount Mattress site
// Prices are MSRP - call for current Discount Mattress pricing

export interface Product {
  id: string;
  brand: string;
  model: string;
  type: 'foam' | 'hybrid' | 'latex' | 'accessory';
  height: string;
  firmness: string;
  firmnessScale?: string;
  bestFor?: string[];
  priceQueen?: number;
  keyFeatures: string[];
  trial: number;
  warranty: string;
  image?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  tagline: string;
  description: string;
  products: Product[];
}

export const brands: Brand[] = [
  {
    id: 'nectar',
    name: 'Nectar',
    tagline: 'Premium Memory Foam at a Fraction of the Cost',
    description: 'Nectar offers premium memory foam quality at a fraction of the cost, backed by a 365-night trial and a Forever Warranty™.',
    products: [
      {
        id: 'nectar-classic',
        brand: 'Nectar',
        model: 'Nectar Classic',
        type: 'foam',
        height: '12"',
        firmness: 'Medium-Firm (6/10)',
        bestFor: ['Back sleepers', 'Stomach sleepers'],
        priceQueen: 799,
        keyFeatures: ['Gel memory foam', 'Quilted cooling cover', 'Breathable airflow'],
        trial: 365,
        warranty: 'Forever'
      },
      {
        id: 'nectar-premier',
        brand: 'Nectar',
        model: 'Nectar Premier',
        type: 'foam',
        height: '13"',
        firmness: 'Medium (5/10)',
        bestFor: ['Side sleepers', 'Combination sleepers'],
        priceQueen: 949,
        keyFeatures: ['60%+ cooling fibers', 'Phase change material', 'Enhanced contouring'],
        trial: 365,
        warranty: 'Forever'
      },
      {
        id: 'nectar-premier-copper',
        brand: 'Nectar',
        model: 'Nectar Premier Copper',
        type: 'foam',
        height: '14"',
        firmness: 'Medium (5/10)',
        bestFor: ['Hot sleepers', 'Side sleepers'],
        priceQueen: 1099,
        keyFeatures: ['Copper-infused foam', 'Maximum cooling', 'Premium quilted top'],
        trial: 365,
        warranty: 'Forever'
      }
    ]
  },
  {
    id: 'helix',
    name: 'Helix',
    tagline: 'Mattresses Designed For Every Body',
    description: 'Custom mattresses tailored to your sleep style. Choose from our range of firmness options.',
    products: [
      {
        id: 'helix-sunset',
        brand: 'Helix',
        model: 'Helix Sunset',
        type: 'hybrid',
        height: '12"',
        firmness: 'Soft (3/10)',
        bestFor: ['Side sleepers'],
        priceQueen: 999,
        keyFeatures: ['Plush feel', 'Pressure relief', 'Balanced support'],
        trial: 100,
        warranty: '10 years'
      },
      {
        id: 'helix-moonlight',
        brand: 'Helix',
        model: 'Helix Moonlight',
        type: 'foam',
        height: '10"',
        firmness: 'Medium-Soft (4/10)',
        bestFor: ['Combination sleepers', 'Light sleepers'],
        priceQueen: 749,
        keyFeatures: ['Memory foam', 'Cooling cover', 'Lightweight'],
        trial: 100,
        warranty: '10 years'
      },
      {
        id: 'helix-midnight',
        brand: 'Helix',
        model: 'Helix Midnight',
        type: 'hybrid',
        height: '11.5"',
        firmness: 'Medium (6/10)',
        bestFor: ['All positions', 'Side sleepers'],
        priceQueen: 999,
        keyFeatures: ['Medium feel', 'Best seller', 'Zoned lumbar support'],
        trial: 100,
        warranty: '10 years'
      },
      {
        id: 'helix-dusk',
        brand: 'Helix',
        model: 'Helix Dusk',
        type: 'hybrid',
        height: '12"',
        firmness: 'Medium-Firm (6/10)',
        bestFor: ['Back sleepers', 'Stomach sleepers'],
        priceQueen: 999,
        keyFeatures: ['Extra support', 'Durable edges', 'Responsive feel'],
        trial: 100,
        warranty: '10 years'
      },
      {
        id: 'helix-dawn',
        brand: 'Helix',
        model: 'Helix Dawn',
        type: 'hybrid',
        height: '12"',
        firmness: 'Firm (8/10)',
        bestFor: ['Back sleepers', 'Stomach sleepers'],
        priceQueen: 999,
        keyFeatures: ['Firm support', 'Minimal sinkage', 'Traditional feel'],
        trial: 100,
        warranty: '10 years'
      },
      {
        id: 'helix-twilight',
        brand: 'Helix',
        model: 'Helix Twilight',
        type: 'hybrid',
        height: '12"',
        firmness: 'Firm (7/10)',
        bestFor: ['Heavier sleepers', 'Stomach sleepers'],
        priceQueen: 1099,
        keyFeatures: ['Enhanced support', 'High density foams', 'Edge support'],
        trial: 100,
        warranty: '10 years'
      },
      {
        id: 'helix-plus',
        brand: 'Helix',
        model: 'Helix Plus',
        type: 'hybrid',
        height: '13"',
        firmness: 'Firm',
        bestFor: ['Plus size sleepers', 'Big & tall'],
        priceQueen: 1299,
        keyFeatures: ['Higher density materials', 'Extra support layer', 'Durable construction'],
        trial: 100,
        warranty: '10 years'
      }
    ]
  },
  {
    id: 'puffy',
    name: 'Puffy',
    tagline: 'Comfort Meets Craftsmanship',
    description: 'Award-winning comfort with cloud-like softness. Made in the USA with premium materials.',
    products: [
      {
        id: 'puffy-cloud',
        brand: 'Puffy',
        model: 'Puffy Cloud (Original)',
        type: 'foam',
        height: '10"',
        firmness: 'Medium-Firm (6.5-7/10)',
        bestFor: ['All positions'],
        priceQueen: 799,
        keyFeatures: ['Memory foam', 'Stain-resistant cover'],
        trial: 101,
        warranty: 'Lifetime'
      },
      {
        id: 'puffy-lux',
        brand: 'Puffy',
        model: 'Puffy Lux',
        type: 'foam',
        height: '12"',
        firmness: 'Medium (5/10)',
        bestFor: ['Side sleepers', 'Back sleepers'],
        priceQueen: 1099,
        keyFeatures: ['Cooling gel foam', 'Climate control'],
        trial: 101,
        warranty: 'Lifetime'
      },
      {
        id: 'puffy-lux-hybrid',
        brand: 'Puffy',
        model: 'Puffy Lux Hybrid',
        type: 'hybrid',
        height: '12"',
        firmness: 'Medium',
        bestFor: ['All positions'],
        priceQueen: 1299,
        keyFeatures: ['Coil system', 'Cooling gel'],
        trial: 101,
        warranty: 'Lifetime'
      },
      {
        id: 'puffy-royal-hybrid',
        brand: 'Puffy',
        model: 'Puffy Royal Hybrid',
        type: 'hybrid',
        height: '14"',
        firmness: 'Medium',
        bestFor: ['All positions'],
        priceQueen: 1799,
        keyFeatures: ['Luxury quilted top', 'Dual coil'],
        trial: 101,
        warranty: 'Lifetime'
      },
      {
        id: 'puffy-monarch',
        brand: 'Puffy',
        model: 'Puffy Monarch',
        type: 'hybrid',
        height: '16"',
        firmness: 'Medium',
        bestFor: ['All positions'],
        priceQueen: 2499,
        keyFeatures: ['Diamond foam', 'Ultra premium', 'Best of the best'],
        trial: 101,
        warranty: 'Lifetime'
      }
    ]
  },
  {
    id: 'dreamcloud',
    name: 'DreamCloud',
    tagline: 'Luxury Within Reach',
    description: 'Hand-tufted luxury mattresses with premium materials at factory-direct prices.',
    products: [
      {
        id: 'dreamcloud-premier',
        brand: 'DreamCloud',
        model: 'DreamCloud Premier Hybrid',
        type: 'hybrid',
        height: '13"',
        firmness: 'Medium-Firm',
        bestFor: ['All positions', 'Couples'],
        priceQueen: 1099,
        keyFeatures: ['Quilted euro top', 'Memory foam layers', 'Zoned support'],
        trial: 365,
        warranty: 'Forever'
      },
      {
        id: 'dreamcloud-rest',
        brand: 'DreamCloud',
        model: 'DreamCloud Premier Rest',
        type: 'hybrid',
        height: '16"',
        firmness: 'Medium',
        bestFor: ['All positions', 'Luxury seekers'],
        priceQueen: 1599,
        keyFeatures: ['Extra pillow top', 'Premium materials', 'Maximum comfort'],
        trial: 365,
        warranty: 'Forever'
      }
    ]
  },
  {
    id: 'bedgear',
    name: 'Bedgear',
    tagline: 'Performance Sleep™',
    description: 'Performance technology for better sleep. Moisture-wicking, temperature-regulating.',
    products: [
      {
        id: 'bedgear-storm',
        brand: 'Bedgear',
        model: 'Storm Performance',
        type: 'foam',
        height: '10"',
        firmness: 'Medium',
        bestFor: ['Hot sleepers', 'All positions'],
        priceQueen: 699,
        keyFeatures: ['Moisture-wicking', 'Temperature regulating'],
        trial: 100,
        warranty: '10 years'
      },
      {
        id: 'bedgear-balance',
        brand: 'Bedgear',
        model: 'Balance Performance',
        type: 'hybrid',
        height: '11"',
        firmness: 'Medium',
        bestFor: ['All positions'],
        priceQueen: 899,
        keyFeatures: ['Responsive foam', 'Airflow system'],
        trial: 100,
        warranty: '10 years'
      },
      {
        id: 'bedgear-dri-tec',
        brand: 'Bedgear',
        model: 'Dri-Tec Protector',
        type: 'accessory',
        height: '',
        firmness: '',
        priceQueen: 89,
        keyFeatures: ['Waterproof', 'Breathable', 'Machine washable'],
        trial: 0,
        warranty: '1 year'
      }
    ]
  },
  {
    id: 'naturepedic',
    name: 'Naturepedic',
    tagline: 'Organic Comfort, Conscious Sleep',
    description: 'Award-winning organic mattresses. Made with organic cotton, wool, and natural latex.',
    products: [
      {
        id: 'naturepedic-eos',
        brand: 'Naturepedic',
        model: 'EOS Classic',
        type: 'latex',
        height: '10"',
        firmness: 'Multiple options',
        bestFor: ['Organic seekers', 'Latex lovers'],
        priceQueen: 1499,
        keyFeatures: ['Organic cotton', 'Wool fire barrier', 'Natural latex'],
        trial: 100,
        warranty: '20 years'
      },
      {
        id: 'naturepedic-eos-trilux',
        brand: 'Naturepedic',
        model: 'EOS Trilux',
        type: 'latex',
        height: '12"',
        firmness: 'Customizable',
        bestFor: ['Flexible firmness'],
        priceQueen: 1999,
        keyFeatures: ['3 latex layers', 'Adjustable comfort'],
        trial: 100,
        warranty: '20 years'
      },
      {
        id: 'naturepedic-chorus',
        brand: 'Naturepedic',
        model: 'Chorus',
        type: 'foam',
        height: '10"',
        firmness: 'Medium',
        bestFor: ['Organic budget'],
        priceQueen: 999,
        keyFeatures: ['Organic cotton cover', 'Plant-based foam'],
        trial: 100,
        warranty: '20 years'
      }
    ]
  },
  {
    id: 'serta',
    name: 'Serta',
    tagline: 'We Make The World\'s Best Mattress',
    description: 'America\'s #1 mattress brand. Trusted comfort with innovative cooling technology.',
    products: [
      {
        id: 'serta-icomfort',
        brand: 'Serta',
        model: 'iComfort Blue',
        type: 'foam',
        height: '12"',
        firmness: 'Medium',
        bestFor: ['Hot sleepers'],
        priceQueen: 899,
        keyFeatures: ['Cooling foam', 'Memory foam', 'Supportive base'],
        trial: 120,
        warranty: '10 years'
      }
    ]
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah L.',
    text: 'After years of searching for pressure relief, I finally found it with Nectar. It feels like sleeping on a cloud, but with the support my back actually needs. Truly life-changing!',
    rating: 5
  },
  {
    id: '2',
    name: 'Marcus R.',
    text: 'As a dedicated side sleeper, I struggled to find a mattress that didn\'t leave me sore. The Nectar memory foam contours perfectly. I\'m finally waking up without any neck or back pain.',
    rating: 5
  },
  {
    id: '3',
    name: 'Elena G.',
    text: 'The motion isolation is incredible. My partner can get up without me ever knowing. Plus, the cooling layers actually keep us comfortable all night. The best value in mattress shopping!',
    rating: 5
  },
  {
    id: '4',
    name: 'Geoff D.',
    text: 'I\'ve bought several mattresses from Discount Mattress, always a good, friendly experience. They offer quality products that last. Consider Discount Mattress for your next mattress!',
    rating: 5
  }
];

export const storeInfo = {
  name: 'Discount Mattress',
  tagline: 'Sleep Better for Less in Bowling Green',
  locations: [
    {
      name: 'Discount Mattress',
      address: '1555 Campbell Ln',
      city: 'Bowling Green',
      state: 'KY',
      zip: '42104',
      phone: '(270) 495-1603',
      hours: 'Mon–Sat: 10:00 AM – 6:00 PM'
    },
    {
      name: 'Discount Mattress Outlet',
      address: '2734 Russellville Rd',
      city: 'Bowling Green',
      state: 'KY',
      zip: '42101',
      phone: '(270) 842-3888',
      hours: 'Mon–Sat: 9:00 AM – 5:30 PM\nSunday: 12:00 PM – 5:00 PM'
    }
  ],
  brands: ['Helix', 'Dream Cloud', 'Bedgear', 'BedTech', 'Nectar', 'Posh and Lavish', 'Serenity Sleep', 'Serta']
};