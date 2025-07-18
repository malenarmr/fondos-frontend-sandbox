export interface Fondo {
  calificacion: {
    file: { url: string };
  };
  reglamento_de_gestion: {
    file: { url: string };
  };
  rendimiento_diario: {
    file: { url: string };
  };
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
  inversor_profile_fondos: {
    id: number;
    documentId: string;
    title: string;
  }[];
  caracteristicas_fondos: { value: string }[];
  performances: { id: number; name: string; value: string }[];
  rentabilidad: { id: number; name: string; value: string }[];
  informationAt: string;
  factSheet: { url: string };
  holdings: { id: number; name: string; value: number }[];
  clase_fondo: { id: number; inicio: string; clase: string }[];
}
