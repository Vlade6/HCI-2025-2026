// webapp/app/lib/strapi.ts
import axios from "axios";

const STRAPI_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") || "http://localhost:1337";
const STRAPI_API_URL = `${STRAPI_BASE}/api`;

export async function fetchBlogPosts() {
  try {
    const res = await axios.get(`${STRAPI_API_URL}/blog-posts`);
    return res.data.data ?? [];
  } catch (e) {
    console.error("fetchBlogPosts error:", e);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string) {
  try {
    const res = await axios.get(
      `${STRAPI_API_URL}/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}`
    );
    return res.data.data?.[0] ?? null;
  } catch (e) {
    console.error("fetchBlogPostBySlug error:", e);
    return null;
  }
}
