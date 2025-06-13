import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { nama, password } = await req.json();

    if (!nama || !password) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Isi semua kolom",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    // Cek apakah pengguna sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { nama },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Nama sudah digunakan",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Buat user
    const user = await prisma.user.create({
      data: { nama, password: hashedPassword },
    });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          message: "Pendaftaran berhasil",
          status: 201,
        },
        user: {
          id: user.id,
          nama: user.nama,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat register:", error);
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          message: "Terjadi kesalahan server",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
}
