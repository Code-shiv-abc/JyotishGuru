import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Horoscope",
  description: "Read your daily horoscope and discover what the stars have in store for your zodiac sign.",
};

const rashis = [
  "Aries (Mesh)", "Taurus (Vrishabha)", "Gemini (Mithun)",
  "Cancer (Karka)", "Leo (Simha)", "Virgo (Kanya)",
  "Libra (Tula)", "Scorpio (Vrishchika)", "Sagittarius (Dhanu)",
  "Capricorn (Makar)", "Aquarius (Kumbha)", "Pisces (Meen)"
];

export default function HoroscopePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-[#C9A84C] mb-4">
          Daily Horoscope
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Choose your zodiac sign to read your daily horoscope prediction based on Vedic Astrology.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rashis.map((rashi) => (
          <div
            key={rashi}
            className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-xl p-6 text-center hover:border-[#C9A84C]/50 transition-colors cursor-pointer group"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-[#0D0B1A] rounded-full flex items-center justify-center border border-[#C9A84C]/20 group-hover:bg-[#C9A84C]/10 transition-colors">
              {/* Placeholder for Rashi icon */}
              <span className="text-[#C9A84C] text-2xl font-serif">✧</span>
            </div>
            <h2 className="text-xl font-serif font-semibold text-[#E8E4F0] mb-2">
              {rashi}
            </h2>
            <p className="text-sm text-[#E8E4F0]/70 line-clamp-3">
              Placeholder text for daily prediction. The stars suggest a time of inner reflection and potential growth in your personal endeavors today.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}