import type { AxiosInstance } from 'axios';
declare module 'provincia-api-client' {
  export interface ClientOptions {
    env: 'development' | 'sandbox' | 'prod';
  }

  export interface BursatilProductEndpoint {
    getAll(): Promise<{ data: { data: unknown[] } }>;
    // Acá se agregan otros métodos con types específicos cuando se conozcan
  }

  export interface BursatilBlogEndpoint {
    getAll(): Promise<{ data: { data: unknown[] } }>;
    // Acá se agregan otros métodos con types específicos cuando se conozcan
  }

  export interface BursatilFaqsEndpoint {
    getAll(): Promise<{ data: { data: unknown[] } }>;
    // Acá se agregan otros métodos con types específicos cuando se conozcan
  }

  export interface BursatilCarterasEndpoint {
    getAll(): Promise<{ data: { data: unknown[] } }>;
    // Acá se agregan otros métodos con types específicos cuando se conozcan
  }

  export interface BursatilVideosEndpoint {
    getAll(): Promise<{ data: { data: unknown[] } }>;
    // Acá se agregan otros métodos con types específicos cuando se conozcan
  }

  export interface BursatilEndpoints {
    axios(instance: AxiosInstance): unknown;
    product: BursatilProductEndpoint;
    blog: BursatilBlogEndpoint;
    faqs: BursatilFaqsEndpoint;
    carterasEficientes: BursatilCarterasEndpoint;
    // videoTutorial: BursatilVideosEndpoint;
    // Acá se agregan los demás endpoints de bursatil (institutional, accountOppening, faqs, global) según se requiera
  }

  export interface FondosFoundsEndpoint {
    getAll(): Promise<{ data: { data: unknown[] } }>;
    // Acá se agregan otros métodos con types específicos cuando se conozcan
  }

  export interface FondosEndpoints {
    // Definir los endpoints de fondos
    blog: {
      getAll(): Promise<unknown>;
    };
    founds: FondosFoundsEndpoint;
  }

  export interface GeneralEndpoints {
    // Definir los endpoints generales
    test: {
      getAll(): Promise<unknown>;
    };
    questionTest: {
      getAll(): Promise<unknown>;
    };
  }

  export interface ProvinciaApiClient {
    defaults: unknown;
    bursatil: BursatilEndpoints;
    auth: unknown;
    fondos: FondosEndpoints;
    general: GeneralEndpoints;
  }

  // Función para crear el cliente:
  export function provinciaClient(options: ClientOptions): ProvinciaApiClient;

  // El paquete exporta por defecto un objeto con la propiedad provinciaClient
  const defaultExport: {
    provinciaClient: typeof provinciaClient;
  };
  export default defaultExport;
}
