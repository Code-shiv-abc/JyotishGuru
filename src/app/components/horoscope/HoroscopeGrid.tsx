"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface RashiForecast {
  rashi: string;
  rashiIndex: number;
  dateStr: string;
  moonNakshatra: string;
  transits: {
    moonHouse: number;
    sunHouse: number;
    jupiterHouse: number;
    saturnHouse: number;
  };
  forecast: string;
  luckyColor: string;
  luckyNumber: number;
  upaya: string;
}

interface HoroscopeGridProps {
  forecasts: RashiForecast[];
}

const RASHI_SYMBOLS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

export default function HoroscopeGrid({ forecasts }: HoroscopeGridProps) {
  const [selectedRashi, setSelectedRashi] = useState<RashiForecast | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {forecasts.map((data, idx) => (
          <motion.div
            key={data.rashi}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedRashi(data)}
            className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-xl p-6 text-center hover:border-[#C9A84C]/50 transition-colors cursor-pointer group flex flex-col"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-[#0D0B1A] rounded-full flex items-center justify-center border border-[#C9A84C]/20 group-hover:bg-[#C9A84C]/10 transition-colors">
              <span className="text-[#C9A84C] text-2xl font-serif">
                {RASHI_SYMBOLS[idx]}
              </span>
            </div>
            <h2 className="text-xl font-serif font-semibold text-[#E8E4F0] mb-2">
              {data.rashi}
            </h2>
            <p className="text-sm text-[#E8E4F0]/70 line-clamp-3 mb-4 flex-grow">
              {data.forecast}
            </p>
            <div className="text-xs text-[#C9A84C] font-semibold tracking-wider">
              READ FULL TRANSIT ➔
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedRashi && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRashi(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 md:inset-x-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl w-full bg-[#1A1628] border-t md:border border-[#C9A84C]/30 md:rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-[#C9A84C] flex items-center gap-3">
                    <span className="text-4xl bg-[#0D0B1A] p-2 rounded-full border border-[#C9A84C]/20">
                      {RASHI_SYMBOLS[selectedRashi.rashiIndex]}
                    </span>
                    {selectedRashi.rashi}
                  </h3>
                  <p className="text-[#E8E4F0]/60 text-sm mt-1">
                    Daily Gochara (Transit) for {selectedRashi.dateStr}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRashi(null)}
                  className="text-[#E8E4F0]/50 hover:text-[#C9A84C] transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-[#0D0B1A] p-4 rounded-lg border border-[#C9A84C]/10 text-[#E8E4F0]/90 leading-relaxed text-lg">
                  {selectedRashi.forecast}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0D0B1A] p-4 rounded-lg border border-[#C9A84C]/10 text-center">
                    <div className="text-xs text-[#E8E4F0]/50 uppercase tracking-wider mb-1">Lucky Color</div>
                    <div className="text-lg font-semibold text-[#C9A84C]">{selectedRashi.luckyColor}</div>
                  </div>
                  <div className="bg-[#0D0B1A] p-4 rounded-lg border border-[#C9A84C]/10 text-center">
                    <div className="text-xs text-[#E8E4F0]/50 uppercase tracking-wider mb-1">Lucky Number</div>
                    <div className="text-lg font-semibold text-[#C9A84C]">{selectedRashi.luckyNumber}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-serif text-[#C9A84C] mb-2 border-b border-[#C9A84C]/20 pb-2">Astrological Alignments</h4>
                  <ul className="text-[#E8E4F0]/80 space-y-2 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li><strong className="text-[#C9A84C]/80">Moon Nakshatra:</strong> {selectedRashi.moonNakshatra}</li>
                    <li><strong className="text-[#C9A84C]/80">Moon Transit:</strong> House {selectedRashi.transits.moonHouse}</li>
                    <li><strong className="text-[#C9A84C]/80">Sun Transit:</strong> House {selectedRashi.transits.sunHouse}</li>
                    <li><strong className="text-[#C9A84C]/80">Jupiter Transit:</strong> House {selectedRashi.transits.jupiterHouse}</li>
                    <li><strong className="text-[#C9A84C]/80">Saturn Transit:</strong> House {selectedRashi.transits.saturnHouse}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-serif text-[#C9A84C] mb-2 border-b border-[#C9A84C]/20 pb-2">Daily Remedy (Upaya)</h4>
                  <p className="text-[#E8E4F0]/80 text-sm">{selectedRashi.upaya}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#C9A84C]/20 flex justify-center">
                <Link
                  href={`/book?service=horoscope&rashi=${encodeURIComponent(selectedRashi.rashi)}`}
                  className="bg-[#C9A84C] text-[#0D0B1A] py-3 px-8 rounded-lg font-sans font-bold text-lg hover:bg-[#b09141] transition-colors shadow-lg shadow-[#C9A84C]/20 w-full text-center"
                  onClick={() => setSelectedRashi(null)}
                >
                  Book Detailed Reading
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
