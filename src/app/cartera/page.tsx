import ChartSection from '@/components/cartera/ChartSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/shared/HeroSection';
import Navbar from '@/components/shared/NavBar';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import Link from 'next/link';

Chart.register(CategoryScale);

export default function CarteraPage() {
  return (
    <main>
      <Navbar />

      <HeroSection
        title="Carteras sugeridas"
        animation="/carteras/05_CarterasEficientes.json"
        id="cartera"
      >
        <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-primary leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
          Dependiendo tu tipo de perfil de inversor, te proponemos una cartera
          distinta, para hacer rendir mejor tu dinero.
        </p>
      </HeroSection>

      <ChartSection />

      <div
        className="py-20 px-6 grid gap-8 justify-center text-center text-white relative rounded-t-[40px]"
        style={{
          background: 'linear-gradient(124deg, #008996 22.18%, #00C3B3 70.32%)',
        }}
      >
        <h2 className="font-encode-sans font-black text-[25px] md:text-[45px]">
          ¿Querés saber <br />
          qué tipo de inversor sos?
        </h2>
        <p className="font-encode-sans text-[16px] md:text-xl mb-6">
          ¿Sos más conservador o te gusta asumir riesgos?
          <br /> Hacé nuestro test en minutos y encontrá la mejor estrategia de
          inversión para vos.
        </p>
        <Link href="/test-inversor">
          <Button style={{ width: 'fit-content', margin: '0 auto' }}>
            Hacé el test!
          </Button>
        </Link>
      </div>

      <Footer />
    </main>
  );
}
