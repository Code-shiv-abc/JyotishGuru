"use client";

import React, { useState } from "react";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";
import { checkCompatibility } from "@/app/actions/matching";

export default function KundaliMatchingForm() {
  const [boyData, setBoyData] = useState({ name: "", dob: "", tob: "" });
  const [boyLocation, setBoyLocation] = useState<{ lat: number; lon: number; timezone: string } | null>(null);

  const [girlData, setGirlData] = useState({ name: "", dob: "", tob: "" });
  const [girlLocation, setGirlLocation] = useState<{ lat: number; lon: number; timezone: string } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!boyData.name || !boyData.dob || !boyData.tob || !boyLocation ||
        !girlData.name || !girlData.dob || !girlData.tob || !girlLocation) {
      setError("Please fill in all details for both partners, including a valid place of birth.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const res = await checkCompatibility({
        boy: { ...boyData, ...boyLocation },
        girl: { ...girlData, ...girlLocation }
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
          {/* Decorative Divider for LG screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/20 -translate-x-1/2 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D0B1A] w-12 h-12 rounded-full border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] font-serif text-2xl z-10">
              &
            </div>
          </div>

          {/* Boy's Details */}
          <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 relative z-10">
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-[#C9A84C]/20 pb-4">
              Boy&apos;s Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Name</label>
                <input
                  type="text"
                  value={boyData.name}
                  onChange={e => setBoyData({ ...boyData, name: e.target.value })}
                  className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                  placeholder="Groom&apos;s Name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Date</label>
                  <input
                    type="date"
                    value={boyData.dob}
                    onChange={e => setBoyData({ ...boyData, dob: e.target.value })}
                    className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Time</label>
                  <input
                    type="time"
                    value={boyData.tob}
                    onChange={e => setBoyData({ ...boyData, tob: e.target.value })}
                    className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Place of Birth</label>
                <PlaceAutoComplete
                  onSelect={(place) => setBoyLocation({ lat: place.latitude, lon: place.longitude, timezone: place.timezone })}
                  className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Girl's Details */}
          <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 relative z-10 mt-8 lg:mt-0">
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-[#C9A84C]/20 pb-4">
              Girl&apos;s Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Name</label>
                <input
                  type="text"
                  value={girlData.name}
                  onChange={e => setGirlData({ ...girlData, name: e.target.value })}
                  className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                  placeholder="Bride&apos;s Name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Date</label>
                  <input
                    type="date"
                    value={girlData.dob}
                    onChange={e => setGirlData({ ...girlData, dob: e.target.value })}
                    className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Time</label>
                  <input
                    type="time"
                    value={girlData.tob}
                    onChange={e => setGirlData({ ...girlData, tob: e.target.value })}
                    className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Place of Birth</label>
                <PlaceAutoComplete
                  onSelect={(place) => setGirlLocation({ lat: place.latitude, lon: place.longitude, timezone: place.timezone })}
                  className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
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
            className="bg-[#C9A84C] text-[#0D0B1A] px-12 py-4 rounded-full font-sans font-bold text-lg hover:bg-[#b09141] transition-colors shadow-lg shadow-[#C9A84C]/20 w-full sm:w-auto min-w-[300px] disabled:opacity-70 flex justify-center items-center mx-auto"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0D0B1A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking Stars...
              </>
            ) : (
              "Check Compatibility"
            )}
          </button>
        </div>
      </form>

      {result && (
        <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#C9A84C] mb-2">Ashtakoot Guna Milan Result</h2>
            <div className="inline-block px-6 py-4 bg-[#0D0B1A] border border-[#C9A84C]/50 rounded-full my-4">
              <span className="text-4xl font-bold text-[#E8E4F0]">{result.score as number}</span>
              <span className="text-xl text-[#E8E4F0]/60"> / {result.maxScore as number}</span>
            </div>
            <p className={`text-xl font-medium ${(result.score as number) >= 18 ? 'text-green-400' : 'text-red-400'}`}>
              Status: {result.status as string}
            </p>
            <p className="mt-4 text-[#E8E4F0]/80 italic max-w-2xl mx-auto">&quot;{result.recommendation as string}&quot;</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(result.breakdown as Record<string, string | number>[])?.map((koot: Record<string, string | number>, i: number) => (
              <div key={i} className="bg-[#0D0B1A] p-4 rounded-lg border border-[#C9A84C]/10 flex justify-between items-center">
                <div>
                  <div className="font-medium text-[#E8E4F0]">{koot.name}</div>
                  <div className="text-xs text-[#E8E4F0]/60">{koot.description}</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#C9A84C]">{koot.score}</span>
                  <span className="text-[#E8E4F0]/40 text-sm"> / {koot.max}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
