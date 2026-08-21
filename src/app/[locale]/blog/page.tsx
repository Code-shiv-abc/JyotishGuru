import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Astrology Blog",
  description: "Read the latest articles, insights, and teachings on Vedic Astrology by Acharya Shri Ravindra Shukla Shastri.",
};

const blogPosts = [
  {
    title: "Understanding Saturn's Return (Sade Sati)",
    excerpt: "Discover the true meaning and impact of the seven-and-a-half-year cycle of Saturn and how it shapes your karmic journey.",
    date: "March 15, 2024",
    category: "Astrology Basics"
  },
  {
    title: "The Significance of Navagrahas",
    excerpt: "Learn about the nine celestial bodies in Vedic Astrology and their profound influence on our daily lives and decision making.",
    date: "February 28, 2024",
    category: "Planetary Influences"
  },
  {
    title: "How to Choose the Right Gemstone",
    excerpt: "A comprehensive guide to selecting astrological gemstones based on your birth chart and planetary alignments.",
    date: "February 10, 2024",
    category: "Vedic Remedies"
  },
  {
    title: "Mangal Dosha: Myths and Realities",
    excerpt: "Demystifying the concept of Mangal Dosha (Kuja Dosha) in Kundali matching and exploring practical remedies.",
    date: "January 22, 2024",
    category: "Kundali Matching"
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          Vedic Insights Blog
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Explore articles on astrology, spirituality, and ancient Vedic wisdom written by Acharya Ji.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {blogPosts.map((post, idx) => (
          <article
            key={idx}
            className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl overflow-hidden hover:border-[#C9A84C]/50 transition-all duration-300 group shadow-lg"
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-[#E8E4F0]/50 text-sm">
                  {post.date}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#E8E4F0] mb-4 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-[#E8E4F0]/70 mb-8 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="border-t border-[#C9A84C]/10 pt-6">
                <button className="text-[#C9A84C] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Article
                  <span>→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="bg-[#0D0B1A] border-2 border-[#C9A84C] text-[#C9A84C] px-8 py-3 rounded-full font-semibold hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors">
          Load More Articles
        </button>
      </div>
    </div>
  );
}