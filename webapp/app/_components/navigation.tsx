"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pages = [
  { title: "Home", path: "/" },
  { title: "Book a wash", path: "/book_wash" },
  { title: "About us", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Blog", path: "/blog" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <nav className="mx-auto w-full px-4">
        {/* Promijenjeno: h-16 u min-h-[80px] i py-2 za više prostora */}
        <div className="flex min-h-[80px] items-center justify-between py-4">
          
          {/* LOGO - Uklonjen krug i fiksna veličina h-9/w-9 */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg" // koristi .jpg jer je tako na tvojim slikama
              alt="PITSTOP"
              width={200}
              height={50}
              className="h-auto w-32 md:w-48 object-contain"
              priority
            />
          </Link>

          {/* DESKTOP LINKS - Dodan ml-auto da gurne sve desno */}
          <div className="hidden md:flex ml-auto items-center gap-7">
            {pages.map((p) => {
              const active = pathname === p.path || pathname?.startsWith(p.path + "/");
              return (
                <Link
                  key={p.path}
                  href={p.path}
                  className={`text-lg font-bold transition ${
                    active ? "text-red-600" : "text-gray-800 hover:text-red-600"
                  }`}
                >
                  {p.title}
                </Link>
              );
            })}

            <Link
              href="/my_acc"
              className="rounded-full bg-red-600 px-5 py-2.5 font-bold text-white hover:bg-red-700 transition"
            >
              My Account
            </Link>
          </div>

          {/* Mobile hamburger - ostaje isti ali s ml-auto ako nema desktop linkova */}
          <button
            className="md:hidden ml-auto inline-flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-6 bg-gray-900 transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-gray-900 transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-gray-900 transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay - tvoj postojeći kod je dobar */}
      {open && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="fixed left-0 right-0 top-[80px] bg-white shadow-xl border-t border-gray-100">
            <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-2">
              {pages.map((p) => (
                <Link
                  key={p.path}
                  href={p.path}
                  className="rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {p.title}
                </Link>
              ))}
              <Link
                href="/my_acc"
                className="mt-2 rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white"
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}