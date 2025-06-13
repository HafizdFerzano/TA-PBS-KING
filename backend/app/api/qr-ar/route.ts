import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { db } from "@/lib/prismaClient";
import { randomUUID } from "crypto";

export async function GET(_req: NextRequest) {
  try {
    const existing = await db.qrArCode.findMany();

    if (existing.length < 1) {
      await db.qrArCode.createMany({
        data: [
          { shape: "square", image: "/assets/qr/square.png" },
          { shape: "triangle", image: "/assets/qr/triangle.png" },
          { shape: "circle", image: "/assets/qr/circle.png" },
          { shape: "rectangle", image: "/assets/qr/rectangle.png" },
        ],
      });
    }

    const data = await db.qrArCode.findMany();

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 200,
          message: "Berhasil mengambil data QR AR Code.",
        },
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: "Gagal mengambil data QR AR Code.",
          detail: error?.message || error,
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const shape = formData.get("shape") as string;
    const imageFile = formData.get("image") as File;

    const MAX_FILE_SIZE = 500 * 1024; // 500KB
    const bucket = "qr-ar-image";

    // Validasi field
    if (!shape || !imageFile) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 400,
            message: "Field 'shape' dan 'image' wajib diisi.",
          },
        },
        { status: 400 }
      );
    }

    // Validasi ukuran file
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 409,
            message: "Ukuran file terlalu besar. Maksimal 500KB.",
          },
        },
        { status: 409 }
      );
    }

    // Upload ke Supabase Storage
    const buffer = await imageFile.arrayBuffer();
    const path = `qr/${randomUUID()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, {
        upsert: false,
        contentType: imageFile.type,
      });

    if (uploadError) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 500,
            message: "Gagal upload ke Supabase Storage.",
            detail: uploadError.message,
          },
        },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = data.publicUrl;

    // Simpan ke database
    const qrAr = await db.qrArCode.create({
      data: {
        shape,
        image: publicUrl,
      },
    });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 201,
          message: "Berhasil upload dan simpan QR AR Code.",
        },
        data: qrAr,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: "Terjadi kesalahan saat mengupload QR AR Code.",
          detail: error?.message || error,
        },
      },
      { status: 500 }
    );
  }
}
