"use client";

import Link from "next/link";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";
import { MapPin, MessageCircle, Award, BookOpen, Sparkles } from "lucide-react";

export default function AboutPage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          {isHi ? "आचार्य जी परिचय" : "About Acharya Ji"}
        </h1>
        <div className="w-24 h-1 bg-[#C9A84C]/50 mx-auto rounded-full"></div>
      </div>

      <div className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-[#C9A84C]/35 flex-shrink-0 bg-[#0D0B1A] flex flex-col items-center justify-center p-6 text-center">
            <span className="text-6xl text-[#C9A84C] font-serif mb-2">ॐ</span>
            <span className="text-xs uppercase tracking-widest text-[#E8E4F0]/75 font-semibold">
              {isHi ? "अयोध्या धाम" : "Ayodhya Dham"}
            </span>
          </div>

          <div className="space-y-6 text-[#E8E4F0]/90 text-lg leading-relaxed text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#0D0B1A] border border-[#C9A84C]/30 px-4 py-1.5 rounded-full text-xs text-[#C9A84C] uppercase tracking-widest font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isHi ? "पावन भूमि अयोध्या धाम" : "Sacred Land of Ayodhya Dham"}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#C9A84C]">
              {isHi ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री" : "Acharya Shri Ravindra Shukla Shatri"}
            </h2>

            <p>
              {isHi ? (
                <>पावन नगरी अयोध्या धाम में प्रतिष्ठित <strong>आचार्य श्री रविन्द्र शुक्ल शास्त्री</strong> एक सुविख्यात वैदिक ज्योतिषाचार्य एवं धर्म शास्त्री हैं, जो व्यक्तियों और परिवारों को उनके कर्म पथ पर स्पष्टता और आध्यात्मिक शांति के साथ आगे बढ़ने में मार्गदर्शन करते हैं।</>
              ) : (
                <>Based in the holy city of Ayodhya Dham, <strong>Acharya Shri Ravindra Shukla Shatri</strong> is a distinguished Vedic Astrologer and Dharma Shastri dedicated to helping individuals and families navigate their karmic path with clarity and grace.</>
              )}
            </p>
            <p>
              {isHi ? (
                <>शास्त्रीय संस्कृत ज्योतिष ग्रंथों (<em>बृहत्पाराशर होराशास्त्र</em> एवं <em>मुहूर्त चिंतामणि</em>) में प्रशिक्षित आचार्य जी सटीक जन्म कुंडली विश्लेषण, अष्टकूट एवं मांगलिक विवाह मिलान, दशमांश करियर मार्गदर्शन और प्रामाणिक वैदिक उपायों में विशेषज्ञता रखते हैं।</>
              ) : (
                <>Trained in classical Sanskrit Jyotish scriptures (including <em>Brihat Parashara Hora Shastra</em> and <em>Muhurta Chintamani</em>), Acharya Ji specializes in precision Janam Kundali analysis, Ashtakoot &amp; Manglik marriage compatibility, Dashamsha career guidance, and authentic Vedic Upayas (remedies).</>
              )}
            </p>
            <p className="font-semibold text-[#E8E4F0] border-l-4 border-[#C9A84C] pl-4 italic text-base md:text-lg">
              {isHi
                ? "\"ज्योतिष ग्रहों की दशाओं से भयभीत होने का विषय नहीं है, अपितु अपने प्रारब्ध को समझकर विवेक, भक्ति और सही समय पर कर्म करने का दिव्य विज्ञान है।\""
                : "\"Astrology is not about fearing planetary periods, but understanding your karmic blueprint so you can act with wisdom, devotion, and right timing.\""}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-xl p-4">
                <Award className="w-5 h-5 text-[#C9A84C] mb-2" />
                <div className="font-serif font-bold text-[#E8E4F0]">{isHi ? "पाराशरी ज्योतिष" : "Parashari Jyotish"}</div>
                <div className="text-xs text-[#E8E4F0]/70">{isHi ? "लग्न, नवमांश एवं विंशोत्तरी दशा" : "Lagna, Navamsha & Vimshottari Dasha"}</div>
              </div>
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-xl p-4">
                <BookOpen className="w-5 h-5 text-[#C9A84C] mb-2" />
                <div className="font-serif font-bold text-[#E8E4F0]">{isHi ? "शास्त्री परंपरा" : "Shastri Lineage"}</div>
                <div className="text-xs text-[#E8E4F0]/70">{isHi ? "अयोध्या धाम वैदिक विद्वत्ता" : "Traditional Ayodhya Dham Scholarship"}</div>
              </div>
              <div className="bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-xl p-4">
                <Sparkles className="w-5 h-5 text-[#C9A84C] mb-2" />
                <div className="font-serif font-bold text-[#E8E4F0]">{isHi ? "प्रामाणिक उपाय" : "Authentic Upayas"}</div>
                <div className="text-xs text-[#E8E4F0]/70">{isHi ? "मंत्र, रत्न एवं शुभ मुहूर्त" : "Mantras, Gemstones & Muhurat"}</div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/book" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-bold text-base hover:bg-[#d9b85c] transition-colors">
                <span>{isHi ? "1-ऑन-1 परामर्श बुक करें" : "Schedule 1-on-1 Consultation"}</span>
              </Link>
              <a
                href="https://wa.me/918009124454?text=Namaste%20Acharya%20Shri%20Ravindra%20Shukla%20Shatri%20Ji%2C%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#C9A84C]/40 text-[#E8E4F0] rounded-full font-semibold text-base hover:bg-white/5 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#C9A84C]" />
                <span>{isHi ? "व्हाट्सएप: +91 80091 24454" : "WhatsApp: +91 80091 24454"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
