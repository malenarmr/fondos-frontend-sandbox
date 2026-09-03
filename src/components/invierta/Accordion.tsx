'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="md:rounded-[4px] md:border-l-[5px] md:border-[#80DAEB] border-b-[3px] border-black/60 p-5 md:shadow-[0px_1px_3px_rgba(128,218,235,.5)]">
      <h3
        className="font-bold text-lg cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          className={`hidden md:flex w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
        <Image
          src="/dinamic/arrow.svg"
          alt="expandir"
          width={15}
          height={15}
          className="md:hidden"
        />
      </h3>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="pt-1">{children}</div>
      </div>
    </div>
  );
}
