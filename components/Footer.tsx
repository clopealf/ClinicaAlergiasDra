// [UPDATED] 2026-03-23 06:47 - Footer: Redes sociales centradas y de mayor tamaño
import React from 'react';
import Image from 'next/image';

export default function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1117] pt-1 pb-12">
      {/* ── Línea decorativa degradado cyan ── */}
      <div
        className="h-px w-full mb-16"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #00B4D8 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* ── Fila principal: logo izquierda, redes centro, contacto derecha ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">

          {/* Columna izquierda: logo real + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              {/* Logo PNG real de la clínica */}
              <Image
                src="/allergomed.png"
                alt="Logo Allergomed - Dra. Raquel Lopez"
                width={44}
                height={44}
                className="rounded-full"
              />

              <span
                className="text-2xl text-white"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                Allergomed
              </span>
            </div>

            <p
              className="text-sm text-[#6B7280] md:ml-[56px] text-center md:text-left"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Tu salud, nuestra misión.
            </p>
          </div>

          {/* Columna central: Redes sociales — iconos de Facebook e Instagram */}
          <div className="flex items-center justify-center gap-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61563906933060"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7280] hover:text-[#00B4D8] transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
              aria-label="Facebook de la clínica"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/dra.raquel.alergias"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7280] hover:text-[#00B4D8] transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
              aria-label="Instagram de la clínica"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>

          {/* Columna derecha: contacto */}
          <div
            className="flex flex-col items-center md:items-end gap-1 text-sm text-[#6B7280]"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <a
              href="https://draraquelalergias.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00B4D8] transition-colors duration-200"
            >
              DraRaquelAlergias.com
            </a>
            <span>San Salvador, El Salvador</span>
            <a
              href="https://wa.me/50374921193"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00B4D8] transition-colors duration-200"
            >
              +503 7492 1193
            </a>
          </div>
        </div>

        {/* ── Separador ── */}
        <div className="h-px bg-white/5 mb-8" aria-hidden="true" />

        {/* ── Copyright ── */}
        <p
          className="text-xs text-[#444] text-center"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          © {currentYear} Allergomed — Dra. Raquel Lopez. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
