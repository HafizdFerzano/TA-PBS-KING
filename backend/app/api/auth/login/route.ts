import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { nama, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: { nama },
  });

  if (!user || !(await compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, nama: user.nama },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  console.log("JWT_SECRET dari login:", process.env.JWT_SECRET);

  return NextResponse.json({ token });
}
