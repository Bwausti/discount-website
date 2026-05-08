# Catalog And Business Rules

Goal: make Discount Mattress feel aligned with each brand's official D2C site while still pushing shoppers to call or visit the Bowling Green showroom. The site should mirror each brand's public product architecture, pricing language, and promo patterns without linking visitors away to the brand's checkout.

## Core Rules

- Match the brand's D2C structure first: collections, tiers, product names, construction categories, and comfort language.
- Use the brand's official current price as the reference price when showing exact or starting prices.
- Use the brand's current public promo as the default promo message when the store wants to show a promo.
- For fast-changing promos, still show a price, then use flexible local language such as "Visit the showroom for current Helix offers" unless the exact sale is verified.
- Never imply online checkout. CTAs should be call, visit, directions, or ask in store.
- Keep every price/promo record dated with `lastVerifiedAt` and `sourceUrl`.
- Source URLs are internal/admin verification fields only. Do not expose D2C links to website visitors.
- Require re-verification before major holiday weekends: Presidents Day, Memorial Day, July 4, Labor Day, Black Friday, Cyber Monday, and year-end sales.
- Prices must always be visible. If a brand has MAP or retailer restrictions, show an approved MSRP/reference price or sale-reference price and pair it with visit/call messaging.
- If Discount Mattress has a better local offer than the D2C site, label it as local/showroom-only and confirm the wording with Greg.

## Price Display Modes

Use one of these modes per product:

| Mode | Public Display | Use When |
|------|----------------|----------|
| `exact` | `$1,099` | Price is approved and current |
| `starting_at` | `From $799` | Price depends on size or configuration |
| `sale_reference` | `Sale price from $799` | We want to mirror brand-site sale framing without sending shoppers away |
| `msrp_reference` | `MSRP from $1,099` | Sale price is not verified but a reference price is useful |
| `local_reference` | `Local price from $999` | Store-approved local pricing is available |

Every public product must use one of these visible-price modes. Do not use price modes that hide the price or replace it with "call only."

## Promo Display Rules

Promo records should support:

- `promoHeadline`: short public text, such as `Memorial Day Sale`
- `promoValue`: `25% off`, `Up to 60% off`, `$599 accessories included`, etc.
- `promoCode`: optional, such as `MEMDAY25`
- `promoType`: percentage, dollar-off, bundle, upgrade, call-for-offer
- `scope`: sitewide, brand, collection, product
- `lastVerifiedAt`
- `sourceUrl`
- `expiresAt`: optional, only if the brand publishes an end date

Public copy should be conservative:

- Good: `Helix is currently advertising 25% off sitewide. Visit Discount Mattress for current local pricing.`
- Good: `Nectar pricing changes often. Current reference price shown; visit us for today's showroom offer.`
- Avoid: `Guaranteed lowest price` unless Greg explicitly approves it.
- Avoid: exact sale claims without a verification date.
- Avoid: `Call for price` as the only price display.

## Admin Fields Needed

These fields should be editable later in `/admin`:

- Brand public status
- Brand promo headline
- Brand promo value
- Brand promo code
- Brand promo source URL
- Brand promo last verified date
- Product public status
- Product featured status
- Product price display mode
- Product base/reference price
- Product sale/reference price
- Product MSRP/reference price
- Product local/showroom price
- Product promo badge
- Product promo text
- Product availability note
- Product source URL
- Product last verified date

## Brand Rules

### Helix

**D2C structure to mirror:**

- Collections/tier architecture:
  - Core Collection: 11.5", best value
  - Luxe Collection: 13.5", most popular
  - Elite Collection: 15", best of the best
- Comfort/model architecture:
  - Sunset: soft, side sleepers
  - Moonlight: soft, back/stomach sleepers
  - Midnight: medium, side sleepers, best seller
  - Dusk: medium, back/stomach/combination sleepers
  - Twilight: firm, side sleepers
  - Dawn: firm, back/stomach sleepers
  - Plus: heavy-duty support
