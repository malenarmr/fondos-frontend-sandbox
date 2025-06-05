'use client';

import MobileInviertaSection from '@/components/institucional/MobileInviertaSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import PromoSection from '@/components/shared/PromoSection';
import { useAppContext } from '@/context/AppContext';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { Authority } from '@/services/institutionalService';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AutoridadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { getAuthorityById, institucionalLoading, institucionalData } =
    useAppContext();
  const [authority, setAuthority] = useState<Authority | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!institucionalLoading && institucionalData) {
      const authorityData = getAuthorityById(id);
      setAuthority(authorityData);
    }
  }, [id, getAuthorityById, institucionalLoading, institucionalData]);

  if (institucionalLoading) {
    return (
      <main>
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-dark-teal border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!authority) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-red-500 py-8">
            Autoridad no encontrada
          </div>
          <div className="text-center">
            <Link
              href="/institucional"
              className="text-dark-teal flex items-center justify-center gap-2"
            >
              <ChevronLeft size={20} />
              Volver a Institucional
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div
        className="py-8 md:py-16 font-encode-sans"
        style={{
          background: 'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
        }}
      >
        <div className="container mx-auto px-4">
          <div
            className="p-12 sm:p-24 max-w-3xl mx-auto font-encode-sans"
            style={{
              borderRadius: '8px',
              background: 'var(--Blanco, #FFF)',
              boxShadow: '0px 4px 32px rgba(146,146,146,0.57)',
            }}
          >
            <div className="flex flex-col mb-6 md:mb-8">
              <div className="w-24 h-32 md:w-64 md:h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src={authority.image.url || '/placeholder.svg'}
                  alt={authority.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full rounded-[20px]"
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-primary font-encode-sans">
                {authority.name}
              </h1>
              <p className="text-[#008996] font-medium font-encode-sans">
                {authority.role}
              </p>
            </div>

            <div className="prose max-w-none text-sm md:text-base font-encode-sans">
              {authority.description.split('\n').map((para, i) => (
                <p key={i} className="mb-4 text-gray-700">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-6 md:mt-8 flex justify-center font-encode-sans">
              <Button onClick={() => router.push('/institucional')}>
                Ver todos
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only Invierta section */}
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

      {/* Desktop promotion section */}
      {!isMobile && (
        <div
          style={{
            background:
              'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
          }}
        >
          <PromoSection
            title="¿Querés invertir en dólar MEP?"
            description="Operá desde Invierta, descubrí nuevas oportunidades y gestioná tu dinero de manera simple, rápida y segura."
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
