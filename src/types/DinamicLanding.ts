export type SimpleCard = {
  title: string;
  description: string;
  id: number;
  button_text?: string;
  button_link: string;
  public: boolean;
};
export type Image = {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
};

export type ImageCard = {
  title: string;
  description: string;
  id: number;
  image: Image;
};
export type SimpleSection = {
  title: string;
  description?: string;
  cards: SimpleCard[];
};

export type FondoDetail = {
  id: number;
  public: boolean;
  cardImage: ImageCard;
  details: SimpleCard[];
};

export type fondosInfo = {
  id: number;
  public: boolean;
  backgroundColor: string;
  textColor: string;
  fondoDetail?: FondoDetail;
  cardPrincipal: SimpleCard;
};
export type SectionWithImage = {
  cards: SimpleCard[];
  title: string;
  image: Image;
};
export type SectionWithButtons = {
  title: string;
  description?: string;
  cards: ImageCard[];
  button_link: string;
  button_text: string;
};

export type Header = {
  title: string;
  description: string;
  button_link: string;
  button_text: string;
};
export type Videos = {
  id: number;
  url: string;
  Name: string;
  categories_video_fondos?: { categoryName: string }[];
};

export type Answer = {
  id: number;
  answer: string;
  point: number;
};

export type Question = {
  id: number;
  question: string;
  answer: Answer[];
};

export type Test = {
  id: number;
  title: string;
  description: string;
  public: boolean;
  question: Question[];
};

export type DynamicLanding = {
  id: number;
  path: string;
  relation: string;
  header: Header;
  description: SimpleCard;
  sectionCardsImages: SectionWithButtons;
  sectionQuestions: SectionWithImage;
  moreInfo: SimpleSection;
  faqs: SimpleSection;
  legal: SimpleCard;
  video_seccion_fondos: Videos[];
  fondosInfo: fondosInfo[];
  test?: Test;
};

export type StrapiResponse = {
  data: DynamicLanding[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
