import NotFound from "@/app/not-found";
import ShopHeader from "./components/header";
import { getUser } from "@/lib/supabase/user";
import SideBar from "./components/side-bar";

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

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white">
      {/* Sidebar */}
      <SideBar user={user} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <ShopHeader user={user} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto py-6">
          <div className="container mx-auto px-4 lg:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
