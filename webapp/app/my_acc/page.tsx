// webapp/app/my_acc/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { STRAPI_URL, strapiMe } from "@/app/lib/strapiAuth";
import { User, Calendar, Clock, Car, BadgeCheck } from "lucide-react";

type Booking = {
  id: number;
  serviceName: string;
  price: number;
  bookingStatus: "upcoming" | "completed" | "cancelled";
  date: string;
  time: string;
  carModel: string;
  plate: string;
};

async function fetchMyBookings(jwt: string): Promise<Booking[]> {
  // prvo dohvati user id
  const me = await strapiMe(jwt);

  // filtriraj po user id (Strapi REST filter)
const url =
  `${STRAPI_URL}/api/bookings?filters[customer][id][$eq]=${me.id}&sort[0]=date:desc`;




  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok) return [];

  // Strapi v4: { data: [{ id, attributes: {...}}]}
  // Ako si ti napravio custom output bez attributes, reci pa prilagodimo.
 const data = (json?.data ?? []).map((x: any) => {
  // podrži oba formata: flat i attributes
  const attrs = x.attributes ?? x;
  return { id: x.id, ...attrs };
});

return data as Booking[];
}

export default async function MyAccountPage() {
  // Next 15: cookies() je async u server komponentama
  const cookieStore = await cookies();
  const jwt = cookieStore.get("pitstop_jwt")?.value;

  if (!jwt) {
    redirect("/login?next=/my_acc");
  }

  const me = await strapiMe(jwt);
  const bookings = await fetchMyBookings(jwt);

  const upcoming = bookings.filter((b) => b.bookingStatus === "upcoming");
  const completed = bookings.filter((b) => b.bookingStatus === "completed");

  return (
    <main className="bg-red-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-center mb-12">
            My <span className="text-red-600">Account</span>
          </h1>

          <form
            action={async () => {
              "use server";
              // logout server-side (cookie clear)
              const c = await cookies();
              c.set("pitstop_jwt", "", { path: "/", maxAge: 0 });
              redirect("/login");
            }}
          >
          <button type="submit" className="rounded-lg bg-gray-900 px-4 py-2 text-white">
            Log out
          </button> 
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-center mb-6">
                <div className="bg-red-600 text-white rounded-full p-4">
                  <User size={32} />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-center mb-6">
                Profile Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={me.username}
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={me.email}
                    readOnly
                  />
                </div>

                <Link
                  href="/book_wash"
                  className="block w-full bg-red-600 text-center text-white py-2 rounded-lg mt-4 font-semibold"
                >
                  Book a wash
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Booking History</h2>

            {upcoming.map((b) => (
              <div key={b.id} className="border border-green-300 bg-green-50 rounded-xl p-5 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full">
                    UPCOMING
                  </span>
                  <span className="text-xl font-bold text-red-600">€{b.price}</span>
                </div>

                <h3 className="font-semibold mb-3">{b.serviceName}</h3>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> {b.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> {b.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Car size={16} /> {b.carModel}
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={16} /> {b.plate}
                  </div>
                </div>
              </div>
            ))}

            {completed.map((b) => (
              <div key={b.id} className="border rounded-xl p-5 mb-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-gray-400 text-white px-3 py-1 rounded-full">
                    COMPLETED
                  </span>
                  <span className="text-lg font-semibold">€{b.price}</span>
                </div>

                <h3 className="font-semibold mb-3">{b.serviceName}</h3>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> {b.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> {b.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Car size={16} /> {b.carModel}
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <BadgeCheck size={16} /> Service Complete
                  </div>
                </div>
              </div>
            ))}

            {bookings.length === 0 && (
              <p className="text-gray-600">No bookings yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
