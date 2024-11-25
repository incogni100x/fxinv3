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
import { FormWrapper } from "./form-wrapper";
import Spinner from "@/components/ui/loader";
import { useEffect, useRef, useState } from "react";
import { FormError } from "@/components/ui/form-error";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyOtpForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [countdownTime, setCountdownTime] = useState(59); // Start at 59 seconds
  const [loading, setLoading] = useState(false); // For the resend button loading state

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
        clearInterval(intervalRef.current as NodeJS.Timeout); // Type assertion for NodeJS.Timeout
      }
    };
  }, []);

  const startCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current as NodeJS.Timeout); // Type assertion for NodeJS.Timeout
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
    const email = sessionStorage.getItem("email");
    if (!email) {
      setError("Email is required");
    }
    // const values = {
    //   value: email,
    //   otp_type: "email",
    // };
    try {
      setLoading(true);

      //   const data = response.data;
      //   if (response.status === 201 && data.status == true) {
      //     toast.success(data.message);
      //     startCountdown();
      //   }
    } catch (err: unknown) {
      //@ts-expect-error - The error object is of type unknown
      setError(err?.response?.message || "Oops,Something went wrong");
      //@ts-expect-error - The error object is of type unknown
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (values: z.infer<typeof OtpSchema>) => {
    console.log(values);

    try {
      const email = sessionStorage.getItem("email");
      if (!email) {
        setError("Email is required");
      }
      setIsPending(true);
      //   const payload = {
      //     otp_type: "email",
      //     otp: values.otp,
      //     email,
      //   };
      //   const response = await authAxios.post(`/verify-email`, payload);
      //   console.log(response);
      //   const data = response.data;
      //   if (response.status === 201 && data.status === true) {
      //     toast.success(data.message);
      //     router.refresh();
      //     router.push("/business-onboarding");
      //     sessionStorage.setItem("authStep", "3");
      //   }
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
      Label="Email Verification"
      description="An OTP has been sent to your email address. Please enter the 6-digit code below to verify your account."
      currentStep="2"
      lastStep="4"
    >
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
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Verify OTP Button */}
          <div className="flex justify-center items-center pt-4 pb-2">
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
            {countdownTime > 0 && <span>Resend in</span>}
            <Button
              variant="link"
              className="text-base px-1 py-0"
              onClick={onResend}
              disabled={countdownTime > 0 || loading}
            >
              {countdownTime > 0
                ? `${formatTime(countdownTime)} seconds`
                : "Resend code"}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
