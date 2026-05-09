# Discount Mattress Showroom Website — PRD

**Project:** Discount Mattress Website  
**Prepared for:** Greg Jent (Midas/Sleep Sellers)  
**Prepared by:** Lucy / Blake  
**Date:** 2026-04-29  
**Status:** DRAFT v1.1  

---

## 1. Executive Summary

Build a new website for Discount Mattress in Bowling Green, KY that makes the store look credible, current, and easy to visit. The site is not currently launching as a Shopify store and should not be designed around online checkout. Its job is to help shoppers understand the brands carried, compare enough options to feel confident, then call or come into the showroom.

**Primary goal:** Drive in-store visits and phone calls.

**Secondary goal:** Improve local SEO and brand confidence before a shopper visits.

**Current direction:** Build a great showroom-first site now. Keep product/catalog structure organized so e-commerce or Shopify can be considered later without rebuilding the whole site.

**Important operational need:** Prices, promos, and availability messaging need to be reasonably easy for the store to update. This may require a small `/admin` area or lightweight CMS-style editor, even though the site is not an e-commerce store.

---

## 2. Business Overview

### 2.1 Store Information

| Field | Value |
|-------|-------|
| **Business Name** | Discount Mattress |
| **Address** | 1555 Campbell Ln, Bowling Green, KY 42104 |
| **Phone** | (270) 495-1603 |
| **Current Sites** | mattressoutletbg.com, discountmattressbg.com |
| **Google Rating** | 4.9 stars (112 reviews) |
| **Store Type** | Physical mattress retail showroom |

### 2.2 Model

- **Primary:** Local showroom visits
- **Secondary:** Phone calls, map clicks, and lead capture
- **Not in current scope:** Online checkout, Shopify launch, shipping workflows, cart, payment setup, or inventory sync
- **Financing Display:** Synchrony, Kafene, Snap Finance logos and "No Credit Needed" messaging where appropriate

---

## 3. Product Catalog

### 3.1 Brands & Categories

The catalog should show the brands and categories customers can ask about in store. It should create confidence and help shoppers form a shortlist, not force a complete online purchase decision.

| Category | Brands |
|----------|--------|
| **Mattresses** | Puffy, Helix, Nectar, DreamCloud, PranaSleep, Naturepedic, Serta, Jamison, Serenity Sleep, Brisk Sleep/private label, and other confirmed showroom brands |
| **Adjustable Bases** | BedTech and other confirmed base lines |
| **Pillows** | Bedgear and other confirmed pillow lines |
| **Protectors** | Bedgear and other confirmed protector lines |

### 3.2 Product Detail Depth

Each product or collection should include:

- Brand and model name
- Comfort feel and firmness
- Best-fit shopper guidance
- Key features in plain language
- Representative product or lifestyle images
- Visible price or starting price
- Supporting call/visit messaging for current promos
- Links to call, visit, or view the brand collection

Prices should always be visible. When pricing changes often or MAP rules are a concern, the site should show an approved reference price, MSRP, starting price, or last verified D2C sale price with clear source/date context, then push customers to call or visit for the current showroom offer.

Prices and promotions should be treated as editable business content, not hard-coded page copy. The site should support a mix of exact prices, "starting at" prices, MSRP/reference prices, sale badges, brand-level offers, and dated D2C reference pricing.

### 3.3 Brisk Sleep / Private Label

Brisk Sleep/private label content should be treated as store-confirmed only. Placeholder images and descriptions are acceptable during drafting, but should not be presented as final until the store approves the product names, specs, and pricing.

---

## 4. Design Specification

### 4.1 Design Reference

- **Primary reference:** themattressshop.com
- **Vibe:** Professional, trustworthy, local, experienced, showroom-friendly
- **Layout direction:** Brand-focused hero sections, strong trust signals, clear calls to call or visit

### 4.2 Key Visual Elements

- Local showroom credibility
- Recognizable national and specialty brands
- Financing available
- "No Credit Needed" messaging
- Visible pricing plus visit-the-store CTAs
- Google rating/review trust signal
- Map, hours, phone, and location details

### 4.3 Color Palette

Use a clean retail palette that feels trustworthy and current. Avoid making the site feel like a generic online mattress brand; it should feel like a local store with serious brand access.

### 4.4 Typography

Use readable, practical typography with strong headings and clear scanning. Product cards, brand pages, and location details should prioritize clarity over decorative styling.

---

## 5. Core Features

### 5.1 Required Functionality

