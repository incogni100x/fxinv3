import Logo from "@/components/logo";
import Link from "next/link";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center overflow-auto bg-blue-50 px-4 py-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-[553px] flex-col items-center gap-8">
        <Link href={"/"}>
          <Logo />
        </Link>
        {/* <ProgressBar /> */}
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
