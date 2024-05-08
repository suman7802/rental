/*
  Warnings:

  - The `category` column on the `Unit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RentalCategory" AS ENUM ('ride', 'thing', 'place');

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_unit_fkey";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "category",
ADD COLUMN     "category" "RentalCategory" NOT NULL DEFAULT 'place';

-- DropTable
DROP TABLE "Image";

-- DropEnum
DROP TYPE "rentalCategory";

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "unit" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_unit_fkey" FOREIGN KEY ("unit") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
