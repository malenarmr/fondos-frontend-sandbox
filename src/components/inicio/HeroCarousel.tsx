'use client';

import type { HomeCard } from '@/services/homeService';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../shared/Button';
import { useAppContext } from '@/context/AppContext';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function HeroCarousel() {
  const [cards, setCards] = useState<HomeCard[]>([]);
  const { provinciaApiClient } = useAppContext();

  // Embla + Autoplay
  const autoplay = useRef(
    Autoplay(
      {
        delay: 5000,
        stopOnInteraction: true, // si el usuario arrastra/clickea, frena
        stopOnMouseEnter: true, // si hover, frena (opcional)
      }
      // rootNode: emblaRoot => emblaRoot.parentElement ?? emblaRoot (default ok)
    )
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (idx: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(idx);
      // opcional: reiniciar autoplay al click
      autoplay.current.reset();
    },
    [emblaApi]
  );

  // solicita tarjetas
  useEffect(() => {
    async function fetchFondo() {
      try {
        const response =
          await provinciaApiClient.fondos.heroAndDestacados.getFromFront();

        const hero = {
          ...response.data.hero,
          link1: response.data.hero.link1 ?? null,
        };

        const destacados = response.data.destacados.map(
          ({ link1, ...rest }: any) => ({
            ...rest,
            link1: link1 ?? null,
          })
        );

        setCards([hero, ...destacados]);
      } catch {}
    }

    fetchFondo();
  }, [provinciaApiClient.fondos.heroAndDestacados]);

  // engancha eventos de embla
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!cards || cards.length === 0) return null;

  return (
    <div>
      {/* VIEWPORT */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* CONTAINER */}
        <div className="flex">
          {cards.map((card) => {
            const bgColor = card.color || 'transparent';
            const bgImage = card.backgroundImage?.url
              ? `url(${process.env.NEXT_PUBLIC_API_URL}${card.backgroundImage.url})`
              : undefined;

            return (
              <div
                key={card.id}
                className="flex-[0_0_100%] min-w-0" // cada slide ocupa el 100%
                style={{
                  backgroundColor: bgColor,
                  backgroundImage: bgImage,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* ===== MOBILE ===== */}
                <div className="block lg:hidden rounded-b-xl rounded-t-none shadow h-[100%]">
                  <div className="w-full px-4 pt-4">
                    {!!card?.image?.[0]?.url && (
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_API_URL + card.image[0].url
                        }
                        alt={card.title}
                        width={600}
                        height={400}
                        className="w-full h-auto mx-auto"
                      />
                    )}
                  </div>

                  <div
                    className="px-4 pb-4 flex flex-col items-center text-center"
                    style={{
                      color: card.color_text
                        ? card.color_text
                        : 'rgba(255, 255, 255, var(--tw-text-opacity, 1))',
                    }}
                  >
                    <h1 className="font-encode-sans font-extrabold text-2xl mt-4 mb-2">
                      {card.title}
                    </h1>
                    <p className="text-base whitespace-pre-line font-encode-sans mb-6">
                      {card.description}
                    </p>
                    {card.link1 && (
                      <div className="flex gap-4 pb-4">
                        <a href={card.link1} target="_blank">
                          <Button
                            variant="sky"
                            onClick={() =>
                              console.log('Descarga no disponible')
                            }
                          >
                            {card.button_text}
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* ===== DESKTOP ===== */}
                <div className="px-4 md:px-[100px] xl:px-[145px] padding-xxl hidden lg:flex justify-between items-center gap-20 py-8 min-h-[553px]">
                  <div
                    className="w-1/2 pr-8"
                    style={{
                      color: card.color_text
                        ? card.color_text
                        : 'rgba(255, 255, 255, var(--tw-text-opacity, 1))',
                    }}
                  >
                    <h1 className="text-4xl font-extrabold mb-4">
                      {card.title}
                    </h1>
                    <p className="text-lg mb-6 whitespace-pre-line">
                      {card.description}
                    </p>
                    {card.link1 && (
                      <div className="flex gap-4">
                        <a href={card.link1} target="_blank">
                          <Button variant="sky">
                            {card.button_text || 'Hacer el test'}
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="w-1/2 flex justify-center">
                    {!!card?.image?.[0]?.url && (
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_API_URL + card.image[0].url
                        }
                        alt="Imagen destacada"
                        width={600}
                        height={400}
                        className="max-w-full max-h-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INDICATORS (para todas las pantallas o solo desktop como tenías) */}
      {cards.length > 1 && (
        <div className="hidden lg:flex justify-center gap-2 mt-2 pb-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`transition-all duration-300 ${
                idx === selectedIndex
                  ? 'w-[63px] h-[27px] bg-gray-800 rounded-full'
                  : 'w-[27px] h-[27px] bg-white border-2 border-gray-300 rounded-full'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
