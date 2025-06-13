import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { db } from "@/lib/prismaClient";
import { randomUUID } from "crypto";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const formData = await req.formData();

    const shape = formData.get("shape") as string;
    const image = formData.get("image") as File | null;
    const MAX_FILE_SIZE = 500 * 1024;
    const bucket = "qr-ar-image";

    const existing = await db.qrArCode.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 404,
            message: "QR AR Code tidak ditemukan.",
          },
        },
        { status: 404 }
      );
    }

    let publicUrl = existing.image;

    // Jika gambar baru dikirim
    if (image) {
      if (image.size > MAX_FILE_SIZE) {
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

      // Hapus gambar lama di Supabase
      const oldPath = existing.image.split("/").slice(-2).join("/");
      await supabase.storage.from(bucket).remove([oldPath]);

      const buffer = await image.arrayBuffer();
      const newPath = `qr/${randomUUID()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(newPath, buffer, {
          upsert: false,
          contentType: image.type,
        });

      if (uploadError) {
        return NextResponse.json(
          {
            metadata: {
              error: 1,
              status: 500,
              message: "Gagal upload gambar baru.",
              detail: uploadError.message,
            },
          },
          { status: 500 }
        );
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(newPath);
      publicUrl = data.publicUrl;
    }

    const updated = await db.qrArCode.update({
      where: { id },
      data: {
        shape,
        image: publicUrl,
      },
    });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 200,
          message: "QR AR Code berhasil diperbarui.",
        },
        data: updated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: "Terjadi kesalahan saat update QR AR Code.",
          detail: error?.message || error,
        },
      },
      { status: 500 }
    );
  }
}


export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const bucket = "qr-ar-image";

    const existing = await db.qrArCode.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 404,
            message: "QR AR Code tidak ditemukan.",
          },
        },
        { status: 404 }
      );
    }

    // Hapus gambar dari Supabase
    const imagePath = existing.image.split("/").slice(-2).join("/");
    await supabase.storage.from(bucket).remove([imagePath]);

    await db.qrArCode.delete({ where: { id } });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 200,
          message: "QR AR Code berhasil dihapus.",
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
          message: "Gagal menghapus QR AR Code.",
          detail: error?.message || error,
        },
      },
      { status: 500 }
    );
  }
}
