'use client';

import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

export interface Faq {
  question: string;
  answer: string;
}
interface Props {
  faqs: Faq[];
  loading: boolean;
  error?: string;
}

export default function AccordionFaq({ faqs, loading, error }: Props) {
  const [isOpen, setIsOpen] = useState(-1);
  // const [faqs, setFaqs] = useState<Faq[]>([]);

  const handleOpen = (index: number) => {
    setIsOpen((prevIsOpen) => (prevIsOpen === index ? -1 : index));
  };

  const mdSchema = {
    ...defaultSchema,
    attributes: {
      ...(defaultSchema.attributes || {}),
      a: ['href', 'title', 'rel', 'target'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    },
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="px-0">
      {faqs.map((question, index) => (
        <div
          key={index}
          onClick={() => handleOpen(index)}
          className={`text-white mb-4 bg-[#a3dbc7] transition-all duration-300 rounded-tr-xl rounded-bl-xl rounded-tl rounded-br`}
        >
          <div className="bg-white px-4 md:px-16 transition-all duration-300 rounded-tr-xl rounded-bl-xl rounded-tl rounded-br">
            <h2
              id={`accordion-collapse-heading-${index} rounded-xl transition-all duration-300`}
            >
              <button
                type="button"
                className="flex items-center justify-between w-full p-2 lg:p-5 rtl:text-right gap-3"
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
              >
                <span
                  className={`font-encode-sans font-[18px] font-semibold transition duration-200 text-secondary text-start`}
                >
                  {question.question}
                </span>
                <div className="relative w-10 h-10">
                  <ChevronUpIcon
                    className={`absolute top-1/2 text-secondary left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ${isOpen === index ? 'opacity-1 scale-100' : 'opacity-0 scale-95'}`}
                  />
                  <ChevronDownIcon
                    className={`absolute top-1/2 left-1/2 text-secondary transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ${isOpen !== index ? 'opacity-1 scale-100' : 'opacity-0 scale-95'}`}
                  />
                </div>
              </button>
            </h2>
          </div>
          <div
            id="accordion-collapse-body-1"
            className={`${isOpen === index ? 'open' : 'hidden'} transition-all duration-300 px-4 md:px-16 rounded-bl-xl rounded-br`}
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div>
              <div className="font-encode-sans py-6 text-left px-2 lg:px-5 font-[18px] text-secondary">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, [rehypeSanitize, mdSchema]]}
                  components={{
                    a: (props) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-primary"
                      />
                    ),
                    img: (props) => (
                      <Image
                        src={String(props.src || '')}
                        alt={props.alt || ''}
                        width={600}
                        height={400}
                        className="max-w-full h-auto"
                      />
                    ),
                  }}
                >
                  {question.answer}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
