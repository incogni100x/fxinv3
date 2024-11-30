import React from "react";

export default function TrustedSection() {
  return (
    <div className="mx-auto container px-6 lg:px-8 py-24 ">
      <div className="mx-auto ">
        <p className="mt-2 text-3xl text-center font-bold tracking-tight text-white sm:text-4xl">
          Trusted by thousands of users&nbsp;worldwide
        </p>
      </div>
      <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
          <dt className="text-md leading-6">Paid out to traders</dt>
          <dd className="order-first text-[36px] font-semibold tracking-tight">
            $500M+
          </dd>
        </div>
        <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
          <dt className="text-md leading-6">Countries registered with us</dt>
          <dd className="order-first text-[36px] font-semibold tracking-tight">
            80+
          </dd>
        </div>
        <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
          <dt className="text-md leading-6">Volume of trades monthly</dt>
          <dd className="order-first text-[36px] font-semibold tracking-tight">
            40M+
          </dd>
        </div>
        <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
          <dt className="text-md leading-6">Avg. payout processing time</dt>
          <dd className="order-first text-[36px] font-semibold tracking-tight">
            24hr
          </dd>
        </div>
      </dl>
    </div>
  );
}
