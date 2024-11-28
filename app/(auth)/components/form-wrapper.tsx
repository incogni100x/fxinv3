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
    <Card className={cn("w-full  rounded-lg py-10", className)}>
      <CardHeader className=" flex items-center justify-center text-center space-y-4">
        {currentStep && lastStep && (
          <h3 className="text-sm text-primary">
            Step {currentStep}/{lastStep}
          </h3>
        )}
        <CardTitle className=" text-neutral-950 text-2xl lg:text-4xl tracking-tighter">
          {Label}
        </CardTitle>
        <CardDescription className="max-w-md text-base lg:text-lg text-neutral-600 tracking-tight">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 md:px-6">{children}</CardContent>
    </Card>
  );
};
