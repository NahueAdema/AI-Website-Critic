import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-mono text-xs tracking-widest text-slate-600 uppercase mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-5 py-4 rounded-xl font-mono text-sm outline-none transition-all",
            "bg-white/3 border placeholder-slate-700 text-slate-200",
            error
              ? "border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
              : "border-white/8 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 focus:bg-emerald-400/3",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 font-mono text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
