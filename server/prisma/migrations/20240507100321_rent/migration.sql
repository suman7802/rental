/*
  Warnings:

  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `govId2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.
  - The `verified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "VerifiedStatus" AS ENUM ('notVerified', 'requested', 'rejected', 'verified');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "description",
DROP COLUMN "govId2",
DROP COLUMN "picture",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "profile" TEXT,
DROP COLUMN "verified",
ADD COLUMN     "verified" "VerifiedStatus" NOT NULL DEFAULT 'notVerified';
