"use client";
import { useState } from "react";
import { cn } from "../../lib/utils";

interface QuickWinsProps {
  wins: string[];
}

export function QuickWins({ wins }: QuickWinsProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  if (wins.length === 0) return null;

  const toggle = (i: number) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / wins.length) * 100);

  return (
    <div className="border border-white/6 bg-white/2 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-slate-700" />
          <h2 className="font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
            Quick wins
          </h2>
        </div>
        <span className="font-mono text-xs text-slate-600">
          {done}/{wins.length} · {pct}%
        </span>
      </div>

      {/* Progress */}
      <div className="h-0.5 bg-slate-800 rounded mb-6 mt-4">
        <div
          className="h-full rounded bg-linear-to-r from-emerald-400 to-cyan-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-2">
        {wins.map((win, i) => (
          <li
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl cursor-pointer border transition-all",
              checked[i]
                ? "border-emerald-400/20 bg-emerald-400/4"
                : "border-white/4 bg-white/1 hover:border-white/8 hover:bg-white/3",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-all",
                checked[i]
                  ? "bg-emerald-400 border-emerald-400"
                  : "border-slate-700 bg-transparent",
              )}
            >
              {checked[i] && (
                <svg
                  className="w-3 h-3 text-[#080b0f]"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              )}
            </div>
            <span
              className={cn(
                "text-sm leading-relaxed transition-all",
                checked[i] ? "text-slate-600 line-through" : "text-slate-300",
              )}
            >
              {win}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
