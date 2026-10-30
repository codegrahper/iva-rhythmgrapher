export interface SiteSection {
  id: string;
  number: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string;
}

export interface BioData {
  quote: string[];
  bioParagraphs: string[];
  history: {
    discography: string[];
    soloExhibitions: string[];
    travel: string[];
    soloPerformances: string[];
    teamExhibitions: string[];
  };
}

export interface DiscographyItemData {
  id: string;
  title: string;
  releaseDate?: string;
  artwork?: string;
  tagline?: string;
  description?: string[];
  credits: string[];
  review?: {
    author: string;
    text: string[];
  };
  links?: {
    label: string;
    url: string;
    isExternal?: boolean;
    isPdf?: boolean;
  }[];
}

export interface WorkItemData {
  id: string;
  title: string;
  category: string;
  description?: string;
  previewMedia?: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
  links?: {
    label: string;
    url: string;
  }[];
  note?: string;
}

export interface LinkItemData {
  label: string;
  category: string;
  url: string;
  isExternal: boolean;
  description?: string;
}
