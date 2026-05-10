"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpSchema } from "@/schemas/auth";
import Spinner from "@/components/ui/loader";
import { useEffect, useRef, useState } from "react";
import { FormError } from "@/components/ui/form-error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { reset, verifyOtp } from "@/actions/auth";
import { postEmail } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function VerifyOtpForm({
  email = "",
  password = "",
  first_name = "",
  last_name = "",
  url,
  resetPassword,
}: {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  url?: string;
  resetPassword?: boolean;
}) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [countdownTime, setCountdownTime] = useState(59);
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { otp: "" },
  });

  // Countdown formatting utility
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Start countdown for resend button
  const startCountdown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setCountdownTime(59);
    intervalRef.current = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    // Start the countdown when the component mounts
    startCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };
  }, []);

  // Resend OTP logic
  const onResend = async () => {
    if (!email || (resetPassword && !password)) {
      toast.error("Email and password are required.");
      return;
    }

    setIsPending(true);

    try {
      if (resetPassword) {
        await handleResetPassword();
      } else {
        await handleSendOtp();
      }

      toast.success("Please check your email.");
      startCountdown();
    } catch (err) {
      //@ts-expect-error - Error type inference
      const errorMsg = err?.response?.message || "Oops, something went wrong.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsPending(false);
    }
  };

  const handleResetPassword = async () => {
    const res = await reset({ email });
    if (res.error) toast.error(res.error);
  };

  const handleSendOtp = async () => {
    const res = await postEmail({ email, password, first_name, last_name });
    if (res.error) toast.error(res.error);
  };

  const onSubmit = async (values: z.infer<typeof OtpSchema>) => {
    setIsPending(true);
    setError(undefined);

    try {
      const res = await verifyOtp({ email, otp: values.otp, type: "email" });
      if (res.error) toast.error(res.error);

      toast.success(res.success);
      router.push(url || "/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-center"
      >
        <FormError message={error} />

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  disabled={isPending}
                  pattern={REGEXP_ONLY_DIGITS}
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup className="gap-2">
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-fit" disabled={isPending}>
          {isPending ? <Spinner width={24} height={24} /> : "Verify OTP"}
        </Button>

        <div className="flex justify-center items-center text-gray-400 tracking-tight">
          {countdownTime > 0 && (
            <span>Resend in {formatTime(countdownTime)}</span>
          )}
          <Button
            variant="link"
            className="text-base px-1 py-0"
            onClick={onResend}
            disabled={countdownTime > 0 || isPending}
          >
            {countdownTime > 0 ? "" : "Resend code"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
