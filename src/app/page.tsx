import Image from "next/image";
import Link from "next/link";
import { brands, testimonials, storeInfo } from "@/lib/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f3eb]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="hidden md:flex space-x-8">
              <Link href="/collections" className="text-gray-900 font-medium hover:text-blue-600">
                Collections
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="#locations" className="text-gray-600 hover:text-blue-600">
                Locations
              </Link>
            </div>
            <a href="tel:2704951603" className="text-blue-600 font-semibold hover:text-blue-700">
              (270) 495-1603
            </a>
          </div>
        </nav>
      </header>

      {/* HERO with Image */}
      <section className="relative bg-slate-800 py-24 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-blue-400 font-semibold mb-4">LOCALLY OWNED</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Sleep Better for Less in Bowling Green
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Discover premium comfort and locally-owned expertise. We bring world-class 
              mattress brands to your neighborhood with service that makes you feel right at home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Shop Collections
              </Link>
              <Link
                href="#locations"
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-400 text-lg font-semibold rounded-md text-white hover:bg-white/10"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS BAR */}
      <section className="bg-white py-10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Top Mattress Brands at Discount Prices
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-xl font-bold text-gray-700">
            {storeInfo.brands.map((brand) => (
              <span key={brand} className="hover:text-blue-600 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span className="font-medium">365 Night Sleep Trial</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span className="font-medium">Free US Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span className="font-medium">Easy Free Returns</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span className="font-medium">Financing Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND COLLECTIONS PREVIEW */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Fit for Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every mattress at Discount Mattress comes from a trusted, tested brand. 
              With our extensive selection, we have a mattress for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.slice(0, 4).map((brand) => (
              <Link
                key={brand.id}
                href={`/collections/${brand.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-5xl block mb-2">🛏️</span>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{brand.products.length} models</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{brand.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View All {brands.length} Brands →
            </Link>
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Promises to Our Neighbors
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Honest Prices</h3>
              <p className="text-gray-600">Transparent deals without hidden fees</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Zero Pressure</h3>
              <p className="text-gray-600">Friendly guidance at your own pace</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Fitting</h3>
              <p className="text-gray-600">Matching to your unique sleep style</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-[#f4f3eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Loved by sleepers everywhere
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.slice(0, 4).map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-3 text-sm">"{t.text.substring(0, 100)}..."</p>
                <p className="font-medium text-gray-900">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Experience Better Sleep Today
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {storeInfo.locations.map((location, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">{location.name}</h3>
                <p className="text-slate-300 mb-2">{location.address}</p>
                <p className="text-slate-300 mb-2">{location.city}, {location.state} {location.zip}</p>
                <p className="text-blue-400 font-semibold mb-4">{location.phone}</p>
                <p className="text-slate-300 whitespace-pre-line">{location.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Discount Mattress"
                width={150}
                height={33}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <div className="text-sm">
              <p>Locally Owned in Bowling Green, KY</p>
              <p className="mt-1">© {new Date().getFullYear()} Discount Mattress. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}