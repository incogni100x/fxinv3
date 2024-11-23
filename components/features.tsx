import { cn } from "@/lib/utils";

import {
  Chart,
  Chart2,
  ChartCircle,
  ChartSuccess,
  I24Support,
  MoneyTick,
  Profile2User,
  Security,
} from "iconsax-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "User-Friendly Platform",
      description:
        " Intuitive interface tailored for ease of use, no matter your experience level.",
      icon: <Profile2User />,
    },
    {
      title: "Diverse Investment Opportunities",
      description:
        "We leverage advanced trading algorithms, AI-driven analysis, and secure wallets to maximize profits from cryptocurrency investments.",
      icon: <Chart />,
    },
    {
      title: "Forex Trading",
      description:
        "We rigorously analyze and select currency pairs for investment. Leveraging expert insights and advanced trading bots, we ensure efficient and profitable trades.",
      icon: <Chart2 />,
    },
    {
      title: "Crypto Trading",
      description:
        "We leverage advanced trading algorithms, AI-driven analysis, and secure wallets to maximize profits from cryptocurrency investments.",
      icon: <ChartSuccess />,
    },
    {
      title: "Expert Guidance",
      description:
        "Access to market insights, analytics, and investment strategies from seasoned professionals.",
      icon: <ChartCircle />,
    },
    {
      title: "Risk Assessment",
      description:
        "We conduct due diligence to assess potential risks and ensure the credibility of all investment opportunities.",
      icon: <MoneyTick />,
    },
    {
      title: "Transparent Returns",
      description:
        "Clear and consistent reporting so you always know where you stand",
      icon: <Security />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "Our dedicated team is always ready to assist with any questions or concerns.",
      icon: <I24Support />,
    },
  ];
  return (
    <div className="bg-white lg:space-y-10 space-y-6 py-20">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto  text-black">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          <span className="text-primary"> Invest</span> with Confidence
        </h2>
      </div>

      <div className="grid  grid-cols-1 container md:grid-cols-2 lg:grid-cols-4  relative z-10 py-6 mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature border-border",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b "
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600  w-fit group-hover:text-white group-hover:bg-primary group-hover:rounded-md transition-all duration-200">
        {icon}
      </div>

      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
