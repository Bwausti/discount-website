import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/products";

export const metadata = {
  title: "Discount Mattress | Top Brands at Discount Prices",
  description: "Shop top-rated mattresses from expert-approved brands. Best prices in Bowling Green. Free shipping, easy returns, and a 365-night sleep trial.",
};

export default function CollectionsPage() {
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

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Best of the Best
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Start with the top-rated, best-selling mattresses at Discount Mattress. 
            Every mattress comes from a trusted, tested brand.
          </p>
        </div>
      </section>

      {/* BENEFITS BAR */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span className="font-medium">365 Night Sleep Trial</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span className="font-medium">Free US Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span className="font-medium">Easy Free Returns</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span className="font-medium">Limited Lifetime Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span className="font-medium">Financing Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND COLLECTIONS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            A Fit for Everyone
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/collections/${brand.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <div className="text-center p-6">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{brand.products.length} models</p>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="text-gray-400 group-hover:text-blue-600 transition-colors">→</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{brand.tagline}</p>
                  <p className="text-gray-800 text-sm line-clamp-2">{brand.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Proven to Work
            </h2>
            <p className="text-lg text-gray-600">
              With {brands.length} brands, 30+ years of experience, and countless awards, 
              Discount Mattress expertly guides you through the shopping process. 
              Choose a mattress with confidence, and do it all through a process that feels simple.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Visit Our Showrooms
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Discount Mattress</h3>
              <p className="text-slate-300 mb-2">1555 Campbell Ln</p>
              <p className="text-slate-300 mb-2">Bowling Green, KY 42104</p>
              <p className="text-blue-400 font-semibold mb-4">(270) 495-1603</p>
              <p className="text-slate-300">Mon–Sat: 10:00 AM – 6:00 PM</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Discount Mattress Outlet</h3>
              <p className="text-slate-300 mb-2">2734 Russellville Rd</p>
              <p className="text-slate-300 mb-2">Bowling Green, KY 42101</p>
              <p className="text-blue-400 font-semibold mb-4">(270) 842-3888</p>
              <p className="text-slate-300">Mon–Sat: 9:00 AM – 5:30 PM</p>
              <p className="text-slate-300">Sunday: 12:00 PM – 5:00 PM</p>
            </div>
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