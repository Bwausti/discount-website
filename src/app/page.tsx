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
      <section className="bg-[#fbfaf4] px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-5 xl:grid-cols-[0.72fr_1.9fr]">
          <div className="flex min-h-[430px] flex-col justify-center rounded-[26px] bg-[#f4f2ea] p-6 md:p-8 xl:min-h-[500px]">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b98100]">
              Bowling Green, KY
            </p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-[0.94] tracking-tight text-slate-950 md:text-5xl xl:text-[3.9rem]">
              Get your best night&apos;s sleep.
            </h1>
            <p className="mt-5 max-w-md text-base font-semibold leading-7 text-slate-800 xl:text-lg">
              Explore award-winning mattresses from Puffy, Helix, Nectar, DreamCloud, and more
              with local showroom help.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/collections"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#f2b705] px-6 py-3.5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#dba300] sm:w-fit sm:min-w-56"
              >
                Shop best mattresses
              </Link>
              <a
                href={storeInfo.primaryPhoneHref}
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate-950 bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-slate-950 hover:text-white sm:w-fit sm:min-w-56"
              >
                Call for today&apos;s price
              </a>
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-[26px] bg-[#ebe7df] xl:min-h-[500px]">
            <Image
              src="/brand-assets/puffy/woman-on-puffy-bed.jpg"
              alt="Woman relaxing on a Puffy mattress"
              fill
              priority
              sizes="(min-width: 1280px) 68vw, 100vw"
              className="object-cover object-[42%_52%]"
            />
            <div className="absolute inset-x-0 top-0 flex justify-end p-6 md:p-8">
              <div className="max-w-[17rem] text-right md:max-w-xs">
                <p className="text-xl font-black leading-tight text-slate-950 md:text-2xl">
                  Puffy Monarch comfort, local Discount Mattress pricing.
                </p>
                <Link
                  href="/mattresses/puffy-monarch"
                  className="mt-4 inline-flex items-center gap-2 text-base font-black text-slate-950 transition hover:text-[#b98100]"
                >
                  View Monarch <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/70 bg-white/90 p-3 shadow-2xl backdrop-blur md:left-auto md:right-6 md:w-[340px]">
              <div className="grid grid-cols-[96px_1fr] gap-3">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f4f2ea]">
                  <Image
                    src="/product-assets/puffy/puffy-monarch-1.jpg"
                    alt="Puffy Monarch mattress"
                    fill
                    sizes="120px"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b98100]">
                    Featured model
                  </p>
                  <h2 className="mt-1 text-lg font-black text-slate-950">Puffy Monarch</h2>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
                    16&quot; ultra-luxury hybrid with a plush, premium feel.
                  </p>
                  <Link
                    href="/collections/puffy"
                    className="mt-2 inline-flex text-xs font-black text-slate-950 underline decoration-[#f2b705] decoration-4 underline-offset-4"
                  >
                    See Puffy collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dedbd2] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-center text-sm font-black text-slate-900 sm:px-6 md:grid-cols-3 lg:px-8">
          <p>Call or visit for current pricing</p>
          <p>Compare national and specialty brands in person</p>
          <p>Two local showrooms in Bowling Green</p>
        </div>
      </section>

      <section id="brands" className="bg-[#f2efe5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionIntro
              align="left"
              eyebrow="Brands"
              title="Online favorites, fitted locally."
              body="Start with brands people already trust, then use our Bowling Green showroom team to compare comfort, support, and what is actually available today."
            />
            <div className="grid grid-cols-3 overflow-hidden rounded-[24px] border border-[#dedbd2] bg-white text-center shadow-sm">
              <div className="p-5">
                <p className="text-3xl font-black text-slate-950">12+</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  Brands
                </p>
              </div>
              <div className="border-x border-[#dedbd2] p-5">
                <p className="text-3xl font-black text-slate-950">2</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  Stores
                </p>
              </div>
              <div className="p-5">
                <p className="text-3xl font-black text-slate-950">0</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  Cart pressure
                </p>
              </div>
            </div>
          </div>
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
