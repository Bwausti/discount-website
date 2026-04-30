import Image from "next/image";
import Link from "next/link";
import { LeadCta, PageShell, SectionIntro } from "@/components/site-shell";
import { storeInfo } from "@/lib/products";

export const metadata = {
  title: "Mattress Financing",
  description:
    "Learn about financing paths for Discount Mattress in Bowling Green. Call or visit for current terms, approvals, and available programs.",
};

const financingOptions = [
  {
    name: "Synchrony",
    logo: "/financing/synchrony.svg",
    copy: "A familiar retail financing option for qualified shoppers.",
  },
  {
    name: "Kafene",
    logo: "/financing/kafene.svg",
    copy: "A lease-to-own style path that may help shoppers who need flexible approval options.",
  },
  {
    name: "Snap Finance",
    copy: "Confirm current availability and terms directly with the store.",
  },
];

export default function FinancingPage() {
  return (
    <PageShell>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionIntro
            align="left"
            eyebrow="Financing"
            title="Bring home better sleep without guessing online."
            body="Financing details can change by partner, approval, promotion, and purchase amount. The site should guide shoppers to call or visit, then let the store confirm the right option."
          />
          <div className="rounded border border-slate-200 bg-[#f7f8fb] p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#cf2333]">
              First step
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">Call before applying.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The team can confirm current partners, promotion windows, and what information you
              need before visiting the showroom.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={storeInfo.primaryPhoneHref}
                className="rounded bg-[#cf2333] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#a91c2a]"
              >
                Call {storeInfo.primaryPhone}
              </a>
              <Link
                href="/locations"
                className="rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
              >
                Visit a showroom
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Options"
            title="Store-supported financing paths."
            body="These are presented as guidance only. Terms, availability, approvals, and disclosures should be confirmed before launch and before purchase."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {financingOptions.map((option) => (
              <article
                key={option.name}
                className="rounded border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-20 items-center">
                  {option.logo ? (
                    <Image
                      src={option.logo}
                      alt={`${option.name} logo`}
                      width={180}
                      height={56}
                      unoptimized
                      className="max-h-14 w-auto object-contain"
                    />
                  ) : (
                    <p className="text-2xl font-black text-slate-950">{option.name}</p>
                  )}
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-600">{option.copy}</p>
                <p className="mt-5 rounded bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700">
                  Confirm in store
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Pick the mattress first",
              copy: "Comfort and support should lead the decision. Financing should support the right choice, not replace it.",
            },
            {
              title: "Confirm the promotion",
              copy: "Ask what financing programs are active today and whether the mattress or base qualifies.",
            },
            {
              title: "Ask about delivery",
              copy: "Delivery, setup, removal, protectors, and bases can change the final purchase details.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded border border-slate-200 bg-[#f7f8fb] p-6">
              <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <LeadCta
        title="Want to talk through financing?"
        body="Call Discount Mattress for current financing partners, terms, and what to bring to the showroom."
      />
    </PageShell>
  );
}
