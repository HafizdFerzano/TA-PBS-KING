import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismaClient";

export async function GET(_req: NextRequest) {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        nama: true,
        createdAt: true,
        // Jangan sertakan password
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 200,
          message: "Data user berhasil diambil.",
        },
        data: users,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: "Gagal mengambil data user.",
          detail: error?.message || error,
        },
      },
      { status: 500 }
    );
  }
}
