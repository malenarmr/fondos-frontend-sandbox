// src/components/institucional/MobileAutoridadesAccordion.tsx
'use client';

import { useAppContext } from '@/context/AppContext';
import {
  ChevronRight as Caret,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';
import TeamListCard from './TeamListCard';

export const MobileAutoridadesAccordion: React.FC = () => {
  const { institucionalData } = useAppContext();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // ⚠️ NADA de early return antes de hooks

  const conductFile = institucionalData?.code_of_conduct?.[0];

  // Mismos filtros que desktop (con fallbacks)
  const filters: string[] = useMemo(() => {
    const base = ['Directorio'];
    const areas =
      institucionalData?.area_team_fondos
        ?.filter((a: { name: string }) => {
          const name = (a?.name || '').toLowerCase();
          return (
            name !== 'directores titulares' && name !== 'síndicos titulares'
          );
        })
        .map((a: { name: string }) => a.name) ?? [];
    return [...base, ...areas];
  }, [institucionalData]);

  const getArea = (name: string) =>
    institucionalData?.area_team_fondos?.find(
      (a: { name: string }) => a.name === name
    );

  /**
   * Carrusel genérico para N items (>=2 muestra flechas).
   * - Flechas: círculos bg-white/80, mitad dentro / mitad fuera.
   * - Swipe en mobile.
   */
  const Carousel: React.FC<{ items: React.ReactNode[] }> = ({ items }) => {
    const [idx, setIdx] = useState(0);
    const startX = useRef<number | null>(null);
    const deltaX = useRef<number>(0);

    if (items.length === 0) return null;

    const next = () => setIdx((p) => (p + 1) % items.length);
    const prev = () => setIdx((p) => (p - 1 + items.length) % items.length);

    const onTouchStart = (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
      deltaX.current = 0;
    };
    const onTouchMove = (e: React.TouchEvent) => {
      if (startX.current === null) return;
      deltaX.current = e.touches[0].clientX - startX.current;
    };
    const onTouchEnd = () => {
      const threshold = 40;
      if (deltaX.current > threshold) prev();
      else if (deltaX.current < -threshold) next();
      startX.current = null;
      deltaX.current = 0;
    };

    return (
      <div className="relative mx-auto max-w-[92%]">
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {items.map((node, i) => (
              <div key={i} className="w-full flex-shrink-0">
                {/* padding para que las flechas no pisen contenido */}
                <div className="px-12">{node}</div>
              </div>
            ))}
          </div>
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2
                         w-16 h-16 rounded-full bg-white/80 flex items-center justify-center
                         active:scale-95 shadow-sm"
            >
              <ChevronLeft size={28} className="text-[#005A63]" />
            </button>

            <button
              onClick={next}
              aria-label="Siguiente"
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2
                         w-16 h-16 rounded-full bg-white/80 flex items-center justify-center
                         active:scale-95 shadow-sm"
            >
              <ChevronRight size={28} className="text-[#005A63]" />
            </button>
          </>
        )}
      </div>
    );
  };

  const renderDirectorio = () => {
    const items: React.ReactNode[] = [];

    const presName = institucionalData?.presidente?.name;
    const presRole = institucionalData?.presidente?.role;
    if (presName) {
      items.push(
        <div key="pres" className="flex justify-center">
          <div className="w-[286px]">
            <TeamListCard names={[presName]} subtitle={presRole} />
          </div>
        </div>
      );
    }

    const viceName = institucionalData?.vicepresidente?.name;
    const viceRole = institucionalData?.vicepresidente?.role;
    if (viceName) {
      items.push(
        <div key="vice" className="flex justify-center">
          <div className="w-[286px]">
            <TeamListCard names={[viceName]} subtitle={viceRole} />
          </div>
        </div>
      );
    }

    if (items.length >= 2) return <Carousel items={items} />;
    return <div className="space-y-6">{items}</div>;
  };

  const renderArea = (areaName: string) => {
    const area = getArea(areaName);
    if (!area)
      return (
        <div className="p-4 text-center text-gray-500">Área no disponible</div>
      );

    const items =
      area.member_team_fondos?.map((m: any) => (
        <div key={m.id} className="flex justify-center">
          <div className="w-[286px]">
            <TeamListCard names={[m.name]} subtitle={m.rol} />
          </div>
        </div>
      )) ?? [];

    if (items.length === 0)
      return (
        <div className="p-4 text-center text-gray-500">
          No hay integrantes disponibles en {area.name}
        </div>
      );

    return items.length >= 2 ? (
      <Carousel items={items} />
    ) : (
      <div className="space-y-4">{items}</div>
    );
  };

  return (
    <div className="space-y-2 font-encode-sans px-2">
      {filters.length === 0 ? (
        // Si aún no hay data, mostramos nada o un placeholder suave
        <div className="p-4 text-center text-gray-400 text-sm">
          Cargando información…
        </div>
      ) : (
        filters.map((filter, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={filter} className="border-t border-b border-gray-200">
              <button
                className="w-full text-left py-4 flex justify-between items-center"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <span
                  className={`text-lg ${
                    isOpen ? 'text-[#005A63] font-semibold' : 'text-gray-500'
                  }`}
                >
                  {filter}
                </span>
                <Caret
                  className={`${
                    isOpen ? 'text-[#005A63] rotate-90' : 'text-gray-400'
                  } transition-transform`}
                  size={24}
                />
              </button>

              {isOpen && (
                <div className="py-4">
                  {filter === 'Directorio'
                    ? renderDirectorio()
                    : renderArea(filter)}
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Enlace al PDF */}
      {(conductFile?.url ||
        'https://www.provinciafondos.com.ar/descargas/CodEtica_Conducta_empresarial_PF_V10.pdf') && (
        <a
          href={
            conductFile?.url ??
            'https://www.provinciafondos.com.ar/descargas/CodEtica_Conducta_empresarial_PF_V10.pdf'
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mt-8 text-[#005A63] px-2 py-4"
        >
          <Download size={24} className="text-[#005A63]" />
          <span className="font-medium">
            Código de comportamiento empresarial
          </span>
        </a>
      )}
    </div>
  );
};

export default MobileAutoridadesAccordion;
