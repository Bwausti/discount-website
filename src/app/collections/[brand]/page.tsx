import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { LeadCta, LocationCards, PageShell } from "@/components/site-shell";
import { brands, getBrandById, sleepSystemAddOns, storeInfo } from "@/lib/products";

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
  const heroProducts = brand.products.slice(0, 3);
  const showSleepSystemAddOns =
    brand.products.some((product) => product.category === "Mattress") &&
    brand.id !== "bedgear" &&
    brand.id !== "bedtech";

  return (
    <PageShell>
      <section className="bg-[#fbfaf4] px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-5 xl:grid-cols-[0.78fr_1.55fr]">
          <div className="flex flex-col justify-center rounded-[26px] bg-[#f4f2ea] p-6 md:p-8 xl:min-h-[510px]">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b98100]">
              Bowling Green collection
            </p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-5xl xl:text-[4.15rem]">
              {brand.name} mattresses
            </h1>
            <p className="mt-5 text-xl font-black leading-8 text-slate-950">{brand.tagline}</p>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-700">
              {brand.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {brand.collectionHighlights.slice(0, 3).map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-800 shadow-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={storeInfo.primaryPhoneHref}
                className="inline-flex items-center justify-center rounded-full bg-[#f2b705] px-6 py-3.5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#dba300]"
              >
                Call for today&apos;s price
              </a>
              <Link
                href="/locations"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-950 bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-slate-950 hover:text-white"
              >
                Visit a showroom
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] bg-white p-3 shadow-sm xl:min-h-[510px]">
            <div className="relative min-h-[360px] overflow-hidden rounded-[22px] bg-[#ebe7df] xl:min-h-[484px]">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={`${brand.name} mattress collection`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 58vw, 100vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-white/20" />
            </div>
            <div className="absolute left-6 top-6 flex min-h-28 w-[min(270px,calc(100%-48px))] items-center rounded-[22px] bg-white/94 px-6 shadow-xl backdrop-blur">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={250}
                  height={110}
                  unoptimized
                  className="max-h-20 w-auto max-w-full object-contain"
                />
              ) : (
                <p className="text-2xl font-black text-slate-950">{brand.name}</p>
              )}
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="grid overflow-hidden rounded-[22px] bg-white/94 shadow-xl backdrop-blur md:grid-cols-[0.75fr_1.25fr]">
                <div className="border-b border-[#dedbd2] p-5 md:border-b-0 md:border-r">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b98100]">
                    Showroom note
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
                    {brand.showroomNote}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 p-3">
                  {heroProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/mattresses/${product.id}`}
                      className="group rounded-2xl bg-[#f4f2ea] p-2 transition hover:bg-[#ede8dc]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
                        <Image
                          src={product.image}
                          alt={product.model}
                          fill
                          sizes="160px"
                          className={
                            product.id === "puffy-monarch"
                              ? "object-cover object-[50%_30%] transition group-hover:scale-[1.03]"
                              : "object-contain p-2 transition group-hover:scale-[1.03]"
                          }
                        />
                      </div>
                      <p className="mt-2 truncate text-xs font-black text-slate-950">
                        {product.model}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dedbd2] bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
          <Metric label="Models" value={`${brand.products.length}`} />
          <Metric label="Shop" value={brand.status === "ask-in-store" ? "Confirm" : "Featured"} />
          <Metric label="Pricing" value="Call or visit" />
        </div>
      </section>

      <section className="bg-[#f2efe5] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {brand.collectionHighlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm"
            >
              {highlight}
            </span>
          ))}
        </div>
      </section>

      {brand.id === "helix" ? <HelixCollectionGuide /> : null}

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

      {showSleepSystemAddOns ? (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
                Complete the setup
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                Pair your mattress with a base or pillow.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Try the mattress with an adjustable base and a fitted pillow so the showroom
                comparison feels closer to how you will actually sleep at home.
              </p>
            </div>
            <ProductGrid products={sleepSystemAddOns} />
          </div>
        </section>
      ) : null}

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

function HelixCollectionGuide() {
  const collectionCards = [
    {
      name: "Core",
      detail: "11.5 in hybrids in soft, medium, and firm feels.",
      points: ["Sunset, Moonlight, Midnight", "Dusk, Dawn, Twilight", "Best value path"],
    },
    {
      name: "Luxe",
      detail: "13.5 in pillow top upgrades with more support choices.",
      points: ["All six main feels", "ErgoAlign option", "GlacioTex cooling options"],
    },
    {
      name: "Elite",
      detail: "15 in luxury builds with premium cooling and contouring.",
      points: ["All six main feels", "ErgoAlign included", "GlacioTex Elite cooling"],
    },
    {
      name: "Plus",
      detail: "Extra-supportive options for plus-size sleepers.",
      points: ["Helix Plus", "Plus Luxe", "Plus Elite"],
    },
  ];

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
            Helix lineup
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Core, Luxe, Elite, and Plus are all listed.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Start with your sleep position and firmness, then compare support and cooling upgrades
            in the showroom.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {collectionCards.map((card) => (
            <article
              key={card.name}
              className="rounded-[24px] border border-[#dedbd2] bg-[#fbfaf4] p-5 shadow-sm"
            >
              <h3 className="text-3xl font-black tracking-tight text-slate-950">{card.name}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                {card.detail}
              </p>
              <ul className="mt-5 grid gap-2 text-sm font-bold text-slate-900">
                {card.points.map((point) => (
                  <li key={point} className="rounded-full bg-white px-3 py-2">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
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
