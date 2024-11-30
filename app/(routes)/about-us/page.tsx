import React from "react";

export default function AboutUsPage() {
  return (
    <div>
      <div className="relative isolate overflow-hidden  py-24 sm:py-32">
        {/* Decorative SVG */}
        <div
          className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
          aria-hidden="true"
        ></div>

        <div className="mx-auto container px-6 lg:px-8">
          {/* Heading Section */}
          <div className="mx-auto max-w-4xl lg:mx-0">
            <p className="text-[14px] font-semibold leading-8 tracking-tight text-[#0C6CF2]">
              About Us
            </p>
            <h1 className="mt-2 sm:text-4xl text-3xl font-semibold tracking-tight text-white">
              Building trust and innovation in financial markets
            </h1>
          </div>

          {/* Content Section */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
            {/* Decorative Background */}
            <div className="relative lg:order-last lg:col-span-5">
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

            {/* Text Content */}
            <div className="max-w-4xl text-[18px] leading-7 text-white lg:col-span-7">
              <p>
                Welcome to Elite Pro Markets, a leading platform dedicated to
                delivering a seamless trading experience. We provide 24/7 access
                to an extensive range of trading products, including forex,
                cryptocurrencies, commodities, indices, and stocks.
              </p>
              <p className="mt-8">
                At Elite Pro Markets, we leverage advanced technology to ensure
                high liquidity, low spreads, mobile trading, and robust
                technical analysis. Our platform is designed to cater to both
                novice and professional traders.
              </p>
              <p className="mt-8">
                We pride ourselves on maintaining secure trading environments
                and offering personalized trading conditions. Our mission is to
                empower traders with the tools, knowledge, and skills needed to
                achieve financial success.
              </p>
              <p className="mt-8">
                By combining innovative solutions with industry expertise, we
                help traders enhance their strategies, optimize performance, and
                unlock their full potential in financial markets.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto container px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Elite Pro Markets, we are committed to excellence and client
              satisfaction. Our team of experts works tirelessly to provide a
              superior trading experience.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div>
              <dt className="font-semibold text-gray-900">
                Unified Trading Accounts
              </dt>
              <dd className="mt-1 text-gray-600">
                Simplify your trading journey with our unified account system,
                offering access to all our financial instruments in one place.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">
                Licensed and Trusted
              </dt>
              <dd className="mt-1 text-gray-600">
                Elite Pro Markets operates under strict regulatory standards,
                ensuring transparency and trust in all our operations.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">
                Instant Access and Support
              </dt>
              <dd className="mt-1 text-gray-600">
                Open an account within minutes and enjoy responsive customer
                support available to assist you every step of the way.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
