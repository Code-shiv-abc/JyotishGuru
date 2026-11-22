"use client";

import React, { useMemo, useState } from "react";
import { Sparkles, Layers, Compass, Grid3X3, Clock, Printer, MessageCircle } from "lucide-react";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";
import { PANCHANG_CITIES } from "@/lib/panchangEngine";
import {
  calculateProKundali,
  SHODASHVARGA_KEYS,
  RASHIS,
} from "@/lib/kundaliProEngine";

const fmtDeg = (d: number) => {
  const deg = Math.floor(d);
  const min = Math.floor((d - deg) * 60);
  return `${deg}°${String(min).padStart(2, "0")}'`;
};

export default function KundaliProSuite() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const [name, setName] = useState("Native");
  const [dateStr, setDateStr] = useState("1995-08-15");
  const [timeStr, setTimeStr] = useState("09:30");
  const [cityId, setCityId] = useState("ayodhya");
  const [activeTab, setActiveTab] = useState<"vargas" | "bhava" | "ashtaka" | "dasha">("vargas");
  const [selectedMdIdx, setSelectedMdIdx] = useState<number>(0);
  const [selectedAdIdx, setSelectedAdIdx] = useState<number>(0);

  const city = useMemo(
    () => PANCHANG_CITIES.find((c) => c.id === cityId) ?? PANCHANG_CITIES[0],
    [cityId]
  );

  const pro = useMemo(
    () =>
      calculateProKundali({
        dateStr,
        timeStr,
        lat: city.lat,
        lon: city.lon,
        utcOffsetMin: city.utcOffsetMin,
      }),
    [dateStr, timeStr, city]
  );

  const activeMd = pro.dashas[selectedMdIdx] ?? pro.dashas[0];
  const activeAd = activeMd.antardashas[selectedAdIdx] ?? activeMd.antardashas[0];

  return (
    <section className="mt-14 rounded-3xl bg-gradient-to-br from-[#19113D] via-[#130E2C] to-[#0D0B1A] border border-amber-500/30 p-5 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-amber-500/20 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {isHi ? "ज्योतिषाचार्य प्रो वर्कबेंच • JPL/VSOP87 दृक् गणित" : "ASTROLOGER PRO WORKBENCH • JPL/VSOP87 DRIK GANITA"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            {isHi ? "षोडशवर्ग (D-1 से D-60), भाव चलित, 337-बिन्दु अष्टकवर्ग एवं प्रत्यन्तर दशा" : "16 Shodashvarga (D-1 to D-60), Sripati Bhava Chalit, 337-Bindu Ashtakavarga & 3-Level Dasha"}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-amber-100 border border-white/15 transition"
          >
            <Printer className="w-4 h-4" />
            {isHi ? "प्रिंट / PDF सेव करें" : "Print / Save PDF"}
          </button>
          <a
            href={`https://wa.me/918009124454?text=${encodeURIComponent(
              `Namaste Acharya Shri Ravindra Shukla Shatri Ji, I generated a Pro Shodashvarga & Ashtakavarga Kundali (${dateStr}, ${timeStr}, ${city.nameEn}) and want an expert reading.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition"
          >
            <MessageCircle className="w-4 h-4" />
            {isHi ? "आचार्य जी से विश्लेषण कराएं" : "Consult Acharya Ji"}
          </a>
        </div>
      </div>

      {/* Birth Inputs Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <label className="block space-y-1">
          <span className="text-amber-300/80">{isHi ? "नाम" : "Name"}</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-amber-500/30 px-3 py-2 text-amber-50"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-amber-300/80">{isHi ? "जन्म तिथि" : "Birth Date"}</span>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => e.target.value && setDateStr(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-amber-500/30 px-3 py-2 text-amber-50"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-amber-300/80">{isHi ? "जन्म समय" : "Birth Time"}</span>
          <input
            type="time"
            value={timeStr}
            onChange={(e) => e.target.value && setTimeStr(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-amber-500/30 px-3 py-2 text-amber-50"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-amber-300/80">{isHi ? "जन्म स्थान" : "Birth City"}</span>
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="w-full rounded-xl bg-[#140E30] border border-amber-500/30 px-3 py-2 text-amber-50"
          >
            {PANCHANG_CITIES.map((c) => (
              <option key={c.id} value={c.id}>{isHi ? c.nameHi : c.nameEn}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Quick Astronomical Summary */}
      <div className="flex flex-wrap gap-3 text-xs text-amber-200/85 bg-black/30 rounded-xl p-3.5 border border-white/10">
        <span><strong>{isHi ? "लग्न:" : "Lagna:"}</strong> {isHi ? RASHIS[pro.lagnaRashiIdx].hi : RASHIS[pro.lagnaRashiIdx].en} ({fmtDeg(pro.lagnaLon % 30)})</span>
        <span>•</span>
        <span><strong>{isHi ? "दशम भाव (MC):" : "Midheaven (MC):"}</strong> {fmtDeg(pro.mcLon % 30)} {isHi ? RASHIS[Math.floor(pro.mcLon / 30)].hi : RASHIS[Math.floor(pro.mcLon / 30)].en.split(" ")[0]}</span>
        <span>•</span>
        <span><strong>{isHi ? "लाहिड़ी अयनांश:" : "Lahiri Ayanamsha:"}</strong> {pro.ayanamsha.toFixed(4)}°</span>
        <span>•</span>
        <span><strong>{isHi ? "सर्वाष्टकवर्ग योग:" : "SAV Total:"}</strong> {pro.savTotal} / 337</span>
      </div>

      {/* 4 Pro Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "vargas", icon: Layers, en: "16 Shodashvarga (D1–D60)", hi: "षोडशवर्ग (D1–D60)" },
          { id: "bhava", icon: Compass, en: "Sripati Bhava Chalit", hi: "श्रीपति भाव चलित" },
          { id: "ashtaka", icon: Grid3X3, en: "337-Bindu Ashtakavarga", hi: "337-बिन्दु अष्टकवर्ग" },
          { id: "dasha", icon: Clock, en: "3-Level Vimshottari (MD→AD→PD)", hi: "त्रि-स्तरीय विंशोत्तरी दशा" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as typeof activeTab)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === t.id
                ? "bg-amber-500 text-black"
                : "bg-black/40 text-amber-200 border border-amber-500/20 hover:border-amber-400"
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {isHi ? t.hi : t.en}
          </button>
        ))}
      </div>

      {/* TAB 1: 16 SHODASHVARGA MATRIX */}
      {activeTab === "vargas" && (
        <div className="overflow-x-auto rounded-2xl border border-amber-500/20">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-amber-500/15 text-amber-200">
              <tr>
                <th className="p-2.5 sticky left-0 bg-[#1B1340]">{isHi ? "ग्रह" : "Planet"}</th>
                <th className="p-2.5">{isHi ? "अंश / स्थिति" : "Deg / Status"}</th>
                {SHODASHVARGA_KEYS.map((v) => (
                  <th key={v.key} className="p-2.5 whitespace-nowrap">{v.key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {pro.planets.map((p) => (
                <tr key={p.key} className="hover:bg-white/5">
                  <td className="p-2.5 font-bold text-amber-100 sticky left-0 bg-[#140E2F] whitespace-nowrap">
                    {isHi ? p.nameHi : p.nameEn}
                  </td>
                  <td className="p-2.5 whitespace-nowrap">
                    <span className="font-mono text-amber-200">{fmtDeg(p.degInSign)}</span>
                    {p.isRetrograde && <span className="ml-1 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px]">{isHi ? "वक्री" : "R"}</span>}
                    {p.isCombust && <span className="ml-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">{isHi ? "अस्त" : "C"}</span>}
                    {p.isVargottama && <span className="ml-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">{isHi ? "वर्गोत्तम" : "Varg"}</span>}
                  </td>
                  {SHODASHVARGA_KEYS.map((v) => (
                    <td key={v.key} className="p-2.5 whitespace-nowrap text-amber-100/85">
                      {isHi ? RASHIS[p.vargas[v.key]].hi : RASHIS[p.vargas[v.key]].en.split(" ")[0].slice(0, 3)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: SRIPATI BHAVA CHALIT */}
      {activeTab === "bhava" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="overflow-x-auto rounded-2xl border border-amber-500/20">
            <table className="w-full text-xs text-left">
              <thead className="bg-amber-500/15 text-amber-200">
                <tr>
                  <th className="p-2.5">{isHi ? "भाव" : "Bhava"}</th>
                  <th className="p-2.5">{isHi ? "भाव आरम्भ" : "Start (Sandhi)"}</th>
                  <th className="p-2.5">{isHi ? "भाव मध्य" : "Midpoint"}</th>
                  <th className="p-2.5">{isHi ? "भाव अन्त" : "End (Sandhi)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {pro.bhavas.map((b) => (
                  <tr key={b.house} className="hover:bg-white/5">
                    <td className="p-2.5 font-bold text-amber-200">{isHi ? `भाव ${b.house}` : `House ${b.house}`}</td>
                    <td className="p-2.5 font-mono">{fmtDeg(b.startLon % 30)} {isHi ? RASHIS[Math.floor(b.startLon / 30)].hi : RASHIS[Math.floor(b.startLon / 30)].en.split(" ")[0].slice(0, 3)}</td>
                    <td className="p-2.5 font-mono text-emerald-300">{fmtDeg(b.midLon % 30)} {isHi ? RASHIS[b.rashiIdx].hi : RASHIS[b.rashiIdx].en.split(" ")[0].slice(0, 3)}</td>
                    <td className="p-2.5 font-mono">{fmtDeg(b.endLon % 30)} {isHi ? RASHIS[Math.floor(b.endLon / 30)].hi : RASHIS[Math.floor(b.endLon / 30)].en.split(" ")[0].slice(0, 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl bg-black/30 border border-amber-500/20 p-4 space-y-3">
            <h3 className="text-sm font-bold text-amber-200">
              {isHi ? "राशि बनाम भाव चलित ग्रह परिवर्तन" : "Rashi (D-1) vs. Bhava Chalit Planet Shifts"}
            </h3>
            <div className="space-y-2 text-xs">
              {pro.planets.map((p) => (
                <div key={p.key} className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span className="font-bold text-amber-100">{isHi ? p.nameHi : p.nameEn}</span>
                  <span>
                    D-1: <strong>H{p.rashiHouse}</strong> → Bhava: <strong className={p.shifted ? "text-amber-300" : "text-emerald-300"}>H{p.bhavaHouse}</strong>
                    {p.shifted && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-[10px]">
                        {isHi ? "भाव परिवर्तित" : "Shifted"}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EXACT 337-BINDU ASHTAKAVARGA */}
      {activeTab === "ashtaka" && (
        <div className="space-y-5">
          <div className="overflow-x-auto rounded-2xl border border-amber-500/20">
            <table className="w-full text-xs text-center">
              <thead className="bg-amber-500/15 text-amber-200">
                <tr>
                  <th className="p-2.5 text-left">{isHi ? "राशि" : "Sign"}</th>
                  {(["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"] as const).map((k) => (
                    <th key={k} className="p-2.5">{k}</th>
                  ))}
                  <th className="p-2.5 bg-amber-500/25 text-amber-100">{isHi ? "सर्वाष्टक (SAV)" : "SAV Total"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {RASHIS.map((r, sIdx) => (
                  <tr key={r.id} className="hover:bg-white/5">
                    <td className="p-2.5 text-left font-bold text-amber-100 whitespace-nowrap">
                      {r.symbol} {isHi ? r.hi : r.en.split(" ")[0]}
                    </td>
                    {(["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"] as const).map((k) => (
                      <td key={k} className="p-2.5 font-mono">{pro.bav[k][sIdx]}</td>
                    ))}
                    <td className={`p-2.5 font-bold font-mono ${pro.sav[sIdx] >= 30 ? "text-emerald-300" : pro.sav[sIdx] < 25 ? "text-rose-300" : "text-amber-200"}`}>
                      {pro.sav[sIdx]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-amber-200/75">
            {isHi
              ? "शास्त्रीय नियम: 30+ बिन्दु (अत्यंत बलवान गोचर भाव), 25–29 (मध्यम), 25 से कम (कमजोर गोचर भाव)। कुल योग सदैव 337 होता है।"
              : "Classical Rule: 30+ bindus = highly auspicious transit sign; 25–29 = balanced; <25 = cautious transit sign. Total always equals 337."}
          </p>
        </div>
      )}

      {/* TAB 4: 3-LEVEL VIMSHOTTARI DASHA (MD -> AD -> PD) */}
      {activeTab === "dasha" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
          <div className="rounded-2xl bg-black/30 border border-amber-500/20 p-4 space-y-2">
            <h3 className="font-bold text-amber-300 mb-2">{isHi ? "1. महादशा (Mahadasha)" : "1. Mahadasha (Click)"}</h3>
            {pro.dashas.map((md, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { setSelectedMdIdx(idx); setSelectedAdIdx(0); }}
                className={`w-full text-left px-3 py-2 rounded-xl flex justify-between transition ${
                  selectedMdIdx === idx ? "bg-amber-500 text-black font-bold" : "hover:bg-white/10 text-amber-100"
                }`}
              >
                <span>{isHi ? md.lordHi : md.lordEn} ({md.years}y)</span>
                <span className="font-mono opacity-85">{md.startDate} → {md.endDate}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-black/30 border border-amber-500/20 p-4 space-y-2">
            <h3 className="font-bold text-amber-300 mb-2">
              {isHi ? `2. अन्तर्दशा (${activeMd.lordHi})` : `2. Antardasha (${activeMd.lordEn})`}
            </h3>
            {activeMd.antardashas.map((ad, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedAdIdx(idx)}
                className={`w-full text-left px-3 py-2 rounded-xl flex justify-between transition ${
                  selectedAdIdx === idx ? "bg-emerald-500 text-black font-bold" : "hover:bg-white/10 text-amber-100"
                }`}
              >
                <span>{isHi ? ad.lordHi : ad.lordEn}</span>
                <span className="font-mono opacity-85">{ad.startDate} → {ad.endDate}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-black/30 border border-amber-500/20 p-4 space-y-2">
            <h3 className="font-bold text-amber-300 mb-2">
              {isHi ? `3. प्रत्यन्तर दशा (${activeMd.lordHi}–${activeAd.lordHi})` : `3. Pratyantardasha (${activeMd.lordEn}–${activeAd.lordEn})`}
            </h3>
            {activeAd.pratyantardashas.map((pd, idx) => (
              <div key={idx} className="px-3 py-2 rounded-xl bg-white/5 flex justify-between text-amber-100">
                <span className="font-semibold">{isHi ? pd.lordHi : pd.lordEn}</span>
                <span className="font-mono text-emerald-300">{pd.startDate} → {pd.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
// END OF FILE
