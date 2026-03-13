"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function KundaliCTAForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/kundali");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="bg-[#0D0B1A] border-2 border-[#C9A84C]/30 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto backdrop-blur-sm bg-opacity-90"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[#E8E4F0]/70 uppercase tracking-wider mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full bg-[#1A1628] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#E8E4F0]/70 uppercase tracking-wider mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full bg-[#1A1628] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#E8E4F0]/70 uppercase tracking-wider mb-2">
            Time of Birth
          </label>
          <input
            type="time"
            className="w-full bg-[#1A1628] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#E8E4F0]/70 uppercase tracking-wider mb-2">
            Place of Birth
          </label>
          <input
            type="text"
            className="w-full bg-[#1A1628] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] transition-colors"
            placeholder="City, State"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#0D0B1A] border-2 border-[#0D0B1A] hover:bg-[#1A1628] hover:border-[#C9A84C] text-[#C9A84C] py-4 rounded-xl font-sans font-bold text-lg transition-all shadow-lg"
      >
        Calculate Now
      </button>
    </motion.form>
  );
}