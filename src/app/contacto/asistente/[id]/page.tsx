'use client';

import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Asistente {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const mockAsistentes: Asistente[] = [
  {
    id: 1,
    name: 'Patricio',
    role: 'Soporte General',
    description: `Patricio brinda soporte técnico y operativo a los usuarios.\nResuelve consultas sobre productos y canaliza requerimientos al área correspondiente.`,
    image: '/asistentes/patricio.jpg',
  },
  {
    id: 2,
    name: 'Lucía',
    role: 'Atención al cliente',
    description: `Lucía se encarga de guiar a los usuarios durante el proceso de inversión.\nOfrece información sobre fondos, plataformas y requisitos.`,
    image: '/asistentes/lucia.jpg',
  },
];

export default function AsistenteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [asistente, setAsistente] = useState<Asistente | null>(null);

  useEffect(() => {
    const data = mockAsistentes.find((a) => a.id === id);
    setAsistente(data || null);
  }, [id]);

  if (!asistente) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-red-500 py-8">
            Asistente no encontrado
          </div>
          <div className="text-center">
            <Link
              href="/contacto"
              className="text-dark-teal flex items-center justify-center gap-2"
            >
              <ChevronLeft size={20} />
              Volver a Contacto
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="py-8 md:py-16 font-encode-sans">
        <div className="container mx-auto px-4">
          <div
            className="p-12 sm:p-24 max-w-3xl mx-auto"
            style={{
              borderRadius: '8px',
              background: '#FFF',
              boxShadow: '0px 4px 32px rgba(146,146,146,0.57)',
            }}
          >
            <div className="flex flex-col mb-6 md:mb-8 items-center text-center">
              <div className="w-24 h-32 md:w-64 md:h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src={asistente.image}
                  alt={asistente.name}
                  width={256}
                  height={320}
                  className="object-cover w-full h-full rounded-[20px]"
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                {asistente.name}
              </h1>
              <p className="text-[#008996] font-medium">{asistente.role}</p>
            </div>

            <div className="prose max-w-none text-sm md:text-base">
              {asistente.description.split('\n').map((para, i) => (
                <p key={i} className="mb-4 text-gray-700">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-6 md:mt-8 flex justify-center">
              <button
                className="text-white bg-primary px-6 py-3 rounded hover:bg-opacity-90 transition"
                onClick={() => router.push('/contacto')}
              >
                Volver a Nosotros
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
