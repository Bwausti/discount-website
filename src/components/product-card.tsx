import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const startingPrice = product.priceVariants?.[0]?.amount ?? product.onlinePrice?.amount;
  const imageClassName =
    product.id === "puffy-monarch"
      ? "scale-[1.18] object-cover object-[50%_22%] transition duration-500 group-hover:scale-[1.22]"
      : "object-contain p-6 transition duration-500 group-hover:scale-[1.04]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#dedbd2] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
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
          {startingPrice ? (
            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-slate-500">
                From
              </p>
              <p className="text-2xl font-black tracking-tight text-slate-950">
                {startingPrice}
              </p>
            </div>
          ) : null}
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
          <div className="rounded-2xl border border-[#dedbd2] bg-[#fbfaf4] p-4">
            {startingPrice ? (
              <>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#b78200]">
                  Prices
                </p>
                <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                  From {startingPrice}
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                  See size pricing on the product page, then call for today&apos;s local showroom
                  offer.
                </p>
              </>
            ) : (
              <>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#b78200]">
                  Local price
                </p>
                <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                  Call or visit
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                  Current price depends on size, floor stock, and local offers.
                </p>
              </>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={`/mattresses/${product.id}`}
              className="rounded-full border border-slate-300 px-3 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
            >
              Details
            </Link>
            <a
              href="tel:2704951603"
              className="rounded-full bg-[#f2b705] px-3 py-3 text-center text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#ffd24d]"
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
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
