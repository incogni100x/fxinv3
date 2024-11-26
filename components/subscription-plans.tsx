import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const plans = [
  {
    name: "bronze",
    description: "Best option for personal use & for your next project.",
    price: 1000,
    frequency: "month",
    features: [
      { text: "24/7 Support" },
      { text: "Professional Charts" },
      { text: "Weekly Earnings: %10" },
    ],
    weeklyEarnings: "10%",
    roi: "1,750",
  },
  {
    name: "silver",
    description: "Relevant for multiple users, extended & premium support.",
    price: 20000,
    frequency: "month",
    features: [
      { text: "24/7 Support" },
      { text: "Professional Charts" },
      { text: "Weekly Earnings: %10" },
    ],
    weeklyEarnings: "15%",
    roi: "117,500",
  },
  {
    name: "gold",
    description: "Relevant for multiple users, extended & premium support.",
    price: 50000,
    frequency: "month",
    features: [
      { text: "24/7 Support" },
      { text: "Professional Charts" },
      { text: "Weekly Earnings: %10" },
    ],
    weeklyEarnings: "20%",
    roi: "350,000",
  },
  {
    name: "diamond",
    description: "Relevant for multiple users, extended & premium support.",
    price: 100000,
    frequency: "month",
    features: [
      { text: "24/7 Support" },
      { text: "Professional Charts" },
      { text: "Weekly Earnings: %10" },
    ],
    weeklyEarnings: "20%",
    roi: "750,000",
  },
];

export default function SubscriptionPlans() {
  return (
    <section className="bg-white dark:bg-gray-900  mx-auto">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 container">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Maximize Your <span className="text-primary">Earnings</span> with
            Tailored Investment Plans
          </h2>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col p-6 capitalize text-center text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
            >
              <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
              <h3 className=" text-base text-muted-foreground">
                Minimum Deposit
              </h3>

              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                  ${plan.price}
                </span>
              </div>

              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{feature.text}</span>
                  </li>
                ))}

                <li className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Weekly Earnings:{" "}
                    <span className="font-semibold text-green-500">
                      {plan.weeklyEarnings}
                    </span>
                  </span>
                </li>
              </ul>
              <Button
                asChild
                className="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary"
              >
                <Link href={"/register"}>Get started</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
