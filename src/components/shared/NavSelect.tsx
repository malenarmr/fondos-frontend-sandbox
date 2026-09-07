'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface NavSelectOption {
  href: string;
  label: string;
}

interface NavSelectProps {
  label: string;
  baseHref: string;
  currentPath: string;
  items: NavSelectOption[];
}

// Select genérico para cualquier item del navbar que reciba landings
// dinámicas asociadas (vía "relation"). Mismo diseño que FundsSelect.
const NavSelect: React.FC<NavSelectProps> = ({
  label,
  baseHref,
  currentPath,
  items,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const isActive = currentPath.startsWith(baseHref);

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
        {label}
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
          className="lg:absolute top-full left-0 w-full min-w-fit mt-2 bg-transparent lg:bg-[#CDCACA] rounded-[6px] overflow-hidden"
          style={{ zIndex: 3 }}
        >
          {items.map((option) => (
            <li key={option.href}>
              <Link
                href={option.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-2 lg:px-8 lg:py-4 text-secondary font-medium hover:bg-white/30 rounded-[6px] transition-colors"
              >
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavSelect;
