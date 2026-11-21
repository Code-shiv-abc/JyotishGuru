"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Compass, Share2, Copy, Check, Radio, AlertTriangle } from "lucide-react";
import type { DailyPanchangReport } from "@/lib/panchangEngine";

interface Props {
  report: DailyPanchangReport;
  isHi: boolean;
}

const DISHA_SHOOL = [
  { dirEn: "West", dirHi: "पश्चिम", upayEn: "Eat Dalia, Ghee, or Paan before travel", upayHi: "यात्रा से पूर्व दलिया, घी या पान खाएं" }, // Sun
  { dirEn: "East", dirHi: "पूर्व", upayEn: "Look in a mirror or drink milk before travel", upayHi: "यात्रा से पूर्व दर्पण देखें या दूध पिएं" }, // Mon
  { dirEn: "North", dirHi: "उत्तर", upayEn: "Eat Jaggery (Gud) before travel", upayHi: "यात्रा से पूर्व गुड़ खाकर निकलें" }, // Tue
  { dirEn: "North", dirHi: "उत्तर", upayEn: "Eat Coriander seeds (Dhania) or Til", upayHi: "यात्रा से पूर्व धनिया या तिल खाएं" }, // Wed
  { dirEn: "South", dirHi: "दक्षिण", upayEn: "Eat Curd (Dahi) or Jeera before travel", upayHi: "यात्रा से पूर्व दही या जीरा खाकर निकलें" }, // Thu
  { dirEn: "West", dirHi: "पश्चिम", upayEn: "Eat Curd (Dahi) or Barley before travel", upayHi: "यात्रा से पूर्व दही या जौ खाकर निकलें" }, // Fri
  { dirEn: "East", dirHi: "पूर्व", upayEn: "Eat Ginger (Adrak) or Urad before travel", upayHi: "यात्रा से पूर्व अदरक या उड़द खाएं" }, // Sat
];

function parseMinutes(timeStr: string): number | null {
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  const min = parseInt(m[2], 10);
  if (m[3].toUpperCase() === "PM") h += 12;
  const nextDay = timeStr.includes("+1d") ? 1440 : 0;
  return h * 60 + min + nextDay;
}

