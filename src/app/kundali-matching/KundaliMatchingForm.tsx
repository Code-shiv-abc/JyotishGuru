"use client";

import React, { useState } from "react";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";
import { checkCompatibility } from "@/app/actions/matching";
import VedicChartSVG from "@/components/astrology/VedicChartSVG";
import { MessageCircle, Printer } from "lucide-react";

type MatchingResponse = Awaited<ReturnType<typeof checkCompatibility>>;

export default function KundaliMatchingForm() {
  const [boyData, setBoyData] = useState({ name: "", dob: "", tob: "" });
  const [boyLocation, setBoyLocation] = useState<{ lat: number; lon: number; timezone: string } | null>(null);

  const [girlData, setGirlData] = useState({ name: "", dob: "", tob: "" });
  const [girlLocation, setGirlLocation] = useState<{ lat: number; lon: number; timezone: string } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchingResponse | null>(null);
  const [chartStyle, setChartStyle] = useState<"north" | "south" | "east">("north");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !boyData.name || !boyData.dob || !boyData.tob || !boyLocation ||
      !girlData.name || !girlData.dob || !girlData.tob || !girlLocation
    ) {
      setError("Please fill in all birth details for both Bride and Groom, including selecting a birth city.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const res = await checkCompatibility({
        boy: { ...boyData, ...boyLocation },
        girl: { ...girlData, ...girlLocation },
      });
      setResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/20 -translate-x-1/2 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D0B1A] w-12 h-12 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] font-serif text-2xl z-10">
              &amp;
            </div>
          </div>

          {/* Boy's Details */}
          <div className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl p-8 relative z-10">
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-[#C9A84C]/20 pb-4">
              Groom&apos;s Birth Details
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="boy-name" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                  Full Name
                </label>
                <input
                  id="boy-name"
                  type="text"
                  value={boyData.name}
                  onChange={(e) => setBoyData({ ...boyData, name: e.target.value })}
                  className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] placeholder-[#E8E4F0]/55 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Groom's Name"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="boy-dob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                    Date of Birth
                  </label>
                  <input
                    id="boy-dob"
                    type="date"
                    value={boyData.dob}
                    onChange={(e) => setBoyData({ ...boyData, dob: e.target.value })}
                    className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="boy-tob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                    Time of Birth
                  </label>
                  <input
                    id="boy-tob"
                    type="time"
                    value={boyData.tob}
                    onChange={(e) => setBoyData({ ...boyData, tob: e.target.value })}
                    className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="boy-pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                  Place of Birth
                </label>
                <PlaceAutoComplete
                  id="boy-pob"
                  onSelect={(place) => setBoyLocation({ lat: place.latitude, lon: place.longitude, timezone: place.timezone })}
                  className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] placeholder-[#E8E4F0]/55 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Girl's Details */}
          <div className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl p-8 relative z-10 mt-8 lg:mt-0">
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-[#C9A84C]/20 pb-4">
              Bride&apos;s Birth Details
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="girl-name" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                  Full Name
                </label>
                <input
                  id="girl-name"
                  type="text"
                  value={girlData.name}
                  onChange={(e) => setGirlData({ ...girlData, name: e.target.value })}
                  className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] placeholder-[#E8E4F0]/55 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Bride's Name"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="girl-dob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                    Date of Birth
                  </label>
                  <input
                    id="girl-dob"
                    type="date"
                    value={girlData.dob}
                    onChange={(e) => setGirlData({ ...girlData, dob: e.target.value })}
                    className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="girl-tob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                    Time of Birth
                  </label>
                  <input
                    id="girl-tob"
                    type="time"
                    value={girlData.tob}
                    onChange={(e) => setGirlData({ ...girlData, tob: e.target.value })}
                    className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="girl-pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                  Place of Birth
                </label>
                <PlaceAutoComplete
                  id="girl-pob"
                  onSelect={(place) => setGirlLocation({ lat: place.latitude, lon: place.longitude, timezone: place.timezone })}
                  className="w-full bg-[#0D0B1A] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] placeholder-[#E8E4F0]/55 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#C9A84C] text-[#0D0B1A] px-12 py-4 rounded-full font-sans font-bold text-lg hover:bg-[#d9b85c] transition-colors shadow-lg shadow-[#C9A84C]/20 w-full sm:w-auto min-w-[300px] disabled:opacity-70 flex justify-center items-center mx-auto cursor-pointer"
          >
            {isLoading ? "Calculating 36-Guna Ashtakoot & Manglik Charts..." : "Check Ashtakoot Compatibility"}
          </button>
        </div>
      </form>

      {result && (
        <div className="bg-[#1A1628] border border-[#C9A84C]/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#C9A84C]/20 pb-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-serif font-bold text-[#C9A84C]">
                Ashtakoot Guna Milan Report
              </h2>
              <p className="text-sm text-[#E8E4F0]/75">
                {result.boySummary.name} ({result.boySummary.moonSign}) &amp; {result.girlSummary.name} ({result.girlSummary.moonSign})
              </p>
            </div>
            <div className="flex items-center gap-3">
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
                    {st}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/30 text-xs font-semibold text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block px-8 py-5 bg-[#0D0B1A] border-2 border-[#C9A84C]/50 rounded-full mb-4 shadow-lg">
              <span className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C]">{result.score}</span>
              <span className="text-xl text-[#E8E4F0]/70"> / {result.maxScore} Gunas</span>
            </div>
            <p className={`text-xl font-bold ${result.score >= 18 ? "text-emerald-400" : "text-amber-400"}`}>
              {result.status}
            </p>
            <p className="mt-3 text-[#E8E4F0]/85 max-w-2xl mx-auto leading-relaxed">
              {result.recommendation}
            </p>
          </div>

          {/* Side-by-Side Groom & Bride SVG Birth Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VedicChartSVG
              styleType={chartStyle}
              ascendantRashiIndex={result.boyChartData.ascendantRashiIndex}
              planets={result.boyChartData.planets}
              title={`Groom: ${result.boySummary.name}`}
              subtitle={`Lagna: ${result.boySummary.ascendant} • ${result.boySummary.nakshatra} • ${result.boySummary.manglik}`}
            />
            <VedicChartSVG
              styleType={chartStyle}
              ascendantRashiIndex={result.girlChartData.ascendantRashiIndex}
              planets={result.girlChartData.planets}
              title={`Bride: ${result.girlSummary.name}`}
              subtitle={`Lagna: ${result.girlSummary.ascendant} • ${result.girlSummary.nakshatra} • ${result.girlSummary.manglik}`}
            />
          </div>

          {/* 8-Koot Breakdown Grid */}
          <div>
            <h3 className="text-xl font-serif font-bold text-[#C9A84C] mb-4">
              8-Koota Ashtakoot Compatibility Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.breakdown.map((koot, i) => (
                <div
                  key={i}
                  className="bg-[#0D0B1A] p-4 rounded-xl border border-[#C9A84C]/20 flex justify-between items-center"
                >
                  <div>
                    <div className="font-bold text-[#E8E4F0]">{koot.name} Koota</div>
                    <div className="text-xs text-[#E8E4F0]/70">{koot.description}</div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-lg font-bold text-[#C9A84C]">{koot.score}</span>
                    <span className="text-[#E8E4F0]/65 text-sm"> / {koot.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#0D0B1A] border border-[#C9A84C]/35 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold">
                Personal Marriage Matching Review
              </div>
              <div className="text-lg font-serif font-bold text-[#E8E4F0]">
                Consult Acharya Shri Ravindra Shukla Shatri
              </div>
              <p className="text-xs text-[#E8E4F0]/75">
                Verify Navamsha (D-9), Manglik cancellation, and auspicious marriage Muhurat on WhatsApp (+91 80091 24454).
              </p>
            </div>
            <a
              href={`https://wa.me/918009124454?text=${encodeURIComponent(
                `Namaste Acharya Shri Ravindra Shukla Shatri Ji, we checked Kundali Matching (${boyData.name} & ${girlData.name}, Score: ${result.score}/36) on JyotishGuru and would like a personal consultation.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C9A84C] text-[#0D0B1A] font-bold rounded-full text-sm shrink-0 hover:bg-[#d9b85c] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +91 80091 24454</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
