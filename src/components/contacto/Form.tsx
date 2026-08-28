import Button from '../shared/Button';
export default function Form() {
  return (
    <section className="relative">
      <div className="absolute top-[150px] left-0 w-full bottom-0 bg-[#2098A1]" />{' '}
      <div className="relative mx-auto w-[755px]">
        <h2 className="mb-[32px] text-[32px] font-bold text-[#3C3C3B]">
          Contactate con nosotros
        </h2>
        <form
          className="
            shadow-[5px_5px_44px_rgba(0,0,0,0.2)]
            relative
            bg-white
            rounded-tl-[70px]
            rounded-tr-[10px]
            rounded-br-[70px]
            rounded-bl-[10px]
            p-[4rem]
            w-[755px]
            min-h-fit
            min-h-[615px]
            overflow-hidden
            flex flex-col
            border
            border-black
            mb-20
          "
        >
          <div className="flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-bold text-xl">
                ¿Cuál es tu nombre y apellido?
              </h1>
              <input
                required
                placeholder="Completa con tu nombre y apellido"
                className="w-full p-2 rounded-xl shadow-xs ml-2 text-[18px]"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-bold text-xl ">¿Cuál es tu email?</h1>
              <input
                required
                type="email"
                placeholder="Completa con email"
                className="w-full p-2 rounded-xl shadow-xs ml-2 text-[18px]"
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <h1 className="font-bold text-xl">
                ¿Cuál es el motivo principal de tu consulta?
                <br />
                <span className="italic font-medium text-gray-500 text-[16px]">
                  Elige la opción que más se acerque a tu interés
                </span>
              </h1>

              <select required className="p-2 rounded-xl ml-2">
                <option>Selecciona un tema</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-bold text-xl">Dejá tu mensaje</h1>
              <textarea
                required
                placeholder="Escribe aquí tu mensaje, pregunta o lo que quieras compartir con nosotros"
                className="w-full p-2 rounded-xl ml-2 text-[18px]"
              />
            </div>
            <p className="text-[12px]">
              Al ingresar sus datos personales y hacer clic en 'Enviar mensaje',
              se acepta que su consulta sea procesada de acuerdo con nuestra
              Política de Privacidad. 
            </p>
          </div>

          <div className="flex justify-end mt-auto pt-8">
            <Button variant="sky">Enviar</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
