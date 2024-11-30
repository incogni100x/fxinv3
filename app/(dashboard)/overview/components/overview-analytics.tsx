import { Skeleton } from "@/components/ui/skeleton";
import { getUserDashboardData } from "@/data/fetch-data";
import { DollarCircle, PercentageCircle } from "iconsax-react";
import React from "react";

export default async function OverviewAnalytics({
  userId,
}: {
  userId: string | undefined;
}) {
  if (!userId) {
    return <div>User ID is required</div>;
  }
  const { data, error } = await getUserDashboardData(userId);
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-gray-700 bg-gray-800 text-white shadow">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="tracking-tight text-sm font-medium">
            Total Balance
          </div>
          <DollarCircle className="h-6 w-6 text-gray-400" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">${data?.walletBalance}</div>
        </div>
      </div>
      <div className="rounded-xl border border-gray-700 bg-gray-800 text-white shadow">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="tracking-tight text-sm font-medium">Profits</div>
          <PercentageCircle className="h-6 w-6 text-gray-400" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">${data?.totalProfits}</div>
          <p className="text-xs text-muted-foreground">
            +{data?.percentageMargin}% from last month
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-gray-700 bg-gray-800 text-white shadow">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="tracking-tight text-sm font-medium">
            Total deposits
          </div>
          <DollarCircle className="h-6 w-6 text-gray-400" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">${data?.totalDeposits}</div>
        </div>
      </div>
    </div>
  );
}

export function OverviewAnalyticsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
    </div>
  );
}
