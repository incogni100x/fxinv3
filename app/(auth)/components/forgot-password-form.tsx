"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState, useTransition } from "react";

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
import { reset } from "@/actions/auth";
import { FormSuccess } from "@/components/ui/form-success";

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setSuccess("");
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setError("");
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Oops! Something went wrong!"));
    });
  };

  return (
    <FormWrapper
      Label="Forgot Your Password?"
      description=" We’ll send you an email with instructions to reset your password."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />
          <FormSuccess message={success} />
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
