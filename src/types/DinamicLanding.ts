export type SimpleCard = {
  title: string;
  description: string;
  id: number;
};
export type Image = {
  url: string;
  alternativeText?: string;
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
  description: string;
  cards: SimpleCard[];
};
export type SectionWithImage = {
  cards: SimpleCard[];
  title: string;
  image: Image;
};
export type SectionWithButtons = {
  title: string;
  description: string;
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
  // agregá acá los demás campos que devuelve Strapi
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
