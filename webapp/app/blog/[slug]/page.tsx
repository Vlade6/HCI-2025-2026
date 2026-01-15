import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchBlogPostBySlug } from "../../lib/blogPosts";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="font-semibold text-red-600 hover:text-red-700">
        ← Back to blog
      </Link>

      <h1 className="mt-6 text-4xl font-extrabold text-gray-900">{post.title}</h1>

      {post.excerpt && (
        <p className="mt-4 text-lg text-gray-600">{post.excerpt}</p>
      )}

      <div className="mt-8 space-y-4">
        {post.content?.map((block, i) => {
          const text = (block.children ?? []).map((c) => c.text).join("").trim();
          if (!text) return null;

          if (text.startsWith("## ")) {
            return (
              <h2 key={i} className="mt-8 text-2xl font-extrabold text-gray-900">
                {text.replace(/^##\s+/, "")}
              </h2>
            );
          }

          return (
            <p key={i} className="leading-7 text-gray-800">
              {text}
            </p>
          );
        })}
      </div>
    </section>
  );
}
