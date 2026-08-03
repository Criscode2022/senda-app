-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'COORD');

-- CreateEnum
CREATE TYPE "PreferredSlot" AS ENUM ('MORNING', 'AFTERNOON', 'ANY');

-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('COMPANY', 'ERRAND', 'WALK', 'OTHER');

-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('NEW', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STAFF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitRequest" (
    "id" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "beneficiaryAge" INTEGER,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT,
    "preferredDate" TIMESTAMP(3),
    "preferredSlot" "PreferredSlot" NOT NULL DEFAULT 'ANY',
    "visitType" "VisitType" NOT NULL DEFAULT 'COMPANY',
    "notes" TEXT,
    "status" "VisitStatus" NOT NULL DEFAULT 'NEW',
    "assignedToId" TEXT,
    "staffNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "VisitRequest" ADD CONSTRAINT "VisitRequest_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
