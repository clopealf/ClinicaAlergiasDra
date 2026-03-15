// [UPDATED] 2026-03-15 08:26 - componentes/HeroCanvas.tsx transformado a carrusel automático con 3 imágenes.
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = ['/frames/Foto1.png', '/frames/Foto2.png', '/frames/Foto3.png'];
const INTERVAL = 5000; // Cambiar cada 5 segundos

export default function HeroCanvas(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Seleccionar foto aleatoria al inicio
  useEffect(() => {
    const randomStart = Math.floor(Math.random() * IMAGES.length);
    setCurrentIndex(randomStart);
  }, []);

  // Intervalo para cambiar de foto automáticamente
  useEffect(() => {
    if (currentIndex === null) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex! + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Si aún no estamos en el cliente, devolver renderizado estático del esqueleto (SSR/SSG safe)
  if (currentIndex === null) {
     return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0D1117]">
            <div className="absolute inset-0 bg-[#0D1117] animate-pulse" />
        </section>
     );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0D1117]" aria-label="Hero Carrusel">
      
      {/* ── Carrusel de Imágenes ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={IMAGES[currentIndex]}
            alt={`Fotografía clínica ${currentIndex + 1}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlay Oscuro / Degradado ── */}
      <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-[#0D1117]/90 via-[#0D1117]/20 to-[#0D1117]/40 pointer-events-none" />

      {/* ── Textos Superiores (Bajo NavBar) ── */}
      <div className="absolute inset-x-0 top-32 md:top-40 flex flex-col items-center text-center px-6 z-10 pointer-events-none">
        {/* Etiqueta superior */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[#00B4D8] uppercase tracking-widest mb-6 font-semibold shadow-black drop-shadow-md"
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px' }}
        >
          CLÍNICA ALERGIAS E INMUNOLOGÍA
        </motion.span>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white max-w-4xl text-shadow-hero"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            lineHeight: 1.1,
            fontWeight: 700,
          }}
        >
          Tu mejoría en alergias empieza aquí.
        </motion.h1>
      </div>

      {/* ── Textos Inferiores y CTA ── */}
      <div className="absolute inset-x-0 bottom-44 flex flex-col items-center text-center px-6 z-10 pointer-events-none">
        
        {/* Subtítulo */}
        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
          className="text-white/90 font-medium drop-shadow-md"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          }}
        >
          Pruebas cutáneas&nbsp;·&nbsp;Vacunas mensuales&nbsp;·&nbsp;Tratamientos
        </motion.p>
        
        {/* Call to action Botón */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 1.1 }}
           className="mt-6 pointer-events-auto"
        >
            <button 
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#00B4D8] text-white px-8 py-3.5 rounded-full hover:bg-white hover:text-[#00B4D8] transition-colors duration-300 font-medium shadow-lg hover:shadow-[#00B4D8]/20"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
                aria-label="Conoce más sobre nuestros servicios"
            >
                Conoce más
            </button>
        </motion.div>
      </div>

      {/* Scroll indicator con bounce */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 1.5 }}
         className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
         onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold drop-shadow" style={{ fontFamily: 'DM Sans, sans-serif' }}>Descubrir</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#00B4D8] to-transparent" />
      </motion.div>

      {/* ── Indicadores del carrusel ── */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-10 pointer-events-auto">
         {IMAGES.map((_, idx) => (
             <button
               key={idx}
               aria-label={`Ir a la foto ${idx + 1}`}
               onClick={() => setCurrentIndex(idx)}
               className={`h-[3px] rounded-full transition-all duration-500 ${
                 currentIndex === idx ? 'w-10 bg-[#00B4D8]' : 'w-4 bg-white/40 hover:bg-white/80'
               }`}
             />
         ))}
      </div>
    </section>
  );
}
