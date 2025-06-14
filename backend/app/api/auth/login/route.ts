import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();

// Validasi input sederhana
const loginSchema = z.object({
  nama: z
    .string()
    .min(3, { message: "Nama harus minimal 3 huruf" })
    .max(20, { message: "Nama tidak boleh lebih dari 20 huruf" })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Nama hanya boleh huruf dan angka",
    }),
  password: z
    .string()
    .min(4, { message: "Kata sandi minimal 4 karakter" })
    .max(20, { message: "Kata sandi tidak boleh lebih dari 20 karakter" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Kata sandi hanya boleh huruf dan angka",
    }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validasi input
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || "Validasi gagal";
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

    // Cari user
    const user = await prisma.user.findUnique({
      where: { nama },
    });

    // Jika user tidak ditemukan atau password salah
    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Nama atau kata sandi salah",
            status: 401,
          },
        },
        { status: 401 }
      );
    }

    // Buat token
    const token = jwt.sign(
      {
        id: user.id,
        nama: user.nama,
        role: user.role, // tetap disimpan di token
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Kondisi response berdasarkan role
    if (user.role === "admin") {
      return NextResponse.json(
        {
          metadata: {
            error: 0,
            message: "Login berhasil",
            status: 200,
          },
          data: {
            token,
            role: "admin",
          },
        },
        { status: 200 }
      );
    }

    // Untuk user biasa: tidak tampilkan role
    return NextResponse.json(
      {
        metadata: {
          error: 0,
          message: "Login berhasil",
          status: 200,
        },
        data: {
          token,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          message: "Terjadi kesalahan di server",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
}
