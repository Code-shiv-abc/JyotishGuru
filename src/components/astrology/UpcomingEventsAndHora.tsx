"use client";

import React, { useMemo, useState } from "react";
import * as Astronomy from "astronomy-engine";
import { CalendarDays, Clock, Sparkles, ChevronDown, Eclipse } from "lucide-react";
import {
  computeDailyPanchang,
  formatLocalTime,
  type PanchangCity,
} from "@/lib/panchangEngine";

interface Props {
  dateStr: string;
  city: PanchangCity;
  isHi: boolean;
  onSelectDate: (newDate: string) => void;
}

const HORA_PLANETS = [
  { key: "Sun", en: "Sun (Surya)", hi: "सूर्य होरा", bestEn: "Govt. work, leadership, vitality", bestHi: "राजकीय कार्य, नेतृत्व, मान-सम्मान", tone: "amber" },
  { key: "Venus", en: "Venus (Shukra)", hi: "शुक्र होरा", bestEn: "Marriage, arts, luxury, shopping", bestHi: "विवाह, कला, वाहन व शुभ खरीदारी", tone: "emerald" },
  { key: "Mercury", en: "Mercury (Budh)", hi: "बुध होरा", bestEn: "Business, accounts, study, writing", bestHi: "व्यापार, शिक्षा, लेखन व संवाद", tone: "emerald" },
  { key: "Moon", en: "Moon (Chandra)", hi: "चन्द्र होरा", bestEn: "Travel, family, water/dairy, calm work", bestHi: "यात्रा, परिवार व जनसंपर्क कार्य", tone: "sky" },
  { key: "Saturn", en: "Saturn (Shani)", hi: "शनि होरा", bestEn: "Discipline, land, iron, avoid new starts", bestHi: "श्रम, भूमि व सेवा कार्य (नया आरंभ टालें)", tone: "rose" },
  { key: "Jupiter", en: "Jupiter (Guru)", hi: "गुरु होरा", bestEn: "Best for all auspicious & financial work", bestHi: "सभी शुभ, धार्मिक व आर्थिक कार्यों हेतु श्रेष्ठ", tone: "emerald" },
  { key: "Mars", en: "Mars (Mangal)", hi: "मंगल होरा", bestEn: "Courage, legal, technical, property", bestHi: "साहस, भूमि, तकनीक व वाद-विवाद विजय", tone: "rose" },
];

const WEEKDAY_START_HORA = [0, 3, 6, 2, 5, 1, 4];

const FAQS = [
  {
    qEn: "How are Tithi, Nakshatra, and Rahu Kaal calculated on JyotishGuru?",
    qHi: "ज्योतिषगुरु पर तिथि, नक्षत्र और राहु काल की गणना कैसे की जाती है?",
    aEn: "We calculate topocentric Sunrise and Sunset for your exact selected city or GPS coordinates using Drik Ganita with Chitra Paksha Lahiri Ayanamsha, then divide the actual daytime duration into 8 equal segments for Rahu Kaal, Yamaganda, Gulika, and Choghadiya.",
    aHi: "हम आपके चुने गए शहर या GPS स्थान के सटीक स्थानीय सूर्योदय और सूर्यास्त की गणना दृक् गणित एवं चित्रपक्ष लाहिड़ी अयनांश से करते हैं, फिर वास्तविक दिनमान को 8 भागों में विभाजित कर राहु काल, यमगण्ड, गुलिक और चौघड़िया निकालते हैं।",
  },
  {
    qEn: "What is the difference between Purnimanta and Amanta Masa?",
    qHi: "पूर्णिमांत और अमांत हिंदू मास में क्या अंतर है?",
    aEn: "North Indian Panchangs (Ayodhya, Kashi, UP, Delhi, MP, Rajasthan) follow Purnimanta Masa where a lunar month ends on Purnima, while Maharashtra, Gujarat, and South India follow Amanta Masa ending on Amavasya. Both are shown here.",
    aHi: "उत्तर भारतीय पंचांग (अयोध्या, काशी, उ.प्र., दिल्ली, म.प्र., राजस्थान) पूर्णिमांत मास मानते हैं जो पूर्णिमा को समाप्त होता है, जबकि महाराष्ट्र, गुजरात व दक्षिण भारत में अमांत मास प्रचलित है। यहाँ दोनों प्रदर्शित हैं।",
  },
  {
    qEn: "What does Chandrashtama mean in the Daily Horoscope?",
    qHi: "दैनिक राशिफल में 'चन्द्राष्टम' का क्या अर्थ है?",
    aEn: "Chandrashtama occurs when the live transiting Moon passes through the 8th house from your natal Moon sign (Rashi). During these ~2.25 days, Vedic astrology recommends avoiding high-risk investments, heated arguments, and hasty decisions.",
    aHi: "जब गोचर का चन्द्रमा आपकी जन्म राशि से अष्टम भाव में भ्रमण करता है, तो उसे चन्द्राष्टम कहते हैं। इन लगभग सवा दो दिनों में बड़े निवेश, विवाद और जल्दबाजी के निर्णयों से बचने की सलाह दी जाती है।",
  },
];

