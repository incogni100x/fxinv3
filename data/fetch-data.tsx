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

/**
 * Fetch dashboard metrics for a user

 * @returns Dashboard metrics including wallet balance, total deposits, total profits, and percentage margin
 */
export async function getUserDashboardData(userId: string) {
  if (!userId) {
    return {
      data: null,
      error: "User ID is required",
    };
  }

  try {
    // Fetch user's total deposits
    const totalDeposits = await prisma.transaction.aggregate({
      where: {
        userId: userId,
        type: "deposit",
        status: "approved",
      },
      _sum: {
        amount: true,
      },
    });

    // Fetch user's total profits (interest from investments)
    const totalProfits = await prisma.transaction.aggregate({
      where: {
        userId: userId,
        type: "interest",
        status: "approved",
      },
      _sum: {
        amount: true,
      },
    });

    // Fetch user's wallet balance
    const walletBalance = await prisma.investment.aggregate({
      where: { userId },
      _sum: {
        balance: true,
      },
    });

    // Calculate metrics
    const totalDepositsValue = totalDeposits._sum.amount || 0;
    const totalProfitsValue = totalProfits._sum.amount || 0;
    const walletBalanceValue = walletBalance._sum.balance || 0;

    const percentageMargin =
      totalDepositsValue > 0
        ? (totalProfitsValue / totalDepositsValue) * 100
        : 0;

    return {
      data: {
        walletBalance: walletBalanceValue.toFixed(2),
        totalDeposits: totalDepositsValue.toFixed(2),
        totalProfits: totalProfitsValue.toFixed(2),
        percentageMargin: percentageMargin.toFixed(2),
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      data: null,
      error: "An error occurred while fetching dashboard data.",
    };
  }
}

export async function getUserInvestments(userId: string) {
  try {
    const investments = await prisma.investment.findMany({
      where: { userId },
      include: {
        plan: true, // Include the related InvestmentPlan details
      },
    });

    return {
      data: investments,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching user investments:", error);
    return {
      data: null,
      error: "Unable to fetch investments. Please try again later.",
    };
  }
}
