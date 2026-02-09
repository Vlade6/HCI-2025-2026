// webapp/app/api/bookings/route.ts
// ✅FIXED FOR STRAPI V5

import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { STRAPI_URL, strapiMe } from "@/app/lib/strapiAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "pitstop_jwt";

export async function GET() {
  try {
    if (!STRAPI_URL) {
      return NextResponse.json({ ok: false, error: "Missing STRAPI_URL" }, { status: 500 });
    }

    const cookieStore = await cookies();
    const jwt = cookieStore.get(COOKIE_NAME)?.value;

    if (!jwt) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const me = await strapiMe(jwt);

    const url =
      `${STRAPI_URL}/api/bookings?` +
      `filters[customer][id][$eq]=${me.id}` +
      `&sort[0]=date:desc` +
      `&populate=*`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error?.message || "Strapi error", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!STRAPI_URL) {
      return NextResponse.json({ ok: false, error: "Missing STRAPI_URL" }, { status: 500 });
    }

    const h = await headers();
    const rawCookieHeader = h.get("cookie") || "";

    const cookieStore = await cookies();
    const allNames = cookieStore.getAll().map((c: { name: string }) => c.name);

    const jwt = cookieStore.get(COOKIE_NAME)?.value;

    if (!jwt) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized (no jwt cookie on server)",
          debug: {
            lookingFor: COOKIE_NAME,
            cookiesSeenByServer: allNames,
            rawCookieHeaderLen: rawCookieHeader.length,
            rawCookieHeaderStarts: rawCookieHeader.slice(0, 80),
          },
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const me = await strapiMe(jwt);

    const payload = {
      data: {
        ...body,
        customer: me.id,
    
      },
    };

    console.log("📤 Sending to Strapi V5:", JSON.stringify(payload, null, 2));
    console.log("STRAPI_URL USED:", STRAPI_URL);

    const res = await fetch(`${STRAPI_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Strapi error:", data);
      return NextResponse.json(
        { ok: false, error: data?.error?.message || "Strapi error", details: data },
        { status: res.status }
      );
    }

    console.log("✅ Booking created successfully");
    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err: any) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}