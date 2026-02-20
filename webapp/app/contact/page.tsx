import ContactForm from "./ContactForm";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-black">
          Get In <span className="text-red-500">Touch</span>
        </h1>
        <p className="mt-4 text-gray-600">
          Have questions? We'd love to hear from you. Send us a message and we'll
          respond as soon as possible.
        </p>
      </section>

      {/* Main content */}
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-black">
            Send Us a Message
          </h2>

            <ContactForm />
          </div>

          {/* Info cards */}
          <div className="space-y-6">
            <InfoCard
              icon={<FaMapMarkerAlt />}
              title="Visit Us"
              lines={["Ostavska 7C, Split, Croatia"]}
            />

            <InfoCard
              icon={<FaPhoneAlt />}
              title="Call Us"
              lines={["+381 91 234 5678", "Mon–Fri: 8am – 6pm"]}
            />

            <InfoCard
              icon={<FaEnvelope />}
              title="Email Us"
              lines={["pitstop.split@gmail.com", "We reply within 24 hours"]}
            />

            <InfoCard
              icon={<FaClock />}
              title="Working Hours"
              lines={[
                "Monday – Friday: 8:00 AM – 6:00 PM",
                "Saturday: 9:00 AM – 5:00 PM",
                "Sunday: 10:00 AM – 4:00 PM",
              ]}
            />

            {/* Map placeholder */}
<div className="h-64 w-full overflow-hidden rounded-2xl shadow-md">
  <iframe
    src="https://www.google.com/maps?q=Ostavska+7C,+Split,+Croatia&output=embed"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
          </div>
        </div>

        {/* Social */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 font-semibold text-black">Connect With Us</h3>

          <div className="flex justify-center">
            <a
              href="https://www.instagram.com/pitstop_split/"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Reusable components */

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-black">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border px-4 py-3 focus:border-red-500 focus:outline-none"
      />
    </div>
  );
}

function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-500 text-xl">
        {icon}
      </div>

      <div>
        <h4 className="mb-2 font-semibold text-black">{title}</h4>
        <div className="space-y-1 text-sm text-gray-600">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
