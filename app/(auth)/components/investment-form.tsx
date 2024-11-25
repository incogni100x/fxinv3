"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessTypeSchema } from "@/schemas/auth";
import { FormWrapper } from "./form-wrapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormError } from "@/components/ui/form-error";
import { authAxios } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormButton from "@/components/ui/form-button";

export default function BusinessTypeForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof BusinessTypeSchema>>({
    resolver: zodResolver(BusinessTypeSchema),
    defaultValues: {
      business_type: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof BusinessTypeSchema>) => {
    try {
      setIsPending(true);
      const email = sessionStorage.getItem("email");
      if (!email) {
        setError("Email is required");
      }
      const payload = { ...values, email };
      const response = await authAxios.put(`/`, payload);
      console.log(response);
      const data = response.data;
      if (response.status === 200 && data.status === true) {
        toast.success(data.message);
        router.refresh();
        router.push("developer-onboarding");
        sessionStorage.setItem("authStep", "4");
      }
    } catch (err: unknown) {
      //@ts-expect-error - The error object is of type unknown
      setError(err?.response?.data.message || "Oops,Something went wrong");
      //@ts-expect-error - The error object is of type unknown
      console.log(err.response);
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FormWrapper
      currentStep="3"
      lastStep="4"
      Label="What Type of Business Do You Own?"
      description="Choose the option that best describes your business type"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />
          <div className={"flex flex-col gap-10"}>
            <FormField
              control={form.control}
              name="business_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-4"
                    >
                      <FormItem>
                        <label
                          className={`flex items-center justify-between border rounded-md p-6 ${
                            field.value === "starter"
                              ? "bg-primary-100 border-primary-300"
                              : ""
                          }`}
                        >
                          <div className="flex flex-col gap-2">
                            <FormLabel
                              className={`font-semibold tracking-tight ${
                                field.value === "starter" && "text-primary-800"
                              }`}
                            >
                              Starter Business
                            </FormLabel>
                            <FormDescription
                              className={`text-neutral-600 tracking-tight ${
                                field.value === "starter" && "text-primary-700"
                              }`}
                            >
                              I&apos;m testing my ideas with real customers and
                              preparing to register my company.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <RadioGroupItem
                              value="starter"
                              className="hidden"
                            />
                          </FormControl>
                        </label>
                      </FormItem>
                      <FormItem>
                        <label
                          className={`flex items-center justify-between border rounded-md p-6 ${
                            field.value === "registered"
                              ? "bg-primary-100 border-primary"
                              : ""
                          }`}
                        >
                          <div className="flex flex-col gap-2">
                            <FormLabel
                              className={`font-semibold tracking-tight ${
                                field.value === "registered" &&
                                "text-primary-800"
                              }`}
                            >
                              Registered Business
                            </FormLabel>
                            <FormDescription
                              className={`text-neutral-600 tracking-tight ${
                                field.value === "registered" &&
                                "text-primary-700"
                              }`}
                            >
                              My business has the approval, documentation, and
                              licenses required to operate legally.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <RadioGroupItem
                              value="registered"
                              className="hidden"
                            />
                          </FormControl>
                        </label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center items-center">
              <FormButton
                type="submit"
                isPending={isPending}
                size={"lg"}
                title="Continue"
              />
            </div>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
