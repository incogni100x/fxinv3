"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
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
            () => reset()
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
