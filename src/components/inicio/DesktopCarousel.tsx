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
  const current = cards[currentIndex];

  // Determine appropriate download link based on platform
  useEffect(() => {
    if (!current) return;
    const ua = navigator.userAgent;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !('MSStream' in window);

    const androidLink = current.downloadLinks?.find((d) =>
      d.description.toLowerCase().includes('android')
    )?.url;
    const iosLink = current.downloadLinks?.find((d) =>
      d.description.toLowerCase().includes('ios')
    )?.url;
    const fallback = current.downloadLinks?.[0]?.url;

    setDownloadLink(
      isAndroid ? androidLink || '' : isIOS ? iosLink || '' : fallback || ''
    );
  }, [current]);

  if (!current) return null;

  const firstImage = current.image?.[0] as RawImage | undefined;
  const isJson = firstImage?.mime === 'application/json';
  const currentCard = cards[currentIndex];

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
          className="block lg:hidden rounded-b-xl rounded-t-none shadow bg-primary-light"
        >
          <div className="w-full px-4 pt-4">
            {currentCard.imageMobile?.[0]?.mime === 'application/json' ? (
              <JsonAnimation
                key={currentCard.id + '-mobile-lottie'}
                src={currentCard.jsonUrlMobile}
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
            <h1 className="font-encode-sans font-extrabold text-2xl mt-4 mb-2 text-white">
              {currentCard.title}
            </h1>
            <p className="text-base whitespace-pre-line text-white font-encode-sans mb-6">
              {currentCard.description}
            </p>
            <div className="flex gap-4 pb-4">
              {downloadLink ? (
                <Button variant="light" href={downloadLink}>
                  {currentCard.button_text || 'Descargar app'}
                </Button>
              ) : (
                <Button
                  variant="sky"
                  onClick={() => console.log('Descarga no disponible')}
                >
                  {currentCard.button_text || 'Descargar app'}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ===== DESKTOP ===== */}
      <div className="px-4 md:px-[100px] xl:px-[145px] padding-xxl hidden lg:flex justify-between items-center gap-60">
        {/* Left side: Text & Button */}
        <div className="w-1/2 pr-8 text-white">
          <h1 className="text-4xl font-extrabold">{current.title}</h1>
          <p className="text-lg mb-6 whitespace-pre-line">
            {current.description}
          </p>
          <div className="flex gap-4">
            {(() => {
              const text = current.button_text?.toLowerCase().trim();

              if (current.link1) {
                return (
                  <Button variant="primary" href={current.link1}>
                    {current.button_text || 'Ver más'}
                  </Button>
                );
              }

              if (text === 'ver todos los fondos') {
                return (
                  <Link href="/nuestros-fondos">
                    <Button variant="sky">{current.button_text}</Button>
                  </Link>
                );
              }

              return (
                <Link href={downloadLink || '/'}>
                  <Button variant="sky">
                    {current.button_text || 'Hacer el test'}
                  </Button>
                </Link>
              );
            })()}
          </div>
        </div>

        {/* Right side: Animation/Image */}
        <div className="w-1/2 flex justify-center">
          {isJson ? (
            <JsonAnimation src={current.jsonUrlDesktop} loop autoplay />
          ) : (
            <Image
              src={current.jsonUrlDesktop}
              alt={current.title}
              width={600}
              height={400}
              className="max-w-full max-h-full"
            />
          )}
        </div>
      </div>

      {/* ===== DESKTOP INDICATORS ===== */}
      {cards.length > 1 && (
        <div className="hidden lg:flex justify-center gap-2 mt-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
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
