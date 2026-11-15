"use client";

import React, { useState } from "react";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";
import VedicChartSVG from "@/components/astrology/KundaliForm";
import { calculateEnterpriseCompatibility } from "@/lib/astrology";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";
import { MessageCircle, Printer } from "lucide-react";

type MatchingResponse = ReturnType<typeof calculateEnterpriseCompatibility>;

const KOOT_HI: Record<string, { name: string; desc: string }> = {
  Varna: { name: "वर्ण कूट (Varna)", desc: "आध्यात्मिक एवं अहं सामंजस्य" },
  Vashya: { name: "वश्य कूट (Vashya)", desc: "आपसी आकर्षण एवं सहयोग" },
  Tara: { name: "तारा कूट (Tara)", desc: "नक्षत्र भाग्य एवं स्वास्थ्य" },
  Yoni: { name: "योनि कूट (Yoni)", desc: "शारीरिक एवं मानसिक अनुकूलता" },
  "Graha Maitri": { name: "ग्रह मैत्री कूट (Graha Maitri)", desc: "वैचारिक एवं मानसिक मित्रता" },
  Gana: { name: "गण कूट (Gana)", desc: "स्वभाव एवं आचरण मेल" },
  Bhakoot: { name: "भकूट कूट (Bhakoot)", desc: "पारिवारिक सुख एवं समृद्धि" },
  Nadi: { name: "नाड़ी कूट (Nadi)", desc: "संतान एवं प्राणिक स्वास्थ्य" },
};

