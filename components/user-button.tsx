"use client";
import { LogOut, Package2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
// import {
//   BookmarkIcon,
//   EnvelopeIcon,
//   ShoppingBagIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";
// import { UserIcon as SolidUserIcon } from "@heroicons/react/16/solid";
import { LogoutButton } from "./ui/logout-button";
import { User as UserIcon } from "iconsax-react";

interface Props {
  user: User | null;
}

export const UserButton = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url} />
          <AvatarFallback className="bg-primary p-2">
            <UserIcon className="text-white  h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-64 lg:w-72" align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          {" "}
          <div className="bg-primary rounded-full p-1.5">
            <UserIcon className="text-white h-5 w-5" />
          </div>{" "}
          <div className="text-sm">
            <div className="font-semibold">{user?.user_metadata.name}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {user?.email}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <Link href="/account">
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/messages">
            <DropdownMenuItem>
              <EnvelopeIcon className="mr-2 h-4 w-4" />
              <span>Messages</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/orders">
            {" "}
            <DropdownMenuItem>
              <ShoppingBagIcon className="mr-2 h-4 w-4" />
              <span>Orders</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/saved-items">
            {" "}
            <DropdownMenuItem>
              <BookmarkIcon className="mr-2 h-4 w-4" />
              <span>Saved Items</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup> */}

        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
