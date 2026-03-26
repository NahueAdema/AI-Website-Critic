import { Suspense } from "react";
import { AnalyzePageContent } from "./AnalyzePageContent";

/**
 * Loading fallback mientras se hidrata el componente cliente.
 */
function LoadingFallback() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#080b0f]">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Preparando análisis...</p>
      </div>
    </main>
  );
}

/**
 * Página principal de resultados.
 * Envuelve el componente cliente en Suspense para cumplir con Next.js App Router.
 */
export default function AnalyzePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnalyzePageContent />
    </Suspense>
  );
}
