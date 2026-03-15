// [UPDATED] 2026-03-14 21:14 - Hero + Servicios + Tratamientos + CAUSAS + Ubicaciones + CTA + Footer
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroCanvas from '@/components/HeroCanvas';
import Footer from '@/components/Footer';
import ServiciosSection from '@/components/ServiciosSection';
import UbicacionesSection from '@/components/UbicacionesSection';
import CausasSection from '@/components/CausasSection';

// ─── Tipos ─────────────────────────────────────────────────────────────────

interface TreatmentCard {
  icon: React.ReactNode;
  name: string;
  description: string;
  badge: string;
  detail: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

// ─── Datos ─────────────────────────────────────────────────────────────────

const TREATMENTS: TreatmentCard[] = [
  {
    icon: (
      // Icono de alergia / flor estilizada
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="19" stroke="#00B4D8" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="5" fill="#00B4D8" />
        <ellipse cx="20" cy="9" rx="3" ry="5" fill="#00B4D8" opacity="0.3" />
        <ellipse cx="20" cy="31" rx="3" ry="5" fill="#00B4D8" opacity="0.3" />
        <ellipse cx="9" cy="20" rx="5" ry="3" fill="#00B4D8" opacity="0.3" />
        <ellipse cx="31" cy="20" rx="5" ry="3" fill="#00B4D8" opacity="0.3" />
        <ellipse cx="12.5" cy="12.5" rx="3" ry="5" fill="#00B4D8" opacity="0.2" transform="rotate(-45 12.5 12.5)" />
        <ellipse cx="27.5" cy="27.5" rx="3" ry="5" fill="#00B4D8" opacity="0.2" transform="rotate(-45 27.5 27.5)" />
        <ellipse cx="27.5" cy="12.5" rx="3" ry="5" fill="#00B4D8" opacity="0.2" transform="rotate(45 27.5 12.5)" />
        <ellipse cx="12.5" cy="27.5" rx="3" ry="5" fill="#00B4D8" opacity="0.2" transform="rotate(45 12.5 27.5)" />
      </svg>
    ),
    name: 'Alergias',
    description: 'Alivio inmediato, sin dolor.',
    badge: 'Consulta',
    detail: 'Pago efectivo o Transferencia bancaria',
  },
  {
    icon: (
      // Icono de vacuna / jeringa
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="19" stroke="#00B4D8" strokeWidth="1.5" />
        <rect x="10" y="18" width="20" height="4" rx="2" fill="#00B4D8" opacity="0.3" />
        <rect x="17" y="10" width="6" height="20" rx="3" fill="#00B4D8" />
        <rect x="19" y="8" width="2" height="4" rx="1" fill="#0077B6" />
        <rect x="19" y="28" width="2" height="4" rx="1" fill="#0077B6" />
        <circle cx="20" cy="20" r="3" fill="white" />
      </svg>
    ),
    name: 'Vacuna 1 vez al mes',
    description: '1 sola dosis al mes, 0 reacciones alérgicas.',
    badge: 'Vacunas',
    detail: 'Seguimiento mensual garantizado',
  },
  {
    icon: (
      // Icono de prueba cutánea / microscopio simplificado
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="19" stroke="#00B4D8" strokeWidth="1.5" />
        <rect x="18" y="10" width="4" height="14" rx="2" fill="#00B4D8" />
        <rect x="14" y="22" width="12" height="3" rx="1.5" fill="#00B4D8" opacity="0.5" />
        <rect x="17" y="25" width="6" height="5" rx="1" fill="#00B4D8" opacity="0.7" />
        <circle cx="20" cy="14" rx="4" ry="4" r="4" fill="none" stroke="#00B4D8" strokeWidth="1.5" />
        <circle cx="20" cy="14" r="2" fill="#00B4D8" opacity="0.4" />
      </svg>
    ),
    name: 'Pruebas cutáneas',
    description: 'Usamos implementos 100% estériles. Garantía 0 reacciones alérgicas.',
    badge: 'Pruebas cutaneas',
    detail: 'Resultados el mismo día',
  },
];

const STATS: Stat[] = [
  { value: '98%', label: 'Pacientes satisfechos' },
  { value: '+2.400', label: 'Vidas transformadas' },
  { value: '3 años', label: 'De Experiencia Clínica' },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Consulta',
    description: 'Revisión de antecedentes sin compromiso.',
  },
  {
    number: '02',
    title: 'Plan personalizado',
    description: 'Diseñamos tu tratamiento adecuado.',
  },
  {
    number: '03',
    title: 'Tu tratamiento',
    description: 'Comenzamos. Seguimiento total.',
  },
  {
    number: '04',
    title: 'Sin más alergias',
    description: 'Resultado garantizado por escrito.',
  },
];

