'use client';

import { useState } from 'react';
import Button from '@/components/shared/Button';
import { ImageCard, SectionWithButtons } from '@/types/DinamicLanding';
import Image from 'next/image';
import Link from 'next/link';
import CardMarkdown from './CardMarkdown';

interface Props {
  section: SectionWithButtons;
}

function Card({ card }: { card: ImageCard }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: card propia con acordeón (imagen + título + flecha, descripción expandible) */}
      <div
        className={`
              md:hidden
              ${open ? '' : 'aspect-[.9/1]'}
              w-full
              p-4
              text-[#3C3C3B]
              bg-white
              shadow-[5px_5px_44px_rgba(0,0,0,0.1)]
              rounded-md
            `}
      >
        <div className="flex flex-col h-full items-center justify-between text-center gap-3">
          <div className="h-[80px] shrink-0 w-full flex justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${card.image.url}`}
              height={70}
              width={70}
              alt={card.image.alternativeText || ''}
              className="h-full w-auto"
            />
          </div>
          <p className="text-xs font-bold">{card.title}</p>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Ver menos' : 'Ver más'}
            className="transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div
            className="grid w-full transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="pt-2">
                <CardMarkdown
                  content={card.description}
                  className="text-sm text-left"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop / tablet (>=768px): markup original, sin cambios respecto al diseño que ya funcionaba */}
      <div
        className="
    hidden md:grid
    min-h-full
    w-full
    lg:grid-cols-3
    mg:grid-cols-1
    items-center
    px-5 py-10
    text-[#3C3C3B]
    bg-white
    shadow-[5px_5px_44px_rgba(0,0,0,0.1)]
    rounded-tl-[6px]
    rounded-tr-[20px]
    rounded-br-[6px]
    rounded-bl-[20px]
    justify-between
  "
      >
        <div className="h-[100px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${card.image.url}`}
            width={200}
            height={200}
            alt={card.image.alternativeText || ''}
            className="h-full w-auto object-contain"
          />
        </div>

        <div className="lg:col-span-2 flex h-full flex-col">
          <div className="flex min-h-[60px] items-center lg:items-start">
            <p className="w-[90%] xl:w-[80%] xl:text-start md:text-center mb-2 lg:text-start md:text-sm text-lg lg:text-xl font-bold">
              {card.title}
            </p>
          </div>

          <CardMarkdown
            content={card.description}
            className="text-md lg:text-sm"
          />
        </div>
      </div>
    </>
  );
}

export default function SectionButtons({ section }: Props) {
  return (
    <div className="min-h-fit flex !px-0 flex-col items-center gap-[3vh] md:gap-[3vh] ">
      <h1 className="w-[50%] md:w-full text-center font-encode-sans font-bold text-xl md:text-2xl xl:text-[40px] leading-[30px] xl:leading-[60px] text-[#3C3C3B]/99">
        {section.title}
      </h1>
      <div
        className="gap-y-8 w-full dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl pb-20 flex flex-col items-center"
        style={{
          backgroundImage: "url('/background-gris.png')",
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="grid grid-cols-2 gap-4 px-4 md:gap-y-5 md:gap-x-8 items-start md:items-stretch">
          {section.cards.map((c) => (
            <Card key={c.id} card={c} />
          ))}
        </div>
        <Link href={section.button_link}>
          <Button>{section.button_text}</Button>
        </Link>
      </div>
    </div>
  );
}
