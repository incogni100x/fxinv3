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

import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";

import FormButton from "@/components/ui/form-button";
import { FormWrapper } from "./form-wrapper";
import { AddressSchema } from "@/schemas/onboarding";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { updateAddressOnboarding } from "@/actions/on-boarding";

export default function AddressForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      country: "",
      address: "",
      state: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddressSchema>) => {
    startTransition(() => {
      updateAddressOnboarding(values, 2)
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
    <FormWrapper
      Label="Address Form"
      description="Please fill out the form below with your address details."
      lastStep="4"
      currentStep="2"
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
                      className="border-gray-700 bg-[#111827] text-white placeholder:text-gray-500 focus-visible:ring-primary"
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
                      className="border-gray-700 bg-[#111827] text-white placeholder:text-gray-500 focus-visible:ring-primary"
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
                      className="border-gray-700 bg-[#111827] text-white placeholder:text-gray-500 focus-visible:ring-primary"
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
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <Label>Postal Code</Label>
                  <FormControl>
                    <Input
                      className="border-gray-700 bg-[#111827] text-white placeholder:text-gray-500 focus-visible:ring-primary"
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
