"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ScoreCard } from "../components/analysis/ScoreCard";
import { IssueList } from "../components/analysis/IssueList";
import { QuickWins } from "../components/analysis/QuickWins";
import { StrengthsList } from "../components/analysis/StrengthsList";
import { AnalysisResult } from "../types";
import { formatUrl } from "../lib/utils";

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Intentar obtener datos de query params
    const dataParam = searchParams.get("data");

    if (!dataParam) {
      setError("No hay datos de análisis. Volvé a la página principal.");
      return;
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(dataParam));
      setResult(parsed);
      setError(null);
    } catch (e) {
      setError("No se pudieron cargar los resultados. Volvé a analizar.");
      setResult(null);
    }
  }, [searchParams]);

  const handleBack = () => {
    router.push("/");
  };

  const handleNewAnalysis = () => {
    router.push("/");
  };

  if (error || !result) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <Card variant="elevated" className="max-w-md w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error al cargar resultados
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || "Los datos no están disponibles"}
          </p>
          <Button onClick={handleBack} variant="primary">
            Volver al inicio
          </Button>
        </Card>
      </main>
    );
  }

  const averageScore = Math.round(
    (result.scores.ux + result.scores.seo + result.scores.accessibility) / 3,
  );

  return (
    <main className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              📊 Resultados del Análisis
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              URL:{" "}
              <span className="font-mono text-sm">{formatUrl(result.url)}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {new Date(result.timestamp).toLocaleString("es-AR")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleBack} variant="outline">
              ← Volver
            </Button>
            <Button onClick={handleNewAnalysis} variant="primary">
              🔄 Nuevo Análisis
            </Button>
          </div>
        </div>

        {/* Score General */}
        <Card variant="elevated" className="mb-8 p-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">
              <span
                className={
                  averageScore >= 8
                    ? "text-green-600"
                    : averageScore >= 5
                      ? "text-yellow-600"
                      : "text-red-600"
                }
              >
                {averageScore}/10
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Score Promedio
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {averageScore >= 8
                ? "¡Excelente trabajo!"
                : averageScore >= 5
                  ? "Buen inicio, hay margen de mejora"
                  : "Necesita atención urgente"}
            </p>
          </div>
        </Card>

        {/* Scores por Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ScoreCard label="UX" score={result.scores.ux} icon="👆" />
          <ScoreCard label="SEO" score={result.scores.seo} icon="🔍" />
          <ScoreCard
            label="Accesibilidad"
            score={result.scores.accessibility}
            icon="♿"
          />
        </div>

        {/* Fortalezas */}
        {result.strengths.length > 0 && (
          <div className="mb-8">
            <StrengthsList strengths={result.strengths} />
          </div>
        )}

        {/* Issues */}
        <div className="mb-8">
          <IssueList issues={result.issues} />
        </div>

        {/* Quick Wins */}
        <div className="mb-8">
          <QuickWins wins={result.quickWins} />
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
          <p>¿Te fue útil este análisis? ¡Compartilo con tu equipo!</p>
          <p className="mt-2">Hecho con ❤️</p>
        </footer>
      </div>
    </main>
  );
}
