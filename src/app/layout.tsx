import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discount Mattress | Bowling Green, KY",
  description: "Sleep better for less in Bowling Green. Top mattress brands at discount prices. Visit our showroom at 1555 Campbell Ln or 2734 Russellville Rd.",
  keywords: "mattress, bedding, sleep, discount mattress, Bowling Green KY, Helix, Nectar, Puffy, DreamCloud",
  openGraph: {
    title: "Discount Mattress | Bowling Green, KY",
    description: "Sleep better for less in Bowling Green. Top mattress brands at discount prices.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics - replace G-XXXXXXXXXX with your GA4 ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `
          }}
        />
        {/* Facebook Pixel - replace XXXXXXXX with your Pixel ID */}
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=XXXXXXXXXX&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}