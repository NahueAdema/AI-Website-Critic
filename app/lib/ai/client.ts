import { AIProvider } from "./types";
// import { GeminiProvider } from './gemini-provider';
import { GroqProvider } from "./groq-provider";

export function getAIProvider(): AIProvider {
  return new GroqProvider();
}

let providerInstance: AIProvider | null = null;

export const aiClient = {
  analyze: async (html: string, url: string) => {
    if (!providerInstance) {
      providerInstance = getAIProvider();
    }
    return providerInstance.analyze(html, url);
  },
};
