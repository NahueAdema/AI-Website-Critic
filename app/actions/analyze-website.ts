"use server";

import { validateUrl } from "./validate-url";
import { fetchAndCleanHtml } from "../lib/scraper/fetch-html";
import { aiClient } from "../lib/ai/client";
import { AnalyzeWebsiteResult } from "../types";

/**
 * Server Action principal para analizar un sitio web.
 *
 * Flujo:
 * 1. Validar URL del usuario
 * 2. Obtener y limpiar HTML
 * 3. Enviar a IA para análisis
 * 4. Retornar resultado estructurado
 *
 * @param formData - FormData con la URL a analizar
 * @returns Resultado tipado con éxito o error
 */
export async function analyzeWebsite(
  formData: FormData,
): Promise<AnalyzeWebsiteResult> {
  const url = formData.get("url") as string;

  // ─────────────────────────────────────────────────────────────
  // 1. VALIDACIÓN DE ENTRADA
  // ─────────────────────────────────────────────────────────────
  if (!url || typeof url !== "string") {
    return { success: false, error: "La URL es requerida" };
  }

  const validation = await validateUrl(url.trim());
  if (!validation.valid) {
    return { success: false, error: validation.error! };
  }

  try {
    // ─────────────────────────────────────────────────────────────
    // 2. OBTENER HTML DE LA WEB
    // ─────────────────────────────────────────────────────────────
    console.log("[analyzeWebsite] Fetching HTML for:", url);
    const html = await fetchAndCleanHtml(url.trim());

    if (!html || html.length < 50) {
      return {
        success: false,
        error: "No se pudo obtener contenido de la web",
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 3. ANALIZAR CON IA
    // ─────────────────────────────────────────────────────────────
    console.log("[analyzeWebsite] Analyzing with AI...");
    const analysisResult = await aiClient.analyze(html, url.trim());

    // ─────────────────────────────────────────────────────────────
    // 4. RETORNAR RESULTADO
    // ─────────────────────────────────────────────────────────────
    console.log("[analyzeWebsite] Analysis complete!");
    return {
      success: true,
      data: analysisResult,
    };
  } catch (error) {
    // ─────────────────────────────────────────────────────────────
    // 5. MANEJO DE ERRORES
    // ─────────────────────────────────────────────────────────────
    console.error("[analyzeWebsite] Error:", error);

    // Error amigable para el usuario
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error interno. Intentá de nuevo.";

    // No exponer detalles técnicos al cliente
    return {
      success: false,
      error: errorMessage.includes("API")
        ? "Error al conectar con el servicio de IA. Intentá en unos minutos."
        : errorMessage,
    };
  }
}
