// webapp/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { strapiLogin } from "@/app/lib/strapiAuth";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    const data = await strapiLogin(identifier, password);

    const res = NextResponse.json({ ok: true, user: data.user });

    // httpOnly cookie (sigurno + radi online)
    res.cookies.set("pitstop_jwt", data.jwt, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dana
    });

    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Login error" }, { status: 400 });
  }
}
