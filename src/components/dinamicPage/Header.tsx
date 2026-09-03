'use client';

import { useState } from 'react';
import Button from '@/components/shared/Button';
import { Header, SimpleCard } from '@/types/DinamicLanding';
import { _capitalize } from 'chart.js/helpers';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface Props {
  header: Header;
  description: SimpleCard;
}

function truncate(text: string, maxLength: number = 110): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);

  return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
}

export default function HeaderDinamicPage({ header, description }: Props) {
  const [showFull, setShowFull] = useState(false);
  const shortDescription = truncate(description.description);
  const isTruncated = shortDescription !== description.description;

  return (
    <div className="lg:min-h-[80vh] flex flex-col gap-12 lg:gap-[15vh] mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between px-[50px] items-end">
        <div className="w-full">
          <h1 className="w-full break-words text-start lg:text-left font-encode-sans font-extrabold xl:font-black text-4xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-4 lg:mb-7 xl:mb-6 max-w-[590px] lg:px-0">
            {_capitalize(header.title || '')}
          </h1>
          <div
            className="font-encode-sans font-normal text-[16px] xl:text-[20px]
           leading-5 xl:leading-6 text-secondary text-left
           lg:max-w-[630px] space-y-4 xl:px-0 xl:mr-24  lg:px-0"
          >
            <p>{header.description}</p>
          </div>
        </div>
        <div className="pb-8 flex justify-end lg:justify-end w-full pt-8 lg:pt-0 ">
          <Link href={header.button_link}>
            <Button variant="light"> {header.button_text}</Button>
          </Link>
        </div>
      </div>
      <div className="px-[20px]">
        <div
          className="bg-[#2098A1] w-full h-fit min-h-fit shadow-xl p-[2rem] lg:p-[3rem] rounded-tl-[6px] rounded-tr-[20px]
    rounded-br-[6px] rounded-bl-[20px] "
        >
          <div className="lg:w-[80%] w-full h-full flex flex-col gap-5 justify-around">
            <p className="font-bold w-[80%] text-xl lg:text-xl text-white ">
              {description.title}
            </p>
            {/* Mobile: texto truncado con botón "Leer más" / animación de alto */}
            <div className="md:hidden text-[16px] text-white">
              {!showFull && (
                <div>
                  <p>{shortDescription}</p>
                  {isTruncated && (
                    <button
                      className="font-bold underline mt-2"
                      onClick={() => setShowFull(true)}
                    >
                      Leer más
                    </button>
                  )}
                </div>
              )}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: showFull ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="prose prose-invert max-w-none prose-p:text-white">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {description.description}
                    </ReactMarkdown>
                  </div>
                  {showFull && (
                    <button
                      className="font-bold underline mt-2"
                      onClick={() => setShowFull(false)}
                    >
                      Leer menos
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop: siempre completo */}
            <div className="hidden md:block prose prose-invert max-w-none xl:text-[20px] prose-p:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {description.description}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
