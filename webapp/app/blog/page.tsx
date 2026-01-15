// webapp/app/blog/page.tsx
import BlogListClient from "./BlogListClient";
import { fetchBlogPosts } from "../lib/blogPosts";

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  return <BlogListClient posts={posts} />;
}
