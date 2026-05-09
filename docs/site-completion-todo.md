# Site Completion Todo

Goal: finish a beautiful showroom-first Discount Mattress website that drives phone calls, map clicks, and store visits. This is not a Shopify checkout launch. It does need a simple way to keep prices, promos, featured products, and availability messaging current.

## 1. Product Direction

- [ ] Confirm the site goal with Greg: drive calls, map clicks, showroom visits, and financing conversations.
- [ ] Confirm the primary CTA language: "Get directions," "Visit the showroom," "Ask about this mattress," and "Ask about financing."
- [ ] Confirm visible price strategy for each brand/product: exact, starting at, MSRP/reference, D2C sale-reference, or local/showroom price.
- [ ] Confirm MAP-sensitive brands where discount claims should be softened while still showing a price.
- [ ] Decide whether `/admin` is required for the first public version or immediately after first publish.
- [ ] Choose who owns ongoing promo/price updates after launch.

## 2. Catalog Cleanup

- [ ] Confirm every currently carried brand with the store.
- [ ] Confirm every product that should be public, draft, or ask-in-store.
- [ ] Remove or hide any brand/product that is not currently carried or strategically useful.
- [ ] Confirm official names for all products and collections.
- [ ] Confirm categories: mattresses, adjustable bases, pillows, protectors, bedding.
- [ ] Confirm product statuses: featured, active, draft, ask-in-store.
- [ ] Confirm price display mode for each product: exact, starting at, MSRP/reference, D2C sale-reference, or local/showroom price.
- [ ] Confirm availability note for each product.
- [ ] Add or clean promo copy for each primary brand.
- [ ] Add current showroom-specific notes where they help customers know what to ask for.
- [ ] Run `npm run catalog:export` and review [catalog-audit.md](/Users/blakeaustin/Documents/New%20project/discount-website/docs/catalog-audit.md).

## 3. Visual Design Polish

- [ ] Audit the homepage above the fold on desktop, tablet, and mobile.
- [ ] Make the first screen immediately communicate Discount Mattress, Bowling Green, and showroom help.
- [ ] Make phone and directions CTAs visually prominent without feeling pushy.
- [ ] Review color palette for a polished local retail feel, not a generic online mattress brand.
- [ ] Make card radii, borders, spacing, shadows, and button styles consistent across pages.
- [ ] Ensure product cards feel premium and scannable.
- [ ] Ensure brand cards feel visually balanced when logos have different shapes.
- [ ] Improve image crops where mattresses, logos, or people are awkwardly framed.
- [ ] Replace weak placeholder assets with approved manufacturer or store images.
- [ ] Add real storefront/showroom imagery where possible.
- [ ] Add tasteful trust signals: Google rating, years/experience language, financing, local help.
- [ ] Check that no mobile text overlaps or feels cramped.
- [ ] Check that all buttons fit their text at mobile widths.
- [ ] Remove any UI that implies checkout/cart if the action is really call or visit.

## 4. Homepage

- [ ] Finalize hero headline and supporting copy.
- [ ] Add clear local positioning: Bowling Green mattress showroom.
- [ ] Feature the strongest brands first.
- [ ] Add a direct call CTA.
- [ ] Add a direct directions/map CTA.
- [ ] Add trust section with review/rating/local credibility.
- [ ] Add "shop by comfort need" section: cooling, side sleepers, luxury, organic, adjustable bases.
- [ ] Add financing callout.
- [ ] Add location section with hours and map links.
- [ ] Add final CTA near the bottom: call, visit, or get directions.

## 5. Collections And Product Pages

- [ ] Review `/collections` as a shopper-facing brand/category directory.
- [ ] Review every primary brand collection page.
- [ ] Make each collection page explain who the brand is best for.
- [ ] Add brand-level promo/offer messaging where appropriate.
- [ ] Make collection pages push to call/visit, not checkout.
- [ ] Review representative product detail pages for each major brand.
- [ ] Add comparison-friendly specs: feel, firmness, height, type, best for.
- [ ] Add "Ask about this model" CTAs on product detail pages.
- [ ] Add related products or related collections where useful.
- [ ] Make uncertain products visibly ask-in-store rather than pretending they are guaranteed.

## 6. Financing Page

- [ ] Confirm spelling and approved usage for Synchrony, Kafene, and Snap Finance.
- [ ] Confirm which financing providers are actually active.
- [ ] Add clear "No Credit Needed" messaging if approved.
- [ ] Explain financing in plain language without overpromising approval.
- [ ] Add call and visit CTAs.
- [ ] Add financing FAQ items.
- [ ] Make logos visually balanced and high quality.

## 7. FAQ And Store Info

- [ ] Confirm current store hours for both locations.
- [ ] Confirm phone numbers, email, and addresses.
- [ ] Confirm map links.
- [ ] Add FAQ answers for pricing, current offers, availability, delivery, pickup, warranties, returns, and financing.
- [ ] Make FAQ copy direct and store-visit oriented.
- [ ] Add local delivery/service-area details if available.
- [ ] Add "call before visiting for a specific model" guidance.

## 8. Admin / Price And Promo Updates

- [ ] Decide storage approach: local JSON, small database, or CMS.
- [ ] Define editable fields for brands: promo text, promo status, featured status, public status.
- [ ] Define editable fields for products: price mode, price amount, promo badge, promo text, availability, featured status, public status.
- [ ] Define editable homepage fields: hero promo banner, featured brands, featured products.
- [ ] Design `/admin` login/password screen.
- [ ] Build protected `/admin` route.
- [ ] Build product list editor with search/filter.
- [ ] Build product edit form.
- [ ] Build brand promo editor.
- [ ] Build homepage promo editor.
- [ ] Add validation for prices and empty fields.
- [ ] Add save confirmation and error states.
- [ ] Add backup/change-history strategy.
- [ ] Test updating one exact price.
- [ ] Test changing a product from exact price to MSRP/reference price.
- [ ] Test updating a brand promo.
- [ ] Test toggling a product from draft to active.
- [ ] Confirm public pages update correctly after admin changes.

