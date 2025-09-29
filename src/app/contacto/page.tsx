'use client';

import ContactBox from '@/components/contacto/ContactBox';
import Footer from '@/components/shared/Footer';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import Spinner from '@/components/shared/Spinner';
import { useContactoData } from '@/hooks/useContactoData';

export default function ContactoPage() {
  const { contacto, loading } = useContactoData();

  if (loading || !contacto)
    return (
      <main>
        <Navbar />
        <div className="py-40 text-center flex justify-center text-gray-500">
          <Spinner />
        </div>
        <Footer />
      </main>
    );

  return (
    <main>
      <Navbar />
      <div className="w-full bg-white pt-8 pb-20">
        <div className="px-4 md:px-[100px] xl:px-[145px] padding-xxl flex flex-col xl:flex-row justify-between">
          {/* Columna izquierda: título y descripción */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center items-center mb-8 lg:mb-0">
            <HeroSectionGenerico
              title={contacto.title}
              description={contacto.description}
            />
          </div>
          {/* Columna derecha: ContactBox */}
          <div className="w-full lg:w-[50%] flex mt-7">
            <ContactBox contacto={contacto} />
          </div>
        </div>
      </div>
      {/* <AsistentesSection
        asistentes={contacto.contactos_seccion.contacto}
        sectionTitle={contacto.contactos_seccion.title}
      /> */}
      <Footer />
    </main>
  );
}
