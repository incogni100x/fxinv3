import { DataTable } from "@/components/ui/data-table";
import { getUserInvestments } from "@/data/fetch-data";
import React from "react";
import { columns } from "./columns";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import TradingData from "./trading-data";

export default async function MoreData({ userId }: { userId: string }) {
  const { data, error } = await getUserInvestments(userId);
  if (!data || error) {
    return <div>{error}</div>;
  }
  return (
    <div className="grid grid-cols-1  gap-4">
      <div className="rounded-xl border border-gray-700 bg-gray-800 text-white shadow h-full">
        <DataTable data={data} columns={columns} />
      </div>

      <TradingData />
    </div>
  );
}

export function MoreDataSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <DataTableSkeleton
        columnCount={5}
        searchableColumnCount={1}
        filterableColumnCount={2}
        cellWidths={["12rem", "42rem", "14rem", "14rem", "10rem"]}
        shrinkZero
      />

      <Skeleton className="h-96" />
    </div>
  );
}
