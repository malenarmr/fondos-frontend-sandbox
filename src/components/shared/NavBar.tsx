// src/components/shared/NavBar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-navbar">
      <div className="w-full px-4 lg:px-[50px] flex justify-between items-center py-5 relative">
        {/* Logo */}
        <div className="w-60 max-w-full">
          <Link href="/" legacyBehavior>
            <a className="block w-full">
              <Image
                src="/Capa_1.svg"
                alt="logo"
                width={100}
                height={50}
                className="w-full"
              />
            </a>
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
          <ul className="flex flex-col space-y-4 text-primary lg:flex-row lg:space-y-0 lg:space-x-5 lg:items-center lg:whitespace-nowrap">
            <ListItem href="/invierta" currentPath={pathname}>
              App Invierta
            </ListItem>
            <ListItem href="/inversiones" currentPath={pathname}>
              Inversiones
            </ListItem>
            <ListItem href="/guia" currentPath={pathname}>
              Guía del inversor
            </ListItem>
            <ListItem href="/institucional" currentPath={pathname}>
              Institucional
            </ListItem>
            <ListItem href="/noticias" currentPath={pathname}>
              Noticias
            </ListItem>
            <li>
              <Link
                href="https://app.provinciabursatil.com.ar/#!/login?originalUrl="
                target="_blank"
                rel="noopener noreferrer"
                legacyBehavior
              >
                <a>
                  <Button
                    variant="secondary"
                    style={{ fontWeight: '600', height: 35, width: 150 }}
                  >
                    Ingresar
                  </Button>
                </a>
              </Link>
            </li>
            <li>
              <Link
                href="https://app.provinciabursatil.com.ar/#!/registration/email?originalUrl="
                target="_blank"
                rel="noopener noreferrer"
                legacyBehavior
              >
                <a>
                  <Button style={{ fontWeight: '600', height: 35, width: 150 }}>
                    Abrir cuenta
                  </Button>
                </a>
              </Link>
            </li>
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
      <Link href={href} legacyBehavior>
        <a
          className={`flex py-2 text-sm font-medium whitespace-nowrap hover:text-dark ${
            isActive ? 'text-secondary' : ''
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};
