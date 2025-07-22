'use client';

import AsistentesSection from '@/components/contacto/AsistentesSection';
import Footer from '@/components/shared/Footer';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';

export default function NoticiasPage() {
  const heroData = {
    title: 'Contactanos',
    description:
      'Podés encontrarnos en nuestras redes sociales, en las sucursales o ponerte en contacto con cualquiera de nuestros operadores.',
  };

  return (
    <main>
      <Navbar />
      <div className="text-center lg:text-left">
        <HeroSectionGenerico
          title={heroData.title}
          description={heroData.description}
          bgColor="bg-light-aqua-green"
        />

        <AsistentesSection />

        <Footer />
      </div>
    </main>
  );
}
