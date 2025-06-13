import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { db } from "@/lib/prismaClient";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  try {
    const check = db.qrArCode.findMany({});

    if ((await check).length < 1) {
      await db.qrArCode.createMany({
        data: [
          {
            shape: "square",
            image: "/assets/qr/square.png",
          },
          {
            shape: "triangle",
            image: "/assets/qr/triangle.png",
          },
          {
            shape: "circle",
            image: "/assets/qr/circle.png",
          },
          {
            shape: "rectangle",
            image: "/assets/qr/rectangle.png",
          },
        ],
      });
    }

    //   await db.shape.deleteMany({})

    const qrarcode = await db.qrArCode.findMany();
    return NextResponse.json(qrarcode, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const shape = formData.get("shape") as string;

    // const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
    const MAX_FILE_SIZE = 500 * 1024; // 5 KB

    const gambar = formData.get("image") as File;

    if (gambar.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Ukuran file terlalu besar. Maksimal 1MB.",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    const buffer = await gambar.arrayBuffer();
    const path = `qr/${randomUUID()}.jpg`;
    const bucket = "qr-ar-image";

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, {
        upsert: false,
        contentType: gambar.type,
      });

    if (uploadError) {
      return NextResponse.json({
        metadata: {
          error: 1,
          message: `gagal upload qr ${uploadError}`,
        },
      });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = data.publicUrl;

    // Simpan menu ke database
    const qr_ar = await db.qrArCode.create({
      data: {
        shape: shape,
        image: publicUrl,
      },
    });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 201,
          message: `Berhasil upload qr`,
        },
        data: qr_ar,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: `Gagal upload qr`,
        },
      },
      {
        status: 500,
      }
    );
  }
}
