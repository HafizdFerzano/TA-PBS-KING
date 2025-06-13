import { NextResponse } from "next/server";
import { db } from "@/lib/prismaClient";
import { hash } from "bcrypt-ts";
import { z } from "zod";

// Skema validasi input dengan Zod (untuk anak SD)
const registerSchema = z.object({
  nama: z
    .string()
    .min(3, { message: "Nama minimal 3 huruf" })
    .max(20, { message: "Nama maksimal 20 huruf" })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Nama hanya boleh huruf, angka, dan spasi",
    }),
  password: z
    .string()
    .min(4, { message: "Kata sandi minimal 4 karakter" })
    .max(20, { message: "Kata sandi maksimal 20 karakter" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Kata sandi hanya boleh huruf dan angka",
    }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validasi dengan Zod
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || "Input tidak valid";
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: firstError,
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    const { nama, password } = parsed.data;

    // Cek apakah user sudah ada
    const existingUser = await db.user.findUnique({ where: { nama } });
    if (existingUser) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Nama sudah digunakan, coba yang lain ya 😊",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    const countUser = await db.user.findMany({});

    if (countUser.length < 1) {
      await db.user.createMany({
        data: [
          {
            nama: "admin",
            password: await hash("admin123", 10),
            role: "admin",
          },
          {
            nama: "user1",
            password: await hash("user123", 10),
            role: "user",
          },
          {
            nama: "user2",
            password: await hash("user123", 10),
            role: "user",
          },
          {
            nama: "user3",
            password: await hash("user123", 10),
            role: "user",
          },
        ],
      });
    }

    // Hash dan buat user baru
    const hashedPassword = await hash(password, 10);
    const user = await db.user.create({
      data: {
        nama,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          message: "Pendaftaran berhasil 🎉",
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
    console.error("Register error:", error);
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
