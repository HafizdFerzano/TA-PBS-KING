import { supabase } from "@/lib/supabaseClient";
import { db } from "@/lib/prismaClient";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
    try {
        
    } catch (error: unknown) {
        
    }
}