import { WorkItemData } from './types';

export const workItems: WorkItemData[] = [
  {
    id: 'performance',
    title: 'Performance',
    category: 'LIVE PERFORMANCE',
    description: '퍼포먼스 아카이브 영상 및 작업 기록입니다.',
    note: 'TODO: verify source information & extract embedded YouTube link',
    links: [
      {
        label: 'Watch Performance on YouTube ↗',
        url: 'https://www.youtube.com/@rhythmgrapher', // Fallback to official channel / TODO
      },
    ],
  },
  {
    id: 'timescape',
    title: 'TimeScape',
    category: 'TIME SCAPE',
    description: '시간의 결을 소리와 리듬으로 기록한 TimeScape 시리즈입니다.',
    note: 'TODO: verify source information & extract embedded YouTube link',
    links: [
      {
        label: 'Watch TimeScape on YouTube ↗',
        url: 'https://www.youtube.com/@rhythmgrapher',
      },
    ],
  },
  {
    id: 'rhythmscape',
    title: 'RhythmScape',
    category: 'RHYTHM SCAPE',
    description: '공간과 움직임 속에서 포착한 리듬 풍경 RhythmScape입니다.',
    note: 'TODO: verify source information & extract embedded YouTube link',
    links: [
      {
        label: 'Watch RhythmScape on YouTube ↗',
        url: 'https://www.youtube.com/@rhythmgrapher',
      },
    ],
  },
  {
    id: 'drumscape',
    title: 'DrumScape',
    category: 'DRUM SCAPE',
    description: '드럼 사운드와 몸짓의 조형적 확장을 다룬 DrumScape 작업입니다.',
    note: 'TODO: verify source information & extract embedded YouTube link',
    links: [
      {
        label: 'Watch DrumScape on YouTube ↗',
        url: 'https://www.youtube.com/@rhythmgrapher',
      },
    ],
  },
];
