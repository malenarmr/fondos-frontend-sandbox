'use client';

import { useState } from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
interface Props {
  FULL_TEXT: string;
  SHORT_TEXT: string;
}

export default function AvisoLegalSection({ SHORT_TEXT, FULL_TEXT }: Props) {
  const [showFull, setShowFull] = useState(false);

  return (
    <section className="w-full flex justify-center items-center py-12 bg-[#2098A1]">
      <div className="px-4 md:px-[100px] xl:px-[145px] padding-xxl">
        <div
          className="
        bg-white
        w-full
        px-4 sm:px-8 md:px-20 py-10 md:py-20
        shadow-lg
        rounded-tl-[48px] rounded-br-[48px] rounded-tr-[12px] rounded-bl-[12px]
      "
        >
          <h3 className="text-center text-xl font-bold mb-6 text-gray-800">
            Aviso legal
          </h3>

          {/* Mobile (corta y muestra leer más) */}
          <div className="block md:hidden text-gray-700 leading-relaxed text-base text-center">
            {!showFull ? (
              <>
                {SHORT_TEXT}{' '}
                <button
                  className="text-secondary font-bold"
                  onClick={() => setShowFull(true)}
                >
                  Leer más
                </button>
              </>
            ) : (
              FULL_TEXT
            )}
          </div>
          <div className="hidden md:flex">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {FULL_TEXT}
            </ReactMarkdown>
          </div>
          {/* Desktop (siempre completo) */}
          {/* <div className="hidden md:block text-gray-700 leading-relaxed text-base text-center md:text-left">
            {FULL_TEXT}
          </div> */}
        </div>
      </div>
    </section>
  );
}
