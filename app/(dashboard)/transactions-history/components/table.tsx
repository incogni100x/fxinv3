import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

import { fetchTransactions } from "@/data/fetch-data";
import TransactionsError from "./error";

export default async function TransactionTable() {
  const { data: transactions, error } = await fetchTransactions();

  if (error || !transactions) {
    return <TransactionsError />;
  }

  return <DataTable columns={columns} data={transactions} />;
}
