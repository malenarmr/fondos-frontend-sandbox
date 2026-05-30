'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-navbar sticky top-0 z-50">
      <div className="w-full px-4 lg:px-[50px] flex justify-evenly items-center py-5 relative">
        {/* Logo */}
        <div className="w-60 max-w-full h-[65px] min-h-[65px]">
          <Link href="/" className="w-full h-full">
            <div className="relative h-[65px] max-h-[65px] w-full">
              <Image
                src="/Logo-raices.png"
                alt="logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        {/* Botón hamburguesa (solo <lg) */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden flex flex-col justify-between w-6 h-5"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-[2px] w-[30px] bg-[#005A63]" />
          ))}
        </button>

        {/* Menú */}
        <nav
          className={`${open ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-white shadow-md rounded-lg p-6 lg:static lg:block lg:bg-transparent lg:shadow-none lg:p-0 lg:right-auto lg:left-auto`}
          style={{ zIndex: 3 }}
        >
          <ul className="flex flex-col space-y-4 gap-8 text-secondary lg:flex-row lg:space-y-0 lg:space-x-5 lg:items-center lg:whitespace-nowrap">
            <ListItem href="/institucional" currentPath={pathname}>
              Institucional
            </ListItem>
            <ListItem href="/nuestros-fondos" currentPath={pathname}>
              Nuestros Fondos
            </ListItem>
            <ListItem href="/info" currentPath={pathname}>
              Info para el inversor
            </ListItem>
            <ListItem href="/contacto" currentPath={pathname}>
              Contacto
            </ListItem>
            <ListItem href="/noticias" currentPath={pathname}>
              Informes
            </ListItem>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

interface ListItemProps {
  href: string;
  children: React.ReactNode;
  currentPath: string;
}

const ListItem: React.FC<ListItemProps> = ({ href, children, currentPath }) => {
  const isActive = currentPath === href;
  return (
    <li>
      <Link
        href={href}
        className={`flex py-2 text-md  whitespace-nowrap hover:text-dark ${
          isActive ? 'font-bold' : 'font-medium'
        }`}
      >
        {children}
      </Link>
    </li>
  );
};
