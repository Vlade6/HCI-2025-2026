import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
<footer className="bg-[#111] text-white">
  <div className="mx-auto max-w-6xl px-6 py-16">
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
      {/* LOGO + DESCRIPTION */}
      <div>
        <div className="flex items-center gap-3 text-2xl font-extrabold">
         
          PITSTOP
        </div>

        <p className="mt-4 text-sm text-white/70">
          Premium car care services with easy online booking.
          Your car deserves the best.
        </p>

<div className="mt-6">
<a
  href="https://www.instagram.com/pitstop_split/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-red-500"
>
  <FaInstagram size={18} />
</a>

</div>
</div>

      {/* QUICK LINKS */}
      <div>
        <h4 className="text-lg font-semibold">Quick Links</h4>
        <ul className="mt-4 space-y-3 text-sm text-white/70">
          <li><a href="/" className="hover:text-white">Home</a></li>
          <li><a href="/book_wash" className="hover:text-white">Book a Wash</a></li>
          <li><a href="/about" className="hover:text-white">About Us</a></li>
          <li><a href="/contact" className="hover:text-white">Contact</a></li>
        </ul>
      </div>

{/* SERVICES */}
<div>
  <h4 className="text-lg font-semibold">Services</h4>

  <ul className="mt-4 space-y-3 text-sm">
    <li>
      <Link
        href="/services/basic-wash"
        className="text-white/70 hover:text-white transition"
      >
        Basic Wash
      </Link>
    </li>

    <li>
      <Link
        href="/services/premium-wash"
        className="text-white/70 hover:text-white transition"
      >
        Premium Wash
      </Link>
    </li>

    <li>
      <Link
        href="/services/full-detailing"
        className="text-white/70 hover:text-white transition"
      >
        Full Detailing
      </Link>
    </li>

    <li>
      <Link
        href="/services/ceramic-coating"
        className="text-white/70 hover:text-white transition"
      >
        Ceramic Coating
      </Link>
    </li>
  </ul>
</div>

      {/* CONTACT INFO */}
      <div>
  <h4 className="text-lg font-semibold">Contact Info</h4>
  <ul className="mt-4 space-y-4 text-sm text-white/70">
    <li className="flex items-center gap-3">
      <i className="fa-solid fa-location-dot text-red-500 fa-fw"></i>
      Ostravska 7C, Split, Croatia
    </li>
    <li className="flex items-center gap-3">
      <i className="fa-solid fa-phone text-red-500 fa-fw"></i>
      +385 91 234 5678
    </li>
    <li className="flex items-center gap-3">
      <i className="fa-solid fa-envelope text-red-500 fa-fw"></i>
      pitstop.split@gmail.com
    </li>
  </ul>
</div>

    </div>

    {/* COPYRIGHT */}
    <div className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-white/60">
      © 2025 PITSTOP. All rights reserved. | Built with care for your car.
    </div>
  </div>
</footer>
  );
}