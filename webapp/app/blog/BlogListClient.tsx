"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost } from "../lib/blogPosts";

export default function BlogListClient({ posts = [] }: { posts?: BlogPost[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;

    return posts.filter((p) => {
      const title = (p.title ?? "").toLowerCase();
      const excerpt = (p.excerpt ?? "").toLowerCase();
      return title.includes(q) || excerpt.includes(q);
    });
  }, [posts, query]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold">
          PITSTOP <span className="text-red-600">Blog</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          Tips, promotions, behind-the-scenes, and guides.
        </p>
      </div>

      <div className="mt-10 rounded-2xl bg-white p-4 shadow-sm">
        <input
          className="h-11 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-red-300"
          placeholder="Search posts…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mt-3 text-sm text-gray-500">
          Showing <span className="font-semibold">{filtered.length}</span> posts
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <article key={post.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>

            {post.excerpt && (
              <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
            )}

            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="font-semibold text-red-600 hover:text-red-700"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
