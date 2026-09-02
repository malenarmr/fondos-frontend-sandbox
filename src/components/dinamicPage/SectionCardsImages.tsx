import Button from '@/components/shared/Button';
import { SectionWithButtons } from '@/types/DinamicLanding';
import Image from 'next/image';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface Props {
  section: SectionWithButtons;
}

export default function SectionButtons({ section }: Props) {
  return (
    <div className="h-fit flex !px-0 flex-col items-center gap-[7vh] ">
      <h1 className="w-full text-center font-encode-sans font-bold text-2xl xl:text-[40px] leading-[30px] xl:leading-[60px] text-[#3C3C3B]/99">
        {section.title}
      </h1>
      <div
        className="gap-y-8 w-full dark:bg-dark md:px-[100px] xl:px-[145px] padding-xxl pb-20 flex flex-col items-center"
        style={{
          backgroundImage: "url('/background-gris.png')",
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="grid grid-cols-2 gap-y-5 gap-x-8 ">
          {section.cards.map((c) => (
            <div
              key={c.id}
              className="
                    min-h-[220px]
                    w-full
                    grid grid-cols-3
                    items-center
                    px-5 py-10
                    text-[#3C3C3B]
                    bg-white
                    shadow-[5px_5px_44px_rgba(0,0,0,0.1)]
                    rounded-tl-[6px]
                    rounded-tr-[20px]
                    rounded-br-[6px]
                    rounded-bl-[20px]
                  "
            >
              {/* Imagen */}
              <div className="flex h-full items-center justify-center mr-5">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${c.image.url}`}
                  height={100}
                  width={100}
                  alt={c.image.alternativeText || ''}
                />
              </div>

              {/* Contenido */}
              <div className="col-span-2 flex h-full flex-col">
                {/* Título */}
                <div className="flex min-h-[60px] items-start">
                  <p className="w-[90%] xl:w-[80%] text-lg lg:text-md font-bold">
                    {c.title}
                  </p>
                </div>

                {/* Descripción */}
                <div className="text-md lg:text-sm">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {c.description}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href={section.button_link}>
          <Button>{section.button_text}</Button>
        </Link>
      </div>
    </div>
  );
}
