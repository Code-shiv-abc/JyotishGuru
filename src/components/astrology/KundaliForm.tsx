"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { searchLocation, LocationResult } from "@/lib/astrology";
import { useRouter } from "next/navigation";

export function KundaliForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    place: "",
  });
  const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);
  const [error, setError] = useState("");

  const handleLocationSearch = async (query: string) => {
    setFormData((prev) => ({ ...prev, place: query }));
    setError(""); // Clear error on typing

    if (query.length > 2) {
      setIsSearching(true);
      const results = await searchLocation(query);
      setLocationResults(results);
      setIsSearching(false);
    } else {
      setLocationResults([]);
    }
  };

  const selectLocation = (loc: LocationResult) => {
    setSelectedLocation(loc);
    setFormData((prev) => ({ ...prev, place: loc.name }));
    setLocationResults([]);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.date || !formData.time || !formData.place) {
      setError("Please fill in all details to proceed.");
      return;
    }

    const params = new URLSearchParams({
      name: formData.name,
      date: formData.date,
      time: formData.time,
      place: formData.place,
      lat: selectedLocation?.lat.toString() || "0",
      lon: selectedLocation?.lon.toString() || "0",
    });

    router.push(`/report?${params.toString()}`);
  };

  return (
    <motion.div
      className="flex-1 w-full max-w-md"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="bg-mystical-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-mystical-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <h3 className="font-serif text-2xl font-semibold mb-6 text-center text-white relative z-10">Get Your Free Kundali</h3>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3 flex items-center gap-2 text-red-200 text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-mystical-gold/50 focus:ring-1 focus:ring-mystical-gold/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-mystical-gold/50 focus:ring-1 focus:ring-mystical-gold/50 transition-all [color-scheme:dark]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" /> Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-mystical-gold/50 focus:ring-1 focus:ring-mystical-gold/50 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Place of Birth
            </label>
            <input
              type="text"
              placeholder="City, Country"
              value={formData.place}
              onChange={(e) => handleLocationSearch(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-mystical-gold/50 focus:ring-1 focus:ring-mystical-gold/50 transition-all"
            />
            {isSearching && (
              <div className="absolute right-3 top-9">
                <div className="w-4 h-4 border-2 border-mystical-gold/30 border-t-mystical-gold rounded-full animate-spin" />
              </div>
            )}

            {locationResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                {locationResults.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectLocation(loc)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-800 text-sm text-slate-300 hover:text-white transition-colors border-b border-slate-800 last:border-0"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-mystical-gold to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-slate-900 font-bold py-3.5 rounded-lg shadow-lg hover:shadow-mystical-gold/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4"
          >
            Calculate Now <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
