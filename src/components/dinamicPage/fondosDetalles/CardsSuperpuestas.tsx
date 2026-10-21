import Button from '@/components/shared/Button';
import type { CSSProperties, ReactNode } from 'react';
import { detailsAnchorId } from './Details';
import ScrollToLink from './ScrollToLink';

export type OverlappingCard = {
  title: string;
  description: ReactNode;
  button_text?: string;
  button_link?: string;
  id: number;
  /** Color de fondo de la tarjeta (hex, rgb, var(--x)...) */
  bgColor: string;
  /** Color del texto de la tarjeta */
  textColor: string;
};

type Props = {
  cards: OverlappingCard[];
  /** Trama del fondo (tu SVG o <Image fill />). Ocupa todo el contenedor. */
  background?: ReactNode;
  className?: string;
};

/**
 * Tarjetas superpuestas en escalera. Ocupa el 100% del ancho del padre.
 * Impares pegadas al borde izquierdo, pares pegadas al borde derecho.
 */
export default function OverlappingCards({
  cards,
  background,
  className = '',
}: Props) {
  return (
    <section
      className={`relative isolate block w-full min-w-0 self-stretch ${className}`}
    >
      {background && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-[-12%] inset-x-[3%] -z-10 [&>img]:h-full [&>img]:w-full [&>img]:object-fill [&>svg]:h-full [&>svg]:w-full"
        >
          {background}
        </div>
      )}

      <ul className="grid w-full grid-cols-1">
        {cards.map((card, i) => {
          const right = i % 2 === 1;
          const isLast = i === cards.length - 1;
          const style: CSSProperties = {
            backgroundColor: card.bgColor,
            color: card.textColor,
            zIndex: i + 1,
          };
          return (
            <li
              key={`${card.title}-${i}`}
              style={style}
              className={[
                'relative w-full cursor-pointer rounded-bl-[20px] rounded-br-[6px] rounded-tl-[6px] rounded-tr-[20px] px-8 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.18)] md:w-[70%] md:px-20 md:py-14',
                right
                  ? 'justify-self-end text-right'
                  : 'justify-self-start text-left',
                i > 0 ? '-mt-6 md:-mt-6' : '',
                !isLast ? 'pb-12 md:pb-14' : '',
              ].join(' ')}
            >
              {/* Link "estirado": cubre toda la card sin envolver el botón
                  (un <a> no puede contener otro <a>). */}
              <ScrollToLink
                targetId={detailsAnchorId(card.id)}
                aria-label={card.title}
                className="absolute inset-0 rounded-[inherit]"
              />
              <h3 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                {card.title}
              </h3>
              <p
                className={`mt-5 max-w-6xl text-base leading-snug md:text-lg ${right ? 'ml-auto' : ''}`}
              >
                {card.description}
              </p>
              {card.button_link && (
                <div
                  className={`relative mt-10 flex w-full ${right ? 'justify-end' : 'justify-start'}`}
                >
                  <Button
                    variant="white"
                    className="w-[30%]"
                    href={card.button_link}
                  >
                    {card.button_text}
                  </Button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
