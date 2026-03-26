"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
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
    const dataParam = searchParams.get("data");
    if (!dataParam) {
      setError("No hay datos de análisis.");
      return;
    }
    try {
      setResult(JSON.parse(decodeURIComponent(dataParam)));
    } catch {
      setError("No se pudieron cargar los resultados.");
    }
  }, [searchParams]);

  if (error || !result) {
    return (
      <main className="relative min-h-screen bg-[#080b0f] flex items-center justify-center p-6">
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,170,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.04)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />
        <div className="relative border border-white/8 bg-white/2 rounded-2xl p-10 max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-xl border border-red-500/20 bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-6 h-6 text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Error al cargar</h2>
          <p className="text-slate-500 text-sm mb-6">
            {error || "Datos no disponibles"}
          </p>
          <Button onClick={() => router.push("/")} variant="primary">
            Volver al inicio
          </Button>
        </div>
      </main>
    );
  }

  const averageScore = Math.round(
    (result.scores.ux + result.scores.seo + result.scores.accessibility) / 3,
  );

  const scoreColor =
    averageScore >= 8
      ? "text-emerald-400"
      : averageScore >= 5
        ? "text-amber-400"
        : "text-red-400";

  const scoreLabel =
    averageScore >= 8
      ? "Excelente"
      : averageScore >= 5
        ? "Buen inicio"
        : "Necesita atención";

  return (
    <main className="relative min-h-screen bg-[#080b0f] text-slate-200">
      {/* Grid bg */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,170,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.04)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

      {/* Sticky header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/6 backdrop-blur-sm bg-[#080b0f]/80">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#080b0f"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-wide text-white">
            Web<span className="text-emerald-400">Critic</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/")} variant="outline" size="sm">
            ← Volver
          </Button>
          <Button onClick={() => router.push("/")} variant="primary" size="sm">
            Nuevo análisis
          </Button>
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto px-6 py-16 space-y-8">
        {/* Page title */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-emerald-400" />
            <span className="font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">
              Reporte de análisis
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
            Resultados
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-sm text-slate-500 bg-white/3 border border-white/6 px-3 py-1 rounded-lg">
              {formatUrl(result.url)}
            </span>
            <span className="font-mono text-xs text-slate-700">
              {new Date(result.timestamp).toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* Score general hero */}
        <div className="border border-white/6 bg-white/2 rounded-2xl p-8 flex items-center justify-between gap-8 flex-wrap">
          <div>
            <p className="font-mono text-xs text-slate-600 tracking-widest uppercase mb-3">
              Score general
            </p>
            <div
              className={`text-8xl font-bold tracking-tighter leading-none ${scoreColor}`}
            >
              {averageScore}
              <span className="text-3xl text-slate-700 font-normal">/10</span>
            </div>
            <p className="text-slate-500 mt-3 text-sm">{scoreLabel}</p>
          </div>
          <div className="flex-1 min-w-50 max-w-sm space-y-4">
            {[
              { label: "UX", val: result.scores.ux },
              { label: "SEO", val: result.scores.seo },
              { label: "Accesibilidad", val: result.scores.accessibility },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between font-mono text-xs text-slate-600 mb-1.5">
                  <span>{s.label}</span>
                  <span className="text-slate-400">{s.val}/10</span>
                </div>
                <div className="h-1 bg-slate-800 rounded">
                  <div
                    className="h-full rounded bg-linear-to-r from-emerald-400 to-cyan-400 transition-all duration-700"
                    style={{ width: `${s.val * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScoreCard label="UX" score={result.scores.ux} />
          <ScoreCard label="SEO" score={result.scores.seo} />
          <ScoreCard
            label="Accesibilidad"
            score={result.scores.accessibility}
          />
        </div>

        {/* Strengths */}
        {result.strengths.length > 0 && (
          <StrengthsList strengths={result.strengths} />
        )}

        {/* Issues */}
        <IssueList issues={result.issues} />

        {/* Quick wins */}
        <QuickWins wins={result.quickWins} />

        <footer className="text-center pt-8 border-t border-white/6 font-mono text-xs text-slate-800 tracking-widest">
          WebCritic · Powered by Groq + Next.js
        </footer>
      </div>
    </main>
  );
}
