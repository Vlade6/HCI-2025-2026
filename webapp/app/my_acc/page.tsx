import {
  User,
  Calendar,
  Clock,
  Car,
  BadgeCheck,
  XCircle,
} from "lucide-react";

export default function MyAccountPage() {
  return (
    <main className="bg-red-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          My <span className="text-red-600">Account</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Profile */}
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
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value="John Doe"
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value="john.doe@example.com"
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value="(555) 123-4567"
                    readOnly
                  />
                </div>

                <button className="w-full bg-red-600 text-white py-2 rounded-lg mt-4">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Booking History</h2>

            {/* UPCOMING */}
            <div className="border border-green-300 bg-green-50 rounded-xl p-5 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full">
                  UPCOMING
                </span>
                <span className="text-xl font-bold text-red-600">$45</span>
              </div>

              <h3 className="font-semibold mb-3">Premium Wash</h3>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> November 20, 2025
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> 10:30 AM
                </div>
                <div className="flex items-center gap-2">
                  <Car size={16} /> Toyota Camry
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck size={16} /> ABC-1234
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-red-600 text-white py-2 rounded-lg">
                  View Details
                </button>
                <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg">
                  Cancel Booking
                </button>
              </div>
            </div>

            {/* COMPLETED BOOKINGS */}
            {[
              {
                service: "Full Detailing",
                price: "$120",
                date: "October 15, 2025",
                time: "02:00 PM",
              },
              {
                service: "Basic Wash",
                price: "$25",
                date: "September 22, 2025",
                time: "09:00 AM",
              },
              {
                service: "Premium Wash",
                price: "$45",
                date: "August 10, 2025",
                time: "03:00 PM",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border rounded-xl p-5 mb-4 bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-gray-400 text-white px-3 py-1 rounded-full">
                    COMPLETED
                  </span>
                  <span className="text-lg font-semibold">{item.price}</span>
                </div>

                <h3 className="font-semibold mb-3">{item.service}</h3>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> {item.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> {item.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Car size={16} /> Toyota Camry
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <BadgeCheck size={16} /> Service Complete
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
