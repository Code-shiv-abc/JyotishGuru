"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PlaceAutoComplete from "@/app/components/PlaceAutoComplete";

export default function KundaliCTAForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState<{
    name: string;
    lat: number;
    lon: number;
    timezone: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      name,
      dob,
      tob,
      ...(place
        ? {
            pob: place.name,
            lat: String(place.lat),
            lon: String(place.lon),
            tz: place.timezone,
          }
        : {}),
    });
    router.push(`/kundali?${params.toString()}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="bg-[#0D0B1A] border border-[#C9A84C]/30 p-6 md:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto text-left"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="cta-name" className="block text-xs font-semibold text-[#E8E4F0]/80 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            id="cta-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] placeholder-[#E8E4F0]/55 focus:outline-none focus:border-[#C9A84C] transition-colors"
            placeholder="Aarav Sharma"
            required
          />
        </div>
        <div>
          <label htmlFor="cta-dob" className="block text-xs font-semibold text-[#E8E4F0]/80 uppercase tracking-wider mb-2">
            Date of Birth
          </label>
          <input
            id="cta-dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
            required
          />
        </div>
        <div>
          <label htmlFor="cta-tob" className="block text-xs font-semibold text-[#E8E4F0]/80 uppercase tracking-wider mb-2">
            Time of Birth
          </label>
          <input
            id="cta-tob"
            type="time"
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
            required
          />
        </div>
        <div>
          <label htmlFor="cta-pob" className="block text-xs font-semibold text-[#E8E4F0]/80 uppercase tracking-wider mb-2">
            Place of Birth
          </label>
          <PlaceAutoComplete
            id="cta-pob"
            onSelect={(p) =>
              setPlace({
                name: `${p.name}${p.admin1 ? `, ${p.admin1}` : ""}`,
                lat: p.latitude,
                lon: p.longitude,
                timezone: p.timezone,
              })
            }
            className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-4 py-3 text-[#E8E4F0] placeholder-[#E8E4F0]/55 focus:outline-none focus:border-[#C9A84C] transition-colors"
            placeholder="City, State"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#C9A84C] to-[#D4A017] hover:brightness-110 text-[#0D0B1A] py-4 rounded-xl font-sans font-bold text-lg transition-all shadow-lg shadow-[#C9A84C]/20 cursor-pointer"
      >
        Generate My Free Janam Kundali →
      </button>
    </motion.form>
  );
}