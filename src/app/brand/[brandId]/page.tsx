import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/products";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ brandId: string }>;
}

export async function generateStaticParams() {
  return brands.map((brand) => ({
    brandId: brand.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { brandId } = await params;
  const brand = brands.find((b) => b.id === brandId);
  if (!brand) return {};
  
  return {
    title: `${brand.name} Mattresses | Discount Mattress`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { brandId } = await params;
  const brand = brands.find((b) => b.id === brandId);
  
  if (!brand) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Discount Mattress"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/#brands" className="text-gray-700 hover:text-blue-600">Brands</Link>
            </div>
            <a href="tel:2704951603" className="text-blue-600 font-medium">
              (270) 495-1603
            </a>
          </div>
        </nav>
      </header>

      {/* BRAND HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {brand.name}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{brand.tagline}</p>
            <p className="text-lg text-gray-700">{brand.description}</p>
          </div>
        </div>
      </section>

      {/* PRODUCT CARDS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brand.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">{product.model}</span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.model}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-900 capitalize">{product.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Height:</span>
                      <span className="text-gray-900">{product.height}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Firmness:</span>
                      <span className="text-gray-900">{product.firmness}</span>
                    </div>
                    {product.bestFor && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Best For:</span>
                        <span className="text-gray-900">{product.bestFor.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Queen:</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {product.priceQueen ? `$${product.priceQueen}` : 'Call for price'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-500 font-medium">Key Features:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 text-sm text-gray-500 border-t pt-4">
                    <div className="flex-1">
                      <span className="block font-medium text-gray-700">Trial</span>
                      <span>{product.trial} nights</span>
                    </div>
                    <div className="flex-1">
                      <span className="block font-medium text-gray-700">Warranty</span>
                      <span>{product.warranty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience {brand.name}?
          </h2>
          <p className="text-gray-600 mb-6">
            Visit our showroom to try any model, or call for current pricing and delivery options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#locations"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Visit Our Showroom
            </a>
            <a
              href="tel:2704951603"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Call (270) 495-1603
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Discount Mattress"
                  width={150}
                  height={33}
                  className="h-8 w-auto brightness-0 invert"
                />
              </Link>
            </div>
            <div className="text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Discount Mattress. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}