export default function Loading() {
  return (
    <main className="pt-24 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold">Blog</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            className="rounded-2xl bg-white p-5 shadow animate-pulse"
          >
            {/* Thumbnail */}
            <div className="h-40 w-full rounded-xl bg-gray-200" />

            {/* Meta row (date/tag) */}
            <div className="mt-4 flex gap-2">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-14 rounded bg-gray-200" />
            </div>

            {/* Title */}
            <div className="mt-3 h-6 w-4/5 rounded bg-gray-200" />

            {/* Excerpt lines */}
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>

            {/* CTA */}
            <div className="mt-5 h-10 w-28 rounded-lg bg-gray-200" />
          </article>
        ))}
      </div>
    </main>
  );
}