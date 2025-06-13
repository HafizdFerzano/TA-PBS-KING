-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shape" (
    "id" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "formulaArea" TEXT NOT NULL,
    "formulaPerimeter" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Shape_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrArCode" (
    "id" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "QrArCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nama_key" ON "User"("nama");
