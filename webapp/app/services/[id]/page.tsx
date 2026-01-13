import Link from "next/link";

type Service = {
  id: string;
  title: string;
  desc: string;
  img: string;
  duration: string;
  price: string;
  includes: string[];
};

const SERVICES: Record<string, Service> = {
  "basic-wash": {
    id: "basic-wash",
    title: "Basic Wash",
    desc: "Quick exterior wash with premium soap and hand dry. Perfect for regular maintenance.",
    img: "/images/services/basic.jpg",
    duration: "20–30 min",
    price: "15€",
    includes: [
      "Pre-rinse & foam wash",
      "Hand wash with premium shampoo",
      "Basic wheel rinse",
      "Hand dry with microfiber towel",
      "Quick exterior windows wipe",
    ],
  },
  "premium-wash": {
    id: "premium-wash",
    title: "Premium Wash",
    desc: "Complete exterior wash with wax protection, tire shine, and interior vacuum.",
    img: "/images/services/premium.jpg",
    duration: "40–60 min",
    price: "25€",
    includes: [
      "Pre-rinse & foam wash",
      "Hand wash + wax protection",
      "Wheel cleaning + tire shine",
      "Interior vacuum (seats + floor)",
      "Exterior windows cleaned",
    ],
  },
  "full-detailing": {
    id: "full-detailing",
    title: "Full Detailing",
    desc: "Deep interior and exterior detailing, upholstery cleaning, and paint correction.",
    img: "/images/services/detailing.jpg",
    duration: "2–4 hours",
    price: "90€",
    includes: [
      "Deep interior cleaning + vacuum",
      "Upholstery shampoo / steam (if needed)",
      "Exterior wash + decontamination",
      "Light paint correction",
      "Windows inside & outside",
    ],
  },
  "ceramic-coating": {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    desc: "Long-lasting protection with ceramic coating that repels water and contaminants.",
    img: "/images/services/ceramic.jpg",
    duration: "4–8 hours",
    price: "250€",
    includes: [
      "Full wash + decontamination",
      "Machine polish preparation",
      "Ceramic coating application",
      "Curing time + quality check",
      "Aftercare instructions",
    ],
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  // ✅ Next 16 zna slat params kao Promise
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolved = await Promise.resolve(params);
  const rawId = resolved?.id ?? "";

  const key = rawId.toLowerCase().replaceAll("_", "-").trim();
  const service = SERVICES[key];

  if (!rawId || !service) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold">Service not found</h1>
          <p className="mt-2 text-gray-600">
            Tried to open: <span className="font-semibold">{String(rawId)}</span>
          </p>
          <Link
            className="mt-6 inline-block font-semibold text-red-500 hover:text-red-600"
            href="/services"
          >
            ← Back to services
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4">
        <Link
          href="/services"
          className="text-sm font-semibold text-gray-700 hover:text-black"
        >
          ← Back to Services
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={service.img}
              alt={service.title}
              className="h-[360px] w-full object-cover"
            />
          </div>

          <div>
            {/* ✅ ime servisa gore */}
            <h1 className="text-4xl font-extrabold text-black">
              {service.title}
            </h1>

            {/* ✅ ukratko opis dolje */}
            <p className="mt-4 text-gray-600">{service.desc}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-red-600">
                Duration: {service.duration}
              </span>
              <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-red-600">
                Price: {service.price}
              </span>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-black">What’s included</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex gap-4">
              <Link
                href="/book_wash"
                className="rounded-full bg-red-500 px-8 py-3 font-semibold text-white hover:bg-red-600"
              >
                Book Now
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-800 hover:bg-gray-50"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
