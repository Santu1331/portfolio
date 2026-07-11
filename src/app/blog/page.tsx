/**
 * Blog index page — lists all published posts from /posts/*.md.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import blogsData from "../../../data/blogs.json";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on startups, software engineering, and building in India.",
};

export default async function BlogPage() {
  const mdPosts = await getAllPosts();
  // Merge with JSON data for featured flags
  const jsonMeta = new Map(blogsData.map((b) => [b.slug, b]));

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>

        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">Blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Writing & Thoughts</h1>
          <p className="text-gray-400">
            Notes on startups, full-stack development, and building products in India.
          </p>
        </div>

        {mdPosts.length === 0 ? (
          <div className="glass rounded-2xl p-10 border border-dashed border-white/10 text-center">
            <p className="text-gray-500 mb-2">No posts yet.</p>
            <p className="text-sm text-gray-600">
              Add <code className="text-orange-400">.md</code> files to the{" "}
              <code className="text-orange-400">/posts/</code> directory with frontmatter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {mdPosts.map((post) => {
              const meta = jsonMeta.get(post.slug);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block glass rounded-2xl p-6 border border-white/5 hover:border-orange-500/20 card-hover group transition-all"
                >
                  {meta?.featured && (
                    <span className="text-xs text-orange-500 font-medium mb-2 block">Featured</span>
                  )}
                  <h2 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    {post.tags.map((t) => (
                      <span key={t} className="flex items-center gap-1"><Tag className="w-3 h-3" /> {t}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
