export type BlogTextNode = { type: string; text: string };
export type BlogContentBlock = { type: string; children?: BlogTextNode[] };

export type BlogPost = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: BlogContentBlock[];
  category?: string;
  tags?: string[];
  date?: string;
  publishedAt?: string;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const url = `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;

  const json = await res.json();
  return (json?.data?.[0] ?? null) as BlogPost | null;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${STRAPI_URL}/api/blog-posts`, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return (json?.data ?? []) as BlogPost[];
}
