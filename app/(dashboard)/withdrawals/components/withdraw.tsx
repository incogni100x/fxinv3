"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormButton from "@/components/ui/form-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormWrapper } from "@/app/(auth)/components/form-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { MessageAdd } from "iconsax-react";
import { MailPlus } from "lucide-react";
import { Withdrawal } from "@/actions/transactions";
import { useRouter } from "next/navigation";

// Schema with dynamic validation
export const withdrawalSchema = z
  .object({
    paymentMethod: z.enum(["bank", "crypto"], {
      required_error: "Please select a payment method.",
    }),
    bankDetails: z
      .object({
        bankName: z.string().min(1, "Bank name is required."),
        accountNumber: z.string().min(10, "Account number must be 10 digits."),
        routingNumber: z.string().min(9, "Routing number must be 9 digits."),
        accountName: z.string().min(1, "Account name is required."),
        accountType: z.enum(["checking", "savings"], {
          required_error: "Please select an account type.",
        }),
      })
      .optional(),
    cryptoDetails: z
      .object({
        currency: z.string().min(1, "Currency is required."),
        address: z.string().min(1, "Wallet address is required."),
      })
      .optional(),
    amount: z.string().min(1, "Amount is required."),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "bank") {
        return data.bankDetails !== undefined; // Require bank details if bank is selected
      }
      if (data.paymentMethod === "crypto") {
        return data.cryptoDetails !== undefined; // Require crypto details if crypto is selected
      }
      return true;
    },
    {
      message: "Please provide details for the selected payment method.",
      path: ["paymentMethod"],
    }
  );

const wallets = [
  { name: "Bitcoin", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
  { name: "Ethereum", address: "0xfg95fig5iojigdoig59054" },
  { name: "Usdt", address: "0xfg95fig5iojigdoig59054" },
];

export default function WithdrawalForm() {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "bank" | "crypto" | null
  >(null);
  const form = useForm<z.infer<typeof withdrawalSchema>>({
    resolver: zodResolver(withdrawalSchema),
  });
  const router = useRouter();
  const handleFormSubmit = (values: z.infer<typeof withdrawalSchema>) => {
    startTransition(() => {
      Withdrawal(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          } else {
            form.reset();
            setDialogOpen(true);
            toast.success(data.success);
            router.push("/transaction-history");
          }
        })
        .catch(() => toast.error("Oops! Something went wrong!"));
    });
  };

  return (
    <FormWrapper
      Label="Request a Withdrawal"
      description="Choose a withdrawal method, enter the amount, and follow the instructions to complete your withdrawal."
      className="max-w-lg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <Label>Withdrawal Method</Label>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value: "bank" | "crypto") => {
                      field.onChange(value);
                      setSelectedMethod(value);
                      // Reset form fields based on the selected payment method
                      form.reset({
                        paymentMethod: value,
                        amount: "",
                        bankDetails: value === "bank" ? {} : undefined,
                        cryptoDetails: value === "crypto" ? {} : undefined,
                      });
                    }}
                    disabled={isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedMethod === "crypto" && (
              <>
                <FormField
                  control={form.control}
                  name="cryptoDetails.currency"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Select Cryptocurrency</Label>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select cryptocurrency" />
                        </SelectTrigger>
                        <SelectContent>
                          {wallets.map((wallet) => (
                            <SelectItem key={wallet.name} value={wallet.name}>
                              {wallet.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cryptoDetails.address"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Address</Label>
                      <FormControl>
                        <Input
                          placeholder="Enter wallet address"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {selectedMethod === "bank" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="bankDetails.accountType"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Account type</Label>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.accountName"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Account Name</Label>
                      <FormControl>
                        <Input
                          placeholder="Enter account name"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Account Number</Label>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter account number"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.bankName"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Bank Name</Label>
                      <FormControl>
                        <Input
                          placeholder="Enter bank name"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.routingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Routing number</Label>
                      <FormControl>
                        <Input
                          placeholder="Enter routing number"
                          type="number"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <Label>Withdrawal Amount</Label>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormButton
            className="w-full"
            isPending={isPending}
            size="lg"
            title="Withdraw"
          />
        </form>
      </Form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <div className="text-center flex justify-center items-center flex-col space-y-4">
            <MailPlus className="h-20 w-20 text-primary" />
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-center">
                Withdrawal Request Submitted
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-center">
                Your withdrawal request has been submitted. Please allow 1-3
                business days for processing.
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </FormWrapper>
  );
}
