// src/lib/blog-data.ts
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export const BLOG_POSTS: BlogPost[] = [
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
