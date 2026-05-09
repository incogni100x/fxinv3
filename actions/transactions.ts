"use server";
import { DepositSchema } from "@/app/(dashboard)/deposits/components/deposit-form";
import { withdrawalSchema } from "@/app/(dashboard)/withdrawals/components/withdraw";
import BillingDepositEmail from "@/emails/billing-deposit-bank";

import BillingDepositBankSupport from "@/emails/billing-deposit-bank-support";

import SupportEmail from "@/emails/support-email";
import BillingWithdrawalNotification from "@/emails/withdrawal";
import SupportWithdrawalNotificationEmail from "@/emails/withdrawal-support";
import prisma from "@/lib/db";
import { getUser } from "@/lib/supabase/user";
import { ContactUsSchema } from "@/schemas/auth";
import { Transaction } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const Deposit = async (values: z.infer<typeof DepositSchema>) => {
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  // Retrieve the user investment and plan in a single query using `include`
  const userInvestmentWithPlan = await prisma.investment.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      plan: true, // Include related investment plan
    },
  });

  // // Check if user has an active investment
  // if (!userInvestmentWithPlan) {
  //   return { error: "You need to have an active investment to make a deposit" };
  // }
  const investment = userInvestmentWithPlan?.plan;

  // Check if investment plan exists and validate minimum deposit
  if (!investment) {
    return { error: "Investment Plan not found" };
  }
  if (
    investment.minAmount > Number(values.amount)
    // userInvestmentWithPlan?.status === "inactive"
  ) {
    return {
      error: `You need to send a minimum deposit of ${investment.minAmount} for your ${investment.name} plan`,
    };
  }

  // Create the transaction
  const transaction = await prisma.transaction.create({
    data: {
      type: "deposit",
      ...values,
      amount: Number(values.amount),
      userId: user.id,
    },
  });

  // Send the appropriate email

  const { error } = await sendBillingDepositEmail(user, transaction);
  if (error) {
    return { error: error.message };
  }

  return { success: "Transaction successfully initiated" };
};

export const Withdrawal = async (values: z.infer<typeof withdrawalSchema>) => {
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  // // Check if the total approved deposits are enough to cover the withdrawal
  // const totalDeposits = await prisma.transaction.aggregate({
  //   _sum: {
  //     amount: true,
  //   },
  //   where: {
  //     userId: user.id,
  //     type: "deposit",
  //     status: "approved", // Assuming you have a status field for approved deposits
  //   },
  // });

  // const totalApprovedDepositAmount = totalDeposits._sum.amount || 0;

  // if (totalApprovedDepositAmount < Number(values.amount)) {
  //   return {
  //     error: "Insufficient approved deposit amount for this withdrawal",
  //   };
  // }

  // Create the transaction
  await prisma.transaction.create({
    data: {
      type: "withdrawal",
      method: values.paymentMethod,
      amount: Number(values.amount),
      userId: user.id,
    },
  });

  const data = {
    first_name: user.user_metadata.first_name,
    userEmail: user.email,
    ...values,
  };

  const { error } = await resend.batch.send([
    {
      from: `Ever Green Pro Trades <billing@${process.env.RESEND_DOMAIN}>`,
      to: [user.email as string],
      subject: "Withdrawal Request ",
      react: BillingWithdrawalNotification(data),
    },
    {
      from: `Ever Green Pro Trades <billing@${process.env.RESEND_DOMAIN}>`,
      replyTo: [`support@${process.env.RESEND_DOMAIN}`],
      to: [`support@${process.env.RESEND_DOMAIN}`],
      subject: "Withdrawal Request ",
      react: SupportWithdrawalNotificationEmail(data),
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  return { success: "Withdrawal request successfully initiated" };
};

const sendBillingDepositEmail = async (
  user: User,
  transaction: Transaction
) => {
  return resend.batch.send([
    {
      from: `Ever Green Pro Trades <billing@${process.env.RESEND_DOMAIN}>`,
      to: [user.email as string],
      subject: "Deposit Initiated",
      react: BillingDepositEmail({
        email: user.email,
        method: transaction.method,
      }),
    },
    {
      from: `Ever Green Pro Trades <billing@${process.env.RESEND_DOMAIN}>`,
      replyTo: [`support@${process.env.RESEND_DOMAIN}`],
      to: [`support@${process.env.RESEND_DOMAIN}`],
      subject: "Deposit Initiated ",
      react: BillingDepositBankSupport({
        email: user.email,
        transaction,
      }),
    },
  ]);
};

export async function contactUs(values: z.infer<typeof ContactUsSchema>) {
  const validatedFields = ContactUsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const data = validatedFields.data;
  await resend.emails.send({
    from: `Ever Green Pro Trades <contact@${process.env.RESEND_DOMAIN}>`,
    to: [`support@${process.env.RESEND_DOMAIN}`],
    subject: "Contact Us",
    react: SupportEmail(data),
  });

  return { success: "Message sent ,We would be in touch" };
}
