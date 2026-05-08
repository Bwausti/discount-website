import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { LeadCta, LocationCards, PageShell } from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
import { publicPriceLabel, publicPromoDetail, publicPromoSummary } from "@/lib/price-copy";
import {
  getBrandById,
  getProductById,
  Product,
  productPriceRows,
  products,
  sleepSystemAddOns,
  storeInfo,
  visibleProductPrice,
} from "@/lib/products";

interface PageProps {
  params: Promise<{ productId: string }>;
}

type HelixTier = "core" | "luxe" | "elite";

type HelixUpgradeContent = {
  tier: HelixTier;
  label: string;
  shortLabel: string;
  height: string;
  headline: string;
  summary: string;
  included: string[];
  upgrades: string[];
  compare: string;
  tierSummary: string;
};

const helixTierOrder: HelixTier[] = ["core", "luxe", "elite"];

const helixUpgradeContent: Record<HelixTier, HelixUpgradeContent> = {
  core: {
    tier: "core",
    label: "Core Collection",
    shortLabel: "Core",
    height: "11.5 in",
    headline: "A lower starting price with optional cooling and support upgrades.",
    summary:
      "Start with the comfort feel you like, then decide whether cooling or extra back support matters.",
    included: [
      "Breathe Knit Cover",
      "Hybrid foam-and-coil construction",
      "Comfort feel matched by model",
      "Wrapped coil support",
    ],
    upgrades: [
      "GlacioTex Cooling Pillow Top",
      "ErgoAlign Layer for targeted midsection support",
    ],
    compare:
      "Step up to Luxe for a taller pillow top, more lumbar support, and more cooling-cover choices.",
    tierSummary:
      "A lower starting price with soft, medium, and firm feels.",
  },
  luxe: {
    tier: "luxe",
    label: "Luxe Collection",
    shortLabel: "Luxe",
    height: "13.5 in",
    headline: "More cushioning on top with added lumbar support.",
    summary:
      "Luxe is a strong middle choice if you want a plusher feel without jumping to the highest Helix price.",
    included: [
      "TENCEL cover",
      "Premium quilted pillow top",
      "Luxe Support Layer",
      "Zoned lumbar support coils",
    ],
    upgrades: [
      "GlacioTex Cooling Cover",
      "GlacioTex Cooling Cover with CoolForce Layer",
      "ErgoAlign Layer",
    ],
    compare:
      "Step up to Elite for more cooling, more contouring, and extra comfort layers already included.",
    tierSummary:
      "A taller pillow-top feel with lumbar support and more cooling choices.",
  },
  elite: {
    tier: "elite",
    label: "Elite Collection",
    shortLabel: "Elite",
    height: "15 in",
    headline: "The most upgraded Helix feel, with more cooling and contouring included.",
    summary:
      "Elite is for shoppers who want the most cushioned, most upgraded Helix option to try.",
    included: [
      "GlacioTex Elite Cooling Cover",
      "ErgoAlign Layer",
      "Zoned lumbar support",
      "Microcoil comfort layers",
    ],
    upgrades: ["GlacioTex Cooling Cover with CoolForce Layer"],
    compare:
      "Core and Luxe start lower in price. Elite includes more comfort and cooling features up front.",
    tierSummary:
      "The most cushioned Helix option, with more cooling and support features included.",
  },
};

function getHelixUpgradeContent(product: Product): HelixUpgradeContent | null {
  if (product.brandId !== "helix") return null;
  const groupId = product.merchandising?.groupId;
  if (groupId === "core" || groupId === "luxe" || groupId === "elite") {
    return helixUpgradeContent[groupId];
  }
  return null;
}

function getHelixBaseName(product: Product) {
  return product.model
    .replace(/^Helix\s+/, "")
    .replace(/\s+(Luxe|Elite)$/, "");
}