| Feature | Priority | Notes |
|---------|----------|-------|
| Homepage | Must | Strong first impression, store positioning, top brands, direct call/visit CTAs |
| Product/brand catalog | Must | Show available brands and representative models without requiring checkout |
| Brand collection pages | Must | `/collections/helix`, `/collections/puffy`, etc. |
| Product detail pages | Must | Help shoppers compare feel, features, and fit before visiting |
| Local store info | Must | Address, hours, phone, map, and location-specific notes |
| Financing page | Must | Synchrony, Kafene, Snap Finance logos and simple explanation |
| FAQ section | Must | Pricing, availability, delivery, returns, warranties, financing, and store visits |
| Call and map CTAs | Must | Phone links and map links should be prominent across the site |
| Price/promo management | Must | Store can update prices, sale messages, and availability without code changes |
| Google tracking | Must | Google Analytics/Tag Manager tracking for key customer actions |
| Admin editor | Should | A protected `/admin` area or lightweight CMS for trusted internal updates |
| Google Business Profile content | Should | Reviews, photos, rating, and local trust signals |
| Buying guides / SEO content | Should | Mattress-buying, comfort, cooling, side-sleeper, adjustable-base content |
| Lead capture | Could | Email/text form if the store wants follow-up workflows |

### 5.2 Key Requirement: Easy Promo Messaging

**Requirement:** Greg or store staff need to be able to update brand-specific offers, seasonal promotions, selected prices, "starting at" prices, MSRP/reference prices, and current-deal messaging without editing code every time.

**Recommended near-term approach:**

1. Keep promo messaging simple and site-wide where possible.
2. Add structured editable fields for brand promos, product promos, price display mode, availability, and featured products.
3. Consider a protected `/admin` route for updating this content.
4. Always show a visible price or reference price, even when the current promo is not verified.
5. Avoid building Shopify discount workflows until the business is actually ready for e-commerce.

### 5.3 Admin / Content Management Scope

The admin tool should be intentionally small. It is not a full store backend.

**Admin should allow:**

- Edit product price display: exact price, starting price, MSRP/reference price, D2C sale-reference price, or local/showroom price
- Edit product promo text and sale badges
- Edit brand-level promo text
- Toggle products/brands between featured, active, draft, and ask-in-store
- Update availability notes
- Update homepage promo banner or seasonal message
- Save changes without a developer deployment where practical

**Admin should not include in this phase:**

- Checkout
- Customer accounts
- Payment processing
- Inventory reconciliation
- Order management
- Shipping labels or fulfillment

**Access requirements:**

- Password-protected or authenticated
- Only trusted staff can edit
- Basic validation so blank or malformed prices do not break the public site
- Ideally preserve a simple change history or at least make backups practical

**Future option:** If the site later moves to Shopify, brand collections and automatic discounts can still be used. That is a future path, not the current launch plan.

---

## 6. Technical Approach

### 6.1 Platform

- **Current platform:** Next.js showroom website
- **Primary use:** Fast, polished marketing/catalog site
- **Data model:** Structured local catalog data for brands, products, images, prices, and availability notes
- **Admin/data updates:** Add a small protected admin workflow for price, promo, availability, and featured-content updates
- **Tracking:** Add Google Analytics or Google Tag Manager for page views and key conversion events
- **Future flexibility:** Keep brand and product data clean enough to export to Shopify, a CMS, or another commerce platform later

### 6.1.1 Admin Implementation Options

Pick the simplest option that matches hosting and update frequency.

| Option | Fit | Tradeoff |
|--------|-----|----------|
| Local JSON/data file edited through `/admin` | Good for a small first version | Needs safe write/storage strategy on the host |
| Lightweight database such as SQLite/Postgres | Best if prices/promos change often | More setup, but cleaner audit and persistence |
| Headless CMS | Best if non-product content will grow | Adds third-party dependency and setup |
| Static data only | Fastest for launch | Does not solve the update requirement |

**Recommended:** Start with a small authenticated `/admin` backed by a simple persistent data store if hosting supports it. Keep the editable fields narrow: price display, promo text, status, availability, and homepage banner.

### 6.2 Product Data Strategy

**For each brand:**

1. Gather approved product images and lifestyle assets.
2. Write clear descriptions, specs, materials, and comfort guidance.
3. Note official online prices only as reference when appropriate.
4. Mark uncertain products as "ask in store" until the store confirms the current floor set.
5. Prioritize shopper confidence and store visits over exhaustive e-commerce SKU coverage.

**Brands to research and confirm:**

- Puffy
- Helix
- Nectar
- DreamCloud
- PranaSleep
- Naturepedic
- Serta
- Bedgear
- BedTech
- Jamison
- Serenity Sleep
- Brisk Sleep/private label
- Other current showroom brands Greg confirms

### 6.3 Domain & SEO

- Decide which domain should become the primary public site.
- Set up 301 redirects from old/high-value pages when replacing an existing site.
- Optimize for local SEO around Bowling Green, KY mattress shopping.
- Add location content, review trust signals, and Google Business Profile alignment.
- Prioritize searches like "mattress store Bowling Green KY," brand + city queries, financing/no-credit-needed queries, and adjustable-base/pillow/protector searches.

