// components/ui/Card.tsx
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "border border-gray-200 dark:border-gray-700",
      elevated: "shadow-lg border border-gray-200 dark:border-gray-700",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 bg-white dark:bg-gray-800 transition-colors",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
