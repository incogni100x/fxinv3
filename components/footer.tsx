import React from "react";
import Logo from "./logo";

export default function Footer() {
  return (
    <div className="mx-auto max-w-[1545px] px-6 lg:px-8 pt-[16px] pb-[120px]">
      <div>
        <div className="w-full justify-between mt-[72px] grid gap-[32px] md:flex">
          {/* About Section */}
          <div>
            <h3 className="text-md font-medium leading-6 text-[#5D5F66]">
              About
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a
                  href="/about"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="/why-us"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Why FX Market Elite Pros
                </a>
              </li>
            </ul>
          </div>

          {/* Earn Section */}
          <div>
            <h3 className="text-md font-medium leading-6 text-[#5D5F66]">
              Earn
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a
                  href="/crypto"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Crypto
                </a>
              </li>
              <li>
                <a
                  href="/forex"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Forex
                </a>
              </li>
              <li>
                <a
                  href="/stocks"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Stocks
                </a>
              </li>
              <li>
                <a
                  href="/realestate"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Real Estate
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-md font-medium leading-6 text-[#5D5F66]">
              Legal
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a
                  href="/legal"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Legal
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Terms of service
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-md font-medium leading-6 text-[#5D5F66]">
              Support
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a
                  href="/faq"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@fxmarketelitepros.net"
                  className="text-md leading-6 text-gray-300 hover:text-white"
                >
                  Send us an email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="mt-[120px]">
        <Logo />
      </div>

      {/* Disclaimer Section */}
      <div className="border-white/10 lg:flex lg:items-center lg:justify-between mt-[60px]">
        <div>
          <p className="text-[15px] leading-6 text-[#AEAFB2]">
            The risk of loss in online trading of stocks, options, futures,
            currencies, foreign equities, and fixed income can be substantial.
            <br />
            <br />
            Before trading, clients must read the relevant risk disclosure
            statements on our Warnings and Disclosures page. Trading on margin
            is only for experienced investors with high risk tolerance. You may
            lose more than your initial investment. For additional information
            about rates on margin loans, please see Margin Loan Rates. Security
            futures involve a high degree of risk and are not suitable for all
            investors. The amount you may lose may be greater than your initial
            investment.
            <br />
            <br />
            For trading security futures, read the Security Futures Risk
            Disclosure Statement. Structured products and fixed income products
            such as bonds are complex products that are riskier and not suitable
            for all investors. Before trading, please read the Risk Warning and
            Disclosure Statement.
          </p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-white/10 md:flex md:items-center md:justify-between mt-[64px]">
        <p className="text-md leading-5 text-[#AEAFB2] md:order-1 md:mt-0">
          © 2016 - 2024 FX Market Elite Pros, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
