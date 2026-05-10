import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      src="/images/logo.svg"
      alt="Pro Elite Holdings"
      width={44}
      height={44}
      priority
    />
  );
}
