'use client';

import { useAppContext } from '@/context/AppContext';
import Button from '../shared/Button';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
export default function Form() {
  const { provinciaApiClient } = useAppContext();
  const searchParams = useSearchParams();
  // /contacto?cuit=true fuerza el input de CUIT sin importar el motivo elegido
  const cuitDesdeUrl = searchParams.get('cuit') === 'true';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [motivosConsulta, setMotivosConsulta] = useState<
    {
      motivo: '';
      id: number;
      documentId: string;
      cuit: boolean | null;
    }[]
  >([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [motivoConsultaFondo, setMotivoConsultaFondo] = useState('');
  const [cuit, setCuit] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const requiereCuit =
    cuitDesdeUrl ||
    Boolean(
      motivosConsulta.find((m) => m.documentId === motivoConsultaFondo)?.cuit
    );

  // Arma el formato XX-XXXXXXXX-X que valida Strapi a medida que se tipea
  function formatCuit(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 10) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10)}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          motivoConsultaFondo,
          ...(requiereCuit && { cuit }),
          state: 'Nuevo',
        }),
      });

      if (!response.ok) throw new Error('Error al enviar la consulta');

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setMotivoConsultaFondo('');
      setCuit('');
    } catch {
      setSubmitError('No pudimos enviar tu consulta. Intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response =
          await provinciaApiClient.fondos.motivoConsulta.getFront();
        setMotivosConsulta(response.data.data);
      } catch {
        setError('Error al cargar preguntas frecuentes');
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [provinciaApiClient]);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="relative">
      <div className="absolute top-[150px] left-0 w-full bottom-0 bg-[#89D9BB]" />{' '}
      <div className="relative mx-auto w-[755px]">
        <h2 className="mb-[32px] text-[32px] font-bold text-[#3C3C3B]">
          Contactate con nosotros
        </h2>
        <form
          onSubmit={handleSubmit}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Completa con tu nombre y apellido"
                className="w-full p-2 rounded-xl shadow-xs ml-2 text-[18px]"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-bold text-xl ">¿Cuál es tu email?</h1>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              <select
                required
                value={motivoConsultaFondo}
                onChange={(e) => {
                  setMotivoConsultaFondo(e.target.value);
                  if (!cuitDesdeUrl) setCuit('');
                }}
                className="rounded-xl w-full px-4 py-[9px] border border-gray-300 rounded-lg font-encode-sans focus:outline-none focus:ring-2 focus:ring-[#008996] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Selecciona un tema</option>

                {motivosConsulta.map((motivo) => (
                  <option
                    key={motivo.documentId}
                    value={motivo.documentId}
                    className="!hover:bg-gray"
                  >
                    {motivo.motivo}
                  </option>
                ))}
              </select>
            </div>
            {requiereCuit && (
              <div className="w-full flex flex-col gap-2">
                <h1 className="font-bold text-xl">¿Cuál es tu CUIT?</h1>
                <input
                  required
                  inputMode="numeric"
                  value={cuit}
                  onChange={(e) => setCuit(formatCuit(e.target.value))}
                  pattern="(20|23|24|25|26|27|30|33|34)-[0-9]{8}-[0-9]"
                  title="Ingresá un CUIT válido con el formato XX-XXXXXXXX-X"
                  placeholder="XX-XXXXXXXX-X"
                  className="w-full p-2 rounded-xl shadow-xs ml-2 text-[18px]"
                />
              </div>
            )}
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-bold text-xl">Dejá tu mensaje</h1>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe aquí tu mensaje, pregunta o lo que quieras compartir con nosotros"
                className="w-full p-2 rounded-xl ml-2 text-[18px]"
              />
            </div>
            <p className="text-[12px]">
              Al ingresar sus datos personales y hacer clic en 'Enviar mensaje',
              se acepta que su consulta sea procesada de acuerdo con nuestra
              Política de Privacidad.
            </p>
            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-green-700 text-sm">
                ¡Gracias! Recibimos tu consulta.
              </p>
            )}
          </div>

          <div className="flex justify-end mt-auto pt-8">
            <Button type="submit" variant="sky" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
