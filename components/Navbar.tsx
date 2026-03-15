// [UPDATED] 2026-03-14 22:33 - Navbar: Allergomed + Dra Raquel López + Tel. 7492-1193 + Reservar cita
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservar = (): void => {
    // Enlace directo a WhatsApp con número real de la clínica
    window.open('https://wa.me/50374921193?text=Hola,%20quisiera%20reservar%20mi%20consulta', '_blank');
  };

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'flex items-center justify-between px-6 md:px-12 h-16',
        'transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/* ── Izquierda: Logo + nombre ── */}
      <div className="flex items-center gap-3">
        <Image
          src="/allergomed.png"
          alt="Logo Allergomed"
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
        <div className="flex flex-col leading-tight">
          <span
            className={[
              'text-sm font-semibold transition-colors duration-300',
              scrolled ? 'text-[#1A1A2E]' : 'text-white',
            ].join(' ')}
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Allergomed
          </span>
          <span
            className={[
              'text-xs transition-colors duration-300',
              scrolled ? 'text-[#6B7280]' : 'text-white/70',
            ].join(' ')}
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Clinica Alergias
          </span>
        </div>
      </div>

      {/* ── Centro: Dra Raquel López ── */}
      <span
        className={[
          'hidden md:block text-base font-semibold transition-colors duration-300',
          scrolled ? 'text-[#1A1A2E]' : 'text-white',
        ].join(' ')}
        style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
      >
        Dra Raquel López
      </span>

      {/* ── Derecha: Teléfono + botón ── */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Teléfono — enlace WhatsApp */}
        <a
          href="https://wa.me/50374921193"
          target="_blank"
          rel="noopener noreferrer"
          className={[
            'hidden sm:block text-sm font-medium transition-colors duration-300',
            scrolled ? 'text-[#1A1A2E]' : 'text-white',
          ].join(' ')}
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Tel. 7492-1193
        </a>

        {/* Botón CTA */}
        <motion.button
          id="btn-reservar-navbar"
          onClick={handleReservar}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#00B4D8] text-white rounded-full px-6 py-2 text-sm font-medium transition-colors hover:bg-[#0077B6]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
          aria-label="Reservar cita en la clínica"
        >
          Reservar cita
        </motion.button>
      </div>
    </header>
  );
}
