# Discount Mattress Shopify — PRD

**Project:** Discount Mattress Website (Shopify)  
**Prepared for:** Greg Jent (Midas/Sleep Sellers)  
**Prepared by:** Lucy / Blake  
**Date:** 2026-04-29  
**Status:** DRAFT v1.0

---

## 1. Executive Summary

Build a new Shopify e-commerce website for Discount Mattress (Bowling Green, KY) to replace the current site (mattressoutletbg.com → migrate to new Shopify store). The site will serve as both a DTC e-commerce platform and showroom/lead-gen tool with in-store pickup.

**Target:** Launch ASAP — build it RIGHT once, no iterations.

---

## 2. Business Overview

### 2.1 Store Information

| Field | Value |
|-------|-------|
| **Business Name** | Discount Mattress |
| **Address** | 1555 Campbell Ln, Bowling Green, KY 42104 |
| **Phone** | (270) 495-1603 |
| **Current Sites** | mattressoutletbg.com, discountmattressbg.com |
| **Google Rating** | 4.9 ⭐ (112 reviews) |
| **Store Type** | Physical retail + DTC e-commerce |

### 2.2 Model

- **Primary:** E-commerce with shipping
- **Secondary:** Showroom with in-store pickup
- **Financing Display:** Synchony, Kafene, Snap Finance logos (no integration — just display "No Credit Needed" options)

---

## 3. Product Catalog

### 3.1 Brands & Categories

| Category | Brands |
|----------|--------|
| **Mattresses** | Puffy, Helix, Nectar, Dreamcloud, Prana Sleep, Naturepedic, Serta, Jamison, Serenity Sleep, Brisk Sleep (private label) |
| **Pillows** | Bedgear (Storm, Storm Cuddle, Balance Cuddle Curve) |
| **Protectors** | Bedgear (Basic, Dri-Tec, Ver-Tex) |

### 3.2 Brisk Sleep (Private Label) — Pricing

| Size | Firm | Medium | Pillowtop | Luxury Firm |
|------|------|--------|-----------|--------------|
| Twin | $999 | $1049 | $1049 | $899 |
| Twin XL | $1099 | $1149 | $1149 | $949 |
| Full | $1249 | $1399 | $1399 | $1199 |
| Queen | $1449 | $1599 | $1599 | $1299 |
| King | $1899 | $1999 | $1999 | $1699 |

*Note: Placeholder images/descriptions for now — swap later.*

---

## 4. Design Specification

### 4.1 Design Reference

- **Primary reference:** themattressshop.com
- **Vibe:** Professional, trustworthy, "30 years experience"
- **Clean layouts:** Brand-focused hero sections, trust signals

### 4.2 Key Visual Elements

✅ 120 Night Sleep Trial  
✅ Free US Shipping  
✅ Easy Free Returns  
✅ Limited Lifetime Warranty  
✅ Financing Available (display logos)  
✅ "No Credit Needed" messaging

### 4.3 Color Palette

*TBD — pull from themattressshop.com reference*

### 4.4 Typography

*TBD — pull from reference*

---

## 5. Core Features

### 5.1 Required Functionality

| Feature | Priority | Notes |
|---------|----------|-------|
| Product catalog with all brands | Must | Images/descriptions scraped from brand sites |
| Size/firmness variant selector | Must | Mattress dropdowns (Twin → King, Firm/Medium/Plush/etc.) |
| Brand collection pages | Must | /collections/helix, /collections/puffy, etc. |
| financing messaging | Must | Synchony, Kafene, Snap Finance logos |
| Local store info | Must | Address, hours, phone, map |
| Google Business Profile integration | Should | Embed reviews, photos |
| Blog/Buying Guide | Should | SEO content |
| Email capture / newsletter | Should | Lead gen |
| FAQ section | Should | Shipping, returns, warranties |

### 5.2 Key Requirement: Easy Promo Management

**Requirement:** Greg needs to be able to set brand-specific discounts (e.g., "25% off Helix") without touching code.

**Solution Options:**

1. **Shopify Collections + Automatic Discounts**
   - Create collection per brand
   - Apply automatic discount to collection
   - Greg toggles discount on/off in Shopify admin

2. **Custom Theme Settings**
   - Add brand-level discount fields in theme customization
   - Display sale banner automatically

3. **Metafields App**
   - Use Shopify free metafields for discounts
   - Display in product cards

**Recommended:** Option 1 (native Shopify, zero-code, easy for Greg)

---

## 6. Technical Approach

### 6.1 Platform

- **Platform:** Shopify 2.0 (Online Store)
- **Theme:** Dawn or similar free theme (customized)
- **Apps:** Minimal — use native functionality where possible

### 6.2 Product Data Strategy

**For each brand:**
1. Scrape product images from official brand sites
2. Scrape descriptions, specs, materials
3. Note MSRP for reference
4. Upload to Shopify via CSV or manually

**Brands to scrape:**
- Puffy (puffy.com)
- Helix (helixsleep.com)
- Nectar (nectarsleep.com)
- Dreamcloud (dreamcloud.com)
- Prana Sleep (pranasleep.com)
- Naturepedic (naturepedic.com)
- Serta (serta.com)
- Bedgear (bedgear.com)
- Jamison — (manufacturer site TBD)
- Serenity Sleep — (manufacturer site TBD)

**Brisk Sleep:**
- Placeholder images now — swap later

### 6.3 Domain & SEO

- Migrate mattressoutletbg.com → new Shopify
- Set up 301 redirects
- Local SEO optimization (Bowling Green, KY)
- Google Business Profile sync

---

## 7. Phased Timeline

### Phase 1: Setup (Week 1)
- [ ] Create Shopify store
- [ ] Set up domain/SSL
- [ ] Choose/configure theme
- [ ] Configurebasic settings (shipping, taxes, regions)
- [ ] Set up payment settings (Shopify Payments, financing logos)

### Phase 2: Product Catalog (Week 1-2)
- [ ] Research/grab all brand images & descriptions
- [ ] Create products (variants: size × firmness)
- [ ] Create collections per brand
- [ ] Upload product images
- [ ] Set pricing (MSRP + sale pricing where applicable)

### Phase 3: Content & Pages (Week 2)
- [ ] Homepage design
- [ ] Brand collection pages
- [ ] About page (30 years experience angle)
- [ ] Contact page (store info, map, hours)
- [ ] FAQ page
- [ ] Financing page (Synchony, Kafene, Snap Finance)

### Phase 4: Promotion Tools (Week 2)
- [ ] Set up collections for each brand
- [ ] Test discount functionality
- [ ] Document process for Greg

### Phase 5: Launch (Week 3)
- [ ] Final QA
- [ ] SEO audit
- [ ] Launch
- [ ] Redirect old domain

---

## 8. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|----------|--------|------------|
| Brand MAP policies restrict pricing display | Medium | Medium | Display "View in Cart" instead of prices for restricted brands |
| Image scraping blocked | Medium | High | Use manufacturer-provided assets or stock photos |
| Greg can't manage promos | Low | High | Document video + simple admin guide |
| Domain migration issues | Medium | Medium | Plan 301 redirects upfront |

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Launch date | ASAP (within 3 weeks) |
| Products loaded | 100+ SKUs |
| Pages indexed | 50+ |
| Core functionality | 100% working |
| Promo tools | Accessible to Greg |

---

## 10. Next Steps

1. **Confirm PRD** — Blake/Greg approval to proceed
2. **Create Shopify store** — Start account setup
3. **Begin product research** — Scrape brand images/descriptions
4. **Confirm domain** — Which domain to migrate

---

*Placeholder for Brisk Sleep — images/descriptions TBD*