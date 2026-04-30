import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/products";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return brands.map((brand) => ({
    brand: brand.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { brand: brandId } = await params;
  const brand = brands.find((b) => b.id === brandId);
  if (!brand) return {};
  
  return {
    title: `${brand.name} Mattresses | Discount Mattress`,
    description: `Shop ${brand.name} mattresses at Discount Mattress. ${brand.tagline}`,
  };
}

export default async function BrandCollectionPage({ params }: PageProps) {
  const { brand: brandId } = await params;
  const brand = brands.find((b) => b.id === brandId);
  
  if (!brand) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f3eb]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Discount Mattress"
                width={200}
                height={44}
                className="h-12 w-auto"
              />
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/collections" className="text-gray-900 font-medium hover:text-blue-600">
                Collections
              </Link>
              <Link href="/#about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="/#locations" className="text-gray-600 hover:text-blue-600">
                Locations
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <a href="tel:2704951603" className="text-blue-600 font-semibold">
                (270) 495-1603
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* BRAND HERO */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {brand.name}
            </h1>
            <p className="text-xl text-slate-200 mb-2">{brand.tagline}</p>
            <p className="text-lg text-slate-300">{brand.description}</p>
          </div>
        </div>
      </section>

      {/* BENEFITS BAR */}
      <section className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="text-gray-600">
              <span className="text-green-600 font-bold">{brand.products[0]?.trial || 100}</span> Night Sleep Trial
            </span>
            <span className="text-gray-600">
              <span className="text-green-600 font-bold">Free</span> Shipping
            </span>
            <span className="text-gray-600">
              <span className="text-green-600 font-bold">Easy</span> Returns
            </span>
            <span className="text-gray-600">
              <span className="text-green-600 font-bold">{brand.products[0]?.warranty || '10 years'}</span> Warranty
            </span>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brand.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                {/* PRODUCT IMAGE */}
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center p-6">
                    <span className="text-4xl">🛏️</span>
                    <p className="text-gray-500 text-sm mt-2">{product.model}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {product.model}
                  </h3>
                  
                  {/* SPECS */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type</span>
                      <span className="text-gray-900 capitalize">{product.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Height</span>
                      <span className="text-gray-900">{product.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Firmness</span>
                      <span className="text-gray-900">{product.firmness}</span>
                    </div>
                    {product.bestFor && product.bestFor.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Best For</span>
                        <span className="text-gray-900 text-right">{product.bestFor.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {/* PRICE */}
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-500">Queen</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {product.priceQueen ? `$${product.priceQueen}` : 'Call for price'}
                      </span>
                    </div>
                  </div>

                  {/* FEATURES */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Features</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.keyFeatures.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500 text-xs">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <a
                      href="tel:2704951603"
                      className="flex-1 text-center py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Call for Price
                    </a>
                    <a
                      href="#locations"
                      className="flex-1 text-center py-3 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                      Visit Us
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to find your perfect mattress?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Visit our showroom to try any model in person. Our sleep experts will help you find 
            the perfect match — no pressure, just guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#locations"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Visit Our Showroom
            </a>
            <a
              href="/collections"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View All Brands
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Discount Mattress. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}