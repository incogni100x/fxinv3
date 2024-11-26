-- CreateTable
CREATE TABLE "OnBoarding" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "address" TEXT,
    "postalCode" TEXT,
    "identityDocType" TEXT,
    "identityFrontUrl" TEXT,
    "identityBackUrl" TEXT,
    "selfieImageUrl" TEXT,
    "investmentPlan" TEXT NOT NULL,
    "kycComplete" BOOLEAN NOT NULL DEFAULT false,
    "lastStep" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnBoarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnBoarding_userId_key" ON "OnBoarding"("userId");
