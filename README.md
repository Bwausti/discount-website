# Discount Mattress — Shopify Theme

Horizon Fresh theme for **discount-mattress-4.myshopify.com** — a physical mattress showroom in Bowling Green, KY.

## Quick Start

```bash
# Install Shopify CLI (if not installed)
npm install -g @shopify/cli

# Preview locally (hot-reloads, connected to dev theme)
shopify theme dev

# Open in browser
open http://localhost:9292
```

## Development Workflow

1. **Edit files** — Liquid in `sections/`, `snippets/`, `templates/`, `layout/`
2. **Preview** — `shopify theme dev` serves on localhost:9292 against the Development theme
3. **Push live** — `shopify theme push` deploys to the live Horizon Fresh theme

Or just push to `master` — the GitHub Action auto-deploys.

## Project Structure

```
├── assets/         # CSS, JS, images (CDN-backed)
├── blocks/         # Reusable block components
├── config/         # Theme settings (settings_data, settings_schema)
├── layout/         # Theme layout (theme.liquid, password.liquid)
├── locales/        # Translations (multi-language)
├── sections/       # Liquid section files (brand banners, add-ons, etc.)
├── snippets/       # Reusable Liquid snippets
├── templates/      # Page, collection, product, blog templates
├── data/           # Catalog reference data
├── docs/           # Brand assets, business rules, checklists
└── .github/        # CI/CD workflows
```

## Product Updates

Product data is managed via GraphQL scripts:

```bash
node ~/clawd/scripts/shopify-skill/sync-products.mjs --send
node ~/clawd/scripts/shopify-skill/migrate-catalog.mjs --send --images
```

## Important Notes

- **Asset CDN caching:** 1-year cache. Upload new filenames for CSS changes; never overwrite existing assets.
- **No overwriting:** Do not use `custom-liquid` in template JSON for complex logic — create proper `.liquid` section files.
- **No sleep trial language:** This is a physical showroom — no trial periods or comfort exchange mentions.
- **Prices: The theme renders product prices from Shopify. No hardcoding.**
# Test comment - workflow check Tue May 19 10:32:34 CDT 2026
