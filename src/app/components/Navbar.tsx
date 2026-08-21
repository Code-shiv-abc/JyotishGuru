"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Daily Horoscope", href: "/horoscope" },
  { name: "Free Kundali", href: "/kundali" },
  { name: "Kundali Matching", href: "/kundali-matching" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0D0B1A]/80 backdrop-blur-lg border-b border-[#C9A84C]/20 shadow-lg py-2"
            : "bg-transparent border-b border-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group relative z-50"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                animate={{ rotate: scrolled ? 360 : 0 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatType: "loop" }}
              >
                <Sparkles className="text-[#C9A84C] h-6 w-6 group-hover:scale-110 transition-transform" />
              </motion.div>
              <span className="font-serif font-bold text-2xl text-[#E8E4F0] tracking-wide">
                JyotishGuru
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 items-center bg-[#1A1628]/40 backdrop-blur-md border border-[#C9A84C]/10 rounded-full px-2 py-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative px-4 py-2 rounded-full font-sans text-sm transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={clsx(
                      "relative z-10",
                      isActive ? "text-[#C9A84C] font-semibold" : "text-[#E8E4F0] hover:text-[#C9A84C]"
                    )}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />

              {/* Desktop CTA */}
              <Link
                href="/book"
                className="group relative inline-flex items-center justify-center px-6 py-2 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-sans font-semibold overflow-hidden transition-transform active:scale-95"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative">Book Consult</span>
              </Link>
            </div>

            {/* Mobile Menu Button & Language Switcher */}
            <div className="md:hidden flex items-center gap-3 relative z-50">
              <LanguageSwitcher />
              <button
                onClick={toggleMenu}
                className="text-[#E8E4F0] hover:text-[#C9A84C] focus:outline-none p-2 rounded-full bg-[#1A1628]/50 backdrop-blur-sm border border-[#C9A84C]/20"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0D0B1A]/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center space-y-6 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "block w-full text-center py-4 text-2xl font-serif tracking-wider border-b border-[#C9A84C]/10",
                      pathname === link.href
                        ? "text-[#C9A84C] font-bold"
                        : "text-[#E8E4F0] hover:text-[#C9A84C]"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.2 }}
                className="w-full pt-8"
              >
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-[#C9A84C] to-[#D4A017] text-[#0D0B1A] py-4 rounded-full font-sans font-bold text-lg shadow-[0_0_20px_rgba(201,168,76,0.3)] active:scale-95 transition-transform"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
