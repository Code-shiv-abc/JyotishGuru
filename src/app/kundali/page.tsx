import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import KundaliForm from "./KundaliForm";

export const metadata: Metadata = {
  title: "Free Kundali Generation | JyotishGuru",
  description: "Generate your free comprehensive Vedic Astrology Kundali (Birth Chart).",
  alternates: {
    canonical: `${SITE_URL}/kundali`,
  },
  openGraph: {
    title: "Free Kundali Generation | JyotishGuru",
    description: "Generate your free comprehensive Vedic Astrology Kundali (Birth Chart).",
    url: `${SITE_URL}/kundali`,
  },
};

export default function KundaliPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">
          Free Kundali Generation
        </h1>
        <p className="text-lg text-[#E8E4F0]/80">
          Enter your birth details below to generate your comprehensive Vedic Astrology birth chart.
        </p>
      </div>
      <KundaliForm />
    </div>
  );
}
