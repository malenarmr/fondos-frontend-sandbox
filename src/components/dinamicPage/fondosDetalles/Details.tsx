import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { ImageCard, SimpleCard } from '@/types/DinamicLanding';
import { DetailsGrid } from '../DetailItem';
type Props = {
  cardImage: ImageCard;
  id: number;
  details: SimpleCard[];
  /** Color de la card principal */
  bgColor: string;
  /** Color del texto de la card principal */
  textColor: string;
  /** Color de fondo de la sección (alterna primario/secundario) */
  sectionColor: string;
  /** Trama del fondo (<Image fill /> o <svg>) */
  background?: ReactNode;
  /** Cuánto sobresale la card por encima del fondo de la sección */
  offset?: string;
  /** Separación entre el final de una sección y la card de la siguiente */
  spacing?: string;
  /** Versiones mobile (< md) de offset y spacing */
  mobileOffset?: string;
  mobileSpacing?: string;
  /** id para poder navegar a la sección con un ancla (#id) */
  anchorId?: string;
};

/**
 * Cada sección pinta solo su propio fondo (color + trama). El contenido se
 * desplaza hacia arriba con un margin negativo, así la card invade el fondo
 * de la sección anterior sin taparle la trama.
 */
export default function Details({
  cardImage,
  details,
  bgColor,
  textColor,
  sectionColor,
  background,
  offset = '8rem',
  spacing = '12rem',
  mobileOffset = '3rem',
  mobileSpacing = '4rem',
  anchorId,
}: Props) {
  return (
    <section
      // flow-root evita que el margin negativo del contenido "arrastre" la sección.
      // La primera sección deja lugar arriba para lo que sobresale su card.
      // Abajo: lo que sobresale la card siguiente + la separación visible;
      // la última no tiene card debajo, así que solo deja la separación.
      className="relative isolate flow-root w-full pb-[calc(var(--details-spacing)_+_var(--details-offset))] first:mt-[var(--details-offset)] last:pb-[var(--details-spacing)] [--details-offset:var(--details-offset-sm)] [--details-spacing:var(--details-spacing-sm)] md:[--details-offset:var(--details-offset-md)] md:[--details-spacing:var(--details-spacing-md)]"
      style={
        {
          '--details-offset-sm': mobileOffset,
          '--details-spacing-sm': mobileSpacing,
          '--details-offset-md': offset,
          '--details-spacing-md': spacing,
          backgroundColor: sectionColor,
        } as CSSProperties
      }
    >
      {background && (
        <div aria-hidden className="absolute inset-0 -z-10 overflow-visible">
          <div className="absolute inset-y-12 left-4 md:inset-y-[8rem] right-4 md:left-[100px] md:right-[100px] xl:left-[145px] xl:right-[145px]">
            {/* Margen interno: achica la trama respecto del contenido */}
            <div className="absolute inset-y-0 inset-x-6 md:inset-x-12">
              {background}
            </div>
          </div>
        </div>
      )}

      {/* El ancla va en el contenido (no en la sección) para que el scroll
          llegue a la card completa; scroll-mt deja lugar al navbar sticky
          y a la ilustración que sobresale por arriba de la card. */}
      <div
        id={anchorId}
        className="relative scroll-mt-40 px-4 padding-xxl md:px-[100px] xl:px-[145px]"
        style={{ marginTop: 'calc(-1 * var(--details-offset))' }}
      >
        <article
          className="relative rounded-bl-[20px] rounded-br-[6px] rounded-tl-[6px] rounded-tr-[20px] p-8 shadow-xl lg:p-12 lg:mb-[8rem]"
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

        <DetailsGrid details={details} />
      </div>
    </section>
  );
}
