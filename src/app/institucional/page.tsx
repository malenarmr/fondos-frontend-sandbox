'use client';

import AutoridadesSection from '@/components/institucional/AutoridadesSection';
import AvisoLegalSection from '@/components/institucional/AvisoLegalSection';
import HeroSectionInstitucional from '@/components/institucional/HeroSectionInstitucional';
import InstitucionalCard from '@/components/institucional/InstitucionalCard';
import { MobileAutoridadesAccordion } from '@/components/institucional/MobileAccordion';
import MobileCarousel from '@/components/shared/MobileCarousel';
import Navbar from '@/components/shared/NavBar';
import { useAppContext } from '@/context/AppContext';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function InstitucionalPage() {
  const { institucionalData, institucionalLoading, institucionalError } =
    useAppContext();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const FULL_TEXT = `La información presentada en este informe corresponde a Provinfondos S.A. Sociedad Gerente de Fondos Comunes de Inversión. La misma solo tiene carácter informativo y corresponde al período especificado. Los rendimientos corresponden a datos históricos y no son indicadores de tendencias futuras. Las inversiones en cuotapartes del fondo no constituyen depósitos en la Sociedad Depositaria a los fines de la Ley de Entidades Financieras ni cuentan con ninguna de las garantías que tales depósitos a la vista o plazo puedan gozar, de acuerdo con la legislación y reglamentación aplicables en materia de depósitos en entidades financieras. Asimismo, la sociedad Depositaria, se encuentra impedida por normas del BCRA, de asumir, tácita o expresamente, compromiso alguno en cuanto al mantenimiento, en cualquier momento, del valor del capital convertido, al rendimiento, al valor del rescate de las cuotapartes o al otorgamiento de liquidez a tal fin.`;

  const SHORT_TEXT = `La información presentada en este informe corresponde a Provinfondos S.A. Sociedad Gerente de Fondos Comunes de Inversión. La misma solo tiene carácter informativo y corresponde al período especificado. Los rendimientos...`;
  if (institucionalLoading) {
    return (
      <main>
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-dark-teal border-t-transparent rounded-full animate-spin"></div>
        </div>
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
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      {/* Hero con paddings controlados */}
      <div className="px-4 md:px-[100px] xl:px-[145px] padding-xxl">
        <HeroSectionInstitucional />
      </div>

      {/* Misión/Visión/Valores */}
      <section className="mt-16 bg-primary-light py-12">
        <div className="px-4 md:px-[100px] xl:px-[145px] padding-xxl">
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
            <div className="flex justify-between gap-12">
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
        </div>
      </section>

      {/* Autoridades */}
      <section className="mt-16">
        <div className="px-4 md:px-[100px] xl:px-[145px] padding-xxl">
          {isMobile ? <MobileAutoridadesAccordion /> : <AutoridadesSection />}
        </div>
      </section>

      {/* Aviso legal */}
      <AvisoLegalSection FULL_TEXT={FULL_TEXT} SHORT_TEXT={SHORT_TEXT} />
    </main>
  );
}
