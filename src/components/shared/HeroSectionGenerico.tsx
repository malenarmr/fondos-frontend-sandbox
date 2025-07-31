'use client';

interface HeroSectionGenericoProps {
  title: string;
  description: string;
  bgColor?: string;
  showImage?: boolean;
}

export default function HeroSectionGenerico({
  title,
  description,
  showImage = false,
}: HeroSectionGenericoProps) {
  return (
    <section className={`rounded-b-[50px] dark:bg-dark font-encode-sans`}>
      <div className="flex flex-col-reverse xl:flex-row items-center">
        <div className="flex flex-col text-primary">
          {/* Título */}
          <h1 className="text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-12 xl:mt-7">
            {title}
          </h1>

          {/* Descripción */}
          <div
            className="font-encode-sans font-normal text-[16px] xl:text-[20px]
             leading-5 xl:leading-6 text-secondary text-left
             md:w-[630px] space-y-4 px-4 md:px-8 xl:px-0 xl:mr-24"
          >
            <p>{description}</p>
          </div>
        </div>

        {/* Imagen o animación (opcional) */}
        {showImage && (
          <div className="animation-svg overflow-hidden xl:mt-12 flex items-center justify-center" />
        )}
      </div>
    </section>
  );
}
