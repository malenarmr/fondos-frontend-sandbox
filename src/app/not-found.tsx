'use client';

import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import PreFooterSection from '@/components/shared/PrefooterSection';
import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const items = [
  {
    title: 'Llegó Invierta!',
    bgColor: '#005A63',
    textColor: '#FFFFFF',
    textButton: 'Descargar Invierta!',
    borderRadius: '50px 0 0 0',
    description: (
      <p
        className="font-encode-sans text-lg mb-8 leading-5"
        style={{ color: '#FFFFFF' }}
      >
        Con INVIERTA podés dar tus primeros pasos
        <br /> en el mundo de las inversiones sin
        <br /> complicaciones. Gestioná tu dinero de manera
        <br /> simple, rápida y segura.
      </p>
    ),
  },
];

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
      <div
        className="relative w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #008996, #00C3B3)' }}
      >
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
            <PreFooterSection items={items} />
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
                variant="primary"
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
