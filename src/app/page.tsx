'use client';

import VideosSection from '@/components/info/VideosSection';
import HeroCarousel from '@/components/inicio/HeroCarousel';
import FeaturedCarousel from '@/components/inicio/FeaturedCarousel';
import AnimationSection from '@/components/invierta/AnimationSection';
import Button from '@/components/shared/Button';
import Navbar from '@/components/shared/NavBar';
import PopupAvisoFondos from '@/components/shared/PopupAvisoFondos';
import { fetchAvisoFondos } from '@/services/popupFondosService';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Videos } from '@/types/DinamicLanding';
import { useAppContext } from '@/context/AppContext';

export default function HomePage() {
  const { provinciaApiClient } = useAppContext();

  // Popup de aviso de operaciones (nuevo)
  const [showAviso, setShowAviso] = useState(false);
  const [aviso, setAviso] = useState<null | {
    title: string;
    description: string;
    buttonText?: string | null;
  }>(null);
  const [videos, setVideos] = useState<Videos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchAvisoFondos().then((data) => {
      if (data) {
        setAviso(data);
        setShowAviso(true);
      }
    });
  }, []);
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await provinciaApiClient.fondos.videoTutorial.getAll();
        setVideos(response.data.data as Videos[]);
      } catch {
        setError('Error al cargar preguntas frecuentes');
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [provinciaApiClient]);
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

      <HeroCarousel />

      <section className="py-[30px] lg:pb-[70px] px-4 md:px-[100px] xl:px-[145px] padding-xxl">
        <AnimationSection />
      </section>

      <div className="relative bg-[#3998a1] pt-20 pb-0 overflow-visible">
        {/* Fondo patrón */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/home/BGHome-2.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
            opacity: 1,
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
          <VideosSection videos={videos} error={error} loading={loading} />
        </div>
        <div className="flex lg:hidden justify-center pb-10 lg:pb-0">
          <Link href="/tutoriales">
            <Button variant="light">Ver todos los videos</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
