'use client';

import Footer from '@/components/shared/Footer';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import PromoSection from '@/components/shared/PromoSection';

export default function NoticiasPage() {
  const heroData = {
    title: 'Contactanos',
    description:
      'Podes encontrarnos en nuestras redes sociales, en las sucursales o ponerte en contacto con cualquiera de nuestros operadores.',
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

        <PromoSection
          title="¿Querés invertir en dólar MEP?"
          description="Operá desde Invierta, descubrí nuevas oportunidades y gestioná tu dinero de manera simple, rápida y segura."
          appStoreUrl="https://apps.apple.com/us/app/invierta/id6448729005"
          playStoreUrl="https://play.google.com/store/apps/details?id=io.btrader.prbu&hl"
          wrapperClassName="py-20 px-6 grid gap-8 justify-center text-center text-white relative rounded-t-[40px]"
          wrapperStyle={{
            background:
              'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
          }}
          buttonWrapperClassName="text-primary"
        />

        <Footer />
      </div>
    </main>
  );
}
