// app/api/debug-ai/route.ts
import { NextResponse } from "next/server";
import { aiClient } from "../../lib/ai/client";

export async function GET() {
  try {
    console.log("[Debug AI] Probando conexión con proveedor actual...");

    // Test mínimo con HTML simple
    const testHtml =
      "<html><head><title>Test</title></head><body><h1>Hello</h1></body></html>";
    const result = await aiClient.analyze(testHtml, "https://example.com");

    return NextResponse.json({
      success: true,
      message: "✅ IA funcionando correctamente",
      provider: process.env.USE_GEMINI === "true" ? "Gemini" : "Groq",
      scores: result.scores,
      issuesCount: result.issues.length,
    });
  } catch (error: unknown) {
    console.error("[Debug AI] Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error desconocido",
        hint: "Verificá: 1) API Key en .env.local, 2) Reiniciaste el servidor, 3) Tenés conexión a internet",
      },
      { status: 500 },
    );
  }
}
