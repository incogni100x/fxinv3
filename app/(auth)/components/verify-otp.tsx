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

import { verifyOtp } from "@/actions/auth";
import { postEmail } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function VerifyOtpForm({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [countdownTime, setCountdownTime] = useState(59); // Start at 59 seconds
  const [loading, setLoading] = useState(false);

  // Utility function to format the countdown as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    // Start the countdown when the component mounts
    startCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Type assertion for NodeJS.Timeout
      }
    };
  }, []);

  const startCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCountdownTime(59); // Reset to 59 seconds
    setLoading(true); // Disable resend button during countdown

    intervalRef.current = setInterval(() => {
      setCountdownTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current as NodeJS.Timeout); // Type assertion for NodeJS.Timeout
          setLoading(false); // Enable resend button
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };
  const onResend = async () => {
    setIsPending(true);
    if (!password) {
      toast.error("Password is required");
    }
    // const values = {
    //   value: email,
    //   otp_type: "email",
    // };
    try {
      const json = await postEmail({
        email,
        password,
      });

      if (json.error) {
        toast.error("Fail to resend email");
      } else {
        toast.success("Please check your email.");
      }
      setIsPending(false);
    } catch (err: unknown) {
      //@ts-expect-error - The error object is of type unknown
      setError(err?.response?.message || "Oops,Something went wrong");
      //@ts-expect-error - The error object is of type unknown
      console.log(err.response);
    } finally {
      setIsPending(false);
    }
  };
  const onSubmit = async (values: z.infer<typeof OtpSchema>) => {
    console.log(values);
    setIsPending(true);
    try {
      const res = await verifyOtp({
        email,
        otp: values.otp,
        type: "email",
      });

      if (res.error) {
        setError(res.error);
      } else {
        setError(undefined);
        toast.success(res.success);
        router.push("/investments");
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex justify-center items-center flex-col"
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
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>

                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Verify OTP Button */}
        <div className="flex justify-center gap-2 items-center pt-4 pb-2">
          <Button
            type="submit"
            size="lg"
            className="w-fit"
            disabled={isPending} // OTP verification is not affected by countdown
          >
            {isPending ? (
              <Spinner width={24} height={24} />
            ) : (
              <span>Verify OTP</span>
            )}
          </Button>
        </div>

        {/* Resend OTP */}
        <div className="flex justify-center items-center text-neutral-600 tracking-tight">
          {countdownTime > 0 && (
            <span>Resend in {formatTime(countdownTime)}</span>
          )}
          <Button
            variant="link"
            className="text-base px-1 py-0"
            onClick={onResend}
            disabled={countdownTime > 0 || loading || isPending}
          >
            {countdownTime > 0 ? "" : "Resend code"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
