'use client';
import DesktopCarousel from '@/components/inicio/DesktopCarousel';
import Footer from '@/components/shared/Footer';
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

      {/* Hero section */}
      <div className="container mx-auto px-4 py-8">
        <HeroSectionGenerico
          title={heroData.title}
          description={heroData.description}
          bgColor="bg-light-aqua-green"
        />
      </div>

      {/* Test del inversor form */}
      <div className="container mx-auto px-4 py-8">
        <TestInversorForm />
      </div>

      <DesktopCarousel cards={cards} />

      <Footer />
    </main>
  );
}
