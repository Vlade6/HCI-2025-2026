import Link from "next/link";

const services = [
  {
    id: "basic-wash",
    title: "Basic Wash",
    desc: "Quick exterior wash with premium soap and hand dry. Perfect for regular maintenance.",
    img: "/images/services/basic.jpg",
  },
  {
    id: "premium-wash",
    title: "Premium Wash",
    desc: "Complete exterior wash with wax protection, tire shine, and interior vacuum.",
    img: "/images/services/premium.jpg",
  },
  {
    id: "full-detailing",
    title: "Full Detailing",
    desc: "Deep interior and exterior detailing, upholstery cleaning, and paint correction.",
    img: "/images/services/detailing.jpg",
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    desc: "Long-lasting protection with ceramic coating that repels water and contaminants.",
    img: "/images/services/ceramic.jpg",
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold">
            Our <span className="text-red-500">Services</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose from our range of professional car care services tailored to keep your vehicle looking its best
          </p>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <img
                src={s.img}
                alt={s.title}
                className="h-44 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-black">{s.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{s.desc}</p>


                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href="/book_wash"
                    className="inline-flex items-center gap-2 font-semibold text-red-500 hover:text-red-600"
                  >
                    Book Now →
                  </Link>

                  <Link
                    href={`/services/${s.id}`}
                    className="text-sm font-semibold text-gray-700 hover:text-black"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
