import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import SimuladorSection from '@/components/simulador/SimuladorSection';
import Image from 'next/image';
import Link from 'next/link';

export default function SimuladorPage() {
  return (
    <main>
      <Navbar />

      <section className="rounded-b-[50px] bg-light-aqua-green py-20 dark:bg-dark md:px-[100px] xl:px-[145px]">
        <div
          className={`flex flex-col-reverse xl:flex-row items-center justify-between mx-auto`}
        >
          <div className="flex flex-col text-primary">
            <h1 className="text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary mb-7 xl:mb-12 max-w-[590px]">
              Simulador de inversiones
            </h1>
            <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-primary leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
              Explicación del simulador Explicación del simulador Explicación
              del simulador Explicación del simulador
            </p>
          </div>
        </div>
      </section>
      <SimuladorSection />
      <div className="py-20 grid gap-8 justify-center text-center relative bg-[#005A63] rounded-t-[50px] text-white px-6">
        <h2 className="font-encode-sans font-black text-2xl lg:text-5xl">
          ¿Querés invertir en dólar MEP?
        </h2>
        <p className="font-encode-sans text-md lg:text-xl mb-6">
          Comprá y vendé activos, descubrí nuevas oportunidades y gestioná tu
          dinero
          <br className="hidden lg:block" /> de manera simple, rápida y segura.
        </p>
        <div className="flex justify-center gap-8">
          {/* App Store */}
          <Link
            href="https://apps.apple.com/app/id6448729005"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-gray-300 text-primary rounded-[10px] px-6 py-5 transition duration-200 hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]"
          >
            <Image
              src="/home/AppStore.svg"
              alt="Apple icon"
              width={110}
              height={110}
              className="m-0 xl:mr-2"
            />
          </Link>

          {/* Play Store */}
          <Link
            href="https://play.google.com/store/apps/details?id=io.btrader.prbu&hl"
            target="_blank"
            rel="noopener noreferrer"
            className="
            flex items-center border border-gray-300 text-primary rounded-[10px] px-6 py-5 transition duration-200 hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.35)] "
          >
            <Image
              src="/home/PlayStore.svg"
              alt="Play Store icon"
              width={110}
              height={110}
              className="m-0 xl:mr-2"
            />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
