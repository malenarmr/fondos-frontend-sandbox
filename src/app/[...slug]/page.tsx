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

import mockData from '@/utils/mockData.json';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getLandings(): Promise<DynamicLanding[]> {
  return mockData.data;
}

export default async function DynamicLandingPage({ params }: PageProps) {
  const { slug } = await params;

  const path = `/${slug.join('/')}`;

  const landings = await getLandings();

  const landing = landings.find((item) => item.path === path);

  if (!landing) {
    notFound();
  }

  function truncate(text: string, maxLength: number = 200): string {
    if (text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);

    return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
  }

  // resto del componente...

  return (
    <main>
      <Navbar />
      <div className="pt-12 mb-[8rem] dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl ">
        {landing.description && landing.header && (
          <HeaderDinamicPage
            header={landing.header}
            description={landing.description}
          />
        )}
      </div>
      {landing.sectionCardsImages && (
        <SectionButtons section={landing.sectionCardsImages} />
      )}
      {landing.sectionQuestions && (
        <Questions section={landing.sectionQuestions} />
      )}
      <div className="pt-[25vh] dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl mb-10">
        {landing.moreInfo && <MoreInfo section={landing.moreInfo} />}
      </div>
      <br />
      {landing.faqs && <Faqs section={landing.faqs} />}
      {landing.video_seccion_fondos && (
        <div className="py-20">
          <VideosComponent videos={landing.video_seccion_fondos} />
        </div>
      )}

      {landing.legal && (
        <AvisoLegalSection
          FULL_TEXT={landing.legal.description}
          SHORT_TEXT={truncate(landing.legal.description)}
        />
      )}
      {/* Franja blanca suficientemente alta */}
    </main>
  );
}
