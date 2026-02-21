import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Next 15
) {
  try {
    const { id } = await params; // ✅ obavezno await

    console.log("=== PATCH ROUTE HIT ===");
    console.log("ID:", id);

    const jwt = (await cookies()).get("pitstop_jwt")?.value;
    if (!jwt) {
      return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
    }

    if (!STRAPI_URL) {
      return NextResponse.json({ ok: false, error: "Missing STRAPI_URL" }, { status: 500 });
    }

    // ✅ request body čitaj jednom
    const raw = await req.text();
    console.log("RAW BODY:", raw);

    let body: any = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON body", raw }, { status: 400 });
    }

    const strapiRes = await fetch(`${STRAPI_URL}/api/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: body }),
      cache: "no-store",
    });

    const strapiText = await strapiRes.text();
    console.log("STRAPI STATUS:", strapiRes.status);
    console.log("STRAPI BODY:", strapiText);

    let strapiJson: any = null;
    try {
      strapiJson = strapiText ? JSON.parse(strapiText) : null;
    } catch {
      strapiJson = null;
    }

    if (!strapiRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: strapiJson?.error?.message || `Strapi error (HTTP ${strapiRes.status})`,
          details: strapiJson ?? strapiText,
        },
        { status: strapiRes.status }
      );
    }

    return NextResponse.json({ ok: true, booking: strapiJson?.data ?? strapiJson }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "PATCH failed" }, { status: 500 });
  }
}