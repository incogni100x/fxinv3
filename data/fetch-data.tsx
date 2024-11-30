import prisma from "@/lib/db";
import { Transaction } from "@prisma/client";

export async function getInvestmentPlans() {
  try {
    const fetchedPlans = await prisma.investmentPlan.findMany({
      orderBy: { minAmount: "asc" }, // Order plans by minimum investment amount
    });
    return fetchedPlans || [];
  } catch (error) {
    console.error("Error fetching investment plans:", error);
    return [];
  }
}

interface FetchTransactionsResponse {
  data?: Transaction[];
  error?: string;
}

export const fetchTransactions =
  async (): Promise<FetchTransactionsResponse> => {
    try {
      // Fetch the transactions from the database
      const transactions = await prisma.transaction.findMany({
        orderBy: { createdAt: "desc" }, // Order transactions by creation date
      });

      return { data: transactions };
    } catch (error) {
      // Handle any errors and return a meaningful message
      return {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  };
