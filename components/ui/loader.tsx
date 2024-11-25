import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
interface SpinnerProps {
  width: number;
  height: number;
  className?: string;
}
export default function Spinner({ width, height, className }: SpinnerProps) {
  return (
    <LoaderCircle
      className={cn("animate-spin", className)}
      width={width}
      height={height}
    />
  );
}
