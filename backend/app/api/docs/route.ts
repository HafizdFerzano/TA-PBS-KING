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
      description: "This is the API for the Shape Explorer platform.",
      endpoints: [
        {
          path: "/api/user",
          method: "GET",
          description: "Get all registered users.",
        },
        {
          path: "/api/shape",
          method: "GET",
          description: "Retrieve all shapes with formulas and media.",
        },
        {
          path: "/api/shape",
          method: "POST",
          description:
            "Add a new shape including image and audio file (via Supabase).",
        },
        {
          path: "/api/shape/:id",
          method: "PUT",
          description: "Update a shape by ID.",
        },
        {
          path: "/api/shape/:id",
          method: "DELETE",
          description: "Delete a shape by ID (and remove files in Supabase).",
        },
        {
          path: "/api/qrarcode",
          method: "GET",
          description: "Get QR markers for shapes.",
        },
        {
          path: "/api/qrarcode",
          method: "POST",
          description: "Upload a new QR marker image and save it to database.",
        },
      ],
    },
  });
}
