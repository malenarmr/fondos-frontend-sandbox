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
              Somos una institución que trabaja desde hace años emitiendo fondos
              para nuestros usuarios. Provinfondos S.A. Sociedad Gerente de
              Fondos Comunes de Inversión inicia sus actividades el 1° de julio
              de 1994. Banco Provincia es el principal accionista y la sociedad
              depositaria de los fondos. Fundado en 1822, hoy cuenta con 420
              sucursales y es el segundo banco del sistema financiero argentino.
            </p>
          </div>
        </div>

        <div className="animation-svg overflow-hidden xl:mt-12 flex items-center justify-center xl:w-1/2" />
      </div>
    </section>
  );
}
