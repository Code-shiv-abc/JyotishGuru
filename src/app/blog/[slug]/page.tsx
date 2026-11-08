import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | JyotishGuru`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[#C9A84C] hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Vedic Articles</span>
      </Link>

      <header className="mb-12 border-b border-[#C9A84C]/20 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-[#C9A84C]/15 text-[#C9A84C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-[#E8E4F0]/65">{post.date}</span>
          <span className="text-xs text-[#E8E4F0]/65">• {post.readTime}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#E8E4F0] leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-[#C9A84C] font-medium">
          Written by {post.author} • Ayodhya Dham
        </p>
      </header>

      <div className="space-y-8 text-[#E8E4F0]/85 text-lg leading-relaxed">
        {post.sections.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C]">{sec.heading}</h2>
            {sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </section>
        ))}
      </div>

      {/* Article Footer Conversion CTA */}
      <div className="mt-14 p-8 bg-[#1A1628] border border-[#C9A84C]/35 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C9A84C] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Check Your Personal Birth Chart</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#E8E4F0]">
            See How These Planetary Yogas Apply to Your Kundali
          </h3>
          <p className="text-sm text-[#E8E4F0]/75">
            Generate your free Parashari Janam Kundali or schedule a 1-on-1 consultation with Acharya Shri Ravindra Shukla Shatri.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/kundali"
            className="px-6 py-3.5 bg-[#C9A84C] text-[#0D0B1A] font-bold rounded-full text-sm text-center hover:bg-[#d9b85c] transition-colors"
          >
            Generate Free Kundali
          </Link>
          <a
            href="https://wa.me/918009124454?text=Namaste%20Acharya%20Shri%20Ravindra%20Shukla%20Shatri%20Ji%2C%20I%20read%20your%20article%20on%20JyotishGuru%20and%20would%20like%20to%20book%20a%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#C9A84C]/50 text-[#E8E4F0] font-semibold rounded-full text-sm text-center hover:bg-white/5 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#C9A84C]" />
            <span>WhatsApp Acharya Ji</span>
          </a>
        </div>
      </div>
    </article>
  );
}
