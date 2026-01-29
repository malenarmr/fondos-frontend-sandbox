import apiClient from './apiClient';
const API_BASE = apiClient.defaults.baseURL;
const PUBLIC_BASE = API_BASE?.replace(/\/api$/, '');

interface RawDownloadLink {
  id: number;
  url: string;
  description: string;
}

export interface RawImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface RawHomeCard {
  id: number;
  title: string;
  description: string;
  link1: string | null;
  color: string | null;
  button_text: string | null;
  downloadLink: RawDownloadLink[];
  image?: RawImage[]; // desktop JSON
  imageMobile?: RawImage[]; // mobile JSON
}

interface RawHomeResponse {
  data: { cards: RawHomeCard[] }[];
}

export interface HomeCard {
  id: number;
  title: string;
  description: string;
  link1: string | null;
  color: string | null;
  button_text: string | null;
  color_text?: string | null;
  downloadLinks: RawDownloadLink[];
  image?: RawImage[];
  imageMobile?: RawImage[];
  jsonUrlDesktop: string;
  jsonUrlMobile: string;
  backgroundImage?: any;
}

export interface DestacadoBackend {
  id: number;
  title: string;
  description: string;
  urlRedirect: string | null;
  from: string;
  to: string;
  color: string | null;
  image: {
    url: string;
  };
  isDelete: boolean;
}

export interface Destacado {
  id: number;
  title: string;
  description: string;
  urlRedirect: string | null;
  color: string | null;
  jsonUrl?: string;
  imageUrl?: string;
}

export async function fetchHomeCards(): Promise<HomeCard[]> {
  const resp = await apiClient.get<RawHomeResponse>('/home-fondos');
  const block = resp.data.data[0];
  if (!block) return [];

  const CLIENT_BASE = apiClient.defaults.baseURL!;
  const PUBLIC_BASE = CLIENT_BASE.replace(/\/api$/, '');

  return block.cards.map((card) => ({
    id: card.id,
    title: card.title,
    description: card.description,
    link1: card.link1,
    color: card.color,
    button_text: card.button_text,
    downloadLinks: card.downloadLink,
    image: card.image,
    imageMobile: card.imageMobile,
    jsonUrlDesktop: card.image?.[0]?.url
      ? `${PUBLIC_BASE}${card.image[0].url}`
      : '',
    jsonUrlMobile: card.imageMobile?.[0]?.url
      ? `${PUBLIC_BASE}${card.imageMobile[0].url}`
      : '',
  }));
}

export async function fetchDestacados(): Promise<Destacado[]> {
  const resp = await apiClient.get<{ data: DestacadoBackend[] }>(
    '/destacados-bursatils'
  );
  return resp.data.data
    .filter((item) => !item.isDelete)
    .map((item) => {
      // Construir URL absoluta del archivo (JSON o SVG)
      const fullUrl = item.image.url.startsWith('/')
        ? `${PUBLIC_BASE}${item.image.url}`
        : item.image.url;

      // Detectar si es animación Lottie (.json) o imagen (.svg, etc.)
      const isLottie = item.image.url.toLowerCase().endsWith('.json');

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        // → Ahora sí asignamos el color que viene del backend:
        color: item.color,
        urlRedirect: item.urlRedirect,
        jsonUrl: isLottie ? fullUrl : undefined,
        imageUrl: !isLottie ? fullUrl : undefined,
      };
    });
}
