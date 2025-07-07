import CategoriesSection from '@/components/invierta/CategoriesSection';
import FondosSection from '@/components/invierta/FondosSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import PreFooterSection from '@/components/shared/PrefooterSection';
import Link from 'next/link';

const APP_STORE_LINK = 'https://apps.apple.com/us/app/invierta/id6448729005';

const items = [
  {
    title: 'Proyectá con el simulador de rendimientos',
    bgColor: '#009B67',
    textColor: '#FFFFFF',
    textButton: 'Ir al simulador',
    borderRadius: '50px 0 0 0',
    link: APP_STORE_LINK,
    description: (
      <p
        className="font-encode-sans text-lg mb-8 leading-5"
        style={{ color: '#FFFFFF' }}
      >
        Enterate de cómo operaron los fondos en los últimos períodos. Podés
        compararlos y analizar cómo rindieron para tomar las mejores decisiones
      </p>
    ),
  },
  {
    title: 'Conocé más sobre cómo invertir con videos tutoriales',
    bgColor: '#2098A1',
    textColor: '#FFFFFF',
    textButton: 'Ver todos los videos',
    borderRadius: '0 50px 0 0',
    popup: true,
    description: (
      <p className="font-encode-sans text-lg mb-8 leading-5">
        Recibí nuestra información
        <br />y enterate de las últimas novedades
      </p>
    ),
  },
];

export default function NuestrosFondosPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-white dark:bg-dark">
        <div className="">
          {/* <div className="md:px-6 lg:px-8 xl:px-[100px]"> */}
          <FondosSection />
        </div>
      </section>

      <div className="md:px-[100px] xl:px-[145px] py-20 bg-[#EBEBEB]">
        <div className="flex justify-between items-center">
          <div className="w-3/4">
            <h1 className="font-encode-sans text-2xl lg:text-4xl text-secondary font-bold lg:font-black mb-6">
              Conocé más sobre cómo
              <br /> invertir con videos tutoriales
            </h1>
            <CategoriesSection />
          </div>

          <Link href="/tutoriales">
            <Button variant="light">Ver todos los videos</Button>
          </Link>
        </div>
      </div>

      <PreFooterSection items={items} />

      <Footer />
    </main>
  );
}
