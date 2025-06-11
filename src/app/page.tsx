'use client';

import VideosSection from '@/components/guia/VideosSection';
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

      <AnimationSection />

      <div className="relative bg-[#2098A1] pt-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/home/BGHome.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
            opacity: 0.2,
          }}
        />

        <FeaturedCarousel />
      </div>

      <div className="py-16 lg:py-[150px]">
        <div className="flex flex-col items-center">
          <div className="container mx-auto px-6 xl:px-40 space-y-8 mb-8 flex justify-between gap-10">
            <h1 className="font-encode-sans text-2xl lg:text-4xl text-secondary font-bold lg:font-black">
              Conocé más sobre cómo invertir con videos tutoriales
            </h1>
            <Link href="/tutoriales">
              <Button variant="light">Ver todos los videos</Button>
            </Link>
          </div>
          <VideosSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}
