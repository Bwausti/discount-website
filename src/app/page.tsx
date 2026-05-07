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
import { TrackedLink } from "@/components/tracked-link";
import { featuredBrands, featuredProducts, sleepSystemAddOns, storeInfo } from "@/lib/products";

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
      <section className="bg-white px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="py-4 lg:py-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#cf2333]">
              Discount Mattress • Bowling Green, KY
            </p>
            <h1 className="mt-5 text-balance text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-6xl xl:text-[4.75rem]">
              Better sleep starts in store.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
              Shop trusted brands, compare real comfort, and find the right fit locally.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/collections"
                eventName="collection_click"
                eventLabel="home_hero_browse_mattresses"
                className="inline-flex items-center justify-center rounded bg-[#f2b705] px-6 py-3.5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#dba300]"
              >
                Browse mattresses
              </TrackedLink>
              <TrackedLink
                href={storeInfo.primaryPhoneHref}
                eventName="phone_click"
                eventLabel="home_hero_phone"
                className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:border-slate-950"
              >
                Call {storeInfo.primaryPhone}
              </TrackedLink>
              <TrackedLink
                href="/locations"
                eventName="directions_click"
                eventLabel="home_hero_locations"
                className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:border-slate-950"
              >
                Get directions
              </TrackedLink>
            </div>
            <div className="mt-10 grid gap-3 text-sm font-black text-slate-900 sm:grid-cols-3">
              <div className="border-l-4 border-[#cf2333] bg-slate-50 px-4 py-3">
                Nationwide price guarantee
              </div>
              <div className="border-l-4 border-[#f2b705] bg-slate-50 px-4 py-3">
                Two local showrooms
              </div>
              <div className="border-l-4 border-[#162b49] bg-slate-50 px-4 py-3">
                Help choosing the right feel
              </div>
            </div>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-lg bg-slate-100 shadow-sm lg:min-h-[620px]">
            <Image
              src="/hero.jpg"
              alt="Young couple sitting on a Puffy Monarch mattress"
              fill
              priority
              sizes="(min-width: 1280px) 68vw, 100vw"
              className="object-cover object-[52%_50%]"
            />
            <div className="absolute inset-x-0 top-0 flex justify-end p-6 md:p-8">
              <div className="max-w-[17rem] text-right md:max-w-xs">
                <p className="text-xl font-black leading-tight text-white md:text-2xl md:text-slate-950">
                  Check out our best sellers before coming into the store.
                </p>
                <Link
                  href="/collections"
                  className="mt-4 inline-flex items-center gap-2 text-base font-black text-white transition hover:text-[#f2b705] md:text-slate-950 md:hover:text-[#b98100]"
                >
                  View best sellers <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/70 bg-white/90 p-3 shadow-2xl backdrop-blur md:left-auto md:right-6 md:w-[340px]">
              <div className="grid grid-cols-[96px_1fr] gap-3">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f4f2ea]">
                  <Image
                    src="/brand-assets/puffy-refresh/monarch-card.png"
                    alt="Puffy Monarch mattress"
                    fill
                    sizes="120px"
                    className="object-contain p-2"
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
          <p>Nationwide price guarantee</p>
          <p>Compare national and specialty brands in person</p>
          <p>Two local showrooms in Bowling Green</p>
        </div>
      </section>

      <section id="brands" className="bg-[#f7f6f1] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionIntro
              align="left"
              eyebrow="Brands"
              title="Popular mattress brands, fitted locally."
              body="Start with brands you already know, then get local help comparing comfort, support, and what is available today."
            />
            <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-slate-200 bg-white text-center shadow-sm">
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
                <p className="text-3xl font-black text-slate-950">$</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  Strong value
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
              body="A smaller set of strong choices so your first visit starts in the right place."
            />
            <Link
              href="/collections"
              className="rounded border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
            >
              See all mattresses
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featuredProducts} priorityCount={3} />
          </div>
        </div>
      </section>

      <section className="bg-[#f2efe5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionIntro
              align="left"
              eyebrow="Add-ons"
              title="Finish the sleep setup."
              body="A great mattress feels better when the base and pillow match how you sleep. Try these with your shortlist in store."
            />
            <Link
              href="/collections/bedgear"
              className="rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
            >
              View accessories
            </Link>
          </div>
          <ProductGrid products={sleepSystemAddOns} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Shop by fit"
            title="A faster way to find the right floor model."
              body="Start with how you sleep, then narrow the choices before you come in."
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
              Local help
            </p>
            <h2 className="mt-3 text-balance text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Built around national brands, store visits, and real comfort testing.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Nationwide price guarantee on comparable mattresses.",
                "Easy ways to call, visit, and compare.",
                "Brand pages that help shoppers compare before visiting.",
                "Friendly help with comfort, delivery, and warranty questions.",
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
              body="Call ahead to confirm today's local offers, model availability, delivery questions, and policy details."
            />
            <LocationCards compact />
          </div>
        </div>
      </section>

      <LeadCta />
    </PageShell>
  );
}
