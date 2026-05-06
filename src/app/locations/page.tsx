import Image from "next/image";
import { LeadCta, LocationCards, PageShell, SectionIntro } from "@/components/site-shell";
import { storeInfo } from "@/lib/products";

export const metadata = {
  title: "Bowling Green Mattress Store Locations",
  description:
    "Visit Discount Mattress and Discount Mattress Outlet in Bowling Green, KY. Find addresses, hours, phone numbers, and directions.",
};

export default function LocationsPage() {
  return (
    <PageShell>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionIntro
            align="left"
            eyebrow="Locations"
            title="Two Bowling Green showrooms."
            body="Call ahead for model availability, delivery options, today's local offers, and which location is best for the brands you want to try."
          />
          <div className="relative aspect-[16/10] overflow-hidden rounded border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src="/brand-assets/discount-mattress/storefront.jpg"
              alt="Discount Mattress storefront"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <LocationCards />
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Before you visit",
              copy: `Call ${storeInfo.primaryPhone} if you are looking for a specific brand or model.`,
            },
            {
              title: "At the showroom",
              copy: "Compare firmness, support, height, pillows, protectors, and adjustable bases in person.",
            },
            {
              title: "Before purchase",
              copy: "Confirm delivery, warranty, financing, returns, and comfort exchange details with the store.",
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
        title="Planning a showroom visit?"
        body="Call first and the team can point you to the location with the best fit for your mattress shortlist."
      />
    </PageShell>
  );
}
