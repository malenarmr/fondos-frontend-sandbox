import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import InversionesSection from '@/components/ui/inversiones/Inversiones';
import PreFooterSection from '@/components/shared/PrefooterSection';
import AppSection from '@/components/ui/inversiones/AppSection';
import HeroSection from '@/components/shared/HeroSection';

const APP_STORE_LINK = 'https://apps.apple.com/us/app/invierta/id6448729005';

const items = [
  {
    title: 'Accedé a las cotizaciones',
    bgColor: '#005A63',
    textColor: '#FFFFFF',
    textButton: 'Conocer cotización',
    borderRadius: '50px 0 0 0',
    link: APP_STORE_LINK,
    description: (
      <p
        className="font-encode-sans text-lg mb-8 leading-5"
        style={{ color: '#FFFFFF' }}
      >
        Accedé a la información oficial en tiempo real.
      </p>
    ),
  },
  {
    title: 'Inscribite a nuestro Newsletter',
    bgColor: '#00E89A',
    textColor: '#3C3C3B',
    textButton: 'Quiero registrarme',
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

export default function InversionesPage() {
  return (
    <main>
      <Navbar />

      <HeroSection
        title="Inversiones"
        animation="/inversiones/03_Inversiones.json"
        id="inversiones"
      >
        <p
          className="text-center xl:text-left lg:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-primary leading-5 xl:leading-6  md:w-[600px] px-6 md:px-0 xl:mr-4"
          style={{ fontWeight: 400 }}
        >
          Sabemos que cada inversor es único. Conocé todas nuestras alternativas
          de inversión y concretá tus metas financieras.
        </p>
      </HeroSection>

      <section>
        <InversionesSection />
      </section>

      <AppSection />

      <PreFooterSection items={items} />

      <Footer />
    </main>
  );
}
