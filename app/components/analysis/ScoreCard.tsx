"use client";

import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  icon?: React.ReactNode;
}

/**
 * Muestra un score individual con barra de progreso.
 */
export function ScoreCard({ label, score, icon }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excelente";
    if (score >= 5) return "Regular";
    return "Necesita mejorar";
  };

  return (
    <Card className="flex flex-col items-center p-4">
      {icon && <div className="mb-2 text-2xl">{icon}</div>}
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        {score}/10
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {label}
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            getScoreColor(score),
          )}
          style={{ width: `${score * 10}%` }}
        />
      </div>

      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {getScoreLabel(score)}
      </div>
    </Card>
  );
}
