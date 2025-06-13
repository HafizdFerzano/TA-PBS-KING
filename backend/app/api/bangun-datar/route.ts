import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { randomUUID } from "crypto";
import { db } from "@/lib/prismaClient";

export async function GET(req: NextRequest) {
  try {
    const shapes = await db.shape.findMany();

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 200,
          message: "Data shape berhasil diambil.",
        },
        data: shapes,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: "Gagal mengambil data shape.",
        },
        error: error?.message || error,
      },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const shape = formData.get("shape") as string;
    const title = formData.get("title") as string;
    const color = formData.get("color") as string;
    const formulaArea = formData.get("formulaArea") as string;
    const formulaPerimeter = formData.get("formulaPerimeter") as string;
    const contentFile = formData.get("content") as File;
    const audioFile = formData.get("audio") as File;

    if (
      !shape ||
      !title ||
      !color ||
      !formulaArea ||
      !formulaPerimeter ||
      !contentFile ||
      !audioFile
    ) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 400,
            message: "Semua field harus diisi.",
          },
        },
        { status: 400 }
      );
    }

    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    const bucket = "shape-assets";

    if (contentFile.size > MAX_FILE_SIZE || audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 409,
            message: "Ukuran file terlalu besar. Maksimal 1MB.",
          },
        },
        { status: 409 }
      );
    }

    // Upload gambar (content)
    const contentPath = `images/${randomUUID()}.${contentFile.name
      .split(".")
      .pop()}`;
    const contentBuffer = await contentFile.arrayBuffer();

    const { error: contentError } = await supabase.storage
      .from(bucket)
      .upload(contentPath, contentBuffer, {
        contentType: contentFile.type,
        upsert: false,
      });

    if (contentError) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 500,
            message: `Gagal upload gambar: ${contentError.message}`,
          },
        },
        { status: 500 }
      );
    }

    // Upload audio
    const audioPath = `audio/${randomUUID()}.${audioFile.name
      .split(".")
      .pop()}`;
    const audioBuffer = await audioFile.arrayBuffer();

    const { error: audioError } = await supabase.storage
      .from(bucket)
      .upload(audioPath, audioBuffer, {
        contentType: audioFile.type,
        upsert: false,
      });

    if (audioError) {
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            status: 500,
            message: `Gagal upload audio: ${audioError.message}`,
          },
        },
        { status: 500 }
      );
    }

    // Ambil public URL
    const { data: contentData } = supabase.storage
      .from(bucket)
      .getPublicUrl(contentPath);
    const { data: audioData } = supabase.storage
      .from(bucket)
      .getPublicUrl(audioPath);

    // Simpan ke database
    const savedShape = await db.shape.create({
      data: {
        shape,
        title,
        color,
        formulaArea,
        formulaPerimeter,
        content: contentData.publicUrl,
        audio: audioData.publicUrl,
      },
    });

    return NextResponse.json(
      {
        metadata: {
          error: 0,
          status: 201,
          message: "Berhasil menyimpan data shape.",
        },
        data: savedShape,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          status: 500,
          message: "Terjadi kesalahan server saat upload shape.",
        },
      },
      { status: 500 }
    );
  }
}
