// app/page.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Card } from "./components/ui/Card";
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
        // Navegar con los datos en query params
        const encodedData = encodeURIComponent(JSON.stringify(result.data));
        router.push(`/analyze?data=${encodedData}`);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          🤖 AI Website Critic
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Analizá tu web con IA y obtené feedback de UX, UI y SEO
        </p>
      </div>

      {/* Formulario */}
      <Card variant="elevated" className="w-full max-w-lg">
        <form action={handleSubmit} className="space-y-4">
          <Input
            label="URL de tu sitio web"
            type="url"
            name="url"
            placeholder="https://ejemplo.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isPending}
          >
            {isPending ? "Analizando..." : "🚀 Analizar mi sitio"}
          </Button>
        </form>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-4xl">
        <Card className="text-center">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Score Detallado
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            UX, SEO y Accesibilidad en una sola vista
          </p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl mb-2">💡</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Feedback Accionable
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sugerencias concretas para mejorar
          </p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Rápido y Gratis
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Análisis en segundos con IA
          </p>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Hecho con ❤️ </p>
        <p className="mt-1">Powered by Google Gemini AI + Next.js</p>
      </footer>
    </main>
  );
}
