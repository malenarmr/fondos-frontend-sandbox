import Button from '@/components/shared/Button';
import { Header, SimpleCard } from '@/types/DinamicLanding';
import { _capitalize } from 'chart.js/helpers';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface Props {
  header: Header;
  description: SimpleCard;
}

export default function HeaderDinamicPage({ header, description }: Props) {
  return (
    <div className="h-[80vh] flex flex-col gap-[15vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-end">
        <div className="w-full">
          <h1 className="w-full break-words text-start lg:text-left font-encode-sans font-extrabold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-6 max-w-[590px] px-[50px] lg:px-0">
            {_capitalize(header.title || '')}
          </h1>
          <div
            className="font-encode-sans font-normal text-[16px] xl:text-[20px]
           leading-5 xl:leading-6 text-secondary text-left
           lg:max-w-[630px] space-y-4 px-4 md:px-8 xl:px-0 xl:mr-24"
          >
            <p>{header.description}</p>
          </div>
        </div>
        <div className="pb-8 flex justify-start lg:justify-end w-full pt-8 lg:pt-0 px-[50px]">
          <Link href={header.button_link}>
            <Button variant="light"> {header.button_text}</Button>
          </Link>
        </div>
      </div>

      <div
        className="bg-[#2098A1] h-fit min-h-fit shadow-xl p-[4rem] rounded-tl-[6px] rounded-tr-[20px]
    rounded-br-[6px] rounded-bl-[20px] "
      >
        <div className="w-[80%] h-full flex flex-col gap-5 justify-around">
          <p className="font-bold text-2xl text-white ">{description.title}</p>
          <div className="prose prose-invert max-w-none text-xl prose-p:text-white">
            {' '}
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {description.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
