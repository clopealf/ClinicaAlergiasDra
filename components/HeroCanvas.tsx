// [UPDATED] 2026-03-14 22:29 - HeroCanvas: reducido a 5 fotogramas clave para deploy ligero
// Canvas sticky con scroll-driven frame animation + overlay de título con fade
'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from 'framer-motion';

// Fotogramas clave seleccionados de la secuencia original
const FRAME_FILES = ['1.jpg', '25.jpg', '50.jpg', '75.jpg', '125.jpg'];
const TOTAL_FRAMES = FRAME_FILES.length;

export default function HeroCanvas(): React.JSX.Element {
  // Ref al contenedor externo (700vh) — permite que useScroll calcule el progreso
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref al div sticky interno (100vh) — usado para resize observer
  const stickyRef = useRef<HTMLDivElement>(null);
  // Ref al canvas donde se renderizan los fotogramas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Array de imágenes precargadas
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // Índice del fotograma actual para redraw en resize
  const currentFrameRef = useRef<number>(0);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  // ─── useScroll vinculado al contenedor de 700vh ───────────────────────────
  // offset ["start start", "end end"] significa:
  //   - progreso 0 cuando el top del container toca el top del viewport
  //   - progreso 1 cuando el bottom del container toca el bottom del viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ─── Mapeo de progreso de scroll → índice de fotograma ───────────────────
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // ─── Opacidad del título: visible al inicio, desvanece en progreso 0→0.12 ─
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // ─── Función principal de renderizado de fotograma en canvas ─────────────
  const drawFrame = useCallback((index: number): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[index];
    // Guard: imagen debe estar completamente cargada
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Limpiar canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ── Contain fit centrado (preserva aspect ratio del frame) ──
    const scale = Math.min(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);

    // ── Vignette overlay radial para profundidad cinematográfica ──
    const grad = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height) * 0.7
    );
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // ─── Precarga de las 120 imágenes al montar el componente ────────────────
  useEffect(() => {
    let mounted = true;
    let loaded = 0;

    // Crear array de imágenes e iniciar precarga paralela
    const imgs: HTMLImageElement[] = Array.from(
      { length: TOTAL_FRAMES },
      (_, i) => {
        const img = new Image();
        img.src = `/frames/${FRAME_FILES[i]}`;

        img.onload = () => {
          if (!mounted) return;
          loaded += 1;
          setLoadedCount(loaded);

          // Dibujar primer fotograma en cuanto esté disponible
          if (i === 0) {
            drawFrame(0);
          }
          // Marcar como completado cuando cargan todos
          if (loaded === TOTAL_FRAMES) {
            setAllLoaded(true);
            drawFrame(currentFrameRef.current);
          }
        };

        img.onerror = () => {
          if (!mounted) return;
          loaded += 1;
          setLoadedCount(loaded);
          if (loaded === TOTAL_FRAMES) {
            setAllLoaded(true);
          }
        };

        return img;
      }
    );

    imagesRef.current = imgs;

    return () => {
      mounted = false;
    };
  }, [drawFrame]);

  // ─── ResizeObserver: ajusta canvas y redibuja al cambiar tamaño ──────────
  useEffect(() => {
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!sticky || !canvas) return;

    const observer = new ResizeObserver(() => {
      canvas.width = sticky.offsetWidth;
      canvas.height = sticky.offsetHeight;
      // Redibujar el fotograma actual después del resize
      drawFrame(currentFrameRef.current);
    });

    observer.observe(sticky);

    // Dimensiones iniciales
    canvas.width = sticky.offsetWidth;
    canvas.height = sticky.offsetHeight;

    return () => observer.disconnect();
  }, [drawFrame]);

  // ─── Escuchar cambios en frameIndex y renderizar el fotograma ────────────
  useMotionValueEvent(frameIndex, 'change', (v: number) => {
    const idx = Math.min(Math.max(Math.round(v), 0), TOTAL_FRAMES - 1);
    currentFrameRef.current = idx;
    drawFrame(idx);
  });

  // Porcentaje de carga para la barra de progreso
  const loadPercent = (loadedCount / TOTAL_FRAMES) * 100;

  return (
    // Contenedor externo de 700vh — consume scroll de manera sticky
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      
      {/* Div sticky: permanece fijo mientras el usuario desplaza los 700vh */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#0D1117]"
      >
        {/* Canvas: cubre todo el contenedor sticky */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-label="Animación de fotogramas de la clínica"
        />

        {/* ── Title overlay: se desvanece con el scroll ── */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          {/* Etiqueta superior */}
          <span
            className="text-[#00B4D8] uppercase tracking-widest mb-6"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px' }}
          >
            CLÍNICA ALERGIAS E INMUNOLOGÍA
          </span>

          {/* Título principal con text-shadow */}
          <h1
            className="text-white text-center max-w-4xl text-shadow-hero"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 1.1,
              fontWeight: 700,
            }}
          >
            Tu mejoría en alergias empieza aquí.
          </h1>

          {/* Subtítulo */}
          <p
            className="text-white/70 text-center mt-5"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            Pruebas cutáneas&nbsp;·&nbsp;Vacunas mensuales&nbsp;·&nbsp;Tratamientos
          </p>

          {/* Scroll indicator con bounce */}
          <p
            className="absolute bottom-8 animate-bounce text-white/40"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}
          >
            Scroll para descubrir ↓
          </p>
        </motion.div>

        {/* ── Barra de carga de fotogramas (desaparece cuando carga completa) ── */}
        {!allLoaded && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              className="h-full bg-[#00B4D8] transition-all duration-300"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
