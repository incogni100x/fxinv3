import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getUser } from "@/lib/supabase/user";

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <section>
      <Navbar user={user} />
      {children}
      <Footer />
    </section>
  );
}
