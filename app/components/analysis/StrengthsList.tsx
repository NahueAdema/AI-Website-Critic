"use client";

interface StrengthsListProps {
  strengths: string[];
}

export function StrengthsList({ strengths }: StrengthsListProps) {
  if (strengths.length === 0) return null;

  return (
    <div className="border border-emerald-400/15 bg-emerald-400/3 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-6 h-px bg-emerald-400/40" />
        <h2 className="font-mono text-xs tracking-[0.2em] text-emerald-500 uppercase">
          Fortalezas ({strengths.length})
        </h2>
      </div>
      <ul className="space-y-3">
        {strengths.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-emerald-400"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="2,6 5,9 10,3" />
              </svg>
            </div>
            <span className="text-sm text-slate-400 leading-relaxed">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
