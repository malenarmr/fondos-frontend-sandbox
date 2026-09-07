'use client';

import Button from '@/components/shared/Button';
import { Header } from '@/types/DinamicLanding';
import { _capitalize } from 'chart.js/helpers';
import Link from 'next/link';

interface Props {
  header: Header;
}

export default function HeaderDinamicPage({ header }: Props) {
  return (
    <div className="lg:min-h-fit">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between px-[50px] items-end">
        <div className="w-full">
          <h1 className="w-full break-words text-start lg:text-left font-encode-sans font-extrabold xl:font-black text-4xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-4 lg:mb-7 xl:mb-6 max-w-[590px] lg:px-0">
            {_capitalize(header.title || '')}
          </h1>
          <div
            className="font-encode-sans font-normal text-[16px] xl:text-[20px]
           leading-5 xl:leading-6 text-secondary text-left
           lg:max-w-[630px] space-y-4 xl:px-0 xl:mr-24  lg:px-0"
          >
            <p>{header.description}</p>
          </div>
        </div>
        <div className="pb-8 flex justify-end lg:justify-end w-full pt-8 lg:pt-0 ">
          <Link href={header.button_link}>
            <Button variant="light"> {header.button_text}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
