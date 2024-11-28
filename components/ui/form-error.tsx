import { Warning2 } from "iconsax-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className=" bg-destructive/20 p-4 rounded-md flex items-start gap-x-2 text-sm text-destructive">
      <Warning2 className="h-5 w-5 text-destructive flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};
