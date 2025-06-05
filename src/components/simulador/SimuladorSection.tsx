'use client';

import { useEffect, useState } from 'react';

import { useAppContext } from '@/context/AppContext';
import Button from '../shared/Button';
import { AlertCircleIcon } from 'lucide-react';

interface Cartera {
  id: number;
  name: string;
  description: string;
}

type Data = {
  [key: string]: string;
};

export default function SimuladorSection() {
  const [carteras, setCarteras] = useState<Cartera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Data>({});
  const [missing, setMissing] = useState<string[]>([]);

  const { provinciaApiClient } = useAppContext();

  useEffect(() => {
    async function fetchCarteras() {
      try {
        const response =
          await provinciaApiClient.bursatil.carterasEficientes.getAll();
        setCarteras(response.data.data as Cartera[]);
      } catch {
        setError('Error al cargar carteras');
      } finally {
        setLoading(false);
      }
    }
    fetchCarteras();
  }, [provinciaApiClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSend = () => {
    const requiredFields = ['cartera', 'from', 'to', 'moneda', 'monto'];

    const missingFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ''
    );

    if (missingFields.length > 0) {
      console.log('Faltan completar:', missingFields);
      setMissing(missingFields);
      return;
    } else {
      setMissing([]);
    }
  };

  return (
    <>
      <div className="px-6 md:px-[50px] lg:px-[100px] xl:px-[145px] flex flex-col items-center space-y-6 md:space-y-16 my-12 md:my-24">
        <div className="flex flex-col md:flex-row w-full gap-8 items-stretch">
          <div className="bg-white rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 text-primary font-encode-sans border border-gray-300 w-full md:w-1/3">
            <div className="flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start">
              <h4 className="text-[75px] text-[#00C3B3] font-black">1</h4>
              <span className="text-xl font-bold">
                Ingresá cuánto dinero
                <br /> hubieses invertido
              </span>
            </div>
            <div className="space-y-4">
              <label>Ingresar monto</label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm select-none">
                  $
                </span>
                <input
                  type="number"
                  className={`border rounded w-full py-2 ps-6 pe-3 focus:outline-none max-h-[40px] 
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${missing.includes('monto') && 'border-[#f27c7c] border-2'}`}
                  onChange={(e) => handleChange('monto', e.target.value)}
                  onKeyDown={(e) => {
                    // Bloquear letras, signos y símbolos
                    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="">
                <div className="flex w-full space-between">
                  {[
                    { id: 'pesos', label: 'Pesos' },
                    { id: 'usd', label: 'Dólares' },
                  ].map(({ id, label }) => (
                    <div key={id} className="flex w-[30%] items-baseline gap-1">
                      <input
                        type="radio"
                        name="moneda"
                        id={id}
                        value={id}
                        className="hidden peer"
                        onChange={(e) => handleChange('moneda', e.target.value)}
                      />
                      <label
                        htmlFor={id}
                        className={`w-4 h-4 border border-gray-400 rounded flex items-center justify-center peer-checked:bg-blue-600 peer-checked:text-white text-transparent text-xs font-bold cursor-pointer ${missing.includes('moneda') && 'border-[#f27c7c] border-2'}`}
                      >
                        ✔
                      </label>
                      <label
                        htmlFor={id}
                        className="font-encode-sans text-sm cursor-pointer"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                  <label className="w-[40%] font-encode-sans text-sm">
                    *Mínimo $100
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 text-primary font-encode-sans border border-gray-300 w-full md:w-1/3">
            <div className="flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start">
              <h4 className="text-[75px] text-[#00C3B3] font-black">2</h4>
              <span className="text-xl font-bold">
                Seleccioná
                <br /> una cartera sugerida
              </span>
            </div>
            <div className="space-y-4">
              <label>Elegir cartera</label>
              <select
                className={`border rounded w-full p-2 bg-white focus:outline-none text-md ${missing.includes('cartera') && 'border-[#f27c7c] border-2'}`}
                onChange={(e) => handleChange('cartera', e.target.value)}
              >
                <option></option>
                {carteras.map((cartera) => (
                  <option key={cartera.id}>{cartera.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-white rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 text-primary font-encode-sans border border-gray-300 w-full md:w-1/3">
            <div className="flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start">
              <h4 className="text-[75px] text-[#00C3B3] font-black">3</h4>
              <span className="text-xl font-bold">
                Elegí una fecha
                <br /> de inicio y de cierre
              </span>
            </div>
            <div className="space-y-4">
              <label>Seleccionar fecha</label>
              <div className="flex gap-3">
                <input
                  type="date"
                  className={`border rounded w-1/2 p-2 focus:outline-none max-h-[40px] ${missing.includes('from') && 'border-[#f27c7c] border-2'}`}
                  onChange={(e) => handleChange('from', e.target.value)}
                />
                <input
                  type="date"
                  className={`border rounded w-1/2 p-2 focus:outline-none max-h-[40px] ${missing.includes('to') && 'border-[#f27c7c] border-2'}`}
                  onChange={(e) => handleChange('to', e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <label className="w-1/2 font-encode-sans text-sm">Desde</label>
                <label className="w-1/2 font-encode-sans text-sm">Hasta</label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full justify-end flex flex-col items-end md:flex-row gap-8">
          {missing.length === 0 && (
            <div className="bg-[#f27c7c] text-white px-6 md:px-20 py-2 md:py-3 rounded-[10px] flex items-center gap-4">
              <AlertCircleIcon />
              <span className="font-encode-sans text-sm font-bold">
                Faltan campos obligatorios que completar
              </span>
            </div>
          )}
          <Button style={{ width: 'fit-content' }} onClick={() => handleSend()}>
            Simular
          </Button>
        </div>
      </div>
      <div className="pt-20 pb-28 relative bg-gradient-to-br from-[#008996] to-[#00C3B3] rounded-t-[50px] text-white mb-[-40px] md:px-[100px] xl:px-[145px] hidden md:block">
        <div className="bg-white text-primary w-[100%] px-16 lg:px-20 py-12 rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] flex flex-col max-w-[922px] mx-auto">
          <h2 className="font-encode-sans font-bold text-3xl text-center">
            El rendimiento de tu inversión
            <br /> hubiese sido
          </h2>
          <div className="flex w-full gap-4 pt-16">
            <div className="w-1/2 flex flex-col gap-8">
              <div className="flex">
                <span className="w-1/2 text-[#929292]">Total simulado</span>
                <span className="w-1/2">$100.000,00</span>
              </div>
              <div className="flex">
                <span className="w-1/2 text-[#929292]">
                  Rendimiento directo
                </span>
                <span className="w-1/2">0,60%</span>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-8">
              <div className="flex px-8 justify-between rounded-[12px]">
                <span className="text-[#929292]">Desde - Hasta</span>
                <span className=""> 20/07/2025 - 20/09/2025</span>
              </div>
              <div className="flex bg-[#00E89A] py-2 px-8 rounded-[12px] justify-between">
                <span className="text-primary">Capital + Rendimiento</span>
                <span className="font-medium">$100.5000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
