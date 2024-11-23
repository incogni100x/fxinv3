"use client";
import React from "react";
import { Button } from "./ui/button";
import { TextGenerateEffect } from "./ui/text-generate";

import Image from "next/image";
import { TickerTape } from "react-ts-tradingview-widgets";

export default function HeroSection() {
  const words = "Empower Your Future with Smarter Investments";
  return (
    <div>
      <div className="mx-auto max-w-[1545px] px-4 sm:px-6 lg:px-8 py-20 text-center lg:py-28 flex flex-col items-center justify-center">
        <TextGenerateEffect words={words} />
        <p className="mx-auto mt-6 max-w-2xl text-base lg:text-lg tracking-tight text-muted-foreground">
          Our platform delivers unmatched security, expert support, and a
          seamless trading experience tailored for your success.
        </p>
        <div className="mt-10 flex justify-center gap-x-6 hero_buttons">
          <Button>Get started today</Button>
          <Button variant={"outline"}>Log in</Button>
        </div>
        <Image
          src={"/images/dashboard.png"}
          alt="Dashboard image"
          width={1000}
          height={1000}
        />
      </div>
      <div className=" w-full flex justify-center flex-col">
        <TickerTape colorTheme="dark" />
      </div>
    </div>
  );
}
