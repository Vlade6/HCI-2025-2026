export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto h-12 w-72 rounded-lg bg-gray-200 animate-pulse" />
        <div className="mx-auto mt-3 h-5 w-96 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Search bar */}
      <div className="mt-10 rounded-2xl bg-white p-4 shadow-sm">
        <div className="h-11 w-full rounded-xl bg-gray-200 animate-pulse" />
        <div className="mt-3 h-4 w-24 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Post cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            className="rounded-2xl bg-white p-5 shadow-sm animate-pulse"
          >
            {/* Title */}
            <div className="h-7 w-4/5 rounded bg-gray-200" />

            {/* Excerpt lines */}
            <div className="mt-2 space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>

            {/* Read more link */}
            <div className="mt-4 h-5 w-24 rounded bg-gray-200" />
          </article>
        ))}
      </div>
    </section>
  );
}