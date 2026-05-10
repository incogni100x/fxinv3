"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  Label: string;
  description?: string;
  currentStep?: string;
  lastStep?: string;
  className?: string;
}

export const FormWrapper = ({
  children,
  Label,
  description,
  currentStep,
  lastStep,
  className,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        "w-full rounded-lg border-gray-700 bg-[#1F2937] py-10 text-gray-100 shadow-xl shadow-black/20",
        className
      )}
    >
      <CardHeader className="flex items-center justify-center space-y-4 text-center">
        {currentStep && lastStep && (
          <h3 className="text-sm font-medium text-primary">
            Step {currentStep}/{lastStep}
          </h3>
        )}
        <CardTitle className="text-2xl tracking-tighter text-white lg:text-4xl">
          {Label}
        </CardTitle>
        <CardDescription className="max-w-md text-base tracking-tight text-gray-400 lg:text-lg">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 md:px-6">{children}</CardContent>
    </Card>
  );
};
