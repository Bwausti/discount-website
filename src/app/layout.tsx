import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.discountmattressbg.com"),
  title: {
    default: "Discount Mattress | Bowling Green Mattress Store",
    template: "%s | Discount Mattress",
  },
  description:
    "Shop top mattress brands locally in Bowling Green, KY. Call for current pricing or visit Discount Mattress and Discount Mattress Outlet.",
  keywords:
    "mattress store Bowling Green KY, discount mattress, Helix, Nectar, Puffy, DreamCloud, Bedgear, Naturepedic, Serta",
  openGraph: {
    title: "Discount Mattress | Bowling Green Mattress Store",
    description:
      "Call or visit two Bowling Green mattress showrooms for current pricing, local guidance, and top sleep brands.",
    type: "website",
    images: ["/brand-assets/discount-mattress/hero-bed.jpg"],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
