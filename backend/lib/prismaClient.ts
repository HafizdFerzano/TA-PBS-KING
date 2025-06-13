import { PrismaClient } from "@prisma/client";

//  Simpan instance Prisma di variabel global agar tidak membuat banyak koneksi saat development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

//  Gunakan instance yang sudah ada, atau buat baru jika belum ada
const prisma = globalForPrisma.prisma ?? new PrismaClient();

//  Saat dalam mode development (bukan production), simpan instance di variabel global
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}


export const db = prisma