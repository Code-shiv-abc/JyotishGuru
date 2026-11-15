"use client";

import Link from "next/link";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";
import { Sparkles, Clock, Video, ArrowRight } from "lucide-react";

const services = [
  {
    slug: "kundali",
    enTitle: "Kundali Reading",
    hiTitle: "संपूर्ण जन्म कुंडली विवेचन",
    enDur: "45 Mins", hiDur: "45 मिनट",
    enMode: "Video / Phone", hiMode: "वीडियो / फोन",
    enDesc: "Detailed Parashari analysis of your Lagna, Navamsha (D-9), Vimshottari Dasha cycles, and life path with Acharya Shri Ravindra Shukla Shatri.",
    hiDesc: "आचार्य श्री रविन्द्र शुक्ल शास्त्री द्वारा लग्न, नवमांश (D-9), विंशोत्तरी दशा एवं जीवन पथ का गहन पाराशरी विश्लेषण।",
    price: "₹1100",
  },
  {
    slug: "matching",
    enTitle: "Kundali Matching (Guna Milan)",
    hiTitle: "कुंडली मिलान (अष्टकूट गुण मिलान)",
    enDur: "45 Mins", hiDur: "45 मिनट",
    enMode: "Video / Phone", hiMode: "वीडियो / फोन",
    enDesc: "Comprehensive marriage compatibility analysis based on the traditional 36-Guna Ashtakoot system, Manglik check, and Nadi Dosha remedies.",
    hiDesc: "पारंपरिक 36-गुण अष्टकूट पद्धति, मांगलिक दोष परीक्षण एवं नाड़ी दोष परिहार पर आधारित विस्तृत विवाह अनुकूलता परामर्श।",
    price: "₹1500",
  },
  {
    slug: "career",
    enTitle: "Career & Finance Consultation",
    hiTitle: "करियर एवं आर्थिक परामर्श",
    enDur: "30 Mins", hiDur: "30 मिनट",
    enMode: "Video / Phone", hiMode: "वीडियो / फोन",
    enDesc: "Strategic guidance on professional life, job transitions, business prospects, and financial stability using Dashamsha (D-10) charts.",
    hiDesc: "दशमांश (D-10) कुंडली के माध्यम से नौकरी, पदोन्नति, व्यापार वृद्धि एवं आर्थिक स्थिरता हेतु सटीक ज्योतिषीय मार्गदर्शन।",
    price: "₹1200",
  },
  {
    slug: "relationship",
    enTitle: "Relationship & Marriage",
    hiTitle: "दांपत्य एवं पारिवारिक सामंजस्य",
    enDur: "30 Mins", hiDur: "30 मिनट",
    enMode: "Video / Phone", hiMode: "वीडियो / फोन",
    enDesc: "Compassionate Vedic insights into love life, marital harmony, and spiritual remedies for resolving family and relationship challenges.",
    hiDesc: "विवाह में विलंब, वैवाहिक जीवन में मधुरता एवं पारिवारिक शांति हेतु प्रामाणिक वैदिक ज्योतिषीय समाधान।",
    price: "₹1200",
  },
  {
    slug: "muhurat",
    enTitle: "Muhurat Calculation",
    hiTitle: "शुभ मुहूर्त निर्णय",
    enDur: "20 Mins", hiDur: "20 मिनट",
    enMode: "WhatsApp / Phone", hiMode: "व्हाट्सएप / फोन",
    enDesc: "Finding the most auspicious Panchang electional window for marriage, Griha Pravesh, business launch, or property purchase.",
    hiDesc: "विवाह, गृह प्रवेश, व्यापार शुभारंभ, वाहन या संपत्ति क्रय हेतु पंचांग शुद्ध सर्वश्रेष्ठ शुभ मुहूर्त का चयन।",
    price: "₹500",
  },
  {
    slug: "remedies",
    enTitle: "Gemstone & Remedy Consultation",
    hiTitle: "रत्न, रुद्राक्ष एवं वैदिक उपाय",
    enDur: "30 Mins", hiDur: "30 मिनट",
    enMode: "Video / Phone", hiMode: "वीडियो / फोन",
    enDesc: "Personalized advice on gemstones (Ratna), Beej Mantras, and Vedic Upayas to mitigate planetary doshas and strengthen benefic yogas.",
    hiDesc: "ग्रह दोष निवारण एवं शुभ योगों को बल देने हेतु त्रिकोण भावेश के अनुसार रत्न, रुद्राक्ष एवं बीज मंत्रों का परामर्श।",
    price: "₹800",
  },
];

export default function ServicesPage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          {isHi ? "वैदिक ज्योतिष परामर्श सेवाएं" : "Vedic Astrology Services"}
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          {isHi
            ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री के साथ अपने जीवन की यात्रा के लिए पारंपरिक, सटीक और प्रामाणिक ज्योतिषीय मार्गदर्शन प्राप्त करें।"
            : "Discover traditional, accurate, and insightful astrological guidance with Acharya Shri Ravindra Shukla Shatri tailored to your life's unique journey."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s) => (
          <div key={s.slug} className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 hover:border-[#C9A84C]/60 transition-colors shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-[#0D0B1A] border border-[#C9A84C]/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#E8E4F0]/75 bg-[#0D0B1A] px-3 py-1.5 rounded-full border border-[#C9A84C]/20">
                  <Clock className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>{isHi ? s.hiDur : s.enDur}</span>
                  <span>•</span>
                  <Video className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>{isHi ? s.hiMode : s.enMode}</span>
                </div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-3">{isHi ? s.hiTitle : s.enTitle}</h2>
              <p className="text-[#E8E4F0]/75 mb-8 leading-relaxed text-sm">{isHi ? s.hiDesc : s.enDesc}</p>
            </div>
            <div className="flex items-center justify-between border-t border-[#C9A84C]/15 pt-6">
              <span className="text-2xl font-serif font-bold text-[#C9A84C]">{s.price}</span>
              <Link href={`/book?service=${s.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0D0B1A] bg-[#C9A84C] hover:bg-[#d9b85c] transition-colors px-5 py-2.5 rounded-full shadow-md">
                <span>{isHi ? "अभी बुक करें" : "Book Now"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
