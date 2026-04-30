import Image from "next/image";
import Link from "next/link";
import {
  BrandLogoGrid,
  LeadCta,
  LocationCards,
  PageShell,
  SectionIntro,
} from "@/components/site-shell";
import { ProductGrid } from "@/components/product-card";
import { featuredBrands, featuredProducts, storeInfo } from "@/lib/products";

const fitTiles = [
  {
    title: "Pressure relief",
    copy: "Soft and medium mattresses for side sleepers who wake up sore.",
    href: "/collections/helix",
  },
  {
    title: "Cooling comfort",
    copy: "Nectar, Puffy, Serta, and Bedgear options built for warmer sleepers.",
    href: "/collections/nectar",
  },
  {
    title: "Luxury feel",
    copy: "DreamCloud, Posh and Lavish, PranaSleep, and Puffy premium models.",
    href: "/collections/dreamcloud",
  },
  {
    title: "Organic materials",
    copy: "Naturepedic choices for shoppers who want organic cotton, wool, and latex.",
    href: "/collections/naturepedic",
  },
  {
    title: "Adjustable bases",
    copy: "BedTech bases that make reading, watching TV, and relaxing easier.",
    href: "/collections/bedtech",
  },
  {
    title: "Pillows and protectors",
    copy: "Bedgear accessories to complete and protect the mattress purchase.",
    href: "/collections/bedgear",
  },
];

export default function Home() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-[#101827]">
        <Image
          src="/brand-assets/discount-mattress/hero-bed.jpg"
          alt="Comfortable mattress showroom styling"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08111f] via-[#08111f]/80 to-[#08111f]/35" />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[640px] lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-black uppercase tracking-[0.26em] text-white/75">
              Bowling Green, Kentucky
            </p>
            <h1 className="mt-5 text-balance text-5xl font-black tracking-tight md:text-7xl">
              Discount Mattress
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-100">
              Try the brands people research online, then buy with local help, current showroom
              pricing, and two Bowling Green locations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/collections"
                className="rounded bg-[#cf2333] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg transition hover:bg-[#a91c2a]"
              >
                Browse mattresses
              </Link>
              <a
                href={storeInfo.primaryPhoneHref}
                className="rounded border border-white/45 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
              >
                Call for price
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-sm font-bold text-slate-700 sm:px-6 md:grid-cols-3 lg:px-8">
          <p>Call or visit for current pricing.</p>
          <p>Compare national and specialty brands in person.</p>
          <p>Two local showrooms in Bowling Green.</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Brands"
            title="The online names, the local showroom help."
            body="Start with the brands people already trust, then narrow the decision by comfort, support, and what is actually available today."
          />
          <div className="mt-10">
            <BrandLogoGrid brands={featuredBrands.slice(0, 12)} />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionIntro
              align="left"
              eyebrow="Featured"
              title="Good places to start."
              body="A focused set of best-fit models and categories for the first showroom conversation."
            />
            <Link
              href="/collections"
              className="rounded border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
            >
              View full catalog
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featuredProducts} priorityCount={3} />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Shop by fit"
            title="A faster way to find the right floor model."
            body="Most shoppers do not need endless rows. They need the right comfort path and a person who knows how to compare them."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fitTiles.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group rounded border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#cf2333] hover:shadow-lg"
              >
                <h2 className="text-xl font-black text-slate-950 group-hover:text-[#cf2333]">
                  {tile.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{tile.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded border border-slate-200 bg-slate-100 shadow-sm lg:aspect-[5/4]">
            <Image
              src="/brand-assets/discount-mattress/storefront.jpg"
              alt="Discount Mattress storefront"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Local showroom
            </p>
            <h2 className="mt-3 text-balance text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Built around calls, visits, and real comfort testing.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "No checkout cart or fake online inventory.",
                "Clear call-for-price paths on every model.",
                "Brand pages that help shoppers compare before visiting.",
                "Policy and warranty language that stays store-confirmed.",
              ].map((item) => (
                <div key={item} className="rounded border border-slate-200 bg-[#f7f8fb] p-4">
                  <p className="text-sm font-bold leading-6 text-slate-800">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/locations"
                className="rounded bg-[#162b49] px-6 py-3 text-center text-sm font-black text-white transition hover:bg-[#223d63]"
              >
                Find a showroom
              </Link>
              <Link
                href="/faq"
                className="rounded border border-slate-300 px-6 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
              >
                Read FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <SectionIntro
              align="left"
              eyebrow="Visit"
              title="Two Bowling Green locations."
              body="Call ahead for current pricing, model availability, delivery questions, and policy details."
            />
            <LocationCards compact />
          </div>
        </div>
      </section>

      <LeadCta />
    </PageShell>
  );
}
