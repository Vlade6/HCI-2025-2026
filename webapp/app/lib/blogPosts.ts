// webapp/app/lib/blogPosts.ts

export type BlogTextNode = { type: string; text: string };

export type BlogContentBlock = {
  type: string;
  children?: BlogTextNode[];
};

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
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;

  // NEW FIELDS (on the post itself)
  videoUrl?: string;
  codeSnippet?: string;
  codeLanguage?: string;

  // Cover image (separate object)
  coverImage?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
};


// IMPORTANT:
// .env.local MUST be inside /webapp folder
// NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
const STRAPI_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") || "http://localhost:1337";

type StrapiListResponse<T> = { data?: T[] };

function log(...args: any[]) {
  // set to false if you don’t want logs
  const DEBUG = true;
  if (DEBUG) console.log("[blogPosts]", ...args);
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const url = `${STRAPI_BASE}/api/blog-posts?populate=coverImage`;

  try {
    log("STRAPI_BASE:", STRAPI_BASE);
    log("fetchBlogPosts URL:", url);

    const res = await fetch(url, { cache: "no-store" });

    log("fetchBlogPosts STATUS:", res.status);

    if (!res.ok) {
      console.error("Failed to fetch blog posts:", res.status, url);
      return [];
    }

    const json = (await res.json()) as StrapiListResponse<BlogPost>;
    return (json?.data ?? []) as BlogPost[];
  } catch (err) {
    console.error("fetchBlogPosts ERROR:", err, url);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const safeSlug = encodeURIComponent(slug);
  const url = `${STRAPI_BASE}/api/blog-posts?filters[slug][$eq]=${safeSlug}&populate=coverImage`;

  try {
    log("STRAPI_BASE:", STRAPI_BASE);
    log("fetchBlogPostBySlug slug:", slug);
    log("fetchBlogPostBySlug URL:", url);

    const res = await fetch(url, { cache: "no-store" });

    log("fetchBlogPostBySlug STATUS:", res.status);

    if (!res.ok) {
      console.error("Failed to fetch blog post by slug:", res.status, url);
      return null;
    }

    const json = (await res.json()) as StrapiListResponse<BlogPost>;
    const post = json?.data?.[0] ?? null;

    log("fetchBlogPostBySlug RESULT:", post ? { id: post.id, slug: post.slug } : null);

    return post as BlogPost | null;
  } catch (err) {
    console.error("fetchBlogPostBySlug ERROR:", err, url);
    return null;
  }
}
