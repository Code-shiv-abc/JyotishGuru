"use client";

import React, { useState } from "react";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";
import { generateKundali } from "@/app/actions/kundali";

export default function KundaliForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    tob: "",
  });
  const [location, setLocation] = useState<{ lat: number; lon: number; timezone: string } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, unknown> | null>(null); // Ideally type this based on Worker response

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.tob || !location) {
      setError("Please fill in all fields and select a valid location.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      // Mock worker endpoint local test block (optional override)
      if (process.env.NODE_ENV === "development" && !process.env.KUNDALI_WORKER_URL) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          setResult({
              ascendant: "Aries",
              planets: [
                  { name: "Sun", rasi: "Leo", house: 5 },
                  { name: "Moon", rasi: "Cancer", house: 4 },
                  { name: "Mars", rasi: "Aries", house: 1 },
                  // ... more planets
              ],
              houses: [
                 { house: 1, sign: "Aries" },
                 { house: 2, sign: "Taurus" },
              ]
          });
      } else {
        const response = await generateKundali({
            name: formData.name,
            gender: formData.gender,
            dob: formData.dob,
            tob: formData.tob,
            lat: location.lat,
            lon: location.lon,
            timezone: location.timezone,
        });
        setResult(response);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 shadow-2xl relative">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                placeholder="Enter your name"
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
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors appearance-none"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]"
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
                onChange={e => setFormData({ ...formData, tob: e.target.value })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]"
                required
              />
            </div>
            <div>
              <label htmlFor="pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Place of Birth
              </label>
              <PlaceAutoComplete
                onSelect={(place) => setLocation({ lat: place.latitude, lon: place.longitude, timezone: place.timezone })}
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-lg font-sans font-bold text-lg hover:bg-[#b09141] transition-colors shadow-lg shadow-[#C9A84C]/20 disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0D0B1A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating Cosmic Alignments...
                </>
              ) : (
                "Generate Kundali"
              )}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-serif font-bold text-[#C9A84C] mb-6 text-center">Your Cosmic Blueprint</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-serif text-[#E8E4F0] mb-4 border-b border-[#C9A84C]/20 pb-2">Basic Details</h3>
                <ul className="space-y-2 text-[#E8E4F0]/80">
                    <li><strong className="text-[#C9A84C]">Ascendant (Lagna):</strong> {result.ascendant as string}</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-serif text-[#E8E4F0] mb-4 border-b border-[#C9A84C]/20 pb-2">Planetary Positions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#E8E4F0]">
                        <thead className="bg-[#0D0B1A] text-[#C9A84C]">
                            <tr>
                                <th className="px-4 py-2 rounded-tl-lg">Planet</th>
                                <th className="px-4 py-2">Sign</th>
                                <th className="px-4 py-2 rounded-tr-lg">House</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(result.planets as Record<string, string | number>[])?.map((p: Record<string, string | number>, i: number) => (
                                <tr key={i} className="border-b border-[#C9A84C]/10 last:border-0 hover:bg-[#0D0B1A]/50">
                                    <td className="px-4 py-2 font-medium">{p.name}</td>
                                    <td className="px-4 py-2">{p.rasi}</td>
                                    <td className="px-4 py-2">{p.house}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
