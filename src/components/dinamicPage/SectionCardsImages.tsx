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
    <div className="h-fit flex !px-0 flex-col items-center gap-[7vh] my-5">
      <h1 className="w-full text-center font-encode-sans font-bold text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-[#3C3C3B]-light ">
        {section.title}
      </h1>
      <div className="grid grid-cols-2 gap-y-5 gap-x-8 w-full">
        {section.cards.map((c) => (
          <div
            className="h-[295px] w-full grid grid-cols-3 text-[#3C3C3B] px-3 bg-white shadow-[5px_5px_44px_rgba(0,0,0,0.1)] rounded-tl-[6px] rounded-tr-[20px]
    rounded-br-[6px] rounded-bl-[20px] place-items-center"
            key={c.id}
          >
            <div className="h-full flex items-center">
              <Image
                src={`http://localhost:1337${c.image.url}`}
                height={200}
                width={200}
                alt={c.image.alternativeText || ''}
                className="object-cover w-full"
              />
            </div>
            <div className="gap-2 col-span-2">
              <p className="font-bold w-[80%] text-lg mb-2">{c.title}</p>
              <div className="text-md ">
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
  );
}
