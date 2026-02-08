import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { strapiMe } from "@/app/lib/strapiAuth";

export async function GET() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("pitstop_jwt")?.value;

  if (!jwt) return NextResponse.json({ ok: true, user: null });

  try {
    const user = await strapiMe(jwt);
    return NextResponse.json({ ok: true, user });
  } catch {
    // ako je token nevažeći, očisti cookie
    const res = NextResponse.json({ ok: true, user: null });
    res.cookies.delete("pitstop_jwt");
    return res;
  }
}
