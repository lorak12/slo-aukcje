/*
  Warnings:

  - You are about to drop the column `userId` on the `Bid` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_userId_fkey";

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "userId";
