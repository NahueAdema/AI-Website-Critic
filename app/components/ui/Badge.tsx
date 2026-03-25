import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { IssuePriority } from "../../types";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "high" | "medium" | "low" | "default";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };

    const priorityLabels: Record<IssuePriority | "default", string> = {
      high: "Alta",
      medium: "Media",
      low: "Baja",
      default: "",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children || priorityLabels[variant]}
      </span>
    );
  },
);

Badge.displayName = "Badge";
