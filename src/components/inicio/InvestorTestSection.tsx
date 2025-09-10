'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../shared/Button';

interface InvestorCard {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  number: string;
}

const investorProfiles: InvestorCard[] = [
  {
    id: 1,
    title: 'Conservador',
    shortTitle: 'Conservador',
    description:
      '¡Protegé tu dinero! Comenzá a invertir de forma segura con INVIERTA.',
    number: '01',
  },
  {
    id: 2,
    title: 'Moderado',
    shortTitle: 'Moderado',
    description:
      'Equilibrá riesgo y rentabilidad. Diversificá tu cartera con opciones balanceadas.',
    number: '02',
  },
  {
    id: 3,
    title: 'Agresivo',
    shortTitle: 'Agresivo',
    description:
      'Maximizá tus ganancias. Apostá por inversiones de alto rendimiento.',
    number: '03',
  },
];

export default function InvestorTestSection() {
  // Inicializamos en null para que NO haya ninguna card activa al principio
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header con ícono y título */}
        <div className="text-center mb-12">
          <div className="flex justify-start pl-20 pb-10 sm:justify-center lg:justify-start">
            <Image
              src="/home/InvestorTest.svg"
              alt="Test del inversor"
              width={200}
              height={200}
              className="m-0 xl:mr-2"
            />
          </div>

          <h2 className="font-encode-sans font-bold text-[#3C3C3B] text-3xl md:text-4xl mb-4">
            ¿Querés saber
            <br />
            qué tipo de inversor sos?
          </h2>

          <p className="font-encode-sans text-[#3C3C3B] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Respondé 5 simples preguntas y descubrí cuál es la estrategia que
            mejor se adapta a tus expectativas. Al finalizar, te compartimos una
            cartera que represente tu perfil de inversor. ¡Hacé el test!
          </p>
        </div>

        {/* Cards de perfiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {investorProfiles.map((profile) => (
            <div
              key={profile.id}
              className="relative h-48 cursor-pointer"
              onMouseEnter={() => setHoveredCard(profile.id)}
              onMouseLeave={() => setHoveredCard(null)} // Ahora vuelve a null al salir
            >
              <div className="relative w-full h-full preserve-3d transition-transform duration-500">
                {/* Cara frontal (estado normal) */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-lg p-6 flex flex-col justify-between transition-all duration-300 ${
                    hoveredCard === profile.id
                      ? 'rotate-y-180 opacity-0'
                      : 'rotate-y-0 opacity-100'
                  }`}
                  style={{ border: 'none' }}
                >
                  <div>
                    <h3 className="font-encode-sans font-bold text-[#3C3C3B] text-xl">
                      Perfil
                    </h3>
                    <h1 className="font-encode-sans font-bold text-[#3C3C3B] text-3xl mb-10">
                      {profile.title}
                    </h1>
                    <div
                      className="w-full bg-[#00C3B3]"
                      style={{ height: '1px' }}
                    ></div>
                  </div>

                  <div className="text-left">
                    <span className="font-encode-sans text-2xl text-[#00C3B3]">
                      {profile.number}
                    </span>
                  </div>
                </div>

                {/* Cara trasera (estado hover) */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-lg p-6 flex flex-col justify-between transition-all duration-300 ${
                    hoveredCard === profile.id
                      ? 'rotate-y-0 opacity-100'
                      : 'rotate-y-180 opacity-0'
                  }`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 10px 25px rgba(146, 146, 146, 0.57)',
                    borderRadius: '8px',
                  }}
                >
                  <div>
                    <h3 className="font-encode-sans font-bold text-[#00C3B3] text-lg mb-2">
                      {profile.title}
                    </h3>
                    <div
                      className="w-full bg-[#00C3B3] mb-4"
                      style={{ height: '1.5px' }}
                    ></div>
                    <p className="font-encode-sans text-[#3C3C3B] text-lg leading-relaxed">
                      {profile.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón CTA */}
        <div className="text-center">
          <Link href="/test-inversor">
            <Button style={{ width: 'fit-content', margin: '0 auto' }}>
              Hacer el test
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
      `}</style>
    </section>
  );
}
