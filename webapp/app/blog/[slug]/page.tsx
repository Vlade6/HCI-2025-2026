import Link from "next/link";
import { BLOG_POSTS, getPostBySlug } from "../../lib/blogPosts";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-extrabold">Post not found</h1>
          <p className="mt-2 text-gray-600">That slug doesn’t exist.</p>
          <Link href="/blog" className="mt-6 inline-block font-semibold text-red-600">
            ← Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/blog" className="font-semibold text-red-600 hover:text-red-700">
          ← Back to blog
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl shadow-sm">
          <img src={post.coverImage} alt={post.title} className="h-64 w-full object-cover" />
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold text-gray-900">{post.title}</h1>
          <p className="mt-3 text-lg text-gray-600">{post.excerpt}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {post.content.map((block, idx) => {
            if (block.type === "paragraph") {
              return (
                <p key={idx} className="text-[15px] leading-7 text-gray-700">
                  {block.text}
                </p>
              );
            }

            if (block.type === "image") {
              return (
                <div key={idx} className="overflow-hidden rounded-2xl">
                  <img src={block.src} alt={block.alt} className="w-full object-cover" />
                </div>
              );
            }

            if (block.type === "quote") {
              return (
                <blockquote
                  key={idx}
                  className="rounded-2xl border-l-4 border-red-500 bg-red-50 p-5 text-gray-800"
                >
                  <span className="font-semibold">“</span>
                  {block.text}
                  <span className="font-semibold">”</span>
                </blockquote>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={idx} className="list-disc space-y-2 pl-5 text-gray-700">
                  {block.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            }

            if (block.type === "code") {
              return (
                <div key={idx} className="overflow-hidden rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 text-xs text-gray-600">
                    <span className="font-semibold">{block.language ?? "code"}</span>
                    <span>snippet</span>
                  </div>
                  <pre className="overflow-x-auto bg-white p-4 text-sm leading-6">
                    <code>{block.code}</code>
                  </pre>
                </div>
              );
            }

            if (block.type === "video") {
              const title = block.title ?? "Video";
              return (
                <div key={idx} className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700">{title}</div>
                  <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-sm">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${block.youtubeId}`}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-gray-50 p-6">
          <div className="text-sm font-semibold text-gray-800">Next step (later)</div>
          <p className="mt-2 text-sm text-gray-600">
            Replace <code>blogPosts.ts</code> with CMS content (PayloadCMS/Strapi/Sanity), keep the UI the same.
          </p>
        </div>
      </section>
    </main>
  );
}
