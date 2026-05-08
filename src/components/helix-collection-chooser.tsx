"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-card";
import type { Product, ProductGroup } from "@/lib/products";

interface HelixGroupChoice {
  group: ProductGroup;
  products: Product[];
}

const collectionDetails: Record<
  string,
  {
    label: string;
    image: string;
    price: string;
    summary: string;
    bestFor: string;
  }
> = {
  core: {
    label: "Core",
    image: "/product-assets/helix/helix-midnight-1.webp",
    price: "from $799",
    summary: "The cleanest starting point: six comfort feels plus Helix Plus.",
    bestFor: "Best value, first serious mattress upgrade, clear firmness matching",
  },
  luxe: {
    label: "Luxe",
    image: "/product-assets/helix/helix-midnight-luxe-2.webp",
    price: "from $1,149",
    summary: "Adds a premium pillow top, zoned support, and more cooling-cover choices.",
    bestFor: "Pressure relief, couples, shoppers who want a plusher step-up feel",
  },
  elite: {
    label: "Elite",
    image: "/product-assets/helix/helix-midnight-elite-1.png",
    price: "from $1,874",
    summary: "The tallest Helix build with upgraded cooling and deeper contouring.",
    bestFor: "Premium comfort, cooling upgrades, highest-support showroom comparison",
  },
};

export function HelixCollectionChooser({ choices }: { choices: HelixGroupChoice[] }) {
  const [selectedId, setSelectedId] = useState(choices[0]?.group.id ?? "core");
  const selected = useMemo(
    () => choices.find((choice) => choice.group.id === selectedId) ?? choices[0],
    [choices, selectedId],
  );

  if (!selected) return null;

  const selectedDetails = collectionDetails[selected.group.id];

  return (
    <section id="helix-chooser" className="bg-[#f7f6f1] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Choose your Helix level
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Pick Core, Luxe, or Elite first.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Helix is easier when you choose the construction level before the firmness. Select
              one collection and the matching mattresses appear below.
            </p>
          </div>
          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-black text-slate-950">Then choose the feel.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Sunset and Moonlight are softer, Midnight and Dusk sit in the middle, and Dawn and
              Twilight are firmer. Plus models are included with each level.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {choices.map((choice) => {
            const details = collectionDetails[choice.group.id];
            const isSelected = choice.group.id === selected.group.id;

            return (
              <button
                key={choice.group.id}
                type="button"
                onClick={() => setSelectedId(choice.group.id)}
                aria-pressed={isSelected}
                className={`group overflow-hidden rounded border text-left shadow-sm transition ${
                  isSelected
                    ? "border-[#cf2333] bg-white ring-2 ring-[#cf2333]/20"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-[#cf2333] hover:shadow-lg"
                }`}
              >
                <div className="relative aspect-[16/10] bg-[#f1f3f6]">
                  <Image
                    src={details.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-black tracking-tight text-slate-950">
                        {details.label}
                      </h3>
                      <p className="mt-1 text-sm font-black uppercase tracking-[0.14em] text-[#cf2333]">
                        {details.price}
                      </p>
                    </div>
                    <span
                      className={`rounded px-3 py-2 text-xs font-black ${
                        isSelected ? "bg-[#cf2333] text-white" : "bg-slate-950 text-white"
                      }`}
                    >
                      {isSelected ? "Selected" : "Choose"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                    {details.summary}
                  </p>
                  <p className="mt-4 rounded bg-[#f7f6f1] px-3 py-2 text-xs font-bold leading-5 text-slate-800">
                    {details.bestFor}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
                {selected.group.eyebrow}
              </p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                {selected.group.name}
              </h3>
            </div>
            <p className="text-base font-semibold leading-7 text-slate-600">
              {selectedDetails.summary} {selected.group.description}
            </p>
          </div>
          <ProductGrid products={selected.products} priorityCount={3} />
        </div>
      </div>
    </section>
  );
}
