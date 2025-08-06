'use client';

import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main>
      <Navbar />
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#009B67]">
        {' '}
        {isMobile ? (
          <div className="relative w-full flex flex-col items-center">
            <div className="w-full max-w-md px-4 py-8">
              <Image
                src="/01_404-mobile.svg"
                alt="Error 404"
                width={411}
                height={325}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="w-full flex justify-center mb-8">
              <Button
                onClick={() => (window.location.href = '/')}
                variant="primary"
              >
                Volver al home
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
              <Image
                src="/01_404-desktop.svg"
                alt="Error 404"
                width={1440}
                height={550}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="mt-4 mb-8">
              <Button
                onClick={() => (window.location.href = '/')}
                variant="sky"
              >
                Volver al home
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
