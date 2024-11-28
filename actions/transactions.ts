"use server";
import { DepositSchema } from "@/app/(dashboard)/deposits/components/deposit-form";
import { withdrawalSchema } from "@/app/(dashboard)/withdrawals/components/withdraw";
import BillingDepositBank from "@/emails/billing-deposit-bank";
import BillingDepositBankSupport from "@/emails/billing-deposit-bank-support";
import BillingDepositCrypto from "@/emails/billing-deposit-crypto";
import BillingWithdrawalNotification from "@/emails/withdrawal";
import SupportWithdrawalNotificationEmail from "@/emails/withdrawal-support";
import prisma from "@/lib/db";
import { getUser } from "@/lib/supabase/user";
import { User } from "@supabase/supabase-js";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const Deposit = async (values: z.infer<typeof DepositSchema>) => {
  const user = await getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const emailAction =
    values.method === "crypto" ? sendCryptoEmail : sendBankEmail;

  // Create the transaction
  await prisma.transaction.create({
    data: {
      type: "deposit",
      ...values,
      amount: Number(values.amount),
      userId: user.id,
    },
  });

  // Send the appropriate email
  const { error } = await emailAction(user, values);
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

  // Check if the total approved deposits are enough to cover the withdrawal
  const totalDeposits = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId: user.id,
      type: "deposit",
      status: "approved", // Assuming you have a status field for approved deposits
    },
  });

  const totalApprovedDepositAmount = totalDeposits._sum.amount || 0;

  if (totalApprovedDepositAmount < Number(values.amount)) {
    return {
      error: "Insufficient approved deposit amount for this withdrawal",
    };
  }

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
      from: `Elite Pro Markets <billing@${process.env.RESEND_DOMAIN}>`,
      to: [user.email as string],
      subject: "Withdrawal Request ",
      react: BillingWithdrawalNotification(data),
    },
    {
      from: `Elite Pro Markets <billing@${process.env.RESEND_DOMAIN}>`,
      replyTo: [`support@elitepromarkets.com`],
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

const sendCryptoEmail = async (
  user: User,
  values: z.infer<typeof DepositSchema>
) => {
  return resend.emails.send({
    from: `Elite Pro Markets <billing@${process.env.RESEND_DOMAIN}>`,
    to: [`support@${process.env.RESEND_DOMAIN}`],
    subject: "Deposit Initiated Crypto",
    react: BillingDepositCrypto({
      email: user.email,
      wallet: values.currency,
    }),
  });
};

const sendBankEmail = async (user: User) => {
  return resend.batch.send([
    {
      from: `Elite Pro Markets <billing@${process.env.RESEND_DOMAIN}>`,
      to: [user.email as string],
      subject: "Deposit Initiated",
      react: BillingDepositBank({
        first_name: user.user_metadata.first_name,
      }),
    },
    {
      from: `Elite Pro Markets <billing@${process.env.RESEND_DOMAIN}>`,
      replyTo: [`support@elitepromarkets.com`],
      to: [`support@${process.env.RESEND_DOMAIN}`],
      subject: "Deposit Initiated Bank",
      react: BillingDepositBankSupport({
        email: user.user_metadata.first_name,
      }),
    },
  ]);
};
