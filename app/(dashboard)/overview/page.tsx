import { getUser } from "@/lib/supabase/user";
import { Suspense } from "react";
import OverviewAnalytics, {
  OverviewAnalyticsSkeleton,
} from "./components/overview-analytics";
import MoreData, { MoreDataSkeleton } from "./components/more-data";
import { redirect } from "next/navigation";

export default async function OverviewPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="py-10 space-y-10">
      <h2 className="text-3xl lg:text-4xl font-semibold">
        Welcome {user?.user_metadata.first_name}{" "}
      </h2>
      <Suspense fallback={<OverviewAnalyticsSkeleton />}>
        <OverviewAnalytics userId={user?.id} />
      </Suspense>
      <Suspense fallback={<MoreDataSkeleton />}>
        <MoreData userId={user?.id} />
      </Suspense>
    </div>
  );
}
