import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Vedic Astrology Insights & Shastra Blog | JyotishGuru",
  description: "Read authoritative articles, planetary transit guides, and teachings on Parashari Vedic Astrology by Acharya Shri Ravindra Shukla Shatri.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Vedic Astrology Insights & Shastra Blog | JyotishGuru",
    description: "Read the latest articles, insights, and teachings on Vedic Astrology by Acharya Shri Ravindra Shukla Shatri.",
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
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
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#E8E4F0] mb-4 group-hover:text-[#C9A84C] transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-[#E8E4F0]/75 mb-8 leading-relaxed text-sm">
                {post.excerpt}
              </p>
            </div>

            <div className="border-t border-[#C9A84C]/15 pt-6 flex items-center justify-between">
              <span className="text-xs text-[#E8E4F0]/70">{post.author}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-[#C9A84C] font-bold text-sm hover:underline"
              >
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
