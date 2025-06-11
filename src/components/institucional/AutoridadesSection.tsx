// src/components/institucional/AutoridadesSection.tsx
'use client';

import { useAppContext } from '@/context/AppContext';
import { ChevronRight, Download } from 'lucide-react';
import { useState } from 'react';
import PersonCard from './PersonCard';

export default function AutoridadesSection() {
  const filters = ['Directorio', 'Nuestro equipo'];
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const { institucionalData } = useAppContext();

  if (!institucionalData) return null;

  // Primer PDF de code_of_conduct
  const conductFile = institucionalData.code_of_conduct[0];

  const getArea = (name: string) =>
    institucionalData.area_team_bursatils.find((a) => a.name === name);

  const renderTeamMemberCard = (member: any) => (
    <div
      key={member.id}
      className="bg-primary-light text-white font-encode-sans font-semibold text-center
                 px-6 py-6 rounded-[12px] w-full max-w-xs min-h-[120px]
                 flex flex-col justify-center mx-auto"
      // agregamos mx-auto para centrar en mobile
    >
      <div className="text-[18px] mb-2">{member.name}</div>
      {member.rol && (
        <div className="text-[14px] font-normal opacity-90">{member.rol}</div>
      )}
    </div>
  );

  const renderTeamByArea = () => {
    const cabaArea = getArea('CABA');
    const laplataArea = getArea('La Plata');

    return (
      <div className="col-span-2 space-y-12">
        {/* CABA Section */}
        {cabaArea && (
          <div>
            <h3 className="text-2xl font-bold mb-8 text-secondary">CABA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cabaArea.member_team_bursatil.map((member) =>
                renderTeamMemberCard(member)
              )}
            </div>
          </div>
        )}

        {/* La Plata Section */}
        {laplataArea && (
          <div>
            <h3 className="text-2xl font-bold mb-8 text-secondary">La Plata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {laplataArea.member_team_bursatil.map((member) =>
                renderTeamMemberCard(member)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="mt-32 mb-32 font-encode-sans">
      <h2 className="text-3xl font-bold mb-12 text-center text-primary">
        {selectedFilter === 'Nuestro equipo' ? 'Nuestro equipo' : 'Autoridades'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {/* columna de filtros + PDF */}
        <div className="flex flex-col">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className="w-full text-left border-t border-b border-gray-200 py-4 px-2 flex justify-between items-center"
            >
              <span
                className={`text-lg ${
                  selectedFilter === f
                    ? 'text-[#005A63] font-semibold'
                    : 'text-gray-500'
                }`}
              >
                {f}
              </span>
              <ChevronRight
                className={`${
                  selectedFilter === f ? 'text-[#005A63]' : 'text-gray-400'
                }`}
                size={24}
              />
            </button>
          ))}

          {conductFile && (
            <>
              <a
                href={conductFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-8 text-[#00C3B3]"
              >
                <Download size={24} />
                <span className="font-medium text-[#3C3C3B]">
                  Código de comportamiento empresarial
                </span>
              </a>
              <a
                href={conductFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-8 text-[#00C3B3]"
              >
                <Download size={24} />
                <span className="font-medium text-[#3C3C3B]">
                  Personal idóneo
                </span>
              </a>
            </>
          )}
        </div>

        {/* Contenido principal */}
        {selectedFilter === 'Directorio' ? (
          <>
            {/* columna 2: Presidente */}
            <div className="flex flex-col space-y-8 items-center">
              <div className="w-full max-w-xs">
                <PersonCard
                  id={institucionalData.presidente.id}
                  name={institucionalData.presidente.name}
                  role={institucionalData.presidente.role}
                  imageUrl={institucionalData.presidente.image.url}
                />
              </div>
            </div>

            {/* columna 3: Vicepresidente */}
            <div className="flex flex-col space-y-8 items-center">
              <div className="w-full max-w-xs">
                <PersonCard
                  id={institucionalData.vicepresidente.id}
                  name={institucionalData.vicepresidente.name}
                  role={institucionalData.vicepresidente.role}
                  imageUrl={institucionalData.vicepresidente.image.url}
                />
              </div>
            </div>
          </>
        ) : (
          renderTeamByArea()
        )}
      </div>
    </section>
  );
}
