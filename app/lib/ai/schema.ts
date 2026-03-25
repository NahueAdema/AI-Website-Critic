import { z } from "zod";

// Schema flexible que normaliza valores antes de validar
const normalizeIssueType = (value: string): string => {
  const lower = value.toLowerCase().trim();

  // Mapeo de variaciones comunes a valores válidos
  const mappings: Record<string, string> = {
    // SEO
    seo: "seo",
    "search engine optimization": "seo",
    search: "seo",
    meta: "seo",
    indexing: "seo",

    // UX
    ux: "ux",
    "user experience": "ux",
    usability: "ux",
    navigation: "ux",
    interaction: "ux",
    layout: "ux",

    // Accessibility
    accessibility: "accessibility",
    a11y: "accessibility",
    wcag: "accessibility",
    "screen reader": "accessibility",

    // Performance
    performance: "performance",
    speed: "performance",
    loading: "performance",
    lcp: "performance",
    fcp: "performance",
    cls: "performance",

    // Contrast
    contrast: "contrast",
    "color contrast": "contrast",
    "text contrast": "contrast",
    readability: "contrast",

    // Content
    content: "content",
    copy: "content",
    text: "content",
    messaging: "content",
    clarity: "content",
  };

  return mappings[lower] || "ux"; // Fallback a 'ux' si no hay match
};

export const AiResponseSchema = z.object({
  scores: z.object({
    ux: z.number().min(0).max(10),
    seo: z.number().min(0).max(10),
    accessibility: z.number().min(0).max(10),
  }),
  strengths: z.array(z.string()),
  issues: z.array(
    z.object({
      // Usamos string + transform para normalizar antes de validar
      type: z
        .string()
        .transform(normalizeIssueType)
        .pipe(
          z.enum([
            "contrast",
            "seo",
            "ux",
            "performance",
            "content",
            "accessibility",
          ]),
        ),
      description: z.string(),
      suggestion: z.string(),
      priority: z
        .string()
        .transform((v) => v.toLowerCase().trim())
        .pipe(z.enum(["high", "medium", "low"])),
    }),
  ),
  quickWins: z.array(z.string()),
});
