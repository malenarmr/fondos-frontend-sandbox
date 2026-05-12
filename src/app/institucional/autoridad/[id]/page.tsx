'use client';

import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import { useAppContext } from '@/context/AppContext';
import type { Authority } from '@/services/institutionalService';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function AutoridadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { getAuthorityById, institucionalLoading, institucionalData } =
    useAppContext();
  const [authority, setAuthority] = useState<Authority | null>(null);

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

      <div className="relative py-8 md:py-16 font-encode-sans min-h-[80vh]">
        {/* FONDO INSTITUCIONAL */}
        <div
          className="absolute inset-0 top-1/4 md:top-1/4 w-full z-0"
          style={{
            backgroundImage: "url('/institucional/bg-institucional.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
            opacity: 1, // bajalo si es muy fuerte, ej: 0.8
            minHeight: '60vh',
          }}
          aria-hidden="true"
        />

        {/* CONTENIDO */}
        <div className="container mx-auto px-4 relative z-10">
          <div
            className="p-8 sm:p-24 max-w-3xl mx-auto font-encode-sans"
            style={{
              borderRadius: '8px',
              background: 'var(--Blanco, #FFF)',
              boxShadow: '0px 4px 32px rgba(146,146,146,0.17)',
              position: 'relative',
            }}
          >
            <div className="flex flex-col mb-6 md:mb-8 items-center">
              <div className="w-24 h-32 md:w-64 md:h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src={authority.image.url || '/placeholder.svg'}
                  alt={authority.name}
                  width={256}
                  height={320}
                  className="object-cover w-full h-full rounded-[20px]"
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-primary font-encode-sans text-center">
                {authority.name}
              </h1>
              <p className="text-[#008996] font-medium font-encode-sans text-center">
                {authority.role}
              </p>
            </div>

            {/* Renderizar markdown como en Noticias */}
            <div className="prose max-w-none text-sm md:text-base font-encode-sans prose-ul:list-disc prose-ol:list-decimal prose-li:my-1">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {
                  // Igual que en Noticias: reemplazamos <br> por saltos para listas/negritas
                  (authority.description ?? '').replace(/<br\s*\/?>/gi, '\n')
                }
              </ReactMarkdown>
            </div>

            <div className="mt-6 md:mt-8 flex justify-center font-encode-sans">
              <Button
                variant="primary"
                onClick={() => router.push('/institucional')}
              >
                Volver a Nosotros
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
