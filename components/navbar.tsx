"use client";
import React, { useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import { HambergerMenu } from "iconsax-react";
import Logo from "./logo";
import { User } from "@supabase/supabase-js";

export default function Navbar({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const navigation = [
    {
      name: "About us",
      href: "/legal",
      active: pathname.startsWith("/legal"),
    },
    {
      name: "Faq",
      href: "/about",
      active: pathname.startsWith("/about"),
    },
    {
      name: "Why us",
      href: "/developers",
      active: pathname.startsWith("/developers"),
    },
  ];

  return (
    <header className="container py-5 lg:py-8 flex  mx-auto items-center justify-between">
      <div className=" flex items-center gap-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="lg:flex justify-between  hidden items-center gap-2">
          {navigation.map((nav) => (
            <Button asChild key={nav.name} variant={"ghost"}>
              <Link href={nav.href}>{nav.name}</Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {user ? (
          <Button asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        ) : (
          <>
            <Button className="hidden lg:flex" variant={"ghost"}>
              <Link href="/login">Log in</Link>
            </Button>
            <Button>
              <Link href="/register">Get started today</Link>
            </Button>
          </>
        )}
        <div className=" lg:hidden ">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="link"
                className="text-muted-foreground"
              >
                <span className="sr-only">Toggle menu</span>

                <HambergerMenu className="h-10 w-10" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="space-y-4 bg-inherit border-l-gray-900"
            >
              <Link href="/">
                <Logo />
              </Link>
              <nav className="space-y-6  text-lg ">
                <div className="flex pt-8 flex-col gap-4">
                  {navigation.map((nav) => (
                    <Button
                      asChild
                      variant={"ghost"}
                      key={nav.name}
                      size={"lg"}
                      className=" text-start justify-start w-fit"
                      onClick={() => setOpen(false)}
                    >
                      <Link href={nav.href}>{nav.name}</Link>
                    </Button>
                  ))}
                </div>
              </nav>
              <SheetFooter className="flex flex-col gap-4 w-full pt-4">
                {user ? (
                  <div className="flex justify-end">
                    <Button asChild>
                      <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button size={"lg"} asChild onClick={() => setOpen(false)}>
                      <Link href={"/register"}>Get started</Link>
                    </Button>
                    <Button
                      asChild
                      size={"lg"}
                      variant={"secondary"}
                      onClick={() => setOpen(false)}
                    >
                      <Link href={"/login"}> Log in</Link>
                    </Button>
                  </div>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
