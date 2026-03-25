"use client";

import { Card } from "../ui/Card";

interface StrengthsListProps {
  strengths: string[];
}

/**
 * Lista de fortalezas encontradas en el sitio.
 */
export function StrengthsList({ strengths }: StrengthsListProps) {
  if (strengths.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
      <h2 className="text-xl font-semibold text-green-900 dark:text-green-300 mb-4">
        ✅ Fortalezas ({strengths.length})
      </h2>
      <ul className="space-y-2">
        {strengths.map((strength, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span className="text-gray-700 dark:text-gray-300">{strength}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
