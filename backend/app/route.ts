import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    metadata: {
      status: 200,
      error: 0,
      message: "Welcome to Shape Explorer API",
    },
    data: {
      version: "1.0.0",
      documentation: "/api/docs",
      availableRoutes: ["/api/user", "/api/shape", "/api/qrarcode"],
    },
  });
}
