'use client';

import { useState } from 'react';
import { SimpleCard } from '@/types/DinamicLanding';

/** Columnas de la grilla: los items de una misma fila se abren juntos */
const COLUMNS = 2;

export function DetailsGrid({ details }: { details: SimpleCard[] }) {
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());

  const toggleRow = (row: number) =>
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(row)) next.delete(row);
      else next.add(row);
      return next;
    });

  return (
    <ul className="mt-8 grid grid-cols-2 gap-2 md:mt-16 md:gap-6">
      {details.map((d, i) => {
        const row = Math.floor(i / COLUMNS);
        return (
          <DetailItem
            key={`${d.title}-${i}`}
            detail={d}
            open={openRows.has(row)}
            onToggle={() => toggleRow(row)}
          />
        );
      })}
    </ul>
  );
}

function DetailItem({
  detail,
  open,
  onToggle,
}: {
  detail: SimpleCard;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="flex flex-col items-center rounded-[5px] md:rounded-xl bg-white px-2 py-3 text-center shadow-md md:min-h-[181.38px] md:items-start md:p-10 md:text-left">
      <h4 className="font-bold text-neutral-900">{detail.title}</h4>

      {/* Colapsable en mobile, siempre visible en >=768px */}
      <div
        className={`grid w-full transition-[grid-template-rows] duration-300 ease-in-out md:grid-rows-[1fr] ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-2 text-center text-[.8rem]  md:text-[1rem] md:text-left leading-snug text-neutral-700">
            {detail.description}
          </p>
        </div>
      </div>

      {/* Solo mobile: flecha para abrir/cerrar */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? 'Ver menos' : 'Ver más'}
        className="mt-auto pt-2 md:hidden"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`text-neutral-700 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </li>
  );
}
