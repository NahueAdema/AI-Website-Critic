"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { analyzeWebsite } from "./actions/analyze-website";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await analyzeWebsite(formData);
      if (result.success) {
        const encodedData = encodeURIComponent(JSON.stringify(result.data));
        router.push(`/analyze?data=${encodedData}`);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <main className="relative min-h-screen bg-[#080b0f] text-slate-200 overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,170,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.04)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-[radial-gradient(ellipse,rgba(0,255,170,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-36">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-emerald-400" />
          <span className="font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">
            Análisis con IA
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.02] text-white mb-6">
          Tu web bajo
          <br />
          el <span className="text-emerald-400">microscopio</span>
        </h1>

        <p className="text-lg text-slate-500 leading-relaxed max-w-md mb-16">
          Diagnóstico profesional de UX, UI, SEO y accesibilidad en segundos.
          Sin rodeos.
        </p>

        {/* Form */}
        <form action={handleSubmit} className="space-y-3">
          <Input
            name="url"
            type="url"
            placeholder="https://tu-sitio.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={error ?? undefined}
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isPending}
          >
            {isPending ? "Escaneando..." : "Analizar mi sitio ahora"}
          </Button>
        </form>

        <p className="font-mono text-xs text-slate-700 mt-4">
          Análisis completo en menos de 30 segundos
        </p>

        {/* Feature scores */}
        <div className="grid grid-cols-3 border border-white/6 rounded-2xl overflow-hidden mt-20">
          {[
            { num: "01", label: "UX SCORE", val: "94" },
            { num: "02", label: "SEO SCORE", val: "87" },
            { num: "03", label: "A11Y SCORE", val: "91" },
          ].map((f, i) => (
            <div
              key={f.num}
              className={`bg-white/2 hover:bg-emerald-400/4 transition-colors px-7 py-8 ${
                i === 1 ? "border-x border-white/6" : ""
              }`}
            >
              <p className="font-mono text-[11px] text-slate-800 tracking-widest mb-6">
                {f.num} · {f.label}
              </p>
              <p className="text-5xl font-bold text-white tracking-tight leading-none mb-2">
                {f.val}
                <span className="text-xl text-slate-600 font-normal">/100</span>
              </p>
            </div>
          ))}
        </div>

        {/* Mini metrics */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: "PERF", val: "98", pct: 98 },
            { label: "LCP", val: "1.2s", pct: 85 },
            { label: "CLS", val: "0.01", pct: 99 },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white/2 border border-white/6 rounded-xl p-5"
            >
              <p className="font-mono text-[11px] text-slate-600 tracking-wider">
                {m.label}
              </p>
              <p className="text-2xl font-bold text-white mt-1">{m.val}</p>
              <div className="h-0.5 bg-slate-800 rounded mt-3">
                <div
                  className="h-full rounded bg-linear-to-r from-emerald-400 to-cyan-400"
                  style={{ width: `${m.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-3 mt-14 border border-emerald-400/20 bg-emerald-400/3 rounded-xl px-6 py-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-emerald-400 tracking-wider">
            Sistema listo · Esperando URL
          </span>
        </div>
      </div>

      <footer className="border-t border-white/6 text-center py-8 font-mono text-xs text-slate-800 tracking-widest">
        WebCritic &copy; 2025 · Powered by Google Gemini AI + Next.js
      </footer>
    </main>
  );
}
