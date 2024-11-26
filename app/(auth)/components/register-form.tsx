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
import { usePathname, useRouter } from "next/navigation";
import { SignUpSchema } from "@/schemas/auth";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";

import FormButton from "@/components/ui/form-button";
import { FormWrapper } from "./form-wrapper";
import { postEmail } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import VerifyOtpForm from "./verify-otp";

export default function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isOtpDialogOpen, setOtpDialogOpen] = useState(false);

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
    setIsPending(true); // Indicate the form is submitting
    setError(undefined); // Clear previous errors

    try {
      const json = await postEmail({
        email: values.email,
        password: values.password,
      });

      if (!json.error) {
        // Successful response

        setOtpDialogOpen(true);
      } else {
        // Error from the API
        if (json.error.code) {
          toast.error(json.error.code);
        } else if (json.error.message) {
          toast.error(json.error.message);
        }
      }
    } catch (err: unknown) {
      // Catch unexpected errors
      const errorMessage =
        //@ts-expect-error - Error type inference
        err?.response?.data?.message || "Oops, something went wrong.";
      setError(errorMessage);
      toast.error(errorMessage);

      // Optional: Log the error for debugging
      //@ts-expect-error - Error type inference
      console.error(err.response || err);
    } finally {
      setIsPending(false); // Reset pending state
    }
  };

  return (
    <>
      <FormWrapper
        Label="Create Account"
        description="Let's get started with setting up your account."
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

      <Dialog open={isOtpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Email Verification</DialogTitle>
            <DialogDescription>
              An OTP has been sent to your email address. Please enter the
              6-digit code below to verify your account.
            </DialogDescription>
          </DialogHeader>
          <VerifyOtpForm
            email={form.getValues("email")}
            password={form.getValues("password")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
