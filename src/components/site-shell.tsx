import Image from "next/image";
import Link from "next/link";
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
    <header className="sticky top-0 z-50 border-b border-[#dedbd2] bg-[#fffef9]/95 backdrop-blur">
      <div className="border-b border-[#dedbd2] bg-[#f2efe5] text-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-2 px-4 py-2 text-center text-sm font-black sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <div className="hidden lg:block" />
          <Link href="/collections/puffy" className="justify-self-center hover:text-[#b98100]">
            Local Spring Sale: Puffy Monarch and more →
          </Link>
          <a
            href={storeInfo.primaryPhoneHref}
            className="hidden justify-self-end rounded-full border border-slate-950 px-5 py-2 text-sm font-black transition hover:bg-slate-950 hover:text-white lg:inline-flex"
          >
            {storeInfo.primaryPhone}
          </a>
        </div>
      </div>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center">
          <Image
            src="/brand-assets/discount-mattress/logo.png"
            alt="Discount Mattress"
            width={260}
            height={44}
            priority
            className="h-10 w-auto max-w-[190px] object-contain sm:max-w-[245px]"
          />
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-bold text-slate-900 transition hover:text-[#b98100]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={storeInfo.primaryPhoneHref}
            className="hidden rounded-full border border-slate-950 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-slate-950 hover:text-white sm:inline-flex lg:hidden"
          >
            Call
          </a>
          <Link
            href="/faq"
            className="rounded-full bg-[#f2b705] px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#dba300]"
          >
            Store FAQ
          </Link>
        </div>
      </nav>
      <div className="border-t border-[#dedbd2] bg-[#fffef9] px-4 py-2 lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 hover:text-[#b98100]">
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
            Local mattress guidance, strong brand selection, and current showroom pricing for
            Bowling Green sleepers.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={storeInfo.primaryPhoneHref}
              className="rounded bg-white px-4 py-2 text-sm font-bold text-[#101827] transition hover:bg-slate-200"
            >
              Call {storeInfo.primaryPhone}
            </a>
            <Link
              href="/locations"
              className="rounded border border-white/30 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Get directions
            </Link>
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
                <a href={location.phoneHref} className="font-semibold text-white hover:text-slate-200">
                  {location.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Discount Mattress. Call or visit for current pricing,
        promotions, and policy details.
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fbfaf4] text-slate-950">
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
        <a
          href={storeInfo.primaryPhoneHref}
          className="rounded bg-[#162b49] px-3 py-3 text-center text-sm font-bold text-white"
        >
          Call now
        </a>
        <Link
          href="/locations"
          className="rounded bg-[#cf2333] px-3 py-3 text-center text-sm font-bold text-white"
        >
          Directions
        </Link>
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
              <a
                href={location.phoneHref}
                className="rounded bg-[#162b49] px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-[#223d63]"
              >
                Call
              </a>
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-slate-300 px-4 py-2 text-center text-sm font-bold text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
              >
                Directions
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function BrandLogoGrid({ brands }: { brands: Brand[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={`/collections/${brand.id}`}
          className="group flex h-24 items-center justify-center rounded border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#cf2333] hover:shadow-md"
        >
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={170}
              height={70}
              unoptimized
              className="max-h-14 w-auto max-w-full object-contain transition group-hover:scale-[1.03]"
            />
          ) : (
            <span className="text-center text-sm font-black text-slate-800">{brand.name}</span>
          )}
        </Link>
      ))}
    </div>
  );
}

export function LeadCta({
  title = "Ready to try a better mattress?",
  body = "Call for today's prices or visit a Bowling Green showroom to compare comfort levels in person.",
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
