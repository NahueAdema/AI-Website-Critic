"use server";

import { analyzeWebsite } from "./analyze-website";

export async function testAnalyze(): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("No disponible en producción");
  }

  const formData = new FormData();
  formData.append("url", "https://example.com");

  console.log("🧪 Iniciando test de análisis...");
  const result = await analyzeWebsite(formData);

  if (result.success) {
    console.log("✅ Test exitoso!");
    console.log("Scores:", result.data.scores);
    console.log("Issues:", result.data.issues.length);
  } else {
    console.log("❌ Test falló:", result.error);
  }
}
