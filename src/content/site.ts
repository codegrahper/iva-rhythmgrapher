import { SiteSection } from './types';

export const siteMetadata = {
  title: 'RHYTHMGRAPHER | 양태석',
  description: '리듬을 그리는 사람, 드러머 양태석의 공식 아카이브 및 웹사이트입니다.',
  author: '양태석 (Yang Taeseok)',
  copyright: '© 2025 YANGTAESEOK. ALL RIGHTS RESERVED.',
};

export const navigationItems = [
  { label: 'RHYTHMGRAPHER', href: '#rhythmgrapher' },
  { label: 'BIO', href: '#bio' },
  { label: 'DISCOGRAPHY', href: '#discography' },
  { label: 'WORKS', href: '#works' },
  { label: 'LINKS', href: '#links' },
  { label: 'CONTACT', href: '#contact' },
];

export const sections: SiteSection[] = [
  {
    id: 'intro',
    number: '01',
    eyebrow: 'ARCHIVE',
    title: 'RHYTHMGRAPHER',
    subtitle: 'Rhythm / Sound / Movement',
  },
  {
    id: 'rhythmgrapher',
    number: '02',
    eyebrow: 'CONCEPT',
    title: '리듬을 그리는 사람',
    subtitle: 'RHYTHM + GRAPHER',
  },
  {
    id: 'bio',
    number: '03',
    eyebrow: 'BIOGRAPHY',
    title: 'BIO',
  },
  {
    id: 'discography',
    number: '04',
    eyebrow: 'DISCOGRAPHY',
    title: 'DISCOGRAPHY',
  },
  {
    id: 'works',
    number: '05',
    eyebrow: 'WORKS',
    title: 'WORKS',
  },
  {
    id: 'contact',
    number: '06',
    eyebrow: 'CONNECT',
    title: 'LINKS / CONTACT',
  },
];

export const introContent = {
  title: 'RHYTHMGRAPHER',
  subtitle: 'Rhythm / Sound / Movement',
  indicator: 'Scroll to explore ↓',
};

export const rhythmgrapherConcept = {
  eyebrow: 'RHYTHM',
  title: '리듬을 그리는 사람',
  breakdown: ['+', 'RHYTHM', 'GRAPHER'],
  note: 'TODO: verify source information for extended project definition',
};
