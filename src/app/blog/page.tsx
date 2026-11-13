"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, X, Sparkles, MessageCircle } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  sections: { heading: string; paragraphs: string[] }[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-saturns-return-sade-sati",
    title: "Understanding Saturn's Sade Sati: Karmic Discipline, Myths & Vedic Remedies",
    excerpt: "Discover the authentic Parashari meaning of the 7.5-year transit of Shani (Saturn) over your natal Moon and how to transform its discipline into lasting success.",
    date: "October 24, 2026",
    readTime: "6 Min Read",
    category: "Planetary Transits",
    author: "Acharya Shri Ravindra Shukla Shatri",
    sections: [
      {
        heading: "1. What Is Shani Sade Sati in Classical Parashari Jyotish?",
        paragraphs: [
          "In Vedic Astrology, Sade Sati refers to the seven-and-a-half-year period during which transiting Saturn (Shani Deva) moves through the 12th, 1st (Janma Rashi), and 2nd houses relative to your natal Moon sign (Chandra Rashi). Because Saturn takes approximately 2.5 years to traverse a single zodiac sign, its passage across these three contiguous signs spans 7.5 years.",
          "Contrary to popular fear-mongering, Shani is not a malevolent force; in the Brihat Parashara Hora Shastra, Saturn is revered as the Dharmaraja—the impartial magistrate of Karma. When Saturn transits near the Moon, it removes illusions, tests emotional resilience, and rewards disciplined effort, ethical integrity, and humility.",
        ],
      },
      {
        heading: "2. The Three Phases (Dhaiyas) of Sade Sati",
        paragraphs: [
          "The First Phase (Rising Phase — 12th from Moon) prompts restructuring of finances, sleep patterns, and long-term obligations while clearing out unproductive habits.",
          "The Second Phase (Peak Phase — 1st Over Natal Moon) directly influences mental outlook, responsibility, and physical stamina, demanding patience and structured daily routines.",
          "The Third Phase (Setting Phase — 2nd from Moon) consolidates lessons around family responsibilities, speech, and wealth preservation, often leaving the native wiser and more established before Saturn exits.",
        ],
      },
      {
        heading: "3. Authentic Ayodhya Dham Vedic Remedies (Upayas)",
        paragraphs: [
          "Rather than purchasing expensive gemstones without checking whether Saturn is a functional benefic (Yogakaraka for Taurus and Libra Ascendants), classical texts recommend reciting the Dasharatha Krit Shani Stotra and Hanuman Chalisa on Saturdays, lighting a sesame-oil lamp beneath a Peepal tree at sunset, and practicing selfless service (Seva) toward elders and laborers.",
        ],
      },
    ],
  },
  {
    slug: "significance-of-navagrahas",
    title: "The Nine Celestial Grahas (Navagrahas): How They Shape Your Janam Kundali",
    excerpt: "Learn how the seven physical planets and the two lunar nodes (Rahu and Ketu) govern specific facets of consciousness, career, and health.",
    date: "October 12, 2026",
    readTime: "5 Min Read",
    category: "Astrology Basics",
    author: "Acharya Shri Ravindra Shukla Shatri",
    sections: [
      {
        heading: "1. Graha Means 'That Which Seizes or Influences Consciousness'",
        paragraphs: [
          "In Sanskrit, the word Graha denotes a cosmic force receptor that reflects specific karmic tendencies (Samskaras) at the moment of birth. The Navagrahas comprise Surya (Sun — Soul & Authority), Chandra (Moon — Mind & Emotion), Mangal (Mars — Energy & Courage), Budha (Mercury — Intellect & Speech), Guru (Jupiter — Wisdom & Grace), Shukra (Venus — Harmony & Devotion), Shani (Saturn — Discipline & Longevity), and the Chaya Grahas Rahu and Ketu.",
        ],
      },
      {
        heading: "2. Evaluating Strength: Rashi, Navamsha (D-9) & Shadbala",
        paragraphs: [
          "A planet's result in your life is never judged by its Rashi sign alone. A planet that appears exalted in the Lagna chart (D-1) but debilitated in the Navamsha chart (D-9) loses much of its inner fruit-giving capacity. Conversely, a planet gaining Vargottama status (occupying the exact same sign in both D-1 and D-9) acts with extraordinary stability throughout its Vimshottari Mahadasha.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-right-gemstone",
    title: "How to Choose the Right Astrological Gemstone (Ratna) Using Trikona Lords",
    excerpt: "A scientific Parashari guide to selecting life-supporting gemstones (Lagna, 5th, and 9th Lords) while avoiding gemstones of functional malefics.",
    date: "September 28, 2026",
    readTime: "7 Min Read",
    category: "Vedic Remedies",
    author: "Acharya Shri Ravindra Shukla Shatri",
    sections: [
      {
        heading: "1. Why Wearing a Gemstone by Moon Sign Alone Is Dangerous",
        paragraphs: [
          "One of the most common mistakes in popular astrology is prescribing a gemstone solely because a planet is weak in degree. In Parashari Jyotish, gemstones act as photonic amplifiers. If a planet rules Dusthana houses (the 6th, 8th, or 12th house from your Ascendant), amplifying its energy with a gemstone can intensify obstacles, health friction, or litigation.",
        ],
      },
      {
        heading: "2. The Golden Rule: Strengthen the Trikona Lords (1st, 5th & 9th Houses)",
        paragraphs: [
          "Authentic Ratna Shastra prescribes gemstones exclusively for functional benefics—primarily the Lord of the 1st House (Life Stone), the Lord of the 5th House (Intelligence & Purva Punya Stone), and the Lord of the 9th House (Bhagya / Fortune Stone), after verifying their placement in the Navamsha and Shadbala tables.",
        ],
      },
    ],
  },
  {
    slug: "mangal-dosha-myths-and-realities",
    title: "Mangal Dosha (Kuja Dosha) in Kundali Matching: Classical Truths & Cancellations",
    excerpt: "Demystifying Manglik Dosha in marriage compatibility—why over 60% of technical Manglik placements are naturally cancelled in the birth chart.",
    date: "September 15, 2026",
    readTime: "6 Min Read",
    category: "Kundali Matching",
    author: "Acharya Shri Ravindra Shukla Shatri",
    sections: [
      {
        heading: "1. How Mangal Dosha Forms in a Birth Chart",
        paragraphs: [
          "Mangal Dosha (Kuja Dosha) occurs when Mars occupies the 1st, 2nd, 4th, 7th, 8th, or 12th house from the Ascendant (Lagna). Because Mars represents fiery assertion and drive, its direct aspect on the 7th house of marriage or the 8th house of marital longevity requires careful balancing between partners.",
        ],
      },
      {
        heading: "2. Classical Parashari Cancellations (Kuja Dosha Parihara)",
        paragraphs: [
          "Classical texts clearly state that Manglik placement does not automatically forbid a marriage. Mangal Dosha is naturally mitigated when: (1) Mars is in its Own Sign (Aries or Scorpio) or Exalted (Capricorn); (2) the Ascendant is Cancer or Leo, where Mars is the auspicious Yogakaraka; (3) Mars is aspected or joined by benefic Jupiter; or (4) both partners share comparable Mars strength.",
        ],
      },
    ],
  },
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          Vedic Insights &amp; Shastra Blog
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Explore authoritative articles on Parashari Jyotish, planetary remedies, and sacred Vedic wisdom written by Acharya Shri Ravindra Shukla Shatri.
        </p>
      </div>

      {selectedPost ? (
        <article className="bg-[#1A1628] border border-[#C9A84C]/35 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-[#C9A84C]/20 pb-6">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="text-sm font-bold text-[#C9A84C] hover:underline cursor-pointer"
            >
              ← Back to All Articles
            </button>
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              aria-label="Close article"
              className="p-2 rounded-full bg-[#0D0B1A] text-[#E8E4F0] hover:text-[#C9A84C] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#C9A84C]/15 text-[#C9A84C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {selectedPost.category}
            </span>
            <span className="text-xs text-[#E8E4F0]/65">{selectedPost.date}</span>
            <span className="text-xs text-[#E8E4F0]/65">• {selectedPost.readTime}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E8E4F0] mb-3">
            {selectedPost.title}
          </h2>
          <p className="text-sm text-[#C9A84C] font-medium mb-8">
            By {selectedPost.author} • Ayodhya Dham
          </p>

          <div className="space-y-8 text-[#E8E4F0]/85 text-lg leading-relaxed">
            {selectedPost.sections.map((sec, idx) => (
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
                <span>Personal Kundali Check</span>
              </div>
              <div className="text-lg font-serif font-bold text-[#E8E4F0]">
                Consult Acharya Shri Ravindra Shukla Shatri
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/kundali"
                className="px-5 py-2.5 bg-[#C9A84C] text-[#0D0B1A] font-bold rounded-full text-xs hover:bg-[#d9b85c] transition-colors"
              >
                Free Kundali
              </Link>
              <a
                href="https://wa.me/918009124454?text=Namaste%20Acharya%20Shri%20Ravindra%20Shukla%20Shatri%20Ji%2C%20I%20read%20your%20article%20on%20JyotishGuru%20and%20would%20like%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#C9A84C]/50 text-[#E8E4F0] font-semibold rounded-full text-xs hover:bg-white/5 transition-colors"
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
            <article
              key={post.slug}
              className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-2xl overflow-hidden hover:border-[#C9A84C]/60 transition-all duration-300 group shadow-lg flex flex-col justify-between p-8"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-[#C9A84C]/15 text-[#C9A84C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[#E8E4F0]/65 text-xs flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C9A84C]" />
                    {post.readTime}
                  </span>
                  <span className="text-[#E8E4F0]/60 text-xs">• {post.date}</span>
                </div>
                <h2
                  onClick={() => setSelectedPost(post)}
                  className="text-2xl md:text-3xl font-serif font-bold text-[#E8E4F0] mb-4 group-hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  {post.title}
                </h2>
                <p className="text-[#E8E4F0]/75 mb-8 leading-relaxed text-sm">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-[#C9A84C]/15 pt-6 flex items-center justify-between">
                <span className="text-xs text-[#E8E4F0]/70">{post.author}</span>
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-2 text-[#C9A84C] font-bold text-sm hover:underline cursor-pointer"
                >
                  <span>Read Full Article</span>
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
