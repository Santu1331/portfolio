import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "posts");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  content: string;
  cover?: string;
  published: boolean;
}

/** Get all blog posts from /posts directory */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(postsDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const processed = await remark().use(html).process(content);

      return {
        slug: file.replace(".md", ""),
        title: data.title || "Untitled",
        date: data.date || "",
        excerpt: data.excerpt || "",
        readTime: data.readTime || "3 min read",
        tags: data.tags || [],
        content: processed.toString(),
        cover: data.cover || null,
        published: data.published !== false,
      } as BlogPost;
    })
  );

  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Get single post by slug */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "",
    excerpt: data.excerpt || "",
    readTime: data.readTime || "3 min read",
    tags: data.tags || [],
    content: processed.toString(),
    cover: data.cover || null,
    published: data.published !== false,
  };
}
