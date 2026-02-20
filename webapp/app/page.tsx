import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import Footer from "./_components/footer";

const services = [
  {
    title: "Basic Wash",
    desc: "Quick exterior wash with premium soap and hand dry. Perfect for regular maintenance.",
    img: "/images/services/basic.jpg",
  },
  {
    title: "Premium Wash",
    desc: "Complete exterior wash with wax protection, tire shine, and interior vacuum.",
    img: "/images/services/premium.jpg",
  },
  {
    title: "Full Detailing",
    desc: "Deep interior and exterior detailing, upholstery cleaning, and paint correction.",
    img: "/images/services/detailing.jpg",
  },
  {
    title: "Ceramic Coating",
    desc: "Long-lasting protection with ceramic coating that repels water and contaminants.",
    img: "/images/services/ceramic.jpg",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative flex min-h-[calc(100vh-96px)] w-full items-center justify-center"
        style={{
          backgroundImage:
            "url('/images/hero.jpg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full px-4 text-center text-white">
          <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
            Premium Car Care,
            <br />
            <span className="text-red-500">Anytime</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Get professional car wash service in seconds. No more Instagram DMs
            or WhatsApp chaos—just easy online booking with real-time
            availability.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book_wash"
              className="rounded-full bg-red-500 px-8 py-3 font-semibold hover:bg-red-600"
            >
              Book Now
            </Link>

            <Link
              href="/services"
              className="rounded-full border border-white/70 px-8 py-3 font-semibold hover:bg-white/10"
            >
              View Services
            </Link>
          </div>

          <div className="mt-8 text-sm text-white/80">
            No credit card required • Book in 2 minutes • Instant confirmation
          </div>
        </div>
      </section>

      {/* WHY CHOOSE PITSTOP */}
      <section className="bg-rose-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-black">
              Why Choose <span className="text-red-500">PITSTOP?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Experience the difference with our professional car care service
            </p>
          </div>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
  {/* Fast Service */}
  <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-500">
      <i className="fa-solid fa-clock"></i>
    </div>
    <h3 className="mt-6 text-lg font-bold text-black">Fast Service</h3>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      Get your car washed quickly without compromising on quality. Most
      services completed in under 30 minutes.
    </p>
  </div>

  {/* Affordable Pricing */}
  <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-500">
      <i className="fa-solid fa-tag"></i>
    </div>
    <h3 className="mt-6 text-lg font-bold text-black">Affordable Pricing</h3>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      Transparent pricing with no hidden fees. Premium quality at prices
      that won't break the bank.
    </p>
  </div>

  {/* Professional Team */}
  <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-500">
      <i className="fa-solid fa-user-check"></i>
    </div>
    <h3 className="mt-6 text-lg font-bold text-black">Professional Team</h3>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      Trained and experienced detailers who treat your car with care and
      precision.
    </p>
  </div>

  {/* Easy Booking */}
  <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-500">
      <i className="fa-solid fa-calendar-check"></i>
    </div>
    <h3 className="mt-6 text-lg font-bold text-black">Easy Booking</h3>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      Book online in seconds with real-time availability. No more back-and-forth
      messaging.
    </p>
  </div>
</div>


          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <a
              href="/book_wash"
              className="rounded-full bg-red-500 px-10 py-4 text-base font-semibold text-white shadow hover:bg-red-600"
            >
              Get Started Today
            </a>

            <p className="text-sm text-gray-500">
              Join hundreds of satisfied customers • Free cancellation • Instant confirmation
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
  <div className="mx-auto max-w-6xl px-4">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* LEFT */}
      <div>
  <h2 className="text-5xl font-extrabold text-black">
    Visit Us <span className="text-red-500">Today</span>
  </h2>

  <p className="mt-4 max-w-xl text-gray-600">
    We're here to make your car shine. Drop by or book online for a
    hassle-free experience.
  </p>

  <div className="mt-10 space-y-6">
    {/* Address */}
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-xl text-red-500">
        <i className="fa-solid fa-location-dot"></i>
      </div>
      <div>
        <div className="font-bold text-black">Address</div>
        <div className="text-gray-600">Ostravska 7C, Split, Croatia</div>
      </div>
    </div>

    {/* Phone */}
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-xl text-red-500">
        <i className="fa-solid fa-phone"></i>
      </div>
      <div>
        <div className="font-bold text-black">Phone</div>
        <div className="text-gray-600">+385 91 234 5678</div>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-xl text-red-500">
        <i className="fa-solid fa-envelope"></i>
      </div>
      <div>
        <div className="font-bold text-black">Email</div>
        <div className="text-gray-600">pitstop.split@gmail.com</div>
      </div>
    </div>

    {/* Working Hours */}
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-xl text-red-500">
        <i className="fa-solid fa-clock"></i>
      </div>
      <div>
        <div className="font-bold text-black">Working Hours</div>
        <div className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</div>
        <div className="text-gray-600">Saturday: 9:00 AM - 5:00 PM</div>
        <div className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</div>
      </div>
    </div>
  </div>
</div>

      {/* RIGHT */}
      <div className="relative">
        <div className="overflow-hidden rounded-3xl shadow-xl">
          <img
            src="/images/visit.jpg"
            alt="Car wash"
            className="h-[420px] w-full object-cover"
          />
        </div>

        {/* BADGE */}
        <div className="absolute -bottom-8 left-8 rounded-2xl bg-red-600 px-8 py-5 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-extrabold">500+</div>
            <div className="leading-tight">
              <div className="font-semibold">Happy Customers</div>
              <div className="text-sm text-white/90">This Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



    </>
  );
}
