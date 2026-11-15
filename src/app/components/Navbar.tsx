"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Languages } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./ServiceWorkerRegister";

const navLinks = [
  { en: "Home", hi: "मुख्य पृष्ठ", href: "/" },
  { en: "Daily Horoscope", hi: "दैनिक राशिफल", href: "/horoscope" },
  { en: "Free Kundali", hi: "निःशुल्क कुंडली", href: "/kundali" },
  { en: "Kundali Matching", hi: "कुंडली मिलान", href: "/kundali-matching" },
  { en: "About", hi: "आचार्य परिचय", href: "/about" },
  { en: "Services", hi: "सेवाएं", href: "/services" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-[#0D0B1A]/85 backdrop-blur-lg border-b border-[#C9A84C]/20 shadow-lg py-2" : "bg-transparent border-b border-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group relative z-50" onClick={() => setIsOpen(false)}>
              <Sparkles className="text-[#C9A84C] h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="font-serif font-bold text-2xl text-[#E8E4F0] tracking-wide">
                {lang === "hi" ? "ज्योतिष गुरु" : "JyotishGuru"}
              </span>
            </Link>

            <nav className="hidden lg:flex space-x-1 items-center bg-[#1A1628]/40 backdrop-blur-md border border-[#C9A84C]/10 rounded-full px-2 py-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className="relative px-3.5 py-2 rounded-full font-sans text-sm transition-colors duration-200">
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={clsx("relative z-10", isActive ? "text-[#C9A84C] font-semibold" : "text-[#E8E4F0] hover:text-[#C9A84C]")}>
                      {lang === "hi" ? link.hi : link.en}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <div className="inline-flex items-center bg-[#1A1628] border border-[#C9A84C]/35 rounded-full p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={clsx("px-2.5 py-1 rounded-full transition-colors cursor-pointer", lang === "en" ? "bg-[#C9A84C] text-[#0D0B1A]" : "text-[#E8E4F0]/75 hover:text-[#C9A84C]")}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang("hi")}
                  className={clsx("px-2.5 py-1 rounded-full transition-colors cursor-pointer", lang === "hi" ? "bg-[#C9A84C] text-[#0D0B1A]" : "text-[#E8E4F0]/75 hover:text-[#C9A84C]")}
                >
                  हिन्दी
                </button>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-5 py-2 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-sans text-sm font-semibold hover:bg-[#d9b85c] transition-colors"
              >
                {lang === "hi" ? "परामर्श बुक करें" : "Book Consult"}
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-2 relative z-50">
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1A1628]/80 border border-[#C9A84C]/35 text-xs font-bold text-[#C9A84C] cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{lang === "hi" ? "EN" : "हिन्दी"}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#E8E4F0] hover:text-[#C9A84C] p-2 rounded-full bg-[#1A1628]/50 border border-[#C9A84C]/20 cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0D0B1A]/95 backdrop-blur-xl lg:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center space-y-5 w-full px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "block w-full text-center py-3 text-2xl font-serif border-b border-[#C9A84C]/10",
                    pathname === link.href ? "text-[#C9A84C] font-bold" : "text-[#E8E4F0]"
                  )}
                >
                  {lang === "hi" ? link.hi : link.en}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-full font-bold text-lg mt-4"
              >
                {lang === "hi" ? "परामर्श बुक करें" : "Book Consultation"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
