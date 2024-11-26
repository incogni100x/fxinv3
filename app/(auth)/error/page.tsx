"use client";

import { Button } from "@/components/ui/button";
import { Warning2 } from "iconsax-react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Verification() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");
  return (
    <div>
      {error && errorCode && errorDescription ? (
        <div className="flex justify-center items-center min-h-screen flex-col gap-3">
          <Warning2 className="h-10 w-10 text-red-600" />
          <h1 className="text-4xl font-bold">{errorCode}</h1>
          <h2 className="text-2xl lg:text-3xl">{error}</h2>
          <p>{errorDescription}</p>
          <Button size="lg" asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen flex-col gap-3">
          <Warning2 className="h-10 w-10 text-red-600" />
          <h1 className="text-4xl font-bold">500</h1>
          <h2 className="text-2xl lg:text-3xl">
            Oops,Something went wrong ,Go back and try again
          </h2>

          <Button size="lg" asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
