"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HambergerMenu, Home, MoneyAdd, MoneySend } from "iconsax-react";
import Logo from "@/components/logo";

import { User } from "@supabase/supabase-js";
import { UserButton } from "@/components/user-button";

export default function DashboardHeader({ user }: { user: User | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navigation = [
    {
      name: "Overview",
      href: "/overview",
      icon: <Home className="h-4 w-4" />,
      active: pathname === "/overview",
    },
    {
      name: "Deposit",
      href: "/deposits",
      icon: <MoneyAdd className="h-4 w-4" />,
      active: pathname.startsWith("/deposits"),
    },
    {
      name: "Withdrawal",
      href: `/withdrawals`,
      icon: <MoneySend className="h-4 w-4" />,
      active: pathname === "/withdrawals",
    },
  ];

  // Find the active route name
  const currentRoute = navigation.find((nav) => nav.active)?.name || "";

  return (
    <div className="top-0 z-50 bg-gray-800/40 border-b border-gray-800 sticky">
      <div className="container mx-auto">
        <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4 px-4">
          {/* Dynamic Route Name */}
          <h2 className="text-lg font-semibold text-gray-50">
            {currentRoute || "Dashboard"}
          </h2>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button size="icon" variant="link">
                <span className="sr-only">Toggle menu</span>
                <HambergerMenu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex justify-between h-full flex-col bg-gray-800 bg-inherit border-l-gray-900"
            >
              <nav className="space-y-6 text-lg font-medium">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <Link
                    href="/"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2"
                  >
                    <Logo />
                  </Link>
                </Button>
                <div className="flex flex-col gap-3">
                  {navigation.map((nav) => (
                    <Button
                      asChild
                      key={nav.name}
                      className="text-start justify-start w-fit"
                      variant={"ghost"}
                    >
                      <Link href={nav.href}>{nav.name}</Link>
                    </Button>
                  ))}
                </div>
              </nav>
              <SheetFooter>
                <UserButton user={user} />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
