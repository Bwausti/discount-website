# Shopify theme deployment and rollback

## Release path

1. Open a pull request into `master` and require the theme quality check to pass.
2. Merge only after reviewing the changed templates and customer-facing claims.
3. The workflow deploys the exact merged revision to the unpublished staging theme.
4. Automated smoke tests check the homepage, all-products collection, a Helix PDP, FAQ, and cart on that staging theme.
5. The `Production` environment must require a human approval before the live-theme job can start.
6. Production receives the same revision that passed staging; do not make parallel theme-editor changes during the release.

## Required GitHub environment settings

- `Preview` contains `SHOPIFY_STAGING_THEME_ID=136519155809`.
- `Production` has required reviewers enabled.
- `SHOPIFY_LIVE_THEME_ID` remains a Production environment secret.
- The Shopify client credentials remain least-privilege theme credentials.

## Rollback

1. In Shopify Admin, go to **Online Store → Themes**.
2. Confirm the previously published theme is still in the theme library.
3. Preview it briefly, then publish it.
4. Record the failed revision and customer impact before making a second release attempt.
5. Revert the faulty source change in Git and let the normal staging workflow run again. Do not treat an admin-only rollback as the source-of-truth fix.

## Release smoke checklist

- Header, mobile menu, search, call, and cart actions work.
- Homepage, collection, PDP, FAQ, and cart each have one main landmark and one descriptive page heading.
- Helix Core, Luxe, and Elite configuration and add-on selections add the intended products to cart.
- Availability, delivery, warranty, financing, and price language is supported by current store configuration.
- Checkout and payment tests are performed separately whenever shipping, markets, taxes, payment capture, or policies change.
