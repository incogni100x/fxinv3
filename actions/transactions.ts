"use server";
import { DepositSchema } from "@/app/(dashboard)/deposits/components/deposit-form";
import BillingDepositBank from "@/emails/billing-deposit-bank";
import BillingDepositBankSupport from "@/emails/billing-deposit-bank-support";
import BillingDepositCrypto from "@/emails/billing-deposit-crypto";
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
      to: ["cow@elitepromarkets.com"],
      subject: "Deposit Initiated Bank",
      react: BillingDepositBankSupport({
        email: user.user_metadata.first_name,
      }),
    },
  ]);
};
