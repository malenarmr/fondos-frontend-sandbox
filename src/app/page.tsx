'use client';

import VideosSection from '@/components/info/VideosSection';
import DesktopCarousel from '@/components/inicio/DesktopCarousel';
import FeaturedCarousel from '@/components/inicio/FeaturedCarousel';
import AnimationSection from '@/components/invierta/AnimationSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import PopupAvisoFondos from '@/components/shared/PopupAvisoFondos';
import { useHomeCards } from '@/hooks/useHomeCards';
import { fetchAvisoFondos } from '@/services/popupFondosService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const cards = useHomeCards();

  // Popup de aviso de operaciones (nuevo)
  const [showAviso, setShowAviso] = useState(false);
  const [aviso, setAviso] = useState<null | {
    title: string;
    description: string;
    buttonText?: string | null;
  }>(null);

  useEffect(() => {
    fetchAvisoFondos().then((data) => {
      if (data) {
        setAviso(data);
        setShowAviso(true);
      }
    });
  }, []);

  return (
    <main>
      {/* Popup arriba de todo */}
      {showAviso && aviso && (
        <PopupAvisoFondos
          title={aviso.title}
          description={aviso.description}
          buttonText={aviso.buttonText || 'Continuar'}
          onClose={() => setShowAviso(false)}
        />
      )}

      <Navbar />

      <div className="bg-primary-light ">
        <DesktopCarousel cards={cards} />
      </div>

      <section className="py-[30px] lg:pb-[70px] px-4 md:px-[100px] xl:px-[145px] padding-xxl">
        <AnimationSection />
      </section>

      <div className="relative bg-[#2098A1] pt-20 pb-0 overflow-visible">
        {/* Fondo patrón */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/home/BGHome.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
            opacity: 0.2,
          }}
        />
        {/* Card flotante */}
        <div className="relative z-10 flex justify-center">
          <div className="w-full flex justify-center">
            <div className="translate-y-[20%] ">
              <FeaturedCarousel />
            </div>
          </div>
        </div>
      </div>
      {/* Franja blanca suficientemente alta */}
      <div className="relative z-0 bg-white" style={{ minHeight: 180 }}></div>
      <div className="relative z-0 bg-white" style={{ minHeight: 80 }}></div>

      <section>
        <div className="dark:bg-dark px-[50px] md:px-[100px] xl:px-[145px] padding-xxl ">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 text-center lg:text-start">
            <h1 className="font-encode-sans text-[30px] lg:text-4xl text-secondary font-extrabold lg:font-black leading-snug">
              Conocé más sobre <br className="hidden lg:block " /> cómo invertir
            </h1>
            <div className="hidden lg:block">
              <Link href="/tutoriales">
                <Button variant="light">Ver todos los videos</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex lg:pl-12 flex-col">
          <VideosSection />
        </div>
        <div className="flex lg:hidden justify-center pb-10 lg:pb-0">
          <Link href="/tutoriales">
            <Button variant="light">Ver todos los videos</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
