import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismaClient";
import { supabase } from "@/lib/supabaseClient";

// Utility untuk ekstrak path dari Supabase public URL
function getFilePathFromUrl(publicUrl: string, bucket: string): string | null {
  const url = new URL(publicUrl);
  const match = url.pathname.match(new RegExp(`/${bucket}/(.+)$`));
  return match ? match[1] : null;
}

// ✅ PUT: Update shape by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    const existing = await db.shape.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 404,
            message: "Shape tidak ditemukan.",
          },
        },
        { status: 404 }
      );
    }

    const bucket = "shape-bucket"; // ganti sesuai nama bucket kamu

    // Hapus file lama jika URL content/audio berubah
    if (body.content && body.content !== existing.content) {
      const oldContentPath = getFilePathFromUrl(existing.content, bucket);
      if (oldContentPath) {
        await supabase.storage.from(bucket).remove([oldContentPath]);
      }
    }

    if (body.audio && body.audio !== existing.audio) {
      const oldAudioPath = getFilePathFromUrl(existing.audio, bucket);
      if (oldAudioPath) {
        await supabase.storage.from(bucket).remove([oldAudioPath]);
      }
    }

    const updated = await db.shape.update({
      where: { id },
      data: {
        shape: body.shape,
        title: body.title,
        color: body.color,
        formulaArea: body.formulaArea,
        formulaPerimeter: body.formulaPerimeter,
        content: body.content,
        audio: body.audio,
      },
    });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 200,
          message: "Berhasil memperbarui data shape.",
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
          message: "Gagal memperbarui shape.",
        },
        error: error?.message || error,
      },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Delete shape by ID dan hapus file Supabase
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const existing = await db.shape.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 404,
            message: "Shape tidak ditemukan.",
          },
        },
        { status: 404 }
      );
    }

    const bucket = "shape-bucket";

    const contentPath = getFilePathFromUrl(existing.content, bucket);
    const audioPath = getFilePathFromUrl(existing.audio, bucket);

    if (contentPath) {
      await supabase.storage.from(bucket).remove([contentPath]);
    }

    if (audioPath) {
      await supabase.storage.from(bucket).remove([audioPath]);
    }

    await db.shape.delete({ where: { id } });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 200,
          message: "Shape berhasil dihapus.",
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
          message: "Gagal menghapus shape.",
        },
        error: error?.message || error,
      },
      { status: 500 }
    );
  }
}
