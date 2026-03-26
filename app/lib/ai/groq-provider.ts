import Groq from "groq-sdk";
import { AIProvider } from "./types";
import { AnalysisResult } from "../../types";
import { getSystemPrompt } from "./prompt";
import { AiResponseSchema } from "./schema";

export class GroqProvider implements AIProvider {
  private client: Groq;

  // Modelo configurable, con fallback seguro
  private model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY no está configurada");
    }
    this.client = new Groq({ apiKey: process.env.GROQ_API_KEY.trim() });
  }

  async analyze(html: string, url: string): Promise<AnalysisResult> {
    const prompt = `${getSystemPrompt()}

    URL a analizar: ${url}

    HTML de la página (resumen de los primeros 25000 caracteres):
    ${html.slice(0, 25000)}

    ⚠️ INSTRUCCIONES CRÍTICAS PARA EL JSON DE RESPUESTA:

    1. Respondé ÚNICAMENTE con JSON válido. Sin markdown, sin texto extra.

    2. Para el campo "issues[].type", usá EXACTAMENTE uno de estos 6 valores (en minúsculas):
    - "contrast"     → Problemas de color, contraste de texto, legibilidad
    - "seo"          → Meta tags, headings, estructura para buscadores
    - "ux"           → Navegación, usabilidad, flujo del usuario
    - "performance"  → Velocidad de carga, optimización de recursos
    - "content"      → Claridad del mensaje, copywriting, jerarquía
    - "accessibility"→ ARIA labels, foco navegable, screen readers

    3. Para "priority", usá exactamente: "high", "medium" o "low" (en minúsculas).

    4. Ejemplo de issue válido:
    {
        "type": "contrast",
        "description": "Los botones tienen bajo contraste",
        "suggestion": "Aumentar el contraste a mínimo 4.5:1",
        "priority": "high"
    }

    Esquema completo esperado:
    {
    "scores": { "ux": number, "seo": number, "accessibility": number },
    "strengths": string[],
    "issues": [{ "type": "contrast"|"seo"|"ux"|"performance"|"content"|"accessibility", "description": string, "suggestion": string, "priority": "high"|"medium"|"low" }],
    "quickWins": string[]
    }`;

    console.log(`[Groq] Enviando request a ${this.model}...`);

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content:
              "Sos un experto en UX/UI, SEO y desarrollo web. Respondé siempre en JSON válido, sin texto extra.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.1, // Respuestas más consistentes
        max_tokens: 2048, // Suficiente para el JSON de respuesta
        response_format: { type: "json_object" }, // ← Forzar JSON (soportado por Llama 3.1)
      });

      const content = completion.choices[0]?.message?.content;

      if (!content) {
        throw new Error("Groq devolvió una respuesta vacía");
      }

      // Limpieza defensiva
      const cleanJson = content
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();

      const parsed = JSON.parse(cleanJson);
      const validated = AiResponseSchema.parse(parsed);

      console.log("[Groq] ✅ Análisis completado exitosamente");

      return {
        url,
        timestamp: new Date().toISOString(),
        scores: validated.scores,
        strengths: validated.strengths,
        issues: validated.issues,
        quickWins: validated.quickWins,
      };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      const status =
        error && typeof error === "object" && "status" in error
          ? (error as { status?: number | string }).status
          : undefined;

      console.error("[GroqProvider] Error:", {
        message: err.message,
        type: err.name,
        status,
      });

      if (status === 401) {
        throw new Error(
          "API Key de Groq inválida. Verificá GROQ_API_KEY en .env.local",
        );
      }
      if (status === 429) {
        throw new Error("Límite de requests de Groq. Esperá unos segundos.");
      }
      if (err.message?.includes("JSON")) {
        throw new Error(
          "La IA respondió con formato inválido. Intentá de nuevo.",
        );
      }

      throw new Error(`Error en Groq: ${err.message || "Error desconocido"}`);
    }
  }
}
