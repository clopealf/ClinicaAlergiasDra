// [UPDATED] 2026-03-14 16:35 - tailwind.config.ts minimal para Tailwind v4 (config principal en globals.css @theme)
// En Tailwind v4 la configuración de tema se hace en CSS con @theme, no aquí.
// Este archivo existe para compatibilidad con herramientas del editor.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
