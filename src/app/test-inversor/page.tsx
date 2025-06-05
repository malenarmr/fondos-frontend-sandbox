'use client';
import Footer from '@/components/shared/Footer';
import HeroSectionGenerico from '@/components/shared/HeroSectionGenerico';
import Navbar from '@/components/shared/NavBar';
import PreFooterSection from '@/components/shared/PrefooterSection';
import TestInversorForm from '@/components/test-inversor/TestInversorForm';

export default function TestInversorPage() {
  const heroData = {
    title: 'Test del inversor',
    description:
      'El test del inversor es una herramienta que determina la relación entre lo que esperamos percibir de una inversión y el riesgo que asumimos. Definirlo, es el primer paso para determinar la inversión que mejor se adapta a tus necesidades.',
  };

  const items = [
    {
      title: 'Test del inversor',
      bgColor: '#005A63',
      textColor: '#FFFFFF',
      textButton: 'Próximamente',
      borderRadius: '50px 0 0 0',
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

  return (
    <main className="font-encode-sans">
      <Navbar />

      {/* Hero section */}
      <div className="px-4 md:px-0">
        <HeroSectionGenerico
          title={heroData.title}
          description={heroData.description}
          bgColor="bg-light-aqua-green"
        />
      </div>

      {/* Test del inversor form */}
      <div className="container mx-auto px-4 py-8">
        <TestInversorForm />
      </div>

      {/* Pre-footer section */}
      <PreFooterSection items={items} />
      <Footer />
    </main>
  );
}
