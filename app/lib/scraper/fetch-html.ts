/**
 * Obtiene el HTML de una URL de forma segura.
 * - Valida que sea HTTP/HTTPS
 * - Limita el tamaño para no saturar memoria
 * - Extrae solo lo relevante (head + body)
 */
export async function fetchAndCleanHtml(url: string): Promise<string> {
  try {
    // Validación básica de protocolo
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Solo se permiten URLs http/https");
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "AI-Website-Critic/1.0 (Educational Project)",
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    // Limpieza básica: extraer solo head y body para ahorrar tokens
    const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
    const bodyMatch = html.match(/<body[\s\S]*?<\/body>/i);

    const cleanHtml = `
      <!DOCTYPE html>
      <html>
        ${headMatch ? headMatch[0] : ""}
        ${bodyMatch ? bodyMatch[0] : ""}
      </html>
    `;

    // Límite de seguridad: 100KB de HTML (~50k tokens aprox)
    return cleanHtml.slice(0, 100000);
  } catch (error) {
    console.error("[fetchAndCleanHtml]", error);
    throw new Error("No se pudo cargar la web. Verifica la URL.");
  }
}
