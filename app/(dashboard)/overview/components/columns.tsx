"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { Investment } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Investment>[] = [
  {
    id: "planName",
    accessorKey: "plan",
    header: "Investment Plan",
    cell: ({ row }) => (
      <div>
        {" "}
        {row.original.planName && row.original.planName ? (
          <p>{row.original.planId}</p>
        ) : (
          <p>-</p>
        )}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-muted-foreground hover:bg-muted-background  hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      let variant;
      switch (status) {
        case "active":
          variant = "success";
          break;
        case "inactive":
          variant = "destructive";
          break;
      }

      return (
        <div className="ml-2">
          {/* @ts-expect-error Incorrect type */}
          <Badge variant={variant} className=" capitalize">
            {status}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      const date = row.original.createdAt
        ? new Date(row.original.createdAt)
        : null;

      if (date) {
        const formattedDate = format(date, "MMMM dd, yyyy h:mm a");
        return (
          <div>
            <p>{formattedDate}</p>
          </div>
        );
      } else {
        return <div>-</div>;
      }
    },
  },
];
