// webapp/app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { STRAPI_URL, strapiMe } from "@/app/lib/strapiAuth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("pitstop_jwt")?.value;

    if (!jwt) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // tko je user
    const me = await strapiMe(jwt);

    // bookingovi samo za tog usera (customer relacija)
    const url = `${STRAPI_URL}/api/bookings?filters[customer][id][$eq]=${me.id}&sort[0]=date:desc&populate=*`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store",
    });

    const json = await res.json();

    // vrati i status da odmah vidiš 403/200
    return NextResponse.json({ ok: res.ok, status: res.status, json }, { status: res.status });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("pitstop_jwt")?.value;

    if (!jwt) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const me = await strapiMe(jwt);
    const body = await req.json();

    // kreiranje booking-a vezanog na usera
    const payload = {
      data: {
        ...body,
        customer: me.id, // ✅ veži booking na trenutno ulogiranog korisnika
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
      return NextResponse.json(
        { ok: false, error: json?.error?.message || "Create booking failed", details: json?.error },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, booking: json.data }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
