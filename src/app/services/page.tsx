import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Astrology Services",
  description: "Explore Vedic astrology services including Kundali Reading, Match Making, Horoscope Consultation, and Gemstone Advice.",
};

const services = [
  {
    title: "Kundali Reading",
    description: "Detailed analysis of your birth chart to understand your strengths, weaknesses, and life path.",
    price: "₹1100"
  },
  {
    title: "Kundali Matching (Guna Milan)",
    description: "Compatibility analysis for marriage based on traditional Ashtakoot system.",
    price: "₹1500"
  },
  {
    title: "Career & Finance Consultation",
    description: "Guidance on professional life, business prospects, and financial stability.",
    price: "₹1200"
  },
  {
    title: "Relationship & Marriage",
    description: "Insights into love life, marital harmony, and resolving relationship issues.",
    price: "₹1200"
  },
  {
    title: "Muhurat Calculation",
    description: "Finding the most auspicious time for significant life events like marriage, business launch, or property purchase.",
    price: "₹500"
  },
  {
    title: "Gemstone & Remedy Consultation",
    description: "Personalized advice on gemstones, mantras, and Vedic remedies to mitigate doshas and enhance positive planetary influences.",
    price: "₹800"
  }
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          Vedic Astrology Services
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Discover traditional, accurate, and insightful astrological guidance tailored to your life's unique journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 hover:border-[#C9A84C]/50 transition-colors shadow-lg flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-[#C9A84C] font-serif text-xl">✨</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-4">
                {service.title}
              </h3>
              <p className="text-[#E8E4F0]/70 mb-8 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#C9A84C]/10 pt-6">
              <span className="text-xl font-bold text-[#C9A84C]">{service.price}</span>
              <button className="text-sm font-semibold text-[#E8E4F0] hover:text-[#C9A84C] transition-colors bg-[#0D0B1A] px-4 py-2 rounded-full border border-[#C9A84C]/20">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}