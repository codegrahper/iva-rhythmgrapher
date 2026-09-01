import { LinkItemData } from './types';

export const externalLinks: LinkItemData[] = [
  {
    label: 'DRUM SCHOOL',
    category: 'EDUCATION',
    url: 'https://www.notion.so/drumqube/3029e569fced80fba915f78957b20c45',
    isExternal: true,
    description: '드럼스쿨 커리큘럼 및 안내 (Notion)',
  },
  {
    label: 'MyLOG',
    category: 'JOURNAL',
    url: 'https://blog.naver.com/drumqube',
    isExternal: true,
    description: '작업과 일상, 여행 기록 블로그 (Naver Blog)',
  },
  {
    label: 'Instagram',
    category: 'SOCIAL',
    url: 'https://www.instagram.com/rhythmgrapher_official/',
    isExternal: true,
    description: '@rhythmgrapher_official',
  },
];

export const contactInfo = {
  email: 'drumqube@gmail.com', // TODO: verify source contact email
  note: 'Contact via Email or Instagram DM',
  instagram: 'https://www.instagram.com/rhythmgrapher_official/',
};
