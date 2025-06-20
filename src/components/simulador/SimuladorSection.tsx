'use client';

import { useEffect, useState, useRef } from 'react';

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
  const myDivRef = useRef<HTMLDivElement>(null);

  const [carteras, setCarteras] = useState<Cartera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Data>({
    monto: '',
    carteraDocumentId: '',
    fechaInicio: '',
    fechaFin: '',
  });
  const [missing, setMissing] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState({
    rendimientoTotal: {
      montoTotalInicialPortafolio: '',
      porcentajeRendimientoTotal: 0,
      valorFinalTotalPortafolio: '',
    },
  });

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

  const requiredFields = [
    'carteraDocumentId',
    'fechaInicio',
    'fechaFin',
    'monto',
  ];

  const handleChange = (key: string, value: string) => {
    const missingFields = [...missing].filter((field) => field !== key);
    setMissing(missingFields);

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSimular = async () => {
    try {
      const response = await provinciaApiClient.bursatil.simulador.simular({
        data: {
          carteraDocumentId: formData.carteraDocumentId,
          monto: Number(formData.monto),
          fechaInicio: formData.fechaInicio,
          fechaFin: formData.fechaFin,
        },
      });
      setResult(response.data);
      if (response.data.rendimientoTotal.montoTotalInicialPortafolio !== '') {
        setShowPopup(true);
      }
      setLoading(true);
      setError('');
    } catch (err) {
      setError('Error al simular inversion');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    const missingFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ''
    );

    if (missingFields.length > 0) {
      console.log('Faltan completar:', missingFields);
      setMissing(missingFields);
      return;
    } else {
      setMissing([]);
      handleSimular();
      myDivRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackground = (field: string) => {
    if (!formData[field] || formData[field].trim() === '') {
      return 'bg-white';
    } else {
      return 'bg-[#00C3B3]';
    }
  };

  const handleText = (field: string) => {
    if (!formData[field] || formData[field].trim() === '') {
      return 'text-[#a3dbc7]';
    } else {
      return 'text-white';
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  const formatDate = (str: string) => {
    const blocks = str.split('-');
    return blocks[2] + '/' + blocks[1] + '/' + blocks[0];
  };

  // Fecha de ayer en formato YYYY-MM-DD
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  const fechaAyer = ayer.toISOString().split('T')[0];

  return (
    <>
      <div className="px-6 md:px-[50px] lg:px-[100px] xl:px-[145px] flex flex-col items-center space-y-6 md:space-y-16 mb-12 md:mb-8">
        <div className="flex flex-col md:flex-row w-full gap-8 items-stretch">
          <div
            className={`rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 text-secondary font-encode-sans border border-[#2098A1] w-full md:w-1/3 transition duration-200 ${!formData.monto || formData.monto.trim() === '' ? 'bg-white' : 'bg-[#2098A1]'}`}
          >
            <div className="flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start">
              <h4
                className={`text-[75px] text-[#a3dbc7] ${handleText('monto')} font-black`}
              >
                1
              </h4>
              <span className={`text-xl font-bold ${handleText('monto')}`}>
                Ingresá cuánto dinero
                <br /> hubieses invertido
              </span>
            </div>
            <div className="space-y-4">
              <label className="text-secondary">Ingresar monto</label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm select-none">
                  $
                </span>
                <input
                  type="number"
                  className={`border border-[#929292] rounded w-full py-2 ps-6 pe-3 focus:outline-none max-h-[40px] 
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
            </div>
          </div>
          <div
            className={`bg-white rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 text-secondary font-encode-sans border border-[#2098A1] w-full md:w-1/3 ${!formData.fechaInicio || formData.fechaInicio.trim() === '' || !formData.fechaFin || formData.fechaFin.trim() === '' ? 'bg-white' : 'bg-[#00C3B3]'}`}
          >
            <div className="flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start">
              <h4 className="text-[75px] text-[#a3dbc7] font-black">2</h4>
              <span className="text-xl font-bold text-[#a3dbc7]">
                Seleccioná un período de
                <br /> flujo de fondos
              </span>
            </div>
            <div className="space-y-4">
              <label className="">Seleccionar fecha</label>
              <div className="flex gap-3">
                <input
                  type="date"
                  value={formData.fechaInicio}
                  max={formData.fechaFin || fechaAyer}
                  className={`border border-[#929292] rounded w-1/2 p-2 focus:outline-none max-h-[40px] ${missing.includes('fechaInicio') && 'border-[#f27c7c] border-4'}`}
                  onChange={(e) => handleChange('fechaInicio', e.target.value)}
                />
                <input
                  type="date"
                  value={formData.fechaFin}
                  max={fechaAyer}
                  className={`border border-[#929292] rounded w-1/2 p-2 focus:outline-none max-h-[40px] ${missing.includes('fechaFin') && 'border-[#f27c7c] border-4'}`}
                  onChange={(e) => handleChange('fechaFin', e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <label className="w-1/2 font-encode-sans text-sm">Desde</label>
                <label className="w-1/2 font-encode-sans text-sm">Hasta</label>
              </div>
            </div>
          </div>
          <div
            className={`bg-white rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 text-secondary font-encode-sans border border-[#2098A1] w-full md:w-1/3 ${handleBackground('carteraDocumentId')}`}
          >
            <div className="flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start">
              <h4 className="text-[75px] text-[#a3dbc7] font-black">3</h4>
              <span className="text-xl font-bold text-[#a3dbc7]">
                Elegí hasta tres fondos
                <br /> para simular
              </span>
            </div>
            <div className="space-y-4">
              <label className="text-secondary">Elegir cartera</label>
              <select
                className={`border border-[#929292] rounded w-full p-2 bg-white focus:outline-none text-md ${missing.includes('carteraDocumentId') && 'border-[#f27c7c] border-4'}`}
                onChange={(e) =>
                  handleChange('carteraDocumentId', e.target.value)
                }
              >
                <option></option>
                {carteras.map((cartera) => (
                  <option key={cartera.id}>{cartera.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full justify-center flex flex-col items-end md:flex-row gap-8">
          {missing.length !== 0 && (
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
      {result.rendimientoTotal.montoTotalInicialPortafolio !== '' && (
        <div className="pt-20 pb-28 relative rounded-t-[50px] mb-[-40px] md:px-[100px] xl:px-[145px] hidden md:block">
          <div
            className="bg-[#2098A1] text-white w-[100%] px-16 lg:px-20 py-12 rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] flex flex-col max-w-[922px] mx-auto"
            ref={myDivRef}
          >
            <h2 className="font-encode-sans font-bold text-3xl text-center text-navbar">
              El rendimiento de tu inversión hubiese sido:
              <br />
              <b>Firma premium Clase A</b>
            </h2>
            <div className="flex w-full pt-16 border-b-2">
              <div className="w-1/2 flex flex-col">
                <div className="flex pb-6 border-b-2">
                  <span className="w-1/2 ">Capital invertido</span>
                  <span className="w-1/2 font-bold">$100.000,00</span>
                </div>
                <div className="flex py-6 border-b-2">
                  <span className="w-1/2 ">Total simulado</span>
                  <span className="w-1/2 font-bold">$100.000,00</span>
                </div>
                <div className="flex py-6">
                  <span className="w-1/2">Rendimiento directo</span>
                  <span className="w-1/2 font-bold">0,60%</span>
                </div>
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="flex px-8 pb-6 justify-between border-b-2">
                  <span className="">Tipo de inversor</span>
                  <span className="font-bold"> Arriesgado</span>
                </div>
                <div className="flex px-8 py-6 justify-between border-b-2">
                  <span className="">Desde - Hasta</span>
                  <span className="font-bold"> 20/07/2025 - 20/09/2025</span>
                </div>
                <div className="flex bg-[#EEF8F3] py-2 px-8 rounded-[12px] justify-between my-4">
                  <span className="text-secondary">Capital + Rendimiento</span>
                  <span className="font-medium text-secondary font-bold">
                    $100.5000
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <span>
                Información importante: los resultados de este tipo de fondos
                puede variar mucho según el período seleccionado
              </span>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div
          className="fixed bg-[#3c3c3b66] block md:hidden w-[100vw] h-[100vh] top-0 left-0 z-10"
          onClick={handleClosePopup}
        >
          <div
            className="bg-white text-primary w-[90vw] h-[60vh] top-[5vh] left-[5vw] p-6 rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] absolute"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex relative w-[100%]">
              <h2 className="font-encode-sans font-bold text-xl text-center w-full">
                El rendimiento
                <br /> de tu inversión
                <br /> hubiese sido
              </h2>
              <button
                onClick={handleClosePopup}
                className="absolute right-0 text-3xl"
              >
                ×
              </button>
            </div>
            <div className="flex w-full flex-col gap-4 pt-6 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#929292] text-sm">Total simulado</span>
                <span className="w-1/2 border-l text-right ">
                  ${result.rendimientoTotal.montoTotalInicialPortafolio}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#929292] text-sm">
                  Rendimiento directo
                </span>
                <span className="w-1/2 border-l text-right">
                  {result.rendimientoTotal.porcentajeRendimientoTotal.toFixed(
                    2
                  )}
                  %
                </span>
              </div>
              <div className="flex justify-between rounded-[12px]">
                <span className="text-[#929292] text-sm">Desde - Hasta</span>
                <div className="flex flex-col border-l pb-2 w-1/2 text-right">
                  <span className="">{formatDate(formData.fechaInicio)}</span>
                  <span className="">{formatDate(formData.fechaFin)}</span>
                </div>
              </div>
              <div className="flex bg-[#00E89A] py-2 px-4 rounded-[12px] justify-between text-sm">
                <span className="text-primary">Capital + Rendimiento</span>
                <span className="font-medium">
                  $
                  {Number(
                    result.rendimientoTotal.valorFinalTotalPortafolio
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
