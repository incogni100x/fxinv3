"use client";
import React from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export default function TradingData() {
  return (
    <AdvancedRealTimeChart
      height={600}
      width="100%"
      theme="dark"
    ></AdvancedRealTimeChart>
  );
}
