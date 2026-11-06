import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | JyotishGuru Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | JyotishGuru Blog`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.modifiedDate
      ? new Date(post.modifiedDate).toISOString()
      : new Date(post.date).toISOString(),
    url: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "JyotishGuru",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#E8E4F0] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-[#E8E4F0]/50 text-sm">{post.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#E8E4F0] mb-6 leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-[#E8E4F0]/80 italic border-l-4 border-[#C9A84C] pl-6 mb-8">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 border-t border-b border-[#C9A84C]/20 py-4">
          <div className="w-12 h-12 rounded-full bg-[#1A1628] flex items-center justify-center border border-[#C9A84C]/50 text-[#C9A84C] font-serif font-bold text-xl">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-[#E8E4F0] font-semibold">{post.author}</p>
            <p className="text-[#E8E4F0]/50 text-sm">Vedic Astrologer</p>
          </div>
        </div>
      </div>

      <div
        className="prose prose-lg prose-invert max-w-none
          prose-headings:font-serif prose-headings:text-[#C9A84C] prose-headings:font-bold
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-[#E8E4F0]/80 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline
          prose-ul:text-[#E8E4F0]/80 prose-li:mb-2
          prose-strong:text-[#E8E4F0]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
