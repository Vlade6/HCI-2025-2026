"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelBookingButton({
  bookingId,
}: {
  bookingId: number | string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  

  async function cancelBooking() {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      setLoading(true);
      
      const res = await fetch(`/api/bookings/${bookingId}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({ bookingStatus: "cancelled" }),
});

const text = await res.text();
let json: any = {};
try {
  json = JSON.parse(text);
} catch {
  throw new Error(`Server returned: ${text} (HTTP ${res.status})`);
}

if (!res.ok || !json.ok) {
  console.log("CANCEL ERROR:", json);
  throw new Error(
    `${json?.error || "Cancel failed"} (HTTP ${json?.status || res.status})`
  );
}

      router.refresh();
    } catch (err: any) {
      alert(err?.message || "Cancel failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={cancelBooking}
      disabled={loading}
      className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
    >
      {loading ? "Cancelling..." : "Cancel"}
    </button>
  );
}