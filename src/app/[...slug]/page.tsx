import Navbar from '@/components/shared/NavBar';
import { DynamicLanding } from '@/types/DinamicLanding';
import { notFound } from 'next/navigation';
import HeaderDinamicPage from '@/components/dinamicPage/Header';
import SectionButtons from '@/components/dinamicPage/SectionCardsImages';
import Questions from '@/components/dinamicPage/Questions';
import MoreInfo from '@/components/dinamicPage/MoreInfo';
import Faqs from '@/components/dinamicPage/Faqs';
import AvisoLegalSection from '@/components/institucional/AvisoLegalSection';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getLandings() {
  const response = await fetch('http://localhost:1337/api/dinamic-landings');

  if (!response.ok) {
    throw new Error('Error al obtener las landings');
  }

  return response.json();
}

export default async function DynamicLandingPage({ params }: PageProps) {
  const { slug } = await params;

  const path = `/${slug.join('/')}`;

  const response = await getLandings();

  const landing: DynamicLanding = response.data.find(
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
  console.log(landing.faqs);
  return (
    <main>
      <Navbar />

      <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl mb-10">
        <HeaderDinamicPage
          header={landing.header}
          description={landing.description}
        />
        <SectionButtons section={landing.sectionCardsImages} />
        <Questions section={landing.sectionQuestions} />
        <MoreInfo section={landing.moreInfo} />
      </div>
      <br />
      <Faqs section={landing.faqs} />
      <div className="h-[80vh] bg-white"></div>
      <AvisoLegalSection
        FULL_TEXT={landing.legal.description}
        SHORT_TEXT={truncate(landing.legal.description)}
      />
      {/* Franja blanca suficientemente alta */}
    </main>
  );
}
