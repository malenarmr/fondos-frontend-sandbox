'use client';

import { useState } from 'react';
import { SimpleCard } from '@/types/DinamicLanding';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface Props {
  description: SimpleCard;
}

function truncate(text: string, maxLength: number = 110): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);

  return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
}

export default function DescriptionDinamicPage({ description }: Props) {
  const [showFull, setShowFull] = useState(false);
  const shortDescription = truncate(description.description);
  const isTruncated = shortDescription !== description.description;

  return (
    <div className="lg:min-h-fit">
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
                  <div className="prose prose-invert max-w-none prose-p:text-white">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {shortDescription}
                    </ReactMarkdown>
                  </div>
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
