import AccordionFaq from '@/components/guia/AccordionFaq';
import VideosSection from '@/components/guia/VideosSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/shared/HeroSection';
import Navbar from '@/components/shared/NavBar';
import PreFooterSection from '@/components/shared/PrefooterSection';
import Link from 'next/link';

const items = [
  {
    title: 'Carteras sugeridas',
    bgColor: '#005A63',
    textColor: '#FFFFFF',
    textButton: 'Descubrí más',
    borderRadius: '50px 0 0 0',
    link: '/cartera',
    description: (
      <p
        className="font-encode-sans text-lg mb-8 leading-5"
        style={{ color: '#FFFFFF' }}
      >
        Determiná tu perfil de inversor y accedé a las diferentes carteras sin
        necesidad de conocimientos previos. Maximizá tu rentabilidad,
        diversificá tus inversiones y alcanzá tus metas financieras.
      </p>
    ),
  },
  {
    title: 'Aprendé sobre inversiones',
    bgColor: '#00E89A',
    textColor: '#3C3C3B',
    textButton: 'Ir al simulador',
    borderRadius: '0 50px 0 0',
    link: '/simulador',
    description: (
      <p className="font-encode-sans text-lg mb-8 leading-5">
        El simulador de inversiones te permite jugar a ser inversionista,
        probando estrategias y aprendiendo a manejar tu plata sin arriesgar un
        solo peso.
      </p>
    ),
  },
];

export default function GuiaPage() {
  return (
    <main>
      <Navbar />

      <HeroSection
        title="Guía para el inversor"
        animation="/guia/04_GuiadelInversor.json"
        id="guia"
      >
        <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] text-primary leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
          En la guia para el inversor vas a poder encontrar distintas
          herramientas para conocer más sobre el mundo de la inversión: videos
          tutoriales, test del inversor, simulador de inversiones, etc.
        </p>
      </HeroSection>

      <div className="container mx-auto">
        <div className="space-y-8 py-16 lg:py-[150px] flex flex-col items-center px-6 md:px-16">
          <h1 className="font-encode-sans text-2xl lg:text-4xl text-primary font-bold lg:font-black">
            Test del inversor
          </h1>
          <p className="text-center lg:text-left text-[16px] lg:text-lg">
            El test del inversor es una herramienta que determina la relación
            entre lo que esperamos
            <br className="hidden lg:block" /> percibir de una inversión y el
            riesgo que asumimos. Definirlo, es el primer paso para determinar
            <br className="hidden lg:block" /> la inversión que mejor se adapta
            a tus necesidades.
          </p>
          <Link href="/test-inversor">
            <Button>Comenzar!</Button>
          </Link>
        </div>
      </div>

      <PreFooterSection items={items} />

      <div className="py-16 lg:py-[150px]">
        <div className="text-center flex flex-col items-center">
          <div className="container mx-auto px-6 xl:px-40 space-y-8 mb-8">
            <h1 className="font-encode-sans text-2xl lg:text-4xl text-primary font-bold lg:font-black">
              ¡Mirá nuestros videos!
            </h1>
            <p className="text-[16px] lg:text-lg">
              Aprendé de los expertos con nuestros videos. Te brindamos toda la
              información necesaria para
              <br className="hidden lg:block" /> que inviertas de manera
              inteligente.
              <br /> ¡Convertite en un profesional de las finanzas!
            </p>
          </div>
          <VideosSection />
          <Link href="/tutoriales">
            <Button>Ver todos los videos</Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="space-y-8 text-center pt-10 lg:pt-0 pb-24 px-6">
          <h1 className="font-encode-sans text-2xl lg:text-4xl text-primary font-bold lg:font-black">
            Preguntas frecuentes
          </h1>
          <p className="text-[16px] lg:text-lg">
            Con nuestros videos tutoriales vas a poder conocer paso a paso cómo
            operar. Usá los
            <br /> instructivos para saldar dudas.
          </p>
          <AccordionFaq />
        </div>
      </div>

      <Footer />
    </main>
  );
}
