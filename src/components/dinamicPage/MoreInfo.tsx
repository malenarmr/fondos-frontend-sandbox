'use client';

import { SimpleSection } from '@/types/DinamicLanding';

interface Props {
  section: SimpleSection;
}

export default function MoreInfo({ section }: Props) {
  return (
    <div className="h-fit flex !px-0 flex-col items-center gap-[7vh]">
      <h1 className="w-full text-center font-encode-sans font-bold text-2xl xl:text-[40px] leading-[30px] xl:leading-[60px] text-[#3C3C3B]-light ">
        {section.title}
      </h1>
      <div className="grid lg:grid-cols-3 gap-4">
        {section.cards.map((c, index) => (
          <div
            className={`lg:px-[1rem] px-[2rem] lg:py-7 !min-h-fit py-10 border border-[#2098A1] hover:bg-[#2098A1] cursor-pointer h-full text-[#3C3C3B] hover:text-white bg-white rounded-tl-[6px] rounded-tr-[20px] rounded-br-[6px] rounded-bl-[20px] place-items-start ${
              index === section.cards.length - 1
                ? 'col-span-2'
                : 'lg:aspect-[1.1/1]'
            }`}
            key={c.id}
          >
            <div className="gap-2 w-full h-full">
              <p className="font-bold lg:text-sm text-xl xl:text-xl">
                {c.title}
              </p>
              <p className="lg:text-sm text-lg xl:text-xl font-light h-full pt-5">
                {c.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
