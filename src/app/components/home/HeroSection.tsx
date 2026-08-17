"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects for background and content
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen-dynamic flex flex-col items-center justify-center overflow-hidden bg-[#0D0B1A] -mt-20 pt-20"
    >
      {/* Dynamic Background with Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yBg }}
      >
        {/* Subtle Radial Gradient to mimic deep space */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1628] via-[#0D0B1A] to-[#0D0B1A] opacity-80" />

        {/* Animated Particles/Stars (Performance optimized: using fewer CSS animated stars, and more static texture) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen animate-[pulse_4s_ease-in-out_infinite]" />

        {/* Rotating Mandala SVG Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] text-[#C9A84C] animate-[spin_120s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] max-w-none">
            <path fill="currentColor" d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45Z" />
            <path fill="currentColor" d="M15 15L45 45L85 15L55 45Z" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full"
        style={{ y: yContent, opacity: opacityContent }}
      >
        {/* Staggered text reveal */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="inline-flex items-center gap-2 bg-[#1A1628]/80 backdrop-blur-md border border-[#C9A84C]/30 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-[#C9A84C] text-xs font-sans tracking-widest uppercase font-semibold">Awaken Your Destiny</span>
          </motion.div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif font-bold text-[#E8E4F0] mb-6 leading-[1.1] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block"
          >
            Discover Your
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gold-gradient inline-block"
          >
            Cosmic Path
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-2xl text-[#E8E4F0]/70 mb-10 font-sans max-w-2xl mx-auto leading-relaxed font-light"
        >
          Authentic Vedic astrology consultation from the sacred land of Ayodhya Dham. Align with the stars.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4 sm:px-0"
        >
          <Link
            href="/kundali"
            className="w-full sm:w-auto relative group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#C9A84C] to-[#D4A017] text-[#0D0B1A] rounded-full font-sans font-bold text-lg overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] transition-all active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative">Get Free Kundali</span>
          </Link>
          <Link
            href="/book"
            className="w-full sm:w-auto relative group inline-flex items-center justify-center px-8 py-4 bg-[#1A1628]/50 backdrop-blur-sm border border-[#C9A84C]/50 text-[#E8E4F0] rounded-full font-sans font-bold text-lg overflow-hidden hover:bg-[#C9A84C]/10 transition-all active:scale-95"
          >
            <span className="relative">Book Consultation</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        style={{ opacity: opacityContent }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C]/60 font-sans">Scroll</span>
          <ArrowDown className="text-[#C9A84C] w-5 h-5 opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
