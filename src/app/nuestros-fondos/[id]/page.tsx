'use client';

import { useParams } from 'next/navigation';
import FondoDetails from '@/components/invierta/Fondo';
import Navbar from '@/components/shared/NavBar';
import Footer from '@/components/shared/Footer';
import NotFoundPage from '@/app/not-found';
import CategoriesSection from '@/components/invierta/CategoriesSection';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import PreFooterSection from '@/components/shared/PrefooterSection';

const items = [
  {
    title: 'Proyectá con el simulador de rendimientos',
    bgColor: '#009B67',
    textColor: '#FFFFFF',
    textButton: 'Ir al simulador',
    borderRadius: '50px 0 0 0',
    link: '/simulador',
    description: (
      <p
        className="font-encode-sans text-lg mb-8 leading-5"
        style={{ color: '#FFFFFF' }}
      >
        Enterate de cómo operaron los fondos en los últimos períodos. Podés
        compararlos y analizar cómo rindieron para tomar las mejores decisiones.
      </p>
    ),
  },
  {
    title: '¿Querés saber qué tipo de inversor sos?',
    bgColor: '#2098A1',
    textColor: '#FFFFFF',
    textButton: 'Hacé el test',
    borderRadius: '0 50px 0 0',
    link: '/test-inversor',
    description: (
      <p className="font-encode-sans text-lg mb-8 leading-5">
        ¿Sos más conservador o te gusta asumir riesgos? Hacé nuestro test en
        minutos y encontrá la mejor estrategia de inversión para vos.
      </p>
    ),
  },
];

export default function FondoPage() {
  const params = useParams();
  const id = params.id;

  if (typeof id !== 'string') return <NotFoundPage />;

  return (
    <main>
      <Navbar />

      <FondoDetails id={id} />

      <div className="hidden lg:block md:px-[100px] xl:px-[145px] padding-xxl pt-20 pb-24 bg-[#EBEBEB] mb-[-50px]">
        <div className="flex justify-between items-center">
          <div className="w-3/4">
            <h1 className="font-encode-sans text-2xl lg:text-4xl text-secondary font-bold lg:font-black mb-6">
              Conocé más sobre
              <br /> cómo invertir
            </h1>
            <CategoriesSection />
          </div>

          <Link href="/tutoriales">
            <Button variant="light">Ver todos los videos</Button>
          </Link>
        </div>
      </div>

      <PreFooterSection items={items} />

      <Footer />
    </main>
  );
}
