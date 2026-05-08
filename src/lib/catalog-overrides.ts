import fs from "node:fs";
import path from "node:path";

export interface BrandOverride {
  promoHeadline?: string;
  promoValue?: string;
  promoCode?: string;
  featured?: boolean;
}

export interface ProductOverride {
  priceAmount?: string;
  priceLabel?: string;
  promoHeadline?: string;
  promoValue?: string;
  promoCode?: string;
  badge?: string;
  availability?: string;
  featured?: boolean;
  hidden?: boolean;
}

export interface CatalogOverrides {
  updatedAt: string | null;
  brands: Record<string, BrandOverride>;
  products: Record<string, ProductOverride>;
}

export const catalogOverridesPath = path.join(process.cwd(), "data", "catalog-overrides.json");

export function emptyCatalogOverrides(): CatalogOverrides {
  return {
    updatedAt: null,
    brands: {},
    products: {},
  };
}

export function readCatalogOverrides(): CatalogOverrides {
  if (!fs.existsSync(catalogOverridesPath)) return emptyCatalogOverrides();

  try {
    return {
      ...emptyCatalogOverrides(),
      ...JSON.parse(fs.readFileSync(catalogOverridesPath, "utf8")),
    };
  } catch {
    return emptyCatalogOverrides();
  }
}

export function writeCatalogOverrides(overrides: CatalogOverrides) {
  fs.mkdirSync(path.dirname(catalogOverridesPath), { recursive: true });
  fs.writeFileSync(
    catalogOverridesPath,
    `${JSON.stringify({ ...overrides, updatedAt: new Date().toISOString() }, null, 2)}\n`,
  );
}
