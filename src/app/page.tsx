import Link from "next/link";
import { Star, FileText, Heart, Search, ArrowDown, Award, MapPin } from "lucide-react";
import AnimatedSection from "./components/home/AnimatedSection";
import TestimonialsCarousel from "./components/home/TestimonialsCarousel";
import KundaliCTAForm from "./components/home/KundaliCTAForm";

// CSS animation for stars (inline for simplicity in Server Component without extra CSS file)
const starFieldCSS = `
  @keyframes twinkle {
    0% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0.2; transform: scale(0.8); }
  }
  @keyframes rotateMandala {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: starFieldCSS }} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#0D0B1A]">
        {/* Animated Star Field Background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + "px",
                height: Math.random() * 3 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `twinkle ${Math.random() * 4 + 2}s infinite ${Math.random() * 2}s`,
                opacity: Math.random() * 0.7 + 0.1,
              }}
            />
          ))}
        </div>

        {/* Rotating Mandala SVG Background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08] text-[#C9A84C]"
          style={{ animation: 'rotateMandala 120s linear infinite' }}
        >
          <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] max-w-[150vw] max-h-[150vh]">
            <path fill="currentColor" d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45Z" />
            <path fill="currentColor" d="M15 15L45 45L85 15L55 45Z" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-[-10vh]">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#E8E4F0] mb-6 leading-tight drop-shadow-2xl">
              Discover Your <br />
              <span className="text-[#C9A84C] inline-block mt-2">Cosmic Destiny</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-[#E8E4F0]/80 mb-10 font-sans max-w-2xl mx-auto leading-relaxed">
              Authentic Vedic astrology from the sacred land of Ayodhya Dham
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/kundali"
              className="w-full sm:w-auto px-8 py-4 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-bold text-lg hover:bg-[#D4A017] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(201,168,76,0.4)]"
            >
              Get Free Kundali
            </Link>
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-4 border-2 border-[#C9A84C] text-[#C9A84C] rounded-full font-bold text-lg hover:bg-[#C9A84C]/10 transition-all transform hover:scale-105"
            >
              Book Consultation
            </Link>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-[#C9A84C] w-8 h-8 opacity-70" />
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-[#1A1040] border-y border-[#C9A84C]/20 py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-[#C9A84C]/20 text-center">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-serif font-bold text-[#C9A84C] mb-2">1,200+</span>
              <span className="text-sm font-sans text-[#E8E4F0]/60 uppercase tracking-wider">Kundalis Generated</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-serif font-bold text-[#C9A84C] mb-2">850+</span>
              <span className="text-sm font-sans text-[#E8E4F0]/60 uppercase tracking-wider">Couples Matched</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center justify-center gap-1 text-[#C9A84C] mb-2">
                <span className="text-3xl font-serif font-bold">5.0</span>
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-sm font-sans text-[#E8E4F0]/60 uppercase tracking-wider">Average Rating</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Award className="w-8 h-8 text-[#C9A84C] mb-3" />
              <span className="text-sm font-sans text-[#E8E4F0]/60 uppercase tracking-wider">Based in Ayodhya Dham</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 bg-[#0D0B1A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">Our Sacred Services</h2>
            <div className="w-24 h-1 bg-[#C9A84C]/50 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <Link href="/kundali" className="block group">
                <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 h-full hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] hover:border-[#C9A84C]/50 transition-all duration-300">
                  <FileText className="w-12 h-12 text-[#C9A84C] mb-6" />
                  <h3 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-3">Free Kundali</h3>
                  <p className="text-[#E8E4F0]/70 mb-6 font-sans">Reveal your birth chart and uncover the planetary positions at your exact time of birth.</p>
                  <span className="text-[#C9A84C] font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    Explore <span>→</span>
                  </span>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Link href="/kundali-matching" className="block group">
                <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 h-full hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] hover:border-[#C9A84C]/50 transition-all duration-300">
                  <Heart className="w-12 h-12 text-[#C9A84C] mb-6" />
                  <h3 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-3">Kundali Matching</h3>
                  <p className="text-[#E8E4F0]/70 mb-6 font-sans">Find your cosmic soulmate using the traditional Ashtakoot Guna Milan system for marital harmony.</p>
                  <span className="text-[#C9A84C] font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    Explore <span>→</span>
                  </span>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Link href="/horoscope" className="block group">
                <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 h-full hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] hover:border-[#C9A84C]/50 transition-all duration-300">
                  <Star className="w-12 h-12 text-[#C9A84C] mb-6" />
                  <h3 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-3">Daily Horoscope</h3>
                  <p className="text-[#E8E4F0]/70 mb-6 font-sans">Your daily celestial guidance based on Vedic planetary transits tailored to your moon sign.</p>
                  <span className="text-[#C9A84C] font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    Explore <span>→</span>
                  </span>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <Link href="/book" className="block group">
                <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 h-full hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] hover:border-[#C9A84C]/50 transition-all duration-300">
                  <Search className="w-12 h-12 text-[#C9A84C] mb-6" />
                  <h3 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-3">Personal Consultation</h3>
                  <p className="text-[#E8E4F0]/70 mb-6 font-sans">1-on-1 with Acharya Shri Ravindra Shukla Shastri for deep insights into your life path, career, and karmic journey.</p>
                  <span className="text-[#C9A84C] font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    Explore <span>→</span>
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 bg-[#1A1040]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">Your Journey to Clarity</h2>
            <div className="w-24 h-1 bg-[#C9A84C]/50 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="relative">
            {/* Connecting line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-[#C9A84C]/30 -z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: "1", title: "Share Details", desc: "Enter your precise birth date, time, and location." },
                { step: "2", title: "Generate Chart", desc: "Receive your personalized Vedic Kundali instantly." },
                { step: "3", title: "Gain Insights", desc: "Book a consultation for deeper spiritual guidance." }
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.2} className="text-center">
                  <div className="w-24 h-24 mx-auto bg-[#0D0B1A] border-4 border-[#C9A84C] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                    <span className="text-4xl font-serif font-bold text-[#C9A84C]">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#E8E4F0] mb-3">{item.title}</h3>
                  <p className="text-[#E8E4F0]/70 font-sans max-w-xs mx-auto">{item.desc}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT ACHARYA (Teaser) */}
      <section className="py-24 bg-[#0D0B1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1628] rounded-3xl p-8 md:p-16 border border-[#C9A84C]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none -mt-20 -mr-20"></div>

            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <AnimatedSection className="w-full md:w-1/3 flex-shrink-0">
                <div className="aspect-[4/5] bg-[#0D0B1A] rounded-2xl border-2 border-[#C9A84C]/30 flex flex-col items-center justify-center text-[#E8E4F0]/50 shadow-inner overflow-hidden relative group">
                  <span className="font-serif text-lg tracking-widest uppercase mb-4 opacity-50">Photo Placeholder</span>
                  <span className="text-7xl opacity-20 group-hover:scale-110 transition-transform duration-500">ॐ</span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="w-full md:w-2/3">
                <div className="inline-flex items-center gap-2 bg-[#0D0B1A] border border-[#C9A84C]/30 px-4 py-2 rounded-full mb-6 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-[#C9A84C] text-sm font-semibold tracking-wide uppercase">Based in Ayodhya Dham</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#E8E4F0] mb-2">Acharya Shri Ravindra Shukla Shastri</h2>
                <h3 className="text-xl text-[#C9A84C] font-serif italic mb-6">Expert Vedic Astrologer</h3>

                <p className="text-[#E8E4F0]/80 font-sans text-lg mb-8 leading-relaxed">
                  Steeped in the ancient wisdom of Vedic scriptures, Acharya Ji provides profound insights into life's challenges. His holistic approach combines deep astrological knowledge with spiritual remedies to guide you towards peace and prosperity. With thousands of consultations globally, he remains rooted in the sacred traditions of Ayodhya.
                </p>

                <Link href="/about" className="inline-block px-8 py-3 bg-transparent border-2 border-[#C9A84C] text-[#C9A84C] rounded-full font-bold font-sans hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors">
                  Learn More About Acharya Ji
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-[#1A1040]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">Divine Words of Trust</h2>
            <div className="w-24 h-1 bg-[#C9A84C]/50 mx-auto rounded-full"></div>
          </AnimatedSection>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* 7. FREE KUNDALI CTA BANNER */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1040] via-[#C9A84C]/20 to-[#0D0B1A] z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#E8E4F0] mb-6 drop-shadow-xl">
              Get Your Free Kundali Today
            </h2>
            <p className="text-xl text-[#E8E4F0]/90 font-sans max-w-2xl mx-auto drop-shadow-md">
              Unlock the secrets of your stars. Enter your details below for an instant Vedic birth chart analysis.
            </p>
          </AnimatedSection>

          <KundaliCTAForm />
        </div>
      </section>

    </>
  );
}