// src/app/test-inversor/resultado/page.tsx

'use client';
export const dynamic = 'force-dynamic';

import DesktopCarousel from '@/components/inicio/DesktopCarousel';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import Spinner from '@/components/shared/Spinner';
// NUEVO: importá el componente de fondos sugeridos
import ResultadoFondosSugeridos from '@/components/test-inversor/ResultadoFondosSugeridos';
import { useHomeCards } from '@/hooks/useHomeCards';
import {
  InvestorProfile,
  getInvestorProfile,
} from '@/services/testInversorService';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ResultadoContent() {
  const params = useSearchParams();
  const router = useRouter();
  const value = Number(params.get('value') || 0);
  const cards = useHomeCards();

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
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
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
      <div className="relative py-8 md:py-16 font-encode-sans min-h-[80vh]">
        {/* FONDO INSTITUCIONAL */}
        <div
          className="absolute inset-0 top-1/4 md:top-1/4 w-full z-0"
          style={{
            backgroundImage: "url('/institucional/bg-institucional.jpg')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
            opacity: 1,
            minHeight: '60vh',
          }}
          aria-hidden="true"
        />
        {/* CONTENIDO */}
        <div className="container mx-auto px-4 relative z-10">
          <div
            className="max-w-sm sm:max-w-3xl mx-auto p-4 sm:p-12 bg-white rounded-[8px] shadow-[0_4px_32px_rgba(146,146,146,0.57)]"
            style={{ borderRadius: '8px' }}
          >
            <div className="px-20">
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
              <div className="px-20 py-4">
                <ResultadoFondosSugeridos fondos={profile.our_founds || []} />
              </div>

              <div className="flex justify-center items-center gap-4 mt-6 w-full">
                <Button
                  onClick={() => router.push('/test-inversor')}
                  variant="secondary"
                >
                  Volver a hacer el test
                </Button>
                <Button
                  variant="light"
                  onClick={() => router.push('/simulador')}
                >
                  Simulá tu inversión
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-light ">
        <DesktopCarousel cards={cards} />
      </div>

      <Footer />
    </main>
  );
}

export default function ResultadoPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-16">
          <Spinner />
        </div>
      }
    >
      <ResultadoContent />
    </Suspense>
  );
}
