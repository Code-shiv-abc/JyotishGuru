"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";
import { generateKundali } from "@/app/actions/kundali";
import { AyanamshaSystem } from "@/lib/astrology";
import VedicChartSVG from "@/components/astrology/VedicChartSVG";
import { MessageCircle, Printer, Sparkles, Bookmark, Trash2, Share2 } from "lucide-react";

type KundaliResponse = Awaited<ReturnType<typeof generateKundali>>;

interface SavedChartEntry {
  id: string;
  name: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  lat: number;
  lon: number;
  timezone: string;
}

const STORAGE_KEY = "jyotishguru_saved_kundalis_v1";

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
      ? {
          lat: parseFloat(searchParams.get("lat")!),
          lon: parseFloat(searchParams.get("lon")!),
          timezone: searchParams.get("tz") || "Asia/Kolkata",
        }
      : null
  );

  const [savedCharts, setSavedCharts] = useState<SavedChartEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<KundaliResponse | null>(null);
  const [chartStyle, setChartStyle] = useState<"north" | "south" | "east">("north");
  const [activeTab, setActiveTab] = useState<
    "charts" | "planets" | "vargas" | "strength" | "dasha" | "yogas" | "remedies"
  >("charts");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSavedCharts(JSON.parse(raw));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveChartToHistory = (entry: SavedChartEntry) => {
    try {
      const updated = [entry, ...savedCharts.filter((c) => c.name !== entry.name || c.dob !== entry.dob)].slice(0, 6);
      setSavedCharts(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const removeSavedChart = (id: string) => {
    const updated = savedCharts.filter((c) => c.id !== id);
    setSavedCharts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const loadSavedChart = async (entry: SavedChartEntry) => {
    setFormData((prev) => ({ ...prev, name: entry.name, gender: entry.gender, dob: entry.dob, tob: entry.tob }));
    setPlaceLabel(entry.pob);
    setLocation({ lat: entry.lat, lon: entry.lon, timezone: entry.timezone });
    setError(null);
    setIsLoading(true);
    try {
      const res = await generateKundali({
        name: entry.name,
        gender: entry.gender,
        dob: entry.dob,
        tob: entry.tob,
        lat: entry.lat,
        lon: entry.lon,
        timezone: entry.timezone,
        ayanamshaSystem: formData.ayanamshaSystem,
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load chart");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-calculate if routed from Homepage KundaliCTAForm
  useEffect(() => {
    const qName = searchParams.get("name");
    const qDob = searchParams.get("dob");
    const qTob = searchParams.get("tob");
    const qLat = searchParams.get("lat");
    const qLon = searchParams.get("lon");
    const qTz = searchParams.get("tz") || "Asia/Kolkata";

    if (qName && qDob && qTob && qLat && qLon && !result && !isLoading) {
      setIsLoading(true);
      generateKundali({
        name: qName,
        gender: "male",
        dob: qDob,
        tob: qTob,
        lat: parseFloat(qLat),
        lon: parseFloat(qLon),
        timezone: qTz,
        ayanamshaSystem: "LAHIRI",
      })
        .then((res) => setResult(res))
        .catch((err) => setError(err instanceof Error ? err.message : "Failed to calculate chart"))
        .finally(() => setIsLoading(false));
    }
  }, [searchParams, result, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.tob || !location) {
      setError("Please fill in all fields and select a valid birth city from the dropdown.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await generateKundali({
        name: formData.name,
        gender: formData.gender,
        dob: formData.dob,
        tob: formData.tob,
        lat: location.lat,
        lon: location.lon,
        timezone: location.timezone,
        ayanamshaSystem: formData.ayanamshaSystem,
      });
      setResult(response);
      saveChartToHistory({
        id: `${formData.name}-${formData.dob}`,
        name: formData.name,
        gender: formData.gender,
        dob: formData.dob,
        tob: formData.tob,
        pob: placeLabel || "Selected City",
        lat: location.lat,
        lon: location.lon,
        timezone: location.timezone,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareChartLink = () => {
    if (!location) return;
    const params = new URLSearchParams({
      name: formData.name,
      dob: formData.dob,
      tob: formData.tob,
      pob: placeLabel,
      lat: String(location.lat),
      lon: String(location.lon),
      tz: location.timezone,
    });
    const shareUrl = `${window.location.origin}/kundali?${params.toString()}`;
    navigator.clipboard?.writeText(shareUrl);
  };

  return (
    <div className="space-y-10">
      {/* Saved Kundalis Bar ($0 Client Persistence) */}
      {savedCharts.length > 0 && (
        <div className="bg-[#1A1628]/80 border border-[#C9A84C]/25 rounded-2xl p-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" />
            Saved Charts:
          </span>
          {savedCharts.map((sc) => (
            <div
              key={sc.id}
              className="inline-flex items-center gap-2 bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-full px-3.5 py-1 text-xs text-[#E8E4F0]"
            >
              <button
                type="button"
                onClick={() => loadSavedChart(sc)}
                className="hover:text-[#C9A84C] font-medium cursor-pointer"
              >
                {sc.name} ({sc.dob})
              </button>
              <button
                type="button"
                onClick={() => removeSavedChart(sc.id)}
                aria-label={`Remove ${sc.name}`}
                className="text-[#E8E4F0]/50 hover:text-red-400 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl p-8 shadow-2xl relative">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] placeholder-[#E8E4F0]/55 focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="ayanamsha" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Ayanamsha System
              </label>
              <select
                id="ayanamsha"
                value={formData.ayanamshaSystem}
                onChange={(e) => setFormData({ ...formData, ayanamshaSystem: e.target.value as AyanamshaSystem })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors"
              >
                <option value="LAHIRI">Chitra Paksha (Lahiri — Standard)</option>
                <option value="KP">KP Krishnamurti Padhdhati</option>
                <option value="RAMAN">B.V. Raman Ayanamsha</option>
                <option value="SURYASIDDHANTA">Traditional Suryasiddhanta</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
                required
              />
            </div>
            <div>
              <label htmlFor="tob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Time of Birth
              </label>
              <input
                type="time"
                id="tob"
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
                required
              />
            </div>
            <div>
              <label htmlFor="pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Place of Birth
              </label>
              <PlaceAutoComplete
                id="pob"
                initialValue={placeLabel}
                onSelect={(place) => {
                  setPlaceLabel(`${place.name}${place.admin1 ? `, ${place.admin1}` : ""}`);
                  setLocation({ lat: place.latitude, lon: place.longitude, timezone: place.timezone });
                }}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] placeholder-[#E8E4F0]/55 focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-xl font-sans font-bold text-lg hover:bg-[#d9b85c] transition-colors shadow-lg shadow-[#C9A84C]/20 disabled:opacity-70 flex justify-center items-center cursor-pointer"
            >
              {isLoading ? "Computing Shodashvarga, Shadbala & Vimshottari Ephemeris..." : "Generate Enterprise Janam Kundali"}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="bg-[#1A1628] border border-[#C9A84C]/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[#C9A84C]/20 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold">
                {result.meta.ayanamshaName} Ayanamsha ({result.meta.ayanamshaValue})
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#E8E4F0] mt-1">
                Janam Kundali: {result.meta.name}
              </h2>
              <p className="text-sm text-[#E8E4F0]/70">
                Lagna: <strong className="text-[#C9A84C]">{result.ascendant.rasi} ({result.ascendant.degreeFormatted})</strong> • Moon Nakshatra: <strong className="text-[#C9A84C]">{result.panchang.nakshatra} (Pada {result.panchang.pada})</strong>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-[#0D0B1A] p-1 rounded-full border border-[#C9A84C]/30 flex text-xs font-semibold">
                {(["north", "south", "east"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setChartStyle(st)}
                    className={`px-3 py-1.5 rounded-full capitalize transition-colors cursor-pointer ${
                      chartStyle === st ? "bg-[#C9A84C] text-[#0D0B1A]" : "text-[#E8E4F0]/75"
                    }`}
                  >
                    {st} Indian
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleShareChartLink}
                title="Copy Direct Link to This Chart"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 text-xs font-semibold text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 text-xs font-semibold text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* 7-Tab Enterprise Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-[#C9A84C]/15 pb-4">
            {[
              { id: "charts", label: "1. Charts & Panchang" },
              { id: "planets", label: "2. Graha Sphuta & Karakas" },
              { id: "vargas", label: "3. Divisional Vargas (D-1..D-12)" },
              { id: "strength", label: "4. Shadbala & Ashtakavarga (SAV)" },
              { id: "dasha", label: "5. Vimshottari Dasha (120Y)" },
              { id: "yogas", label: `6. Yogas & Manglik (${result.yogas.length})` },
              { id: "remedies", label: "7. Gemstones & Mantras" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#C9A84C] text-[#0D0B1A] shadow-md"
                    : "bg-[#0D0B1A] text-[#E8E4F0]/75 hover:text-[#C9A84C] border border-[#C9A84C]/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: CHARTS & PANCHANG */}
          {activeTab === "charts" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <VedicChartSVG
                  styleType={chartStyle}
                  ascendantRashiIndex={result.ascendant.rashiIndex}
                  planets={result.planets.map((p) => ({
                    key: p.key,
                    rashiIndex: p.rashiIndex,
                    house: p.house,
                    degreeFormatted: p.degreeFormatted,
                    nakshatra: p.nakshatra,
                    dignity: p.dignity,
                    isRetrograde: p.isRetrograde,
                    isCombust: p.isCombust,
                  }))}
                  title="Lagna Chart (D-1)"
                  subtitle={`Ascendant: ${result.ascendant.rasi} (${result.ascendant.degreeFormatted})`}
                />
                <VedicChartSVG
                  styleType={chartStyle}
                  ascendantRashiIndex={result.ascendant.navamshaRashiIndex}
                  planets={result.planets.map((p) => ({
                    key: p.key,
                    rashiIndex: p.navamshaRashiIndex,
                    house: p.navamshaHouse,
                    degreeFormatted: p.degreeFormatted,
                    isRetrograde: p.isRetrograde,
                  }))}
                  title="Navamsha Chart (D-9)"
                  subtitle={`Navamsha Lagna: ${result.ascendant.navamshaRasi}`}
                />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[#C9A84C] mb-4">
                  Birth Panchang &amp; Avakahada Chakra
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Vara (Weekday)", value: result.panchang.vara },
                    { label: "Tithi (Lunar Day)", value: result.panchang.tithi },
                    { label: "Birth Nakshatra", value: `${result.panchang.nakshatra} (Pada ${result.panchang.pada})` },
                    { label: "Nitya Yoga", value: result.panchang.yoga },
                    { label: "Karana", value: result.panchang.karana },
                    { label: "Paya (Footing)", value: result.panchang.paya },
                    { label: "Gana (Temperament)", value: result.panchang.gana },
                    { label: "Nadi & Varna", value: `${result.panchang.nadi} • ${result.panchang.varna}` },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#0D0B1A] p-4 rounded-xl border border-[#C9A84C]/15">
                      <div className="text-xs text-[#E8E4F0]/60 uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-[#E8E4F0]">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLANETARY DEGREES, AVASTHAS & JAIMINI KARAKAS */}
          {activeTab === "planets" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#E8E4F0] border-collapse">
                <thead className="bg-[#0D0B1A] text-[#C9A84C] border-b border-[#C9A84C]/30">
                  <tr>
                    <th className="px-3.5 py-3">Planet</th>
                    <th className="px-3.5 py-3">Rashi (D-1)</th>
                    <th className="px-3.5 py-3">Degree</th>
                    <th className="px-3.5 py-3">House</th>
                    <th className="px-3.5 py-3">Nakshatra (Pada)</th>
                    <th className="px-3.5 py-3">Jaimini Karaka</th>
                    <th className="px-3.5 py-3">Avastha &amp; Dignity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A84C]/10">
                  {result.planets.map((p) => (
                    <tr key={p.key} className="hover:bg-[#0D0B1A]/60">
                      <td className="px-3.5 py-3 font-bold text-[#C9A84C]">{p.name}</td>
                      <td className="px-3.5 py-3">{p.rasi}</td>
                      <td className="px-3.5 py-3 font-mono text-xs">{p.degreeFormatted}</td>
                      <td className="px-3.5 py-3">House {p.house}</td>
                      <td className="px-3.5 py-3">
                        {p.nakshatra} (P{p.pada}) <span className="text-xs text-[#E8E4F0]/60">• {p.nakshatraLord}</span>
                      </td>
                      <td className="px-3.5 py-3 text-xs font-semibold text-[#C9A84C]">{p.charaKaraka}</td>
                      <td className="px-3.5 py-3">
                        <span className="text-xs">{p.dignity} • {p.avastha}</span>
                        {p.isRetrograde && (
                          <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full bg-amber-500/20 text-amber-300 font-bold">
                            Vakri (R)
                          </span>
                        )}
                        {p.isCombust && (
                          <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full bg-red-500/20 text-red-300 font-bold">
                            Asta (C)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: SHODASHVARGA DIVISIONAL CHARTS (D-1 TO D-12) */}
          {activeTab === "vargas" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <VedicChartSVG
                  styleType={chartStyle}
                  ascendantRashiIndex={result.ascendant.dashamshaRashiIndex}
                  planets={result.planets.map((p) => ({
                    key: p.key,
                    rashiIndex: p.dashamshaRashiIndex,
                    house: p.dashamshaHouse,
                    isRetrograde: p.isRetrograde,
                  }))}
                  title="Dashamsha Chart (D-10 — Career & Fame)"
                  subtitle={`D-10 Ascendant: ${result.ascendant.dashamshaRasi}`}
                />
                <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-5 overflow-x-auto">
                  <h3 className="text-lg font-serif font-bold text-[#C9A84C] mb-3">
                    Shodashvarga Summary Table (D-1 to D-12)
                  </h3>
                  <table className="w-full text-left text-xs text-[#E8E4F0] border-collapse">
                    <thead className="border-b border-[#C9A84C]/30 text-[#C9A84C]">
                      <tr>
                        <th className="py-2 pr-2">Graha</th>
                        <th className="py-2 px-1">D-1</th>
                        <th className="py-2 px-1">D-2</th>
                        <th className="py-2 px-1">D-3</th>
                        <th className="py-2 px-1">D-7</th>
                        <th className="py-2 px-1">D-9</th>
                        <th className="py-2 px-1">D-10</th>
                        <th className="py-2 pl-1">D-12</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C9A84C]/10">
                      {result.planets.map((p) => (
                        <tr key={p.key}>
                          <td className="py-2 pr-2 font-bold text-[#C9A84C]">{p.key}</td>
                          <td className="py-2 px-1">{p.vargas.D1.split(" ")[0]}</td>
                          <td className="py-2 px-1">{p.vargas.D2.split(" ")[0]}</td>
                          <td className="py-2 px-1">{p.vargas.D3.split(" ")[0]}</td>
                          <td className="py-2 px-1">{p.vargas.D7.split(" ")[0]}</td>
                          <td className="py-2 px-1">{p.vargas.D9.split(" ")[0]}</td>
                          <td className="py-2 px-1">{p.vargas.D10.split(" ")[0]}</td>
                          <td className="py-2 pl-1">{p.vargas.D12.split(" ")[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SHADBALA & SARVASHTAKAVARGA (SAV) */}
          {activeTab === "strength" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-serif font-bold text-[#C9A84C]">
                  Parashari Shadbala (Six-Fold Planetary Strength)
                </h3>
                <div className="space-y-3">
                  {result.shadbala.map((sb) => (
                    <div key={sb.planet} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-[#E8E4F0]">
                          {sb.planet} ({sb.totalRupas} Rupas / Req: {sb.requiredRupas})
                        </span>
                        <span className="text-[#C9A84C] font-semibold">
                          {sb.strengthPct}% • {sb.status}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-[#1A1628] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#C9A84C] to-[#D4A017]"
                          style={{ width: `${Math.min(100, Math.round((sb.strengthPct / 140) * 100))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-serif font-bold text-[#C9A84C]">
                  Sarvashtakavarga (SAV — 337 Bindu Matrix)
                </h3>
                <p className="text-xs text-[#E8E4F0]/70">
                  Houses with 28+ Bindus yield strong material and spiritual results during planetary transits (Gochara).
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {result.ashtakavarga.map((av) => (
                    <div
                      key={av.house}
                      className={`p-3 rounded-xl border text-center ${
                        av.bindus >= 30
                          ? "bg-[#1A1040] border-[#C9A84C]"
                          : "bg-[#1A1628] border-[#C9A84C]/20"
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider text-[#E8E4F0]/60">
                        House {av.house} ({av.rashiName})
                      </div>
                      <div className="text-xl font-serif font-bold text-[#C9A84C] my-0.5">
                        {av.bindus}
                      </div>
                      <div className="text-[10px] text-[#E8E4F0]/75">{av.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VIMSHOTTARI DASHA */}
          {activeTab === "dasha" && (
            <div className="space-y-4">
              <p className="text-sm text-[#E8E4F0]/75">
                120-Year Parashari Vimshottari Mahadasha sequence calculated from your Moon&apos;s exact degree in <strong>{result.panchang.nakshatra}</strong>:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.vimshottari.map((maha) => (
                  <div
                    key={maha.lord}
                    className={`p-5 rounded-2xl border ${
                      maha.isCurrent
                        ? "bg-[#1A1040] border-[#C9A84C] shadow-lg"
                        : "bg-[#0D0B1A] border-[#C9A84C]/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-serif font-bold text-[#C9A84C]">
                        {maha.lord} Mahadasha ({maha.years}Y)
                      </span>
                      {maha.isCurrent && (
                        <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-[#C9A84C] text-[#0D0B1A] rounded-full">
                          Active Now
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#E8E4F0]/70 mb-3">
                      {maha.startDate} → {maha.endDate}
                    </div>
                    <div className="space-y-1 max-h-40 overflow-y-auto pr-1 text-xs border-t border-[#C9A84C]/15 pt-2">
                      {maha.antardashas.map((antar) => (
                        <div
                          key={antar.lord}
                          className={`flex justify-between py-1 px-2 rounded ${
                            antar.isCurrent ? "bg-[#C9A84C]/20 text-[#C9A84C] font-bold" : "text-[#E8E4F0]/70"
                          }`}
                        >
                          <span>{antar.lord}</span>
                          <span>{antar.endDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: YOGAS & DOSHAS */}
          {activeTab === "yogas" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.yogas.map((yoga, i) => (
                <div key={i} className="bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-2xl p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#C9A84C] font-semibold">
                      {yoga.category}
                    </span>
                    <span className="px-3 py-0.5 text-xs rounded-full bg-[#C9A84C]/15 text-[#C9A84C] font-bold">
                      {yoga.badge}
                    </span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#E8E4F0]">{yoga.name}</h4>
                  <p className="text-sm text-[#E8E4F0]/75 leading-relaxed">{yoga.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: GEMSTONES, RUDRAKSHA & BEEJ MANTRAS */}
          {activeTab === "remedies" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.remedies.map((rem, idx) => (
                <div key={idx} className="bg-[#0D0B1A] border border-[#C9A84C]/30 rounded-2xl p-6 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-[#C9A84C] font-bold">{rem.role}</div>
                  <h4 className="text-xl font-serif font-bold text-[#E8E4F0]">{rem.gemstone}</h4>
                  <div className="text-xs text-[#E8E4F0]/75 space-y-1.5 pt-2 border-t border-[#C9A84C]/15">
                    <div><strong>Metal &amp; Finger:</strong> {rem.metal} ({rem.finger})</div>
                    <div><strong>Wearing Day:</strong> {rem.day}</div>
                    <div><strong>Sacred Rudraksha:</strong> {rem.rudraksha}</div>
                    <div className="pt-2 text-[#C9A84C] italic font-serif text-sm">&quot;{rem.mantra}&quot;</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contextual Consultation Upsell Banner */}
          <div className="mt-8 p-6 md:p-8 bg-gradient-to-r from-[#1A1040] via-[#0D0B1A] to-[#1A1040] border border-[#C9A84C]/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
                <Sparkles className="w-4 h-4" />
                <span>Personalized Vedic Interpretation</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#E8E4F0]">
                Consult Acharya Shri Ravindra Shukla Shatri on Your Chart
              </h3>
              <p className="text-sm text-[#E8E4F0]/75 max-w-xl">
                Get a 1-on-1 deep reading of your active Vimshottari Dasha, Shadbala, marriage yogas, and authentic Ayodhya Dham spiritual remedies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/book?service=kundali"
                className="px-6 py-3.5 bg-[#C9A84C] text-[#0D0B1A] font-bold rounded-full text-sm text-center hover:bg-[#d9b85c] transition-colors"
              >
                Book 1-on-1 Reading (₹1100)
              </a>
              <a
                href={`https://wa.me/918009124454?text=${encodeURIComponent(
                  `Namaste Acharya Shri Ravindra Shukla Shatri Ji, I generated my Kundali (${result.meta.name}, Lagna: ${result.ascendant.rasi}, Nakshatra: ${result.panchang.nakshatra}) on JyotishGuru and would like to book a personal consultation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#C9A84C]/50 text-[#E8E4F0] font-semibold rounded-full text-sm text-center hover:bg-white/5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A84C]" />
                <span>WhatsApp: +91 80091 24454</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
