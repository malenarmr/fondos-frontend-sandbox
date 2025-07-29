'use client';
import AutoridadesSection from '@/components/institucional/AutoridadesSection';
import AvisoLegalSection from '@/components/institucional/AvisoLegalSection';
import HeroSectionInstitucional from '@/components/institucional/HeroSectionInstitucional';
import InstitucionalCard from '@/components/institucional/InstitucionalCard';
import { MobileAutoridadesAccordion } from '@/components/institucional/MobileAccordion';
import MobileInviertaSection from '@/components/institucional/MobileInviertaSection';
import Footer from '@/components/shared/Footer';
import MobileCarousel from '@/components/shared/MobileCarousel';
import Navbar from '@/components/shared/NavBar';
import { useAppContext } from '@/context/AppContext';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function InstitucionalPage() {
  const { institucionalData, institucionalLoading, institucionalError } =
    useAppContext();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (institucionalLoading) {
    return (
      <main>
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-dark-teal border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (institucionalError) {
    return (
      <main>
        <Navbar />
        <div className="text-center text-red-500 py-8">
          {institucionalError}
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      {/* Header section - responsive for mobile */}
      <div className="px-4 md:px-0">
        <HeroSectionInstitucional />
      </div>

      {/* Sección de Misión, Visión y Valores - Carousel on mobile */}
      <section className="mt-16 bg-primary-light py-12 px-4 md:px-36">
        {isMobile ? (
          <MobileCarousel>
            <InstitucionalCard
              title="Misión"
              description={institucionalData?.mision || ''}
            />
            <InstitucionalCard
              title="Visión"
              description={institucionalData?.vision || ''}
            />
            <InstitucionalCard
              title="Valores"
              description={institucionalData?.values || ''}
            />
          </MobileCarousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            <InstitucionalCard
              title="Misión"
              description={institucionalData?.mision || ''}
            />
            <InstitucionalCard
              title="Visión"
              description={institucionalData?.vision || ''}
            />
            <InstitucionalCard
              title="Valores"
              description={institucionalData?.values || ''}
            />
          </div>
        )}
      </section>

      {/* Sección de Autoridades - Accordion on mobile */}
      <section className="mt-16">
        <div className="px-4 md:px-36">
          {isMobile ? <MobileAutoridadesAccordion /> : <AutoridadesSection />}
        </div>
      </section>
      <AvisoLegalSection />

      {/* Mobile-only Invierta section */}
      <MobileInviertaSection />

      <Footer />
    </main>
  );
}
