"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas/auth";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";

import FormButton from "@/components/ui/form-button";
import { FormWrapper } from "./form-wrapper";

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",

      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
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
