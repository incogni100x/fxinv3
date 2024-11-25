"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";

import Link from "next/link";

import { toast } from "sonner";

import FormButton from "@/components/ui/form-button";
import { FormWrapper } from "./form-wrapper";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      console.log(values);

      //   setIsPending(true);
      //   const response = await authAxios.post(`/register`, values);

      //   if (response.status === 201) {
      //     sessionStorage.setItem("email", values.business_email);
      //     sessionStorage.setItem("authStep", "2");
      //     toast.success(response.data.message);
      //     router.refresh();
      //     router.push("/verify-otp");
      //   }
    } catch (err: unknown) {
      //@ts-expect-error - The error object is of type unknown
      setError(err?.response?.data.message || "Oops,Something went wrong");
      //@ts-expect-error - The error object is of type unknown
      console.log(err.response);
      setIsPending(false);
    }
  };

  return (
    <FormWrapper
      Label="Forgot Your Password?"
      description=" We’ll send you an email with instructions to reset your password."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-muted"
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your email address"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <FormButton
              isPending={isPending}
              size={"lg"}
              title="Send reset link"
            />

            <Button
              className="text-black"
              size={"lg"}
              asChild
              variant={"ghost"}
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
