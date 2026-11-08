import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import {
  RASHI_NAMES,
  RASHI_LORDS,
  NAKSHATRA_NAMES,
  getJulianDay,
  getLahiriAyanamsha,
  getTropicalEclipticLongitude,
  normalizeDeg,
} from "@/lib/astrology";

export const metadata: Metadata = {
  title: "Daily Vedic Horoscope (Rashi Bhavishya) | JyotishGuru",
  description: "Read your daily Vedic Chandra Rashi horoscope and planetary transit guidance by Acharya Shri Ravindra Shukla Shatri.",
  alternates: {
    canonical: `${SITE_URL}/horoscope`,
  },
  openGraph: {
    title: "Daily Vedic Horoscope (Rashi Bhavishya) | JyotishGuru",
    description: "Daily Vedic planetary transit insights tailored to all 12 Moon signs by Acharya Shri Ravindra Shukla Shatri.",
    url: `${SITE_URL}/horoscope`,
  },
};

const HOUSE_THEMES: Record<number, { focus: string; guidance: string; luckyColor: string }> = {
  1:  { focus: "Self-Vitality & New Initiatives", guidance: "Chandra transiting your 1st house heightens intuition, personal magnetism, and emotional clarity. Favorable day to initiate personal goals.", luckyColor: "Saffron Gold" },
  2:  { focus: "Wealth, Speech & Family Harmony", guidance: "Planetary emphasis on your 2nd house favors financial planning, family gatherings, and diplomatic communication.", luckyColor: "Cream White" },
  3:  { focus: "Courage, Short Travel & Enterprise", guidance: "Strong 3rd-house transit supports decisive communication, sibling cooperation, and completing pending professional tasks.", luckyColor: "Emerald Green" },
  4:  { focus: "Domestic Peace & Inner Reflection", guidance: "Focus on home, property matters, and emotional grounding. Spend quiet evening time in spiritual mantra japa.", luckyColor: "Pearl Silver" },
  5:  { focus: "Creativity, Intellect & Progeny", guidance: "Auspicious 5th-house Purva Punya transit supports learning, creative problem-solving, and joyful news from children.", luckyColor: "Turmeric Yellow" },
  6:  { focus: "Discipline, Health & Routine Mastery", guidance: "Channel energy into structured work routines and health discipline. Avoid unnecessary debates or impulsive lending.", luckyColor: "Deep Indigo" },
  7:  { focus: "Partnerships, Marriage & Agreements", guidance: "7th-house transit highlights spouse harmony, client negotiations, and collaborative relationships.", luckyColor: "Lotus Pink" },
  8:  { focus: "Patience, Research & Spiritual Depth", guidance: "Chandra in the 8th house calls for calm mindfulness, avoiding hasty financial risks, and practicing Rudra or Hanuman stotra.", luckyColor: "Sandalwood" },
  9:  { focus: "Dharma, Fortune & Higher Guidance", guidance: "Blessed 9th-house Bhagya transit brings mentor support, spiritual upliftment, and long-term optimism.", luckyColor: "Royal Gold" },
  10: { focus: "Career Authority & Public Recognition", guidance: "10th-house Karma transit energizes professional leadership, executive decisions, and recognition from seniors.", luckyColor: "Sky Blue" },
  11: { focus: "Gains, Network & Fulfilled Aspirations", guidance: "Highly favorable 11th-house Labha transit supports income growth, social alliances, and long-awaited rewards.", luckyColor: "Vermilion" },
  12: { focus: "Meditation, Charity & Mindful Rest", guidance: "12th-house transit favors spiritual retreat, charitable giving (Dana), and restful recuperation before new cycles begin.", luckyColor: "Lavender" },
};

export default function HoroscopePage() {
  const now = new Date();
  const jd = getJulianDay(now);
  const ayanamsha = getLahiriAyanamsha(jd);
  const moonSidereal = normalizeDeg(getTropicalEclipticLongitude("Moon", jd) - ayanamsha);
  const sunSidereal = normalizeDeg(getTropicalEclipticLongitude("Sun", jd) - ayanamsha);
  const jupSidereal = normalizeDeg(getTropicalEclipticLongitude("Jupiter", jd) - ayanamsha);

  const currentMoonRashiIdx = Math.floor(moonSidereal / 30);
  const currentNakIdx = Math.floor(moonSidereal / (360 / 27));
  const formattedDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-block text-xs uppercase tracking-widest text-[#C9A84C] font-bold bg-[#1A1628] border border-[#C9A84C]/30 px-4 py-1.5 rounded-full mb-4">
          {formattedDate} • Moon in {RASHI_NAMES[currentMoonRashiIdx]} ({NAKSHATRA_NAMES[currentNakIdx]})
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">
          Daily Vedic Horoscope (Rashi Bhavishya)
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Live daily Gochara (planetary transit) predictions calculated using Chitra Paksha Lahiri Ayanamsha by Acharya Shri Ravindra Shukla Shatri.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {RASHI_NAMES.map((rashi, idx) => {
          const moonHouse = ((currentMoonRashiIdx - idx + 12) % 12) + 1;
          const jupHouse = ((Math.floor(jupSidereal / 30) - idx + 12) % 12) + 1;
          const sunHouse = ((Math.floor(sunSidereal / 30) - idx + 12) % 12) + 1;
          const theme = HOUSE_THEMES[moonHouse];

          return (
            <div
              key={rashi}
              className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C9A84C]/60 transition-all group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#0D0B1A] rounded-full flex items-center justify-center border border-[#C9A84C]/30 group-hover:bg-[#C9A84C]/15 transition-colors">
                    <span className="text-[#C9A84C] text-xl font-serif">✧</span>
                  </div>
                  <span className="text-xs font-semibold text-[#C9A84C] bg-[#0D0B1A] px-3 py-1 rounded-full border border-[#C9A84C]/20">
                    Lord: {RASHI_LORDS[idx]}
                  </span>
                </div>

                <h2 className="text-xl font-serif font-bold text-[#E8E4F0] mb-1">
                  {rashi}
                </h2>
                <div className="text-xs font-semibold text-[#C9A84C] mb-3">
                  {theme.focus}
                </div>
                <p className="text-sm text-[#E8E4F0]/75 leading-relaxed mb-6">
                  {theme.guidance} Jupiter transits your {jupHouse}th house while Sun illuminates your {sunHouse}th house.
                </p>
              </div>

              <div className="border-t border-[#C9A84C]/15 pt-4 flex items-center justify-between text-xs">
                <span className="text-[#E8E4F0]/70">
                  Shubh Color: <strong className="text-[#C9A84C]">{theme.luckyColor}</strong>
                </span>
                <Link
                  href="/book?service=kundali"
                  className="text-[#C9A84C] font-bold hover:underline"
                >
                  Consult →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
