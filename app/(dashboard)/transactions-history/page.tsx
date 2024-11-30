import React, { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import TransactionTable from "./components/table";

export default async function TransactionsHistoryPage() {
  return (
    <div className="space-y-10 py-20">
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["12rem", "42rem", "14rem", "14rem", "10rem"]}
            shrinkZero
          />
        }
      >
        <TransactionTable />
      </Suspense>
    </div>
  );
}
