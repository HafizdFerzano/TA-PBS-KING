import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Daftar rute API yang ingin diproteksi oleh JWT
  const protectedPaths = ["/api/users"];

  // CORS config
  const headers = new Headers();
  const origin = request.headers.get("origin");
  const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-CSRF-Token"
  );
  headers.set("Access-Control-Allow-Credentials", "true");

  // Handle preflight (OPTIONS)
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers,
    });
  }


  // ✅ Lanjutkan permintaan jika lolos semua validasi
  const response = NextResponse.next();
  headers.forEach((value, key) => response.headers.set(key, value));
  return response;
}

// Middleware hanya aktif untuk semua route API
export const config = {
  matcher: ["/api/:path*"],
};
