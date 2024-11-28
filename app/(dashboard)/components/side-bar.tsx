"use client";

import {
  AddCircle,
  Coin1,
  Home as HomeIcon,
  I24Support,
  MinusCirlce,
} from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { User } from "@supabase/supabase-js";
import { UserButton } from "@/components/user-button";

export default function SideBar({ user }: { user: User }) {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Overview",
      href: "/overview",
      icon: HomeIcon,
      active: pathname === "/overview",
    },
    {
      name: "Deposit",
      href: "/deposits",
      icon: AddCircle,
      active: pathname.startsWith("/deposits"),
    },
    {
      name: "Withdrawal",
      href: `/withdrawals`,
      icon: MinusCirlce,
      active: pathname === "/withdrawals",
    },
    {
      name: "Transactions History",
      href: `/transactions-history`,
      icon: Coin1,
      active: pathname === "/transactions-history",
    },
    {
      name: "Support",
      href: `/support`,
      icon: I24Support,
      active: pathname === "/support",
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-full bg-gray-800/40 border-r border-gray-700">
      {/* Logo */}
      <div className=" pt-6 px-4 border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 space-y-2 px-2">
        {navigation.map((nav) => {
          const Icon = nav.icon;
          return (
            <Link
              href={nav.href}
              key={nav.name}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                nav.active
                  ? "bg-gray-700 text-white border-r-2 border-primary"
                  : "hover:bg-gray-700/40 text-gray-400 hover:text-white"
              )}
            >
              <Icon
                className="h-6 w-6"
                variant={nav.active ? "Bold" : "Outline"}
              />
              {nav.name}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="px-2 py-4 border-t border-gray-700">
        <UserButton user={user} />
      </div>
    </aside>
  );
}
