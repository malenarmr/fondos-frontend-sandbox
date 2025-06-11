'use client';

import { useAppContext } from '@/context/AppContext';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Faq {
  question: string;
  answer: string;
}

export default function AccordionFaq() {
  const [isOpen, setIsOpen] = useState(-1);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { provinciaApiClient } = useAppContext();

  const handleOpen = (index: number) => {
    setIsOpen((prevIsOpen) => (prevIsOpen === index ? -1 : index));
  };

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await provinciaApiClient.bursatil.faqs.getAll();
        setFaqs(response.data.data as Faq[]);
      } catch {
        setError('Error al cargar preguntas frecuentes');
      } finally {
        setLoading(false);
      }
    }

    fetchFaqs();
  }, [provinciaApiClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      id="accordion-collapse"
      data-accordion="collapse"
      className="px-0 md:px-[100px]"
    >
      {faqs.map((question, index) => (
        <div
          key={index}
          onClick={() => handleOpen(index)}
          className={`text-white px-4 md:px-16 border-black border-t ${index + 1 === faqs.length && 'border-b'}`}
        >
          <h2 id={`accordion-collapse-heading-${index} rounded-xl`}>
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 rtl:text-right gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span
                className={`font-encode-sans font-[18px] font-semibold transition duration-200 ${isOpen === index && 'text-[#00C3B3]'}`}
              >
                {question.question}
              </span>
              <div className="border border-[#00C3B3] rounded-full relative w-8 h-8">
                <MinusIcon
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ${isOpen === index ? 'opacity-1 scale-100' : 'opacity-0 scale-95'}`}
                />
                <PlusIcon
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ${isOpen !== index ? 'opacity-1 scale-100' : 'opacity-0 scale-95'}`}
                />
              </div>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            className={`${isOpen === index ? 'open' : 'hidden'} transition-all duration-300`}
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div>
              <p className="font-encode-sans pb-6 text-left px-5 font-[18px]">
                {question.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
