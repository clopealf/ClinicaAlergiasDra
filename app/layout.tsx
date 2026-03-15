// [UPDATED] 2026-03-14 16:35 - Layout raíz: metadatos SEO, fuentes, estructura HTML base
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clinica Alergias | Tus Pruebas Seguras",
  description:
    "Clínica especializada en alergias e inmunología. Pruebas cutáneas, vacunas mensuales y tratamientos personalizados. Consulta sin compromiso en El Salvador.",
  keywords: [
    "alergias",
    "inmunología",
    "pruebas cutáneas",
    "vacunas alergias",
    "clínica El Salvador",
  ],
  openGraph: {
    title: "Clinica Alergias | Tus Pruebas Seguras",
    description:
      "Pruebas cutáneas, vacunas mensuales y tratamientos personalizados para alergias.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
