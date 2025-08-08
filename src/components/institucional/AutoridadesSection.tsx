'use client';

import { useAppContext } from '@/context/AppContext';
import { ArrowUpRight, Download } from 'lucide-react';
import { useState } from 'react';
import PersonCard from './PersonCard';

export default function AutoridadesSection() {
  const [selectedFilter, setSelectedFilter] = useState('Directorio');
  const { institucionalData } = useAppContext();
  if (!institucionalData) return null;

  const conductFile = institucionalData.code_of_conduct[0];

  const filters = [
    'Directorio',
    ...institucionalData.area_team_fondos
      .filter((a: { name: string }) => {
        const name = a.name.toLowerCase();
        return name !== 'directores titulares' && name !== 'síndicos titulares';
      })
      .map((a: { name: string }) => a.name),
  ];

  const renderTeamMemberCard = (member: any) => (
    <div
      key={member.id}
      className="bg-primary-light text-white font-encode-sans font-semibold text-center w-full
        px-6 py-6 rounded-[12px] min-h-[120px] flex flex-col justify-center mx-auto"
    >
      <div className="text-[18px] mb-2">{member.name}</div>
      {member.rol && (
        <div className="text-[14px] font-normal opacity-90">{member.rol}</div>
      )}
    </div>
  );

  const renderTeamByArea = () => {
    const area = institucionalData.area_team_fondos.find(
      (a: { name: string }) => a.name === selectedFilter
    );
    if (!area) return null;

    return (
      <div className="w-full">
        <h3 className="text-2xl font-bold mb-8 text-secondary">{area.name}</h3>
        <div className="flex justify-between gap-6">
          {area.member_team_fondos.map((member: any) =>
            renderTeamMemberCard(member)
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="mt-32 mb-32 font-encode-sans px-4 sm:px-6 lg:px-0 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary-light">
        Directorio
      </h2>
      <p className="text-center">
        Te presentamos a las figuras más relevantes que
      </p>
      <p className="text-center mb-6">llevan adelante a nuestra institución</p>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filtros */}
        <div className="flex flex-col w-full lg:w-1/3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`relative w-full text-left py-4 px-6 rounded-[12px] border-[1.5px] mb-4 flex justify-between items-start
                transition-all font-bold
                ${selectedFilter === f ? 'border-[#008264] text-[#008264]' : 'border-[#929292] text-[#929292]'}`}
            >
              <span className="text-[18px]">{f}</span>
              <ArrowUpRight
                size={18}
                strokeWidth={2}
                className={`mt-1 ${selectedFilter === f ? 'text-[#008264]' : 'text-[#929292]'}`}
              />
            </button>
          ))}
        </div>

        {/* Contenido de cada filtro */}
        <div className="flex-1">
          {selectedFilter === 'Directorio' ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Presidente */}
              <div className="flex flex-col items-center space-y-6 w-full">
                <PersonCard
                  id={institucionalData.presidente.id}
                  name={institucionalData.presidente.name}
                  role={institucionalData.presidente.role}
                  imageUrl={institucionalData.presidente.image.url}
                />
                <div className="bg-primary-light text-white px-6 py-6 rounded-[12px] min-h-[220px] flex flex-col justify-start w-full">
                  <h4 className="text-lg font-bold text-center mb-2 border-b border-white pb-1">
                    Directores titulares
                  </h4>
                  <ul className="mt-2 space-y-1 text-center text-sm flex-1 flex flex-col justify-center">
                    <li>Carlos Antonio Gorosito</li>
                    <li>Raquel Corrales</li>
                    <li>Guillermo Diego Galli</li>
                    <li>Facundo Ballesteros</li>
                    <li>Claudia Ormachea</li>
                  </ul>
                </div>
              </div>

              {/* Vicepresidente */}
              <div className="flex flex-col items-center space-y-6 w-full">
                <PersonCard
                  id={institucionalData.vicepresidente.id}
                  name={institucionalData.vicepresidente.name}
                  role={institucionalData.vicepresidente.role}
                  imageUrl={institucionalData.vicepresidente.image.url}
                />
                <div className="bg-primary-light text-white px-6 py-6 rounded-[12px] min-h-[220px] flex flex-col justify-start w-full">
                  <h4 className="text-lg font-bold text-center mb-2 border-b border-white pb-1">
                    Síndicos titulares
                  </h4>
                  <ul className="mt-2 space-y-1 text-center text-sm flex-1 flex flex-col justify-center">
                    <li>Martín Alejandro Latorre</li>
                    <li>María del Carmen Capdevila</li>
                    <li>Héctor Mauricio Paulone</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            renderTeamByArea()
          )}
        </div>
      </div>

      {/* PDF */}
      {conductFile && (
        <div className="mt-12 flex justify-center">
          <a
            href={conductFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#00C3B3]"
          >
            <Download size={24} />
            <span className="font-bold text-[#3C3C3B]">
              Código de comportamiento empresarial
            </span>
          </a>
        </div>
      )}
    </section>
  );
}
