"use client";

import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { AnalysisIssue } from "../../types";
import { cn } from "../../lib/utils";

interface IssueListProps {
  issues: AnalysisIssue[];
}

/**
 * Lista de issues encontrados con prioridades y sugerencias.
 */
export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <Card className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          🎉 ¡No se encontraron problemas! Tu sitio está en excelente estado.
        </p>
      </Card>
    );
  }

  // Ordenar por prioridad (high → medium → low)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedIssues = [...issues].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );

  const getIcon = (type: string) => {
    const icons: Record<string, string> = {
      contrast: "🎨",
      seo: "🔍",
      ux: "👆",
      performance: "⚡",
      content: "📝",
      accessibility: "♿",
    };
    return icons[type] || "⚠️";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Issues Encontrados ({issues.length})
      </h2>

      {sortedIssues.map((issue, index) => (
        <Card key={index} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{getIcon(issue.type)}</span>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {issue.description}
                </h3>
                <Badge variant={issue.priority} />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {issue.suggestion}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                  {issue.type}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Prioridad:{" "}
                  {issue.priority === "high"
                    ? "Alta"
                    : issue.priority === "medium"
                      ? "Media"
                      : "Baja"}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
