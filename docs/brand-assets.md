# Brand Assets

This asset pack lives in `public/brand-assets` and is indexed by `src/lib/brand-assets.ts`.
It is asset-first: pages can consume these files later without depending on remote Wix, Shopify,
Webflow, Magento, or retailer image URLs at runtime.

## Collection Summary

- Primary collection-ready brands: Helix, Puffy, DreamCloud, Nectar, Bedgear, Naturepedic, Posh and Lavish, PranaSleep, and BedTech.
- Secondary supported brands: Serenity Sleep, Jamison, and Serta.
- Legacy/catalog candidates: Corsicana, Malouf, iComfort by Serta, and Serta Sleep Retreat.
- Store-level Discount Mattress assets are also saved in `public/brand-assets/discount-mattress`.

## Source Policy

Assets were selected for visual quality first, using broad web sourcing:

- Discount Mattress current site and brand pages: `https://www.discountmattressbg.com/`
- Official manufacturer/brand sites where available: BedTech, Jamison Bedding, Corsicana Mattress, Malouf Home, Serta, Serenity Sleep Products, and Posh+Lavish.
- Retailer product media only for the older Serta Sleep Retreat line, because current official Serta pages do not expose that legacy collection as a primary product line.

## Quality Notes

- Logos prefer clean transparent PNG/SVG files where available.
- Hero and gallery images were chosen for collection-page usefulness: wide lifestyle/product images, clean product renders, and feature/detail media.
- File extensions were normalized to match actual image bytes so static serving and browser rendering stay reliable.
- Naturepedic's current logo is usable but lower resolution than the strongest logos in the pack.
- Serta Sleep Retreat should remain a legacy candidate until the store confirms it is still actively sold.

## Implementation Notes

- Use `brandAssetBundles` or `getBrandAssetBundle(slug)` from `src/lib/brand-assets.ts`.
- Use `logo` for brand cards and navigation.
- Use `heroImage` as the first visual on collection pages.
- Use `galleryImages` for product grids, comparison sections, lifestyle bands, or brand story modules.
- Use `status` to decide whether a brand should appear in the primary collection grid, secondary brand area, or legacy/archive area.

## Source Links

- Discount Mattress: `https://www.discountmattressbg.com/`
- Helix page: `https://www.discountmattressbg.com/helix-brand-page`
- Puffy page: `https://www.discountmattressbg.com/puffy-brand-page`
- DreamCloud page: `https://www.discountmattressbg.com/dream-cloud-brand-page`
- Nectar page: `https://www.discountmattressbg.com/nectar-brand-page`
- Bedgear page: `https://www.discountmattressbg.com/bedgear-brand-page`
- Naturepedic page: `https://www.discountmattressbg.com/naturepedic-brand-page-eos-classic`
- Posh and Lavish page: `https://www.discountmattressbg.com/posh-and-lavish-brand-page`
- PranaSleep page: `https://www.discountmattressbg.com/pranasleep-karma-collection`
- BedTech page: `https://www.discountmattressbg.com/bed-tech-adjustable-bases`
- Official BedTech: `https://www.bedtech.com/`
- Official Jamison Bedding: `https://www.jamisonbedding.com/`
- Official Corsicana Mattress: `https://www.corsicanamattress.com/`
- Official Malouf Home: `https://www.maloufhome.com/`
- Official Serta iComfort: `https://www.serta.com/mattresses/icomfort`
- Official Serenity Sleep Products: `https://yourbestrest.com/`
- Official Posh+Lavish: `https://www.poshandlavish.com/`
- Sleep Retreat retailer reference: `https://www.hobbsfurn.com/products/Serta/ser/500957742queen.html`
- Sleep Retreat retailer reference: `https://www.novellofurniture.com/item/sleep-retreat-full-innerspring-mattress-set/87179750`
