'use client';

export default function HeroSectionInstitucional() {
  return (
    <section className="rounded-b-[50px] bg-light-aqua-green py-8 xl:py-16 dark:bg-dark font-encode-sans">
      <div className="flex flex-col-reverse xl:flex-row items-center">
        <div className="flex flex-col text-primary xl:ml-[145px]">
          {/* Título */}
          <h1 className="text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary mb-7 xl:mb-12 xl:mt-7">
            Provincia Bursátil
          </h1>

          {/* Descripción dividida manualmente */}
          <div
            className="font-encode-sans font-normal text-[16px] xl:text-[20px]
             leading-5 xl:leading-6 text-primary text-left
             md:w-[1000px] space-y-4 px-4 md:px-8 xl:px-0 xl:mr-24"
          >
            <p>
              Provincia Bursátil es una Sociedad controlada por Provincia
              Servicios Financieros S.A., una de las sociedades holding del
              Banco de la provincia de Buenos Aires.
            </p>
            <p>
              Desde 1993 desarrollamos y promovemos la operatoria en el mercado
              de capitales. Somos Agente Miembro en los mercados: BYMA, A3 y
              MAV.
            </p>
            <p>
              Agente de Liquidación y Compensación Integral – ALyC Integral Nro
              035/CNV
            </p>
            <p>
              Agente de Colocación y Distribución Integral de Fondos Comunes de
              Inversión – ACyDI FCI Nro 018/CNV
            </p>
          </div>
        </div>

        {/* Imagen o animación (vacía por ahora) */}
        <div className="animation-svg overflow-hidden xl:mt-12 flex items-center justify-center" />
      </div>
    </section>
  );
}
