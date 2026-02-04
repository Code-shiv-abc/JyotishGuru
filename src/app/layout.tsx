import type { Metadata } from "next";
import { Playfair_Display, Merriweather, Inter, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jyotishguru.com"),
  title: "Vedic Astrologer in Ayodhya | Acharya Shri Ravindra Shukla Shastri",
  description: "Consult Acharya Shri Ravindra Shukla Shastri, expert Vedic Astrologer in Ayodhya Dham, UP with 5+ years experience. Helping you understand your karmic path and inner self.",
  keywords: ["Vedic Astrology", "Ayodhya Dham", "Acharya Shri Ravindra Shukla Shastri", "Kundali", "Horoscope", "Karmic Path"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vedic Astrologer in Ayodhya | Acharya Shri Ravindra Shukla Shastri",
    description: "Expert Vedic Astrology consultation in Ayodhya Dham. Understand your karmic path with Acharya Shri Ravindra Shukla Shastri.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${merriweather.variable} ${inter.variable} ${lato.variable} antialiased font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Acharya Shri Ravindra Shukla Shastri",
              "jobTitle": "Vedic Astrologer",
              "url": "https://jyotishguru.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ayodhya Dham",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "IN",
              },
              "description":
                "Helping People Understand their karmic path and their Inner self online and offline.",
              "knowsAbout": [
                "Vedic Astrology",
                "Kundali",
                "Horoscope",
                "Karmic Path",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
