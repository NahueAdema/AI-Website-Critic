import { AnalysisResult } from "../../types";

export interface AIProvider {
  analyze(html: string, url: string): Promise<AnalysisResult>;
}
