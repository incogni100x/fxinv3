"use client";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { User } from "@supabase/supabase-js";

import { LogoutButton } from "./ui/logout-button";
import { User as UserIcon } from "iconsax-react";

interface Props {
  user: User | null;
}

export const UserButton = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-4 w-full p-4 text-white bg-gray-800 rounded-md">
        <Avatar>
          <AvatarFallback className="bg-primary p-2">
            <UserIcon className="h-6 w-6 text-white" />
          </AvatarFallback>
        </Avatar>
        <div className="text-sm text-start">
          <div className="font-semibold">
            {user?.user_metadata.first_name} {user?.user_metadata.last_name}
          </div>
          <div className="text-gray-500 dark:text-gray-400">{user?.email}</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 lg:w-72" align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-1.5">
            <UserIcon className="text-white h-5 w-5" />
          </div>
          <div className="text-sm">
            <div className="font-semibold">{user?.user_metadata.name}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {user?.email}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="text-destructive flex justify-end hover:text-destructive text-base">
            <span>Log out</span>
            <LogOut className="mr-2 h-4 w-4 text-destructive" />
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