export async function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { productId } = await params;
  const product = getProductById(productId);
  if (!product) return {};

  return {
    title: `${product.model}`,
    description: `See ${product.model} details from ${product.brand}. Call Discount Mattress in Bowling Green for current offers and showroom availability.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  const brand = getBrandById(product.brandId);
  const relatedProducts = brand?.products.filter((item) => item.id !== product.id).slice(0, 3) ?? [];
  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];
  const usesLifestyleCrop =
    product.brandId === "puffy" || product.brandId === "nectar" || product.brandId === "bedgear";
  const showAddOns = product.category === "Mattress";
  const priceRows = productPriceRows(product);
  const visiblePrice = visibleProductPrice(product);
  const helixUpgrade = getHelixUpgradeContent(product);
  const productImageClassName =
    usesLifestyleCrop
      ? "object-cover object-center"
      : "object-contain p-8";
  const galleryImageClassName =
    usesLifestyleCrop
      ? "object-cover object-center"
      : "object-contain p-3";

  return (
    <PageShell>
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
              <Image
                src={product.image}
                alt={product.model}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className={productImageClassName}
              />
              {product.badge ? (
                <span className="absolute left-5 top-5 rounded bg-[#cf2333] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
                  {product.badge}
                </span>
              ) : null}
            </div>
            {gallery.length > 1 ? (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((image) => (
                  <div
                    key={image}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                  >
                    <Image
                      src={image}
                      alt={`${product.model} detail`}
                      fill
                      sizes="(min-width: 1024px) 18vw, 33vw"
                      className={galleryImageClassName}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Link
                href={`/collections/${product.brandId}`}
                className="rounded bg-slate-100 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-slate-700 transition hover:text-[#cf2333]"
              >
                {product.brand}
              </Link>
              <span className="rounded bg-slate-100 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-slate-700">
                {product.category}
              </span>
              {helixUpgrade ? (
                <span className="rounded bg-[#cf2333] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white">
                  {helixUpgrade.label}
                </span>
              ) : null}
            </div>
            <h1 className="text-balance text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
              {product.model}
            </h1>
            <p className="mt-5 text-xl font-semibold leading-8 text-slate-600">
              {product.feel ?? product.type}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">{product.availability}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-lg border border-slate-200 bg-[#fbfaf4] p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b78200]">
                      {publicPriceLabel(visiblePrice.label)}
                    </p>
                    <p className="mt-2 text-4xl font-black tracking-tight text-slate-950">
                      {visiblePrice.amount}
                    </p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      Updated {visiblePrice.asOf}
                    </p>
                  </div>
                </div>
                {priceRows.length > 0 ? (
                  <div className="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white">
                    <div className="grid grid-cols-2 bg-slate-950 px-4 py-3 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white">
                      <span>Size</span>
                      <span className="text-right">Price</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {priceRows.map((price) => (
                        <div
                          key={`${price.label}-${price.amount}`}
                          className="grid grid-cols-2 items-center gap-3 px-4 py-3 text-sm font-black text-slate-950"
                        >
                          <span>{price.label}</span>
                          <span className="text-right">{price.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
                    {visiblePrice.note ??
                      "A price still needs to be confirmed for this item."}
                  </p>
                )}
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#cf2333]">
                  Store check
                </p>
                <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {publicPromoSummary(product.promo) ?? "Confirm before you visit"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {publicPromoDetail(product) ??
                    "Call the showroom to verify the size you want, floor availability, delivery options, and any current promotion tied to this model."}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-[#f7f8fb] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#cf2333]">
                Visit or call
              </p>
              <p className="mt-3 text-2xl font-black text-slate-950">
                Try it in store before you decide.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Call or visit so the team can confirm size, availability, delivery, and current
                offers.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <TrackedLink
                  href={storeInfo.primaryPhoneHref}
                  eventName="phone_click"
                  eventLabel={`product_page_${product.id}`}
                  className="rounded bg-[#cf2333] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#a91c2a]"
                >
                  Call {storeInfo.primaryPhone}
                </TrackedLink>
                <TrackedLink
                  href="/locations"
                  eventName="directions_click"
                  eventLabel={`product_page_${product.id}_directions`}
                  className="rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
                >
                  Get directions
                </TrackedLink>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              <Spec label="Type" value={product.type} />
              <Spec label="Firmness" value={product.firmness ?? "Ask"} />
              {product.height ? <Spec label="Height" value={product.height} /> : null}
              {product.trial ? <Spec label="Trial" value={product.trial} /> : null}
              {product.warranty ? <Spec label="Warranty" value={product.warranty} /> : null}
            </dl>
          </div>
        </div>
      </section>

      {helixUpgrade ? <HelixUpgradeSection product={product} content={helixUpgrade} /> : null}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Good fit
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Who should try it?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Use this as a starting point. Comfort is personal, and in-store comparison is the
              best way to choose.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.bestFor.map((item) => (
              <div key={item} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-lg font-black text-slate-950">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Features
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              What stands out.
            </h2>
          </div>
          <div className="grid gap-4">
            {product.keyFeatures.map((feature) => (
              <div key={feature} className="rounded border border-slate-200 bg-[#f7f8fb] p-5">
                <p className="text-base font-bold leading-7 text-slate-800">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showAddOns ? (
        <section className="bg-[#f2efe5] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
                Complete the bed
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                Add a base or pillow while you compare.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Adjustable bases and pillows can change how a mattress feels. Try them together in
                the showroom before you decide.
              </p>
            </div>
            <ProductGrid products={sleepSystemAddOns} />
          </div>
        </section>
      ) : null}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Try in store
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Find the right showroom.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Floor models can change. Calling first makes the visit easier.
            </p>
          </div>
          <LocationCards compact />
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
                  Also compare
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                  More from {product.brand}
                </h2>
              </div>
              <Link
                href={`/collections/${product.brandId}`}
                className="rounded border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
              >
                View brand
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      ) : null}

      <LeadCta
        title={`Want to try the ${product.model}?`}
        body="Call first for current price, showroom availability, delivery options, and nearby alternatives worth testing."
      />
    </PageShell>
  );
}

function HelixUpgradeSection({
  product,
  content,
}: {
  product: Product;
  content: HelixUpgradeContent;
}) {
  const baseName = getHelixBaseName(product);
  const plusModel = product.id.includes("plus");

  return (
    <section className="border-y border-slate-200 bg-[#f7f8fb] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Helix comfort choices
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              What this version includes.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {content.summary}
            </p>
            <p className="mt-4 text-sm font-bold leading-6 text-slate-600">
              Prices can change when cooling or support upgrades are added. Call or visit and the
              store can confirm the exact price for the version you want.
            </p>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                <div className="bg-slate-950 p-6 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f2b705]">
                    {content.label}
                  </p>
                  <h3 className="mt-3 text-3xl font-black tracking-tight">
                    {baseName}: {content.shortLabel}
                  </h3>
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-200">
                    {content.headline}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded bg-white/10 p-4">
                      <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-300">
                        Height
                      </p>
                      <p className="mt-1 text-xl font-black">{content.height}</p>
                    </div>
                    <div className="rounded bg-white/10 p-4">
                      <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-300">
                        Feel
                      </p>
                      <p className="mt-1 text-xl font-black">{product.firmness ?? "Ask"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  <UpgradeList
                    title="Included on this model"
                    items={content.included}
                    tone="included"
                  />
                  <UpgradeList title="Available upgrades" items={content.upgrades} tone="upgrade" />
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {helixTierOrder.map((tier) => {
                const tierContent = helixUpgradeContent[tier];
                const active = tier === content.tier;
                return (
                  <Link
                    key={tier}
                    href={`/collections/helix#${tier}`}
                    className={`rounded-lg border p-5 shadow-sm transition ${
                      active
                        ? "border-[#cf2333] bg-white ring-2 ring-[#cf2333]/10"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-black text-slate-950">{tierContent.shortLabel}</p>
                      {active ? (
                        <span className="rounded bg-[#cf2333] px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.14em] text-white">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm font-black text-slate-500">{tierContent.height}</p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                      {active ? tierContent.compare : tierContent.tierSummary}
                    </p>
                  </Link>
                );
              })}
            </div>

            {plusModel ? (
              <div className="rounded-lg border border-[#f2b705]/70 bg-[#fff8df] p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#9b6b00]">
                  For bigger and taller sleepers
                </p>
                <p className="mt-2 text-base font-semibold leading-7 text-slate-800">
                  Plus versions add extra support for bigger and taller sleepers. Call or visit to
                  confirm the right size, feel, and current price.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function UpgradeList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "included" | "upgrade";
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-[#fbfaf4] p-5">
      <p
        className={`text-xs font-black uppercase tracking-[0.18em] ${
          tone === "included" ? "text-slate-500" : "text-[#cf2333]"
        }`}
      >
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-slate-800">
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                tone === "included" ? "bg-slate-400" : "bg-[#cf2333]"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-4 shadow-sm">
      <dt className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</dt>
      <dd className="mt-2 text-lg font-black text-slate-950">{value}</dd>
    </div>
  );
}
