// src/app/proteccion-datos-personales/page.tsx
'use client';

import MobileInviertaSection from '@/components/institucional/MobileInviertaSection';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProteccionDatosPersonalesPage() {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <main>
      <Navbar />

      {/* Información de protección de datos */}
      <div className="bg-gradient-to-br from-[#008996] to-[#00C3B3] py-8 md:py-16 font-encode-sans">
        <div className="container mx-auto px-4">
          <div
            className="p-8 md:p-24 max-w-3xl mx-auto bg-white rounded-xl shadow-lg"
            style={{ boxShadow: '0px 4px 32px rgba(146,146,146,0.57)' }}
          >
            <h1 className="encode-sans text-2xl md:text-4xl font-bold text-primary mb-6">
              Protección de datos personales
            </h1>

            <div className="prose max-w-none text-sm md:text-base text-gray-700 mb-8">
              <p>
                Por la presente informamos que Provincia Bursátil SA se
                encuentra inscripta en el Registro Nacional de Bases de Datos
                alcanzadas por la Ley N° 25.326 con el número de registro: 890.
                Provincia Bursátil S. A. respeta el derecho de los usuarios a la
                protección de sus datos personales, los cuales están amparados
                por la Ley de Protección de Datos Personales Nº 25.326. El
                usuario que desee suprimir (total o parcialmente) o conocer los
                datos de su persona que constan en la misma, actualizarlos o
                rectificar errores deberá comunicarse por correo al domicilio
                indicado más arriba. El titular de los datos personales tiene la
                facultad de ejercer el derecho de acceso a los mismos de forma
                gratuita a intervalos no inferiores a 6 meses, salvo que se
                acredite un interés legítimo según art. 14, inciso 3 de la ley
                25.326. Sus datos solo serán utilizados a los efectos de
                perfeccionar el contrato, concretar las transacciones en el
                sitio web, validar los pedidos, recibir pagos y realizar la
                oferta y comercialización de los productos y/o servicios de las
                empresas de Grupo Provincia. La inexactitud o falsedad de los
                datos suministrados por el usuario, o la ausencia de alguno de
                ellos, invalidaran su derecho a reclamar por cualquier error o
                perjuicio relacionado a la entrega. La DIRECCION NACIONAL DE
                PROTECCION DE DATOS PERSONALES, Órgano de control de la Ley Nº
                25.326, tiene la atribución de atender las denuncias y reclamos
                que se interpongan con relación al cumplimiento de las normas
                sobre protección de datos personales.
              </p>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => router.back()}>Volver atrás</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Promoción invertir (mobile) */}
      {isMobile && <MobileInviertaSection />}

      {/* Promoción invertir (desktop) con fondo detrás de card en #008996 */}
      {!isMobile && (
        <div className="bg-gradient-to-br from-[#00C3B3] to-[#00C3B3]">
          <div className="bg-[#005A63] rounded-t-2xl py-16">
            <div className="container mx-auto px-4 text-center text-white">
              <h2 className="text-4xl font-bold mb-4 font-encode-sans">
                ¿Querés invertir en dólar MEP?
              </h2>
              <p className="max-w-2xl mx-auto mb-8 font-encode-sans">
                Operá desde Invierta, descubrí nuevas oportunidades y gestioná
                tu dinero de manera simple, rápida y segura.
              </p>

              <div className="text-primary flex-auto justify-center">
                <div className="flex gap-4 justify-center ">
                  <Link
                    href="https://apps.apple.com/app/id6448729005"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="flex items-center border text-primary rounded-[10px] px-6 py-5 transition duration-200 hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]">
                      <Image
                        src="/home/AppStore.svg"
                        alt="Apple icon"
                        width={110}
                        height={110}
                        className="m-0 xl:mr-2"
                      />
                    </button>
                  </Link>
                  <Link
                    href="https://play.google.com/store/apps/details?id=io.btrader.prbu&hl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="flex items-center border text-primary rounded-[10px] px-6 py-5 transition-shadow duration-200 hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]">
                      <Image
                        src="/home/PlayStore.svg"
                        alt="Play Store icon"
                        width={110}
                        height={110}
                        className="m-0 xl:mr-2"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
