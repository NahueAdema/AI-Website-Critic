import { AIProvider } from "./types";
import { GeminiProvider } from "./gemini-provider";

/**
 * Factory que devuelve el proveedor configurado.
 * Permite cambiar de IA solo modificando variables de entorno.
 */
export function getAIProvider(): AIProvider {
  return new GeminiProvider();
}

// Singleton para reutilizar la instancia
let providerInstance: AIProvider | null = null;

export const aiClient = {
  analyze: async (html: string, url: string) => {
    if (!providerInstance) {
      providerInstance = getAIProvider();
    }
    return providerInstance.analyze(html, url);
  },
};
