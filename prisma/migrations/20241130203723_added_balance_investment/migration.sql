/*
  Warnings:

  - You are about to drop the column `amount` on the `Investment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Investment" DROP COLUMN "amount",
ADD COLUMN     "balance" DOUBLE PRECISION DEFAULT 0;
