import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");
const siteBaseUrl = "https://discountmattressbg.com";

function loadTypeScriptModule(relativePath, moduleMap = {}) {
  const filename = path.join(projectRoot, relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      strict: false,
    },
    fileName: filename,
  }).outputText;

  const cjsModule = { exports: {} };
  const sandbox = {
    exports: cjsModule.exports,
    module: cjsModule,
    require(request) {
      if (request in moduleMap) return moduleMap[request];
      if (request.endsWith(".json")) {
        const jsonPath = path.resolve(path.dirname(filename), request);
        return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
      }
      throw new Error(`Unsupported import "${request}" while loading ${relativePath}`);
    },
    __dirname: path.dirname(filename),
    __filename: filename,
  };

  vm.runInNewContext(transpiled, sandbox, { filename });
  return cjsModule.exports;
}

const brandAssets = loadTypeScriptModule("src/lib/brand-assets.ts");
const baseCatalog = loadTypeScriptModule("src/lib/products.ts", {
  "./brand-assets": brandAssets,
});
const catalog = loadTypeScriptModule("src/lib/products-patched.ts", {
  "./products": baseCatalog,
});

const { brands, products, productCategories, visibleProductPrice } = catalog;

function moneyToNumber(amount) {
  if (!amount) return "";
  const numeric = amount.replace(/[^0-9.]/g, "");
  return numeric || "";
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function imageUrl(imagePath) {
  return imagePath ? `${siteBaseUrl}${imagePath}` : "";
}

function productBody(product) {
  const parts = [
    `<p>${product.feel ?? product.type}</p>`,
    `<ul>${product.keyFeatures.map((feature) => `<li>${feature}</li>`).join("")}</ul>`,
    `<p>${product.availability}</p>`,
  ];
  if (product.onlinePrice?.note) parts.push(`<p>${product.onlinePrice.note}</p>`);
  return parts.join("");
}

function variantRows(product) {
  if (product.priceVariants?.length) return product.priceVariants;
  const visiblePrice = visibleProductPrice(product);
  return [
    {
      label: product.firmness || product.type || "Default",
      amount: product.onlinePrice?.amount ?? visiblePrice.amount,
      sourceUrl: product.onlinePrice?.sourceUrl ?? visiblePrice.sourceUrl,
    },
  ];
}

function hasInternalPriceSource(product) {
  const visiblePrice = visibleProductPrice(product);
  const rows = variantRows(product);
  return (
    visiblePrice.amount !== "Price needed" &&
    visiblePrice.sourceUrl?.startsWith("http") &&
    rows.length > 0 &&
    rows.every((row) => row.amount && row.amount !== "Price needed" && row.sourceUrl?.startsWith("http"))
  );
}

function productTags(product, brand) {
  return [
    brand.status,
    product.brandId,
    product.category,
    product.firmness,
    product.badge,
    hasInternalPriceSource(product) ? "priced" : "needs-internal-price-source",
  ]
    .filter(Boolean)
    .join(", ");
}

function shopifyRows() {
  const rows = [];
  for (const brand of brands) {
    for (const product of brand.products) {
      const variants = variantRows(product);
      const publishable = brand.status !== "ask-in-store" && hasInternalPriceSource(product);
      variants.forEach((variant, index) => {
        rows.push({
          Handle: product.id,
          Title: index === 0 ? product.model : "",
          "Body (HTML)": index === 0 ? productBody(product) : "",
          Vendor: index === 0 ? product.brand : "",
          "Product Category": "",
          Type: index === 0 ? product.category : "",
          Tags: index === 0 ? productTags(product, brand) : "",
          Published: publishable ? "TRUE" : "FALSE",
          "Option1 Name": variants.length > 1 ? "Size" : "Option",
          "Option1 Value": variant.label,
          "Variant SKU": `${product.id}-${variant.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
          "Variant Price": moneyToNumber(variant.amount),
          "Variant Inventory Tracker": "",
          "Variant Inventory Qty": "",
          "Variant Inventory Policy": "deny",
          "Variant Fulfillment Service": "manual",
          "Variant Requires Shipping": "TRUE",
          "Variant Taxable": "TRUE",
          "Image Src": index === 0 ? imageUrl(product.image) : "",
          "Image Position": index === 0 ? "1" : "",
          "SEO Title": index === 0 ? `${product.model} | Discount Mattress Bowling Green` : "",
          "SEO Description": index === 0 ? `${product.model} from ${product.brand}. Call or visit Discount Mattress in Bowling Green for current availability and local pricing.` : "",
          Status: publishable ? "active" : "draft",
        });
      });
    }
  }
  return rows;
}

function writeCsv(rows, outputPath) {
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
  ].join("\n");
  fs.writeFileSync(outputPath, `${csv}\n`);
}

function assetReferences() {
  const refs = new Set();
  for (const brand of brands) {
    [brand.logo, brand.heroImage, ...brand.galleryImages].filter(Boolean).forEach((ref) => refs.add(ref));
    for (const product of brand.products) {
      [product.image, ...product.gallery].filter(Boolean).forEach((ref) => refs.add(ref));
    }
  }
  return [...refs].sort();
}

function missingAssetPaths() {
  return assetReferences().filter((assetPath) => !fs.existsSync(path.join(publicRoot, assetPath)));
}

function duplicateIds(items) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    if (seen.has(item.id)) duplicates.add(item.id);
    seen.add(item.id);
  }
  return [...duplicates].sort();
}

function markdownList(items, emptyText = "None found.") {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : emptyText;
}

function writeAudit(outputPath, csvRows) {
  const brandStatusCounts = brands.reduce((acc, brand) => {
    acc[brand.status] = (acc[brand.status] ?? 0) + 1;
    return acc;
  }, {});
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});
  const productsWithoutOnlinePrice = products
    .filter((product) => !product.onlinePrice && !product.priceVariants?.length)
    .map((product) => `${product.brand} - ${product.model} (${product.id})`);
  const productsMissingInternalPriceSource = products
    .filter((product) => !hasInternalPriceSource(product))
    .map((product) => {
      const visiblePrice = visibleProductPrice(product);
      return `${product.brand} - ${product.model} (${product.id}) — ${visiblePrice.amount}, source: ${visiblePrice.sourceUrl}`;
    });
  const askInStoreProducts = products
    .filter((product) => catalog.getBrandById(product.brandId)?.status === "ask-in-store")
    .map((product) => `${product.brand} - ${product.model}`);
  const missingAssets = missingAssetPaths();
  const lines = [
    "# Catalog Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    `- Brands: ${brands.length}`,
    `- Products: ${products.length}`,
    `- Shopify CSV rows: ${csvRows.length}`,
    `- Product categories: ${productCategories.join(", ")}`,
    `- Brand statuses: ${Object.entries(brandStatusCounts).map(([status, count]) => `${status} ${count}`).join(", ")}`,
    `- Category counts: ${Object.entries(categoryCounts).map(([category, count]) => `${category} ${count}`).join(", ")}`,
    "",
    "## Source Of Truth",
    "",
    "- Active app folder: `discount-website`",
    "- `discount-website-publish` and `discount-website-desktop-push-1777901702` appear to be duplicate/export copies. Keep them only as backups unless there is a deployment workflow tied to them.",
    "",
    "## Asset Check",
    "",
    `- Referenced assets checked: ${assetReferences().length}`,
    `- Missing referenced assets: ${missingAssets.length}`,
    "",
    markdownList(missingAssets.map((assetPath) => `Missing ${assetPath}`)),
    "",
    "## Products Needing Pricing Or Final Store Confirmation",
    "",
    "These products export as draft rows in the Shopify CSV when pricing is missing or the brand is marked ask-in-store.",
    "",
    markdownList(productsWithoutOnlinePrice),
    "",
    "## Products Missing Internal Price Source",
    "",
    "Every public product should show a visible price. The source URL is internal/admin verification only and should not be linked to visitors.",
    "",
    markdownList(productsMissingInternalPriceSource),
    "",
    "## Ask-In-Store Catalog Candidates",
    "",
    markdownList(askInStoreProducts),
    "",
    "## Duplicate ID Check",
    "",
    markdownList([
      ...duplicateIds(brands).map((id) => `Duplicate brand id: ${id}`),
      ...duplicateIds(products).map((id) => `Duplicate product id: ${id}`),
    ]),
    "",
    "## PRD Coverage",
    "",
    "- Product catalog and brand collection pages exist.",
    "- Product detail pages exist for all current catalog products.",
    "- Financing, FAQ, locations, and local contact flows exist.",
    "- Native Shopify collection discounts remain the recommended promo workflow.",
    "- Remaining gap: convert current prototype data into Shopify products, confirm exact carried models, then wire real inventory/pricing policy.",
  ];
  fs.writeFileSync(outputPath, `${lines.join("\n")}\n`);
}

const outputCsv = path.join(projectRoot, "data", "shopify-products.csv");
const outputAudit = path.join(projectRoot, "docs", "catalog-audit.md");
const rows = shopifyRows();
writeCsv(rows, outputCsv);
writeAudit(outputAudit, rows);

console.log(`Wrote ${path.relative(projectRoot, outputCsv)}`);
console.log(`Wrote ${path.relative(projectRoot, outputAudit)}`);
