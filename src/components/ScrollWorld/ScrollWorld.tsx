'use client';

import React, { useEffect, useRef } from 'react';
import { mountScrollWorld, ScrollWorldSection } from './scroll-engine';

interface ScrollWorldProps {
  onOpenArchive: () => void;
  onSectionChange?: (index: number, section: ScrollWorldSection) => void;
}

export const ScrollWorld: React.FC<ScrollWorldProps> = ({
  onOpenArchive,
  onSectionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections: ScrollWorldSection[] = [
      {
        id: 'intro',
        label: 'INTRO',
        still: '/assets/images/hero-sunrise-metronome.jpg',
        accent: '#e5b072', // Dawn golden amber
        scroll: 1.4,
        linger: 0.35,
        eyebrow: 'RHYTHMGRAPHER',
        title: 'Rhythm / Sound / Movement',
        body: '찰나의 시간과 파동, 자연과 호흡의 틈새에서 건져 올린 리듬그래퍼 양태석의 세계.',
        tags: ['RhythmGrapher', 'Sound Artist', 'Eurasia Journey'],
        cta: {
          primary: {
            label: 'Explore Story ↓',
            href: '#concept',
          },
          secondary: {
            label: 'Open Archive [ ☰ ]',
            href: '#archive',
            onClick: onOpenArchive,
          },
        },
      },
      {
        id: 'concept',
        label: 'CONCEPT',
        still: '/assets/images/concept-market.jpg',
        clip: '/assets/videos/blackwood.mp4',
        accent: '#d48b5e', // Warm wood tone
        scroll: 1.5,
        linger: 0.45,
        eyebrow: 'RHYTHM + GRAPHER',
        title: '리듬을 그리는 사람',
        body: '삶과 여행에서 마주한 ‘강함과 여림’, ‘느림과 빠름’, ‘채움과 비움’의 대비에서 리듬을 발견하고, 악기와 소리의 경계를 허무는 실험과 연주를 이어갑니다.',
        tags: ['Sensory Percussion', 'Live Electronics', 'Acoustic & Digital'],
      },
      {
        id: 'bio',
        label: 'BIOGRAPHY',
        still: '/assets/images/bio-atacama.jpg',
        accent: '#7fa9c6', // Desert sky blue
        scroll: 1.5,
        linger: 0.45,
        eyebrow: 'BIOGRAPHY',
        title: '매일매일 새롭기 위하여',
        body: '“낡은 것들을 버리고 새로운 나를 만나기 위해.” 자동차로 유라시아 대륙 37,478km를 횡단하고 세계 곳곳의 낯선 소리를 담아온 시골 드러머의 여정.',
        tags: ['Eurasia 37,478km', '32 Tracks Nostalgia', 'Earth & Cloud'],
        cta: {
          secondary: {
            label: 'Full Timeline & Bio ↗',
            href: '#bio-timeline',
            onClick: onOpenArchive,
          },
        },
      },
      {
        id: 'featured',
        label: 'FEATURED',
        still: '/assets/images/concept-performance.jpg',
        clip: '/assets/videos/rhythmscape-istanbul.mp4',
        accent: '#c8965a', // Cymbal bronze
        scroll: 1.6,
        linger: 0.5,
        eyebrow: 'FEATURED WORK & ARCHIVE',
        title: 'REsequence & RhythmScape',
        body: '거문고의 현과 사물놀이의 파동을 해체·재해석한 Re:DRUMS 시리즈부터 공간의 결을 담아낸 RhythmScape까지. 깊은 아카이브를 탐색해보세요.',
        tags: ['RhythmScape Istanbul', 'Re:DRUMS Vol.1 & 2', 'Human Fractal'],
        cta: {
          primary: {
            label: 'Open Full Archive (전체 아카이브 열기)',
            href: '#archive',
            onClick: onOpenArchive,
          },
          secondary: {
            label: 'Drum School Notion ↗',
            href: 'https://www.notion.so/drumqube/3029e569fced80fba915f78957b20c45',
          },
        },
      },
    ];

    const instance = mountScrollWorld(containerRef.current, {
      hint: 'Scroll to explore ↓',
      diveScroll: 1.4,
      crossfade: 0.15,
      atmosphere: true,
      sections,
      onSectionChange,
      onOpenArchive,
    });

    return () => {
      instance.destroy();
    };
  }, [onOpenArchive, onSectionChange]);

  return <div ref={containerRef} id="world" />;
};
