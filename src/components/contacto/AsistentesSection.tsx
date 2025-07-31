interface Asistente {
  id: number;
  name: string;
  rol: string | null;
}

interface AsistentesSectionProps {
  asistentes: Asistente[];
  sectionTitle: string;
}

export default function AsistentesSection({ asistentes, sectionTitle }: AsistentesSectionProps) {
  return (
    <section className="bg-[#239DA8] py-16 px-4 text-white text-center">
      <h2 className="text-3xl font-extrabold font-encode-sans mb-12">
        {sectionTitle}
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto items-center">
        {asistentes.map((asistente) => (
          <div
            key={asistente.id}
            className={`
              w-full max-w-[300px]
              bg-white 
              border-2 border-[#2F755E]
              rounded-tl-[8px] rounded-tr-[22px] rounded-bl-[22px] rounded-br-[8px]
              shadow-sm transition 
              hover:scale-[1.02]
              overflow-hidden
              flex flex-col
            `}
          >
            <div className="bg-[#A3DBC9] py-6 text-xl font-bold text-black font-encode-sans">
              {asistente.name}
            </div>
            <div className="bg-white py-6 text-gray-600 whitespace-pre-line font-encode-sans">
              {asistente.rol ?? '—'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
