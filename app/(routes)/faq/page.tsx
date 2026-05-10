"use client";
import React, { useState } from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What services does Pro Elite Holdings provide?",
      answer:
        "Pro Elite Holdings offers a range of trading services, including forex, cryptocurrencies, commodities, indices, stocks, and other securities. We aim to provide premier trading opportunities that help our clients achieve their financial goals.",
    },
    {
      question: "How can I start trading with Pro Elite Holdings?",
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
    <div className="relative  text-white ">
      <div className="container  mx-auto max-w-[900px] px-4 py-20">
        <h1 className="text-3xl font-semibold sm:text-4xl text-center mb-8 ">
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
