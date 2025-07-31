'use client';

import VideosSectionWithFilters from '@/components/info/VideosSection';
import DesktopCarousel from '@/components/inicio/DesktopCarousel';
import FeaturedCarousel from '@/components/inicio/FeaturedCarousel';
import AnimationSection from '@/components/invierta/AnimationSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import { useHomeCards } from '@/hooks/useHomeCards';
import Link from 'next/link';

export default function HomePage() {
  const cards = useHomeCards();

  return (
    <main>
      <Navbar />

      <DesktopCarousel cards={cards} />

      <section className="lg:rounded-t-[50px] py-[30px] lg:pb-[70px] flex flex-col items-center mb-5 lg:mb-[-50px] px-4 lg:px-20">
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
            <div
              className="translate-y-[20%]" // <-- AHORA ES POSITIVO
            >
              <FeaturedCarousel />
            </div>
          </div>
        </div>
      </div>
      {/* Franja blanca suficientemente alta */}
      <div className="relative z-0 bg-white" style={{ minHeight: 180 }}></div>

      {/* Franja blanca que empieza justo debajo */}
      <div className="relative z-0 bg-white" style={{ minHeight: 80 }}></div>

      <div className="py-16 lg:py-[150px]">
        <div className="flex flex-col items-center">
          <div className="container mx-auto px-6 xl:px-40 mb-8 flex justify-between items-center gap-10">
            <h1 className="font-encode-sans text-2xl lg:text-4xl text-secondary font-bold lg:font-black">
              Conocé más sobre cómo invertir
            </h1>
            <Link href="/tutoriales">
              <Button variant="light">Ver todos los videos</Button>
            </Link>
          </div>

          <VideosSectionWithFilters />
        </div>
      </div>

      <Footer />
    </main>
  );
}
