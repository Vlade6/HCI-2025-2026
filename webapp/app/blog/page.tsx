"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BLOG_CATEGORIES, BLOG_POSTS, type BlogCategory } from "../lib/blogPosts";

export default function BlogListPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return BLOG_POSTS.filter((p) => {
      const matchesCategory = category === "All" ? true : p.category === category;

      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <main className="min-h-screen bg-[#fdecef]">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold">
            PITSTOP <span className="text-red-600">Blog</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Tips, promotions, behind-the-scenes, and guides — with images, video, and code snippets.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_240px]">
            <input
              className="h-11 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-red-300"
              placeholder="Search posts (title, tags, excerpt)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select
              className="h-11 w-full rounded-xl border border-gray-200 px-3 outline-none focus:border-red-300"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
            >
              <option value="All">All categories</option>
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "post" : "posts"}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative">
                {/* koristimo <img> (ne Next/Image) da izbjegnemo domain config probleme */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-44 w-full object-cover"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
                  {post.category}
                </div>
              </div>

              <div className="p-5">
                <div className="text-xs text-gray-500">{post.date}</div>
                <h2 className="mt-2 text-xl font-bold text-gray-900">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-red-600 hover:text-red-700"
                  >
                    Read more <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-600">
          Later: we’ll load these posts from a headless CMS (Payload/Strapi/Sanity) instead of this file.
        </div>
      </section>
    </main>
  );
}
