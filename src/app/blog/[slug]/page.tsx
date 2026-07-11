/**
 * Blog post detail page — renders markdown as HTML.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-400 text-lg mb-4">{post.excerpt}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>
        </div>

        <hr className="border-white/5 mb-10" />

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
