-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "businessId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
