"use server";

import { z } from "zod";

/**
 * Schema para validar URLs ingresadas por el usuario.
 * Se usa tanto en el cliente como en el servidor.
 */
const UrlSchema = z
  .string()
  .url("Ingresa una URL válida (ej: https://ejemplo.com)");

/**
 * Valida que la URL sea accesible y segura.
 * - Solo HTTP/HTTPS
 * - No localhost en producción
 * - Longitud razonable
 */
export async function validateUrl(url: string): Promise<{
  valid: boolean;
  error?: string;
}> {
  try {
    // 1. Validar formato con Zod
    UrlSchema.parse(url);

    // 2. Validar protocolo
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, error: "Solo se permiten URLs http/https" };
    }

    // 3. Prevenir localhost en producción
    if (process.env.NODE_ENV === "production") {
      if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
        return {
          valid: false,
          error: "No se permiten URLs locales en producción",
        };
      }
    }

    // 4. Longitud máxima razonable
    if (url.length > 2048) {
      return { valid: false, error: "La URL es demasiado larga" };
    }

    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.issues[0].message };
    }
    return { valid: false, error: "URL inválida" };
  }
}
