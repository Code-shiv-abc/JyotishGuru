import Link from "next/link";
import dynamic from "next/dynamic";
import { Star, FileText, Heart, Search, Award, MapPin } from "lucide-react";

// Directly import HeroSection as it's above the fold
import HeroSection from "./components/home/HeroSection";
import AnimatedSection from "./components/home/AnimatedSection";

// Dynamically import heavy components that are below the fold
const TestimonialsCarousel = dynamic(() => import("./components/home/TestimonialsCarousel"), {
  ssr: true,
});

const KundaliCTAForm = dynamic(() => import("./components/home/KundaliCTAForm"), {
  ssr: true,
});

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. TRUST BAR (Glassmorphism + Subtle Gradient) */}
      <section className="relative z-20 -mt-10 mb-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C9A84C]/10 text-center">
              {[
                { value: "1,200+", label: "Kundalis Generated" },
                { value: "850+", label: "Couples Matched" },
                { value: "5.0", label: "Average Rating", icon: <Star className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C] inline-block -mt-1 ml-1" /> },
                { icon: <Award className="w-8 h-8 text-[#C9A84C] mx-auto mb-2" />, label: "Based in Ayodhya Dham" }
              ].map((stat, i) => (
                <div key={i} className="p-6 md:p-8 hover:bg-white/5 transition-colors duration-300">
                  {stat.value ? (
                    <div className="text-3xl md:text-4xl font-serif font-bold text-gold-gradient mb-2">
                      {stat.value}{stat.icon}
                    </div>
                  ) : (
                    stat.icon
                  )}
                  <div className="text-xs font-sans text-[#E8E4F0]/60 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 bg-[#0D0B1A] relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6">Our <span className="text-gold-gradient italic">Sacred</span> Services</h2>
            <p className="text-[#E8E4F0]/60 font-sans max-w-2xl mx-auto text-lg">Ancient wisdom tailored for the modern soul. Discover clarity through our specialized Vedic readings.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { href: "/kundali", icon: FileText, title: "Free Kundali", desc: "Reveal your birth chart and uncover the planetary positions at your exact time of birth." },
              { href: "/kundali-matching", icon: Heart, title: "Kundali Matching", desc: "Find your cosmic soulmate using the traditional Ashtakoot Guna Milan system for marital harmony." },
              { href: "/horoscope", icon: Star, title: "Daily Horoscope", desc: "Your daily celestial guidance based on Vedic planetary transits tailored to your moon sign." },
              { href: "/book", icon: Search, title: "Personal Consultation", desc: "1-on-1 with Acharya Shri Ravindra Shukla Shastri for deep insights into your life path, career, and karmic journey." }
            ].map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link href={service.href} className="block group h-full">
                  <div className="relative h-full bg-[#1A1628]/40 backdrop-blur-sm border border-[#C9A84C]/10 rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A84C]/40 group-active:scale-[0.98]">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 group-hover:to-transparent transition-all duration-500" />

                    <service.icon className="w-12 h-12 text-[#C9A84C] mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#E8E4F0] mb-4 group-hover:text-[#C9A84C] transition-colors">{service.title}</h3>
                    <p className="text-[#E8E4F0]/70 mb-8 font-sans leading-relaxed line-clamp-3">{service.desc}</p>

                    <div className="absolute bottom-8 left-8 lg:left-10 flex items-center gap-2 text-[#C9A84C] font-sans text-sm font-semibold tracking-widest uppercase">
                      <span>Explore</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 bg-[#1A1040] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6">Your Journey to <span className="text-gold-gradient italic">Clarity</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto rounded-full opacity-50"></div>
          </AnimatedSection>

          <div className="relative">
            {/* Elegant Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent -z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative z-10">
              {[
                { step: "01", title: "Share Details", desc: "Enter your precise birth date, time, and location." },
                { step: "02", title: "Generate Chart", desc: "Receive your personalized Vedic Kundali instantly." },
                { step: "03", title: "Gain Insights", desc: "Book a consultation for deeper spiritual guidance." }
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.2} className="text-center group">
                  <div className="w-24 h-24 mx-auto bg-[#1A1040] border border-[#C9A84C]/30 rounded-full flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:scale-110">
                    {/* Glow behind step number */}
                    <div className="absolute inset-0 bg-[#C9A84C] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <span className="text-3xl font-serif font-bold text-gold-gradient">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#E8E4F0] mb-4">{item.title}</h3>
                  <p className="text-[#E8E4F0]/60 font-sans max-w-xs mx-auto text-lg">{item.desc}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT ACHARYA (Teaser) */}
      <section className="py-24 bg-[#0D0B1A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[100px] pointer-events-none -mt-32 -mr-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7e22ce]/10 rounded-full blur-[80px] pointer-events-none -mb-20 -ml-20"></div>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center relative z-10">
              <AnimatedSection direction="left" className="w-full md:w-5/12 flex-shrink-0">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#1A1628] to-[#0D0B1A] rounded-3xl border border-[#C9A84C]/20 flex flex-col items-center justify-center text-[#E8E4F0]/30 shadow-2xl overflow-hidden relative group">
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 border-[0.5px] border-white/5 rounded-3xl pointer-events-none m-2"></div>
                  <span className="font-sans text-sm tracking-[0.3em] uppercase mb-4">Portrait</span>
                  <span className="text-8xl opacity-10 group-hover:scale-110 transition-transform duration-700 font-serif">ॐ</span>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.2} className="w-full md:w-7/12">
                <div className="inline-flex items-center gap-2 bg-[#1A1628]/80 backdrop-blur-sm border border-[#C9A84C]/20 px-4 py-2 rounded-full mb-8">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-[#C9A84C] text-xs font-sans tracking-[0.2em] uppercase font-medium">Ayodhya Dham</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-4 leading-tight">
                  Acharya Shri <br className="hidden md:block"/>
                  <span className="text-gold-gradient">Ravindra Shukla Shastri</span>
                </h2>

                <h3 className="text-xl text-[#E8E4F0]/50 font-serif italic mb-8">Expert Vedic Astrologer</h3>

                <p className="text-[#E8E4F0]/80 font-sans text-lg mb-10 leading-relaxed font-light">
                  Steeped in the ancient wisdom of Vedic scriptures, Acharya Ji provides profound insights into life&apos;s challenges. His holistic approach combines deep astrological knowledge with spiritual remedies to guide you towards peace and prosperity.
                </p>

                <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 border border-[#C9A84C]/50 text-[#E8E4F0] rounded-full font-sans font-bold hover:bg-[#C9A84C] hover:text-[#0D0B1A] hover:border-[#C9A84C] transition-all duration-300 active:scale-95 group">
                  Learn More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-[#1A1040]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6">Divine Words of <span className="text-gold-gradient italic">Trust</span></h2>
            <p className="text-[#E8E4F0]/60 font-sans max-w-2xl mx-auto text-lg">Read the experiences of those who have found guidance and clarity.</p>
          </AnimatedSection>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* 7. FREE KUNDALI CTA BANNER */}
      <section className="relative py-32 overflow-hidden border-t border-[#C9A84C]/10">
        {/* Deep, rich background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1628] via-[#0D0B1A] to-[#0D0B1A] z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen z-0 animate-[pulse_6s_ease-in-out_infinite]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16 glass-panel p-8 md:p-12 rounded-[2.5rem]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6 leading-tight">
              Unlock the Secrets of <br />
              <span className="text-gold-gradient italic">Your Stars</span>
            </h2>
            <p className="text-lg md:text-xl text-[#E8E4F0]/70 font-sans max-w-2xl mx-auto mb-10 font-light">
              Enter your birth details below to generate an instant, highly accurate Vedic Kundali analysis.
            </p>
            <KundaliCTAForm />
          </AnimatedSection>
        </div>
      </section>

    </>
  );
}