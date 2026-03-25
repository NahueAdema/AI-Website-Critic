import { z } from "zod";

export const AiResponseSchema = z.object({
  scores: z.object({
    ux: z.number().min(0).max(10),
    seo: z.number().min(0).max(10),
    accessibility: z.number().min(0).max(10),
  }),
  strengths: z.array(z.string()),
  issues: z.array(
    z.object({
      type: z.enum([
        "contrast",
        "seo",
        "ux",
        "performance",
        "content",
        "accessibility",
      ]),
      description: z.string(),
      suggestion: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    }),
  ),
  quickWins: z.array(z.string()),
});
