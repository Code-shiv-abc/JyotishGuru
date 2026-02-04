"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { calculateKundali, KundaliResult } from "@/lib/astrology";
import { ChartVisualizer } from "@/components/astrology/ChartVisualizer";
import { PlanetaryTable } from "@/components/astrology/PlanetaryTable";
import { Sparkles } from "lucide-react";

function ReportContent() {
  const params = useSearchParams();
  const [result, setResult] = useState<KundaliResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      const date = params.get("date");
      const time = params.get("time");
      const lat = parseFloat(params.get("lat") || "0");
      const lon = parseFloat(params.get("lon") || "0");

      if (!date || !time) {
        setLoading(false);
        return;
      }

      const [year, month, day] = date.split("-").map(Number);
      const [hour, minute] = time.split(":").map(Number);

      // Simulate a bit more calculation time for effect
      await new Promise(r => setTimeout(r, 1500));

      const data = await calculateKundali({
        year,
        month,
        day,
        hour,
        minute,
        latitude: lat,
        longitude: lon,
        timezone: 5.5, // Default to IST
      });

      setResult(data);
      setLoading(false);
    };

    generate();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
            <div className="absolute inset-0 border-4 border-mystical-gold border-t-transparent rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto text-mystical-gold w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-2xl font-serif text-white animate-pulse">Aligning Celestial Bodies...</h2>
        <p className="text-slate-400 mt-2">Calculating positions for {params.get("name")}</p>
      </div>
    );
  }

  if (!result) {
      return (
          <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
              Please provide valid birth details to generate a chart.
          </div>
      )
  }

  return (
    <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-mystical-gold/10 text-mystical-gold mb-4 border border-mystical-gold/20">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-xs font-bold tracking-widest uppercase">Vedic Calculation Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
                Janma Kundali
            </h1>
            <p className="text-slate-400 text-lg">
                Birth Chart for <span className="text-mystical-gold font-semibold">{params.get("name")}</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm text-slate-500 font-mono">
                <span>{params.get("date")}</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span>{params.get("time")}</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span>{params.get("place")}</span>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Chart */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-mystical-gold font-serif text-xl">
                        <Sparkles className="w-5 h-5" />
                        <h3>Lagna Chart</h3>
                    </div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">South Indian Style</span>
                </div>
                <ChartVisualizer planets={result.planets} ascendant={result.ascendant} />
            </div>

            {/* Table */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-mystical-gold font-serif text-xl">
                        <Sparkles className="w-5 h-5" />
                        <h3>Planetary Positions</h3>
                    </div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">D1 Chart</span>
                </div>
                <div className="bg-mystical-black/40 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
                    <PlanetaryTable planets={result.planets} ascendant={result.ascendant} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-mystical-bg text-mystical-text font-sans">
      <Header />
      <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading...</div>}>
        <ReportContent />
      </Suspense>
    </div>
  );
}
