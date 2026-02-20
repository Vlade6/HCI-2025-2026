import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ← Next.js 15: params je Promise

    const jwt = (await cookies()).get("pitstop_jwt")?.value;
    if (!jwt) {
      return NextResponse.json(
        { ok: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!STRAPI_URL) {
      return NextResponse.json(
        { ok: false, error: "Missing STRAPI_URL" },
        { status: 500 }
      );
    }

    const body = await req.json(); // { bookingStatus: "cancelled" }

    const res = await fetch(`${STRAPI_URL}/api/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: body }),
    });

    const text = await res.text();
console.log("STRAPI STATUS:", res.status);
console.log("STRAPI BODY:", text)

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: json?.error?.message || "Strapi error", details: json },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, booking: json?.data });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "PATCH failed" },
      { status: 500 }
    );
  }
}