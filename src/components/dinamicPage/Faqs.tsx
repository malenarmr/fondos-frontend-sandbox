'use client';

import { SimpleSection } from '@/types/DinamicLanding';
import AccordionFaq, { Faq } from '../info/AccordionFaq';

interface Props {
  section: SimpleSection;
}
export default function Faqs({ section }: Props) {
  const faqs: Faq[] = section.cards.map((card) => ({
    question: card.title,
    answer: card.description,
    id: card.id,
  }));
  console.log(faqs);
  return (
    <div className="mt-12 py-12 bg-primary-light lg:py-16 px-[30px] md:px-[100px] xl:px-[145px] padding-xxl">
      <div className="space-y-12 text-center lg:pt-0">
        <h1 className="font-encode-sans text-2xl lg:text-4xl text-white font-bold lg:font-black">
          {section.title}
        </h1>
        <AccordionFaq faqs={faqs} loading={false} />
        <div className="flex justify-center">
          <span className="text-white mt-4">
            Si no pudimos responder a tus dudas, podes contactarnos por mail a{' '}
            <a href="mailto:sugerencias@provinfondos.com.ar">
              <b>sugerencias@provinfondos.com.ar</b>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
