export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-pulse">
      
      {/* Back link */}
      <div className="h-4 w-32 bg-gray-200 rounded mb-6" />

      {/* Title */}
      <div className="h-10 w-3/4 bg-gray-300 rounded mb-6" />

      {/* Intro text */}
      <div className="space-y-3 mb-10">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>

      {/* Section 1 */}
      <div className="mb-8">
        <div className="h-6 w-1/2 bg-gray-300 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-4/5 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="mb-8">
        <div className="h-6 w-1/2 bg-gray-300 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Section 3 */}
      <div>
        <div className="h-6 w-1/2 bg-gray-300 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-4/5 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}