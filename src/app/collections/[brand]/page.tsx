import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { LeadCta, LocationCards, PageShell } from "@/components/site-shell";
import { brands, getBrandById, storeInfo } from "@/lib/products";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return brands.map((brand) => ({
    brand: brand.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { brand: brandId } = await params;
  const brand = getBrandById(brandId);
  if (!brand) return {};

  return {
    title: `${brand.name} Mattresses`,
    description: `${brand.tagline} Browse ${brand.name} models at Discount Mattress in Bowling Green, KY.`,
  };
}

export default async function BrandCollectionPage({ params }: PageProps) {
  const { brand: brandId } = await params;
  const brand = getBrandById(brandId);

  if (!brand) {
    notFound();
  }

  const heroImage = brand.heroImage ?? brand.products[0]?.image;

  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-[#101827]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={`${brand.name} mattress collection`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08111f] via-[#08111f]/82 to-[#08111f]/35" />
        <div className="relative mx-auto grid min-h-[480px] max-w-7xl gap-10 px-4 py-16 text-white sm:px-6 lg:grid-cols-[1.1fr_0.7fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.26em] text-white/70">
              Discount Mattress collection
            </p>
            <h1 className="mt-5 text-balance text-5xl font-black tracking-tight md:text-7xl">
              {brand.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-slate-100">{brand.tagline}</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">{brand.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={storeInfo.primaryPhoneHref}
                className="rounded bg-[#cf2333] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#a91c2a]"
              >
                Call for price
              </a>
              <Link
                href="/locations"
                className="rounded border border-white/45 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
              >
                Visit store
              </Link>
            </div>
          </div>
          <div className="rounded border border-white/20 bg-white/95 p-6 shadow-2xl">
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={280}
                height={120}
                unoptimized
                className="mx-auto max-h-24 w-auto object-contain"
              />
            ) : (
              <p className="text-center text-3xl font-black text-slate-950">{brand.name}</p>
            )}
            <div className="mt-6 grid grid-cols-2 gap-3 text-slate-900">
              <Metric label="Models" value={`${brand.products.length}`} />
              <Metric
                label="Status"
                value={brand.status === "ask-in-store" ? "Confirm" : "Featured"}
              />
            </div>
            <p className="mt-5 rounded bg-slate-100 p-4 text-sm font-semibold leading-6 text-slate-700">
              {brand.showroomNote}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {brand.collectionHighlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded bg-slate-100 px-4 py-2 text-sm font-black text-slate-800"
            >
              {highlight}
            </span>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
                Models
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                {brand.name} options
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Shortlist what looks right, then call to confirm current pricing and which location
                has the best comparison set.
              </p>
            </div>
            <Link
              href="/collections"
              className="rounded border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
            >
              All brands
            </Link>
          </div>
          <ProductGrid products={brand.products} priorityCount={3} />
        </div>
      </section>

      {brand.galleryImages.length > 0 ? (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
                Visual guide
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                Brand details and showroom context.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {brand.galleryImages.slice(0, 6).map((image, index) => (
                <div
                  key={image}
                  className={index === 0 ? "relative aspect-[16/10] overflow-hidden rounded border border-slate-200 bg-slate-100 md:col-span-2" : "relative aspect-[16/10] overflow-hidden rounded border border-slate-200 bg-slate-100"}
                >
                  <Image
                    src={image}
                    alt={`${brand.name} visual ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
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
              Call before you drive.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The team can tell you which location is best for {brand.name}, current prices, and
              what related models are worth trying side by side.
            </p>
          </div>
          <LocationCards compact />
        </div>
      </section>

      <LeadCta
        title={`Want help choosing ${brand.name}?`}
        body="Call the store and describe how you sleep. They can point you toward the right firmness before you arrive."
      />
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-slate-100 p-4 text-center">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
    </div>
  );
}
