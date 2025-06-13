import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismaClient";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const existingUser = await db.user.findUnique({ where: { id } });

    if (!existingUser) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 404,
            message: "User tidak ditemukan.",
          },
        },
        { status: 404 }
      );
    }

    await db.user.delete({ where: { id } });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 200,
          message: "User berhasil dihapus.",
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: "Gagal menghapus user.",
          detail: error?.message || error,
        },
      },
      { status: 500 }
    );
  }
}
