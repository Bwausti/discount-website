import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { LeadCta, LocationCards, PageShell } from "@/components/site-shell";
import { brands, getBrandById, sleepSystemAddOns, storeInfo } from "@/lib/products";
import type { Product } from "@/lib/products";

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
  const helixProductSections =
    brand.id === "helix"
      ? [
          {
            id: "core",
            eyebrow: "Core",
            title: "Helix Core",
            body: "The most approachable Helix starting point: six comfort feels plus Helix Plus.",
            products: brand.products.filter(
              (product) => !product.model.includes("Luxe") && !product.model.includes("Elite"),
            ),
          },
          {
            id: "luxe",
            eyebrow: "Luxe",
            title: "Helix Luxe",
            body: "Pillow-top comfort, zoned lumbar support, and more cooling-cover choices.",
            products: brand.products.filter((product) => product.model.includes("Luxe")),
          },
          {
            id: "elite",
            eyebrow: "Elite",
            title: "Helix Elite",
            body: "The tallest Helix builds with premium cooling, contouring, and support upgrades.",
            products: brand.products.filter((product) => product.model.includes("Elite")),
          },
        ].filter((section) => section.products.length > 0)
      : [];

  return (
    <PageShell>
      <section className="bg-[#fbfaf4] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[28px] bg-slate-950 shadow-sm">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={`${brand.name} mattress collection`}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-80"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/15 via-slate-950/35 to-slate-950/92 lg:bg-gradient-to-r lg:from-slate-950/92 lg:via-slate-950/50 lg:to-slate-950/15" />
            <div className="relative z-10 grid min-h-[620px] gap-8 p-5 sm:p-8 lg:min-h-[560px] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
              <div className="flex flex-col justify-between">
                <div className="inline-flex min-h-16 w-fit max-w-[230px] items-center rounded-2xl bg-white/92 px-5 py-3 shadow-xl backdrop-blur">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={220}
                      height={90}
                      unoptimized
                      className="max-h-12 w-auto max-w-full object-contain"
                    />
                  ) : (
                    <p className="text-xl font-black text-slate-950">{brand.name}</p>
                  )}
                </div>

                <div className="max-w-2xl pt-24 lg:pt-12">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f2b705]">
                    Bowling Green collection
                  </p>
                  <h1 className="mt-4 text-balance text-4xl font-black leading-[0.95] tracking-tight text-white md:text-5xl xl:text-[4.5rem]">
                    {brand.name} mattresses
                  </h1>
                  <p className="mt-5 max-w-xl text-xl font-black leading-8 text-white">
                    {brand.tagline}
                  </p>
                  <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-white/78">
                    {brand.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {brand.collectionHighlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full bg-white/14 px-3 py-1.5 text-xs font-black text-white ring-1 ring-white/18 backdrop-blur"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={storeInfo.primaryPhoneHref}
                      className="inline-flex items-center justify-center rounded-full bg-[#f2b705] px-6 py-3.5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#ffd24d]"
                    >
                      Call for today&apos;s price
                    </a>
                    <Link
                      href="/locations"
                      className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                    >
                      Visit a showroom
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <div className="w-full rounded-[24px] border border-white/15 bg-white/92 p-4 shadow-2xl backdrop-blur md:p-5">
                  <p className="max-w-xl text-lg font-black leading-7 text-slate-950">
                    {brand.showroomNote}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {heroProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/mattresses/${product.id}`}
                        className="group overflow-hidden rounded-2xl bg-[#f4f2ea] transition hover:-translate-y-0.5 hover:bg-[#eee9dc]"
                      >
                        <div className="relative aspect-[5/4] overflow-hidden bg-[#ebe7df]">
                          <Image
                            src={product.image}
                            alt={product.model}
                            fill
                            sizes="180px"
                            className={
                              product.brandId === "puffy"
                                ? "object-cover object-center transition group-hover:scale-[1.03]"
                                : "object-contain p-3 transition group-hover:scale-[1.03]"
                            }
                          />
                        </div>
                        <p className="p-3 text-sm font-black leading-tight text-slate-950">
                          {product.model}
                        </p>
                      </Link>
                    ))}
                  </div>
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
          {helixProductSections.length > 0 ? (
            <div className="grid gap-12">
              {helixProductSections.map((section, index) => (
                <CollectionProductGroup
                  key={section.id}
                  id={section.id}
                  eyebrow={section.eyebrow}
                  title={section.title}
                  body={section.body}
                  products={section.products}
                  priorityCount={index === 0 ? 3 : 0}
                />
              ))}
            </div>
          ) : (
            <ProductGrid products={brand.products} priorityCount={3} />
          )}
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
                Brand gallery
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                More ways to compare {brand.name}.
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
              Plan your visit.
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
      href: "#core",
      image: "/product-assets/helix/helix-midnight-1.webp",
      price: "from $799",
    },
    {
      name: "Luxe",
      detail: "13.5 in pillow top upgrades with more support choices.",
      points: ["All six main feels", "ErgoAlign option", "GlacioTex cooling options"],
      href: "#luxe",
      image: "/product-assets/helix/helix-midnight-luxe-2.webp",
      price: "from $1,149",
    },
    {
      name: "Elite",
      detail: "15 in luxury builds with premium cooling and contouring.",
      points: ["All six main feels", "ErgoAlign included", "GlacioTex Elite cooling"],
      href: "#elite",
      image: "/product-assets/helix/helix-midnight-elite-1.png",
      price: "from $1,874",
    },
  ];

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Helix choices
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Start with the Helix comfort level that fits your budget.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Core, Luxe, and Elite all come in soft, medium, and firm feels. Start with the price
              and comfort level, then choose the feel you want to try.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-[#f7f6f1] p-5">
            <p className="text-sm font-black text-slate-950">Need extra support?</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Helix Plus, Plus Luxe, and Plus Elite are grouped with the closest matching comfort
              level so they are easier to find.
            </p>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {collectionCards.map((card) => (
            <a
              key={card.name}
              href={card.href}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#cf2333] hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] bg-[#f1f3f6]">
                <Image
                  src={card.image}
                  alt={`Helix ${card.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight text-slate-950">
                      {card.name}
                    </h3>
                    <p className="mt-1 text-sm font-black uppercase tracking-[0.14em] text-[#cf2333]">
                      {card.price}
                    </p>
                  </div>
                  <span className="rounded bg-slate-950 px-3 py-2 text-xs font-black text-white">
                    View
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                  {card.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.points.map((point) => (
                    <span
                      key={point}
                      className="rounded bg-[#f7f6f1] px-3 py-2 text-xs font-bold text-slate-800"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionProductGroup({
  id,
  eyebrow,
  title,
  body,
  products,
  priorityCount = 0,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  products: Product[];
  priorityCount?: number;
}) {
  return (
    <section id={id} className="scroll-mt-36">
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">{eyebrow}</p>
        <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
          {title}
        </h3>
        <p className="mt-3 text-lg leading-8 text-slate-600">{body}</p>
      </div>
      <ProductGrid products={products} priorityCount={priorityCount} />
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
