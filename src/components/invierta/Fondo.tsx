import { Dispatch, SetStateAction } from 'react';
import Button from '../shared/Button';

interface Fondo {
  id: number;
  documentId: string;
  description: string;
  moneda: string;
  name: string;
  numero_fondo: number;
  patrimonio: string;
  horizonte: string;
  inversor_profile_fondos: {
    id: number;
    documentId: string;
    title: string;
  }[];
  caracteristicas_fondos: { value: string }[];
}

interface FondoProps {
  fondoData: Fondo;
  setSelectedFondo: Dispatch<SetStateAction<Fondo | undefined>>;
}

export default function FondoDetails({
  fondoData,
  setSelectedFondo,
}: FondoProps) {
  return (
    <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-6 max-w-[590px]">
            {fondoData.name}
          </h1>
          <p>{fondoData.description}</p>
        </div>
        <Button variant="light" onClick={() => setSelectedFondo(undefined)}>
          Volver a fondos
        </Button>
      </div>
    </div>
  );
}
