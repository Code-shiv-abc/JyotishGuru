import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Aaj Ka Panchang, Shubh Muhurat, Choghadiya & Daily Rashifal | JyotishGuru — Acharya Shri Ravindra Shukla Shatri",
  description:
    "Live Drik Ganita Panchang, exact local Sunrise/Sunset, Tithi & Nakshatra Samapti Kaal, Abhijit Muhurat, Rahu Kaal, Day & Night Choghadiya, Ekadashi/Pradosh Vrats, and Chandra Gochara Daily Horoscope in Hindi & English by Acharya Shri Ravindra Shukla Shatri, Ayodhya Dham.",
  keywords: [
    "Aaj ka Panchang",
    "आज का पंचांग",
    "Ayodhya Panchang today",
    "Daily Rashifal in Hindi",
    "दैनिक राशिफल",
    "Shubh Muhurat today",
    "Abhijit Muhurat",
    "Rahu Kaal today",
    "Day Night Choghadiya",
    "Ekadashi Vrat date",
    "Drik Panchang",
    "Acharya Shri Ravindra Shukla Shatri",
    "JyotishGuru Ayodhya",
  ],
  alternates: {
    canonical: `${SITE_URL}/horoscope`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: `${SITE_URL}/horoscope`,
    siteName: "JyotishGuru — Acharya Shri Ravindra Shukla Shatri",
    title: "Live Drik Panchang, Shubh Muhurat, Choghadiya & Daily Rashifal",
    description:
      "Exact city-specific Sunrise/Sunset, Tithi end-times, Choghadiya, Rahu Kaal, Vrats, and live Chandra Gochara Rashifal in Hindi & English.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaj Ka Panchang, Shubh Muhurat & Daily Rashifal | JyotishGuru",
    description:
      "Drik Ganita Panchang, exact Tithi Samapti Kaal, Choghadiya, and live Moon-transit horoscopes by Acharya Shri Ravindra Shukla Shatri.",
  },
};

export default function HoroscopeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
// END OF FILE
