import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { IssuePriority } from "../../types";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "high" | "medium" | "low" | "default";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      high: "bg-red-500/10 text-red-400 border border-red-500/20",
      medium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      low: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      default: "bg-white/[0.04] text-slate-400 border border-white/[0.08]",
    };

    const labels: Record<IssuePriority | "default", string> = {
      high: "Alta",
      medium: "Media",
      low: "Baja",
      default: "",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[11px] tracking-wider",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children || labels[variant]}
      </span>
    );
  },
);
Badge.displayName = "Badge";
