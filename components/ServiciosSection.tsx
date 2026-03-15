// [UPDATED] 2026-03-14 21:46 - Sección Servicios: espaciado compacto entre imágenes y descripciones
// Insertada entre HeroCanvas y Tratamientos, diseño inspirado en referencia del cliente
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Servicio {
  numero: string;
  imagen: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
}

// ─── Datos de los 3 servicios ─────────────────────────────────────────────────

const SERVICIOS: Servicio[] = [
  {
    numero: '01',
    imagen: '/servicios/consulta.png',
    titulo: 'Consulta por alergias niños y adultos.',
    subtitulo: 'Consulta niños y adultos',
    descripcion:
      'Se centra en evitar el alérgeno, usar medicamentos (antihistamínicos, aerosoles nasales) y, en casos graves, la epinefrina, con diferencias en dosis y enfoque, pero la base es la misma: diagnóstico médico y manejo a largo plazo, incluyendo inmunoterapia (vacunas) para ciertos tipos de alergias, siempre bajo supervisión médica.',
  },
  {
    numero: '02',
    imagen: '/servicios/pruebas.png',
    titulo: 'Pruebas de alergia. ¿Qué son?',
    subtitulo: 'Pruebas de alergias',
    descripcion:
      'Método rápido, seguro y eficaz que nos permite identificar sustancias (alérgenos) que causan reacciones, usando métodos como la prueba de punción cutánea, análisis de sangre (niveles de IgE) y la prueba de parche o provocación oral (bajo supervisión médica) para diagnosticar alergias a alimentos, polen, mascotas, etc., y guiar el tratamiento.',
  },
  {
    numero: '03',
    imagen: '/servicios/desensibilizacion.png',
    titulo: 'Desensibilidad a medicamentos.',
    subtitulo: 'Desensibilidad medicamentos',
    descripcion:
      'Es un procedimiento médico que permite a pacientes alérgicos recibir un fármaco esencial administrando dosis muy pequeñas y crecientes de manera controlada, «engañando» al sistema inmune para que no se desencadene una reacción alérgica grave, creando una tolerancia temporal para un tratamiento necesario como quimioterapia o aspirina. Se realiza en entorno hospitalario bajo supervisión experta.',
  },
];

// ─── Variantes de animación ───────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Componente ───────────────────────────────────────────────────────────────

export default function ServiciosSection(): React.JSX.Element {
  return (
    <section
      id="servicios"
      className="bg-[#F8F7F4] py-24 px-6 overflow-hidden"
      aria-labelledby="servicios-title"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Encabezado de sección ── */}
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
            00 — SERVICIOS
          </motion.p>

          <motion.h2
            id="servicios-title"
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
            Servicios.
          </motion.h2>

          {/* Línea decorativa bajo el título */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 h-px w-16 bg-[#00B4D8] origin-left"
            aria-hidden="true"
          />
        </div>

        {/* ── Grid de imágenes + caption ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {SERVICIOS.map((srv, i) => (
            <motion.div
              key={srv.numero}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i * 0.14}
              variants={fadeUp}
              className="group flex flex-col"
            >
              {/* Imagen con hover zoom */}
              <div className="relative w-full overflow-hidden rounded-2xl"
                   style={{ aspectRatio: '4/3' }}>
                <Image
                  src={srv.imagen}
                  alt={srv.subtitulo}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-[#00B4D8]/0 group-hover:bg-[#00B4D8]/10 transition-colors duration-500 rounded-2xl" />
                {/* Badge número */}
                <div
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
                >
                  <span
                    className="text-[#00B4D8] font-semibold"
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}
                  >
                    {srv.numero}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <p
                className="mt-3 text-center text-[#6B7280]"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}
              >
                {srv.numero}. {srv.subtitulo}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Separador ── */}
        <div className="h-px bg-gray-200 mb-8" aria-hidden="true" />

        {/* ── Grid de descripciones detalladas ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {SERVICIOS.map((srv, i) => (
            <motion.article
              key={`desc-${srv.numero}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i * 0.14}
              variants={fadeUp}
            >
              {/* Número grande translúcido */}
              <span
                className="block text-[#00B4D8] leading-none mb-3"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '3.5rem',
                  opacity: 0.2,
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {srv.numero}
              </span>

              {/* Línea decorativa */}
              <div className="w-8 h-[3px] bg-[#00B4D8] mb-5 rounded-full" aria-hidden="true" />

              {/* Título del servicio */}
              <h3
                className="text-[#1A1A2E] mb-4"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  lineHeight: 1.25,
                  fontWeight: 700,
                }}
              >
                {srv.titulo}
              </h3>

              {/* Descripción */}
              <p
                className="text-[#6B7280] leading-relaxed"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}
              >
                {srv.descripcion}
              </p>

              {/* CTA link sutil */}
              <button
                className="mt-6 text-[#00B4D8] font-medium flex items-center gap-2 hover:gap-3 transition-all duration-200 group/link"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem' }}
                onClick={() => {
                  document.getElementById('reservar-cita')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label={`Reservar cita para ${srv.subtitulo}`}
              >
                <span>Consultar →</span>
              </button>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
