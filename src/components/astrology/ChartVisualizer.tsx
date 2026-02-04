"use client";

import { PlanetaryPosition } from "@/lib/astrology";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface ChartVisualizerProps {
  planets: PlanetaryPosition[];
  ascendant: PlanetaryPosition;
}

const SIGNS_LAYOUT = [
  { id: 12, name: "Pisces", row: 0, col: 0 },
  { id: 1, name: "Aries", row: 0, col: 1 },
  { id: 2, name: "Taurus", row: 0, col: 2 },
  { id: 3, name: "Gemini", row: 0, col: 3 },
  { id: 4, name: "Cancer", row: 1, col: 3 },
  { id: 5, name: "Leo", row: 2, col: 3 },
  { id: 6, name: "Virgo", row: 3, col: 3 },
  { id: 7, name: "Libra", row: 3, col: 2 },
  { id: 8, name: "Scorpio", row: 3, col: 1 },
  { id: 9, name: "Sagittarius", row: 3, col: 0 },
  { id: 10, name: "Capricorn", row: 2, col: 0 },
  { id: 11, name: "Aquarius", row: 1, col: 0 },
];

export function ChartVisualizer({ planets, ascendant }: ChartVisualizerProps) {
  // Helper to find planets in a specific sign (rashiId)
  const getItemsInSign = (rashiId: number) => {
    const items = [];
    if (ascendant.rashiId === rashiId) items.push({ ...ascendant, label: "ASC" });
    planets.forEach((p) => {
      if (p.rashiId === rashiId) items.push({ ...p, label: p.planet.substring(0, 2) });
    });
    return items;
  };

  return (
    <div className="w-full max-w-lg mx-auto aspect-square bg-mystical-black border-4 border-mystical-gold/30 rounded-lg shadow-2xl relative p-1">
      {/* Central Area - Info or Empty */}
      <div className="absolute inset-[25%] flex items-center justify-center bg-slate-900/50 rounded border border-mystical-gold/10">
        <div className="text-center">
          <h4 className="text-mystical-gold font-serif text-xl opacity-20">SOUTH INDIAN</h4>
          <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Vedic Chart</p>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-4 w-full h-full gap-0.5 bg-mystical-gold/20">
        {Array.from({ length: 16 }).map((_, idx) => {
          const row = Math.floor(idx / 4);
          const col = idx % 4;

          // Check if this cell corresponds to a sign
          const sign = SIGNS_LAYOUT.find((s) => s.row === row && s.col === col);

          // Center cells are empty/merged visually (handled by absolute center div above, but we need to render empty cells here to keep grid structure)
          if (!sign) return <div key={idx} className="bg-slate-950/80" />;

          const items = getItemsInSign(sign.id);

          return (
            <div
              key={idx}
              className={clsx(
                "bg-slate-900 hover:bg-slate-800 transition-colors relative p-1 flex flex-col items-center justify-start overflow-hidden",
                items.some(i => i.label === "ASC") && "bg-mystical-purple/10 ring-1 ring-inset ring-mystical-purple/50"
              )}
            >
              <span className="absolute bottom-0.5 right-1 text-[10px] text-slate-600 font-bold uppercase tracking-tighter opacity-50">
                {sign.name}
              </span>

              <div className="flex flex-wrap gap-1 content-start justify-center w-full h-full pt-1">
                {items.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={clsx(
                      "text-[10px] font-bold px-1 rounded shadow-sm cursor-help",
                      item.label === "ASC"
                        ? "bg-mystical-purple text-white"
                        : "bg-mystical-gold text-slate-900"
                    )}
                    title={`${item.planet}: ${item.degree}°`}
                  >
                    {item.label}
                  </motion.span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
