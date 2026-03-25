# 🤖 AI Website Critic

> Analizador inteligente de sitios web con feedback de UX/UI/SEO basado en IA.

## 🎯 ¿Qué hace?

El usuario ingresa una URL y la aplicación:

1. 🔍 Extrae el contenido de la web
2. 🧠 Lo analiza con IA (Gemini)
3. 📊 Devuelve un score + feedback accionable
4. ✨ Sugiere mejoras concretas en formato checklist

## 🧠 Arquitectura

src/
├── app/ # Next.js App Router (Server Components por defecto)
├── actions/ # Server Actions: lógica de mutación separada de la UI
├── lib/ # Utilidades puras y configuraciones
│ ├── ai/ # Cliente Gemin i+ prompts + schemas
│ └── scraper/ # Fetch y limpieza de HTML
├── components/ # Componentes React reutilizables
│ ├── ui/ # Componentes base (Button, Card, etc.)
│ └── analysis/ # Componentes específicos del dominio
└── types/ # Tipos TypeScript compartidos

### Principios de diseño:

- ✅ **TypeScript estricto**: tipos compartidos en `src/types/`
- ✅ **Validación con Zod**: inputs y respuestas de IA siempre validados
- ✅ **Server Actions**: lógica de backend en `src/actions/`, nunca en componentes
- ✅ **IA en el servidor**: llamadas a OpenAI solo desde server-side (seguridad)
- ✅ **Código auto-documentado**: comentarios en lógica compleja, nombres descriptivos

## ▶️ Cómo correr localmente

1. Clonar el repo e instalar dependencias:

   ```bash
   npm install
   ```

2. Configurar variables de entorno:

   ```bash
   cp .env.example .env.local
   # Editar .env.local y agregar tu GEMINI_API_KEY
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) 🎉

## 🤝 Contribuir

Este proyecto está diseñado con fines educativos. ¡Sentite libre de forkear y experimentar!

---

Hecho con ❤️
