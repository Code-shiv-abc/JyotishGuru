import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { Sparkles, Clock, Video, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Vedic Astrology Consultation Services | JyotishGuru",
  description: "Explore Vedic Astrology consultation services with Acharya Shri Ravindra Shukla Shatri including Kundali Reading, Kundali Matching, Career & Finance, and Vedic Remedies.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Vedic Astrology Consultation Services | JyotishGuru",
    description: "Book 1-on-1 Vedic Astrology consultations with Acharya Shri Ravindra Shukla Shatri.",
    url: `${SITE_URL}/services`,
  },
};

const services = [
  {
    slug: "kundali",
    title: "Kundali Reading",
    duration: "45 Mins",
    mode: "Video / Phone",
    description: "Detailed Parashari analysis of your Lagna, Navamsha (D-9), Vimshottari Dasha cycles, and life path with Acharya Shri Ravindra Shukla Shatri.",
    price: "₹1100",
  },
  {
    slug: "matching",
    title: "Kundali Matching (Guna Milan)",
    duration: "45 Mins",
    mode: "Video / Phone",
    description: "Comprehensive marriage compatibility analysis based on the traditional 36-Guna Ashtakoot system, Manglik check, and Nadi Dosha remedies.",
    price: "₹1500",
  },
  {
    slug: "career",
    title: "Career & Finance Consultation",
    duration: "30 Mins",
    mode: "Video / Phone",
    description: "Strategic guidance on professional life, job transitions, business prospects, and financial stability using Dashamsha (D-10) charts.",
    price: "₹1200",
  },
  {
    slug: "relationship",
    title: "Relationship & Marriage",
    duration: "30 Mins",
    mode: "Video / Phone",
    description: "Compassionate Vedic insights into love life, marital harmony, and spiritual remedies for resolving family and relationship challenges.",
    price: "₹1200",
  },
  {
    slug: "muhurat",
    title: "Muhurat Calculation",
    duration: "20 Mins",
    mode: "WhatsApp / Phone",
    description: "Finding the most auspicious Panchang electional window for marriage, Griha Pravesh, business launch, or property purchase.",
    price: "₹500",
  },
  {
    slug: "remedies",
    title: "Gemstone & Remedy Consultation",
    duration: "30 Mins",
    mode: "Video / Phone",
    description: "Personalized advice on gemstones (Ratna), Beej Mantras, and Vedic Upayas to mitigate planetary doshas and strengthen benefic yogas.",
    price: "₹800",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          Vedic Astrology Services
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Discover traditional, accurate, and insightful astrological guidance with Acharya Shri Ravindra Shukla Shatri tailored to your life&apos;s unique journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.slug}
            className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 hover:border-[#C9A84C]/60 transition-colors shadow-lg flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-[#C9A84C]" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#E8E4F0]/75 bg-[#0D0B1A] px-3 py-1.5 rounded-full border border-[#C9A84C]/20">
                  <Clock className="w-3.5 h-3.5 text-[#C9A84C]" aria-hidden="true" />
                  <span>{service.duration}</span>
                  <span>•</span>
                  <Video className="w-3.5 h-3.5 text-[#C9A84C]" aria-hidden="true" />
                  <span>{service.mode}</span>
                </div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-3">
                {service.title}
              </h2>
              <p className="text-[#E8E4F0]/75 mb-8 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#C9A84C]/15 pt-6">
              <span className="text-2xl font-serif font-bold text-[#C9A84C]">{service.price}</span>
              <Link
                href={`/book?service=${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0D0B1A] bg-[#C9A84C] hover:bg-[#d9b85c] transition-colors px-5 py-2.5 rounded-full shadow-md"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
