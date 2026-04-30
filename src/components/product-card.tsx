import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/mattresses/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.model}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-contain p-5 transition duration-500 group-hover:scale-[1.03]"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded bg-[#cf2333] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            {product.brand} / {product.category}
          </p>
          <Link href={`/mattresses/${product.id}`} className="mt-2 block">
            <h2 className="text-xl font-black leading-tight text-slate-950 transition group-hover:text-[#cf2333]">
              {product.model}
            </h2>
          </Link>
          <p className="mt-2 text-sm font-semibold text-slate-600">{product.feel ?? product.type}</p>
        </div>

        <dl className="grid grid-cols-2 gap-2 text-sm">
          <Spec label="Type" value={product.type} />
          <Spec label="Firmness" value={product.firmness ?? "Ask"} />
          {product.height ? <Spec label="Height" value={product.height} /> : null}
          {product.warranty ? <Spec label="Warranty" value={product.warranty} /> : null}
        </dl>

        <ul className="mt-5 grid gap-2 text-sm leading-5 text-slate-700">
          {product.keyFeatures.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cf2333]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <p className="rounded bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">
            Call for today&apos;s price
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={`/mattresses/${product.id}`}
              className="rounded border border-slate-300 px-3 py-2 text-center text-sm font-bold text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
            >
              Details
            </Link>
            <a
              href="tel:2704951603"
              className="rounded bg-[#162b49] px-3 py-2 text-center text-sm font-bold text-white transition hover:bg-[#223d63]"
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
    <div className="rounded bg-slate-50 p-3">
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
