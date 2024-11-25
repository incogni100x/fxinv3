import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-8  text-white">
      <p className="text-9xl font-bold">?</p>
      <h2 className="text-3xl text-white font-semibold">
        Oops! page not found
      </h2>
      <p className=" max-w-lg text-lg text-center  text-muted-foreground font-light">
        The page you’re looking for in not in our directory or you’ve assembled
        the link wrong. Please confirm and try again.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
