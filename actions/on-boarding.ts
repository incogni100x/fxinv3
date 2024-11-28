"use server";
import prisma from "@/lib/db";
import { getUser } from "@/lib/supabase/user";
import { AddressSchema, InvestmentPlanSchema } from "@/schemas/onboarding";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createOnboarding = async (
  values: z.infer<typeof InvestmentPlanSchema>,
  lastStep: number
) => {
  // Get user information
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized access. Please log in." };
  }

  // Validate form values using Zod
  const { success, data: validatedFields } =
    InvestmentPlanSchema.safeParse(values);
  if (!success) {
    return { error: "Invalid form submission. Please check your input." };
  }
  const { investmentPlan } = validatedFields;

  // Check if user has already completed onboarding
  const [existingOnboarding, existingInvestment] = await Promise.all([
    prisma.onBoarding.findFirst({ where: { userId: user.id } }),
    prisma.investmentPlan.findFirst({ where: { id: investmentPlan } }),
  ]);

  if (existingOnboarding) {
    return { error: "An onboarding entry already exists for this user." };
  }

  if (!existingInvestment) {
    return { error: "The selected investment plan does not exist." };
  }

  // Create onboarding and investment entries
  const userName = user.user_metadata.first_name;
  await Promise.all([
    prisma.onBoarding.create({
      data: {
        userName,
        userId: user.id,
        lastStep,
      },
    }),
    prisma.investment.create({
      data: {
        userId: user.id,
        planId: investmentPlan,
        planName: existingInvestment.name,
        userName,
      },
    }),
  ]);

  // Redirect user to the next step
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
      lastStep,
    },
  });

  redirect(`/overview`);
};
