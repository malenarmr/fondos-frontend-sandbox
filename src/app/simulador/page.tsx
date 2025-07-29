import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import SimuladorSection from '@/components/simulador/SimuladorSection';
import JsonAnimation from '@/components/shared/LottieAnimation';
import Link from 'next/link';

export default function SimuladorPage() {
  return (
    <main>
      <Navbar />

      <section className="rounded-b-[50px] py-10 lg:py-20 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
        <div
          className={`flex flex-col-reverse xl:flex-row items-center justify-between mx-auto`}
        >
          <div className="flex flex-col text-primary">
            <h1 className="text-center xl:text-left font-encode-sans font-extrabold xl:font-black text-[30px] xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-12 max-w-[590px] px-[50px] lg:px-0">
              Simulador de fondos
            </h1>
            <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-secondary leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
              Usá el simulador de fondos para analizar y comparar diferentes
              <br />
              fondos según sus rendimientos.
            </p>
          </div>
        </div>
      </section>
      <SimuladorSection />

      <section className="lg:pt-6">
        <div className="bg-[#2098A1] py-10 lg:py-16 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl">
          <div className="flex flex-col-reverse xl:flex-row items-center justify-between mx-auto">
            <div className="flex flex-col text-primary">
              <h1 className="text-start lg:text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary mb-7 xl:mb-12 max-w-[555px] text-white px-[50px] xl:px-0">
                ¿Querés saber qué tipo de inversor sos?
              </h1>
              <p className="text-start lg:text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-white leading-5 xl:leading-6 px-[50px] md:w-[555px] xl:px-0 xl:mr-0 mb-12">
                ¿Sos más conservador o te gusta asumir riesgos? Hacé nuestro
                test en minutos y encontrá la mejor estrategia de inversión para
                vos.
              </p>
              <div className="px-[50px] xl:px-0">
                <Link href="/test-inversor" passHref>
                  <Button variant="sky">Hacé el test</Button>
                </Link>
              </div>
            </div>
            {/* Imagen */}
            <div className="animation-svg overflow-hidden flex items-center justify-center w-[300px] h-[250px] lg:w-[500px] lg:h-[430px]">
              <JsonAnimation src="/shared/03_Checklist.json" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
