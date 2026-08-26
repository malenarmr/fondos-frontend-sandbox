'use client';
import DesktopCarousel from '@/components/inicio/DesktopCarousel';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import TestInversorForm from '@/components/test-inversor/TestInversorForm';
import { useHomeCards } from '@/hooks/useHomeCards';

export default function TestInversorPage() {
  const heroData = {
    title: 'Test del inversor',
    description:
      'El test del inversor es una herramienta que determina la relación entre lo que esperamos percibir de una inversión y el riesgo que asumimos. Definirlo, es el primer paso para determinar la inversión que mejor se adapta a tus necesidades.',
  };
  const cards = useHomeCards();

  return (
    <main className="font-encode-sans">
      <Navbar />
      {/* TODO alineado, mismo container */}
      <div className="px-4 md:px-[100px] xl:px-[145px] padding-xxl mx-auto py-8 flex flex-col gap-10 items-center">
        <div className="w-full">
          <HeroSectionGenerico
            title={heroData.title}
            description={heroData.description}
            bgColor="bg-light-aqua-green"
          />
        </div>
        <div className="w-full">
          <TestInversorForm />
        </div>
      </div>
      <div className="bg-primary-light ">
        <DesktopCarousel cards={cards} />
      </div>
    </main>
  );
}
