"use client";
import { cn } from "../../lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
}

export function ScoreCard({ label, score }: ScoreCardProps) {
  const color =
    score >= 8
      ? "text-emerald-400"
      : score >= 5
        ? "text-amber-400"
        : "text-red-400";

  const barColor =
    score >= 8
      ? "from-emerald-400 to-cyan-400"
      : score >= 5
        ? "from-amber-400 to-orange-400"
        : "from-red-400 to-rose-400";

  const sublabel =
    score >= 8 ? "Excelente" : score >= 5 ? "Regular" : "Crítico";

  return (
    <div className="border border-white/6 bg-white/2 hover:bg-white/4 transition-colors rounded-2xl p-6">
      <p className="font-mono text-[11px] text-slate-700 tracking-widest uppercase mb-4">
        {label}
      </p>
      <div
        className={`text-5xl font-bold tracking-tight leading-none mb-1 ${color}`}
      >
        {score}
        <span className="text-lg text-slate-700 font-normal">/10</span>
      </div>
      <p className="text-xs text-slate-600 mb-4">{sublabel}</p>
      <div className="h-0.5 bg-slate-800 rounded">
        <div
          className={cn(
            "h-full rounded bg-linear-to-r transition-all duration-700",
            barColor,
          )}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}
