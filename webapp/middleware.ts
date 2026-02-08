// webapp/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("pitstop_jwt")?.value;

  // Zaštiti sve ispod /my_acc
  if (req.nextUrl.pathname.startsWith("/my_acc")) {
    if (!jwt) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", "/my_acc");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my_acc/:path*"],
};
