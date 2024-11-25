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
import { SignUpSchema } from "@/schemas/auth";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";

import FormButton from "@/components/ui/form-button";
import { FormWrapper } from "./form-wrapper";

export default function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      first_name: "",
      email: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
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
      Label="Create Account"
      description="Let's get started with setting up your account."
      currentStep="1"
      lastStep="4"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <Label>First Name</Label>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      {...field}
                      disabled={isPending}
                      placeholder="Enter first name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <Label>Last Name</Label>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      {...field}
                      disabled={isPending}
                      placeholder="Enter last name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      placeholder="Enter your email address"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        placeholder="Create a password"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm Password</Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="bg-muted"
                        autoComplete="new-password"
                        {...field}
                        disabled={isPending}
                        placeholder="Re-enter your password"
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
            isPending={isPending}
            className="w-full"
            size={"lg"}
            title="Create an account"
          />

          <div className="flex justify-center items-center text-neutral-800 tracking-tight">
            Already have an account?
            <Link className="p-0 font-normal text-primary" href="/login">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
