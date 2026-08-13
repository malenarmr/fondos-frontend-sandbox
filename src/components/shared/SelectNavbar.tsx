'use client';

import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface FundsOption {
  label: string;
  value: string;
  href: string;
}

// Ajustá los hrefs a las rutas reales cuando estén definidas
const FUNDS_OPTIONS: FundsOption[] = [
  {
    label: 'En Dólares',
    value: 'dolares',
    href: '/nuestros-fondos?moneda=dolares',
  },
  { label: 'En Pesos', value: 'pesos', href: '/nuestros-fondos?moneda=pesos' },
  { label: 'FAL', value: 'fal', href: '/nuestros-fondos/fal' },
];

interface FundsSelectProps {
  currentPath: string;
}

const FundsSelect: React.FC<FundsSelectProps> = ({ currentPath }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const isActive = currentPath.startsWith('/nuestros-fondos');
  const { provinciaApiClient } = useAppContext();
  const [filter, setFilter] = useState<string[]>([]);
  useEffect(() => {
    async function fetchFiltros() {
      try {
        const resMonedas = await provinciaApiClient.fondos.founds.getMoneda();
        setFilter(resMonedas.data.map((m: { value: string }) => m.value));
      } catch {}
    }

    fetchFiltros();
  }, [provinciaApiClient]);
  console.log(filter, 'asas');
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <li ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 py-2 text-md whitespace-nowrap hover:text-dark ${
          isActive ? 'font-bold' : 'font-medium'
        }`}
      >
        Nuestros Fondos
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 w-full mt-2 bg-[#CDCACA] rounded-[6px] overflow-hidden"
          style={{ zIndex: 3 }}
        >
          {filter.map((option) => (
            <li key={option} role="option">
              <Link
                href={option}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-secondary font-medium hover:bg-white/30 rounded-[6px] transition-colors capitalize"
              >
                En {option}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default FundsSelect;
