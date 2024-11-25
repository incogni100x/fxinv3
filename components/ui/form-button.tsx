import React from "react";
import { Button, ButtonProps } from "./button";
import Spinner from "./loader";

interface FormButtonProps extends Omit<ButtonProps, "onClick"> {
  isPending: boolean;
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonProps["variant"];
  className?: string;
}

export default function FormButton({
  isPending,
  size = "lg",
  title,
  onClick,
  variant = "default",
  type = "submit",
  className,
}: FormButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={isPending}
      onClick={onClick}
      className={className}
    >
      {isPending ? <Spinner width={24} height={24} /> : <span>{title}</span>}
    </Button>
  );
}
