"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { Transaction } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "transaction_id",
    accessorKey: "transactions_ref",
    header: "Transaction ID",
    cell: ({ row }) => (
      <div>
        {" "}
        {row.original.id && row.original.id ? (
          <p>{row.original.id}</p>
        ) : (
          <p>-</p>
        )}
      </div>
    ),
  },

  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => {
      return (
        <div>
          <p className=" capitalize">{row.original.currency || "-"}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div>
        {" "}
        {row.original.amount ? <p>{row.original.amount}</p> : <p>-</p>}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div>
        {" "}
        {row.original.type ? (
          <p className="capitalize">{row.original.type}</p>
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
        case "approved":
          variant = "success";
          break;
        case "rejected":
          variant = "destructive";
          break;
        case "pending":
          variant = "warning";
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
