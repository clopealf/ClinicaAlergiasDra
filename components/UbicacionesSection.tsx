// [UPDATED] 2026-03-14 21:00 - Sección Ubicaciones: 2 sedes con mapas Google y horarios elegantes premium
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Horario {
  dia: string;
  horas: string;
  disponible: boolean;
}

interface Sede {
  id: string;
  nombre: string;
  subtitulo: string;
  direccion: string;
  referencia: string;
  mapUrl: string;
  googleMapsLink: string;
  horarios: Horario[];
}

// ─── Datos de las 2 sedes ────────────────────────────────────────────────────

const SEDES: Sede[] = [
  {
    id: 'san-salvador',
    nombre: 'San Salvador',
    subtitulo: 'CIRMA — Centro de Inmunología y Reumatología',
    direccion: '21 Calle Poniente #1126, San Salvador',
    referencia: 'Entre la 29 y 31 Avenida Norte',
    // Embed URL real de Google Maps para la sede San Salvador
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0!2d-89.21!3d13.70!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633067e22e13e7%3A0xa2252b031a29ede6!2sAlergo%CC%81logos%20El%20Salvador.%20Dra%20Raquel%20Lo%CC%81pez.%20Allergomed.%20Cli%CC%81nica%20de%20alergias!5e0!3m2!1ses!2ssv!4v1710000000000!5m2!1ses!2ssv',
    googleMapsLink:
      'https://www.google.com/maps/place/Alerg%C3%B3logos+El+Salvador.+Dra+Raquel+L%C3%B3pez.+Allergomed.+Cl%C3%ADnica+de+alergias/',
    horarios: [
      { dia: 'Lunes', horas: '4:00 PM – 6:00 PM', disponible: true },
      { dia: 'Martes', horas: '4:00 PM – 6:00 PM', disponible: true },
      { dia: 'Miércoles', horas: '4:00 PM – 6:00 PM', disponible: true },
      { dia: 'Jueves', horas: '4:00 PM – 6:00 PM', disponible: true },
      { dia: 'Viernes', horas: '4:00 PM – 6:00 PM', disponible: true },
      { dia: 'Sábado', horas: '7:00 AM – 12:00 PM', disponible: true },
      { dia: 'Domingo', horas: 'Cerrado', disponible: false },
    ],
  },
  {
    id: 'santa-tecla',
    nombre: 'Santa Tecla',
    subtitulo: 'LABPLUS — Laboratorio Clínico',
    direccion: 'Polígono E-2, 9a Calle Poniente #21, Santa Tecla',
    referencia: 'Junto a Panadería Liliam',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0!2d-89.28!3d13.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6331c5f9dbcb61%3A0x2a9fd0393f6258a9!2sLABPLUS%20Laboratorio%20Cl%C3%ADnico!5e0!3m2!1ses!2ssv!4v1710000000000!5m2!1ses!2ssv',
    googleMapsLink:
      'https://www.google.com/maps/place/LABPLUS+Laboratorio+Cl%C3%ADnico/',
    horarios: [
      { dia: 'Lunes', horas: '—', disponible: false },
      { dia: 'Martes', horas: '—', disponible: false },
      { dia: 'Miércoles', horas: '—', disponible: false },
      { dia: 'Jueves', horas: '4:00 PM – 6:00 PM', disponible: true },
      { dia: 'Viernes', horas: '—', disponible: false },
      { dia: 'Sábado', horas: '2:00 PM – 6:00 PM', disponible: true },
      { dia: 'Domingo', horas: 'Cerrado', disponible: false },
    ],
  },
];

// ─── Variantes de animación ───────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
} as const;

// ─── Componente ───────────────────────────────────────────────────────────────

