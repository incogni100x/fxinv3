"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QRCodeSVG } from "qrcode.react"; // Import the QR code library
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
import { MailPlus } from "lucide-react";
import { Deposit } from "@/actions/transactions";
import { useRouter } from "next/navigation";
import { FormInfo } from "@/components/ui/form-info";

// Schema for validation
export const DepositSchema = z.object({
  method: z.string().min(1, "Select a deposit method"),
  currency: z.string().min(1, "Select a currency"),
  amount: z
    .string()
    .nonempty("Amount is required")
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Amount must be a positive number",
    }),
});

const wallets = [
  {
    name: "Bitcoin",
    address: "bc1qhzvfkacadyeur77wes5v3hutrn54vfrhx6hgy0",
  },
  {
    name: "Ethereum",
    address: "0xB74e482695963Eb7cAf01d76cEf9A3dd1A2ED92f",
  },
  {
    name: "USDT",
    address: "TEkWPH5Ah7ULnoeGSN2rnwMDu5YMYqCEbT",
  },
];

export default function DepositForm() {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<
    (typeof wallets)[number] | null
  >(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof DepositSchema>>({
    resolver: zodResolver(DepositSchema),
    defaultValues: {
      method: "",
      currency: "",
    },
  });

  const handleFormSubmit = (values: z.infer<typeof DepositSchema>) => {
    if (values.method === "crypto") {
      const wallet = wallets.find(
        (w) => w.name.toLowerCase() === values.currency?.toLowerCase()
      );
      if (wallet) {
        setSelectedCrypto(wallet);
        setDialogOpen(true);
      }
    } else {
      // Send data to backend
      startTransition(() => {
        Deposit(values)
          .then((data) => {
            if (data?.error) {
              toast.error(data.error);
            } else {
              toast.success(data.success);
              setDialogOpen(true);
              form.reset();
            }
          })
          .catch(() => toast.error("Oops! Something went wrong!"));
      });
    }
  };

  const handlePaymentConfirmation = () => {
    startTransition(() => {
      Deposit(form.getValues())
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          } else {
            form.reset();
            toast.success(data.success);
            router.push("/transactions-history");
          }
        })
        .catch(() => toast.error("Oops! Something went wrong!"));
    });
  };

  return (
    <FormWrapper
      Label="Make a Deposit"
      description="Choose a payment method, enter an amount, and follow the instructions to complete your deposit."
      className="max-w-lg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <FormInfo message="Please ensure you are sending payment to the right address .Double check before confirming the transaction " />
          <div className="space-y-4">
            <Label>Deposit Method</Label>
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedMethod(value);
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
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <Label>Select cryptocurrency</Label>
                    <Select disabled={isPending} onValueChange={field.onChange}>
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
            )}
            {selectedMethod === "bank" && (
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <Label>Select currency</Label>
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Usd">Usd</SelectItem>
                        <SelectItem value="Eur">Eur</SelectItem>
                        <SelectItem value="Gbp">Gbp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <Label>Amount</Label>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="$0.000000"
                      className="bg-muted"
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
            size={"lg"}
            title="Deposit"
          />
        </form>
      </Form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          {selectedMethod === "crypto" && selectedCrypto && (
            <div className="text-center space-y-4">
              <DialogHeader>
                <DialogTitle className="text-xl font-medium">
                  Wallet Address for {selectedCrypto.name}
                </DialogTitle>
              </DialogHeader>
              <div
                className="flex flex-col gap-2 bg-muted rounded-md p-4 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(selectedCrypto.address);
                  toast.success("Address copied to clipboard!");
                }}
                title="Click to copy address"
              >
                <p className="break-words text-sm">{selectedCrypto.address}</p>
              </div>
              <div className="flex items-center justify-center">
                <QRCodeSVG
                  value={
                    selectedCrypto.name === "Bitcoin"
                      ? `bitcoin:${selectedCrypto.address}`
                      : selectedCrypto.name === "Ethereum"
                      ? `ethereum:${selectedCrypto.address}`
                      : selectedCrypto.name === "USDT"
                      ? `trx:${selectedCrypto.address}` // Use TRX scheme for TRC20 tokens
                      : selectedCrypto.address // Fallback to raw address
                  }
                  size={150}
                  level="H" // High error correction for better scanning
                  includeMargin // Add margin for better QR code readability
                />
              </div>

              <DialogFooter>
                <FormButton
                  isPending={isPending}
                  className="w-full mt-4"
                  onClick={handlePaymentConfirmation}
                  size={"lg"}
                  title="I have made payment"
                />
              </DialogFooter>
            </div>
          )}
          {selectedMethod === "bank" && (
            <div className="text-center space-y-4 flex flex-col justify-center items-center">
              <div className="flex justify-center items-center">
                <MailPlus className="h-20 w-20 text-primary" />
              </div>
              <DialogHeader className="text-center">
                <DialogTitle className="text-xl font-medium text-center">
                  Request sent
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-center">
                  Our team will reach out to you soon with further details on
                  how to complete your payment via bank transfer.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="w-full"
                  size={"lg"}
                  onClick={() => {
                    setDialogOpen(false);
                    form.reset();
                    router.push("/transactions-history");
                  }}
                >
                  Done
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </FormWrapper>
  );
}
