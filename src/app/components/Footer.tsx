import Link from "next/link";
import { Sparkles, MapPin, Mail, MessageCircle, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Acharya Ji", href: "/about" },
  { label: "Vedic Blog", href: "/blog" },
  { label: "Book Consultation", href: "/book" },
];

const serviceLinks = [
  { label: "Free Kundali", href: "/kundali" },
  { label: "Kundali Matching", href: "/kundali-matching" },
  { label: "Daily Horoscope", href: "/horoscope" },
  { label: "All Consultation Services", href: "/services" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D0B1A] border-t border-[#C9A84C]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="text-[#C9A84C] h-6 w-6" aria-hidden="true" />
              <span className="font-serif font-bold text-2xl text-[#E8E4F0]">
                JyotishGuru
              </span>
            </Link>
            <p className="text-[#E8E4F0]/75 text-sm leading-relaxed max-w-sm">
              Authentic Vedic astrology from the sacred land of Ayodhya Dham. Discover your cosmic destiny with Acharya Shri Ravindra Shukla Shatri.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/918009124454?text=Namaste%20Acharya%20Shri%20Ravindra%20Shukla%20Shatri%20Ji%2C%20I%20would%20like%20to%20inquire%20about%20a%20Vedic%20astrology%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Acharya Shri Ravindra Shukla Shatri on WhatsApp"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1628] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors border border-[#C9A84C]/30 text-xs font-semibold uppercase tracking-wider"
                title="WhatsApp +91 80091 24454"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Consult</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#E8E4F0]/75 hover:text-[#C9A84C] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">Services</h3>
            <ul className="space-y-4">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#E8E4F0]/75 hover:text-[#C9A84C] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">Contact</h3>
            <ul className="space-y-6 text-sm text-[#E8E4F0]/75">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Ayodhya Dham,<br />Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C9A84C] shrink-0" aria-hidden="true" />
                <a href="tel:+918009124454" className="hover:text-[#C9A84C] transition-colors">
                  +91 80091 24454
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9A84C] shrink-0" aria-hidden="true" />
                <a href="mailto:contact@jyotishguru.in" className="hover:text-[#C9A84C] transition-colors">
                  contact@jyotishguru.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-[#C9A84C]/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#E8E4F0]/70 text-sm text-center md:text-left">
            © {new Date().getFullYear()} JyotishGuru. All rights reserved.
          </p>
          <div className="flex gap-6 text-[#E8E4F0]/70 text-sm">
            <Link href="/privacy-policy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[#C9A84C] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
