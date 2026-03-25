"use client";

import { useState } from "react";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

interface QuickWinsProps {
  wins: string[];
}
/**
 * Lista de mejoras rápidas con checkboxes interactivos.
 */
export function QuickWins({ wins }: QuickWinsProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = wins.length > 0 ? (completedCount / wins.length) * 100 : 0;

  if (wins.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          🚀 Quick Wins ({completedCount}/{wins.length})
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(progress)}% completado
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Lista de quick wins */}
      <ul className="space-y-3">
        {wins.map((win, index) => (
          <li
            key={index}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
              checked[index]
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700",
            )}
            onClick={() => toggleCheck(index)}
          >
            <input
              type="checkbox"
              checked={checked[index] || false}
              onChange={() => toggleCheck(index)}
              className="mt-1 h-4 w-4 text-green-600 rounded focus:ring-green-500"
              onClick={(e) => e.stopPropagation()}
            />
            <span
              className={cn(
                "text-sm",
                checked[index]
                  ? "text-green-800 dark:text-green-300 line-through"
                  : "text-gray-700 dark:text-gray-300",
              )}
            >
              {win}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
