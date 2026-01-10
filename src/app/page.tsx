"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { KundaliForm } from "@/components/astrology/KundaliForm";

interface StarProps {
  id: number;
  style: {
    width: string;
    height: string;
    top: string;
    left: string;
  };
  animation: {
    duration: number;
  };
}

export default function LandingPage() {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    // Generate stars only on client to avoid hydration mismatch
    const newStars = [...Array(20)].map((_, i) => ({
      id: i,
      style: {
        width: Math.random() * 2 + 1 + "px",
        height: Math.random() * 2 + 1 + "px",
        top: Math.random() * 100 + "vh",
        left: Math.random() * 100 + "vw",
      },
      animation: {
        duration: Math.random() * 3 + 2,
      },
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-screen bg-mystical-bg text-mystical-text font-sans overflow-x-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-mystical-bg to-mystical-black opacity-80" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-mystical-purple/20 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-mystical-gold/10 blur-[120px]" />

        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            initial={{
              opacity: 0,
              scale: 0.5,
              x: star.style.left,
              y: star.style.top,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: star.animation.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: star.style.width,
              height: star.style.height,
            }}
          />
        ))}
      </div>

      <Header />

      <main className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-24 md:pb-32 flex flex-col md:flex-row items-center gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mystical-gold/10 border border-mystical-gold/20 text-mystical-gold text-xs font-semibold tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              100% VEDIC ACCURACY
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Discover Your <br />
              <span className="text-mystical-gold">Cosmic Destiny</span>
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Unlock the secrets of the stars with our professional-grade astrology platform.
              Ancient wisdom meets modern technology to guide your path.
            </p>
          </motion.div>
        </div>

        {/* Form Card */}
        <KundaliForm />
      </main>

      {/* Decorative Footer Element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50" />
    </div>
  );
}
