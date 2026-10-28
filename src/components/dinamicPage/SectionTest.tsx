import { Test } from '@/types/DinamicLanding';
import TestInversorForm from '../test-inversor/TestInversorForm';
import { _capitalize } from 'chart.js/helpers';

interface Props {
  section: Test;
  /** Fondo de las secciones impares (1ª, 3ª, ...) */
}

export default function SectionTest({ section }: Props) {
  // Solo se renderizan los detalles publicados (el back omite fondoDetail si no es público)

  return (
    <div className="dark:bg-dark md:px-[100px] xl:px-[145px] px-[1rem] flex flex-col gap-20">
      <div className="w-full">
        <h1 className="w-full text-start lg:text-left font-encode-sans font-extrabold xl:font-black text-4xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-4 lg:mb-7 xl:mb-6  lg:px-0">
          {_capitalize(section.title || '')}
        </h1>
        <div
          className="font-encode-sans font-normal text-[16px] xl:text-[20px]
           leading-5 xl:leading-6 text-secondary text-left
           lg:max-w-[500px] space-y-4 xl:px-0 xl:mr-24 lg:px-0"
        >
          <p>{section.description}</p>
        </div>
      </div>
      <div>
        <TestInversorForm questions={section.question} showResultInline />
      </div>
    </div>
  );
}
