import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { STRAPI_URL, strapiMe } from "@/app/lib/strapiAuth";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("pitstop_jwt")?.value;

  if (!jwt) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  try {
    const me = await strapiMe(jwt);
    const body = await req.json();

    // očekujemo od fronta: serviceName, price, bookingStatus, date, time, carModel, plate
    const payload = {
      data: {
        ...body,
        user: me.id,
      },
    };

    const res = await fetch(`${STRAPI_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const json = await res.json();
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: json?.error?.message || "Create failed" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, booking: json.data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Error" }, { status: 400 });
  }
}
