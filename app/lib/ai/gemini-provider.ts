import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider } from "./types";
import { AnalysisResult } from "../../types";
import { getSystemPrompt } from "./prompt";
import { AiResponseSchema } from "./schema";

export class GeminiProvider implements AIProvider {
  private api: GoogleGenerativeAI;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY no está configurada");
    }
    this.api = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async analyze(html: string, url: string): Promise<AnalysisResult> {
    try {
      const model = this.api.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        ${getSystemPrompt()}
        
        URL a analizar: ${url}
        
        HTML de la página:
        ${html}
        
        IMPORTANTE: Responde ÚNICAMENTE con un JSON válido que coincida con este esquema:
        ${JSON.stringify(AiResponseSchema.shape)}
        
        No incluyas texto antes o después del JSON. Sin markdown, sin \`\`\`.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();

      // Limpieza defensiva: a veces la IA envía ```json ... ```
      const cleanJson = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleanJson);

      // Validar con Zod que la estructura sea correcta
      const validated = AiResponseSchema.parse(parsed);

      return {
        url,
        timestamp: new Date().toISOString(),
        scores: validated.scores,
        strengths: validated.strengths,
        issues: validated.issues,
        quickWins: validated.quickWins,
      };
    } catch (error) {
      console.error("[GeminiProvider] Error:", error);
      throw new Error("Error al analizar con IA. Intenta de nuevo.");
    }
  }
}
