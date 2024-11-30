import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Helper function for authorization
function isAuthorized(req: NextRequest): boolean {
  const authKey = req.headers.get("authorization");
  return authKey === `Bearer ${process.env.CRON_AUTH_KEY}`; // Example: "Bearer YOUR_AUTH_KEY"
}

// Investment transaction API
export async function POST(req: NextRequest) {
  // Security check
  if (!isAuthorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all active investments
    const investments = await prisma.investment.findMany({
      where: { status: "active" },
      include: {
        plan: true, // Include plan details for interest rate
      },
    });

    for (const investment of investments) {
      const { id, userId, balance, plan } = investment;

      // Skip if there's no balance or investment balance
      if (!balance || !plan?.interestRate) continue;

      // Calculate daily interest
      const dailyInterest = (balance * plan.interestRate) / 100 / 365;

      // Update the user's balance
      await prisma.investment.update({
        where: { id },
        data: { balance: { increment: dailyInterest } },
      });

      // Create a transaction record for the interest
      await prisma.transaction.create({
        data: {
          userId,
          type: "deposit",
          amount: dailyInterest,
          method: "interest",
          status: "approved",
          approvedAt: new Date(),
        },
      });
    }

    return NextResponse.json(
      { message: "Daily updates completed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during daily update:", error);
    return NextResponse.json(
      { message: "Error processing daily updates." },
      { status: 500 }
    );
  }
}
