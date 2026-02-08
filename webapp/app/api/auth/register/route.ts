// webapp/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { strapiRegister } from "@/app/lib/strapiAuth";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const data = await strapiRegister(username, email, password);

    const res = NextResponse.json({ ok: true, user: data.user });

    res.cookies.set("pitstop_jwt", data.jwt, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Register error" }, { status: 400 });
  }
}
