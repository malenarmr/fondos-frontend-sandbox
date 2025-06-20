import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/shared/HeroSection';
import Navbar from '@/components/shared/NavBar';
import SimuladorSection from '@/components/simulador/SimuladorSection';
import Link from 'next/link';

export default function SimuladorPage() {
  return (
    <main>
      <Navbar />

      <section className="rounded-b-[50px] py-20 dark:bg-dark md:px-[100px] xl:px-[145px]">
        <div
          className={`flex flex-col-reverse xl:flex-row items-center justify-between mx-auto`}
        >
          <div className="flex flex-col text-primary">
            <h1 className="text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-12 max-w-[590px]">
              Simulador de fondos
            </h1>
            <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-secondary leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
              Usá el simulador de fondos para analizar y comparar diferentes
              <br />
              fondos según sus rendimientos pasados.
            </p>
          </div>
        </div>
      </section>
      <SimuladorSection />

      <section className="pt-6">
        <HeroSection
          title="¿Querés saber qué tipo de inversor sos?"
          animation="/carteras/05_CarterasEficientes.json"
          id="cartera"
          bgColor="bg-[#2098A1]"
          textColor="text-white"
        >
          <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-white leading-5 xl:leading-6 px-[50px] md:w-[555px] xl:px-0 xl:mr-0 mb-12">
            ¿Sos más conservador o te gusta asumir riesgos? Hacé nuestro test en
            minutos y encontrá la mejor estrategia de inversión para vos.
          </p>
          <div>
            <Link href="/test-inversor" passHref>
              <Button variant="sky">Hacé el test</Button>
            </Link>
          </div>
        </HeroSection>
      </section>

      <Footer />
    </main>
  );
}
