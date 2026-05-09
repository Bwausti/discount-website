# Google Tracking

The site supports either Google Tag Manager or direct GA4. Use GTM if the business wants easier future changes without code edits.

## Environment Variables

Set one of these:

- `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
- `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

If both are set, GTM is used.

## Events

| Event | Meaning |
|-------|---------|
| `phone_click` | Shopper clicks a phone CTA |
| `directions_click` | Shopper clicks directions, map, or visit-showroom CTA |
| `financing_click` | Reserved for financing application/partner CTA if added |
| `product_detail_click` | Shopper opens a product detail path from a card |
| `collection_click` | Shopper opens a collection or brand path |
| `navigation_click` | Reserved for broader nav tracking |

Each event sends:

- `event_category`
- `event_label`
- `link_url`

## Verification

- Use Google Tag Assistant for GTM.
- Use GA4 DebugView for direct GA4.
- Test phone, directions, product detail, and collection clicks before launch.
- Do not count admin usage as customer conversion activity.

## Manual Setup Steps

1. Go to [Google Analytics](https://analytics.google.com/).
2. Create or open the Discount Mattress GA4 property.
3. Copy the Measurement ID that starts with `G-`.
4. If using GTM, go to [Google Tag Manager](https://tagmanager.google.com/), create a web container, and copy the ID that starts with `GTM-`.
5. Add the ID to the production host environment variables.
6. Redeploy the site.
7. Open the live site and verify events in DebugView or Tag Assistant.
