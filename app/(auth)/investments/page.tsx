import React from "react";

import InvestmentPlansForm from "../components/investment-form";
import { getInvestmentPlans } from "@/data/fetch-data";

export default async function InvestmentsPage() {
  const fetchedPlans = await getInvestmentPlans();
  return <InvestmentPlansForm investmentPlans={fetchedPlans} />;
}
