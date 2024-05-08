/*
  Warnings:

  - You are about to drop the column `name` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `description` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "rentalCategory" AS ENUM ('ride', 'thing', 'place');

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "category" "rentalCategory" NOT NULL DEFAULT 'place',
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropEnum
DROP TYPE "rentalType";
