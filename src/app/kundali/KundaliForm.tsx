"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";
import VedicChartSVG from "@/components/astrology/KundaliForm";
import { AyanamshaSystem, calculateEnterpriseKundali } from "@/lib/astrology";
import { MessageCircle, Printer, Sparkles, Share2 } from "lucide-react";

type KundaliResponse = ReturnType<typeof calculateEnterpriseKundali>;

export default function KundaliForm() {
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
      setError("Please fill in all fields and select a valid birth city from the dropdown.");
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
              <label htmlFor="name" className="block text-sm font-medium text-[#E8E4F0] mb-2">Full Name</label>
              <input id="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]" placeholder="Enter full name" required />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-[#E8E4F0] mb-2">Gender</label>
              <select id="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="ayanamsha" className="block text-sm font-medium text-[#E8E4F0] mb-2">Ayanamsha</label>
              <select id="ayanamsha" value={formData.ayanamshaSystem} onChange={(e) => setFormData({ ...formData, ayanamshaSystem: e.target.value as AyanamshaSystem })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]">
                <option value="LAHIRI">Chitra Paksha (Lahiri)</option>
                <option value="KP">KP Krishnamurti</option>
                <option value="RAMAN">B.V. Raman</option>
                <option value="SURYASIDDHANTA">Suryasiddhanta</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-[#E8E4F0] mb-2">Date of Birth</label>
              <input id="dob" type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] [color-scheme:dark]" required />
            </div>
            <div>
              <label htmlFor="tob" className="block text-sm font-medium text-[#E8E4F0] mb-2">Time of Birth</label>
              <input id="tob" type="time" value={formData.tob} onChange={(e) => setFormData({ ...formData, tob: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] [color-scheme:dark]" required />
            </div>
            <div>
              <label htmlFor="pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">Place of Birth</label>
              <PlaceAutoComplete id="pob" initialValue={placeLabel} onSelect={(p) => { setPlaceLabel(`${p.name}${p.admin1 ? `, ${p.admin1}` : ""}`); setLocation({ lat: p.latitude, lon: p.longitude, timezone: p.timezone }); }} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0]" placeholder="City, State" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-xl font-bold text-lg hover:bg-[#d9b85c] transition-colors cursor-pointer">
            Generate Enterprise Janam Kundali
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-[#1A1628] border border-[#C9A84C]/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[#C9A84C]/20 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold">Ayanamsha: {result.meta.ayanamshaName} ({result.meta.ayanamshaValue})</span>
              <h2 className="text-3xl font-serif font-bold text-[#E8E4F0] mt-1">Janam Kundali: {result.meta.name}</h2>
              <p className="text-sm text-[#E8E4F0]/70">Lagna: <strong className="text-[#C9A84C]">{result.ascendant.rasi} ({result.ascendant.degreeFormatted})</strong> • Nakshatra: <strong className="text-[#C9A84C]">{result.panchang.nakshatra} (Pada {result.panchang.pada})</strong></p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-[#0D0B1A] p-1 rounded-full border border-[#C9A84C]/30 flex text-xs font-semibold">
                {(["north", "south", "east"] as const).map((st) => (
                  <button key={st} type="button" onClick={() => setChartStyle(st)} className={`px-3 py-1.5 rounded-full capitalize cursor-pointer ${chartStyle === st ? "bg-[#C9A84C] text-[#0D0B1A]" : "text-[#E8E4F0]/75"}`}>{st}</button>
                ))}
              </div>
              <button type="button" onClick={handleShareChartLink} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 text-xs font-semibold text-[#C9A84C] cursor-pointer"><Share2 className="w-3.5 h-3.5" /><span>Copy Link</span></button>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 text-xs font-semibold text-[#C9A84C] cursor-pointer"><Printer className="w-3.5 h-3.5" /><span>Print</span></button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-[#C9A84C]/15 pb-4">
            {[
              ["charts", "1. Charts & Panchang"], ["planets", "2. Graha Sphuta & Karakas"], ["vargas", "3. Vargas (D-1..D-12)"],
              ["strength", "4. Shadbala & SAV"], ["dasha", "5. Vimshottari Dasha"], ["yogas", "6. Yogas & Manglik"], ["remedies", "7. Gemstones & Mantras"],
            ].map(([id, label]) => (
              <button key={id} type="button" onClick={() => setActiveTab(id as typeof activeTab)} className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold cursor-pointer ${activeTab === id ? "bg-[#C9A84C] text-[#0D0B1A]" : "bg-[#0D0B1A] text-[#E8E4F0]/75 border border-[#C9A84C]/20"}`}>{label}</button>
            ))}
          </div>

          {activeTab === "charts" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <VedicChartSVG styleType={chartStyle} ascendantRashiIndex={result.ascendant.rashiIndex} planets={result.planets} title="Lagna Chart (D-1)" subtitle={`Ascendant: ${result.ascendant.rasi}`} />
                <VedicChartSVG styleType={chartStyle} ascendantRashiIndex={result.ascendant.navamshaRashiIndex} planets={result.planets.map((p) => ({ ...p, rashiIndex: p.navamshaRashiIndex, house: p.navamshaHouse }))} title="Navamsha Chart (D-9)" subtitle={`D-9 Lagna: ${result.ascendant.navamshaRasi}`} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  ["Vara", result.panchang.vara], ["Tithi", result.panchang.tithi], ["Nakshatra", `${result.panchang.nakshatra} (P${result.panchang.pada})`], ["Yoga", result.panchang.yoga],
                  ["Karana", result.panchang.karana], ["Paya", result.panchang.paya], ["Gana", result.panchang.gana], ["Nadi & Varna", `${result.panchang.nadi} • ${result.panchang.varna}`],
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
                  <tr><th className="p-3">Planet</th><th className="p-3">Rashi</th><th className="p-3">Degree</th><th className="p-3">House</th><th className="p-3">Nakshatra</th><th className="p-3">Karaka</th><th className="p-3">Dignity</th></tr>
                </thead>
                <tbody className="divide-y divide-[#C9A84C]/10">
                  {result.planets.map((p) => (
                    <tr key={p.key}><td className="p-3 font-bold text-[#C9A84C]">{p.name}</td><td className="p-3">{p.rasi}</td><td className="p-3 font-mono text-xs">{p.degreeFormatted}</td><td className="p-3">H{p.house}</td><td className="p-3">{p.nakshatra} (P{p.pada})</td><td className="p-3 text-xs text-[#C9A84C]">{p.charaKaraka}</td><td className="p-3 text-xs">{p.dignity} {p.isRetrograde ? "(R)" : ""}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "vargas" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <VedicChartSVG styleType={chartStyle} ascendantRashiIndex={result.ascendant.dashamshaRashiIndex} planets={result.planets.map((p) => ({ ...p, rashiIndex: p.dashamshaRashiIndex, house: p.dashamshaHouse }))} title="Dashamsha Chart (D-10)" subtitle={`D-10 Lagna: ${result.ascendant.dashamshaRasi}`} />
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-5 overflow-x-auto">
                <table className="w-full text-left text-xs text-[#E8E4F0]">
                  <thead className="border-b border-[#C9A84C]/30 text-[#C9A84C]">
                    <tr><th className="py-2">Graha</th><th>D-1</th><th>D-2</th><th>D-3</th><th>D-7</th><th>D-9</th><th>D-10</th><th>D-12</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#C9A84C]/10">
                    {result.planets.map((p) => (
                      <tr key={p.key}><td className="py-2 font-bold text-[#C9A84C]">{p.key}</td><td>{p.vargas.D1.split(" ")[0]}</td><td>{p.vargas.D2.split(" ")[0]}</td><td>{p.vargas.D3.split(" ")[0]}</td><td>{p.vargas.D7.split(" ")[0]}</td><td>{p.vargas.D9.split(" ")[0]}</td><td>{p.vargas.D10.split(" ")[0]}</td><td>{p.vargas.D12.split(" ")[0]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "strength" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-6 space-y-3">
                <h3 className="text-lg font-serif font-bold text-[#C9A84C]">Parashari Shadbala Strength</h3>
                {result.shadbala.map((sb) => (
                  <div key={sb.planet} className="flex justify-between text-xs border-b border-[#C9A84C]/10 pb-2">
                    <span className="font-bold text-[#E8E4F0]">{sb.planet} ({sb.totalRupas} Rupas)</span>
                    <span className="text-[#C9A84C] font-semibold">{sb.strengthPct}% • {sb.status}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-6">
                <h3 className="text-lg font-serif font-bold text-[#C9A84C] mb-3">Sarvashtakavarga (337 Bindus)</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {result.ashtakavarga.map((av) => (
                    <div key={av.house} className="p-3 rounded-xl bg-[#1A1628] border border-[#C9A84C]/20 text-center">
                      <div className="text-[10px] text-[#E8E4F0]/60">H{av.house} ({av.rashiName})</div>
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
                  <div className="font-serif font-bold text-[#C9A84C]">{m.lord} Mahadasha ({m.years}Y)</div>
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
                  <div className="text-xs text-[#E8E4F0]/75">Metal: {r.metal} ({r.finger}) • {r.day}</div>
                  <div className="text-xs text-[#E8E4F0]/75">Rudraksha: {r.rudraksha}</div>
                  <div className="text-xs text-[#C9A84C] italic">{r.mantra}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-6 bg-[#0D0B1A] border border-[#C9A84C]/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#C9A84C]"><Sparkles className="w-4 h-4" /><span>Personalized Vedic Interpretation</span></div>
              <h3 className="text-2xl font-serif font-bold text-[#E8E4F0]">Consult Acharya Shri Ravindra Shukla Shatri</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/book?service=kundali" className="px-6 py-3.5 bg-[#C9A84C] text-[#0D0B1A] font-bold rounded-full text-sm text-center">Book 1-on-1 Reading (₹1100)</Link>
              <a href="https://wa.me/918009124454?text=Namaste%20Acharya%20Shri%20Ravindra%20Shukla%20Shatri%20Ji%2C%20I%20generated%20my%20Kundali%20on%20JyotishGuru%20and%20would%20like%20a%20consultation." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#C9A84C]/50 text-[#E8E4F0] font-semibold rounded-full text-sm"><MessageCircle className="w-4 h-4 text-[#C9A84C]" /><span>WhatsApp: +91 80091 24454</span></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// END OF KUNDALIFORM.TSX
