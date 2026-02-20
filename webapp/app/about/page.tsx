import Image from "next/image";
import Avatar from "@/app/_components/Avatar";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* OUR STORY */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold text-black">
              Our <span className="text-red-500">Story</span>
            </h1>

            <div className="mt-6 space-y-5 text-gray-600 leading-relaxed">
              <p>
                PITSTOP started from a simple frustration: our founder was tired
                of managing car wash bookings through endless Instagram DMs and
                WhatsApp messages. Appointments were missed, customers were
                confused, and valuable time was lost.
              </p>
              <p>
                That's when we built this platform — to make professional car
                care accessible, organized, and hassle-free. Now, customers can
                book in seconds, and we can focus on what we do best: making your
                car shine.
              </p>
              <p>
                Today, we've served over 2,000+ happy customers and continue to
                grow, one spotless car at a time.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/stop.jpg"
              alt="Car wash story"
              width={1200}
              height={800}
              className="h-[320px] w-full object-cover md:h-[360px]"
            />
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM */}
      <section className="mx-auto max-w-6xl px-4 pb-16 text-center">
        <h2 className="text-4xl font-extrabold text-black">
          Meet Our <span className="text-red-500">Team</span>
        </h2>
        <p className="mt-3 text-gray-600">
          The passionate professionals behind PITSTOP
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <TeamCard
            name="Ante Keran"
            role="Founder & CEO"
            desc="5+ years in auto detailing. Passionate about customer service and innovation."
          />
          <TeamCard
            name="Sara Keran"
            role="Lead Detailer"
            desc="Certified ceramic coating specialist. Meticulous attention to every detail."
          />
          <TeamCard
            name="Mate Antic"
            role="Service Manager"
            desc="Ensures smooth operations and customer satisfaction every day."
          />
        </div>
      </section>

      {/* OUR WORK GALLERY */}
      <section className="mx-auto max-w-6xl px-4 pb-24 text-center">
        <h2 className="text-4xl font-extrabold text-black">
          Our Work <span className="text-red-500">Gallery</span>
        </h2>
        <p className="mt-3 text-gray-600">See the PITSTOP difference</p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <GalleryImage
            src="/images/gallery/photo1.jpg"
            alt="Gallery 1"
          />
          <GalleryImage
            src="/images/gallery/photo2.jpg"
            alt="Gallery 2"
          />
          <GalleryImage
            src="/images/gallery/photo3.jpg"
            alt="Gallery 3"
          />

          <GalleryImage
            src="/images/gallery/photo4.jpg"
            alt="Gallery 4"
          />
          <GalleryImage
             src="/images/gallery/photo5.jpg"
            alt="Gallery 5"
          />
          <GalleryImage
            src="/images/gallery/photo6.jpg"
            alt="Gallery 6"
          />
        </div>
      </section>
    </main>
  );
}

/* Components */

function TeamCard({ name, role, desc }: { name: string; role: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-md">
      <Avatar name={name} size={80} />

      <h3 className="mt-5 text-xl font-extrabold text-gray-900">{name}</h3>
      <p className="mt-1 font-semibold text-red-600">{role}</p>
      <p className="mt-4 text-gray-600">{desc}</p>
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="h-56 w-full object-cover"
      />
    </div>
  );
}
