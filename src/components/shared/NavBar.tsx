'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FundsSelect from './SelectNavbar';
import NavSelect from './NavSelect';

// Item devuelto por /api/dinamic-landings-navbar
interface DynamicNavItem {
  id: number;
  documentId: string;
  path: string;
  relation: string; // href del item del navbar al que se asocia
  title: string; // texto a mostrar en el link
}

// Config estática del navbar. "href" es lo que se compara contra "relation".
interface StaticNavItem {
  key: string;
  href: string;
  label: string;
}

const NAV_ITEMS: StaticNavItem[] = [
  { key: 'institucional', href: '/institucional', label: 'Institucional' },
  { key: 'fondos', href: '/nuestros-fondos', label: 'Nuestros Fondos' },
  { key: 'info', href: '/info', label: 'Info para el inversor' },
  { key: 'contacto', href: '/contacto', label: 'Contacto' },
  { key: 'noticias', href: '/noticias', label: 'Informes' },
];
const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dynamicItems, setDynamicItems] = useState<DynamicNavItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchDynamicNavItems = async () => {
      try {
        const response = await fetch(
          'https://provincia-prod-api.teocoop.site/api/dinamic-landings-navbar'
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setDynamicItems(data?.data ?? []);
      } catch (error) {
        console.error('Error fetching dynamic navbar items:', error);
      }
    };

    fetchDynamicNavItems();
  }, []);

  // Items dinámicos cuya "relation" matchea el href de un item estático
  const getRelatedItems = (label: string) =>
    dynamicItems.filter((item) => item.relation === label);

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
            {NAV_ITEMS.map((navItem) => {
              const related = getRelatedItems(navItem.label);

              // "Nuestros Fondos" ya es un select propio (filtro por moneda).
              // Le sumamos los items dinámicos que le correspondan.
              if (navItem.key === 'fondos') {
                return (
                  <FundsSelect
                    key={navItem.key}
                    currentPath={pathname}
                    extraItems={related.map((item) => ({
                      href: item.path,
                      label: item.title,
                    }))}
                  />
                );
              }

              // Cualquier otro item que tenga landings dinámicas asociadas
              // se convierte en select automáticamente.
              if (related.length > 0) {
                return (
                  <NavSelect
                    key={navItem.key}
                    label={navItem.label}
                    baseHref={navItem.href}
                    currentPath={pathname}
                    items={[
                      { href: navItem.href, label: navItem.label },
                      ...related.map((item) => ({
                        href: item.path,
                        label: item.title,
                      })),
                    ]}
                  />
                );
              }

              // Sin relación dinámica: link simple, como siempre.
              return (
                <ListItem
                  key={navItem.key}
                  href={navItem.href}
                  currentPath={pathname}
                >
                  {navItem.label}
                </ListItem>
              );
            })}
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
