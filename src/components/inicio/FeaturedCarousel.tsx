// src/components/inicio/FeaturedCarousel.tsx
'use client';

import Button from '@/components/shared/Button';
import JsonAnimation from '@/components/shared/LottieAnimation';
import type { Destacado } from '@/services/homeService';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  items: Destacado[];
}

export default function FeaturedCarousel({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si cambia la longitud, resetear índice
  useEffect(() => {
    if (currentIndex >= items.length) {
      setCurrentIndex(0);
    }
  }, [items.length, currentIndex]);

  if (!items || items.length === 0) return null;

  const current = items[currentIndex];

  // Saber si es Lottie o imagen
  const isLottie = !!current.jsonUrl;
  const isImage = !!current.imageUrl;

  const handleIndicatorClick = (idx: number) => {
    setCurrentIndex(idx);
  };

  return (
    <>
      {/* ======== VERSIÓN MOBILE ======== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`mob-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="block lg:hidden bg-[#E6F9F0] rounded-xl p-4 mx-4 my-6"
            style={{ backgroundColor: current.color || '#E6F9F0' }}
          >
            <div className="w-full">
              {isLottie && current.jsonUrl ? (
                <JsonAnimation
                  key={current.id + '-mob-lottie'}
                  src={current.jsonUrl}
                  loop
                  autoplay
                />
              ) : isImage && current.imageUrl ? (
                <Image
                  key={current.id + '-mob-img'}
                  src={current.imageUrl}
                  alt={current.title}
                  width={600}
                  height={400}
                  className="w-full h-auto mx-auto"
                />
              ) : (
                <p>No se encontró recurso para mostrar.</p>
              )}
            </div>

            <div className="mt-4 text-center">
              <h1 className="font-encode-sans font-extrabold text-2xl mb-2 text-primary">
                {current.title}
              </h1>
              <p className="text-base font-encode-sans mb-4 text-primary">
                {current.description}
              </p>
              {current.urlRedirect ? (
                <Button
                  variant="primary"
                  className="w-1/2"
                  href={current.urlRedirect}
                >
                  Ver más
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-1/2"
                  onClick={() => console.log('Conocé más pulsado')}
                >
                  Conocé más!
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores Mobile (ovalado activo) */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 py-2 lg:hidden">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleIndicatorClick(idx)}
              className={`transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-[63px] h-[27px] bg-gray-800 rounded-full'
                  : 'w-[27px] h-[27px] bg-white border-2 border-gray-300 rounded-full'
              }`}
            />
          ))}
        </div>
      )}

      {/* ======== VERSIÓN DESKTOP ======== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`desk-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="hidden lg:block relative mx-auto my-8"
            style={{
              backgroundColor: current.color || '#E6F9F0',
              borderRadius: '20px',
              maxWidth: '1144px',
              height: '438px',
            }}
          >
            <div className="absolute inset-y-0 left-0 pl-32 flex flex-col justify-center w-1/2">
              <h1 className="font-encode-sans font-extrabold text-4xl mb-4 text-primary">
                {current.title}
              </h1>
              <p className="text-lg font-encode-sans mb-6 text-primary">
                {current.description}
              </p>
              <div>
                {current.urlRedirect ? (
                  <Button variant="primary" href={current.urlRedirect}>
                    Ver más
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => console.log('Conocé más!')}
                  >
                    Conocé más!
                  </Button>
                )}
              </div>
            </div>

            {/* Contenedor derecho */}
            <div className="absolute inset-y-0 right-0 flex items-center justify-center w-1/2">
              {isLottie && current.jsonUrl ? (
                <JsonAnimation
                  key={current.id + '-desk-lottie'}
                  src={current.jsonUrl}
                  loop
                  autoplay
                />
              ) : isImage && current.imageUrl ? (
                <Image
                  key={current.id + '-desk-img'}
                  src={current.imageUrl}
                  alt={current.title}
                  width={600}
                  height={400}
                  className="max-w-full max-h-full"
                />
              ) : (
                <p>No se encontró recurso.</p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores Desktop (ovalado activo) */}
      {items.length > 1 && (
        <div className="hidden lg:flex justify-center gap-2 mt-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleIndicatorClick(idx)}
              className={`transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-[63px] h-[27px] bg-gray-800 rounded-full'
                  : 'w-[27px] h-[27px] bg-white border-2 border-gray-300 rounded-full'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
