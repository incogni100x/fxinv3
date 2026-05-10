"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormWrapper } from "./form-wrapper";

import { FormError } from "@/components/ui/form-error";
import FormButton from "@/components/ui/form-button";
import { TickCircle } from "iconsax-react";
import { InvestmentPlanSchema } from "@/schemas/onboarding";
import { createOnboarding } from "@/actions/on-boarding";
import { InvestmentPlan } from "@prisma/client";
import { plans } from "@/components/subscription-plans";

export default function InvestmentPlansForm({
  investmentPlans,
}: {
  investmentPlans: InvestmentPlan[];
}) {
  const mergedPlans = plans.map((staticPlan) => {
    const dbPlan = investmentPlans.find(
      (invPlan) => invPlan.name.toLowerCase() === staticPlan.name.toLowerCase()
    );

    return {
      ...staticPlan,
      id: dbPlan?.id || staticPlan.name, // Use ID from DB or fallback to name
      interestRate: dbPlan?.interestRate || null,
      durationDays: dbPlan?.durationDays || "N/A",
    };
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof InvestmentPlanSchema>>({
    resolver: zodResolver(InvestmentPlanSchema),
    defaultValues: {
      investmentPlan: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof InvestmentPlanSchema>) => {
    startTransition(() => {
      createOnboarding(values, 1)
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
      currentStep="1"
      lastStep="4"
      Label="Choose an Investment Plan"
      description="Select the investment plan that suits your goals."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />
          <FormField
            control={form.control}
            name="investmentPlan"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {mergedPlans.map((plan) => {
                      const isSelected = field.value === plan.id;

                      return (
                        <label
                          key={plan.name}
                          className={`relative flex cursor-pointer flex-col items-start justify-between rounded-md border p-6 transition-colors ${
                            isSelected
                              ? `${plan.color} border-2`
                              : "border-gray-700 bg-[#111827]"
                          }`}
                        >
                          {isSelected && (
                            <TickCircle
                              variant="Bold"
                              size="24"
                              className={`absolute top-2 right-2 ${plan.iconColor}`}
                            />
                          )}
                          <div className="flex flex-col space-y-2">
                            <FormLabel
                              className={`text-lg font-bold capitalize ${
                                isSelected ? "text-gray-950" : "text-white"
                              }`}
                            >
                              {plan.name}
                            </FormLabel>

                            <p
                              className={`text-sm font-medium ${
                                isSelected ? "text-gray-800" : "text-gray-300"
                              }`}
                            >
                              Price: ${plan.price.toLocaleString()}
                            </p>
                            <p
                              className={`text-sm font-medium ${
                                isSelected ? "text-gray-800" : "text-gray-300"
                              }`}
                            >
                              Weekly Earnings: {plan.weeklyEarnings}
                            </p>
                            <p
                              className={`text-sm font-medium ${
                                isSelected ? "text-gray-800" : "text-gray-300"
                              }`}
                            >
                              ROI: ${plan.roi.toLocaleString()}
                            </p>
                          </div>
                          <RadioGroupItem value={plan.id} className="hidden" />
                        </label>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <FormButton
              type="submit"
              className="w-full"
              isPending={isPending}
              size="lg"
              title="Continue"
            />
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
