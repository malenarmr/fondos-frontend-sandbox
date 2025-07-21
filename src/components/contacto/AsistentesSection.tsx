'use client';

import Link from 'next/link';

interface Asistente {
  id: number;
  nombre: string;
  rol: string;
}

const asistentes: Asistente[] = [
  { id: 1, nombre: 'Patricio', rol: 'Información\nRol' },
  { id: 2, nombre: 'Lucía', rol: 'Información\nRol' },
];

export default function AsistentesSection() {
  return (
    <section className="bg-[#239DA8] py-16 px-4 text-white text-center">
      <h2 className="text-3xl font-extrabold font-encode-sans mb-12">
        Nuestros asistentes
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
        {asistentes.map((asistente) => (
          <Link
            key={asistente.id}
            href={`/contacto/asistente/${asistente.id}`}
            className="w-full max-w-[300px] rounded-[12px] overflow-hidden bg-white shadow transition hover:scale-[1.02]"
          >
            <div className="bg-[#A3DBC9] py-6 text-xl font-bold text-black font-encode-sans">
              {asistente.nombre}
            </div>
            <div className="bg-white py-6 text-gray-600 whitespace-pre-line font-encode-sans">
              {asistente.rol}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
