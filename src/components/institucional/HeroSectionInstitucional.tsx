'use client';

export default function HeroSectionInstitucional() {
  return (
    <section className="rounded-b-[50px] py-8 xl:py-16 font-encode-sans">
      <div className="flex flex-col-reverse xl:flex-row items-center">
        <div className="flex flex-col text-primary xl:w-3/4">
          <h1 className="text-center xl:text-left font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-12">
            Institucional
          </h1>
          <div className="font-normal text-[16px] xl:text-[20px] leading-5 xl:leading-6 text-black space-y-4">
            <p>
              Somos una Sociedad Gerente de Fondos Comunes de Inversión (FCI)
              dedicada a la administración de productos para la gestión de las
              finanzas de personas, empresas y entidades del sector público y
              privado.
            </p>
            <p>
              Administramos los Fondos Comunes de Inversión del Banco de la
              Provincia de Buenos Aires fundado en 1822, que hoy cuenta con más
              de 400 sucursales estratégicamente distribuidas en el territorio
              bonaerense.
            </p>
            <p>
              Como parte de las empresas controladas por Provincia Servicios
              Financieros, holding de Banco Provincia, ofrecemos un abanico de
              fondos de mercado de dinero, renta fija, renta variable y de
              retorno total, los cuales permiten satisfacer las necesidades y
              expectativas de nuestros clientes.
            </p>
            <p>
              Provinfondos SA inició sus actividades el 1 de julio de 1994 y es
              Agente de Administración de Productos de Inversión Colectiva de
              Fondos Comunes de Inversión Nro. 39/CNV.
            </p>
          </div>
        </div>

        <div className="animation-svg overflow-hidden xl:mt-12 flex items-center justify-center xl:w-1/2" />
      </div>
    </section>
  );
}
