import Link from "next/link";
import { LeadCta, PageShell, SectionIntro } from "@/components/site-shell";
import { faqItems, storeInfo } from "@/lib/products";

export const metadata = {
  title: "FAQ and Store Policies",
  description:
    "Discount Mattress FAQ for local mattress shopping, financing, warranty details, and comfort exchange policy confirmation.",
};

const policyCards = [
  {
    title: "Comfort exchange",
    copy: "Ask the store team to walk you through the current comfort exchange terms before you buy.",
  },
  {
    title: "Returns and refunds",
    copy: "Refund and return details can vary by purchase, so confirm the policy with the store team.",
  },
  {
    title: "Warranties",
    copy: "Warranty coverage varies by brand and model. Product pages summarize known brand programs and direct shoppers to confirm before purchase.",
  },
  {
    title: "Delivery and setup",
    copy: "Delivery availability, setup, removal, and timing should be confirmed with the store for each purchase.",
  },
];

export default function FaqPage() {
  return (
    <PageShell>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="FAQ"
            title="Clear answers for local mattress shopping."
            body="Use this page to prepare for your visit, then call or stop in for today's local offers and policy details."
          />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Policies
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Know what to ask before you buy.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Mattress policies can vary by brand, model, delivery choice, and promotion. A quick
              call or showroom visit is the best way to confirm the details for your purchase.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={storeInfo.primaryPhoneHref}
                className="rounded bg-[#cf2333] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#a91c2a]"
              >
                Call for details
              </a>
              <Link
                href="/locations"
                className="rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-[#cf2333] hover:text-[#cf2333]"
              >
                Visit a showroom
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {policyCards.map((card) => (
              <article key={card.title} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionIntro
            eyebrow="Questions"
            title="Before you visit."
            body="Answers are written for a local store experience, not a checkout flow."
          />
          <div className="mt-10 grid gap-4">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded border border-slate-200 bg-[#f7f8fb] p-6">
                <h2 className="text-xl font-black text-slate-950">{item.question}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
                Publishing note
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">Comfort exchange copy is a placeholder.</h2>
            </div>
            <p className="text-base leading-7 text-slate-600">
              Once the store provides the exact comfort exchange, delivery, return, and protector
              requirements, this page can be updated without changing the overall design.
            </p>
          </div>
        </div>
      </section>

      <LeadCta
        title="Still have a policy question?"
        body="Call either Bowling Green location and ask for the current policy details before buying."
      />
    </PageShell>
  );
}