export default function LiveStatusAndDishaBar({ report, isHi }: Props) {
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const [y, m, d] = report.dateStr.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const disha = DISHA_SHOOL[weekday];

  // Classical Panchak: Moon in Dhanishta Pada 3-4 through Revati (Aquarius & Pisces)
  const isPanchak =
    (report.nakshatra.index === 22 && report.nakshatra.pada >= 3) ||
    report.nakshatra.index >= 23;
  const isBhadra = report.karana.en.toLowerCase().includes("bhadra");

  // Detect live active Choghadiya & Rahu Kaal when viewing today's date
  const liveStatus = useMemo(() => {
    const cityNow = new Date(nowMs + report.city.utcOffsetMin * 60000);
    const todayStr = cityNow.toISOString().slice(0, 10);
    if (todayStr !== report.dateStr) return null;

    const curMin = cityNow.getUTCHours() * 60 + cityNow.getUTCMinutes();
    const [rahuStartStr, rahuEndStr] = report.inauspicious.rahuKaal.split("–").map((s) => s.trim());
    const rStart = parseMinutes(rahuStartStr || "");
    const rEnd = parseMinutes(rahuEndStr || "");
    const rahuActive = rStart !== null && rEnd !== null && curMin >= rStart && curMin < rEnd;

    const allSlots = [...report.dayChoghadiya, ...report.nightChoghadiya];
    const activeSlot = allSlots.find((slot) => {
      const s = parseMinutes(slot.start);
      const e = parseMinutes(slot.end);
      if (s === null || e === null) return false;
      return (curMin >= s && curMin < e) || (curMin + 1440 >= s && curMin + 1440 < e);
    });

    return { rahuActive, activeSlot };
  }, [nowMs, report]);

  const buildShareText = () => {
    if (isHi) {
      return [
        `🙏 *आज का पंचांग — ${report.city.nameHi}*`,
        `📅 ${report.dateStr} (${report.vara.hi}) | विक्रम संवत् ${report.samvat.vikramSamvat}`,
        `🌙 ${report.samvat.purnimantaHi} मास, ${report.paksha.hi} ${report.tithi.hi} (तक ${report.tithi.endTime})`,
        `⭐ नक्षत्र: ${report.nakshatra.hi} (तक ${report.nakshatra.endTime})`,
        `✨ अभिजित मुहूर्त: ${report.auspicious.abhijitMuhurat}`,
        `⚠ राहु काल: ${report.inauspicious.rahuKaal}`,
        `🧭 दिशा शूल: ${disha.dirHi} (${disha.upayHi})`,
        `— आचार्य श्री रविन्द्र शुक्ल शास्त्री (अयोध्या धाम)`,
        `🔗 https://jyotish-guru.vercel.app/horoscope`,
      ].join("\n");
    }
    return [
      `🙏 *Today's Drik Panchang — ${report.city.nameEn}*`,
      `📅 ${report.dateStr} (${report.vara.en}) | Vikram Samvat ${report.samvat.vikramSamvat}`,
      `🌙 ${report.samvat.purnimantaEn} Masa, ${report.paksha.en} ${report.tithi.en} (Upto ${report.tithi.endTime})`,
      `⭐ Nakshatra: ${report.nakshatra.en} (Upto ${report.nakshatra.endTime})`,
      `✨ Abhijit Muhurat: ${report.auspicious.abhijitMuhurat}`,
      `⚠ Rahu Kaal: ${report.inauspicious.rahuKaal}`,
      `🧭 Disha Shool: ${disha.dirEn} (${disha.upayEn})`,
      `— Acharya Shri Ravindra Shukla Shatri (Ayodhya Dham)`,
      `🔗 https://jyotish-guru.vercel.app/horoscope`,
    ].join("\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback ignored silently
    }
  };

  return (
    <section className="rounded-2xl bg-[#15112A] border border-amber-500/25 p-4 sm:p-5 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Live Active Status Pill */}
        <div className="flex flex-wrap items-center gap-2.5">
          {liveStatus?.rahuActive ? (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-200 border border-rose-500/50 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              {isHi
                ? `राहु काल अभी सक्रिय है (${report.inauspicious.rahuKaal})`
                : `RAHU KAAL ACTIVE NOW (${report.inauspicious.rahuKaal})`}
            </span>
          ) : liveStatus?.activeSlot ? (
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                liveStatus.activeSlot.quality === "avoid"
                  ? "bg-rose-500/15 text-rose-200 border-rose-500/40"
                  : liveStatus.activeSlot.quality === "neutral"
                  ? "bg-amber-500/15 text-amber-200 border-amber-500/40"
                  : "bg-emerald-500/20 text-emerald-200 border-emerald-500/40"
              }`}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              {isHi
                ? `अभी सक्रिय चौघड़िया: ${liveStatus.activeSlot.nameHi} (${liveStatus.activeSlot.start} – ${liveStatus.activeSlot.end})`
                : `LIVE NOW: ${liveStatus.activeSlot.nameEn} Choghadiya (${liveStatus.activeSlot.start} – ${liveStatus.activeSlot.end})`}
            </span>
          ) : null}

          {isPanchak && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-400/40">
              ⚠ {isHi ? "पंचक सक्रिय (Panchak)" : "Panchak Active"}
            </span>
          )}

          {isBhadra && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-200 border border-rose-400/40">
              ⚠ {isHi ? "भद्रा काल (विष्टि करण)" : "Bhadra Active (Vishti Karana)"}
            </span>
          )}
        </div>

        {/* WhatsApp Morning Share + Copy Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(buildShareText())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            {isHi ? "WhatsApp पर पंचांग शेयर करें" : "Share Panchang on WhatsApp"}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-amber-100 border border-white/15 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : isHi ? "कॉपी करें" : "Copy Text"}
          </button>
        </div>
      </div>

      {/* Disha Shool & Travel Remedy Strip */}
      <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-amber-100">
          <Compass className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300">{isHi ? "आज का दिशा शूल:" : "Today's Disha Shool:"}</strong>{" "}
            {isHi ? `${disha.dirHi} दिशा (यात्रा से बचें)` : `${disha.dirEn} Direction (Avoid travel)`}
          </span>
        </div>
        <div className="text-amber-200/80">
          <strong className="text-emerald-300">{isHi ? "परिहार / उपाय:" : "Travel Remedy:"}</strong>{" "}
          {isHi ? disha.upayHi : disha.upayEn}
        </div>
      </div>
    </section>
  );
}
// END OF FILE
