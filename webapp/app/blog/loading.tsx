export default function Loading() {
  return (
    <main className="pt-24 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold">Blog</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-5 shadow animate-pulse"
          >
            <div className="h-40 w-full rounded-xl bg-gray-200" />
            <div className="mt-4 h-4 w-3/4 bg-gray-200 rounded" />
            <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
