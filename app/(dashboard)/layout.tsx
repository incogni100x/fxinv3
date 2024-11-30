import NotFound from "@/app/not-found";

import { getUser } from "@/lib/supabase/user";
import SideBar from "./components/side-bar";
import prisma from "@/lib/db";
import DashboardHeader from "./components/header";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    return <NotFound />;
  }
  const steps = {
    1: "/investments",
    2: "/choose-address",
    3: "/identification",
    4: "/selfie",
  } as { [key: number]: string };
  const db = await prisma.onBoarding.findFirst({
    where: {
      userId: user.id,
    },
  });

  // Determine the last completed step from the database
  const lastStep = db?.lastStep ?? 0; // Default to 0 if no record exists

  // Redirect the user to the next step if they haven't completed all steps
  if (lastStep < Object.keys(steps).length) {
    const nextStep = steps[lastStep + 1];
    redirect(nextStep); // Redirect to the next step
  }
  return (
    <div className="flex h-screen w-full bg-gray-900 text-white rounded-md">
      {/* Sidebar */}
      <SideBar user={user} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <DashboardHeader user={user} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto py-6">
          <div className="container mx-auto px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
