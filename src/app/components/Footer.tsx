"use client";

import Link from "next/link";
import { Sparkles, MapPin, Mail, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "./ServiceWorkerRegister";

const quickLinks = [
  { en: "Home", hi: "मुख्य पृष्ठ", href: "/" },
  { en: "About Acharya Ji", hi: "आचार्य जी परिचय", href: "/about" },
  { en: "Vedic Blog", hi: "वैदिक ज्ञान ब्लॉग", href: "/blog" },
  { en: "Book Consultation", hi: "परामर्श बुक करें", href: "/book" },
];

const serviceLinks = [
  { en: "Free Kundali", hi: "निःशुल्क जन्म कुंडली", href: "/kundali" },
  { en: "Kundali Matching", hi: "कुंडली गुण मिलान", href: "/kundali-matching" },
  { en: "Daily Horoscope", hi: "दैनिक राशिफल", href: "/horoscope" },
  { en: "All Consultation Services", hi: "सभी परामर्श सेवाएं", href: "/services" },
];

export default function Footer() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  return (
    <footer className="bg-[#0D0B1A] border-t border-[#C9A84C]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="text-[#C9A84C] h-6 w-6" aria-hidden="true" />
              <span className="font-serif font-bold text-2xl text-[#E8E4F0]">
                {isHi ? "ज्योतिष गुरु" : "JyotishGuru"}
              </span>
            </Link>
            <p className="text-[#E8E4F0]/75 text-sm leading-relaxed max-w-sm">
              {isHi
                ? "पावन नगरी अयोध्या धाम से प्रामाणिक वैदिक ज्योतिष। आचार्य श्री रविन्द्र शुक्ल शास्त्री के मार्गदर्शन में अपने जीवन का सही मार्ग जानें।"
                : "Authentic Vedic astrology from the sacred land of Ayodhya Dham. Discover your cosmic destiny with Acharya Shri Ravindra Shukla Shatri."}
            </p>
            <a
              href="https://wa.me/918009124454?text=Namaste%20Acharya%20Shri%20Ravindra%20Shukla%20Shatri%20Ji%2C%20I%20would%20like%20to%20inquire%20about%20a%20Vedic%20astrology%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1628] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors border border-[#C9A84C]/30 text-xs font-semibold uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isHi ? "व्हाट्सएप परामर्श" : "WhatsApp Consult"}</span>
            </a>
          </div>

          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">{isHi ? "त्वरित लिंक" : "Quick Links"}</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#E8E4F0]/75 hover:text-[#C9A84C] transition-colors text-sm">
                    {isHi ? item.hi : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">{isHi ? "सेवाएं" : "Services"}</h3>
            <ul className="space-y-4">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#E8E4F0]/75 hover:text-[#C9A84C] transition-colors text-sm">
                    {isHi ? item.hi : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-xl text-[#E8E4F0] mb-6">{isHi ? "संपर्क सूत्र" : "Contact"}</h3>
            <ul className="space-y-6 text-sm text-[#E8E4F0]/75">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>{isHi ? "अयोध्या धाम, उत्तर प्रदेश, भारत" : "Ayodhya Dham, Uttar Pradesh, India"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <a href="tel:+918009124454" className="hover:text-[#C9A84C]">+91 80091 24454</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <a href="mailto:contact@jyotishguru.in" className="hover:text-[#C9A84C]">contact@jyotishguru.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#C9A84C]/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#E8E4F0]/70 text-sm">
            © {new Date().getFullYear()} {isHi ? "ज्योतिष गुरु। सर्वाधिकार सुरक्षित।" : "JyotishGuru. All rights reserved."}
          </p>
          <div className="flex gap-6 text-[#E8E4F0]/70 text-sm">
            <Link href="/privacy-policy" className="hover:text-[#C9A84C]">{isHi ? "गोपनीयता नीति" : "Privacy Policy"}</Link>
            <Link href="/terms-of-service" className="hover:text-[#C9A84C]">{isHi ? "सेवा की शर्तें" : "Terms of Service"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
