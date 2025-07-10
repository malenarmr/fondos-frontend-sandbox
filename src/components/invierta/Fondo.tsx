import { Dispatch, SetStateAction } from 'react';
import Button from '../shared/Button';
import { LiaDownloadSolid } from 'react-icons/lia';

interface Fondo {
  calificacion: {
    file: { url: string };
  };
  reglamento_de_gestion: {
    file: { url: string };
  };
  id: number;
  documentId: string;
  description: string;
  moneda: string;
  name: string;
  numero_fondo: number;
  patrimonio: string;
  horizonte: string;
  variacionDiaria: number;
  inversor_profile_fondos: {
    id: number;
    documentId: string;
    title: string;
  }[];
  caracteristicas_fondos: { value: string }[];
  performances: { id: number; name: string; value: string }[];
  informationAt: string;
  factSheet: { url: string };
  holdings: { id: number; name: string; value: number }[];
}

interface FondoProps {
  fondoData: Fondo;
  setSelectedFondo: Dispatch<SetStateAction<Fondo | undefined>>;
}

export default function FondoDetails({
  fondoData,
  setSelectedFondo,
}: FondoProps) {
  const colors = ['#009B67', '#2098A1', '#2F755E', '#A2DBC8'];

  const capitalize = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (date: string) => {
    if (date) {
      const arr = date.split('-');
      const meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ];
      const mes = Number(arr[1]) - 1;

      return arr[2] + ' de ' + meses[mes] + ' de ' + arr[0];
    }
  };

  console.log(fondoData);

  return (
    <div className="pt-12 dark:bg-dark md:px-[100px] xl:px-[145px]">
      <div className="flex justify-between items-end">
        <div className="w-1/2">
          <h1 className="text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-6 max-w-[590px]">
            {capitalize(fondoData.name)}
          </h1>
          <p className="text-center xl:text-left font-encode-sans font-normal text-[16px] xl:text-[20px] leading-5 xl:leading-6 px-[50px] md:w-[600px] xl:px-0 xl:mr-0">
            {fondoData.description}
          </p>
        </div>
        <div className="pb-8">
          <Button variant="light" onClick={() => setSelectedFondo(undefined)}>
            Volver a fondos
          </Button>
        </div>
      </div>
      <div className="flex gap-6 pt-24 pb-12">
        <div className="w-1/2 p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans ">
          <h3 className="font-bold text-lg">Rendimiento</h3>
          {fondoData.performances.map((performance, i) => (
            <div
              className={`flex justify-between ${fondoData.performances.length !== i + 1 && 'pb-4 border-b'}`}
              key={performance.id}
            >
              <span>{performance.name}</span>
              <span className="font-bold">{performance.value}</span>
            </div>
          ))}
        </div>
        <div className="w-1/2 p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans ">
          <h3 className="font-bold text-lg">Información</h3>
          <div className="pb-4 border-b">
            <span>
              Información al <b>{formatDate(fondoData.informationAt)}</b>
            </span>
          </div>
          <div className="pb-12">
            <span>
              Patrimonio del Fondo <b>${fondoData.patrimonio}</b>
            </span>
          </div>
          <div className="flex justify-between">
            <a
              className="bg-[#2098A1] flex items-center justify-center font-encode-sans font-medium px-[25px] py-[9px] rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] gap-x-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-primary-light text-white hover:shadow-xl focus:ring-primary"
              href={process.env.NEXT_PUBLIC_API_URL + fondoData.factSheet.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fact sheet
            </a>
            <button className="bg-[#2098A1] flex items-center justify-center font-encode-sans font-medium px-[25px] py-[9px] rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] gap-x-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-primary-light text-white hover:shadow-xl focus:ring-primary">
              Valor cuotaparte
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-12 shadow-[5px_5px_44px_0px_rgba(0,0,0,0.1)] rounded-xl text-secondary flex flex-col gap-6 font-encode-sans mb-20">
        <h3 className="font-bold text-lg">Tenencias</h3>
        <div className="flex flex-col py-8">
          {fondoData.holdings.map((holding, i) => (
            <div key={holding.id} className="flex">
              <div
                className={`w-2/3 rounded-xl flex items-center pl-4 font-medium`}
              >
                <div
                  className={`w-[${holding.value}%]`}
                  style={{
                    backgroundColor: colors[i % colors.length],
                    width: `${holding.value}%`,
                  }}
                >
                  <span className="text-white">{holding.name}</span>
                </div>
              </div>
              <div className="w-1/3 flex justify-between border-l py-2 pl-4">
                <span>{holding.name}</span>
                <span className="font-bold">{holding.value} %</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-medium text-lg">
          <div className="flex items-center gap-1">
            <LiaDownloadSolid />
            <span className=" ">Rendimiento Diario</span>
          </div>
          <div className="flex items-center gap-1">
            <LiaDownloadSolid />
            <span className="">Cartera Detallada</span>
          </div>
          {fondoData.reglamento_de_gestion.file.url && (
            <a
              className="flex items-center gap-1"
              href={
                process.env.NEXT_PUBLIC_API_URL +
                fondoData.reglamento_de_gestion.file.url
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <LiaDownloadSolid />
              <span className="">Reglamento De Gestión</span>
            </a>
          )}
          {fondoData.calificacion.file.url && (
            <a
              className="flex items-center gap-1"
              href={
                process.env.NEXT_PUBLIC_API_URL +
                fondoData.calificacion.file.url
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <LiaDownloadSolid />
              <span className="">Calificaciones</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
