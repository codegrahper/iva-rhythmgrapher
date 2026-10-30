'use client';
import { useEffect } from 'react';

/** Native scroll remains in control; only the selected photograph changes. */
export function PortfolioMotion() {
  useEffect(() => {
    const chapters = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
    const frames = [...document.querySelectorAll<HTMLElement>('[data-frame]')];
    const index = document.getElementById('scene-index');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const active = (entry.target as HTMLElement).dataset.chapter;
        frames.forEach(frame => frame.classList.toggle('is-active', frame.dataset.frame === active));
        if(index) index.textContent = String(Number(active) + 1).padStart(2,'0');
      });
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
    chapters.forEach(chapter => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);
  return null;
}
