# Launch Checklist

## Manual Account Setup

- Create or confirm a Google Analytics 4 property.
- Preferably create a Google Tag Manager container and connect GA4 through GTM.
- Add the production tracking ID to the host:
  - `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`, or
  - `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- Set a strong production admin password:
  - `ADMIN_PASSWORD=<strong-password>`
- Confirm hosting provider and domain owner access.

## Catalog

- Confirm the active showroom assortment with Discount Mattress.
- Confirm that every public product should be shown.
- Confirm whether displayed prices should match D2C reference prices or local showroom prices.
- Confirm current brand promos before launch.
- Run `npm run catalog:export` and review `docs/catalog-audit.md`.

## Admin

- Verify `/admin` requires the production password.
- Test editing one product price.
- Test editing one promo.
- Test hiding one product and restoring it.
- Confirm whether JSON-backed overrides are acceptable for launch.
- If instant live updates are required, move overrides to Supabase/database before launch.

## Content And SEO

- Confirm phone numbers, hours, email, addresses, and map links.
- Add local business schema.
- Add sitemap and robots.txt.
- Add Search Console after the domain is live.
- Prepare redirects from old/high-value URLs if replacing an existing site.
- Confirm Google Business Profile alignment.

## Google Tracking QA

- Verify page views in GA4 or Tag Assistant.
- Verify `phone_click`.
- Verify `directions_click`.
- Verify `product_detail_click`.
- Verify `collection_click`.
- Verify production traffic after deploy.

## Visual QA

- Test homepage desktop and mobile.
- Test collections index.
- Test Helix, Puffy, Nectar, and DreamCloud pages.
- Test representative product pages.
- Test financing, FAQ, and locations pages.
- Check all phone links.
- Check all map links.
- Check for broken images.
- Check for console errors.
- Check mobile text wrapping and CTA layout.

## Launch Day

- Freeze catalog edits during deployment.
- Deploy production build.
- Configure domain and SSL.
- Verify `/admin` is protected.
- Verify public CTAs and tracking.
- Submit sitemap in Google Search Console.
- Monitor first-week traffic, call clicks, directions clicks, and errors.
