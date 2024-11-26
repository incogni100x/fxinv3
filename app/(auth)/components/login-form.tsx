"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schemas/auth";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

import FormButton from "@/components/ui/form-button";
import { FormWrapper } from "./form-wrapper";
import { signIn } from "@/actions/auth";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const calLbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      signIn(values, calLbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
        })
        .catch(() => setError("Oops! Something went wrong!"));
    });
  };

  return (
    <FormWrapper Label="Log in to your account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      {...field}
                      disabled={isPending}
                      placeholder="Enter email address"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center  tracking-tight">
              <Link
                className="p-0 font-normal text-primary"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label> Password</Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="bg-muted"
                        autoComplete="new-password"
                        {...field}
                        disabled={isPending}
                        placeholder="Enter password"
                        type={showPassword ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeIcon
                            className="text-muted-foreground"
                            size={20}
                          />
                        ) : (
                          <EyeOffIcon
                            className="text-muted-foreground"
                            size={20}
                          />
                        )}
                      </span>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormButton
            className="w-full"
            isPending={isPending}
            size={"lg"}
            title="Login"
          />

          <div className="flex justify-center items-center text-neutral-800 tracking-tight">
            Don&apos;t have an account?
            <Link className="p-0 font-normal text-primary" href="/register">
              Register
            </Link>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
