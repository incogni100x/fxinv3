"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "iconsax-react";

const testimonials = [
  {
    name: "James W.",
    role: "Professional Forex Trader",
    text: "Elite Pro Markets has revolutionized the way I trade. The platform's real-time analytics and smooth execution of trades have significantly boosted my profits.",
  },
  {
    name: "Sophia K.",
    role: "Financial Analyst",
    text: "I’ve tried many platforms, but none come close to the user-friendly design and powerful tools of Elite Pro Markets. The customizable dashboard is a game-changer for managing multiple assets.",
  },
  {
    name: "Carlos M.",
    role: "Investment Banker",
    text: "As a professional, I need a platform that offers both security and innovation. Elite Pro Markets provides top-notch security features and seamless mobile trading. It's the best I’ve used so far.",
  },
  {
    name: "Linda R.",
    role: "Crypto Investor",
    text: "Elite Pro Markets is the only platform that integrates all my crypto holdings in one place. The multi-currency support makes it incredibly convenient to manage both traditional and digital assets.",
  },
  {
    name: "David T.",
    role: "Small Business Owner",
    text: "Managing business finances has always been a hassle, but with Elite Pro Markets, everything from tracking to financial analysis is made simple and efficient. It's the perfect tool for modern businesses.",
  },
];

const TestimonialSection = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
  });

  return (
    <section className="container mx-auto">
      <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex flex-col items-center">
          {/* Title Section */}
          <div className="max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Built for today’s ambitious earners
            </h2>
            <p className="mt-4 text-muted-foreground">
              Thousands of forward-thinking users rely on Elite Pro Markets
              every day to turbo-charge their financial operations.
            </p>
          </div>

          {/* Slider Section */}
          <div className="mt-8 w-full max-w-3xl mx-auto">
            <div ref={sliderRef} className="keen-slider rounded-lg">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="keen-slider__slide bg-gray-100 rounded-lg shadow-md p-6 border border-gray-200 space-y-4"
                >
                  <blockquote className="text-gray-800 text-lg italic leading-relaxed">
                    “{testimonial.text}”
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-600">
                        {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <Button
                variant={"outline"}
                aria-label="Previous slide"
                className="rounded-full border border-muted-foreground p-3 text-muted-foreground transition hover:bg-primary hover:text-white"
                onClick={() => instanceRef.current?.prev()}
              >
                <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
              </Button>
              <Button
                variant={"outline"}
                aria-label="Next slide"
                className="rounded-full border border-muted-foreground p-3 text-muted-foreground transition hover:bg-primary hover:text-white"
                onClick={() => instanceRef.current?.next()}
              >
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
