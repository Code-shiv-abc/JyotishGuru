import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { Sparkles, Clock, Video, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Vedic Astrology Consultation Services & Pricing",
  description: "Explore transparent pricing for 1-on-1 Vedic Astrology consultations with Acharya Shri Pankaj Shukla, including Janam Kundali Reading, Ashtakoot Matching, Career, and Gemstone Remedies.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Vedic Astrology Consultation Services | JyotishGuru",
    description: "Book 1-on-1 Parashari Kundali Reading, Marriage Matching, and Muhurat Calculation with Acharya Shri Pankaj Shukla.",
    url: `${SITE_URL}/services`,
  },
};

const services = [
  {
    slug: "kundali",
    title: "Comprehensive Kundali Reading",
    duration: "45 Mins",
    mode: "Video / Phone + Summary",
    description: "Deep Parashari analysis of your Lagna, Navamsha (D-9), active Vimshottari Dasha cycles, and personalized karmic remedies.",
    price: "₹1,100",
  },
  {
    slug: "matching",
    title: "Kundali Matching (Ashtakoot & Manglik)",
    duration: "45 Mins",
    mode: "Video / Phone + Report",
    description: "In-depth marriage compatibility beyond 36 Gunas—evaluating Nadi Dosha, Mangal Dosha cancellation, Dasha Sandhi, and marital longevity.",
    price: "₹1,500",
  },
  {
    slug: "career",
    title: "Career, Business & Finance",
    duration: "30 Mins",
    mode: "Video / Phone",
    description: "Strategic timing for job transitions, promotions, foreign settlement, and business ventures using Dashamsha (D-10) & Hora (D-2) charts.",
    price: "₹1,200",
  },
  {
    slug: "relationship",
    title: "Relationship & Family Harmony",
    duration: "30 Mins",
    mode: "Video / Phone",
    description: "Compassionate astrological guidance and practical Vedic remedies to resolve marital friction, delays in marriage, or family disputes.",
    price: "₹1,200",
  },
  {
    slug: "muhurat",
    title: "Shubh Muhurat Calculation",
    duration: "20 Mins",
    mode: "WhatsApp / Phone",
    description: "Auspicious Panchang electional timing for marriage, Griha Pravesh (housewarming), vehicle purchase, or business incorporation.",
    price: "₹500",
  },
  {
    slug: "remedies",
    title: "Gemstone (Ratna) & Vedic Remedies",
    duration: "30 Mins",
    mode: "Video / Phone",
    description: "Scientific selection of life-supporting gemstones, Beej Mantras, and charitable planetary Upayas without fear-inducing sales tactics.",
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
          Direct 1-on-1 consultations with Acharya Shri Pankaj Shukla from Ayodhya Dham. Transparent dakshina pricing with zero hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.slug}
            className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 hover:border-[#C9A84C]/60 transition-all shadow-lg flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-[#C9A84C]" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-3 text-xs text-[#E8E4F0]/75 bg-[#0D0B1A] px-3 py-1.5 rounded-full border border-[#C9A84C]/20">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C9A84C]" aria-hidden="true" />
                    {service.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-[#C9A84C]" aria-hidden="true" />
                    {service.mode}
                  </span>
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
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#E8E4F0]/60">Dakshina</span>
                <span className="text-2xl font-serif font-bold text-[#C9A84C]">{service.price}</span>
              </div>
              <Link
                href={`/book?service=${encodeURIComponent(service.slug)}&price=${encodeURIComponent(service.price)}`}
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
