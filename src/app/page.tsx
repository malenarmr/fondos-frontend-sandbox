'use client';

import DesktopCarousel from '@/components/inicio/DesktopCarousel';
import FeaturedCarousel from '@/components/inicio/FeaturedCarousel';
import InvestorTestSection from '@/components/inicio/InvestorTestSection';
import AlliesSection from '@/components/shared/AlliesSection';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import ProductsSection from '@/components/shared/ProductsSection';
import { useFeaturedCards } from '@/hooks/useFeaturedCard';

import { useHomeCards } from '@/hooks/useHomeCards';

export default function HomePage() {
  const cards = useHomeCards();
  const featuredItems = useFeaturedCards();

  return (
    <main>
      <Navbar />

      {/* ==== CAROUSEL DINÁMICO ==== */}
      {cards.length > 0 && (
        <div className="px-0 lg:px-[50px]">
          <DesktopCarousel cards={cards} />
        </div>
      )}

      {/* ==== SECCIÓN TEST DE INVERSOR ==== */}
      <InvestorTestSection />

      {/* ==== DESTACADO DINÁMICO ==== */}
      {featuredItems.length > 0 && <FeaturedCarousel items={featuredItems} />}

      {/* ==== SECCIÓN DE PRODUCTOS ==== */}
      <ProductsSection>
        <h1
          className="
            font-encode-sans font-bold text-primary text-center
            text-[25px] sm:text-5xl mb-4
          "
        >
          ¡Conocés todos nuestros activos!
        </h1>
        <p
          className="
            font-encode-sans font-normal text-primary text-center
            text-[16px] sm:text-xl mb-8
          "
        >
          Somos Provincia Bursátil, un ecosistema fintech 100% digital que
          apuesta a fomentar la cultura del ahorro <br />y el cuidado de tu
          dinero. Nuestra meta es generar un mercado de capitales más inclusivo.
        </p>
      </ProductsSection>

      {/* ==== NUESTROS ALIADOS ==== */}
      <div className="space-y-8 text-center my-8 px-4">
        <h1
          className="
            font-encode-sans font-bold text-primary text-center
            text-[25px] sm:text-5xl
          "
        >
          Nuestros aliados en el mercado
        </h1>
        <p
          className="
            font-encode-sans font-normal text-primary text-center
            text-[16px] sm:text-xl
          "
        >
          Trabajamos con referentes del sector para garantizar seguridad <br />y
          confianza en cada inversión:
        </p>
      </div>

      <AlliesSection />
      <Footer />
    </main>
  );
}
