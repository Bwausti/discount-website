import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { Brand, storeInfo } from "@/lib/products";

const navItems = [
  { label: "Mattresses", href: "/collections" },
  { label: "Brands", href: "/collections#brands" },
  { label: "Accessories", href: "/collections#pillow" },
  { label: "Financing", href: "/financing" },
  { label: "Locations", href: "/locations" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/96 backdrop-blur">
      <div className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-2 px-4 py-2 text-center text-xs font-black uppercase tracking-[0.14em] sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <p className="hidden justify-self-start text-white/75 lg:block">Bowling Green, KY</p>
          <p className="justify-self-center text-white">
            Nationwide price guarantee • Local help • Two Bowling Green stores
          </p>
          <TrackedLink
            href={storeInfo.primaryPhoneHref}
            eventName="phone_click"
            eventLabel="header_primary_phone"
            className="hidden justify-self-end rounded border border-white/30 px-3 py-1.5 text-xs font-black text-white transition hover:bg-white hover:text-slate-950 lg:inline-flex"
          >
            {storeInfo.primaryPhone}
          </TrackedLink>
        </div>
      </div>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center">
          <Image
            src="/brand-assets/discount-mattress/logo.png"
            alt="Discount Mattress"
            width={260}
            height={44}
            priority
            className="h-8 w-auto max-w-[180px] object-contain sm:h-9 sm:max-w-[235px]"
          />
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-slate-700 transition hover:text-[#cf2333] xl:text-base"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <TrackedLink
            href={storeInfo.primaryPhoneHref}
            eventName="phone_click"
            eventLabel="header_mobile_phone"
            className="hidden rounded border border-slate-300 px-4 py-2 text-sm font-black text-slate-950 transition hover:border-slate-950 sm:inline-flex lg:hidden"
          >
            Call
          </TrackedLink>
          <Link
            href="/locations"
            className="rounded bg-[#f2b705] px-4 py-2.5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#dba300]"
          >
            Visit
          </Link>
        </div>
      </nav>
      <div className="border-t border-slate-200 bg-white px-4 py-2 lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 hover:text-[#cf2333]">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#101827] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/brand-assets/discount-mattress/logo.png"
            alt="Discount Mattress"
            width={230}
            height={40}
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
            Local help choosing a mattress, strong brand selection, and a nationwide price
            guarantee for Bowling Green shoppers.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink
              href={storeInfo.primaryPhoneHref}
              eventName="phone_click"
              eventLabel="footer_primary_phone"
              className="rounded bg-white px-4 py-2 text-sm font-bold text-[#101827] transition hover:bg-slate-200"
            >
              Call {storeInfo.primaryPhone}
            </TrackedLink>
            <TrackedLink
              href="/locations"
              eventName="directions_click"
              eventLabel="footer_directions"
              className="rounded border border-white/30 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Get directions
            </TrackedLink>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Shop</h2>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link href="/collections" className="hover:text-white">
              Mattresses and brands
            </Link>
            <Link href="/financing" className="hover:text-white">
              Financing
            </Link>
            <Link href="/faq" className="hover:text-white">
              Policies and FAQ
            </Link>
            <Link href="/locations" className="hover:text-white">
              Locations
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
            Showrooms
          </h2>
          <div className="mt-4 grid gap-4 text-sm text-slate-300">
            {storeInfo.locations.map((location) => (
              <div key={location.name}>
                <p className="font-bold text-white">{location.name}</p>
                <p>{location.address}</p>
                <p>
                  {location.city}, {location.state} {location.zip}
                </p>
                <TrackedLink
                  href={location.phoneHref}
                  eventName="phone_click"
                  eventLabel={`footer_${location.name}_phone`}
                  className="font-semibold text-white hover:text-slate-200"
                >
                  {location.phone}
                </TrackedLink>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Discount Mattress. Call or visit for today&apos;s local offers,
        promotions, and policy details.
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f6f1] text-slate-950">
      <SiteHeader />
      <main>{children}</main>
      <StickyMobileCall />
      <SiteFooter />
    </div>
  );
}

export function StickyMobileCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-[0_-12px_30px_rgba(15,23,42,0.12)] sm:hidden">
      <div className="grid grid-cols-2 gap-2">
        <TrackedLink
          href={storeInfo.primaryPhoneHref}
          eventName="phone_click"
          eventLabel="sticky_mobile_phone"
          className="rounded bg-[#162b49] px-3 py-3 text-center text-sm font-bold text-white"
        >
          Call now
        </TrackedLink>
        <TrackedLink
          href="/locations"
          eventName="directions_click"
          eventLabel="sticky_mobile_directions"
          className="rounded bg-[#cf2333] px-3 py-3 text-center text-sm font-bold text-white"
        >
          Directions
        </TrackedLink>
      </div>
    </div>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-balance text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
        {title}
      </h1>
      {body ? <p className="mt-4 text-lg leading-8 text-slate-600">{body}</p> : null}
    </div>
  );
}

export function LocationCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {storeInfo.locations.map((location) => (
        <article key={location.name} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950">{location.name}</h2>
              <p className="mt-3 text-slate-700">{location.address}</p>
              <p className="text-slate-700">
                {location.city}, {location.state} {location.zip}
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-500">{location.hours}</p>
              {!compact ? <p className="mt-3 text-sm text-slate-600">{location.note}</p> : null}
            </div>
            <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
              <TrackedLink
                href={location.phoneHref}
                eventName="phone_click"
                eventLabel={`${location.name}_phone`}
                className="rounded bg-[#162b49] px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-[#223d63]"
              >
                Call
              </TrackedLink>
              <TrackedLink
                href={location.mapUrl}
                eventName="directions_click"
                eventLabel={`${location.name}_directions`}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-slate-300 px-4 py-2 text-center text-sm font-bold text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
              >
                Directions
              </TrackedLink>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function BrandLogoGrid({ brands }: { brands: Brand[] }) {
  const spotlightBrands = brands.slice(0, 3);
  const supportingBrands = brands.slice(3);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-3">
        {spotlightBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/collections/${brand.id}`}
            className="group flex min-h-[22rem] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#cf2333]/40 hover:shadow-xl"
          >
            <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-slate-200 bg-slate-950 px-8">
              {brand.heroImage ? (
                <Image
                  src={brand.heroImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-55 transition duration-500 group-hover:scale-[1.03]"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-slate-950/25 to-slate-950/55" />
              <div className="relative flex h-20 w-full max-w-[15rem] items-center justify-center rounded-md bg-white/95 px-6 py-4 shadow-lg ring-1 ring-white/70 backdrop-blur">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={180}
                    height={76}
                    unoptimized
                    className="h-auto max-h-12 w-auto max-w-full object-contain"
                  />
                ) : (
                  <span className="text-lg font-black text-slate-950">{brand.name}</span>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#cf2333]">
                Featured brand
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                {brand.name}
              </h3>
              <p className="mt-3 text-lg font-black leading-7 text-slate-900">
                {brand.tagline}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {brand.collectionHighlights.slice(0, 2).map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <p className="mt-auto pt-5 text-sm font-black text-[#cf2333] transition group-hover:text-[#a91c2a]">
                Browse {brand.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {supportingBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/collections/${brand.id}`}
            className="group flex h-28 items-center justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#f2b705] hover:shadow-lg"
          >
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={170}
                height={70}
                unoptimized
                className="max-h-14 w-auto max-w-full object-contain transition group-hover:scale-[1.04]"
              />
            ) : (
              <span className="text-center text-sm font-black text-slate-800">{brand.name}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function LeadCta({
  title = "Ready to try a better mattress?",
  body = "Start with the brands you like, then call or stop in to test comfort levels in person.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-[#162b49] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-3 text-lg leading-8 text-slate-200">{body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href={storeInfo.primaryPhoneHref}
            className="rounded bg-white px-6 py-3 text-center text-sm font-black text-[#162b49] transition hover:bg-slate-200"
          >
            Call {storeInfo.primaryPhone}
          </a>
          <Link
            href="/locations"
            className="rounded border border-white/40 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-white/10"
          >
            Visit a showroom
          </Link>
        </div>
      </div>
    </section>
  );
}
