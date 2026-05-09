import type { Product, ProductPromo } from "@/lib/products";

export function publicPriceLabel(label: string) {
  return label
    .replace(/^D2C sale price from$/i, "Sale price from")
    .replace(/^Starting reference price$/i, "Price from")
    .replace(/^Official online queen price$/i, "Queen price")
    .replace(/^Official online pillow price$/i, "Pillow price");
}

export function publicPromoSummary(promo: ProductPromo | undefined) {
  if (!promo?.value) return null;

  return "Current sale reflected";
}

export function publicPromoDetail(product: Product) {
  const promo = product.promo;
  if (!promo?.value) return null;

  const codeCopy = promo.code ? ` Code ${promo.code} is noted only for price context.` : "";

  return `The price above already reflects the advertised sale where applicable.${codeCopy} It is not an extra Discount Mattress discount.`;
}
