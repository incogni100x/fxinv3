"use server";
import prisma from "@/lib/db";
import { getUser } from "@/lib/supabase/user";
import {
  AddressSchema,
  IdentificationSchema,
  InvestmentPlanSchema,
} from "@/schemas/onboarding";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createOnboarding = async (
  values: z.infer<typeof InvestmentPlanSchema>,
  lastStep: number
) => {
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedFields = InvestmentPlanSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { investmentPlan } = validatedFields.data;

  const existingOnboarding = await prisma.onBoarding.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (existingOnboarding) {
    return { error: "Investment Plan has already been created" };
  }

  await prisma.onBoarding.create({
    data: {
      investmentPlan,
      userId: user.id,
      lastStep,
    },
  });

  redirect(`/choose-address`);
};
export const updateAddressOnboarding = async (
  values: z.infer<typeof AddressSchema>,
  lastStep: number
) => {
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedFields = AddressSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const data = validatedFields.data;

  const existingOnboarding = await prisma.onBoarding.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!existingOnboarding) {
    return { error: "Please select an investment plan" };
  }

  await prisma.onBoarding.update({
    where: {
      userId: user.id,
    },
    data: {
      ...data,
      lastStep,
    },
  });

  redirect(`/identification`);
};
export const updateDocumentIdentification = async (
  values: {
    document_type: string;
    images: string[];
  },
  lastStep: number
) => {
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const existingOnboarding = await prisma.onBoarding.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!existingOnboarding) {
    return { error: "Please select an investment plan" };
  }

  await prisma.onBoarding.update({
    where: {
      userId: user.id,
    },
    data: {
      identityDocType: values.document_type,
      identityImagesUrl: values.images,
      lastStep,
    },
  });

  redirect(`/selfie-verification`);
};
export const updateSelfieOnboarding = async (
  selfieUrl: string,
  lastStep: number
) => {
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const existingOnboarding = await prisma.onBoarding.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!existingOnboarding) {
    return { error: "Please select an investment plan" };
  }

  // Validate existing fields
  const requiredFields = [
    existingOnboarding.country,
    existingOnboarding.state,
    existingOnboarding.city,
    existingOnboarding.address,
    existingOnboarding.postalCode,
    existingOnboarding.identityDocType,
    existingOnboarding.identityImagesUrl?.length ? "valid" : null,
  ];

  const areAllFieldsValid = requiredFields.every(
    (field) => field && field.trim() !== ""
  );

  if (!areAllFieldsValid) {
    return {
      error:
        "KYC cannot be completed. Ensure all required fields are filled and valid.",
    };
  }

  // Update onboarding data
  await prisma.onBoarding.update({
    where: {
      userId: user.id,
    },
    data: {
      selfieImageUrl: selfieUrl,
      kycComplete: true,
      lastStep,
    },
  });

  redirect(`/overview`);
};
