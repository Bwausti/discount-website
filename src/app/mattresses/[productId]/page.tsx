import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { LeadCta, LocationCards, PageShell } from "@/components/site-shell";
import { getBrandById, getProductById, products, storeInfo } from "@/lib/products";

interface PageProps {
  params: Promise<{ productId: string }>;
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
    description: `See ${product.model} details from ${product.brand}. Call Discount Mattress in Bowling Green for current pricing and showroom availability.`,
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

  return (
    <PageShell>
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded border border-slate-200 bg-slate-100 shadow-sm">
              <Image
                src={product.image}
                alt={product.model}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-contain p-8"
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
                    className="relative aspect-[4/3] overflow-hidden rounded border border-slate-200 bg-slate-100"
                  >
                    <Image
                      src={image}
                      alt={`${product.model} detail`}
                      fill
                      sizes="(min-width: 1024px) 18vw, 33vw"
                      className="object-contain p-3"
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
            </div>
            <h1 className="text-balance text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
              {product.model}
            </h1>
            <p className="mt-5 text-xl font-semibold leading-8 text-slate-600">
              {product.feel ?? product.type}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">{product.availability}</p>

            <div className="mt-8 rounded border border-slate-200 bg-[#f7f8fb] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#cf2333]">
                Local purchase path
              </p>
              <p className="mt-3 text-2xl font-black text-slate-950">Call for today&apos;s price.</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Discount Mattress does not need an online cart here. The best next step is to call
                or visit so the team can confirm size, availability, delivery, and current offers.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href={storeInfo.primaryPhoneHref}
                  className="rounded bg-[#cf2333] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#a91c2a]"
                >
                  Call {storeInfo.primaryPhone}
                </a>
                <Link
                  href="/locations"
                  className="rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
                >
                  Get directions
                </Link>
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
              Use this as a starting point. Comfort is personal, and the showroom comparison is the
              point of the site.
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

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Try locally
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Ask which showroom is best.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Inventory and floor models can change. Calling first makes the visit easier.
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

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-4 shadow-sm">
      <dt className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</dt>
      <dd className="mt-2 text-lg font-black text-slate-950">{value}</dd>
    </div>
  );
}
