"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function TransactionsError() {
  const router = useRouter();
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-8 text-white">
      <h2 className="text-3xl font-semibold">Something went wrong</h2>
      <p className=" max-w-lg text-lg text-center  text-muted-foreground font-light">
        We cannot process your request at the moment. Please try again Later
      </p>

      <div className="flex gap-4 items-center">
        <Button
          size="lg"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => router.refresh()
          }
        >
          Try again
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => router.back()
          }
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
