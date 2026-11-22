"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Sparkles, Sunrise, Sunset, Clock, ShieldAlert, Moon, ArrowRight, Share2, Calendar
} from "lucide-react";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";
import { computeDailyPanchang } from "@/lib/panchangEngine";

function getTodayIST(): string {
  const ist = new Date(Date.now() + 330 * 60000);
  return ist.toISOString().slice(0, 10);
}

export default function HomePanchangBanner() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const report = useMemo(() => computeDailyPanchang(getTodayIST(), "ayodhya"), []);

  const shareText = isHi
    ? `🙏 *आज का अयोध्या धाम पंचांग* (${report.dateStr})\nविक्रम संवत् ${report.samvat.vikramSamvat} | ${report.samvat.purnimantaHi} मास\n🌙 ${report.paksha.hi} ${report.tithi.hi} (तक ${report.tithi.endTime})\n⭐ नक्षत्र: ${report.nakshatra.hi}\n✨ अभिजित मुहूर्त: ${report.auspicious.abhijitMuhurat}\n⚠ राहु काल: ${report.inauspicious.rahuKaal}\n— आचार्य श्री रविन्द्र शुक्ल शास्त्री\n🔗 https://jyotish-guru.vercel.app/horoscope`
    : `🙏 *Today's Ayodhya Dham Panchang* (${report.dateStr})\nVikram Samvat ${report.samvat.vikramSamvat} | ${report.samvat.purnimantaEn} Masa\n🌙 ${report.paksha.en} ${report.tithi.en} (Upto ${report.tithi.endTime})\n⭐ Nakshatra: ${report.nakshatra.en}\n✨ Abhijit Muhurat: ${report.auspicious.abhijitMuhurat}\n⚠ Rahu Kaal: ${report.inauspicious.rahuKaal}\n— Acharya Shri Ravindra Shukla Shatri\n🔗 https://jyotish-guru.vercel.app/horoscope`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12 relative z-20">
      <div className="rounded-3xl bg-gradient-to-br from-[#1B1242] via-[#130E2E] to-[#0D0B1A] border border-amber-500/30 p-5 sm:p-7 shadow-2xl">
        {/* Top Row: Live Badges + CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-amber-500/20">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isHi ? "आज का लाइव दृक् पंचांग — अयोध्या धाम" : "LIVE DRIK PANCHANG — AYODHYA DHAM"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-200 border border-amber-500/30">
                {isHi
                  ? `विक्रम संवत् ${report.samvat.vikramSamvat} • ${report.samvat.purnimantaHi} मास`
                  : `Vikram Samvat ${report.samvat.vikramSamvat} • ${report.samvat.purnimantaEn} Masa`}
              </span>
              {report.events.slice(0, 2).map((ev, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/25 text-indigo-200 border border-indigo-400/40"
                >
                  ✦ {isHi ? ev.titleHi : ev.titleEn}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-amber-200/75 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {report.dateStr} • {isHi ? `${report.vara.hi} (${report.paksha.hi})` : `${report.vara.en} (${report.paksha.en})`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500 text-emerald-200 hover:text-black border border-emerald-500/40 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              {isHi ? "WhatsApp शेयर" : "Share Panchang"}
            </a>
            <Link
              href="/horoscope"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black transition"
            >
              {isHi ? "पूरा पंचांग, चौघड़िया व राशिफल" : "Full Panchang, Choghadiya & Rashifal"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 6 Live Panchang Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-5 text-xs">
          <div className="p-3 rounded-xl bg-black/35 border border-white/10">
            <div className="text-amber-300/75 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> {isHi ? "तिथि (उदया)" : "Tithi (Udaya)"}
            </div>
            <div className="font-bold text-amber-50 text-sm mt-1">{isHi ? report.tithi.hi : report.tithi.en}</div>
            <div className="text-emerald-300 text-[11px] mt-0.5">{isHi ? "तक" : "Upto"} {report.tithi.endTime}</div>
          </div>

          <div className="p-3 rounded-xl bg-black/35 border border-white/10">
            <div className="text-amber-300/75">{isHi ? "नक्षत्र एवं चरण" : "Nakshatra"}</div>
            <div className="font-bold text-amber-50 text-sm mt-1">
              {isHi ? report.nakshatra.hi : report.nakshatra.en}
            </div>
            <div className="text-emerald-300 text-[11px] mt-0.5">{isHi ? "तक" : "Upto"} {report.nakshatra.endTime}</div>
          </div>

          <div className="p-3 rounded-xl bg-black/35 border border-white/10">
            <div className="text-amber-300/75 flex items-center gap-1">
              <Sunrise className="w-3.5 h-3.5" /> {isHi ? "सूर्योदय / अस्त" : "Sun Rise / Set"}
            </div>
            <div className="font-bold text-amber-50 text-sm mt-1">{report.sunrise}</div>
            <div className="text-amber-200/75 text-[11px] mt-0.5 flex items-center gap-1">
              <Sunset className="w-3 h-3" /> {report.sunset}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <div className="text-emerald-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}
            </div>
            <div className="font-bold text-emerald-100 text-xs sm:text-sm mt-1">
              {report.auspicious.abhijitMuhurat}
            </div>
            <div className="text-emerald-300/75 text-[11px] mt-0.5">
              {report.auspicious.abhijitAvoided ? (isHi ? "बुधवार वर्ज्य" : "Avoid Wed") : isHi ? "शुभ समय" : "Auspicious"}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30">
            <div className="text-rose-300 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> {isHi ? "राहु काल" : "Rahu Kaal"}
            </div>
            <div className="font-bold text-rose-100 text-xs sm:text-sm mt-1">
              {report.inauspicious.rahuKaal}
            </div>
            <div className="text-rose-300/75 text-[11px] mt-0.5">{isHi ? "नया कार्य टालें" : "Avoid new starts"}</div>
          </div>

          <div className="p-3 rounded-xl bg-black/35 border border-white/10">
            <div className="text-amber-300/75 flex items-center gap-1">
              <Moon className="w-3.5 h-3.5" /> {isHi ? "आज की चन्द्र राशि" : "Today's Moon Sign"}
            </div>
            <div className="font-bold text-amber-50 text-sm mt-1">
              {report.moonRashi.symbol} {isHi ? report.moonRashi.hi : report.moonRashi.en.split(" ")[0]}
            </div>
            <div className="text-amber-300/75 text-[11px] mt-0.5">{isHi ? "गोचर राशिफल देखें" : "Live Gochara"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
// END OF FILE
