import { AIProvider } from "./types";
import { AnalysisResult } from "../../types";
import { getSystemPrompt } from "./prompt";
import { AiResponseSchema } from "./schema";

export class GeminiProvider implements AIProvider {
  private apiKey: string;
  // URL construida manualmente, sin SDK
  private apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY no está configurada en .env.local");
    }
    // .trim() elimina espacios accidentales al copiar/pegar
    this.apiKey = process.env.GEMINI_API_KEY.trim();
  }

  async analyze(html: string, url: string): Promise<AnalysisResult> {
    const prompt = `${getSystemPrompt()}

URL a analizar: ${url}

HTML de la página (primeros 30000 caracteres):
${html.slice(0, 30000)}

IMPORTANTE: Respondé ÚNICAMENTE con JSON válido. Sin markdown, sin texto extra.
Esquema esperado:
{
  "scores": { "ux": number, "seo": number, "accessibility": number },
  "strengths": string[],
  "issues": [{ "type": string, "description": string, "suggestion": string, "priority": "high"|"medium"|"low" }],
  "quickWins": string[]
}`;

    console.log("[Gemini] Enviando request vía fetch directo...");

    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json", // ← Forzar respuesta JSON
            temperature: 0.1, // ← Respuestas más consistentes
          },
        }),
      });

      // Manejo de errores HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[Gemini] Error HTTP:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });

        if (response.status === 404) {
          throw new Error(
            'Modelo no encontrado. Verificá que "gemini-1.5-flash" esté disponible en tu región.',
          );
        }
        if (response.status === 403) {
          throw new Error(
            'API Key sin permisos. Habilitá "Generative Language API" en Google Cloud Console.',
          );
        }
        if (response.status === 429) {
          throw new Error("Límite de requests excedido. Esperá unos segundos.");
        }

        throw new Error(
          `Error ${response.status}: ${errorData.error?.message || response.statusText}`,
        );
      }

      const data = await response.json();

      // Extraer el texto de la respuesta
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        console.error("[Gemini] Respuesta sin contenido:", data);
        throw new Error("La IA no devolvió contenido válido");
      }

      // Limpieza defensiva del JSON
      const cleanJson = text
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();

      const parsed = JSON.parse(cleanJson);
      const validated = AiResponseSchema.parse(parsed);

      console.log("[Gemini] ✅ Análisis completado");

      return {
        url,
        timestamp: new Date().toISOString(),
        scores: validated.scores,
        strengths: validated.strengths,
        issues: validated.issues,
        quickWins: validated.quickWins,
      };
    } catch (error: any) {
      console.error("[GeminiProvider] Error:", error?.message || error);
      throw error;
    }
  }
}
