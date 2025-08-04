// src/app/test-inversor/resultado/page.tsx

'use client';
export const dynamic = 'force-dynamic';

import MobileInviertaSection from '@/components/institucional/MobileInviertaSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import PromoSection from '@/components/shared/PromoSection';
// NUEVO: importá el componente de fondos sugeridos
import ResultadoFondosSugeridos from '@/components/test-inversor/ResultadoFondosSugeridos';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  InvestorProfile,
  getInvestorProfile,
} from '@/services/testInversorService';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ResultadoContent() {
  const params = useSearchParams();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const value = Number(params.get('value') || 0);

  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getInvestorProfile(value)
      .then((data) => setProfile(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [value]);

  if (loading) {
    return <p className="text-center py-16">Cargando resultado…</p>;
  }

  if (error || !profile) {
    return (
      <main>
        <Navbar />
        <div className="text-center text-red-500 py-16">
          No se encontró el perfil
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="font-encode-sans">
      <Navbar />

      {/* Fondo con gradient */}
      <div
        className="min-h-screen flex items-center py-16"
        style={{
          background: 'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
        }}
      >
        <div
          className="max-w-sm sm:max-w-3xl mx-auto p-4 sm:p-12 bg-white rounded-[8px] shadow-[0_4px_32px_rgba(146,146,146,0.57)]"
          style={{ borderRadius: '8px' }}
        >
          <h1 className="text-center text-md font-semibold text-primary mb-2">
            Perfil del inversor
          </h1>
          <h2 className="text-3xl font-extrabold text-center mb-4 text-primary">
            {profile.title}
          </h2>
          <p className="text-center mb-2">{profile.description}</p>
          <p className="text-center text-secondary mb-4">
            {profile.shortDescription}
          </p>
          {/* Acá usamos el nuevo componente */}
          <ResultadoFondosSugeridos fondos={profile.our_founds || []} />

          <div className="flex justify-center items-center gap-4 mt-6 w-full">
            <Button
              onClick={() => router.push('/test-inversor')}
              variant="secondary"
            >
              Volver a hacer el test
            </Button>
            <Button onClick={() => router.push('/simulador')}>
              Simulá tu inversión
            </Button>
          </div>
        </div>
      </div>

      {/* — Componente con activos sugerencia de cartera — */}
      {isMobile && (
        <div
          style={{
            background:
              'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
          }}
        >
          <MobileInviertaSection />
        </div>
      )}

      {!isMobile && (
        <div
          style={{
            background:
              'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
          }}
        >
          <PromoSection
            title="¿Querés invertir en dólar MEP?"
            description="Comprá y vendé activos, descubrí nuevas oportunidades y gestioná tu dinero de manera simple, rápida y segura."
            appStoreUrl="https://apps.apple.com/app/id6448729005"
            playStoreUrl="https://play.google.com/store/apps/details?id=io.btrader.prbu&hl"
            wrapperClassName="bg-[#005A63] py-16 rounded-t-[40px]"
            innerContainerClassName="container mx-auto px-4 text-center text-white"
            titleClassName="text-4xl font-bold mb-4"
            descriptionClassName="max-w-2xl mx-auto mb-8 font-encode-sans"
            buttonWrapperClassName="flex justify-center gap-8"
          />
        </div>
      )}

      <Footer />
    </main>
  );
}

export default function ResultadoPage() {
  return (
    <Suspense
      fallback={<p className="text-center py-16">Cargando resultado…</p>}
    >
      <ResultadoContent />
    </Suspense>
  );
}
