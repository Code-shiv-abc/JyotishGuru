import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import InstallAppButton from "./components/InstallAppButton";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JyotishGuru | Acharya Shri Ravindra Shukla Shatri — Vedic Astrologer in Ayodhya Dham",
    template: "%s | JyotishGuru",
  },
  description:
    "Consult Acharya Shri Ravindra Shukla Shatri, an expert Vedic Astrologer based in Ayodhya Dham, India. Services include Janam Kundali Reading, Ashtakoot Kundali Matching, and Horoscope Consultation.",
  keywords: [
    "Vedic Astrology",
    "Ayodhya Dham",
    "Acharya Shri Ravindra Shukla Shatri",
    "Ravindra Shukla Shatri",
    "Kundali",
    "Horoscope",
    "Kundali Matching",
    "JyotishGuru",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "JyotishGuru | Acharya Shri Ravindra Shukla Shatri — Vedic Astrologer in Ayodhya Dham",
    description:
      "Expert Vedic Astrology consultation in Ayodhya Dham. Understand your karmic path with Acharya Shri Ravindra Shukla Shatri.",
    url: SITE_URL,
    siteName: "JyotishGuru",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JyotishGuru | Acharya Shri Ravindra Shukla Shatri — Vedic Astrologer in Ayodhya Dham",
    description:
      "Consult Acharya Shri Ravindra Shukla Shatri for Kundali Reading, Kundali Matching, and Horoscope Consultation in Ayodhya Dham.",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "JyotishGuru",
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: "#1A1040",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${outfit.variable} antialiased font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": `${SITE_URL}/#organization`,
                  "name": "JyotishGuru",
                  "url": SITE_URL,
                  "telephone": "+91-80091-24454",
                  "email": "contact@jyotishguru.in",
                  "priceRange": "₹500 - ₹1,500",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Ayodhya Dham",
                    "addressRegion": "Uttar Pradesh",
                    "addressCountry": "IN",
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 26.7922,
                    "longitude": 82.1998,
                  },
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  "name": "Acharya Shri Ravindra Shukla Shatri",
                  "jobTitle": "Vedic Astrologer & Shastri",
                  "telephone": "+91-80091-24454",
                  "url": `${SITE_URL}/about`,
                  "worksFor": {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
                {
                  "@type": "Service",
                  "name": "Kundali Reading",
                  "provider": {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
                {
                  "@type": "Service",
                  "name": "Kundali Matching",
                  "provider": {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
                {
                  "@type": "Service",
                  "name": "Horoscope Consultation",
                  "provider": {
                    "@id": `${SITE_URL}/#organization`,
                  },
                },
              ],
            }),
          }}
        />
        <ServiceWorkerRegister />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen-dynamic pt-20 flex flex-col">
          {children}
        </main>
        <Footer />
        <InstallAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
