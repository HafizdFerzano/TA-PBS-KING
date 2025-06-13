import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("token"); // atau cek session

  if (!isLoggedIn && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
