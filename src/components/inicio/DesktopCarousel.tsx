// src/components/inicio/DesktopCarousel.tsx
'use client';

import type { HomeCard, RawImage } from '@/services/homeService';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import JsonAnimation from '../shared/LottieAnimation';

interface Props {
  cards: HomeCard[];
}

export default function DesktopCarousel({ cards }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [downloadLink, setDownloadLink] = useState<string>('');

  const currentCard = cards[currentIndex];

  useEffect(() => {
    if (!currentCard) return;

    const ua = navigator.userAgent || '';
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !('MSStream' in window);

    const androidLink = currentCard.downloadLinks?.find((d) =>
      d.description.toLowerCase().includes('android')
    )?.url;
    const iosLink = currentCard.downloadLinks?.find((d) =>
      d.description.toLowerCase().includes('ios')
    )?.url;
    const fallback = currentCard.downloadLinks?.[0]?.url;

    const dl = isAndroid ? androidLink : isIOS ? iosLink : fallback;
    setDownloadLink(dl || '');
  }, [currentCard]);

  if (!currentCard) return null;

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Detecta si el primer item de `image` es un JSON de Lottie.
  const primeraEsJson = (): boolean => {
    const first: RawImage | undefined = currentCard.image?.[0];
    return first?.mime === 'application/json';
  };

  return (
    <>
      {/* ==== MOBILE ==== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`mobile-card-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="block lg:hidden rounded-b-xl rounded-t-none shadow"
          style={{
            background:
              currentCard.color ||
              'linear-gradient(277deg, #008996 20.62%, #00C3B3 64.58%)',
          }}
        >
          <div className="w-full px-4 pt-4">
            {currentCard.imageMobile?.[0]?.mime === 'application/json' ? (
              <JsonAnimation
                key={currentCard.id + '-mobile-lottie'}
                src={currentCard.jsonUrlMobile}
                loop
                autoplay
              />
            ) : primeraEsJson() ? (
              <JsonAnimation
                key={currentCard.id + '-mobile-fallback-lottie'}
                src={currentCard.jsonUrlDesktop}
                loop
                autoplay
              />
            ) : (
              <Image
                key={currentCard.id + '-mobile-img'}
                src={currentCard.jsonUrlDesktop}
                alt={currentCard.title}
                width={600}
                height={400}
                className="w-full h-auto mx-auto"
              />
            )}
          </div>

          <div className="px-4 pb-4 flex flex-col items-center text-center">
            <h1 className="font-encode-sans font-extrabold text-2xl mt-4 mb-2 text-primary">
              {currentCard.title}
            </h1>
            <p className="text-base whitespace-pre-line text-primary font-encode-sans mb-6">
              {currentCard.description}
            </p>
            <div className="flex gap-4 pb-4">
              {downloadLink ? (
                <Button variant="primary" href={downloadLink}>
                  {currentCard.button_text || 'Descargar app'}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => console.log('Descarga no disponible')}
                >
                  {currentCard.button_text || 'Descargar app'}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores Mobile (fuera del card) */}
      {cards.length > 1 && (
        <div className="flex justify-center gap-2 py-4 lg:hidden">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-[63px] h-[27px] bg-gray-800 rounded-full'
                  : 'w-[27px] h-[27px] bg-white border-2 border-gray-300 rounded-full'
              }`}
            />
          ))}
        </div>
      )}

      {/* ==== DESKTOP ==== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`desktop-card-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="hidden lg:block relative mx-auto my-8 w-full h-[645px] rounded-[20px]"
            style={{
              background:
                currentCard.color ||
                'linear-gradient(277deg, #008996 20.62%, #00C3B3 64.58%)',
            }}
          >
            {/* Texto + botón (lado izquierdo) */}
            <div className="absolute inset-y-0 left-0 p-8 pl-24 flex flex-col justify-center z-20 w-1/2 text-primary">
              <h1 className="font-encode-sans font-extrabold text-4xl mb-8">
                {currentCard.title}
              </h1>
              <p className="text-lg font-encode-sans whitespace-pre-line mb-6">
                {currentCard.description}
              </p>
              <div className="flex gap-8 py-4">
                {currentCard.link1 ? (
                  <Button variant="primary" href={currentCard.link1}>
                    {currentCard.button_text || 'Ver más'}
                  </Button>
                ) : downloadLink ? (
                  <Button variant="primary" href={downloadLink}>
                    {currentCard.button_text || 'Descargar app!'}
                  </Button>
                ) : (
                  <Link href="/invierta" passHref>
                    <Button>
                      {currentCard.button_text || 'Descargar app!'}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Imagen/animación (lado derecho) */}
            <div
              className={`absolute inset-y-0 right-24 flex items-center ${
                primeraEsJson() ? 'justify-center w-5/6' : 'justify-end w-1/2'
              }`}
            >
              {primeraEsJson() ? (
                <JsonAnimation
                  key={currentCard.id + '-desktop-lottie'}
                  src={currentCard.jsonUrlDesktop}
                  loop
                  autoplay
                />
              ) : (
                <Image
                  key={currentCard.id + '-desktop-img'}
                  src={currentCard.jsonUrlDesktop}
                  alt={currentCard.title}
                  width={600}
                  height={400}
                  className="max-w-full max-h-full"
                />
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores Desktop (fuera del card) */}
      {cards.length > 1 && (
        <div className="hidden lg:flex justify-center gap-2 mt-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
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
