'use client';

import AnimationSection from '@/components/invierta/AnimationSection';
import BenefitsSection from '@/components/invierta/BenefitsSection';

import ProductsSectionInvertia from '@/components/invierta/ProductsSection';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/shared/HeroSection';
import Navbar from '@/components/shared/NavBar';
import PreFooterSection from '@/components/shared/PrefooterSection';
import Image from 'next/image';

const items = [
  {
    title: 'Test del inversor',
    bgColor: '#005A63',
    textColor: '#FFFFFF',
    textButton: 'Próximamente',
    borderRadius: '50px 0 0 0',
    link: '/test-inversor',
    description: (
      <p
        className="font-encode-sans text-lg mb-8 leading-5"
        style={{ color: '#FFFFFF' }}
      >
        Cuando conocés tu perfil, podés elegir la mejor alternativa
        <br /> entre todas las variedades de inversión. ¡Hacé el test y definí
        <br /> tu perfil!
      </p>
    ),
  },
  {
    title: 'Manual Invierta',
    bgColor: '#00E89A',
    textColor: '#3C3C3B',
    textButton: 'Descargar manual',
    borderRadius: '0 50px 0 0',
    link: 'https://pbursatil-my.sharepoint.com/personal/tgutierrez_provinciabursatil_com_ar/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ftgutierrez%5Fprovinciabursatil%5Fcom%5Far%2FDocuments%2FDatos%20adjuntos%2FInvierta%20Manual%20de%20Usuario%20v%2E1%2E09%2E00%2Epdf&parent=%2Fpersonal%2Ftgutierrez%5Fprovinciabursatil%5Fcom%5Far%2FDocuments%2FDatos%20adjuntos&ga=1',
    description: (
      <p className="font-encode-sans text-lg mb-8 leading-5">
        ¿Querés saber cómo operar desde la APP invierta? <br />
        Descargá el manual y gestioná tu dinero de manera ágil.
      </p>
    ),
  },
];

export default function InviertaPage() {
  return (
    <main>
      <Navbar />
      <div className="text-center lg:text-left">
        <HeroSection
          title="Tus inversiones en un solo lugar. ¡Ahora con Invierta es 100% online!"
          animation="/inversiones/03_Inversiones.json"
          id="invierta"
        >
          <>
            <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-primary leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
              Una app pensada para vos. ¡Es hora! Abrí tu cuenta en simples
              pasos
              <br className={'hidden xl:block'} /> y operá desde donde estés.
              Invertí con Invierta de
              <br className={'hidden xl:block'} /> Provincia Bursátil. Estás a
              minutos de tu próxima
              <br className={'hidden xl:block'} /> inversión. ¡Descárgala ahora!
            </p>
            <div className="mt-10 xl:mt-14 text-primary">
              <div className="flex gap-4 justify-center xl:justify-start">
                <button className="flex items-center border text-primary rounded-[10px] px-6 py-5 transition duration-200 hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/home/AppStore.svg"
                    alt="Apple icon"
                    width={110}
                    height={110}
                    className="m-0 xl:mr-2"
                  />
                </button>
                <button className="flex items-center border text-primary rounded-[10px] px-6 py-5 transition-shadow duration-200 hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/home/PlayStore.svg"
                    alt="Play Store icon"
                    width={110}
                    height={110}
                    className="m-0 xl:mr-2"
                  />
                </button>
              </div>
            </div>
          </>
        </HeroSection>
        <BenefitsSection />
        <ProductsSectionInvertia>
          <div className="container">
            <h1 className="text-xl lg:text-4xl mb-7 mx-auto text-primary font-black">
              ¡Potenciá tus ahorros!
            </h1>
          </div>
        </ProductsSectionInvertia>
        <AnimationSection />
        <PreFooterSection items={items} />
        <Footer />
      </div>
    </main>
  );
}
