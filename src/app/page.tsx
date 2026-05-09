import Image from "next/image";
import Link from "next/link";
import {
  BrandLogoGrid,
  LeadCta,
  LocationCards,
  PageShell,
  SectionIntro,
} from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
import { featuredBrands, storeInfo } from "@/lib/products";

const collectionTiles = [
  {
    title: "Mattresses",
    copy: "Start with the core floor: foam, hybrid, innerspring, organic, and premium comfort options.",
    href: "/collections",
    image: "/brand-assets/discount-mattress/hero-bed.jpg",
  },
  {
    title: "Adjustable bases",
    copy: "Compare BedTech bases for head lift, foot lift, massage, split setups, and cleaner support.",
    href: "/collections/bedtech",
    image: "/brand-assets/bedtech/official-hero-bases.jpg",
  },
  {
    title: "Pillows and protectors",
    copy: "Finish the bed with cooling pillows, mattress protectors, and bedding that fits your setup.",
    href: "/collections/bedgear",
    image: "/brand-assets/bedgear/wide-detail.jpg",
  },
];

const comfortTiles = [
  {
    title: "Pressure relief",
    copy: "Soft and medium options for side sleepers who wake up sore.",
    href: "/collections/helix",
  },
  {
    title: "Cooling comfort",
    copy: "Nectar, Puffy, Serta, and Bedgear options for warmer sleepers.",
    href: "/collections/nectar",
  },
  {
    title: "Luxury feel",
    copy: "DreamCloud, Posh and Lavish, PranaSleep, and Puffy premium models.",
    href: "/collections/dreamcloud",
  },
  {
    title: "Organic materials",
    copy: "Naturepedic choices with organic cotton, wool, latex, and cleaner materials.",
    href: "/collections/naturepedic",
  },
];

const serviceTiles = [
  {
    title: "Shortlist before you visit",
    copy: "Use the collection pages to narrow brand, comfort, and price range before walking in.",
  },
  {
    title: "Compare comfort in person",
    copy: "Try your top choices side by side and get help matching firmness, support, and sleep position.",
  },
  {
    title: "Confirm current offers",
    copy: "Call or stop by for today’s availability, promotions, financing, delivery, and policy details.",
  },
];

export default function Home() {
  return (
    <PageShell>
      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="py-6 lg:py-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#cf2333]">
              Discount Mattress • Bowling Green, KY
            </p>
            <h1 className="mt-5 text-balance text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-6xl xl:text-[4.75rem]">
              Brand-name mattresses, priced clearly, fitted locally.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
              See real prices on Helix, Puffy, Nectar, DreamCloud, Naturepedic, Bedgear, and more,
              then visit us to find the mattress that feels right.
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
                Prices shown up front
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
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover object-[52%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <div className="max-w-md border-l-4 border-[#f2b705] pl-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">
                  Try before you decide
                </p>
                <p className="mt-2 text-2xl font-black leading-tight text-white">
                  Browse before you visit, then compare comfort in person.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dedbd2] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-center text-sm font-black text-slate-900 sm:px-6 md:grid-cols-3 lg:px-8">
          <p>Prices shown before you visit</p>
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
                  Clear pricing
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
              eyebrow="Collections"
              title="Start with the right department."
              body="The homepage should not make you sort through every floor model. Pick the collection that matches what you need, then compare the details from there."
            />
            <Link
              href="/collections"
              className="rounded border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
            >
              View all collections
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {collectionTiles.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#cf2333] hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-black tracking-tight text-slate-950 transition group-hover:text-[#cf2333]">
                    {tile.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{tile.copy}</p>
                </div>
              </Link>
            ))}
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
            eyebrow="Shop by need"
            title="Narrow by comfort before you come in."
            body="Use these paths when you know the problem you are trying to solve, but not the exact mattress yet."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {comfortTiles.map((tile) => (
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
              Service that turns browsing into the right showroom visit.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {serviceTiles.map((item) => (
                <div key={item.title} className="rounded border border-slate-200 bg-[#f7f8fb] p-5">
                  <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                    {item.copy}
                  </p>
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
              body="Call ahead to confirm current offers, model availability, delivery questions, and policy details."
            />
            <LocationCards compact />
          </div>
        </div>
      </section>

      <LeadCta />
    </PageShell>
  );
}
