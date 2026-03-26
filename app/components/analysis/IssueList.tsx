"use client";
import { Badge } from "../ui/Badge";
import { AnalysisIssue } from "../../types";

interface IssueListProps {
  issues: AnalysisIssue[];
}

const typeIcons: Record<string, string> = {
  contrast: "◑",
  seo: "⊕",
  ux: "◎",
  performance: "⚡",
  content: "≡",
  accessibility: "◻",
};

export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <div className="border border-emerald-400/20 bg-emerald-400/3 rounded-2xl p-8 text-center">
        <p className="text-emerald-400 font-mono text-sm tracking-wider">
          Sin problemas detectados — sitio en excelente estado
        </p>
      </div>
    );
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...issues].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-6 h-px bg-slate-700" />
        <h2 className="font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
          Issues encontrados ({issues.length})
        </h2>
      </div>

      <div className="space-y-2">
        {sorted.map((issue, i) => (
          <div
            key={i}
            className="group border border-white/6 bg-white/2 hover:bg-white/4 hover:border-white/1 rounded-xl p-5 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg border border-white/8 bg-white/3 flex items-center justify-center text-slate-500 font-mono text-sm shrink-0 mt-0.5">
                {typeIcons[issue.type] || "!"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <p className="font-medium text-slate-200 text-sm">
                    {issue.description}
                  </p>
                  <Badge variant={issue.priority} />
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                  {issue.suggestion}
                </p>
                <span className="font-mono text-[11px] text-slate-700 bg-white/3 border border-white/6 px-2 py-0.5 rounded-md tracking-wider">
                  {issue.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
