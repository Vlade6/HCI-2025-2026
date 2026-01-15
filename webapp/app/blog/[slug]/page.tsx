// webapp/app/blog/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchBlogPostBySlug } from "../../lib/blogPosts";

/**
 * Helper: converts YouTube URL to embed URL
 */
function getYoutubeEmbedUrl(url: string) {
  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // youtube.com/watch?v=<id>
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  // IMPORTANT: params is a Promise
  const { slug } = await params;

  const post = await fetchBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      {/* Back link */}
      <Link href="/blog" className="font-semibold text-red-600 hover:text-red-700">
        ← Back to blog
      </Link>

      {/* Cover image */}
      {post.coverImage?.url && (
        <div className="mt-6 overflow-hidden rounded-2xl">
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.coverImage.url}`}
            alt={post.coverImage.alternativeText || post.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="mt-8 text-4xl font-extrabold text-gray-900">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="mt-4 text-lg text-gray-600">{post.excerpt}</p>
      )}

      {/* Main content */}
      <div className="mt-8 space-y-4">
        {post.content?.map((block, i) => {
          const text = (block.children ?? [])
            .map((c) => c.text)
            .join("")
            .trim();

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

      {/* YouTube video */}
      {post.videoUrl && (() => {
        const embed = getYoutubeEmbedUrl(post.videoUrl);
        if (!embed) return null;

        return (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900">Video</h3>
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <iframe
                src={embed}
                title={post.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        );
      })()}

      {/* Code snippet */}
      {post.codeSnippet && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900">
            Code snippet
            {post.codeLanguage ? ` (${post.codeLanguage})` : ""}
          </h3>

          <pre className="mt-4 overflow-x-auto rounded-2xl bg-gray-950 p-4 text-sm text-gray-100">
            <code>{post.codeSnippet}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
