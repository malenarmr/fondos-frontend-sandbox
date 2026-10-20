import Image from 'next/image';
import type { ReactNode } from 'react';
import { ImageCard, SimpleCard } from '@/types/DinamicLanding';

type Props = {
  cardImage: ImageCard;
  details: SimpleCard[];
  /** Color de la card principal */
  bgColor: string;
  /** Color del texto de la card principal */
  textColor: string;
  /** Color de la franja de fondo de la sección (alterna primario/secundario) */
  sectionColor: string;
  /** Trama del fondo (<Image fill /> o <svg>) */
  background?: ReactNode;
  /** Cuánto empieza la card por encima del fondo */
  offset?: string;
  prevSectionColor?: string;
};

export default function Details({
  cardImage,
  details,
  bgColor,
  textColor,
  sectionColor,
  background,
  offset = '8rem',
  prevSectionColor,
}: Props) {
  return (
    <section className={`relative isolate w-full py-10`}>
      {prevSectionColor && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10"
          style={{ height: offset, backgroundColor: prevSectionColor }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 overflow-hidden"
        style={{ top: offset, backgroundColor: sectionColor }}
      >
        <div className="absolute inset-y-0 left-4 right-4 md:left-[100px] md:right-[100px] xl:left-[145px] xl:right-[145px]">
          {background}
        </div>
      </div>

      <div className="px-4 padding-xxl px-4 md:px-[100px] xl:px-[145px]">
        <article
          className="relative rounded-bl-[20px] rounded-br-[6px] rounded-tl-[6px] rounded-tr-[20px] p-8 shadow-xl lg:p-12"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <div className="flex flex-col gap-5 md:w-[55%]">
            <h3 className="text-4xl font-bold leading-tight lg:text-6xl">
              {cardImage.title}
            </h3>
            <p className="text-base leading-snug lg:text-xl">
              {cardImage.description}
            </p>
          </div>

          {/* Ilustración: apoyada abajo, sobresale por arriba de la card */}
          <div className="pointer-events-none absolute bottom-[-10%] right-6 hidden h-[150%] w-[40%] md:block">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${cardImage.image.url}`}
              alt={''}
              fill
              className="object-contain object-bottom"
            />
          </div>
        </article>

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {details.map((d, i) => (
            <li
              key={`${d.title}-${i}`}
              className="rounded-sm bg-white p-6 shadow-md"
            >
              <h4 className="font-bold text-neutral-900">{d.title}</h4>
              <p className="mt-2 leading-snug text-neutral-700">
                {d.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
