// src/components/institucional/MobileAutoridadesAccordion.tsx
'use client';

import { useAppContext } from '@/context/AppContext';
import { ChevronRight, Download } from 'lucide-react';
import React, { useState } from 'react';
import TeamListCard from './TeamListCard';

const FILTERS = ['Directorio', 'Nuestro equipo'];

export const MobileAutoridadesAccordion: React.FC = () => {
  const { institucionalData } = useAppContext();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!institucionalData) return null;

  // Busca un área por nombre exacto
  const getArea = (name: string) =>
    Array.isArray(institucionalData.area_team_bursatils)
      ? institucionalData.area_team_bursatils.find((a) => a.name === name)
      : undefined;


  return (
    <div className="space-y-2 font-encode-sans px-2">
      {FILTERS.map((filter, idx) => {
        const isOpen = openIndex === idx;
        let content: React.ReactNode = null;

        if (filter === 'Directorio') {
          // Sacamos solo los nombres, sin imagenes
          const presName = institucionalData.presidente?.name
            ? [institucionalData.presidente.name]
            : [];
          const viceName = institucionalData.vicepresidente?.name
            ? [institucionalData.vicepresidente.name]
            : [];

          content = (
            <div className="space-y-6">
              {presName.length > 0 && (
                <div className="flex justify-center">
                  <div className="w-[286px]">
                    <TeamListCard title="" names={presName} />
                  </div>
                </div>
              )}
              {viceName.length > 0 && (
                <div className="flex justify-center">
                  <div className="w-[286px]">
                    <TeamListCard title="" names={viceName} />
                  </div>
                </div>
              )}
            </div>
          );
        } else {
          // “Nuestro equipo”: CABA y La Plata
          const cabaArea = getArea('CABA');
          const laplataArea = getArea('La Plata');

          content = (
            <div className="space-y-8">
              {cabaArea && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">CABA</h3>
                  <div className="space-y-4">
                    {cabaArea.member_team_bursatil.map((m) => (
                      <div key={m.id} className="flex justify-center">
                        <div className="w-[286px]">
                          <TeamListCard title="" names={[m.name]} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {laplataArea && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">
                    La Plata
                  </h3>
                  <div className="space-y-4">
                    {laplataArea.member_team_bursatil.map((m) => (
                      <div key={m.id} className="flex justify-center">
                        <div className="w-[286px]">
                          <TeamListCard title="" names={[m.name]} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!cabaArea && !laplataArea && (
                <div className="p-4 text-center text-gray-500">
                  Información de nuestro equipo no disponible
                </div>
              )}
            </div>
          );
        }

        return (
          <div key={filter} className="border-t border-b border-gray-200">
            <button
              className="w-full text-left py-4 flex justify-between items-center"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span
                className={`text-lg ${isOpen ? 'text-[#005A63] font-semibold' : 'text-gray-500'
                  }`}
              >
                {filter}
              </span>
              <ChevronRight
                className={`${isOpen ? 'text-[#005A63] rotate-90' : 'text-gray-400'
                  } transition-transform`}
                size={24}
              />
            </button>
            {isOpen && <div className="py-4">{content}</div>}
          </div>
        );
      })}

      {/* Enlace al PDF */}
      <a
        href="https://www.provinciafondos.com.ar/descargas/CodEtica_Conducta_empresarial_PF_V10.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 mt-8 text-[#005A63] px-2 py-4"
      >
        <Download size={24} className="text-[#005A63]" />
        <span className="font-medium">
          Código de comportamiento empresarial
        </span>
      </a>
    </div>
  );
};

export default MobileAutoridadesAccordion;
