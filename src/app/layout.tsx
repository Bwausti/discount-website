import type { Metadata } from "next";
import { GoogleTracking } from "@/components/google-tracking";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.discountmattressbg.com"),
  title: {
    default: "Discount Mattress | Bowling Green Mattress Store",
    template: "%s | Discount Mattress",
  },
  description:
    "Shop top mattress brands locally in Bowling Green, KY with prices shown before you visit and local help from Discount Mattress.",
  keywords:
    "mattress store Bowling Green KY, discount mattress, Helix, Nectar, Puffy, DreamCloud, Bedgear, Naturepedic, Serta",
  openGraph: {
    title: "Discount Mattress | Bowling Green Mattress Store",
    description:
      "See mattress prices, then call or visit two Bowling Green stores for local help choosing the right feel.",
    type: "website",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <GoogleTracking />
        {children}
      </body>
    </html>
  );
}
