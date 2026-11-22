import { Metadata } from "next";
import { Suspense } from "react";
import { SITE_URL } from "@/lib/constants";
import KundaliForm from "./KundaliForm";
import KundaliProSuite from "@/components/astrology/KundaliProSuite";

export const metadata: Metadata = {
  title:
    "Free Janam Kundali, 16 Shodashvarga (D1–D60), Bhava Chalit & 337-Bindu Ashtakavarga | JyotishGuru",
  description:
    "Generate accurate Parashari Vedic Janam Kundali, 16 Shodashvarga (D-1 to D-60), Sripati Bhava Chalit, exact 337-Bindu Ashtakavarga, and 3-level Vimshottari Dasha by Acharya Shri Ravindra Shukla Shatri, Ayodhya Dham.",
  alternates: {
    canonical: `${SITE_URL}/kundali`,
  },
  openGraph: {
    title: "Astrologer-Grade Janam Kundali, Shodashvarga & Ashtakavarga | JyotishGuru",
    description:
      "JPL/VSOP87 Drik Ganita Kundali with 16 Shodashvarga (D-1 to D-60), Sripati Bhava Chalit, 337-Bindu Ashtakavarga, and 3-level Vimshottari Dasha.",
    url: `${SITE_URL}/kundali`,
  },
};

export default function KundaliPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">
          Free Janam Kundali &amp; Astrologer Pro Studio
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Generate your Parashari Vedic birth chart, 16 Shodashvarga (D-1 to D-60), Sripati Bhava Chalit, 337-Bindu Ashtakavarga, and 3-level Vimshottari Dasha.
        </p>
      </div>
      <Suspense fallback={<div className="text-center text-[#C9A84C] py-12">Loading Kundali Studio...</div>}>
        <KundaliForm />
      </Suspense>
      <KundaliProSuite />
    </div>
  );
}
// END OF FILE
