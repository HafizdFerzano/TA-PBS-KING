import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rute yang butuh proteksi token
  const protectedPaths = ["/api/dashboard", "/api/admin"];

  // Setup CORS
  const headers = new Headers();
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://shape-explorer-king.vercel.app",
    "https://shape-explorer-cms.vercel.app",
  ];

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

  // ✅ Handle preflight request
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers,
    });
  }

  // 🔒 Cek token jika masuk ke protectedPaths
  if (protectedPaths.includes(pathname)) {
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.split(" ")[1];

    // Coba ambil dari cookies jika tidak ada di header
    if (!token) {
      token = request.cookies.get("token")?.value;
    }

    if (!token) {
      return new NextResponse(
        JSON.stringify({
          error: "Akses ditolak. Token tidak ditemukan. Silakan login.",
        }),
        {
          status: 401,
          headers,
        }
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return new NextResponse(
        JSON.stringify({
          error: "Token tidak valid atau kedaluwarsa. Silakan login ulang.",
        }),
        {
          status: 401,
          headers,
        }
      );
    }
  }

  // ✅ Lanjutkan permintaan
  const response = NextResponse.next();
  headers.forEach((value, key) => response.headers.set(key, value));
  return response;
}

// Middleware aktif untuk semua route API
export const config = {
  matcher: ["/api/:path*"],
};