## 9. SEO And Local Search

- [ ] Add unique metadata for homepage, collections, products, financing, FAQ, and locations.
- [ ] Add local business schema for Discount Mattress.
- [ ] Add product/collection schema only where accurate and not misleading.
- [ ] Add sitemap.
- [ ] Add robots.txt.
- [ ] Confirm canonical URLs.
- [ ] Add alt text to important images.
- [ ] Add internal links between homepage, collections, financing, FAQ, and locations.
- [ ] Create target keyword list for Bowling Green mattress searches.
- [ ] Add or plan buying-guide content for side sleepers, cooling mattresses, adjustable bases, financing, and mattress store comparisons.
- [ ] Prepare redirect map from old site URLs if replacing an existing site.
- [ ] Set up Google Search Console after domain decision.

## 10. Analytics And Conversion Tracking

- [ ] Decide Google tracking approach: Google Analytics direct or Google Tag Manager. Manual account step.
- [ ] Create or confirm the Google Analytics property. Manual account step.
- [ ] Create or confirm the Google Tag Manager container if GTM is used. Manual account step.
- [ ] Store tracking IDs in production environment variables. Manual hosting step.
- [x] Add Google tracking script in the app layout.
- [x] Track page views.
- [x] Track phone link clicks.
- [x] Track directions/map clicks.
- [ ] Track financing CTA clicks.
- [x] Track product inquiry CTA clicks.
- [x] Track brand collection CTA clicks.
- [ ] Track lead form submissions if a form is added.
- [ ] Verify events in Google Analytics DebugView or Tag Assistant.
- [ ] Confirm production traffic is received after deploy.
- [ ] Track admin usage if needed.
- [ ] Add basic conversion dashboard or reporting notes.
- [ ] Confirm cookie/privacy requirements are appropriate for the tracking used.

## 11. Accessibility And Usability

- [ ] Verify keyboard navigation.
- [ ] Verify visible focus states.
- [ ] Verify color contrast.
- [ ] Verify semantic headings.
- [ ] Verify image alt text.
- [ ] Verify forms and admin controls have labels.
- [ ] Check mobile tap target sizes.
- [ ] Check reduced-motion behavior if animations are added.
- [ ] Test with long product names and promo messages.

## 12. Performance

- [ ] Audit largest images and convert/compress where needed.
- [ ] Ensure hero images are properly prioritized.
- [ ] Ensure below-fold images lazy load.
- [ ] Remove unused assets once the final catalog is confirmed.
- [ ] Run production build.
- [ ] Run Lighthouse or equivalent performance check.
- [ ] Fix layout shift from images, cards, or dynamic admin-driven text.

## 13. Technical Quality

- [ ] Keep `discount-website` as the active source of truth.
- [ ] Decide whether duplicate folders should be archived or removed.
- [ ] Keep product and brand types strict.
- [ ] Add tests or validation for catalog integrity.
- [ ] Add checks for missing image paths.
- [ ] Add checks for duplicate product/brand IDs.
- [ ] Add checks for invalid price modes.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run `npm run catalog:export`.
- [ ] Document how to run, update, and deploy the site.

## 14. Browser QA

- [ ] Test homepage desktop.
- [ ] Test homepage mobile.
- [ ] Test collections index desktop and mobile.
- [ ] Test at least one primary collection page: Helix, Puffy, Nectar, DreamCloud.
- [ ] Test one ask-in-store collection/product.
- [ ] Test representative product detail pages.
- [ ] Test financing page.
- [ ] Test FAQ page.
- [ ] Test locations page.
- [ ] Test all header and footer navigation links.
- [ ] Test all phone links on mobile.
- [ ] Test all map links.
- [ ] Check for console errors.
- [ ] Check for broken images.
- [ ] Check for awkward crops or overlapping text.

## 15. Deployment

- [ ] Confirm hosting provider.
- [ ] Confirm environment variables for admin/auth/storage.
- [ ] Confirm environment variables for Google tracking.
- [ ] Confirm persistent storage strategy if `/admin` writes data.
- [ ] Configure production build.
- [ ] Configure domain.
- [ ] Configure SSL.
- [ ] Configure redirects.
- [ ] Verify production pages after deploy.
- [ ] Verify admin is protected in production.
- [ ] Verify admin saves persist in production.
- [ ] Verify Google page views and conversion events in production.
- [ ] Submit sitemap.
- [ ] Monitor first-week traffic, call clicks, directions clicks, and errors.

## 16. Final Acceptance Criteria

- [ ] The site looks polished and credible on desktop and mobile.
- [ ] A local shopper immediately understands the store is in Bowling Green.
- [ ] The strongest actions are call, visit, directions, and financing.
- [ ] Product and brand pages help shoppers form a shortlist before visiting.
- [ ] Prices/promos can be updated without editing code, or the exact no-admin fallback is documented.
- [ ] Google tracking captures page views, phone clicks, directions clicks, financing clicks, and product inquiry clicks.
- [ ] All core pages have local SEO metadata.
- [ ] No known broken images, broken links, console errors, or build errors.
- [ ] Greg or staff can explain how to keep promos/prices current.
- [ ] The site is ready to publish as a showroom-first website.
