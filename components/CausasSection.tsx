// [UPDATED] 2026-03-14 21:14 - Sección Causas comunes de alergias: grid elegante con 6 imágenes + labels
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ─── Datos de las 6 causas ───────────────────────────────────────────────────

interface Causa {
  imagen: string;
  label: string;
  descripcion: string;
}

const CAUSAS: Causa[] = [
  {
    imagen: '/causas/urticaria.webp',
    label: 'Urticaria',
    descripcion: 'Reacciones en la piel que provocan ronchas y picazón intensa.',
  },
  {
    imagen: '/causas/polen.webp',
    label: 'Polen',
    descripcion: 'Partículas de plantas que desencadenan rinitis y estornudos.',
  },
  {
    imagen: '/causas/gatos.webp',
    label: 'Gatos',
    descripcion: 'La caspa y proteínas felinas activan respuestas alérgicas.',
  },
  {
    imagen: '/causas/mascotas.webp',
    label: 'Mascotas',
    descripcion: 'Pelo y saliva de animales pueden causar alergias persistentes.',
  },
  {
    imagen: '/causas/olores.webp',
    label: 'Olores fuertes',
    descripcion: 'Perfumes y químicos irritan las vías respiratorias sensibles.',
  },
  {
    imagen: '/causas/picaduras.webp',
    label: 'Picaduras',
    descripcion: 'Insectos que pueden generar reacciones de leves a severas.',
  },
];

// ─── Variantes animación ─────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
} as const;

// ─── Componente ──────────────────────────────────────────────────────────────

export default function CausasSection(): React.JSX.Element {
  return (
    <section
      id="causas"
      className="bg-[#F8F7F4] py-24 px-6 overflow-hidden"
      aria-labelledby="causas-title"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Encabezado ── */}
        <div className="text-center mb-16">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
            variants={fadeUp}
            className="uppercase tracking-widest text-[#6B7280] mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px' }}
          >
            02 — CONOCE TUS ALERGIAS
          </motion.p>

          <motion.h2
            id="causas-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            variants={fadeUp}
            className="text-[#1A1A2E]"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            Causas comunes.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 h-px w-16 bg-[#00B4D8] origin-left"
            aria-hidden="true"
          />
        </div>

        {/* ── Grid 3×2 de causas ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {CAUSAS.map((causa, i) => (
            <motion.article
              key={causa.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i * 0.08}
              variants={fadeUp}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Imagen */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/2' }}>
                <Image
                  src={causa.imagen}
                  alt={causa.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Overlay gradiente en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Descripción que aparece en hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p
                    className="text-white/90 text-xs leading-relaxed"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {causa.descripcion}
                  </p>
                </div>
              </div>

              {/* Label debajo de la imagen */}
              <div className="p-4 flex items-center gap-3">
                {/* Punto indicador cyan */}
                <div className="w-2 h-2 rounded-full bg-[#00B4D8] flex-shrink-0" aria-hidden="true" />

                <h3
                  className="text-[#1A1A2E] text-sm font-medium"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {causa.label}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
