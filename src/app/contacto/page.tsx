'use client';

import ContactBox from '@/components/contacto/ContactBox';
import Form from '@/components/contacto/Form';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import Spinner from '@/components/shared/Spinner';
import { useContactoData } from '@/hooks/useContactoData';
export default function ContactoPage() {
  const { contacto, loading } = useContactoData();

  if (loading || !contacto) {
    return (
      <div>
        <Navbar />

        <div className="py-40 text-center flex justify-center text-gray-500">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-fit">
      <Navbar />
      <div className="w-full bg-white pt-8 flex flex-col gap-20">
        <div className="px-4 pb-5 md:px-[100px] xl:px-[145px] padding-xxl flex flex-col items-center xl:flex-row justify-between">
          <div className="w-full lg:w-[50%] flex flex-col justify-center items-center mb-8 lg:mb-0">
            <HeroSectionGenerico
              title={contacto.title}
              description={contacto.description}
            />
          </div>
          <div className="w-full lg:w-[50%] flex mt-7">
            <ContactBox contacto={contacto} />
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
}
