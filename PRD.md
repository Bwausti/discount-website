# Discount Mattress Shopify Store — PRD (v2.0)

**Project:** Discount Mattress Online Store
**Prepared for:** Blake Austin / Greg Jent
**Date:** 2026-05-19
**Status:** E-commerce launch — in progress

---

## 1. Executive Summary

Discount Mattress in Bowling Green, KY is launching a fully functional e-commerce Shopify store at discount-mattress-4.myshopify.com. The site sells mattresses, adjustable bases, platforms, pillows, and bedding with online checkout, cart, payment processing, and shipping.

**Primary goal:** Sell products online with full e-commerce functionality.

**Secondary goals:** Increase local and national reach, improve SEO, capture leads, drive both online and in-store sales.

**Platform:** Shopify (Horizon Fresh theme) — not a showroom site, not Next.js.

---

## 2. Launch Checklist — 3 Major Priorities

### Priority 1: Product Detail Pages (PDPs)
*Audit every product across all brands for accurate presentation*

**All Brands:**
- [ ] Verify product images are correct and unique for each model
- [ ] Verify product titles, descriptions, and specs are accurate
- [ ] Verify pricing is correct (visible, no MAP conflicts)
- [ ] Verify size/variant options are correct
- [ ] Add cross-sell / recommended add-ons (adjustable bases with mattresses, protectors, pillows)
- [ ] Verify brand-specific product addon sections render correctly (bedtech-product-addons, helix-tiered-grid, etc.)
- [ ] Check mobile layout for all PDPs
- [ ] Verify SEO metafields (title, description) on every product

**Per Brand:**
- [ ] **Helix** — PDP layout + tiered grid comparison
- [ ] **Puffy** — PDP layout + collection banner
- [ ] **DreamCloud** — PDP layout + collection banner
- [ ] **Nectar** — PDP layout + tiered grid
- [ ] **BedGear** — PDP layout (pillows, sheets, protectors)
- [ ] **BedTech** — PDP layout + product add-ons section
- [ ] **Naturepedic** — PDP layout + product add-ons
- [ ] **Serta** — PDP layout
- [ ] **Jamison** — PDP layout
- [ ] **PranaSleep** — PDP layout
- [ ] **Posh & Lavish** — PDP layout

### Priority 2: E-commerce Functionality
*Core shopping features that must work*

**Cart & Checkout:**
- [ ] Add to cart works from collection pages and PDPs
- [ ] Cart drawer / cart page renders correctly
- [ ] Checkout flow works end-to-end (test with real payment)
- [ ] Shipping calculator / rates configured
- [ ] Tax configuration correct
- [ ] Discount codes work (test coupon entry)
- [ ] Abandoned cart recovery enabled

**Product Recommendations:**
- [ ] Add "Recommended add-ons" or "Frequently bought together" sections on PDPs
- [ ] Upsell: mattress → adjustable base or protector
- [ ] Cross-sell: pillow with mattress purchase

**Lead Capture & Marketing:**
- [ ] Popup / modal for discount code capture (email signup)
- [ ] Exit-intent popup
- [ ] Email capture on checkout
- [ ] Google Analytics / Tag Manager configured for e-commerce events
- [ ] Facebook/Meta pixel for retargeting
- [ ] Post-purchase follow-up email sequence

**Account & Customer:**
- [ ] Customer account creation working
- [ ] Order history visible in customer accounts
- [ ] Guest checkout enabled
- [ ] Order confirmation emails sending correctly

### Priority 3: Internal Linking, Navigation & SEO Collections

**Navigation & Site Structure:**
- [ ] Main navigation menu complete (Brands, Categories, Financing, FAQ, Contact)
- [ ] Footer navigation with policy links
- [ ] Brand navigation bar has "Home" button ✅
- [ ] Breadcrumbs working on all pages

**SEO / Theme Collections (Build collection pages for shopper intent):**
- [ ] "Best for Pressure Relief" collection
- [ ] "Cooling Comfort" collection
- [ ] "Luxury Feel" collection
- [ ] "Organic Materials" collection
- [ ] "Adjustable Bases" collection
- [ ] "Best Value" collection
- [ ] "Side Sleeper" collection
- [ ] "Back Pain Relief" collection
- [ ] "Split King" / "Adjustable Base Compatible" collection
- [ ] "Memory Foam" vs "Hybrid" vs "Innerspring" comparison collections

**Internal Linking:**
- [ ] All brand collection pages link to each PDP correctly
- [ ] All PDPs link back to their collection
- [ ] Blog posts link to relevant products
- [ ] FAQ page links to relevant products
- [ ] Financing page links to relevant products
- [ ] Category / "Shop by feel" links work

**Content Pages:**
- [ ] FAQ page is complete and accurate
- [ ] Financing page (Synchrony, Kafene, Snap Finance) is accurate
- [ ] About / Locations page with store info
- [ ] Contact page with phone, map, hours
- [ ] Shipping & Returns policy page
- [ ] Privacy policy page
- [ ] Terms of service page

---

## 3. Technical Infrastructure

| Component | Status |
|-----------|--------|
| Shopify store | ✅ discount-mattress-4.myshopify.com |
| Theme | ✅ Horizon Fresh (customized) |
| GitHub repo | ✅ github.com/Bwausti/discount-website |
| Auto-deploy (CI/CD) | ✅ GitHub Actions deploys on push to master |
| Product catalog | ✅ 76 products, 232 variants, 11 brands |
| Domain | TBD (currently Shopify subdomain) |
| Payment gateway | Needs configuration |
| Shipping | Needs configuration |
| Tax | Needs configuration |

---

## 4. Key Requirements

- **Online checkout must work.** No showroom-first language.
- **Prices must be visible.** No "call for price" — show it.
- **Products must be purchasable.** Add to cart → checkout → pay → ship.
- **All brand pages must feel brand-native.** Each collection page should reflect its brand's identity.
- **SEO must be strong.** Proper meta titles, descriptions, product schemas, and intent-based collections.
- **Analytics must track e-commerce events.** Add to cart, purchase, checkout steps.

---

## 5. Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| MAP policy violations on discount display | Medium | Display MSRP or D2C reference pricing; show current price as showroom offer |
| Shipping costs deter purchases | Medium | Offer free shipping threshold or local delivery pricing |
| Cart/checkout bugs | Low | Test every flow before launch |
| Product data inaccuracies (prices, specs) | Medium | Cross-reference with showroom floor and vendor data |
| Images don't differentiate products | Medium | Use manufacturer photos + feature callout images |
