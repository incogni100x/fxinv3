import { Information } from "iconsax-react";

interface FormInfoProps {
  message?: string;
}

export const FormInfo = ({ message }: FormInfoProps) => {
  if (!message) return null;

  return (
    <div className=" bg-primary/20 p-4 rounded-md flex items-center gap-x-2 text-sm text-primary">
      <Information className="h-6 w-6 text-primary flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};