export default function KundaliMatchingForm() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const [boyData, setBoyData] = useState({ name: "", dob: "", tob: "" });
  const [boyLocation, setBoyLocation] = useState<{ lat: number; lon: number; timezone: string } | null>(null);
  const [girlData, setGirlData] = useState({ name: "", dob: "", tob: "" });
  const [girlLocation, setGirlLocation] = useState<{ lat: number; lon: number; timezone: string } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchingResponse | null>(null);
  const [chartStyle, setChartStyle] = useState<"north" | "south" | "east">("north");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boyData.name || !boyData.dob || !boyData.tob || !boyLocation || !girlData.name || !girlData.dob || !girlData.tob || !girlLocation) {
      setError(isHi ? "कृपया वर और वधू दोनों के जन्म विवरण एवं शहर चुनें।" : "Please fill in all birth details for both Bride and Groom, including selecting a birth city.");
      return;
    }
    setError(null);
    try {
      setResult(calculateEnterpriseCompatibility({ boy: { ...boyData, ...boyLocation }, girl: { ...girlData, ...girlLocation } }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          <div className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl p-8">
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-[#C9A84C]/20 pb-4">
              {isHi ? "वर का जन्म विवरण" : "Groom's Birth Details"}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="boy-name" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "पूरा नाम" : "Full Name"}</label>
                <input id="boy-name" type="text" value={boyData.name} onChange={(e) => setBoyData({ ...boyData, name: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]" placeholder={isHi ? "वर का नाम" : "Groom's Name"} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="boy-dob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म तिथि" : "Date of Birth"}</label>
                  <input id="boy-dob" type="date" value={boyData.dob} onChange={(e) => setBoyData({ ...boyData, dob: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] [color-scheme:dark]" required />
                </div>
                <div>
                  <label htmlFor="boy-tob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म समय" : "Time of Birth"}</label>
                  <input id="boy-tob" type="time" value={boyData.tob} onChange={(e) => setBoyData({ ...boyData, tob: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] [color-scheme:dark]" required />
                </div>
              </div>
              <div>
                <label htmlFor="boy-pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म स्थान" : "Place of Birth"}</label>
                <PlaceAutoComplete id="boy-pob" onSelect={(p) => setBoyLocation({ lat: p.latitude, lon: p.longitude, timezone: p.timezone })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]" placeholder={isHi ? "शहर, राज्य" : "City, State"} />
              </div>
            </div>
          </div>

          <div className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl p-8">
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-[#C9A84C]/20 pb-4">
              {isHi ? "वधू का जन्म विवरण" : "Bride's Birth Details"}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="girl-name" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "पूरा नाम" : "Full Name"}</label>
                <input id="girl-name" type="text" value={girlData.name} onChange={(e) => setGirlData({ ...girlData, name: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]" placeholder={isHi ? "वधू का नाम" : "Bride's Name"} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="girl-dob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म तिथि" : "Date of Birth"}</label>
                  <input id="girl-dob" type="date" value={girlData.dob} onChange={(e) => setGirlData({ ...girlData, dob: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] [color-scheme:dark]" required />
                </div>
                <div>
                  <label htmlFor="girl-tob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म समय" : "Time of Birth"}</label>
                  <input id="girl-tob" type="time" value={girlData.tob} onChange={(e) => setGirlData({ ...girlData, tob: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] [color-scheme:dark]" required />
                </div>
              </div>
              <div>
                <label htmlFor="girl-pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">{isHi ? "जन्म स्थान" : "Place of Birth"}</label>
                <PlaceAutoComplete id="girl-pob" onSelect={(p) => setGirlLocation({ lat: p.latitude, lon: p.longitude, timezone: p.timezone })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]" placeholder={isHi ? "शहर, राज्य" : "City, State"} />
              </div>
            </div>
          </div>
        </div>

        {error && <div className="mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-center max-w-2xl mx-auto">{error}</div>}

        <div className="mt-10 text-center">
          <button type="submit" className="bg-[#C9A84C] text-[#0D0B1A] px-12 py-4 rounded-full font-bold text-lg hover:bg-[#d9b85c] transition-colors cursor-pointer">
            {isHi ? "36-गुण अष्टकूट मिलान जांचें" : "Check Ashtakoot Compatibility"}
          </button>
        </div>
      </form>

      {result && (
        <div className="bg-[#1A1628] border border-[#C9A84C]/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#C9A84C]/20 pb-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#C9A84C]">
                {isHi ? "अष्टकूट गुण मिलान रिपोर्ट" : "Ashtakoot Guna Milan Report"}
              </h2>
              <p className="text-sm text-[#E8E4F0]/75">
                {result.boySummary.name} ({result.boySummary.moonSign}) &amp; {result.girlSummary.name} ({result.girlSummary.moonSign})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#0D0B1A] p-1 rounded-full border border-[#C9A84C]/30 flex text-xs font-semibold">
                {(["north", "south", "east"] as const).map((st) => (
                  <button key={st} type="button" onClick={() => setChartStyle(st)} className={`px-3 py-1.5 rounded-full capitalize cursor-pointer ${chartStyle === st ? "bg-[#C9A84C] text-[#0D0B1A]" : "text-[#E8E4F0]/75"}`}>
                    {isHi ? (st === "north" ? "उत्तर" : st === "south" ? "दक्षिण" : "पूर्व") : st}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 text-xs font-semibold text-[#C9A84C] cursor-pointer">
                <Printer className="w-3.5 h-3.5" /><span>{isHi ? "प्रिंट" : "Print"}</span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block px-8 py-5 bg-[#0D0B1A] border-2 border-[#C9A84C]/50 rounded-full mb-4">
              <span className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C]">{result.score}</span>
              <span className="text-xl text-[#E8E4F0]/70"> / {result.maxScore} {isHi ? "गुण" : "Gunas"}</span>
            </div>
            <p className={`text-xl font-bold ${result.score >= 18 ? "text-emerald-400" : "text-amber-400"}`}>{result.status}</p>
            <p className="mt-3 text-[#E8E4F0]/85 max-w-2xl mx-auto">{result.recommendation}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VedicChartSVG styleType={chartStyle} ascendantRashiIndex={result.boyChartData.ascendantRashiIndex} planets={result.boyChartData.planets} title={`${isHi ? "वर" : "Groom"}: ${result.boySummary.name}`} subtitle={`${result.boySummary.nakshatra} • ${result.boySummary.manglik}`} />
            <VedicChartSVG styleType={chartStyle} ascendantRashiIndex={result.girlChartData.ascendantRashiIndex} planets={result.girlChartData.planets} title={`${isHi ? "वधू" : "Bride"}: ${result.girlSummary.name}`} subtitle={`${result.girlSummary.nakshatra} • ${result.girlSummary.manglik}`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.breakdown.map((koot, i) => (
              <div key={i} className="bg-[#0D0B1A] p-4 rounded-xl border border-[#C9A84C]/20 flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#E8E4F0]">{isHi ? (KOOT_HI[koot.name]?.name || koot.name) : `${koot.name} Koota`}</div>
                  <div className="text-xs text-[#E8E4F0]/70">{isHi ? (KOOT_HI[koot.name]?.desc || koot.description) : koot.description}</div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="text-lg font-bold text-[#C9A84C]">{koot.score}</span>
                  <span className="text-[#E8E4F0]/65 text-sm"> / {koot.max}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#0D0B1A] border border-[#C9A84C]/35 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase text-[#C9A84C] font-bold">{isHi ? "विवाह मिलान परामर्श" : "Personal Marriage Matching Review"}</div>
              <div className="text-lg font-serif font-bold text-[#E8E4F0]">{isHi ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री से परामर्श लें" : "Consult Acharya Shri Ravindra Shukla Shatri"}</div>
            </div>
            <a href={`https://wa.me/918009124454?text=${encodeURIComponent(`Namaste Acharya Shri Ravindra Shukla Shatri Ji, we checked Kundali Matching (${boyData.name} & ${girlData.name}, Score: ${result.score}/36) on JyotishGuru.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C9A84C] text-[#0D0B1A] font-bold rounded-full text-sm shrink-0">
              <MessageCircle className="w-4 h-4" /><span>{isHi ? "व्हाट्सएप: +91 80091 24454" : "WhatsApp: +91 80091 24454"}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
