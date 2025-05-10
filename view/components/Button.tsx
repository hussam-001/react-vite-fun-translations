import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline" | "danger" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-md text-primary-foreground cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
        variant === "primary" && "bg-white text-black hover:bg-primary/90",
        variant === "outline" && "border text-white hover:bg-primary/10",
        variant === "icon" && "p-2! text-white hover:bg-primary/10",
        variant === "danger" &&
          "text-red-400 bg-red-400/10 hover:bg-red-400/20",
        className
      )}
      {...props}
    />
  );
}
