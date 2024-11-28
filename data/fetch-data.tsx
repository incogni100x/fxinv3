import prisma from "@/lib/db";

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
