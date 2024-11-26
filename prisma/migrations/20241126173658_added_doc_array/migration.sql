/*
  Warnings:

  - You are about to drop the column `identityBackUrl` on the `OnBoarding` table. All the data in the column will be lost.
  - You are about to drop the column `identityFrontUrl` on the `OnBoarding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OnBoarding" DROP COLUMN "identityBackUrl",
DROP COLUMN "identityFrontUrl",
ADD COLUMN     "identityImagesUrl" TEXT[];
