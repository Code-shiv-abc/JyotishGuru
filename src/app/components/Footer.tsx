import Link from "next/link";
import { Sparkles, Instagram, Youtube, Facebook, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D0B1A] border-t border-[#C9A84C]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="text-[#C9A84C] h-6 w-6" />
              <span className="font-serif font-bold text-2xl text-[#E8E4F0]">
                JyotishGuru
              </span>
            </Link>
            <p className="text-[#E8E4F0]/70 text-sm leading-relaxed max-w-sm">
              Authentic Vedic astrology from the sacred land of Ayodhya Dham. Discover your cosmic destiny with Acharya Shri Ravindra Shukla Shastri.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1628] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors border border-[#C9A84C]/20">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1628] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors border border-[#C9A84C]/20">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1628] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors border border-[#C9A84C]/20">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Blog', 'Book Consultation'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-[#E8E4F0]/70 hover:text-[#C9A84C] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">Services</h3>
            <ul className="space-y-4">
              {['Free Kundali', 'Kundali Matching', 'Daily Horoscope', 'Career & Finance'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Career & Finance' ? '/services' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-[#E8E4F0]/70 hover:text-[#C9A84C] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">Contact</h3>
            <ul className="space-y-6 text-sm text-[#E8E4F0]/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>Ayodhya Dham,<br />Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <span>contact@jyotishguru.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-[#C9A84C]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#E8E4F0]/50 text-sm text-center md:text-left">
            © 2026 JyotishGuru. All rights reserved.
          </p>
          <div className="flex gap-6 text-[#E8E4F0]/50 text-sm">
            <Link href="#" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#C9A84C] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}