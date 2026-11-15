"use client";

import Link from "next/link";
import { RASHI_NAMES, RASHI_LORDS, NAKSHATRA_NAMES, getJulianDay, getLahiriAyanamsha, getTropicalEclipticLongitude, normalizeDeg } from "@/lib/astrology";
import { useLanguage, RASHI_HI, PLANET_HI } from "@/app/components/ServiceWorkerRegister";

const THEMES: Record<number, { enFocus: string; hiFocus: string; enDesc: string; hiDesc: string; enColor: string; hiColor: string }> = {
  1:  { enFocus: "Self-Vitality & New Initiatives", hiFocus: "आत्मबल एवं नई शुरुआत", enDesc: "Chandra transiting your 1st house heightens intuition, personal magnetism, and emotional clarity. Favorable day to initiate personal goals.", hiDesc: "प्रथम भाव में चन्द्र गोचर आत्मविश्वास, अंतर्ज्ञान एवं सकारात्मक ऊर्जा बढ़ाता है। नए कार्यों के शुभारंभ हेतु उत्तम दिन।", enColor: "Saffron Gold", hiColor: "केसरिया स्वर्ण" },
  2:  { enFocus: "Wealth, Speech & Family Harmony", hiFocus: "धन, वाणी एवं कुटुम्ब सुख", enDesc: "Planetary emphasis on your 2nd house favors financial planning, family gatherings, and diplomatic communication.", hiDesc: "द्वितीय भाव का गोचर आर्थिक बचत, मधुर वाणी एवं पारिवारिक सामंजस्य के लिए अत्यंत शुभ है।", enColor: "Cream White", hiColor: "श्वेत क्रीम" },
  3:  { enFocus: "Courage, Short Travel & Enterprise", hiFocus: "पराक्रम, यात्रा एवं कार्य सिद्धि", enDesc: "Strong 3rd-house transit supports decisive communication, sibling cooperation, and completing pending professional tasks.", hiDesc: "तृतीय भाव का गोचर साहस, भाई-बहनों के सहयोग एवं लंबित व्यावसायिक कार्यों को पूर्ण करने में सहायक है।", enColor: "Emerald Green", hiColor: "पन्ना हरा" },
  4:  { enFocus: "Domestic Peace & Inner Reflection", hiFocus: "गृह सुख एवं मानसिक शांति", enDesc: "Focus on home, property matters, and emotional grounding. Spend quiet evening time in spiritual mantra japa.", hiDesc: "चतुर्थ भाव का गोचर माता के आशीर्वाद, भूमि-भवन संबंधी कार्यों एवं संध्या मंत्र जप के लिए अनुकूल है।", enColor: "Pearl Silver", hiColor: "मोती श्वेत" },
  5:  { enFocus: "Creativity, Intellect & Progeny", hiFocus: "बुद्धि, विद्या एवं संतान सुख", enDesc: "Auspicious 5th-house Purva Punya transit supports learning, creative problem-solving, and joyful news from children.", hiDesc: "पंचम पूर्वपुण्य भाव का गोचर अध्ययन, रचनात्मक निर्णय एवं संतान पक्ष से शुभ समाचार प्रदान करता है।", enColor: "Turmeric Yellow", hiColor: "हल्दी पीला" },
  6:  { enFocus: "Discipline, Health & Routine Mastery", hiFocus: "अनुशासन, स्वास्थ्य एवं कार्य निष्ठा", enDesc: "Channel energy into structured work routines and health discipline. Avoid unnecessary debates or impulsive lending.", hiDesc: "षष्ठ भाव का गोचर नियमित दिनचर्या, स्वास्थ्य संयम एवं कार्यक्षेत्र में अनुशासन बनाए रखने की प्रेरणा देता है।", enColor: "Deep Indigo", hiColor: "गहरा नीला" },
  7:  { enFocus: "Partnerships, Marriage & Agreements", hiFocus: "दांपत्य सामंजस्य एवं व्यापारिक अनुबंध", enDesc: "7th-house transit highlights spouse harmony, client negotiations, and collaborative relationships.", hiDesc: "सप्तम भाव का गोचर जीवनसाथी के साथ मधुरता एवं व्यापारिक साझेदारी में प्रगति लाता है।", enColor: "Lotus Pink", hiColor: "कमल गुलाबी" },
  8:  { enFocus: "Patience, Research & Spiritual Depth", hiFocus: "धैर्य, शोध एवं आध्यात्मिक चिंतन", enDesc: "Chandra in the 8th house calls for calm mindfulness, avoiding hasty financial risks, and practicing Rudra or Hanuman stotra.", hiDesc: "अष्टम भाव में चन्द्र गोचर के कारण धैर्य रखें, जल्दबाजी में निवेश न करें एवं श्री हनुमान चालीसा का पाठ करें।", enColor: "Sandalwood", hiColor: "चंदन" },
  9:  { enFocus: "Dharma, Fortune & Higher Guidance", hiFocus: "धर्म, भाग्य एवं गुरु कृपा", enDesc: "Blessed 9th-house Bhagya transit brings mentor support, spiritual upliftment, and long-term optimism.", hiDesc: "नवम भाग्य भाव का गोचर धर्म-कर्म, वरिष्ठजनों के मार्गदर्शन एवं भाग्योदय के नए अवसर लाता है।", enColor: "Royal Gold", hiColor: "स्वर्ण" },
  10: { enFocus: "Career Authority & Public Recognition", hiFocus: "कर्म क्षेत्र, पदोन्नति एवं यश", enDesc: "10th-house Karma transit energizes professional leadership, executive decisions, and recognition from seniors.", hiDesc: "दशम कर्म भाव का गोचर कार्यक्षेत्र में नेतृत्व, मान-सम्मान एवं उच्चाधिकारियों के सहयोग को प्रबल करता है।", enColor: "Sky Blue", hiColor: "आसमानी नीला" },
  11: { enFocus: "Gains, Network & Fulfilled Aspirations", hiFocus: "आर्थिक लाभ एवं मनोकामना पूर्ति", enDesc: "Highly favorable 11th-house Labha transit supports income growth, social alliances, and long-awaited rewards.", hiDesc: "एकादश लाभ भाव का गोचर आय वृद्धि, मित्रों से सहयोग एवं रुके हुए कार्यों की सिद्धि कराता है।", enColor: "Vermilion", hiColor: "सिंदूरी" },
  12: { enFocus: "Meditation, Charity & Mindful Rest", hiFocus: "ध्यान, दान-पुण्य एवं आत्मचिंतन", enDesc: "12th-house transit favors spiritual retreat, charitable giving (Dana), and restful recuperation before new cycles begin.", hiDesc: "द्वादश भाव का गोचर ईश्वरीय ध्यान, सात्विक दान एवं अनावश्यक व्यय पर नियंत्रण रखने का संकेत देता है।", enColor: "Lavender", hiColor: "हल्का बैंगनी" },
};