### 6.4 Google Tracking

Google tracking should be included before launch so the store can see whether the site is producing real customer actions.

**Track at minimum:**

- Page views
- Phone link clicks
- Directions/map clicks
- Financing CTA clicks
- Product detail CTA clicks
- Brand collection CTA clicks
- Lead form submissions if a form is added

**Implementation preference:**

- Use Google Tag Manager if the business wants easier future tracking changes.
- Use Google Analytics directly if the site only needs simple page and event tracking.
- Keep tracking IDs in environment variables.
- Do not track admin edits as customer conversions.
- Confirm any cookie/privacy notice requirements based on the final tracking setup.

---

## 7. Phased Timeline

### Phase 1: Site Foundation

- [ ] Confirm active domain and hosting plan
- [ ] Finalize homepage direction
- [ ] Confirm primary CTA strategy: call, map, visit, financing
- [ ] Confirm store info, hours, phone numbers, and locations

### Phase 2: Catalog And Brand Pages

- [ ] Confirm current showroom brands and products
- [ ] Gather approved brand/product images
- [ ] Build brand collection pages
- [ ] Build representative product detail pages
- [ ] Mark uncertain products as "ask in store"

### Phase 3: Conversion Content

- [ ] Financing page
- [ ] FAQ page
- [ ] Locations/contact page
- [ ] Trust/reviews section
- [ ] Buying guide or local SEO content if time allows

### Phase 4: Admin And Promo Updates

- [ ] Decide whether `/admin` is required for the first public version
- [ ] Define editable fields for products, brands, and homepage promos
- [ ] Add authentication or password protection
- [ ] Add validation and save behavior
- [ ] Test updating a price, promo, sale badge, and availability note

### Phase 5: QA And Local SEO

- [ ] Mobile and desktop visual QA
- [ ] Check all call links, map links, and navigation
- [ ] Verify image loading and page performance
- [ ] Add metadata and local SEO basics
- [ ] Add Google Analytics or Google Tag Manager
- [ ] Verify phone, directions, financing, and product CTA events
- [ ] Prepare redirects if replacing an old site

### Phase 6: Publish

- [ ] Publish the showroom site
- [ ] Verify SSL/domain behavior
- [ ] Submit sitemap/Search Console
- [ ] Confirm Google tracking is receiving live production traffic
- [ ] Monitor calls, map clicks, page traffic, and search performance

---

## 8. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Customers expect online checkout | Medium | Medium | Make CTAs clearly say call, visit, directions, and showroom offer |
| Brand MAP policies restrict discount display | Medium | Medium | Show approved reference pricing and avoid unapproved discount claims |
| Product availability changes often | High | Medium | Keep availability language flexible and showroom-oriented |
| Prices/promos become stale | High | High | Provide admin-editable promo and price fields with clear ownership |
| Unauthorized admin edits | Low | High | Protect `/admin`, limit access, validate inputs, and preserve backups |
| Image usage/licensing issues | Medium | High | Use approved manufacturer assets or store-provided images where possible |
| Site feels like a generic online mattress brand | Medium | High | Emphasize Bowling Green, showroom help, local trust, reviews, and store visits |
| Domain migration issues | Medium | Medium | Plan redirects and DNS change carefully |

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Phone calls | Increase call clicks from mobile visitors |
| Store visits | Increase map/directions clicks |
| Local SEO | Improve visibility for Bowling Green mattress searches |
| Tracking visibility | Google tracking reports page views, phone clicks, directions clicks, and financing clicks |
| Catalog confidence | Shoppers can identify brands and models before visiting |
| Page quality | Fast, polished mobile and desktop experience |
| Promo flexibility | Store can communicate current offers without hard-coding every sale |
| Admin usability | Staff can update a price or promo in under two minutes |

---

## 10. Next Steps

1. **Confirm PRD direction** — Showroom-first site, not Shopify launch.
2. **Confirm current showroom catalog** — Brands, models, pricing rules, and which products should stay ask-in-store.
3. **Decide admin scope** — Confirm whether `/admin` is required for v1 and which fields staff must edit.
4. **Confirm Google tracking setup** — Choose GA direct or Google Tag Manager and define conversion events.
5. **Review homepage and collection pages** — Make sure the site pushes call/visit behavior clearly.
6. **Confirm domain plan** — Choose primary domain and redirect approach.
7. **Run visual QA** — Mobile, desktop, phone links, map links, images, and local SEO basics.

---

*Current guiding principle: make the site so useful and trustworthy that a shopper wants to call or visit Discount Mattress before buying anywhere else.*
