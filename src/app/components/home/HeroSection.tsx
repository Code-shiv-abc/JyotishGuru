"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "../ServiceWorkerRegister";

export default function HeroSection() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen-dynamic flex flex-col items-center justify-center overflow-hidden bg-[#0D0B1A] -mt-20 pt-20">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: yBg }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1628] via-[#0D0B1A] to-[#0D0B1A] opacity-80" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen animate-[pulse_4s_ease-in-out_infinite]"
          style={{ backgroundImage: "radial-gradient(#C9A84C 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </motion.div>

      <motion.div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full" style={{ y: yContent, opacity: opacityContent }}>
        <div className="inline-flex items-center gap-2 bg-[#1A1628]/80 backdrop-blur-md border border-[#C9A84C]/30 px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="text-[#C9A84C] text-xs font-sans tracking-widest uppercase font-semibold">
            {isHi ? "अपने भाग्य को जागृत करें" : "Awaken Your Destiny"}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6.2rem] font-serif font-bold text-[#E8E4F0] mb-6 leading-[1.12] tracking-tight">
          <span className="block">{isHi ? "अपना दिव्य" : "Discover Your"}</span>
          <span className="text-gold-gradient inline-block">
            {isHi ? "ब्रह्मांडीय मार्ग जानें" : "Cosmic Path"}
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-[#E8E4F0]/75 mb-10 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          {isHi
            ? "पावन नगरी अयोध्या धाम से आचार्य श्री रविन्द्र शुक्ल शास्त्री द्वारा सटीक पाराशरी जन्म कुंडली विश्लेषण, अष्टकूट गुण मिलान एवं प्रामाणिक वैदिक उपाय प्राप्त करें।"
            : "Consult Acharya Shri Ravindra Shukla Shatri from the sacred land of Ayodhya Dham for precision Parashari Kundali analysis, Ashtakoot matching, and Vedic remedies."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4 sm:px-0">
          <Link
            href="/kundali"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C9A84C] to-[#D4A017] text-[#0D0B1A] rounded-full font-sans font-bold text-lg shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:brightness-110 transition-all"
          >
            {isHi ? "निःशुल्क जन्म कुंडली बनाएं" : "Get Free Kundali"}
          </Link>
          <Link
            href="/book"
            className="w-full sm:w-auto px-8 py-4 bg-[#1A1628]/50 backdrop-blur-sm border border-[#C9A84C]/50 text-[#E8E4F0] rounded-full font-sans font-bold text-lg hover:bg-[#C9A84C]/10 transition-all"
          >
            {isHi ? "परामर्श बुक करें" : "Book Consultation"}
          </Link>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ opacity: opacityContent }}>
        <ArrowDown className="text-[#C9A84C] w-5 h-5 opacity-70 animate-bounce" />
      </motion.div>
    </section>
  );
}
