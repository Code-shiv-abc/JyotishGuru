"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";
import { AyanamshaSystem, calculateEnterpriseKundali } from "@/lib/astrology";
import VedicChartSVG from "@/components/astrology/KundaliForm";
import { MessageCircle, Printer, Sparkles, Bookmark, Trash2, Share2 } from "lucide-react";

type KundaliResponse = ReturnType<typeof calculateEnterpriseKundali>;

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
      const res = calculateEnterpriseKundali({
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

  useEffect(() => {
    const qName = searchParams.get("name");
    const qDob = searchParams.get("dob");
    const qTob = searchParams.get("tob");
    const qLat = searchParams.get("lat");
    const qLon = searchParams.get("lon");
    const qTz = searchParams.get("tz") || "Asia/Kolkata";

    if (qName && qDob && qTob && qLat && qLon && !result && !isLoading) {
      try {
        const res = calculateEnterpriseKundali({
          name: qName,
          gender: "male",
          dob: qDob,
          tob: qTob,
          lat: parseFloat(qLat),
          lon: parseFloat(qLon),
          timezone: qTz,
          ayanamshaSystem: "LAHIRI",
        });
        setResult(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to calculate chart");
      }
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
      const response = calculateEnterpriseKundali({
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

          {activeTab === "planets" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#E8E4F0] border-collapse">
                <thead className="bg-[#0D0B1A] text-[#C9A84C] border-b border-[#C9A84C]/30">
                  <tr>
                    <th 
