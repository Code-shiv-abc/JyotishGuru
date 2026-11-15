"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "hi";

export const RASHI_HI = [
  "मेष (Aries)", "वृषभ (Taurus)", "मिथुन (Gemini)", "कर्क (Cancer)",
  "सिंह (Leo)", "कन्या (Virgo)", "तुला (Libra)", "वृश्चिक (Scorpio)",
  "धनु (Sagittarius)", "मकर (Capricorn)", "कुंभ (Aquarius)", "मीन (Pisces)",
];

export const PLANET_HI: Record<string, string> = {
  Sun: "सूर्य (Surya)",
  Moon: "चन्द्र (Chandra)",
  Mars: "मंगल (Mangal)",
  Mercury: "बुध (Budha)",
  Jupiter: "बृहस्पति / गुरु (Guru)",
  Venus: "शुक्र (Shukra)",
  Saturn: "शनि (Shani)",
  Rahu: "राहु (Rahu)",
  Ketu: "केतु (Ketu)",
};

export const DIGNITY_HI: Record<string, string> = {
  "Exalted (Uchcha)": "उच्च (Exalted)",
  "Debilitated (Neecha)": "नीच (Debilitated)",
  "Moolatrikona": "मूलत्रिकोण (Moolatrikona)",
  "Own Sign (Swakshetra)": "स्वराशि (Own Sign)",
  "Normal (Sama/Mitra)": "सम / मित्र (Normal)",
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("jyotishguru_lang") === "hi" ? "hi" : "en";
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("jyotishguru_lang", next);
      document.documentElement.lang = next;
    }
  };

  const toggleLang = () => setLang(lang === "en" ? "hi" : "en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
