import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Vedic Astrology Blog | JyotishGuru",
  description: "Read the latest articles, insights, and teachings on Vedic Astrology by Acharya Shri Pankaj Shukla.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Vedic Astrology Blog | JyotishGuru",
    description: "Read the latest articles, insights, and teachings on Vedic Astrology by Acharya Shri Pankaj Shukla.",
    url: `${SITE_URL}/blog`,
  },

};

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
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#C9A84C] font-semibold flex items-center gap-2 hover:text-[#E8E4F0] transition-colors"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}