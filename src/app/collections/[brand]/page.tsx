import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HelixCollectionChooser } from "@/components/helix-collection-chooser";
import { ProductGrid } from "@/components/product-card";
import { LeadCta, LocationCards, PageShell } from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
import { brands, getBrandById, productsForGroup, sleepSystemAddOns, storeInfo } from "@/lib/products";
import type { Brand, Product, ProductGroup } from "@/lib/products";

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
  const heroProductIds =
    brand.id === "helix"
      ? ["helix-midnight", "helix-midnight-luxe", "helix-midnight-elite"]
      : brand.products.slice(0, 3).map((product) => product.id);
  const heroProducts = heroProductIds
    .map((id) => brand.products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
  const showSleepSystemAddOns =
    brand.products.some((product) => product.category === "Mattress") &&
    brand.id !== "bedgear" &&
    brand.id !== "bedtech";
  const groupedProductIds = new Set(brand.productGroups.flatMap((group) => group.productIds));
  const ungroupedProducts = brand.products.filter((product) => !groupedProductIds.has(product.id));

  return (
    <PageShell>
      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-lg bg-slate-950 shadow-sm">
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
                <div className="inline-flex min-h-16 w-fit max-w-[230px] items-center rounded-md bg-white/92 px-5 py-3 shadow-xl backdrop-blur">
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
                    Available in Bowling Green
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
                        className="rounded bg-white/14 px-3 py-1.5 text-xs font-black text-white ring-1 ring-white/18 backdrop-blur"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <TrackedLink
                      href={storeInfo.primaryPhoneHref}
                      eventName="phone_click"
                      eventLabel={`collection_${brand.id}_phone`}
                      className="inline-flex items-center justify-center rounded bg-[#f2b705] px-6 py-3.5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#ffd24d]"
                    >
                      Call {storeInfo.primaryPhone}
                    </TrackedLink>
                    <TrackedLink
                      href="/locations"
                      eventName="directions_click"
                      eventLabel={`collection_${brand.id}_visit_showroom`}
                      className="inline-flex items-center justify-center rounded border border-white/45 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                    >
                      Visit a showroom
                    </TrackedLink>
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <div className="w-full rounded-lg border border-white/15 bg-white/94 p-4 shadow-2xl backdrop-blur md:p-5">
                  <p className="max-w-xl text-lg font-black leading-7 text-slate-950">
                    {brand.showroomNote}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {heroProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/mattresses/${product.id}`}
                        className="group overflow-hidden rounded-md bg-[#f4f2ea] transition hover:-translate-y-0.5 hover:bg-[#eee9dc]"
                      >
                        <div className="relative aspect-[5/4] overflow-hidden bg-[#ebe7df]">
                          <Image
                            src={product.image}
                            alt={product.model}
                            fill
                            sizes="180px"
                            className={
                              product.brandId === "puffy" ||
                              product.brandId === "nectar" ||
                              product.brandId === "bedgear"
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
          <Metric label="Try" value={brand.status === "ask-in-store" ? "Call first" : "In store"} />
          <Metric label="Prices" value="Shown" />
        </div>
      </section>

      {brand.productGroups.length > 0 && brand.id !== "helix" ? (
        <CollectionJumpNav brand={brand} />
      ) : null}

      <section className="bg-[#f7f6f1] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {brand.collectionHighlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm"
            >
              {highlight}
            </span>
          ))}
        </div>
      </section>

      {brand.id === "helix" ? <HelixBrandStory /> : null}

      {brand.id === "helix" ? (
        <HelixCollectionChooser
          choices={brand.productGroups.map((group) => ({
            group,
            products: productsForGroup(brand, group),
          }))}
        />
      ) : (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
                  Choices
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                  Choose what you want to try.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Pick a few that look right, then call to confirm today&apos;s offers and which
                  location has the best options to try.
                </p>
              </div>
              <Link
                href="/collections"
                className="rounded border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
              >
                All brands
              </Link>
            </div>
            {brand.productGroups.length > 0 ? (
              <div className="grid gap-12">
                {brand.productGroups.map((group, index) => (
                  <ProductGroupSection
                    key={group.id}
                    brand={brand}
                    group={group}
                    priorityCount={index === 0 ? 3 : 0}
                  />
                ))}
                {ungroupedProducts.length > 0 ? (
                  <CollectionProductGroup
                    eyebrow="Other models"
                    title="More choices to ask about."
                    body="Call before you visit so the store can confirm whether these are available to try."
                    products={ungroupedProducts}
                  />
                ) : null}
              </div>
            ) : (
              <ProductGrid products={brand.products} priorityCount={3} />
            )}
          </div>
        </section>
      )}

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
                More ways to get to know {brand.name}.
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
              The team can tell you which location is best for {brand.name}, today&apos;s offers, and
              what other mattresses are worth trying side by side.
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

function CollectionJumpNav({ brand }: { brand: Brand }) {
  return (
    <section className="sticky top-[129px] z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:top-[113px] lg:px-8">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
        {brand.productGroups.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            className="shrink-0 rounded border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm transition hover:border-[#cf2333] hover:text-[#cf2333]"
          >
            {group.name.replace(" Collection", "")}
          </a>
        ))}
      </div>
    </section>
  );
}

function ProductGroupSection({
  brand,
  group,
  priorityCount = 0,
}: {
  brand: Brand;
  group: ProductGroup;
  priorityCount?: number;
}) {
  const products = productsForGroup(brand, group);

  return (
    <CollectionProductGroup
      id={group.id}
      eyebrow={group.eyebrow}
      title={group.name}
      body={group.description}
      products={products}
      priorityCount={priorityCount}
    />
  );
}

function HelixBrandStory() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src="/brand-assets/helix/lifestyle.jpg"
              alt="Helix mattress lifestyle setting"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Helix brand story
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              A mattress line built around how you actually sleep.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Helix became known for matching mattress feel to sleep position instead of forcing
              every shopper into one universal bed. The line is organized around side, back,
              stomach, and plus-support needs, then stepped into Core, Luxe, and Elite builds.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              In the showroom, that makes Helix a practical comparison brand: choose the build
              level first, then test the soft, medium, or firm feel that matches how you sleep.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Side sleeper path", "Sunset and Midnight start the pressure-relief comparison."],
              ["Balanced support", "Moonlight and Dusk cover the middle comfort range."],
              ["Firmer support", "Dawn and Twilight are the firmer Helix showroom options."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded border border-slate-200 bg-[#f7f6f1] p-4">
                <h3 className="text-sm font-black text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
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
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  products: Product[];
  priorityCount?: number;
}) {
  if (products.length === 0) return null;

  return (
    <section
      id={id}
      className="scroll-mt-40 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
            {eyebrow}
          </p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            {title}
          </h3>
        </div>
        <p className="text-base font-semibold leading-7 text-slate-600">{body}</p>
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
