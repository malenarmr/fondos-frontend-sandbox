'use client';

export default function AvisoLegalSection() {
  return (
    <section className="w-full flex justify-center items-center py-12 bg-[#2098A1]">
      <div
        className="
                    bg-white
                    max-w-4xl
                    w-full
                    px-20 py-20
                    shadow-lg
                    rounded-tl-[48px] rounded-br-[48px] rounded-tr-[12px] rounded-bl-[12px]
                    mx-4
                    "
      >
        <h3 className="text-center text-xl font-bold mb-6 text-gray-800">
          Aviso legal
        </h3>
        <p className="text-gray-700 leading-relaxed text-base text-center md:text-left">
          La información presentada en este informe corresponde a Provinfondos
          S.A. Sociedad Gerente de Fondos Comunes de Inversión. La misma solo
          tiene carácter informativo y corresponde al período especificado. Los
          rendimientos corresponden a datos históricos y no son indicadores de
          tendencias futuras. Las inversiones en cuotapartes del fondo no
          constituyen depósitos en la Sociedad Depositaria a los fines de la Ley
          de Entidades Financieras ni cuentan con ninguna de las garantías que
          tales depósitos a la vista o plazo puedan gozar, de acuerdo con la
          legislación y reglamentación aplicables en materia de depósitos en
          entidades financieras. Asimismo, la sociedad Depositaria, se encuentra
          impedida por normas del BCRA, de asumir, tácita o expresamente,
          compromiso alguno en cuanto al mantenimiento, en cualquier momento,
          del valor del capital convertido, al rendimiento, al valor del rescate
          de las cuotapartes o al otorgamiento de liquidez a tal fin.
        </p>
      </div>
    </section>
  );
}
