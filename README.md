# Discount Mattress Website

Showroom-first website for Discount Mattress in Bowling Green, KY. The site presents brand-native mattress lineups, visible prices, local calls to action, financing guidance, and showroom locations. It is not a Shopify checkout launch.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_ID`
- `ADMIN_PASSWORD`

If both Google IDs are set, Google Tag Manager is used.

## Admin

Visit `/admin` to edit price, promo, badge, visibility, and availability overrides.

Current persistence is JSON-backed at `data/catalog-overrides.json`. With the current static page setup, production edits become visible after rebuild/redeploy. Move this to Supabase or another database before relying on instant live production updates.

## Useful Commands

```bash
npm run dev
npm run lint
npm run build
npm run catalog:export
```

## Key Docs

- `PRD.md`
- `docs/site-completion-todo.md`
- `docs/catalog-business-rules.md`
- `docs/catalog-audit.md`
- `docs/google-tracking.md`