- Plus should exist across Core, Luxe, and Elite when carried.

**Pricing/promo rule:**

- Use Helix's official tier pricing as the baseline.
- Promo should usually be brand-level rather than product-specific.
- Default normal promo assumption: `20% off` only if currently verified.
- Event promo assumption: `25% off` or higher only when verified from Helix.
- On May 4, 2026, Helix was advertising a Memorial Day `25% off sitewide` sale with code `MEMDAY25` on its official product page.
- If not verified within the last 7 days, still show the last verified price as a dated reference and avoid exact percentage-off language.

**Recommended site structure:**

- `/collections/helix`
- Brand tabs or filters: Core, Luxe, Elite
- Product cards grouped by tier first, then comfort model
- Product detail page title pattern: `Helix Midnight Luxe`, `Helix Midnight Elite`, etc.
- CTA: `Visit for current Helix offers`

**Source URLs:**

- `https://helixsleep.com/products/midnight-elite/queen`
- `https://support.helixsleep.com/hc/en-us/articles/4403178250135-How-much-does-a-Helix-mattress-cost`

### Nectar

**D2C structure to mirror:**

- Nectar's current public mattress page frames the line around memory foam and hybrid mattresses.
- Primary category split:
  - Memory Foam
  - Hybrid
- Product/tier architecture:
  - Classic: value pick
  - Premier: best value / most popular
  - Luxe: premium option
  - Ultra if carried/confirmed

**Current product examples to support:**

- Classic Memory Foam, 12"
- Premier Memory Foam, 13"
- Luxe Memory Foam, 14"
- Classic Hybrid, 12"
- Premier Hybrid, 13"
- Luxe Hybrid, 14"
- Ultra Memory Foam / Ultra Hybrid only if store confirms it should be public

**Pricing/promo rule:**

- Nectar often publishes already-discounted product prices rather than a simple global percent-off message.
- Use product-level reference prices more than brand-level percent-off messaging.
- Show `From $X` or `Sale price from $X` if exact prices are current.
- If not verified within the last 7 days, still show the last verified price as a dated reference and avoid exact promo language.

**Current official queen reference prices checked May 4, 2026:**

- Premier Memory Foam Queen: `$949`
- Classic Hybrid Queen: `$799`
- Luxe Memory Foam Queen: `$1,249`
- Luxe Hybrid Queen: `$1,549`

**Recommended site structure:**

- `/collections/nectar`
- Top-level tabs or filters: Memory Foam, Hybrid
- Within each tab: Classic, Premier, Luxe, Ultra if confirmed
- CTA: `Visit for current Nectar offers`

**Source URLs:**

- `https://www.nectarsleep.com/mattresses`
- `https://www.nectarsleep.com/mattresses/premier-memory-foam-mattress`
- `https://www.nectarsleep.com/mattresses/hybrid-mattress`
- `https://www.nectarsleep.com/mattresses/luxe-hybrid-mattress`

### DreamCloud

**D2C structure to mirror:**

- DreamCloud should be treated as a hybrid-focused luxury/value line.
- Product/tier architecture:
  - Classic Hybrid if carried/confirmed
  - Premier Hybrid
  - Luxe Hybrid
- Distinguish Premier and Luxe by construction and feel, not just price:
  - Premier Hybrid: 13", 6-layer design, medium-firm, best-selling hybrid framing
  - Luxe Hybrid: 14", 7-layer design, medium, tri-zone support and more cooling/luxury framing

**Pricing/promo rule:**

- DreamCloud often advertises large percent-off savings and/or accessory bundle value.
- Use product-level current prices and brand-level sale messaging only if verified.
- If the public site says `up to X% off` plus accessories, mirror it as `DreamCloud is advertising up to X% off online. Visit for current showroom pricing.`
- If not verified within the last 7 days, still show the last verified price as a dated reference and avoid exact promo language.

**Current official queen reference prices checked May 4, 2026:**

- Premier Hybrid Queen: `$1,099`
- Luxe Hybrid Queen: `$1,499`

