import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { publicPriceLabel, publicPromoSummary } from "@/lib/price-copy";
import { Product, visibleProductPrice } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const visiblePrice = visibleProductPrice(product);
  const pricePrefix =
    visiblePrice.mode === "exact"
      ? publicPriceLabel(visiblePrice.label)
      : visiblePrice.mode === "starting_at"
        ? "From"
        : visiblePrice.mode === "sale_reference"
          ? "Now from"
          : visiblePrice.mode === "local_reference"
            ? "Local from"
            : "MSRP from";
  const imageClassName =
    product.brandId === "puffy" || product.brandId === "nectar" || product.brandId === "bedgear"
      ? "object-cover object-center transition duration-500 group-hover:scale-[1.03]"
      : "object-contain p-6 transition duration-500 group-hover:scale-[1.04]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/mattresses/${product.id}`} className="block">
        <div className="relative aspect-[5/4] overflow-hidden bg-[#f1f3f6]">
          <Image
            src={product.image}
            alt={product.model}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className={imageClassName}
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-[#cf2333] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white shadow-sm">
              {product.badge}
            </span>
          ) : null}
          <div className="absolute bottom-4 left-4 rounded-md bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-slate-500">
              {pricePrefix}
            </p>
            <p className="text-2xl font-black tracking-tight text-slate-950">
              {visiblePrice.amount}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-500">
            {product.brand} / {product.category}
          </p>
          <Link href={`/mattresses/${product.id}`} className="mt-2 block">
            <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 transition group-hover:text-[#cf2333]">
              {product.model}
            </h2>
          </Link>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            {product.feel ?? product.type}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-2 text-sm">
          <Spec label="Type" value={product.type} />
          <Spec label="Firmness" value={product.firmness ?? "Ask"} />
          {product.height ? <Spec label="Height" value={product.height} /> : null}
          {product.warranty ? <Spec label="Warranty" value={product.warranty} /> : null}
        </dl>

        <ul className="mt-5 grid gap-2.5 text-sm leading-5 text-slate-700">
          {product.keyFeatures.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cf2333]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="rounded-md border border-slate-200 bg-[#fbfaf4] p-4">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#b78200]">
              {publicPriceLabel(visiblePrice.label)}
            </p>
            <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              {visiblePrice.amount}
            </p>
            {product.promo?.value ? (
              <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-[#cf2333]">
                {publicPromoSummary(product.promo)}
              </p>
            ) : (
              <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                Updated {visiblePrice.asOf}
              </p>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <TrackedLink
              href={`/mattresses/${product.id}`}
              eventName="product_detail_click"
              eventLabel={product.id}
              className="rounded border border-slate-300 px-3 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
            >
              Details
            </TrackedLink>
            <TrackedLink
              href="tel:2704951603"
              eventName="phone_click"
              eventLabel={`product_card_${product.id}`}
              className="rounded bg-[#f2b705] px-3 py-3 text-center text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#ffd24d]"
            >
              Call
            </TrackedLink>
          </div>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-bold text-slate-950">{value}</dd>
    </div>
  );
}

export function ProductGrid({
  products,
  priorityCount = 0,
}: {
  products: Product[];
  priorityCount?: number;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}
