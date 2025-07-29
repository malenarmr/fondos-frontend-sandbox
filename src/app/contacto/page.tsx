'use client';

import AsistentesSection from '@/components/contacto/AsistentesSection';
import ContactBox from '@/components/contacto/ContactBox';
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
      <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between">
        {/* Título y descripción */}
        <div className="w-full pb-20 flex flex-col lg:flex-row lg:items-stretch lg:justify-between">
          {/* Columna izquierda: Título */}
          <div className="flex-1 flex flex-col justify-center pt-8 pl-8">
            <HeroSectionGenerico
              title={heroData.title}
              description={heroData.description}
              bgColor="bg-light-aqua-green"
            />
          </div>
          {/* Columna derecha: ContactBox centrado vertical */}
          <div className="flex-1 flex justify-center items-center pt-8 pr-8">
            <ContactBox />
          </div>
        </div>
      </div>
      <AsistentesSection />
      <Footer />
    </main>
  );
}
