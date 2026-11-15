"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Star, FileText, Heart, Search, Award, MapPin } from "lucide-react";
import HeroSection from "./components/home/HeroSection";
import AnimatedSection from "./components/home/AnimatedSection";
import { useLanguage } from "./components/ServiceWorkerRegister";

const TestimonialsCarousel = dynamic(() => import("./components/home/TestimonialsCarousel"), { ssr: true });
const KundaliCTAForm = dynamic(() => import("./components/home/KundaliCTAForm"), { ssr: true });

export default function Home() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  return (
    <>
      <HeroSection />

      <section className="relative z-20 -mt-10 mb-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C9A84C]/10 text-center">
              {[
                { value: "1,200+", label: isHi ? "कुंडलियां निर्मित" : "Kundalis Generated" },
                { value: "850+", label: isHi ? "विवाह मिलान सफल" : "Couples Matched" },
                { value: "5.0", label: isHi ? "औसत रेटिंग" : "Average Rating", icon: <Star className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C] inline-block -mt-1 ml-1" /> },
                { icon: <Award className="w-8 h-8 text-[#C9A84C] mx-auto mb-2" />, label: isHi ? "पावन नगरी अयोध्या धाम" : "Based in Ayodhya Dham" },
              ].map((stat, i) => (
                <div key={i} className="p-6 md:p-8 hover:bg-white/5 transition-colors duration-300">
                  {stat.value ? (
                    <div className="text-3xl md:text-4xl font-serif font-bold text-gold-gradient mb-2">
                      {stat.value}{stat.icon}
                    </div>
                  ) : (
                    stat.icon
                  )}
                  <div className="text-xs font-sans text-[#E8E4F0]/70 uppercase tracking-[0.15em] font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="py-24 bg-[#0D0B1A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6">
              {isHi ? "हमारी पावन " : "Our "}<span className="text-gold-gradient italic">{isHi ? "वैदिक सेवाएं" : "Sacred Services"}</span>
            </h2>
            <p className="text-[#E8E4F0]/70 font-sans max-w-2xl mx-auto text-lg">
              {isHi
                ? "आधुनिक जीवन की समस्याओं के लिए प्राचीन वैदिक ज्योतिष का सटीक एवं प्रामाणिक मार्गदर्शन।"
                : "Ancient wisdom tailored for the modern soul. Discover clarity through our specialized Vedic readings."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { href: "/kundali", icon: FileText, title: isHi ? "निःशुल्क जन्म कुंडली" : "Free Kundali", desc: isHi ? "जन्म समय के अनुसार सटीक लग्न, नवमांश (D-9), विंशोत्तरी दशा और ग्रह स्थिति जानें।" : "Reveal your birth chart, Navamsha (D-9), Vimshottari Dasha, and planetary positions at your exact time of birth." },
              { href: "/kundali-matching", icon: Heart, title: isHi ? "कुंडली गुण मिलान" : "Kundali Matching", desc: isHi ? "सुखी दांपत्य जीवन हेतु 36-गुण अष्टकूट मिलान एवं मांगलिक दोष परीक्षण।" : "Find your cosmic soulmate using the traditional 36-Guna Ashtakoot & Manglik compatibility system for marital harmony." },
              { href: "/horoscope", icon: Star, title: isHi ? "दैनिक राशिफल" : "Daily Horoscope", desc: isHi ? "आपकी चंद्र राशि और वर्तमान ग्रह गोचर पर आधारित प्रतिदिन का वैदिक मार्गदर्शन।" : "Your daily celestial guidance based on Vedic planetary transits tailored to your Chandra Rashi (Moon sign)." },
              { href: "/book", icon: Search, title: isHi ? "व्यक्तिगत परामर्श" : "Personal Consultation", desc: isHi ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री के साथ करियर, विवाह और जीवन पथ पर 1-ऑन-1 परामर्श।" : "1-on-1 with Acharya Shri Ravindra Shukla Shatri for deep insights into your life path, career, and karmic journey." },
            ].map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link href={service.href} className="block group h-full">
                  <div className="relative h-full bg-[#1A1628]/40 backdrop-blur-sm border border-[#C9A84C]/15 rounded-3xl p-8 lg:p-10 hover:-translate-y-2 hover:border-[#C9A84C]/50 transition-all">
                    <service.icon className="w-12 h-12 text-[#C9A84C] mb-6 opacity-85 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#E8E4F0] mb-4 group-hover:text-[#C9A84C]">{service.title}</h3>
                    <p className="text-[#E8E4F0]/75 mb-8 leading-relaxed">{service.desc}</p>
                    <div className="flex items-center gap-2 text-[#C9A84C] text-sm font-semibold uppercase tracking-widest">
                      <span>{isHi ? "विस्तार से देखें" : "Explore"}</span>
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#1A1040]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#E8E4F0] mb-6">
              {isHi ? "स्पष्टता की ओर " : "Your Journey to "}<span className="text-gold-gradient italic">{isHi ? "आपकी यात्रा" : "Clarity"}</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { step: "01", title: isHi ? "जन्म विवरण भरें" : "Share Details", desc: isHi ? "अपनी जन्म तिथि, सटीक समय और जन्म शहर दर्ज करें।" : "Enter your precise birth date, time, and city of birth." },
              { step: "02", title: isHi ? "कुंडली प्राप्त करें" : "Generate Chart", desc: isHi ? "तुरंत अपनी पाराशरी वैदिक जन्म कुंडली और दशा देखें।" : "Receive your personalized Parashari Vedic Kundali instantly." },
              { step: "03", title: isHi ? "शास्त्रीय मार्गदर्शन" : "Gain Insights", desc: isHi ? "गहन समाधान हेतु आचार्य जी के साथ 1-ऑन-1 परामर्श बुक करें।" : "Book a 1-on-1 consultation with Acharya Ji for deeper spiritual guidance." },
            ].map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.15}>
                <div className="w-24 h-24 mx-auto bg-[#1A1040] border border-[#C9A84C]/30 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl font-serif font-bold text-gold-gradient">{item.step}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-3">{item.title}</h3>
                <p className="text-[#E8E4F0]/70 max-w-xs mx-auto">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0D0B1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-[2.5rem] p-8 md:p-16">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <AnimatedSection direction="left" className="w-full md:w-5/12">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#1A1628] to-[#0D0B1A] rounded-3xl border border-[#C9A84C]/30 flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-8xl opacity-30 text-[#C9A84C] font-serif mb-4">ॐ</span>
                  <span className="font-serif text-xl font-bold text-[#E8E4F0]">
                    {isHi ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री" : "Acharya Shri Ravindra Shukla Shatri"}
                  </span>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#C9A84C]/80 mt-2">
                    {isHi ? "अयोध्या धाम • वैदिक शास्त्री" : "Ayodhya Dham • Vedic Shastri"}
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.15} className="w-full md:w-7/12">
                <div className="inline-flex items-center gap-2 bg-[#1A1628]/80 border border-[#C9A84C]/20 px-4 py-2 rounded-full mb-6">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-[#C9A84C] text-xs uppercase font-medium">{isHi ? "अयोध्या धाम" : "Ayodhya Dham"}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#E8E4F0] mb-4">
                  {isHi ? "आचार्य श्री " : "Acharya Shri "}
                  <span className="text-gold-gradient">{isHi ? "रविन्द्र शुक्ल शास्त्री" : "Ravindra Shukla Shatri"}</span>
                </h2>
                <h3 className="text-xl text-[#E8E4F0]/70 font-serif italic mb-6">
                  {isHi ? "प्रतिष्ठित वैदिक ज्योतिषाचार्य एवं धर्म शास्त्री" : "Distinguished Vedic Astrologer & Dharma Shastri"}
                </h3>
                <p className="text-[#E8E4F0]/80 text-lg mb-8 leading-relaxed">
                  {isHi
                    ? "पावन नगरी अयोध्या धाम के वैदिक शास्त्रों में पारंगत आचार्य श्री रविन्द्र शुक्ल शास्त्री पाराशरी ज्योतिष और प्रामाणिक आध्यात्मिक उपायों के माध्यम से सुख, शांति और समृद्धि का मार्ग प्रशस्त करते हैं।"
                    : "Steeped in the ancient wisdom of Vedic scriptures in the sacred city of Ayodhya Dham, Acharya Shri Ravindra Shukla Shatri provides profound insights into life's challenges. His holistic approach combines classical Parashari Jyotish with authentic spiritual remedies to guide you towards peace and prosperity."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/book" className="px-8 py-4 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-bold hover:bg-[#d9b85c]">
                    {isHi ? "1-ऑन-1 परामर्श बुक करें" : "Book 1-on-1 Consultation"}
                  </Link>
                  <Link href="/about" className="px-8 py-4 border border-[#C9A84C]/50 text-[#E8E4F0] rounded-full font-bold hover:bg-[#C9A84C] hover:text-[#0D0B1A]">
                    {isHi ? "और जानें →" : "Learn More →"}
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#1A1040]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#E8E4F0] mb-4">
              {isHi ? "भक्तों का " : "Divine Words of "}<span className="text-gold-gradient italic">{isHi ? "विश्वास" : "Trust"}</span>
            </h2>
          </AnimatedSection>
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="py-28 border-t border-[#C9A84C]/10 bg-[#0D0B1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center glass-panel p-8 md:p-12 rounded-[2.5rem]">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#E8E4F0] mb-6">
              {isHi ? "अपने ग्रहों के " : "Unlock the Secrets of "}
              <span className="text-gold-gradient italic">{isHi ? "रहस्य जानें" : "Your Stars"}</span>
            </h2>
            <p className="text-lg text-[#E8E4F0]/75 max-w-2xl mx-auto mb-10">
              {isHi
                ? "तुरंत सटीक वैदिक जन्म कुंडली विश्लेषण प्राप्त करने के लिए नीचे अपना जन्म विवरण दर्ज करें।"
                : "Enter your birth details below to generate an instant, highly accurate Vedic Kundali analysis."}
            </p>
            <KundaliCTAForm />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
