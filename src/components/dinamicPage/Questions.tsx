'use client';

import { SectionWithImage } from '@/types/DinamicLanding';
import Image from 'next/image';
import Accordion from '../invierta/Accordion';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
interface Props {
  section: SectionWithImage;
}

export default function Questions({ section }: Props) {
  return (
    <div className="relative rounded-[20px] p-10 my-5 !bg-white shadow-[5px_5px_44px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Imagen: absoluta, ocupa el 100% de la altura del padre */}
      <div className="absolute inset-y-0 left-0 w-1/3 p-5">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={`http://localhost:1337${section.image.url}`}
            alt={section.image.alternativeText || ''}
            width={250}
            height={250}
          />
        </div>
      </div>

      {/* Contenido: en flujo normal, título centrado respecto al padre completo */}
      <div className="flex flex-col gap-[3vh]">
        <h1 className="w-full text-center font-encode-sans font-bold text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-[#3C3C3B]-light">
          {section.title}
        </h1>

        <div className="pl-[33%] flex gap-2 flex-col pr-10">
          {section.cards.map((c) => (
            <Accordion title={c.title} key={c.id} defaultOpen={false}>
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {c.description}
              </ReactMarkdown>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
