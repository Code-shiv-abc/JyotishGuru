import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import KundaliMatchingForm from "./KundaliMatchingForm";

export const metadata: Metadata = {
  title: "Kundali Matching (Ashtakoot Guna Milan) | JyotishGuru",
  description: "Check compatibility for marriage using traditional Vedic Astrology Kundali Matching.",
  alternates: {
    canonical: `${SITE_URL}/kundali-matching`,
  },
  openGraph: {
    title: "Kundali Matching (Ashtakoot Guna Milan) | JyotishGuru",
    description: "Check compatibility for marriage using traditional Vedic Astrology Kundali Matching.",
    url: `${SITE_URL}/kundali-matching`,
  },
};

export default function KundaliMatchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">
          Kundali Matching
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Enter birth details of both partners to calculate compatibility (Guna Milan) based on traditional Vedic Astrology principles.
        </p>
      </div>
      <KundaliMatchingForm />
    </div>
  );
}
