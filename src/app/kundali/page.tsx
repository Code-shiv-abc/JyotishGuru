import { Metadata } from "next";
import { Suspense } from "react";
import { SITE_URL } from "@/lib/constants";
import KundaliForm from "./KundaliForm";

export const metadata: Metadata = {
  title: "Free Janam Kundali Generation (Lagna, Navamsha & Dasha) | JyotishGuru",
  description: "Generate your accurate Parashari Vedic Janam Kundali, Navamsha (D-9), 120-Year Vimshottari Dasha, and Yoga analysis by Acharya Shri Ravindra Shukla Shatri.",
  alternates: {
    canonical: `${SITE_URL}/kundali`,
  },
  openGraph: {
    title: "Free Janam Kundali Generation | JyotishGuru",
    description: "Generate your comprehensive Vedic Astrology birth chart with Lagna, Navamsha, and Vimshottari Dasha.",
    url: `${SITE_URL}/kundali`,
  },
};

export default function KundaliPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">
          Free Janam Kundali Generation
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Enter your birth details below to generate your Parashari Vedic birth chart, Navamsha (D-9), Panchang, and 120-year Vimshottari Dasha timeline.
        </p>
      </div>
      <Suspense fallback={<div className="text-center text-[#C9A84C] py-12">Loading Kundali Studio...</div>}>
        <KundaliForm />
      </Suspense>
    </div>
  );
}
