import { Star } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Star className="text-mystical-gold w-6 h-6" />
        <span className="font-serif text-2xl font-bold tracking-wide">JyotishGuru</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
        <Link href="#" className="hover:text-mystical-gold transition-colors" title="Daily Horoscope Predictions">Daily Horoscope</Link>
        <Link href="#" className="hover:text-mystical-gold transition-colors" title="Free Janam Kundali Generation">Free Kundali</Link>
        <Link href="#" className="hover:text-mystical-gold transition-colors" title="Vedic Kundali Matching">Kundali Matching</Link>
        <Link href="#" className="hover:text-mystical-gold transition-colors" title="About Acharya Shri Ravindra Shukla Shastri">About Acharya</Link>
      </nav>
      <button className="bg-mystical-purple/20 border border-mystical-purple/50 text-mystical-purple hover:bg-mystical-purple hover:text-white px-5 py-2 rounded-full transition-all text-sm font-medium">
        Sign In
      </button>
    </header>
  );
}
