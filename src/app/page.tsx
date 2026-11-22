"use client";

import Link from "next/link";
import { Star, FileText, Heart, Search, Award, MapPin } from "lucide-react";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";
import HeroSection from "./components/home/HeroSection";
import AnimatedSection from "./components/home/AnimatedSection";
import TestimonialsCarousel from "./components/home/TestimonialsCarousel";
import KundaliCTAForm from "./components/home/KundaliCTAForm";
import HomePanchangBanner from "@/components/astrology/HomePanchangBanner";

export default function Home() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const stats = [
    { value: "1,200+", label: isHi ? "कुंडली निर्माण" : "Kundalis Generated" },
    { value: "850+", label: isHi ? "विवाह गुण मिलान" : "Couples Matched" },
    {
      value: "5.0",
      label: isHi ? "औसत मूल्यांकन" : "Average Rating",
      icon: <Star className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C] inline-block -mt-1 ml-1" />,
    },
    {
      icon: <Award className="w-8 h-8 text-[#C9A84C] mx-auto mb-2" />,
      label: isHi ? "अयोध्या धाम स्थित" : "Based in Ayodhya Dham",
    },
  ];

  const services = [
    {
      href: "/kundali",
      icon: FileText,
      title: isHi ? "निःशुल्क जन्म कुंडली" : "Free Kundali",
      desc: isHi
        ? "अपने जन्म समय के अनुसार सटीक लग्न कुंडली, नवमांश (D-9), विंशोत्तरी दशा एवं ग्रह स्थिति तुरंत प्राप्त करें।"
        : "Reveal your birth chart, Navamsha (D-9), Vimshottari Dasha, and planetary positions at your exact time of birth.",
    },
    {
      href: "/kundali-matching",
      icon: Heart,
      title: isHi ? "कुंडली एवं गुण मिलान" : "Kundali Matching",
      desc: isHi
        ? "सुखद वैवाहिक जीवन हेतु पारंपरिक 36-गुण अष्टकूट एवं मांगलिक दोष का शास्त्रीय विश्लेषण करें।"
        : "Find your cosmic soulmate using the traditional 36-Guna Ashtakoot & Manglik compatibility system for marital harmony.",
    },
    {
      href: "/horoscope",
      icon: Star,
      title: isHi ? "दैनिक पंचांग एवं राशिफल" : "Daily Panchang & Horoscope",
      desc: isHi
        ? "दृक् गणित आधारित सूर्योदय, तिथि समाप्ति काल, चौघड़िया, होरा, राहु काल एवं चन्द्र गोचर दैनिक राशिफल।"
        : "Your daily Drik Panchang, Shubh Muhurat, Choghadiya, Hora, and celestial guidance tailored to your Chandra Rashi.",
    },
    {
      href: "/book",
      icon: Search,
      title: isHi ? "व्यक्तिगत ज्योतिष परामर्श" : "Personal Consultation",
      desc: isHi
        ? "करियर, विवाह, संतान, व्यापार एवं दोष निवारण हेतु आचार्य श्री रविन्द्र शुक्ल शास्त्री से सीधा 1-ऑन-1 परामर्श।"
        : "1-on-1 with Acharya Shri Ravindra Shukla Shatri for deep insights into your life path, career, and karmic journey.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: isHi ? "जन्म विवरण दें" : "Share Details",
      desc: isHi
        ? "अपनी जन्म तिथि, सटीक जन्म समय एवं जन्म स्थान दर्ज करें।"
        : "Enter your precise birth date, time, and city of birth.",
    },
    {
      step: "02",
      title: isHi ? "कुंडली निर्माण" : "Generate Chart",
      desc: isHi
        ? "क्षणभर में अपनी शुद्ध पाराशरी वैदिक जन्म कुंडली एवं पंचांग प्राप्त करें।"
        : "Receive your personalized Parashari Vedic Kundali instantly.",
    },
    {
      step: "03",
      title: isHi ? "शास्त्रीय मार्गदर्शन" : "Gain Insights",
      desc: isHi
        ? "गहन विश्लेषण एवं प्रामाणिक वैदिक उपायों हेतु आचार्य जी से परामर्श बुक करें।"
        : "Book a 1-on-1 consultation with Acharya Ji for deeper spiritual guidance.",
    },
  ];

  return (
    <>
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. LIVE AYODHYA DHAM DRIK PANCHANG & MUHURAT BANNER */}
      <HomePanchangBanner />

      {/* 3. TRUST BAR */}
      <section className="relative z-20 mb-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C9A84C]/10 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 md:p-8 hover:bg-white/5 transition-colors duration-300">
                  {stat.value ? (
                    <div className="text-3xl md:text-4xl font-serif font-bold text-gold-gradient mb-2">
                      {stat.value}
                      {stat.icon}
                    </div>
                  ) : (
                    stat.icon
                  )}
                  <div className="text-xs font-sans text-[#E8E4F0]/70 uppercase tracking-[0.2em] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-24 bg-[#0D0B1A] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6">
              {isHi ? (
                <>हमारी <span className="text-gold-gradient italic">पवित्र वैदिक</span> सेवाएँ</>
              ) : (
                <>Our <span className="text-gold-gradient italic">Sacred</span> Services</>
              )}
            </h2>
            <p className="text-[#E8E4F0]/70 font-sans max-w-2xl mx-auto text-lg">
              {isHi
                ? "आधुनिक जीवन की समस्याओं हेतु सनातन वैदिक ज्योतिष का प्रामाणिक एवं सरल समाधान।"
                : "Ancient wisdom tailored for the modern soul. Discover clarity through our specialized Vedic readings."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link href={service.href} className="block group h-full">
                  <div className="relative h-full bg-[#1A1628]/40 backdrop-blur-sm border border-[#C9A84C]/15 rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A84C]/50 group-active:scale-[0.98]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 group-hover:to-transparent transition-all duration-500" />
                    <service.icon className="w-12 h-12 text-[#C9A84C] mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#E8E4F0] mb-4 group-hover:text-[#C9A84C] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#E8E4F0]/75 mb-8 font-sans leading-relaxed line-clamp-3">{service.desc}</p>
                    <div className="absolute bottom-8 left-8 lg:left-10 flex items-center gap-2 text-[#C9A84C] font-sans text-sm font-semibold tracking-widest uppercase">
                      <span>{isHi ? "विस्तार से देखें" : "Explore"}</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 bg-[#1A1040] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6">
              {isHi ? (
                <>स्पष्टता एवं समाधान की <span className="text-gold-gradient italic">सरल प्रक्रिया</span></>
              ) : (
                <>Your Journey to <span className="text-gold-gradient italic">Clarity</span></>
              )}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto rounded-full opacity-50" />
          </AnimatedSection>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent -z-0" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative z-10">
              {steps.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.2} className="text-center group">
                  <div className="w-24 h-24 mx-auto bg-[#1A1040] border border-[#C9A84C]/30 rounded-full flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:scale-110">
                    <div className="absolute inset-0 bg-[#C9A84C] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <span className="text-3xl font-serif font-bold text-gold-gradient">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-4">{item.title}</h3>
                  <p className="text-[#E8E4F0]/70 font-sans max-w-xs mx-auto text-lg">{item.desc}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT ACHARYA SPOTLIGHT */}
      <section className="py-24 bg-[#0D0B1A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[100px] pointer-events-none -mt-32 -mr-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7e22ce]/10 rounded-full blur-[80px] pointer-events-none -mb-20 -ml-20" />

            <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center relative z-10">
              <AnimatedSection direction="left" className="w-full md:w-5/12 flex-shrink-0">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#1A1628] to-[#0D0B1A] rounded-3xl border border-[#C9A84C]/30 flex flex-col items-center justify-center text-[#C9A84C] shadow-2xl overflow-hidden relative group p-8 text-center">
                  <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-3xl pointer-events-none m-2" />
                  <span className="text-8xl opacity-30 group-hover:scale-110 transition-transform duration-700 font-serif mb-4">ॐ</span>
                  <span className="font-serif text-xl font-bold text-[#E8E4F0]">
                    {isHi ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री" : "Acharya Shri Ravindra Shukla Shatri"}
                  </span>
                  <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#C9A84C]/80 mt-2">
                    {isHi ? "अयोध्या धाम • वैदिक शास्त्री" : "Ayodhya Dham • Vedic Shastri"}
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.2} className="w-full md:w-7/12">
                <div className="inline-flex items-center gap-2 bg-[#1A1628]/80 backdrop-blur-sm border border-[#C9A84C]/20 px-4 py-2 rounded-full mb-8">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-[#C9A84C] text-xs font-sans tracking-[0.2em] uppercase font-medium">
                    {isHi ? "अयोध्या धाम, उत्तर प्रदेश" : "Ayodhya Dham"}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-4 leading-tight">
                  {isHi ? (
                    <>आचार्य श्री <br className="hidden md:block" /><span className="text-gold-gradient">रविन्द्र शुक्ल शास्त्री</span></>
                  ) : (
                    <>Acharya Shri <br className="hidden md:block" /><span className="text-gold-gradient">Ravindra Shukla Shatri</span></>
                  )}
                </h2>

                <h3 className="text-xl text-[#E8E4F0]/70 font-serif italic mb-8">
                  {isHi ? "प्रख्यात वैदिक ज्योतिषाचार्य एवं धर्म शास्त्री" : "Distinguished Vedic Astrologer & Dharma Shastri"}
                </h3>

                <p className="text-[#E8E4F0]/80 font-sans text-lg mb-10 leading-relaxed font-light">
                  {isHi
                    ? "पावन नगरी अयोध्या धाम की वैदिक परंपरा में पारंगत आचार्य श्री रविन्द्र शुक्ल शास्त्री पाराशरी ज्योतिष, मुहूर्त शास्त्र और प्रामाणिक वैदिक उपायों के माध्यम से जीवन की जटिल समस्याओं का सटीक एवं शांतिदायक मार्गदर्शन प्रदान करते हैं।"
                    : "Steeped in the ancient wisdom of Vedic scriptures in the sacred city of Ayodhya Dham, Acharya Shri Ravindra Shukla Shatri provides profound insights into life's challenges. His holistic approach combines classical Parashari Jyotish with authentic spiritual remedies to guide you towards peace and prosperity."}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-sans font-bold hover:bg-[#d9b85c] transition-all duration-300 active:scale-95"
                  >
                    {isHi ? "1-ऑन-1 परामर्श बुक करें" : "Book 1-on-1 Consultation"}
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 border border-[#C9A84C]/50 text-[#E8E4F0] rounded-full font-sans font-bold hover:bg-[#C9A84C] hover:text-[#0D0B1A] hover:border-[#C9A84C] transition-all duration-300 active:scale-95 group"
                  >
                    {isHi ? "आचार्य जी के बारे में जानें" : "Learn More"}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-[#1A1040]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6">
              {isHi ? (
                <>श्रद्धा एवं विश्वास के <span className="text-gold-gradient italic">अनुभव</span></>
              ) : (
                <>Divine Words of <span className="text-gold-gradient italic">Trust</span></>
              )}
            </h2>
            <p className="text-[#E8E4F0]/70 font-sans max-w-2xl mx-auto text-lg">
              {isHi
                ? "आचार्य जी के मार्गदर्शन से जीवन में स्पष्टता और सफलता पाने वाले यजमानों के विचार।"
                : "Read the experiences of those who have found guidance and clarity with Acharya Ji."}
            </p>
          </AnimatedSection>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* 8. FREE KUNDALI CTA BANNER */}
      <section className="relative py-32 overflow-hidden border-t border-[#C9A84C]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1628] via-[#0D0B1A] to-[#0D0B1A] z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16 glass-panel p-8 md:p-12 rounded-[2.5rem]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6 leading-tight">
              {isHi ? (
                <>जानिए अपने ग्रहों एवं <br /><span className="text-gold-gradient italic">भाग्य का रहस्य</span></>
              ) : (
                <>Unlock the Secrets of <br /><span className="text-gold-gradient italic">Your Stars</span></>
              )}
            </h2>
            <p className="text-lg md:text-xl text-[#E8E4F0]/75 font-sans max-w-2xl mx-auto mb-10 font-light">
              {isHi
                ? "अपना जन्म विवरण दर्ज करें और क्षणभर में सटीक वैदिक जन्म कुंडली विश्लेषण प्राप्त करें।"
                : "Enter your birth details below to generate an instant, highly accurate Vedic Kundali analysis."}
            </p>
            <KundaliCTAForm />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
// END OF FILE
