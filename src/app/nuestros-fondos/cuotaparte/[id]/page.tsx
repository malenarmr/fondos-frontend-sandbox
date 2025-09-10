'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/shared/NavBar';
import Footer from '@/components/shared/Footer';
import NotFoundPage from '@/app/not-found';
import CuotaparteDetails from '@/components/invierta/Cuotaparte';
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
    textButton: 'Hacer el test',
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

export default function CuotapartePage() {
  const params = useParams();
  const id = params.id;

  if (typeof id !== 'string') return <NotFoundPage />;

  return (
    <main>
      <Navbar />

      <CuotaparteDetails id={id} />

      <PreFooterSection items={items} />

      <Footer />
    </main>
  );
}
