import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white text-center px-6">
      <h1 className="text-7xl font-extrabold text-[#e10600] m-0">404</h1>
      <h2 className="text-2xl font-semibold mt-3">Oops! This page took a wrong turn.</h2>
      <p className="text-sm text-gray-300 mt-3 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#e10600] text-white font-semibold hover:opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
