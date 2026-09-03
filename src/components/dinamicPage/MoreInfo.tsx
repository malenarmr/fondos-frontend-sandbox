'use client';

import { SimpleSection } from '@/types/DinamicLanding';

interface Props {
  section: SimpleSection;
}

export default function MoreInfo({ section }: Props) {
  return (
    <div className="h-fit flex max-w-[97vw] md:max-w-full !px-4 flex-col items-center gap-[3vh] md:gap-[7vh]">
      <h1 className="w-[80%] md:w-full text-center font-encode-sans font-bold text-2xl md:text-2xl xl:text-[40px] leading-[30px] xl:leading-[60px] text-[#3C3C3B]/99">
        {section.title}
      </h1>
      <div className="grid lg:grid-cols-3 gap-2 md:gap-4 px-2">
        {section.cards.map((c, index) => (
          <div
            className={`md:px-[1rem] lg:py-7 !min-h-fit px-[.7rem] py-5 md:py-10 border border-[#2098A1] hover:bg-[#2098A1] cursor-pointer h-full text-[#3C3C3B] hover:text-white bg-white rounded-tl-[6px] rounded-tr-[20px] rounded-br-[6px] rounded-bl-[20px] place-items-start ${
              index === section.cards.length - 1
                ? 'col-span-2'
                : 'md:aspect-[1.1/1] aspect-[1/1.1]'
            }`}
            key={c.id}
          >
            <div className="w-full h-full">
              <p className="font-bold text-xs md:text-sm xl:text-xl">
                {c.title}
              </p>
              <p className="md:text-sm text-xs xl:text-xl font-light h-full pt-3 md:pt-5 leading-none md:leading-tight">
                {c.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
