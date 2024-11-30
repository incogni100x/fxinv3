"use client";
import React, { useState } from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What services does Elite Pro Markets provide?",
      answer:
        "Elite Pro Markets offers a range of trading services, including forex, cryptocurrencies, commodities, indices, stocks, and other securities. We aim to provide premier trading opportunities that help our clients achieve their financial goals.",
    },
    {
      question: "How can I start trading with Elite Pro Markets?",
      answer:
        "You can start trading with us by visiting our website and creating an account. Our platform allows you to manage your trades online, including access to advanced tools for analysis and decision-making.",
    },
    {
      question: "What is the minimum deposit amount?",
      answer:
        "The minimum deposit amount varies depending on the account type you choose. Please refer to our account types page for more details.",
    },
    {
      question: "How is my trading activity supported?",
      answer:
        "Our team of trading professionals and analysts work together to support your trading activity. We use a combination of advanced analytics, cutting-edge technology, and market expertise to provide the best possible experience.",
    },
    {
      question: "How do I withdraw funds from my account?",
      answer:
        "You can withdraw funds from your account through our platform. Withdrawals are processed securely and quickly, subject to the terms and conditions of your account.",
    },
    {
      question: "Who can I contact for more information?",
      answer:
        "You can contact our customer support team via email or phone for any inquiries. Our contact information is available on the Contact Us page.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative py-12 sm:py-20 text-white">
      {/* Decorative SVG */}
      <div
        className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
        aria-hidden="true"
      >
        <svg
          className="absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-white/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e87443c8-56e4-4c20-9111-55b82fa704e3"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0.5 0V200M200 0.5L0 0.499983"></path>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)"
          ></rect>
        </svg>
      </div>

      <div className="mx-auto max-w-[900px] px-6 sm:px-12">
        <h1 className="text-3xl font-semibold sm:text-4xl text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center text-[18px] font-medium focus:outline-none"
              >
                {faq.question}
                <span className="ml-2">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p className="mt-3 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