export default function HoroscopePage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const now = new Date();
  const jd = getJulianDay(now);
  const ayan = getLahiriAyanamsha(jd);
  const moonSid = normalizeDeg(getTropicalEclipticLongitude("Moon", jd) - ayan);
  const sunSid = normalizeDeg(getTropicalEclipticLongitude("Sun", jd) - ayan);
  const jupSid = normalizeDeg(getTropicalEclipticLongitude("Jupiter", jd) - ayan);
  const curMoonRashi = Math.floor(moonSid / 30);
  const curNak = Math.floor(moonSid / (360 / 27));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-block text-xs uppercase tracking-widest text-[#C9A84C] font-bold bg-[#1A1628] border border-[#C9A84C]/30 px-4 py-1.5 rounded-full mb-4">
          {now.toLocaleDateString(isHi ? "hi-IN" : "en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} • {isHi ? `चन्द्र: ${RASHI_HI[curMoonRashi]}` : `Moon in ${RASHI_NAMES[curMoonRashi]}`} ({NAKSHATRA_NAMES[curNak]})
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">
          {isHi ? "दैनिक वैदिक राशिफल (राशि भविष्य)" : "Daily Vedic Horoscope (Rashi Bhavishya)"}
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          {isHi
            ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री द्वारा चित्रपक्ष लाहिरि अयनांश पर आधारित आज का सटीक दैनिक गोचर फल।"
            : "Live daily Gochara (planetary transit) predictions calculated using Chitra Paksha Lahiri Ayanamsha by Acharya Shri Ravindra Shukla Shatri."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {RASHI_NAMES.map((rashi, idx) => {
          const mHouse = ((curMoonRashi - idx + 12) % 12) + 1;
          const jHouse = ((Math.floor(jupSid / 30) - idx + 12) % 12) + 1;
          const sHouse = ((Math.floor(sunSid / 30) - idx + 12) % 12) + 1;
          const t = THEMES[mHouse];
          const lordKey = RASHI_LORDS[idx];

          return (
            <div key={rashi} className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C9A84C]/60 transition-all shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-[#0D0B1A] rounded-full flex items-center justify-center border border-[#C9A84C]/30 text-[#C9A84C]">✧</div>
                  <span className="text-xs font-semibold text-[#C9A84C] bg-[#0D0B1A] px-3 py-1 rounded-full border border-[#C9A84C]/20">
                    {isHi ? `स्वामी: ${PLANET_HI[lordKey]?.split(" ")[0] || lordKey}` : `Lord: ${lordKey}`}
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-[#E8E4F0] mb-1">{isHi ? RASHI_HI[idx] : rashi}</h2>
                <div className="text-xs font-semibold text-[#C9A84C] mb-3">{isHi ? t.hiFocus : t.enFocus}</div>
                <p className="text-sm text-[#E8E4F0]/75 leading-relaxed mb-6">
                  {isHi
                    ? `${t.hiDesc} वर्तमान में गुरु आपके ${jHouse}वें भाव में एवं सूर्य ${sHouse}वें भाव में गोचरस्थ हैं।`
                    : `${t.enDesc} Jupiter transits your ${jHouse}th house while Sun illuminates your ${sHouse}th house.`}
                </p>
              </div>
              <div className="border-t border-[#C9A84C]/15 pt-4 flex items-center justify-between text-xs">
                <span className="text-[#E8E4F0]/70">{isHi ? "शुभ रंग" : "Shubh Color"}: <strong className="text-[#C9A84C]">{isHi ? t.hiColor : t.enColor}</strong></span>
                <Link href="/book?service=kundali" className="text-[#C9A84C] font-bold hover:underline">{isHi ? "परामर्श →" : "Consult →"}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
