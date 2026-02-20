"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/useAuth";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/book_wash", label: "Book a wash" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      {open ? (
        <>
          <path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M4 6h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 18h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { user, loading, refresh } = useAuth();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
  refresh();
}, [pathname, refresh]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // ✅ Jedini entry point: My Account
  const accountHref = user ? "/my_acc" : "/login";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-[80px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.jpg"
              alt="PITSTOP"
              width={170}
              height={60}
              priority
              className="h-[52px] w-auto scale-150 origin-left"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition ${
                  isActive(item.href)
                    ? "text-red-600"
                    : "text-gray-800 hover:text-red-600"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* ✅ Account area: bez Login/Logout gumba */}
            <div className="flex items-center gap-4">
              {!loading && user && (
                <span className="text-sm font-semibold text-gray-700">
                  Bok, {user.username}
                </span>
              )}

              <Link
                href={accountHref}
                className="ml-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 transition"
              >
                My Account
              </Link>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href={accountHref}
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition"
            >
              My Account
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-gray-800"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-3 font-semibold ${
                  isActive(item.href)
                    ? "bg-red-50 text-red-600"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* ✅ Mobile: samo user info (bez Login/Logout) */}
            {!loading && user && (
              <div className="mt-2 border-t pt-3 px-3 text-sm font-semibold text-gray-700">
                Bok, {user.username}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}