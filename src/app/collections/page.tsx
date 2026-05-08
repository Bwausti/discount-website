import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product-card";
import { BrandLogoGrid, LeadCta, PageShell, SectionIntro } from "@/components/site-shell";
import { brands, featuredBrands, productCategories, products } from "@/lib/products";

export const metadata = {
  title: "Mattress Brands and Models",
  description:
    "Browse Discount Mattress brands, mattresses, adjustable bases, pillows, and protectors with prices shown before you visit.",
};

export default function CollectionsPage() {
  const primaryProducts = products.filter((product) => {
    const brand = brands.find((item) => item.id === product.brandId);
    return brand?.status !== "ask-in-store";
  });

  return (
    <PageShell>
      <section id="top" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionIntro
            align="left"
            eyebrow="Mattresses"
            title="Shop the brands first. Then try the right feel in store."
            body="Use this page to see what we carry, what it costs, and which choices are worth trying first."
          />
          <div className="relative aspect-[16/10] overflow-hidden rounded border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src="/brand-assets/discount-mattress/hero-bed.jpg"
              alt="Mattress and bedding display"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#162b49] px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-bold">
            Compare prices before you visit. Call or stop in to confirm today&apos;s offers and what is on the floor.
          </p>
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replaceAll(" ", "-")}`}
                className="rounded border border-white/25 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Brands"
            title="Start with brands you already know."
            body="Then compare comfort and support in person so you can feel the difference."
          />
          <div className="mt-10">
            <BrandLogoGrid brands={featuredBrands} />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionIntro
              align="left"
              eyebrow="Brand pages"
              title="Choose a brand to explore."
              body="Each brand page shows prices, comfort choices, and the easiest next step for a local visit."
            />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {productCategories.map((category) => {
        const categoryProducts = primaryProducts.filter((product) => product.category === category);
        if (categoryProducts.length === 0) return null;

        return (
          <section
            key={category}
            id={category.toLowerCase().replaceAll(" ", "-")}
            className="px-4 py-16 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <SectionIntro
                  align="left"
                  eyebrow={category}
                  title={`${category} options`}
                  body="Use these cards to pick what you want to try, then call or visit to confirm today&apos;s offers and floor availability."
                />
                <a
                  href="#top"
                  className="rounded border border-slate-300 px-4 py-2 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
                >
                  Back to top
                </a>
              </div>
              <ProductGrid products={categoryProducts} />
            </div>
          </section>
        );
      })}

      <LeadCta
        title="Have a model in mind?"
        body="Call the store before you drive over. The team can confirm current offers, floor models, and which location is best for what you want to try."
      />
    </PageShell>
  );
}

function BrandCard({ brand }: { brand: (typeof brands)[number] }) {
  return (
    <Link
      href={`/collections/${brand.id}`}
      className="group overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {brand.heroImage ? (
          <Image
            src={brand.heroImage}
            alt={`${brand.name} collection`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">
            {brand.status === "ask-in-store" ? "Ask in store" : `${brand.products.length} models`}
          </p>
          <h2 className="mt-1 text-2xl font-black text-white">{brand.name}</h2>
        </div>
      </div>
      <div className="p-5">
        <p className="font-bold text-slate-950">{brand.tagline}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{brand.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {brand.collectionHighlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="rounded bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