**Recommended site structure:**

- `/collections/dreamcloud`
- Product cards ordered Classic, Premier, Luxe
- Compare cards around feel, height, cooling, support, and who it is best for
- CTA: `Visit for current DreamCloud offers`

**Source URLs:**

- `https://www.dreamcloudsleep.com/mattresses/premier-hybrid-mattress/queen`
- `https://www.dreamcloudsleep.com/mattresses/luxe-hybrid-mattress`

### Puffy

**D2C structure to mirror:**

- Puffy's official navigation lists mattresses as:
  - Puffy Cloud Mattress
  - Puffy Lux Hybrid Mattress
  - Puffy Royal Hybrid Mattress
  - Puffy Monarch Hybrid Mattress
  - Puffy Legacy Hybrid Mattress
- Current product architecture should read as a step-up ladder:
  - Cloud: memory foam, accessible/best memory foam framing
  - Lux: hybrid, medium-plush, premium choice
  - Royal: hybrid, ultra-plush, luxury
  - Monarch: hybrid, luxury-plush, top ultra-luxury/alpaca wool positioning
  - Legacy: only include if store confirms

**Pricing/promo rule:**

- Puffy often uses promo codes, free pillows/sleep mask bundles, and upgrade messaging.
- Use product-level price references and current promo code only when verified.
- If not verified within the last 7 days, still show the last verified price as a dated reference and avoid exact promo language.

**Recommended site structure:**

- `/collections/puffy`
- Product cards ordered Cloud, Lux, Royal, Monarch, Legacy if confirmed
- CTA: `Visit for current Puffy offers`

**Source URLs:**

- `https://puffy.com/`
- `https://puffy.com/products/puffy-cloud-mattress-2`
- `https://puffy.com/products/puffy-lux-mattress-6`
- `https://puffy.com/products/puffy-royal-mattress`
- `https://puffy.com/products/puffy-monarch-mattress-5`

## Remaining Brand Rules To Define

These still need official-site review and store confirmation:

- Naturepedic: likely organic/latex/modular structure; confirm EOS, Chorus, and any crib/kids products.
- PranaSleep: confirm current collections and whether Karma is the right public focus.
- Bedgear: separate mattresses, pillows, protectors; confirm current stocked items.
- BedTech: adjustable base model hierarchy and current stocked models.
- Serta/iComfort: confirm whether Serta is one brand page with iComfort subcollection or separate pages.
- Jamison: confirm current showroom line and official naming.
- Serenity Sleep: confirm exact product names and current availability.
- Brisk Sleep/private label: confirm final model names, specs, price grid, and imagery.
- Posh and Lavish: confirm whether it is currently carried and which models should be public.

## Data Shape Recommendation

Add or migrate toward these structured fields:

```ts
type PriceDisplayMode =
  | "exact"
  | "starting_at"
  | "sale_reference"
  | "msrp_reference"
  | "local_reference";

interface PromoRule {
  headline: string;
  value?: string;
  code?: string;
  type: "percentage" | "dollar_off" | "bundle" | "upgrade" | "call_for_offer";
  scope: "sitewide" | "brand" | "collection" | "product";
  sourceUrl?: string;
  lastVerifiedAt?: string;
  expiresAt?: string;
}

interface ProductPricingRule {
  displayMode: PriceDisplayMode;
  referencePrice?: string;
  salePrice?: string;
  msrpPrice?: string;
  localPrice?: string;
  priceLabel?: string;
  sourceUrl?: string;
  lastVerifiedAt?: string;
}
```

## Verification Workflow

1. Open each official brand D2C site.
2. Record current product hierarchy and public naming.
3. Record queen price for each public product unless the product is not mattress-sized.
4. Record sale/promo headline, percent/value, code, and any bundle language.
5. Update source URL and verification date.
6. Set the public display mode.
7. If uncertain, use `msrp_reference` or `sale_reference` with the last verified price and date.
8. Re-run catalog audit.
9. Review the public pages for shopper clarity.
