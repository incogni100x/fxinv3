import Logo from "@/components/logo";
import Link from "next/link";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-[100dvh] overflow-auto bg-primary-900 flex items-center py-16 flex-col">
      <div className="bg-primary-900 max-w-[553px] w-full mx-auto flex items-center flex-col gap-10 px-4">
        <Link href={"/"}>
          {" "}
          <Logo />
        </Link>
        {/* <ProgressBar /> */}
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
