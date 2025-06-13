import { test } from "@/app/test/TestGet";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json("Users")
}
