import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismaClient";
import { supabase } from "@/lib/supabaseClient";

// Utility untuk ekstrak path dari Supabase public URL
function getFilePathFromUrl(publicUrl: string, bucket: string): string | null {
  const url = new URL(publicUrl);
  const match = url.pathname.match(new RegExp(`/${bucket}/(.+)$`));
  return match ? match[1] : null;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const formData = await req.formData();

    const shape = formData.get("shape")?.toString() || "";
    const title = formData.get("title")?.toString() || "";
    const color = formData.get("color")?.toString() || "";
    const formulaArea = formData.get("formulaArea")?.toString() || "";
    const formulaPerimeter = formData.get("formulaPerimeter")?.toString() || "";

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

    const bucket = "shape-assets";

    // Proses upload file content (image)
    let contentUrl = existing.content;
    const contentFile = formData.get("content") as File | null;
    if (contentFile && contentFile.size > 0) {
      const contentArrayBuffer = await contentFile.arrayBuffer();
      const contentExt = contentFile.name.split(".").pop();
      const contentPath = `content-${Date.now()}.${contentExt}`;
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(contentPath, contentArrayBuffer, {
          contentType: contentFile.type,
        });
      if (error) throw error;
      contentUrl = supabase.storage.from(bucket).getPublicUrl(contentPath)
        .data.publicUrl;

      const oldPath = getFilePathFromUrl(existing.content, bucket);
      if (oldPath) await supabase.storage.from(bucket).remove([oldPath]);
    }

    // Proses upload file audio
    let audioUrl = existing.audio;
    const audioFile = formData.get("audio") as File | null;
    if (audioFile && audioFile.size > 0) {
      const audioArrayBuffer = await audioFile.arrayBuffer();
      const audioExt = audioFile.name.split(".").pop();
      const audioPath = `audio-${Date.now()}.${audioExt}`;
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(audioPath, audioArrayBuffer, {
          contentType: audioFile.type,
        });
      if (error) throw error;
      audioUrl = supabase.storage.from(bucket).getPublicUrl(audioPath)
        .data.publicUrl;

      const oldPath = getFilePathFromUrl(existing.audio, bucket);
      if (oldPath) await supabase.storage.from(bucket).remove([oldPath]);
    }

    const updated = await db.shape.update({
      where: { id },
      data: {
        shape,
        title,
        color,
        formulaArea,
        formulaPerimeter,
        content: contentUrl,
        audio: audioUrl,
      },
    });

    return NextResponse.json({
      metadata: {
        error: 0,
        status: 200,
        message: "Berhasil memperbarui shape.",
      },
      data: updated,
    });
  } catch (err: any) {
    console.error("[PUT SHAPE ERROR]", err);
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: "Gagal memperbarui shape.",
        },
        error: err.message,
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

    const bucket = "shape-assets";

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
