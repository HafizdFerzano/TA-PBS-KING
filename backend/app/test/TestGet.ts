import { NextRequest, NextResponse } from "next/server";

export const test = (teks: string) => {
  NextResponse.json({
    status: 200,
    message: `teks`,
  });
};
