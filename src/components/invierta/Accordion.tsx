'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <div className="rounded-[4px] border-l-[5px] border-[#80DAEB] p-5 shadow-[0px_1px_3px_rgba(128,218,235,.5)]">
      <h3
        className="font-bold mb-2 text-lg cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
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
