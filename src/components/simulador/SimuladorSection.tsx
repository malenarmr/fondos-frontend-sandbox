'use client';

import { useEffect, useState, useRef } from 'react';

import { useAppContext } from '@/context/AppContext';
import Button from '../shared/Button';
import { AlertCircleIcon } from 'lucide-react';
import { Fondo } from '@/types/Fondo';
import { MdOutlineAddBox } from 'react-icons/md';

type Data = {
  monto: string;
  fondos: Fondo[];
  fechaInicio: string;
  fechaFin: string;
  [key: string]: any;
};

export default function SimuladorSection() {
  const myDivRef = useRef<HTMLDivElement>(null);

  const [fondos, setFondos] = useState<Fondo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Data>({
    monto: '',
    fondos: [{ id: 0, name: '' } as Fondo],
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
    async function fetchFondos() {
      try {
        const response = await provinciaApiClient.fondos.founds.getAll();
        setFondos(response.data.data as Fondo[]);
      } catch {
        setError('Error al cargar Fondos');
      } finally {
        setLoading(false);
      }
    }
    fetchFondos();
  }, [provinciaApiClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-2 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const requiredFields = ['fondos', 'fechaInicio', 'fechaFin', 'monto'];

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
      setLoading(true);

      const response = await provinciaApiClient.fondos.simulador.simular({
        data: {
          fondos: formData.fondos.map((data) => {
            return { numero: data.numero_fondo, clase: data.clase_fondo[0] };
          }),
          monto: Number(formData.monto),
          fechaInicio: formData.fechaInicio,
          fechaFin: formData.fechaFin,
        },
      });
      setResult(response.data);
      if (
        response?.data?.rendimientoTotal?.montoTotalInicialPortafolio !== ''
      ) {
        setShowPopup(true);
      }
      if (!response?.data?.success) {
        setError(response?.data?.message);
      } else {
        setError('');
      }
    } catch (err) {
      setError('Error al simular inversion');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    // Limpiar fondos vacíos
    const fondosValidos = formData.fondos.filter((f) => f.id && f.name !== '');

    // Revisar si hay algún fondo válido
    const fondosFaltan = fondosValidos.length === 0;

    // Validar los otros campos
    const otherFieldsMissing = requiredFields
      .filter((field) => field !== 'fondos')
      .filter((field) => !formData[field] || formData[field].trim() === '');

    const missingFields = [...otherFieldsMissing];
    if (fondosFaltan) missingFields.push('fondos');

    if (missingFields.length > 0) {
      setMissing(missingFields);
      return;
    }

    // Guardar solo los fondos válidos
    setFormData((prev) => ({
      ...prev,
      fondos: fondosValidos,
    }));

    setMissing([]);
    handleSimular();
    myDivRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBackground = (field: string) => {
    if (field === 'fondos') {
      const tieneFondos = formData.fondos.some((f) => f.id && f.name !== '');
      return tieneFondos ? 'bg-[#2098A1]' : 'bg-white';
    } else {
      if (!formData[field] || formData[field].trim() === '') {
        return 'bg-white';
      } else {
        return 'bg-[#2098A1]';
      }
    }
  };

  const handleText = (field: string) => {
    if (field === 'fondos') {
      const tieneFondos = formData.fondos.some((f) => f.id && f.name !== '');
      return tieneFondos ? 'white' : '[#a3dbc7]';
    } else {
      if (!formData[field] || formData[field].trim() === '') {
        return '[#a3dbc7]';
      } else {
        return 'white';
      }
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

  const validResult = () => {
    if (
      result?.rendimientoTotal?.porcentajeRendimientoTotal &&
      result?.rendimientoTotal?.montoTotalInicialPortafolio &&
      result?.rendimientoTotal?.valorFinalTotalPortafolio
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddFondo = () => {
    if (formData.fondos.length < 3) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fondos: [...prevFormData.fondos, { id: 0, name: '' } as Fondo],
      }));
    }
  };

  return (
    <>
      <div className="px-6 md:px-[50px] lg:px-[100px] xl:px-[145px] flex flex-col items-center space-y-6 md:space-y-16 mb-12 md:mb-8 font-encode-sans">
        <div className="flex flex-col md:flex-row w-full gap-8 items-stretch">
          <div
            className={`rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 text-secondary font-encode-sans border border-[#2098A1] w-full md:w-1/3 transition duration-200 ${handleBackground('monto')}`}
          >
            <div className="flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start">
              <h4
                className={`text-[75px] text-[#a3dbc7] text-${handleText('monto')} font-black`}
              >
                1
              </h4>
              <span className={`text-xl font-bold text-${handleText('monto')}`}>
                Ingresá cuánto dinero
                <br /> hubieses invertido
              </span>
            </div>
            <div className="space-y-4">
              <label className={`text-secondary text-${handleText('monto')}`}>
                Ingresar monto
              </label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm select-none">
                  $
                </span>
                <input
                  type="number"
                  className={`border border-[#929292] bg-transparent rounded w-full py-2 ps-6 pe-3 focus:outline-none max-h-[40px] 
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${missing.includes('monto') && 'border-[#f27c7c] border-2'} text-${handleText('monto')} border-${handleText('monto')}`}
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
            className={`rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 font-encode-sans border border-[#2098A1] w-full md:w-1/3 ${!formData.fechaInicio || formData.fechaInicio.trim() === '' || !formData.fechaFin || formData.fechaFin.trim() === '' ? 'bg-white text-[#a3dbc7]' : 'bg-[#2098A1] text-white'} `}
          >
            <div className="flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start">
              <h4 className="text-[75px] font-black">2</h4>
              <span className="text-xl font-bold">
                Seleccioná un período de
                <br /> flujo de fondos
              </span>
            </div>
            <div className="space-y-">
              <label
                className={`${!formData.fechaInicio || formData.fechaInicio.trim() === '' || !formData.fechaFin || formData.fechaFin.trim() === '' ? 'text-secondary' : 'text-white'}`}
              >
                Seleccionar fecha
              </label>
              <div className="flex gap-3 mt-4">
                <input
                  type="date"
                  value={formData.fechaInicio}
                  max={formData.fechaFin || fechaAyer}
                  className={`border border-[#929292] rounded w-1/2 p-2 focus:outline-none max-h-[40px] bg-transparent ${missing.includes('fechaInicio') && 'border-[#f27c7c] border-2'} ${!formData.fechaInicio || formData.fechaInicio.trim() === '' || !formData.fechaFin || formData.fechaFin.trim() === '' ? 'border-[#929292]' : 'border-white'}`}
                  onChange={(e) => handleChange('fechaInicio', e.target.value)}
                />
                <input
                  type="date"
                  value={formData.fechaFin}
                  max={fechaAyer}
                  className={`border rounded w-1/2 p-2 focus:outline-none max-h-[40px] bg-transparent ${missing.includes('fechaFin') && 'border-[#f27c7c] border-2'} ${!formData.fechaInicio || formData.fechaInicio.trim() === '' || !formData.fechaFin || formData.fechaFin.trim() === '' ? 'border-[#929292]' : 'border-white'}`}
                  onChange={(e) => handleChange('fechaFin', e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-4">
                <label
                  className={`w-1/2 font-encode-sans text-sm ${!formData.fechaInicio || formData.fechaInicio.trim() === '' || !formData.fechaFin || formData.fechaFin.trim() === '' ? 'text-secondary' : 'text-white'}`}
                >
                  Desde
                </label>
                <label
                  className={`w-1/2 font-encode-sans text-sm ${!formData.fechaInicio || formData.fechaInicio.trim() === '' || !formData.fechaFin || formData.fechaFin.trim() === '' ? 'text-secondary' : 'text-white'}`}
                >
                  Hasta
                </label>
              </div>
            </div>
          </div>
          <div
            className={`rounded-xl py-6 md:py-20 px-8 flex flex-col gap-2 text-secondary font-encode-sans border border-[#2098A1] w-full md:w-1/3 ${handleBackground('fondos')}`}
          >
            <div
              className={`flex md:flex-col gap-4 mb-6 md:mb-24 items-center md:items-start text-${handleText('fondos')}`}
            >
              <h4 className="text-[75px] font-black">3</h4>
              <span className="text-xl font-bold">
                Elegí hasta tres fondos
                <br /> para simular
              </span>
            </div>
            <div className="space-y-4">
              <label className={`text-secondary text-${handleText('fondos')}`}>
                Elegir fondo/s
              </label>
              {formData.fondos.map((selectedFondo, index) => (
                <select
                  key={index}
                  value={selectedFondo.id || ''}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData((prev) => {
                      const newFondos = [...prev.fondos];

                      if (value === '') {
                        if (newFondos.length > 1) {
                          newFondos.splice(index, 1); // elimina solo si hay más de uno
                        } else {
                          newFondos[index] = { id: 0, name: '' } as Fondo; // limpia si es el único
                        }
                      } else {
                        const selected = fondos.find(
                          (f) => f.id === Number(value)
                        );
                        if (selected) {
                          newFondos[index] = selected;
                        }
                      }

                      return { ...prev, fondos: newFondos };
                    });
                  }}
                  className={`border border-[#929292] bg-transparent rounded w-full p-2 focus:outline-none text-md text-secondary text-${handleText('fondos')} border-${handleText('fondos')} ${
                    missing.includes('fondos')
                      ? 'border-[#f27c7c] border-2'
                      : ''
                  }`}
                >
                  <option className="text-secondary" value="">
                    Seleccionar fondo
                  </option>
                  {fondos
                    .filter(
                      (fondo) =>
                        !formData.fondos.some(
                          (f, i) => f.id === fondo.id && i !== index
                        ) // evitar repetidos
                    )
                    .map((fondo) => (
                      <option
                        className="text-secondary"
                        key={fondo.id}
                        value={fondo.id}
                      >
                        {fondo.name}
                      </option>
                    ))}
                </select>
              ))}

              <button
                type="button"
                className={`flex items-center gap-1 font-bold text-sm text-secondary text-${handleText('fondos')}`}
                onClick={handleAddFondo}
                disabled={formData.fondos.length >= 3}
              >
                <MdOutlineAddBox />
                Agregar fondo
              </button>
            </div>
          </div>
        </div>
        <div className="w-full justify-center flex flex-col items-center lg:items-end md:flex-row gap-8">
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
      {validResult() && (
        <>
          <div
            className="pt-20 pb-28 relative bg-gradient-to-br from-[#008996] to-[#00C3B3] rounded-t-[50px] text-white mb-[-40px] md:px-[100px] xl:px-[145px] hidden md:block"
            ref={myDivRef}
          >
            <div className="bg-white text-primary w-[100%] px-16 lg:px-20 py-12 rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] flex flex-col max-w-[922px] mx-auto">
              <h2 className="font-encode-sans font-bold text-3xl text-center">
                El rendimiento de tu inversión
                <br /> hubiese sido
              </h2>
              <div className="flex w-full gap-4 pt-16">
                <div className="w-1/2 flex flex-col gap-8">
                  <div className="flex">
                    <span className="w-1/2 text-[#929292]">Total simulado</span>
                    <span className="w-1/2">
                      ${result?.rendimientoTotal?.montoTotalInicialPortafolio}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-[#929292]">
                      Rendimiento directo
                    </span>
                    <span className="w-1/2">
                      {result?.rendimientoTotal?.porcentajeRendimientoTotal?.toFixed(
                        2
                      )}
                      %
                    </span>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-8">
                  <div className="flex px-8 justify-between rounded-[12px]">
                    <span className="text-[#929292]">Desde - Hasta</span>
                    <span className="">
                      {formatDate(formData.fechaInicio)} -{' '}
                      {formatDate(formData.fechaFin)}
                    </span>
                  </div>
                  <div className="flex bg-[#00E89A] py-2 px-8 rounded-[12px] justify-between">
                    <span className="text-primary">Capital + Rendimiento</span>
                    <span className="font-medium">
                      $
                      {Number(
                        result?.rendimientoTotal?.valorFinalTotalPortafolio
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showPopup && (
            <div
              className="fixed bg-[#3c3c3b66] block md:hidden w-[100vw] h-[100vh] top-0 left-0 z-10"
              onClick={handleClosePopup}
            >
              <div
                className="bg-white text-secondary w-[90vw] h-[60vh] top-[5vh] left-[5vw] p-6 rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] absolute"
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
                    <span className="text-[#929292] text-sm">
                      Total simulado
                    </span>
                    <span className="w-1/2 border-l text-right ">
                      ${result?.rendimientoTotal?.montoTotalInicialPortafolio}
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
                    <span className="text-[#929292] text-sm">
                      Desde - Hasta
                    </span>
                    <div className="flex flex-col border-l pb-2 w-1/2 text-right">
                      <span className="">
                        {formatDate(formData.fechaInicio)}
                      </span>
                      <span className="">{formatDate(formData.fechaFin)}</span>
                    </div>
                  </div>
                  <div className="flex bg-[#2098A1] py-2 px-4 rounded-[12px] justify-between text-sm text-white">
                    <span className="">Capital + Rendimiento</span>
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
      )}
      {error && (
        <div className="pt-20 pb-28 relative bg-gradient-to-br from-[#008996] to-[#00C3B3] rounded-t-[50px] text-white mb-[-40px] md:px-[100px] xl:px-[145px] hidden md:block">
          <div className="bg-white text-primary w-[100%] px-16 lg:px-20 py-12 rounded-tl-[6px] rounded-tr-[12px] rounded-br-[6px] rounded-bl-[12px] flex flex-col max-w-[922px] mx-auto">
            <h2 className="font-encode-sans font-bold text-xl text-center">
              {error}. Por favor intentálo nuevamente
            </h2>
          </div>
        </div>
      )}
    </>
  );
}