// ─── Variantes de animación ────────────────────────────────────────────────

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
} as const;

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.7, delay },
  }),
};

// ─── Componente principal ──────────────────────────────────────────────────

export default function HomePage(): React.JSX.Element {
  const handleReservar = (): void => {
    const ctaSection = document.getElementById('reservar-cita');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-[#F8F7F4]">
      {/* ── Navbar fixed ── */}
      <Navbar />

      {/* ── HERO: Animación de fotogramas (700vh) ── */}
      <HeroCanvas />

      {/* ════════════════════════════════════════════
          SECCIÓN: SERVICIOS (después del hero)
      ════════════════════════════════════════════ */}
      <ServiciosSection />

      {/* ════════════════════════════════════════════
          SECCIÓN 1: TRATAMIENTOS
      ════════════════════════════════════════════ */}
      <section
        id="tratamientos"
        className="bg-[#F8F7F4] py-24 px-6"
        aria-labelledby="tratamientos-title"
      >
        <div className="max-w-6xl mx-auto">
          {/* Label de sección */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
            variants={fadeInVariant}
            className="text-[#6B7280] uppercase tracking-widest mb-2"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px' }}
          >
            01 — TRATAMIENTOS
          </motion.p>

          {/* Título principal */}
          <motion.h2
            id="tratamientos-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            variants={fadeUpVariant}
            className="text-[#1A1A2E] mb-16"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            ¿Qué necesitas?
          </motion.h2>

          {/* Grid de 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TREATMENTS.map((card, i) => (
              <motion.article
                key={card.name}
                id={`card-tratamiento-${i + 1}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i * 0.12}
                variants={fadeUpVariant}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-accent hover:shadow-md transition-shadow duration-300"
                aria-labelledby={`card-${i}-name`}
              >
                {/* Icono */}
                <div className="mb-6">{card.icon}</div>

                {/* Nombre */}
                <h3
                  id={`card-${i}-name`}
                  className="text-[#1A1A2E] mb-3"
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '1.4rem',
                  }}
                >
                  {card.name}
                </h3>

                {/* Descripción */}
                <p
                  className="text-[#6B7280] mb-6 leading-relaxed"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem' }}
                >
                  {card.description}
                </p>

                {/* Rótulo enmarcado */}
                <span
                  className="inline-block border-2 border-[#00B4D8] text-[#00B4D8] rounded-full px-5 py-2 font-semibold mb-3"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}
                >
                  {card.badge}
                </span>

                {/* Detalle */}
                <p
                  className="text-[#6B7280]"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem' }}
                >
                  {card.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECCIÓN: CAUSAS COMUNES DE ALERGIAS
      ════════════════════════════════════════════ */}
      <CausasSection />

      {/* ════════════════════════════════════════════
          SECCIÓN: UBICACIONES Y HORARIOS
      ════════════════════════════════════════════ */}
      <UbicacionesSection />

      {/* ════════════════════════════════════════════
          SECCIÓN 4: CTA RESERVAR CITA
      ════════════════════════════════════════════ */}
      <section
        id="reservar-cita"
        className="bg-[#00B4D8] py-32 px-6 text-center"
        aria-labelledby="cta-title"
      >
        <div className="max-w-4xl mx-auto">
          {/* Título grande */}
          <motion.h2
            id="cta-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
            variants={fadeUpVariant}
            className="text-white"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
              lineHeight: 1.05,
            }}
          >
            Primera consulta.
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.15}
            variants={fadeUpVariant}
            className="text-white/80 mt-5 max-w-2xl mx-auto"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 1.65,
            }}
          >
            Sin compromiso. Sin letra pequeña. Te mostramos el resultado antes de empezar.
          </motion.p>

          {/* Botón CTA */}
          <motion.button
            id="btn-reservar-cita"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.3}
            variants={fadeUpVariant}
            whileHover={{ backgroundColor: '#0D1117', color: '#ffffff' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              // Abrir modal o redirigir a whatsapp/formulario
              // Enlace directo a WhatsApp con número real de la clínica
              window.open('https://wa.me/50374921193?text=Hola,%20quisiera%20reservar%20mi%20consulta', '_blank');
            }}
            className="mt-10 bg-white text-[#00B4D8] rounded-full px-10 py-4 font-semibold text-lg inline-block cursor-pointer transition-colors duration-300"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            aria-label="Reservar consulta inicial en la clínica"
          >
            Reservar mi consulta
          </motion.button>




          {/* Mensaje de confirmación de cita */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.5}
            variants={fadeInVariant}
            className="text-[#0D1117] mt-4 font-semibold max-w-lg mx-auto"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 1.4,
            }}
          >
            Confirma tu cita, te llamaremos 2 días antes de fecha para recordarte.
          </motion.p>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
