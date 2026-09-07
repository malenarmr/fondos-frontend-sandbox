import Navbar from '@/components/shared/NavBar';

import { DynamicLanding } from '@/types/DinamicLanding';

import { notFound } from 'next/navigation';

import HeaderDinamicPage from '@/components/dinamicPage/Header';

import SectionButtons from '@/components/dinamicPage/SectionCardsImages';

import Questions from '@/components/dinamicPage/Questions';

import MoreInfo from '@/components/dinamicPage/MoreInfo';

import Faqs from '@/components/dinamicPage/Faqs';

import AvisoLegalSection from '@/components/institucional/AvisoLegalSection';

import VideosComponent from '@/components/dinamicPage/Videos';
import DescriptionDinamicPage from '@/components/dinamicPage/Description';

//import mockData from '@/utils/mockData.json';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getLandings() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dinamic-landings`
  );

  if (!response.ok) {
    throw new Error('Error al obtener las landings');
  }

  return response.json();
}
// async function getLandings(): Promise<DynamicLanding[]> {
//   try {
//     const respuesta = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/dinamic-landings`
//     );
//     console.log(respuesta, 'aaaaaaaaaaa');
//     if (!respuesta.ok) {
//       throw new Error('Ocurrió un error en la red: ' + respuesta.statusText);
//     }

//     const datos = await respuesta.json();

//     console.log(datos.data, 'dataaaaaaaaaaaaaaaaaa');

//     return datos.data;
//   } catch (error) {
//     console.error('Error al realizar la consulta:', error);

//     return [];
//   }
//   // return mockData.data;
// }

export default async function DynamicLandingPage({ params }: PageProps) {
  const { slug } = await params;

  const path = `/${slug.join('/')}`;
  const response = await getLandings();
  const landing = response.data.find(
    (item: DynamicLanding) => item.path === path
  );
  if (!landing) {
    notFound();
  }

  function truncate(text: string, maxLength: number = 200): string {
    if (text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);

    return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
  }

  return (
    <main>
      <Navbar />
      {/*
        Todas las secciones son opcionales (dependen de qué esté publicado
        en el backoffice). Para que la distancia entre secciones sea siempre
        la misma sin importar cuáles estén presentes, la separación vive acá,
        en un único `gap` del contenedor, y no como margin/padding suelto en
        cada sección: un `gap` solo se aplica entre hijos que realmente se
        renderizan, así que distintas combinaciones de secciones quedan
        siempre espaciadas igual.
      */}
      <div className="pt-12 flex flex-col gap-16 md:gap-24 lg:gap-[15vh]">
        {(landing.header || landing.description) && (
          <div className="dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl gap-12 lg:gap-[15vh] flex flex-col">
            {landing.header && <HeaderDinamicPage header={landing.header} />}
            {landing.description && (
              <DescriptionDinamicPage description={landing.description} />
            )}
          </div>
        )}
        {landing.sectionCardsImages && (
          // sectionCardsImages tiene su propio fondo y debe quedar pegada a
          // la sección siguiente para dar continuidad visual, así que acá
          // cancelamos puntualmente el gap del contenedor (en vez de sacarla
          // del flujo con gap, que rompería la separación uniforme del resto).
          <div className="-mb-16 md:-mb-24 lg:-mb-[15vh]">
            <SectionButtons section={landing.sectionCardsImages} />
          </div>
        )}
        {landing.sectionQuestions && (
          <Questions section={landing.sectionQuestions} />
        )}
        {landing.moreInfo && (
          <div className="dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl flex items-center justify-center">
            <MoreInfo section={landing.moreInfo} />
          </div>
        )}
        {landing.faqs && <Faqs section={landing.faqs} />}
        {landing.video_seccion_fondos?.length > 0 && (
          <VideosComponent videos={landing.video_seccion_fondos} />
        )}
        {landing.legal && (
          <AvisoLegalSection
            FULL_TEXT={landing.legal.description}
            SHORT_TEXT={truncate(landing.legal.description)}
          />
        )}
      </div>
      {/* Franja blanca suficientemente alta */}
    </main>
  );
}
