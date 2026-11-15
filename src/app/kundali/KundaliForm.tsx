"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";
import VedicChartSVG from "@/components/astrology/KundaliForm";
import { AyanamshaSystem, calculateEnterpriseKundali } from "@/lib/astrology";
import { useLanguage, RASHI_HI, PLANET_HI, DIGNITY_HI } from "@/app/components/ServiceWorkerRegister";
import { MessageCircle, Printer, Sparkles, Share2 } from "lucide-react";

type KundaliResponse = ReturnType<typeof calculateEnterpriseKundali>;

export default function KundaliForm() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: searchParams.get("name") || "",
    gender: "male",
    dob: searchParams.get("dob") || "",
    tob: searchParams.get("tob") || "",
    ayanamshaSystem: "LAHIRI" as AyanamshaSystem,
  });

  const [placeLabel, setPlaceLabel] = useState(searchParams.get("pob") || "");
  const [location, setLocation] = useState<{ lat: number; lon: number; timezone: string } | null>(
    searchParams.get("lat") && searchParams.get("lon")
      ? { lat: parseFloat(searchParams.get("lat")!), lon: parseFloat(searchParams.get("lon")!), timezone: searchParams.get("tz") || "Asia/Kolkata" }
      : null
  );

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<KundaliResponse | null>(() => {
    const qName = searchParams.get("name"), qDob = searchParams.get("dob"), qTob = searchParams.get("tob");
    const qLat = searchParams.get("lat"), qLon = searchParams.get("lon"), qTz = searchParams.get("tz") || "Asia/Kolkata";
    if (qName && qDob && qTob && qLat && qLon) {
      try {
        return calculateEnterpriseKundali({ name: qName, gender: "male", dob: qDob, tob: qTob, lat: parseFloat(qLat), lon: parseFloat(qLon), timezone: qTz, ayanamshaSystem: "LAHIRI" });
      } catch { return null; }
    }
    return null;
  });

  const [chartStyle, setChartStyle] = useState<"north" | "south" | "east">("north");
  const [activeTab, setActiveTab] = useState<"charts" | "planets" | "vargas" | "strength" | "dasha" | "yogas" | "remedies">("charts");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.tob || !location) {
      setError(isHi ? "कृपया सभी विवरण भरें और सूची में से जन्म स्थान चुनें।" : "Please fill in all fields and select a valid birth city from the dropdown.");
      return;
    }
    setError(null);
    try {
      setResult(calculateEnterpriseKundali({ ...formData, lat: location.lat, lon: location.lon, timezone: location.timezone }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to calculate chart.");
    }
  };

  const handleShareChartLink = () => {
    if (!location) return;
    const params = new URLSearchParams({ name: formData.name, dob: formData.dob, tob: formData.tob, pob: placeLabel, lat: String(location.lat), lon: String(location.lon), tz: location.timezone });
    navigator.clipboard?.writeText(`${window.location.origin}/kundali?${params.toString()}`);
  };

  return (
    <div className="space-y-10">
      <div className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl p-8 shadow-2xl">
        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "पूरा नाम" : "Full Name"}</label>
              <input id="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]" placeholder={isHi ? "अपना पूरा नाम लिखें" : "Enter your full name"} required />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "लिंग" : "Gender"}</label>
              <select id="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]">
                <option value="male">{isHi ? "पुरुष (Male)" : "Male"}</option>
                <option value="female">{isHi ? "महिला (Female)" : "Female"}</option>
                <option value="other">{isHi ? "अन्य (Other)" : "Other"}</option>
              </select>
            </div>
            <div>
              <label htmlFor="ayanamsha" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "अयनांश पद्धति" : "Ayanamsha System"}</label>
              <select id="ayanamsha" value={formData.ayanamshaSystem} onChange={(e) => setFormData({ ...formData, ayanamshaSystem: e.target.value as AyanamshaSystem })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]">
                <option value="LAHIRI">{isHi ? "चित्रपक्ष (लाहिरि — मानक)" : "Chitra Paksha (Lahiri — Standard)"}</option>
                <option value="KP">{isHi ? "के.पी. कृष्णमूर्ति पद्धति" : "KP Krishnamurti Padhdhati"}</option>
                <option value="RAMAN">{isHi ? "बी.वी. रमन अयनांश" : "B.V. Raman Ayanamsha"}</option>
                <option value="SURYASIDDHANTA">{isHi ? "पारंपरिक सूर्यसिद्धांत" : "Traditional Suryasiddhanta"}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म तिथि" : "Date of Birth"}</label>
              <input id="dob" type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] [color-scheme:dark]" required />
            </div>
            <div>
              <label htmlFor="tob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म समय" : "Time of Birth"}</label>
              <input id="tob" type="time" value={formData.tob} onChange={(e) => setFormData({ ...formData, tob: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] [color-scheme:dark]" required />
            </div>
            <div>
              <label htmlFor="pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म स्थान" : "Place of Birth"}</label>
              <PlaceAutoComplete id="pob" initialValue={placeLabel} onSelect={(p) => { setPlaceLabel(`${p.name}${p.admin1 ? `, ${p.admin1}` : ""}`); setLocation({ lat: p.latitude, lon: p.longitude, timezone: p.timezone }); }} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]" placeholder={isHi ? "शहर, राज्य" : "City, State"} />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-xl font-bold text-lg hover:bg-[#d9b85c] transition-colors cursor-pointer">
            {isHi ? "संपूर्ण वैदिक जन्म कुंडली बनाएं" : "Generate Enterprise Janam Kundali"}
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-[#1A1628] border border-[#C9A84C]/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[#C9A84C]/20 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold">
                {isHi ? "अयनांश" : "Ayanamsha"}: {result.meta.ayanamshaName} ({result.meta.ayanamshaValue})
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#E8E4F0] mt-1">
                {isHi ? "जन्म कुंडली:" : "Janam Kundali:"} {result.meta.name}
              </h2>
              <p className="text-sm text-[#E8E4F0]/70">
                {isHi ? "लग्न" : "Lagna"}: <strong className="text-[#C9A84C]">{isHi ? RASHI_HI[result.ascendant.rashiIndex] : result.ascendant.rasi} ({result.ascendant.degreeFormatted})</strong> • {isHi ? "चन्द्र नक्षत्र" : "Moon Nakshatra"}: <strong className="text-[#C9A84C]">{result.panchang.nakshatra} ({isHi ? `चरण ${result.panchang.pada}` : `Pada ${result.panchang.pada}`})</strong>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-[#0D0B1A] p-1 rounded-full border border-[#C9A84C]/30 flex text-xs font-semibold">
                {(["north", "south", "east"] as const).map((st) => (
                  <button key={st} type="button" onClick={() => setChartStyle(st)} className={`px-3 py-1.5 rounded-full capitalize cursor-pointer ${chartStyle === st ? "bg-[#C9A84C] text-[#0D0B1A]" : "text-[#E8E4F0]/75"}`}>
                    {isHi ? (st === "north" ? "उत्तर भारतीय" : st === "south" ? "दक्षिण भारतीय" : "पूर्व भारतीय") : `${st} Indian`}
                  </button>
                ))}
              </div>
              <button type="button" onClick={handleShareChartLink} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 text-xs font-semibold text-[#C9A84C] cursor-pointer">
                <Share2 className="w-3.5 h-3.5" /><span>{isHi ? "लिंक कॉपी" : "Copy Link"}</span>
              </button>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 text-xs font-semibold text-[#C9A84C] cursor-pointer">
                <Printer className="w-3.5 h-3.5" /><span>{isHi ? "प्रिंट / PDF" : "Print / PDF"}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-[#C9A84C]/15 pb-4">
            {[
              ["charts", isHi ? "1. कुंडली एवं पंचांग" : "1. Charts & Panchang"],
              ["planets", isHi ? "2. ग्रह स्पष्ट एवं कारक" : "2. Graha Sphuta & Karakas"],
              ["vargas", isHi ? "3. षोडशवर्ग (D-1..D-12)" : "3. Divisional Vargas (D-1..D-12)"],
              ["strength", isHi ? "4. षड्बल एवं अष्टकवर्ग" : "4. Shadbala & Ashtakavarga (SAV)"],
              ["dasha", isHi ? "5. विंशोत्तरी दशा (120 वर्ष)" : "5. Vimshottari Dasha (120Y)"],
              ["yogas", isHi ? "6. योग एवं मांगलिक" : "6. Yogas & Manglik"],
              ["remedies", isHi ? "7. रत्न एवं मंत्र उपाय" : "7. Gemstones & Mantras"],
            ].map(([id, label]) => (
              <button key={id} type="button" onClick={() => setActiveTab(id as typeof activeTab)} className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold cursor-pointer ${activeTab === id ? "bg-[#C9A84C] text-[#0D0B1A]" : "bg-[#0D0B1A] text-[#E8E4F0]/75 border border-[#C9A84C]/20"}`}>
                {label}
              </button>
            ))}
          </div>

          {activeTab === "charts" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <VedicChartSVG styleType={chartStyle} ascendantRashiIndex={result.ascendant.rashiIndex} planets={result.planets} title={isHi ? "लग्न कुंडली (D-1)" : "Lagna Chart (D-1)"} subtitle={`${isHi ? "लग्न" : "Ascendant"}: ${isHi ? RASHI_HI[result.ascendant.rashiIndex] : result.ascendant.rasi}`} />
                <VedicChartSVG styleType={chartStyle} ascendantRashiIndex={result.ascendant.navamshaRashiIndex} planets={result.planets.map((p) => ({ ...p, rashiIndex: p.navamshaRashiIndex, house: p.navamshaHouse }))} title={isHi ? "नवमांश कुंडली (D-9)" : "Navamsha Chart (D-9)"} subtitle={`${isHi ? "नवमांश लग्न" : "Navamsha Lagna"}: ${isHi ? RASHI_HI[result.ascendant.navamshaRashiIndex] : result.ascendant.navamshaRasi}`} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  [isHi ? "वार (Weekday)" : "Vara (Weekday)", result.panchang.vara],
                  [isHi ? "तिथि (Tithi)" : "Tithi (Lunar Day)", result.panchang.tithi],
                  [isHi ? "जन्म नक्षत्र" : "Birth Nakshatra", `${result.panchang.nakshatra} (P${result.panchang.pada})`],
                  [isHi ? "नित्य योग" : "Nitya Yoga", result.panchang.yoga],
                  [isHi ? "करण" : "Karana", result.panchang.karana],
                  [isHi ? "पाया (Paya)" : "Paya (Footing)", result.panchang.paya],
                  [isHi ? "गण (Gana)" : "Gana (Temperament)", result.panchang.gana],
                  [isHi ? "नाड़ी एवं वर्ण" : "Nadi & Varna", `${result.panchang.nadi} • ${result.panchang.varna}`],
                ].map(([lbl, val]) => (
                  <div key={lbl} className="bg-[#0D0B1A] p-4 rounded-xl border border-[#C9A84C]/15">
                    <div className="text-xs text-[#E8E4F0]/60 uppercase">{lbl}</div>
                    <div className="text-sm font-semibold text-[#E8E4F0] mt-1">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "planets" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#E8E4F0] border-collapse">
                <thead className="bg-[#0D0B1A] text-[#C9A84C] border-b border-[#C9A84C]/30">
                  <tr>
                    <th className="p-3">{isHi ? "ग्रह" : "Planet"}</th>
                    <th className="p-3">{isHi ? "राशि (D-1)" : "Rashi (D-1)"}</th>
                    <th className="p-3">{isHi ? "अंश" : "Degree"}</th>
                    <th className="p-3">{isHi ? "भाव" : "House"}</th>
                    <th className="p-3">{isHi ? "नक्षत्र (चरण)" : "Nakshatra (Pada)"}</th>
                    <th className="p-3">{isHi ? "जैमिनी कारक" : "Jaimini Karaka"}</th>
                    <th className="p-3">{isHi ? "अवस्था एवं बल" : "Dignity"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A84C]/10">
                  {result.planets.map((p) => (
                    <tr key={p.key}>
                      <td className="p-3 font-bold text-[#C9A84C]">{isHi ? (PLANET_HI[p.key] || p.name) : p.name}</td>
                      <td className="p-3">{isHi ? RASHI_HI[p.rashiIndex] : p.rasi}</td>
                      <td className="p-3 font-mono text-xs">{p.degreeFormatted}</td>
                      <td className="p-3">{isHi ? `भाव ${p.house}` : `House ${p.house}`}</td>
                      <td className="p-3">{p.nakshatra} (P{p.pada})</td>
                      <td className="p-3 text-xs text-[#C9A84C]">{p.charaKaraka}</td>
                      <td className="p-3 text-xs">{isHi ? (DIGNITY_HI[p.dignity] || p.dignity) : p.dignity} {p.isRetrograde ? (isHi ? "(वक्री)" : "(R)") : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "vargas" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <VedicChartSVG styleType={chartStyle} ascendantRashiIndex={result.ascendant.dashamshaRashiIndex} planets={result.planets.map((p) => ({ ...p, rashiIndex: p.dashamshaRashiIndex, house: p.dashamshaHouse }))} title={isHi ? "दशमांश कुंडली (D-10 — कर्म एवं यश)" : "Dashamsha Chart (D-10 — Career & Fame)"} subtitle={`D-10 Lagna: ${isHi ? RASHI_HI[result.ascendant.dashamshaRashiIndex] : result.ascendant.dashamshaRasi}`} />
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-5 overflow-x-auto">
                <table className="w-full text-left text-xs text-[#E8E4F0]">
                  <thead className="border-b border-[#C9A84C]/30 text-[#C9A84C]">
                    <tr><th className="py-2">{isHi ? "ग्रह" : "Graha"}</th><th>D-1</th><th>D-2</th><th>D-3</th><th>D-7</th><th>D-9</th><th>D-10</th><th>D-12</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#C9A84C]/10">
                    {result.planets.map((p) => (
                      <tr key={p.key}><td className="py-2 font-bold text-[#C9A84C]">{isHi ? (PLANET_HI[p.key]?.split(" ")[0] || p.key) : p.key}</td><td>{p.vargas.D1.split(" ")[0]}</td><td>{p.vargas.D2.split(" ")[0]}</td><td>{p.vargas.D3.split(" ")[0]}</td><td>{p.vargas.D7.split(" ")[0]}</td><td>{p.vargas.D9.split(" ")[0]}</td><td>{p.vargas.D10.split(" ")[0]}</td><td>{p.vargas.D12.split(" ")[0]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "strength" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-6 space-y-3">
                <h3 className="text-lg font-serif font-bold text-[#C9A84C]">{isHi ? "पाराशरी षड्बल (ग्रह बल)" : "Parashari Shadbala Strength"}</h3>
                {result.shadbala.map((sb) => (
                  <div key={sb.planet} className="flex justify-between text-xs border-b border-[#C9A84C]/10 pb-2">
                    <span className="font-bold text-[#E8E4F0]">{isHi ? (PLANET_HI[sb.planet] || sb.planet) : sb.planet} ({sb.totalRupas} Rupas)</span>
                    <span className="text-[#C9A84C] font-semibold">{sb.strengthPct}% • {sb.status}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-6">
                <h3 className="text-lg font-serif font-bold text-[#C9A84C] mb-3">{isHi ? "सर्वाष्टकवर्ग (337 बिंदु)" : "Sarvashtakavarga (337 Bindus)"}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {result.ashtakavarga.map((av) => (
                    <div key={av.house} className="p-3 rounded-xl bg-[#1A1628] border border-[#C9A84C]/20 text-center">
                      <div className="text-[10px] text-[#E8E4F0]/60">{isHi ? `भाव ${av.house}` : `H${av.house}`} ({av.rashiName})</div>
                      <div className="text-xl font-serif font-bold text-[#C9A84C]">{av.bindus}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "dasha" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.vimshottari.map((m) => (
                <div key={m.lord} className={`p-5 rounded-2xl border ${m.isCurrent ? "bg-[#1A1040] border-[#C9A84C]" : "bg-[#0D0B1A] border-[#C9A84C]/20"}`}>
                  <div className="font-serif font-bold text-[#C9A84C]">{isHi ? `${PLANET_HI[m.lord]?.split(" ")[0] || m.lord} महादशा (${m.years} वर्ष)` : `${m.lord} Mahadasha (${m.years}Y)`}</div>
                  <div className="text-xs text-[#E8E4F0]/70 mb-2">{m.startDate} → {m.endDate}</div>
                  <div className="space-y-1 max-h-36 overflow-y-auto text-xs border-t border-[#C9A84C]/15 pt-2">
                    {m.antardashas.map((a) => (
                      <div key={a.lord} className="flex justify-between"><span>{a.lord}</span><span>{a.endDate}</span></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "yogas" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.yogas.map((y, i) => (
                <div key={i} className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-6">
                  <div className="text-xs text-[#C9A84C] font-bold uppercase">{y.category} • {y.badge}</div>
                  <h4 className="text-xl font-serif font-bold text-[#E8E4F0] my-1">{y.name}</h4>
                  <p className="text-sm text-[#E8E4F0]/75">{y.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "remedies" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.remedies.map((r, i) => (
                <div key={i} className="bg-[#0D0B1A] border border-[#C9A84C]/30 rounded-2xl p-6 space-y-2">
                  <div className="text-xs text-[#C9A84C] font-bold uppercase">{r.role}</div>
                  <h4 className="text-xl font-serif font-bold text-[#E8E4F0]">{r.gemstone}</h4>
                  <div className="text-xs text-[#E8E4F0]/75">{isHi ? "धातु एवं अंगुली" : "Metal & Finger"}: {r.metal} ({r.finger}) • {r.day}</div>
                  <div className="text-xs text-[#E8E4F0]/75">{isHi ? "रुद्राक्ष" : "Rudraksha"}: {r.rudraksha}</div>
                  <div className="text-xs text-[#C9A84C] italic">{r.mantra}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-6 bg-[#0D0B1A] border border-[#C9A84C]/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#C9A84C]">
                <Sparkles className="w-4 h-4" />
                <span>{isHi ? "व्यक्तिगत वैदिक कुंडली परामर्श" : "Personalized Vedic Interpretation"}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#E8E4F0]">
                {isHi ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री से परामर्श लें" : "Consult Acharya Shri Ravindra Shukla Shatri on Your Chart"}
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/book?service=kundali" className="px-6 py-3.5 bg-[#C9A84C] text-[#0D0B1A] font-bold rounded-full text-sm text-center">
                {isHi ? "1-ऑन-1 परामर्श बुक करें (₹1100)" : "Book 1-on-1 Reading (₹1100)"}
              </Link>
              <a href="https://wa.me/918009124454?text=Namaste%20Acharya%20Shri%20Ravindra%20Shukla%20Shatri%20Ji%2C%20I%20generated%20my%20Kundali%20on%20JyotishGuru%20and%20would%20like%20a%20consultation." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#C9A84C]/50 text-[#E8E4F0] font-semibold rounded-full text-sm">
                <MessageCircle className="w-4 h-4 text-[#C9A84C]" />
                <span>{isHi ? "व्हाट्सएप: +91 80091 24454" : "WhatsApp: +91 80091 24454"}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
