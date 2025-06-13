import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
export async function GET(req: NextRequest) {
  try {
    const check = db.shape.findMany({});

    if ((await check).length < 1) {
      await db.shape.createMany({
        data: [
          {
            shape: "square",
            title: "Square",
            color: "red",
            formulaArea: "side × side",
            formulaPerimeter: "4 × side",
            content: "/assets/square.png",
            audio: "/sounds/test.mp3",
          },
          {
            shape: "triangle",
            title: "Triangle",
            color: "blue",
            formulaArea: "½ × base × height",
            formulaPerimeter: "sum of all sides",
            content: "/assets/triangle.png",
            audio: "/sounds/test.mp3",
          },
          {
            shape: "circle",
            title: "Circle",
            color: "green",
            formulaArea: "π × radius²",
            formulaPerimeter: "2 × π × radius",
            content: "/assets/circle.png",
            audio: "/sounds/test.mp3",
          },
          {
            shape: "rectangle",
            title: "Rectangle",
            color: "purple",
            formulaArea: "length × width",
            formulaPerimeter: "2 × (length + width)",
            content: "/assets/rectangle.png",
            audio: "/sounds/test.mp3",
          },
        ],
      });
    }

    // await db.shape.deleteMany({});

    const shapes = await db.shape.findMany();
    return NextResponse.json(shapes, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({
      status: 500,
    });
  }
}
