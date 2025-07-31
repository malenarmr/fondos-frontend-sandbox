'use client';

export default function HeroSectionInstitucional() {
  return (
    <section className="rounded-b-[50px] py-8 xl:py-16font-encode-sans">
      <div className="flex flex-col-reverse xl:flex-row items-center">
        <div className="flex flex-col text-primary xl:ml-[145px]">
          {/* Título */}
          <h1 className="text-center xl:text-left font-encode-sans font-bold xl:font-black text-2xl xl:text-[45px] leading-[30px] xl:leading-[60px] text-primary-light mb-7 xl:mb-12 xl:mt-7">
            Institucional
          </h1>

          {/* Descripción dividida manualmente */}
          <div
            className="font-encode-sans font-normal text-[16px] xl:text-[20px]
             leading-5 xl:leading-6 text-black text-left
             md:w-[1000px] space-y-4 px-4 md:px-8 xl:px-0 xl:mr-24"
          >
            <p>
              Somos una institucion que trabaja desde hace .... emitiendo fondos
              para nuestros usuarios. Provinfondos S.A. Sociedad Gerente de
              Fondos Comunes de Inversión inicia sus actividades el 1° de julio
              de 1994. Banco Provincia es el principal accionista y la sociedad
              depositaria de los fondos. Fundado en 1822, hoy cuenta con 420
              sucursales y es el segundo banco del sistema financiero
              argentino..
            </p>
          </div>
        </div>

        {/* Imagen o animación (vacía por ahora) */}
        <div className="animation-svg overflow-hidden xl:mt-12 flex items-center justify-center" />
      </div>
    </section>
  );
}
