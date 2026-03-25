export type AnalysisScore = {
  ux: number;
  seo: number;
  accessibility: number;
};

export type IssuePriority = "high" | "medium" | "low";

export type IssueType =
  | "contrast"
  | "seo"
  | "ux"
  | "performance"
  | "content"
  | "accessibility";

export interface AnalysisIssue {
  type: IssueType;
  description: string;
  suggestion: string;
  priority: IssuePriority;
}

export interface AnalysisResult {
  url: string;
  timestamp: string; // ISO string
  scores: AnalysisScore;
  strengths: string[];
  issues: AnalysisIssue[];
  quickWins: string[];
}

export type AnalyzeWebsiteResult =
  | { success: true; data: AnalysisResult }
  | { success: false; error: string };

/**
 * Interfaz común para cualquier proveedor de IA.
 * Permite cambiar de proveedor (Gemini/OpenAI) sin tocar la lógica de negocio.
 */
export interface AIProvider {
  analyze(html: string, url: string): Promise<AnalysisResult>;
}
