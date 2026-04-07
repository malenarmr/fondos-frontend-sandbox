export interface Fondo {
  calificacion: { file: { url: string } } | null;
  reglamento_de_gestion: { file: { url: string } } | null;
  rendimiento_diario: { file: { url: string } } | null;
  factSheet: { url: string } | null;
  carteraDetallada: string;
  id: number;
  documentId: string;
  description: string;
  moneda: string;
  name: string;
  numero_fondo: number;
  patrimonio: string;
  horizonte: string;
  variacionDiaria: number;
  inversor_profile_fondos:
    | {
        id: number;
        documentId: string;
        title: string;
      }[]
    | null;
  caracteristicas_fondos: { value: string }[] | null;
  performances: { id: number; name: string; value: string }[] | null;
  rentabilidad: { id: number; name: string; value: string }[] | null;
  informationAt: string | null;
  holdings: { id: number; name: string; value: number }[] | null;
  clase_fondo: { id: number; inicio: string; clase: string }[] | null;
}
