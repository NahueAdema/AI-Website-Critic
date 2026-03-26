import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glow";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "border border-white/[0.06] bg-white/[0.02]",
      elevated:
        "border border-white/[0.08] bg-white/[0.04] shadow-xl shadow-black/40",
      glow: "border border-emerald-400/20 bg-emerald-400/[0.03] shadow-lg shadow-emerald-400/5",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 transition-all",
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
