"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Daily Horoscope", href: "/horoscope" },
  { name: "Free Kundali", href: "/kundali" },
  { name: "Kundali Matching", href: "/kundali-matching" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0B1A] border-b border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Sparkles className="text-[#C9A84C] h-6 w-6" />
            <span className="font-serif font-bold text-2xl text-[#E8E4F0]">
              JyotishGuru
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "font-sans text-sm transition-colors duration-200",
                  pathname === link.href
                    ? "text-[#C9A84C] font-semibold"
                    : "text-[#E8E4F0] hover:text-[#C9A84C]"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-[#C9A84C] text-[#0D0B1A] px-6 py-2 rounded-full font-sans font-semibold hover:bg-[#b09141] transition-colors"
            >
              Book
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-[#E8E4F0] hover:text-[#C9A84C] focus:outline-none p-2"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={clsx(
          "md:hidden absolute w-full bg-[#0D0B1A] border-b border-[#C9A84C]/20 transition-all duration-300 ease-in-out origin-top",
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "block px-3 py-3 rounded-md font-sans text-base font-medium transition-colors",
                pathname === link.href
                  ? "bg-[#1A1628] text-[#C9A84C]"
                  : "text-[#E8E4F0] hover:bg-[#1A1628] hover:text-[#C9A84C]"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-3">
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-[#C9A84C] text-[#0D0B1A] px-6 py-3 rounded-full font-sans font-semibold hover:bg-[#b09141] transition-colors"
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}