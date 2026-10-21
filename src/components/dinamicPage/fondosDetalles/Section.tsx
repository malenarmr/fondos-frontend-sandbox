import Image from 'next/image';
import OverlappingCards from './CardsSuperpuestas';
import Details from './Details';
import { fondosInfo } from '@/types/DinamicLanding';

interface Props {
  section: fondosInfo[];
  /** Fondo de las secciones impares (1ª, 3ª, ...) */
  primaryColor?: string;
  /** Fondo de las secciones pares (2ª, 4ª, ...) */
  secondaryColor?: string;
}

export default function SectionFondosDetails({
  section,
  primaryColor = 'var(--color-primary)',
  secondaryColor = 'var(--color-secondary)',
}: Props) {
  const cards = section.map((f) => ({
    title: f.cardPrincipal.title,
    description: f.cardPrincipal.description,
    bgColor: f.backgroundColor,
    textColor: f.textColor,
    button_text: f.cardPrincipal.button_text,
    button_link: f.cardPrincipal.button_link,
  }));

  return (
    <div className="flex flex-col gap-16">
      <div className="padding-xxl px-4 md:px-[100px] xl:px-[145px]">
        <OverlappingCards
          background={
            <Image src="/trama.svg" alt="" fill className="object-fill" />
          }
          cards={cards}
        />
      </div>

      <div className="flex flex-col">
        {section.map((f, i) => (
          <Details
            key={f.id}
            cardImage={f.cardImage}
            details={f.details}
            bgColor={f.backgroundColor}
            textColor={f.textColor}
            sectionColor={i % 2 === 0 ? primaryColor : secondaryColor}
            prevSectionColor={
              i === 0 ? undefined : i % 2 === 1 ? primaryColor : secondaryColor
            }
            background={
              <Image
                src={i % 2 === 0 ? '/trama-clara.svg' : '/trama.svg'}
                alt=""
                fill
                className="object-cover object-center"
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
