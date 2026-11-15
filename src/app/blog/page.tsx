"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, X, Sparkles, MessageCircle } from "lucide-react";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";

interface BlogPost {
  slug: string;
  enTitle: string;
  hiTitle: string;
  enExcerpt: string;
  hiExcerpt: string;
  date: string;
  readTime: string;
  enCategory: string;
  hiCategory: string;
  enSections: { heading: string; paragraphs: string[] }[];
  hiSections: { heading: string; paragraphs: string[] }[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-saturns-return-sade-sati",
    enTitle: "Understanding Saturn's Sade Sati: Karmic Discipline, Myths & Vedic Remedies",
    hiTitle: "शनि की साढ़ेसाती: कर्म अनुशासन, भ्रांतियां एवं प्रामाणिक वैदिक उपाय",
    enExcerpt: "Discover the authentic Parashari meaning of the 7.5-year transit of Shani (Saturn) over your natal Moon and how to transform its discipline into lasting success.",
    hiExcerpt: "जन्म चंद्रमा पर शनि देव के साढ़े सात वर्षीय गोचर का वास्तविक पाराशरी अर्थ और इसे स्थायी सफलता में बदलने के प्रामाणिक उपाय जानें।",
    date: "October 24, 2026",
    readTime: "6 Min Read",
    enCategory: "Planetary Transits",
    hiCategory: "ग्रह गोचर",
    enSections: [
      {
        heading: "1. What Is Shani Sade Sati in Classical Parashari Jyotish?",
        paragraphs: [
          "In Vedic Astrology, Sade Sati refers to the seven-and-a-half-year period during which transiting Saturn (Shani Deva) moves through the 12th, 1st (Janma Rashi), and 2nd houses relative to your natal Moon sign (Chandra Rashi).",
          "Contrary to popular fear-mongering, Shani is not a malevolent force; in the Brihat Parashara Hora Shastra, Saturn is revered as the Dharmaraja—the impartial magistrate of Karma.",
        ],
      },
      {
        heading: "2. Authentic Ayodhya Dham Vedic Remedies (Upayas)",
        paragraphs: [
          "Classical texts recommend reciting the Dasharatha Krit Shani Stotra and Hanuman Chalisa on Saturdays, lighting a sesame-oil lamp beneath a Peepal tree at sunset, and practicing selfless service (Seva).",
        ],
      },
    ],
    hiSections: [
      {
        heading: "1. शास्त्रीय पाराशरी ज्योतिष में शनि साढ़ेसाती क्या है?",
        paragraphs: [
          "वैदिक ज्योतिष में जब गोचरवश शनि देव आपकी जन्म चंद्र राशि से द्वादश (12वें), प्रथम (जन्म राशि) और द्वितीय (2रे) भाव से गुजरते हैं, तो इस 7.5 वर्ष की अवधि को साढ़ेसाती कहा जाता है।",
          "लोकप्रचलित भय के विपरीत शनि देव क्रूर नहीं अपितु धर्मराज और कर्मफल दाता हैं, जो धैर्य, सत्यनिष्ठा और अनुशासन को पुरस्कृत करते हैं।",
        ],
      },
      {
        heading: "2. प्रामाणिक अयोध्या धाम वैदिक उपाय",
        paragraphs: [
          "शनिवार को दशरथकृत शनि स्तोत्र एवं श्री हनुमान चालीसा का पाठ करें, संध्या काल में पीपल वृक्ष के नीचे तिल के तेल का दीपक जलाएं और असहाय जनों की सेवा करें।",
        ],
      },
    ],
  },
  {
    slug: "significance-of-navagrahas",
    enTitle: "The Nine Celestial Grahas (Navagrahas): How They Shape Your Janam Kundali",
    hiTitle: "नवग्रह रहस्य: आपकी जन्म कुंडली और जीवन पथ पर 9 ग्रहों का प्रभाव",
    enExcerpt: "Learn how the seven physical planets and the two lunar nodes (Rahu and Ketu) govern specific facets of consciousness, career, and health.",
    hiExcerpt: "जानिए किस प्रकार सप्त ग्रह और राहु-केतु आपकी चेतना, करियर, स्वास्थ्य और प्रारब्ध को संचालित करते हैं।",
    date: "October 12, 2026",
    readTime: "5 Min Read",
    enCategory: "Astrology Basics",
    hiCategory: "ज्योतिष सिद्धांत",
    enSections: [
      {
        heading: "1. Evaluating Strength: Rashi, Navamsha (D-9) & Shadbala",
        paragraphs: [
          "A planet's result in your life is never judged by its Rashi sign alone. A planet gaining Vargottama status (occupying the exact same sign in both D-1 and D-9) acts with extraordinary stability throughout its Vimshottari Mahadasha.",
        ],
      },
    ],
    hiSections: [
      {
        heading: "1. ग्रह बल का मूल्यांकन: लग्न (D-1), नवमांश (D-9) एवं षड्बल",
        paragraphs: [
          "किसी भी ग्रह का फल केवल लग्न कुंडली से नहीं देखा जाता। यदि कोई ग्रह लग्न (D-1) और नवमांश (D-9) दोनों में एक ही राशि में स्थित हो (वर्गोत्तम), तो वह अपनी महादशा में अत्यंत श्रेष्ठ फल प्रदान करता है।",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-right-gemstone",
    enTitle: "How to Choose the Right Astrological Gemstone (Ratna) Using Trikona Lords",
    hiTitle: "सही ज्योतिषीय रत्न (Ratna) का चयन कैसे करें: त्रिकोण भावेश का सिद्धांत",
    enExcerpt: "A scientific Parashari guide to selecting life-supporting gemstones (Lagna, 5th, and 9th Lords) while avoiding gemstones of functional malefics.",
    hiExcerpt: "लग्न, पंचम और नवम (त्रिकोण) स्वामियों के अनुसार जीवन-सहायक रत्न चुनने की शास्त्रीय विधि।",
    date: "September 28, 2026",
    readTime: "7 Min Read",
    enCategory: "Vedic Remedies",
    hiCategory: "वैदिक रत्न विज्ञान",
    enSections: [
      {
        heading: "1. The Golden Rule: Strengthen the Trikona Lords (1st, 5th & 9th Houses)",
        paragraphs: [
          "Authentic Ratna Shastra prescribes gemstones exclusively for functional benefics—primarily the Lord of the 1st House (Life Stone), the 5th House (Intelligence Stone), and the 9th House (Bhagya / Fortune Stone).",
        ],
      },
    ],
    hiSections: [
      {
        heading: "1. स्वर्णिम नियम: केवल त्रिकोण स्वामियों (1, 5, 9 भाव) का रत्न धारण करें",
        paragraphs: [
          "प्रामाणिक रत्न शास्त्र के अनुसार रत्न केवल योगकारक एवं त्रिकोण स्वामियों—लग्नेश (जीवन रत्न), पंचमेश (विद्या एवं पूर्वपुण्य रत्न) तथा नवमेश (भाग्य रत्न)—के लिए ही धारण करना चाहिए।",
        ],
      },
    ],
  },
  {
    slug: "mangal-dosha-myths-and-realities",
    enTitle: "Mangal Dosha (Kuja Dosha) in Kundali Matching: Classical Truths & Cancellations",
    hiTitle: "कुंडली मिलान में मांगलिक दोष (कुज दोष): शास्त्रीय सत्य एवं परिहार",
    enExcerpt: "Demystifying Manglik Dosha in marriage compatibility—why over 60% of technical Manglik placements are naturally cancelled in the birth chart.",
    hiExcerpt: "विवाह मिलान में मांगलिक दोष का वास्तविक सच—क्यों 60% से अधिक कुंडलियों में मंगल दोष का स्वतः परिहार हो जाता है।",
    date: "September 15, 2026",
    readTime: "6 Min Read",
    enCategory: "Kundali Matching",
    hiCategory: "कुंडली मिलान",
    enSections: [
      {
        heading: "1. Classical Parashari Cancellations (Kuja Dosha Parihara)",
        paragraphs: [
          "Mangal Dosha is naturally mitigated when Mars is in its Own Sign (Aries or Scorpio), Exalted (Capricorn), aspected by benefic Jupiter, or when both partners share comparable Mars strength.",
        ],
      },
    ],
    hiSections: [
      {
        heading: "1. शास्त्रीय कुज दोष परिहार के नियम",
        paragraphs: [
          "जब मंगल अपनी स्वराशि (मेष या वृश्चिक), उच्च राशि (मकर) में हो, या शुभ बृहस्पति से दृष्ट/युत हो, अथवा वर-वधू दोनों की कुंडली में समान मंगल स्थिति हो, तो मांगलिक दोष स्वतः निष्प्रभावी हो जाता है।",
        ],
      },
    ],
  },
];

export default function BlogPage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          {isHi ? "वैदिक ज्योतिष ज्ञान एवं शास्त्र ब्लॉग" : "Vedic Insights & Shastra Blog"}
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          {isHi
            ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री द्वारा लिखित पाराशरी ज्योतिष, ग्रह गोचर एवं वैदिक उपायों पर प्रामाणिक लेख।"
            : "Explore authoritative articles on Parashari Jyotish, planetary remedies, and sacred Vedic wisdom written by Acharya Shri Ravindra Shukla Shatri."}
        </p>
      </div>

      {selectedPost ? (
        <article className="bg-[#1A1628] border border-[#C9A84C]/35 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-[#C9A84C]/20 pb-6">
            <button type="button" onClick={() => setSelectedPost(null)} className="text-sm font-bold text-[#C9A84C] hover:underline cursor-pointer">
              {isHi ? "← सभी लेखों पर वापस जाएं" : "← Back to All Articles"}
            </button>
            <button type="button" onClick={() => setSelectedPost(null)} aria-label="Close article" className="p-2 rounded-full bg-[#0D0B1A] text-[#E8E4F0] hover:text-[#C9A84C] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#C9A84C]/15 text-[#C9A84C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {isHi ? selectedPost.hiCategory : selectedPost.enCategory}
            </span>
            <span className="text-xs text-[#E8E4F0]/65">{selectedPost.date}</span>
            <span className="text-xs text-[#E8E4F0]/65">• {selectedPost.readTime}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E8E4F0] mb-3">
            {isHi ? selectedPost.hiTitle : selectedPost.enTitle}
          </h2>
          <p className="text-sm text-[#C9A84C] font-medium mb-8">
            {isHi ? "लेखक: आचार्य श्री रविन्द्र शुक्ल शास्त्री • अयोध्या धाम" : "By Acharya Shri Ravindra Shukla Shatri • Ayodhya Dham"}
          </p>

          <div className="space-y-8 text-[#E8E4F0]/85 text-lg leading-relaxed">
            {(isHi ? selectedPost.hiSections : selectedPost.enSections).map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h3 className="text-2xl font-serif font-bold text-[#C9A84C]">{sec.heading}</h3>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#0D0B1A] border border-[#C9A84C]/35 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isHi ? "व्यक्तिगत कुंडली परीक्षण" : "Personal Kundali Check"}</span>
              </div>
              <div className="text-lg font-serif font-bold text-[#E8E4F0]">
                {isHi ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री से परामर्श लें" : "Consult Acharya Shri Ravindra Shukla Shatri"}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/kundali" className="px-5 py-2.5 bg-[#C9A84C] text-[#0D0B1A] font-bold rounded-full text-xs">
                {isHi ? "निःशुल्क कुंडली" : "Free Kundali"}
              </Link>
              <a
                href="https://wa.me/918009124454?text=Namaste%20Acharya%20Shri%20Ravindra%20Shukla%20Shatri%20Ji%2C%20I%20read%20your%20article%20on%20JyotishGuru%20and%20would%20like%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#C9A84C]/50 text-[#E8E4F0] font-semibold rounded-full text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </article>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl overflow-hidden hover:border-[#C9A84C]/60 transition-all duration-300 group shadow-lg flex flex-col justify-between p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-[#C9A84C]/15 text-[#C9A84C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {isHi ? post.hiCategory : post.enCategory}
                  </span>
                  <span className="text-[#E8E4F0]/65 text-xs flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C9A84C]" />
                    {post.readTime}
                  </span>
                  <span className="text-[#E8E4F0]/60 text-xs">• {post.date}</span>
                </div>
                <h2 onClick={() => setSelectedPost(post)} className="text-2xl md:text-3xl font-serif font-bold text-[#E8E4F0] mb-4 group-hover:text-[#C9A84C] transition-colors cursor-pointer">
                  {isHi ? post.hiTitle : post.enTitle}
                </h2>
                <p className="text-[#E8E4F0]/75 mb-8 leading-relaxed text-sm">
                  {isHi ? post.hiExcerpt : post.enExcerpt}
                </p>
              </div>

              <div className="border-t border-[#C9A84C]/15 pt-6 flex items-center justify-between">
                <span className="text-xs text-[#E8E4F0]/70">
                  {isHi ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री" : "Acharya Shri Ravindra Shukla Shatri"}
                </span>
                <button type="button" onClick={() => setSelectedPost(post)} className="inline-flex items-center gap-2 text-[#C9A84C] font-bold text-sm hover:underline cursor-pointer">
                  <span>{isHi ? "पूरा लेख पढ़ें" : "Read Full Article"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