export default function UbicacionesSection(): React.JSX.Element {
  const [activeSede, setActiveSede] = useState<number>(0);
  const sede = SEDES[activeSede];

  return (
    <section
      id="ubicaciones"
      className="bg-[#0D1117] py-24 px-6 overflow-hidden"
      aria-labelledby="ubicaciones-title"
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
            03 — UBICACIONES
          </motion.p>

          <motion.h2
            id="ubicaciones-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            variants={fadeUp}
            className="text-white"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            Encuéntranos.
          </motion.h2>

          {/* Línea decorativa */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 h-px w-16 bg-[#00B4D8] origin-left"
            aria-hidden="true"
          />
        </div>

        {/* ── Tabs de sede ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
          variants={fadeUp}
          className="flex justify-center gap-2 mb-12"
        >
          {SEDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveSede(i)}
              className={[
                'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
                activeSede === i
                  ? 'bg-[#00B4D8] text-white shadow-lg shadow-[#00B4D8]/20'
                  : 'bg-white/5 text-[#6B7280] hover:bg-white/10 hover:text-white/80',
              ].join(' ')}
              style={{ fontFamily: 'DM Sans, sans-serif' }}
              aria-label={`Ver sede ${s.nombre}`}
            >
              <span className="flex items-center gap-2">
                {/* Ícono de ubicación sutil */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {s.nombre}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Contenido de la sede activa ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sede.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >

            {/* ── Columna izquierda: Mapa ── */}
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              {/* Mapa de Google embebido */}
              <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                <iframe
                  src={sede.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de sede ${sede.nombre}`}
                />
              </div>

              {/* Info debajo del mapa */}
              <div className="p-6">
                <h3
                  className="text-white text-lg mb-1"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {sede.subtitulo}
                </h3>
                <p
                  className="text-[#6B7280] text-sm mb-1"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {sede.direccion}
                </p>
                <p
                  className="text-[#6B7280] text-xs italic"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {sede.referencia}
                </p>

                {/* Botón para abrir en Google Maps */}
                <a
                  href={sede.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-[#00B4D8] text-sm font-medium hover:text-white transition-colors duration-200"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Abrir en Google Maps
                </a>
              </div>
            </div>

            {/* ── Columna derecha: Horarios ── */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 flex flex-col">
              {/* Título de horarios */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-white text-lg"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    Horarios
                  </h3>
                  <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Sede {sede.nombre}
                  </p>
                </div>
              </div>

              {/* Lista de horarios — diseño minimalista premium */}
              <div className="flex-1 flex flex-col justify-center">
                {sede.horarios.map((h, i) => (
                  <div
                    key={h.dia}
                    className={[
                      'flex items-center justify-between py-4 px-4 rounded-lg transition-colors duration-150',
                      i % 2 === 0 ? 'bg-white/[0.02]' : '',
                      !h.disponible ? 'opacity-40' : '',
                    ].join(' ')}
                  >
                    {/* Día */}
                    <div className="flex items-center gap-3">
                      {/* Indicador de disponibilidad */}
                      <div
                        className={[
                          'w-1.5 h-1.5 rounded-full',
                          h.disponible && h.horas !== 'Cerrado'
                            ? 'bg-[#00B4D8]'
                            : 'bg-white/20',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                      <span
                        className="text-white/80 text-sm"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {h.dia}
                      </span>
                    </div>

                    {/* Horas */}
                    <span
                      className={[
                        'text-sm font-medium',
                        h.disponible && h.horas !== 'Cerrado'
                          ? 'text-[#00B4D8]'
                          : 'text-white/30',
                      ].join(' ')}
                      style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}
                    >
                      {h.horas}
                    </span>
                  </div>
                ))}
              </div>

              {/* Nota CTA */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <a
                  href="https://wa.me/50374921193?text=Hola,%20quisiera%20agendar%20una%20cita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#00B4D8] hover:bg-[#0077B6] text-white rounded-full py-3 px-6 text-sm font-medium transition-colors duration-200"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {/* Ícono WhatsApp */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Agendar cita — {sede.nombre}
                </a>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
