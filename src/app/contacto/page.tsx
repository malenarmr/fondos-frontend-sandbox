'use client';

import AsistentesSection from '@/components/contacto/AsistentesSection';
import ContactBox from '@/components/contacto/ContactBox';
import Footer from '@/components/shared/Footer';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import { useContactoData } from '@/hooks/useContactoData';

export default function ContactoPage() {
  const { contacto, loading } = useContactoData();

  if (loading || !contacto)
    return (
      <main>
        <Navbar />
        <div className="py-40 text-center text-gray-500">Cargando...</div>
        <Footer />
      </main>
    );

  return (
    <main>
      <Navbar />
      <div className="w-full bg-white pt-8 pb-20 ">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Columna izquierda: título y descripción, centrado vertical */}
          <div className="flex-1 flex flex-col justify-center">
            <HeroSectionGenerico
              title={contacto.title}
              description={contacto.description}
            />
          </div>
          {/* Columna derecha: ContactBox, mismo margen superior que la izquierda */}
          <div className="flex-1 flex items-center justify-center lg:mt-8">
            <ContactBox contacto={contacto} />
          </div>
        </div>
      </div>
      <AsistentesSection
        asistentes={contacto.contactos_seccion.contacto}
        sectionTitle={contacto.contactos_seccion.title}
      />
      <Footer />
    </main>
  );
}
