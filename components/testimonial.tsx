"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "iconsax-react";

const testimonials = [
  {
    name: "Michael O.",
    role: "Forex Trader",
    text: "FX Market Elite Pros has transformed my trading game. The analytics tools are unparalleled, giving me real-time insights that I can act on instantly.",
  },
  {
    name: "Amanda T.",
    role: "Freelance Financial Consultant",
    text: "Managing my clients' accounts has never been easier. The intuitive dashboard saves me hours each week, letting me focus on what matters most.",
  },
  {
    name: "Samuel B.",
    role: "Entrepreneur",
    text: "I was skeptical at first, but after just one month, my financial tracking became seamless. The automation features are a game-changer!",
  },
  {
    name: "Olivia M.",
    role: "Crypto Enthusiast",
    text: "I love how easily FX Market Elite Pros integrates with my crypto wallets. The multi-currency support is exactly what I needed.",
  },
  {
    name: "David R.",
    role: "Small Business Owner",
    text: "Running a business is hard enough, but FX Market Elite Pros makes managing finances stress-free. Highly recommended!",
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
              Thousands of forward-thinking users rely on FX Market Elite Pros
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
