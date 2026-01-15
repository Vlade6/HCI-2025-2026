"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M4 6h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-[80px] flex items-center justify-between">
          {/* Logo (samo slika) */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.jpg"              // stavi logo u /public/logo.png
              alt="PITSTOP"
              width={170}
              height={60}
              priority
              className="h-[52px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition ${
                  isActive(item.href) ? "text-red-600" : "text-gray-800 hover:text-red-600"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/my_acc"
              className="ml-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 transition"
            >
              My Account
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/my_acc"
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
                  isActive(item.href) ? "bg-red-50 text-red-600" : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
