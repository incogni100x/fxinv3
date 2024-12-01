import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

import { fetchTransactions } from "@/data/fetch-data";
import TransactionsError from "./error";
import { getUser } from "@/lib/supabase/user";
import { redirect } from "next/navigation";

export default async function TransactionTable() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const userId = user.id;
  const { data: transactions, error } = await fetchTransactions({ userId });

  if (error || !transactions) {
    return <TransactionsError />;
  }

  return <DataTable columns={columns} data={transactions} />;
}
