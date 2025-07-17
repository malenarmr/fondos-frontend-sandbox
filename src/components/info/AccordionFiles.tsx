'use client';

import { useAppContext } from '@/context/AppContext';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LiaDownloadSolid } from 'react-icons/lia';

interface File {
  title: string;
  files: {
    id: string;
    name: string;
    file: {
      id: string;
      url: string;
    };
  }[];
}

export default function AccordionFiles() {
  const [isOpen, setIsOpen] = useState(-1);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { provinciaApiClient } = useAppContext();

  const handleOpen = (index: number) => {
    setIsOpen((prevIsOpen) => (prevIsOpen === index ? -1 : index));
  };

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response =
          await provinciaApiClient.fondos.informacionParaInversor.getAll();
        setFiles(response.data.data as File[]);
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
    <div id="accordion-collapse" data-accordion="collapse" className="px-0">
      {files.map((file, index) => (
        <div
          key={index}
          onClick={() => handleOpen(index)}
          className={`mb-4 transition-all duration-300 rounded-tr-xl rounded-bl-xl rounded-tl rounded-br`}
        >
          <div className="bg-[#2098A1] px-4 md:px-16 transition-all duration-300 rounded-tr-xl rounded-bl-xl rounded-tl rounded-br">
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
                  className={`font-encode-sans font-[18px] font-semibold transition duration-200 text-white text-start`}
                >
                  {file.title}
                </span>
                <div className="relative w-10 h-10">
                  <ChevronUpIcon
                    className={`absolute top-1/2 text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ${isOpen === index ? 'opacity-1 scale-100' : 'opacity-0 scale-95'}`}
                  />
                  <ChevronDownIcon
                    className={`absolute top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ${isOpen !== index ? 'opacity-1 scale-100' : 'opacity-0 scale-95'}`}
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
            <div className="grid lg:grid-cols-2 pb-4">
              {file.files.map((urlFiles, i) => {
                return (
                  <Link
                    href={urlFiles.file.url}
                    key={i}
                    className="font-encode-sans py-3 lg:py-6 text-left px-2 lg:px-5 text-secondary flex gap-2 items-center font-medium transition duration-200 lowercase hover:font-bold"
                  >
                    <LiaDownloadSolid className="h-8 w-8 lg:h-5 lg:w-5" />
                    {urlFiles.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
