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

import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";

import FormButton from "@/components/ui/form-button";
import { FormWrapper } from "./form-wrapper";
import { AddressSchema } from "@/schemas/onboarding";
import { CountryDropdown } from "@/components/ui/country-dropdown";

export default function AddressForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      country: "",
      address: "",
      state: "",
      city: "",
      postal_code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddressSchema>) => {
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
      Label="Address Form"
      description="Please fill out the form below with your address details."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Label>Country</Label>
                  <CountryDropdown
                    placeholder="Select country"
                    defaultValue={field.value}
                    disabled={isPending}
                    onChange={(country) => {
                      field.onChange(country.name);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <Label>Address</Label>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      {...field}
                      disabled={isPending}
                      placeholder="Enter address"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <Label>State</Label>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      {...field}
                      disabled={isPending}
                      placeholder="Enter state"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <Label>City</Label>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      {...field}
                      disabled={isPending}
                      placeholder="Enter city"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <Label>Postal Code</Label>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      {...field}
                      disabled={isPending}
                      placeholder="Enter Postal Code"
                      type="number"
                    />
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
            title="Continue"
          />
        </form>
      </Form>
    </FormWrapper>
  );
}
