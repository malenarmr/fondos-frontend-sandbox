'use client';

import { Aliado, getAliados } from '@/services/aliadosService';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const AlliesSection: React.FC = () => {
  const [allies, setAllies] = useState<Aliado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAliados()
      .then(setAllies)
      .catch(() => setError('Error al cargar aliados'))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  if (error) return <p className="text-center text-red-500 py-12">{error}</p>;

  return (
    <section className="pt-12 pb-32 px-4 sm:px-6 md:px-12 lg:px-24">
      <div
        className="
          grid grid-cols-3 md:grid-cols-6
          gap-4 sm:gap-6 md:gap-8 lg:gap-10
          items-center justify-items-center
        "
      >
        {allies.map((a) => {
          const filterValue =
            a.name === 'A3'
              ? 'grayscale(100%) contrast(1.2) brightness(0.6)'
              : 'grayscale(100%) contrast(1.2) brightness(0.7)';

          // altura fija de 64px (h-16), ancho proporcional:
          const heightPx = 64;
          const widthPx = Math.round(
            (a.image.width / a.image.height) * heightPx
          );

          return (
            <div key={a.id} className="flex justify-center">
              {/* wrapper de fondo blanco si lo necesitás */}
              <div className="bg-white p-2 rounded">
                <Image
                  src={a.image.url}
                  alt={a.image.alternativeText ?? a.name}
                  width={widthPx}
                  height={heightPx}
                  className="object-contain"
                  style={{ filter: filterValue }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AlliesSection;