export default function UpcomingEventsAndHora({ dateStr, city, isHi, onSelectDate }: Props) {
  const [horaTab, setHoraTab] = useState<"day" | "night">("day");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const horas = useMemo(() => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const localMidnightUtcMs = Date.UTC(y, m - 1, d, 0, 0, 0) - city.utcOffsetMin * 60000;
    const baseDayLocalMs = Date.UTC(y, m - 1, d, 0, 0, 0);
    const observer = new Astronomy.Observer(city.lat, city.lon, city.elevation);

    const sr = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, new Date(localMidnightUtcMs), 1);
    const sunriseMs = sr ? sr.date.getTime() : localMidnightUtcMs + 6 * 3600000;
    const ss = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, new Date(sunriseMs), 1);
    const sunsetMs = ss ? ss.date.getTime() : sunriseMs + 12 * 3600000;
    const nsr = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, new Date(sunsetMs), 1);
    const nextSunriseMs = nsr ? nsr.date.getTime() : sunriseMs + 24 * 3600000;

    const weekday = new Date(baseDayLocalMs).getUTCDay();
    const startIdx = WEEKDAY_START_HORA[weekday];
    const dayStep = (sunsetMs - sunriseMs) / 12;
    const nightStep = (nextSunriseMs - sunsetMs) / 12;

    const dayHoras = Array.from({ length: 12 }, (_, i) => ({
      planet: HORA_PLANETS[(startIdx + i) % 7],
      start: formatLocalTime(sunriseMs + dayStep * i, city.utcOffsetMin, baseDayLocalMs),
      end: formatLocalTime(sunriseMs + dayStep * (i + 1), city.utcOffsetMin, baseDayLocalMs),
    }));

    const nightHoras = Array.from({ length: 12 }, (_, i) => ({
      planet: HORA_PLANETS[(startIdx + 12 + i) % 7],
      start: formatLocalTime(sunsetMs + nightStep * i, city.utcOffsetMin, baseDayLocalMs),
      end: formatLocalTime(sunsetMs + nightStep * (i + 1), city.utcOffsetMin, baseDayLocalMs),
    }));

    return { dayHoras, nightHoras };
  }, [dateStr, city]);

  const upcomingEvents = useMemo(() => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const baseUtc = Date.UTC(y, m - 1, d, 12, 0, 0);
    const list: { date: string; varaEn: string; varaHi: string; titlesEn: string[]; titlesHi: string[] }[] = [];

    for (let i = 0; i < 30; i++) {
      const targetStr = new Date(baseUtc + i * 86400000).toISOString().slice(0, 10);
      const rep = computeDailyPanchang(targetStr, city);
      if (rep.events.length > 0) {
        list.push({
          date: targetStr,
          varaEn: rep.vara.en,
          varaHi: rep.vara.hi,
          titlesEn: rep.events.map((e) => e.titleEn),
          titlesHi: rep.events.map((e) => e.titleHi),
        });
      }
    }
    return list;
  }, [dateStr, city]);

  const eclipses = useMemo(() => {
    const startDate = new Date(`${dateStr}T00:00:00Z`);
    const solar = Astronomy.SearchGlobalSolarEclipse(startDate);
    const lunar = Astronomy.SearchLunarEclipse(startDate);
    const fmtDate = (dt: Date) => {
      const local = new Date(dt.getTime() + city.utcOffsetMin * 60000);
      return `${local.toISOString().slice(0, 10)} (${String(local.getUTCHours()).padStart(2, "0")}:${String(
        local.getUTCMinutes()
      ).padStart(2, "0")} ${city.tzLabel})`;
    };
    return {
      solarDate: fmtDate(solar.peak.date),
      solarKind: solar.kind,
      lunarDate: fmtDate(lunar.peak.date),
      lunarKind: lunar.kind,
    };
  }, [dateStr, city]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: isHi ? f.qHi : f.qEn,
      acceptedAnswer: { "@type": "Answer", text: isHi ? f.aHi : f.aEn },
    })),
  };

  const toneClass = (tone: string) => {
    if (tone === "emerald") return "bg-emerald-500/15 border-emerald-500/30 text-emerald-200";
    if (tone === "amber") return "bg-amber-500/15 border-amber-500/30 text-amber-200";
    if (tone === "sky") return "bg-sky-500/15 border-sky-500/30 text-sky-200";
    return "bg-rose-500/15 border-rose-500/30 text-rose-200";
  };

  return (
    <div className="space-y-8 pt-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="rounded-2xl bg-[#15112A] border border-amber-500/20 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-amber-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              {isHi ? "आज की वैदिक ग्रह होरा (Planetary Hora)" : "Today's Vedic Planetary Hora (Muhurat Hours)"}
            </h2>
            <p className="text-xs text-amber-200/70 mt-1">
              {isHi
                ? "ज्योतिषियों द्वारा शुभ कार्य, यात्रा व व्यापार हेतु प्रयुक्त 12 दिन व 12 रात्रि होरा"
                : "12 Day & 12 Night planetary hours dynamically divided from local Sunrise & Sunset"}
            </p>
          </div>
          <div className="inline-flex rounded-xl bg-black/40 p-1 border border-amber-500/20">
            <button
              type="button"
              onClick={() => setHoraTab("day")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                horaTab === "day" ? "bg-amber-500 text-black" : "text-amber-200 hover:text-white"
              }`}
            >
              {isHi ? "दिन की होरा (12)" : "Day Hora (12)"}
            </button>
            <button
              type="button"
              onClick={() => setHoraTab("night")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                horaTab === "night" ? "bg-amber-500 text-black" : "text-amber-200 hover:text-white"
              }`}
            >
              {isHi ? "रात्रि की होरा (12)" : "Night Hora (12)"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(horaTab === "day" ? horas.dayHoras : horas.nightHoras).map((h, idx) => (
            <div key={idx} className={`rounded-xl border p-3.5 ${toneClass(h.planet.tone)}`}>
              <div className="flex items-center justify-between text-sm font-bold">
                <span>{isHi ? h.planet.hi : h.planet.en}</span>
                <span className="text-xs font-mono opacity-90">{h.start} – {h.end}</span>
              </div>
              <p className="text-xs opacity-85 mt-1.5">{isHi ? h.planet.bestHi : h.planet.bestEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-[#15112A] border border-amber-500/20 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-amber-200 flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5 text-amber-400" />
            {isHi ? "आगामी 30 दिनों के प्रमुख व्रत, एकादशी एवं पर्व" : "Upcoming 30-Day Vrats, Ekadashi & Festivals"}
          </h2>

          <div className="divide-y divide-white/10 max-h-[380px] overflow-y-auto pr-1">
            {upcomingEvents.map((ev) => (
              <div key={ev.date} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-sm font-bold text-amber-100">
                    {(isHi ? ev.titlesHi : ev.titlesEn).join(" • ")}
                  </div>
                  <div className="text-xs text-amber-300/75 mt-0.5">
                    {ev.date} • {isHi ? ev.varaHi : ev.varaEn}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectDate(ev.date)}
                  className="self-start sm:self-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500 text-amber-200 hover:text-black border border-amber-500/30 transition"
                >
                  {isHi ? "पंचांग देखें" : "View Panchang"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-[#1E143B] to-[#15112A] border border-amber-500/25 p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-amber-200 flex items-center gap-2">
            <Eclipse className="w-5 h-5 text-amber-400" />
            {isHi ? "आगामी ग्रहण (Grahan Alert)" : "Next Eclipses (Grahan)"}
          </h2>
          <div className="p-4 rounded-xl bg-black/35 border border-amber-500/20 space-y-1">
            <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
              {isHi ? "अगला सूर्य ग्रहण (Solar Eclipse)" : "Next Solar Eclipse (Surya Grahan)"}
            </div>
            <div className="text-sm font-bold text-amber-50">{eclipses.solarDate}</div>
            <div className="text-xs text-amber-200/75 capitalize">{eclipses.solarKind}</div>
          </div>
          <div className="p-4 rounded-xl bg-black/35 border border-amber-500/20 space-y-1">
            <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
              {isHi ? "अगला चन्द्र ग्रहण (Lunar Eclipse)" : "Next Lunar Eclipse (Chandra Grahan)"}
            </div>
            <div className="text-sm font-bold text-amber-50">{eclipses.lunarDate}</div>
            <div className="text-xs text-amber-200/75 capitalize">{eclipses.lunarKind}</div>
          </div>
          <p className="text-xs text-amber-200/70 leading-relaxed">
            {isHi
              ? "सूतक काल एवं शहर-वार ग्रहण दृश्यता की पुष्टि हेतु आचार्य श्री रविन्द्र शुक्ल शास्त्री जी से संपर्क करें।"
              : "For Sutak Kaal timings and local visibility guidance, consult Acharya Shri Ravindra Shukla Shatri."}
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-[#15112A] border border-amber-500/20 p-5 sm:p-6">
        <h2 className="text-xl font-bold text-amber-200 flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          {isHi ? "पंचांग एवं राशिफल से जुड़े प्रमुख प्रश्न (FAQ)" : "Frequently Asked Questions — Panchang & Horoscope"}
        </h2>
        <div className="space-y-3">
          {FAQS.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-black/30 border border-white/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-amber-100"
              >
                <span>{isHi ? item.qHi : item.qEn}</span>
                <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                  {isHi ? item.aHi : item.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
// END OF FILE
