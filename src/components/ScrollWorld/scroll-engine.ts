/**
 * scroll-world — portable scroll-scrubbed camera-flight engine
 * Integrated & adapted for RhythmGrapher Next.js App Router
 */

export interface ScrollWorldSection {
  id: string;
  label: string;
  still: string;
  stillMobile?: string;
  clip?: string;
  clipMobile?: string;
  accent?: string;
  scroll?: number;
  linger?: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  tags?: string[];
  cta?: {
    primary?: { label: string; href: string; onClick?: () => void };
    secondary?: { label: string; href: string; onClick?: () => void };
  };
}

export interface ScrollWorldConfig {
  brand?: { name: string; href?: string };
  cta?: { label: string; href?: string; onClick?: () => void };
  hint?: string;
  diveScroll?: number;
  connScroll?: number;
  crossfade?: number;
  atmosphere?: boolean;
  nav?: boolean;
  sections: ScrollWorldSection[];
  connectors?: (string | null)[];
  connectorsMobile?: (string | null)[];
  onSectionChange?: (index: number, section: ScrollWorldSection) => void;
  onOpenArchive?: () => void;
}

interface Segment {
  kind: 'dive' | 'conn';
  si: number;
  clip?: string;
  clipM?: string;
  still?: string;
  stillM?: string;
  accent?: string;
  w: number;
  linger?: number;
  start: number;
  end: number;
  el?: HTMLElement;
  img?: HTMLImageElement;
  video?: HTMLVideoElement | null;
  hasClip?: boolean;
  loading?: boolean;
  ready?: boolean;
  cur: number;
  target: number;
  visible?: boolean;
}

export function mountScrollWorld(container: HTMLElement, config: ScrollWorldConfig) {
  if (typeof window === 'undefined') return { destroy: () => {} };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const smallMQ = window.matchMedia('(max-width: 860px)');
  const isMobile = () => coarse || smallMQ.matches;

  const SECTIONS = config.sections || [];
  const CONNECTORS = config.connectors || [];
  const CONNECTORS_M = config.connectorsMobile || [];
  const DIVE_W = config.diveScroll || 1.3;
  const CONN_W = config.connScroll || 0.9;
  const CROSSFADE = config.crossfade != null ? config.crossfade : 0.14;
  const N = SECTIONS.length;

  if (!N) return { destroy: () => {} };

  injectCSS();
  container.classList.add('sw-root');

  const SEGMENTS: Segment[] = [];
  const sectionSegMap = new Map<number, Segment>();

  SECTIONS.forEach((s, i) => {
    const dive: Segment = {
      kind: 'dive',
      si: i,
      clip: s.clip,
      clipM: s.clipMobile,
      still: s.still,
      stillM: s.stillMobile,
      accent: s.accent,
      w: s.scroll || DIVE_W,
      linger: s.linger || 0,
      start: 0,
      end: 0,
      cur: 0,
      target: 0,
    };
    SEGMENTS.push(dive);
    sectionSegMap.set(i, dive);

    if (i < N - 1 && CONNECTORS[i]) {
      SEGMENTS.push({
        kind: 'conn',
        si: i,
        clip: CONNECTORS[i] || undefined,
        clipM: CONNECTORS_M[i] || undefined,
        still: SECTIONS[i + 1].still,
        stillM: SECTIONS[i + 1].stillMobile,
        accent: SECTIONS[i + 1].accent,
        w: CONN_W,
        start: 0,
        end: 0,
        cur: 0,
        target: 0,
      });
    }
  });

  const NSEG = SEGMENTS.length;

  // Build DOM
  const sky = el('div', 'sw-sky');
  if (config.atmosphere !== false) {
    sky.appendChild(el('div', 'sw-sky__grad'));
    sky.appendChild(el('div', 'sw-sky__glow'));
  }
  const particles = el('div', 'sw-particles');
  sky.appendChild(particles);

  const scrollbar = el('div', 'sw-scrollbar');
  const scrollbarFill = el('span');
  scrollbar.appendChild(scrollbarFill);

  const stage = el('div', 'sw-stage');
  const copylayer = el('div', 'sw-copylayer');
  const route = el('div', 'sw-route');
  const hint = el('div', 'sw-hint');
  const hintText = el('span');
  hintText.textContent = config.hint || 'Scroll to explore';
  hint.appendChild(hintText);
  hint.appendChild(el('i'));
  const track = el('div', 'sw-track');

  [sky, scrollbar, stage, copylayer, route, hint, track].forEach((n) =>
    container.appendChild(n)
  );

  // Segment scenes
  SEGMENTS.forEach((s) => {
    const scene = el('div', 'sw-scene');
    if (s.accent) scene.style.setProperty('--sw-accent', s.accent);
    const img = el('img', 'sw-scene__still') as HTMLImageElement;
    img.alt = '';
    img.decoding = 'async';
    const poster = isMobile() && s.stillM ? s.stillM : s.still;
    if (poster) img.src = poster;
    scene.appendChild(img);
    stage.appendChild(scene);

    s.el = scene;
    s.img = img;
    s.video = null;
    s.hasClip = false;
    s.loading = false;
    s.ready = false;
    s.cur = 0;
    s.target = 0;
    s.visible = false;
  });

  // Per-section copy & route dots
  const copies: HTMLElement[] = [];
  const dots: HTMLButtonElement[] = [];

  SECTIONS.forEach((s, i) => {
    const c = el('article', 'sw-copy');
    if (s.accent) c.style.setProperty('--sw-accent', s.accent);

    let html = `<span class="sw-copy__num">${pad(i + 1)} / ${pad(N)}</span>`;
    if (s.eyebrow) html += `<span class="sw-copy__eyebrow">${esc(s.eyebrow)}</span>`;
    if (s.title) html += `<h2 class="sw-copy__title">${esc(s.title)}</h2>`;
    if (s.body) html += `<p class="sw-copy__body">${esc(s.body)}</p>`;
    if (s.tags && s.tags.length) {
      html += `<ul class="sw-copy__tags">${s.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
    }
    if (s.cta) {
      html += `<div class="sw-copy__cta">`;
      if (s.cta.primary) {
        html += `<a class="sw-btn sw-btn--primary" href="${esc(s.cta.primary.href)}" data-cta="primary">${esc(s.cta.primary.label)}</a>`;
      }
      if (s.cta.secondary) {
        html += `<a class="sw-btn sw-btn--ghost" href="${esc(s.cta.secondary.href)}" target="_blank" rel="noopener noreferrer">${esc(s.cta.secondary.label)}</a>`;
      }
      html += `</div>`;
    }
    c.innerHTML = html;

    // Attach custom event handlers for CTAs if needed
    if (s.cta?.primary?.onClick) {
      const btn = c.querySelector('[data-cta="primary"]');
      btn?.addEventListener('click', (e) => {
        e.preventDefault();
        s.cta?.primary?.onClick?.();
      });
    }

    copylayer.appendChild(c);
    copies.push(c);

    const dot = el('button', 'sw-route__dot') as HTMLButtonElement;
    if (s.accent) dot.style.setProperty('--sw-accent', s.accent);
    dot.innerHTML = `<span class="sw-route__label">${esc(s.label || '')}</span><i></i>`;
    dot.addEventListener('click', () => jumpTo(i));
    route.appendChild(dot);
    dots.push(dot);
  });

  const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = (x: number) => {
    x = clamp(x);
    return x * x * (3 - 2 * x);
  };
  const lingerEase = (x: number, L: number) => {
    L = clamp(L);
    const c = x - 0.5;
    return (1 - L) * x + L * (4 * c * c * c + 0.5);
  };

  let vh = window.innerHeight;
  let stageX = 0;
  let totalW = 0;
  let activeIndex = -1;
  let ticking = false;
  let laidOutW = window.innerWidth;
  let rafId = 0;
  let destroyed = false;

  function layout() {
    if (destroyed) return;
    vh = window.innerHeight;
    laidOutW = window.innerWidth;
    stageX = window.innerWidth > 860 ? 4 : 0;
    let off = 0;
    SEGMENTS.forEach((s) => {
      s.start = off * vh;
      off += s.w;
      s.end = off * vh;
    });
    totalW = off;
    track.style.height = totalW * vh + vh + 'px';
    read();
  }

  function jumpTo(i: number) {
    const seg = sectionSegMap.get(i);
    if (!seg) return;
    window.scrollTo({
      top: seg.start + (seg.end - seg.start) * 0.5,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }

  function loadClip(s: Segment) {
    if (reduce || s.loading || !s.clip || !s.el) return;
    s.loading = true;
    const url = isMobile() && s.clipM ? s.clipM : s.clip;

    fetch(url)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error('404'))))
      .then((blob) => {
        if (destroyed || !s.el) return;
        const v = document.createElement('video');
        v.className = 'sw-scene__video';
        v.muted = true;
        v.playsInline = true;
        v.preload = 'auto';
        v.setAttribute('muted', '');
        v.setAttribute('playsinline', '');
        v.src = URL.createObjectURL(blob);
        v.addEventListener('loadedmetadata', () => {
          s.ready = true;
          read();
        });
        v.addEventListener('seeked', () => {
          s.el?.classList.add('has-clip');
        }, { once: true });
        v.addEventListener('loadeddata', () => {
          try {
            v.pause();
          } catch {}
          if (userReady) primeVideo(v);
        });
        s.el.appendChild(v);
        s.video = v;
        s.hasClip = true;
      })
      .catch(() => {
        s.loading = false;
      });
  }

  function read() {
    if (destroyed) return;
    const y = window.scrollY || window.pageYOffset;
    const fade = CROSSFADE * vh;
    let ci = 0;
    for (let i = 0; i < NSEG; i++) {
      if (y >= SEGMENTS[i].start) ci = i;
    }

    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];
      if (y > s.start - 1.6 * vh && y < s.end + 1.6 * vh) loadClip(s);
      const local = clamp((y - s.start) / (s.end - s.start), 0, 1);
      s.target = s.linger ? lingerEase(local, s.linger) : local;
      let outside = 0;
      if (y < s.start) outside = s.start - y;
      else if (y > s.end) outside = y - s.end;
      const op = smooth(1 - outside / fade);
      if (s.el) {
        s.el.style.opacity = String(op);
        s.visible = op > 0.001;
        s.el.style.zIndex = i === ci ? '120' : String(100 + Math.round(op * 10));
      }
      if (s.img && (!s.hasClip || !s.ready)) {
        const sc = reduce ? 1 : 1.03 + local * 0.14;
        s.img.style.transform = `translateX(${stageX - 2}vw) scale(${sc.toFixed(3)})`;
      }
    }

    for (let i = 0; i < N; i++) {
      const seg = sectionSegMap.get(i);
      if (!seg) continue;
      const pr = clamp((y - seg.start) / (seg.end - seg.start), 0, 1);
      const before = y < seg.start;
      const after = y > seg.end;
      let cop: number;
      if (i === 0) cop = after ? 0 : smooth(1 - pr / 0.62);
      else if (i === N - 1) cop = before ? 0 : smooth(pr / 0.4);
      else cop = before || after ? 0 : smooth(1 - Math.abs(pr - 0.5) / 0.5);

      const c = copies[i];
      if (c) {
        c.style.opacity = String(cop);
        c.style.transform = reduce ? 'none' : `translateY(${(0.5 - pr) * 4}vh)`;
        c.style.pointerEvents = cop > 0.5 ? 'auto' : 'none';
      }
    }

    const cur = SEGMENTS[ci];
    const near = clamp(
      cur.kind === 'dive'
        ? cur.si
        : (y - cur.start) / (cur.end - cur.start) > 0.5
        ? cur.si + 1
        : cur.si,
      0,
      N - 1
    );

    if (near !== activeIndex) {
      activeIndex = near;
      dots.forEach((d, k) => d.classList.toggle('is-active', k === near));
      if (SECTIONS[near].accent) {
        container.style.setProperty('--sw-accent', SECTIONS[near].accent || '');
      }
      config.onSectionChange?.(near, SECTIONS[near]);
    }

    scrollbarFill.style.transform = `scaleX(${clamp(y / (totalW * vh))})`;
    hint.style.opacity = String(clamp(1 - y / (0.5 * vh)));
    if (particles) particles.style.transform = `translate3d(0, ${-y * 0.05}px, 0)`;
    ticking = false;
  }

  function raf() {
    if (destroyed) return;
    const eps = isMobile() ? 0.02 : 0.008;
    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];
      if (!s.hasClip || !s.ready || !s.video) continue;
      if (s.video.seeking) continue;
      if (!s.visible && Math.abs(s.cur - s.target) < 0.002) continue;
      s.cur += (s.target - s.cur) * (reduce ? 1 : 0.18);
      const dur = s.video.duration || 1;
      const t = clamp(s.cur, 0, 0.999) * dur;
      if (Math.abs(s.video.currentTime - t) > eps) {
        try {
          s.video.currentTime = t;
        } catch {}
      }
    }
    rafId = requestAnimationFrame(raf);
  }

  let userReady = false;
  function primeVideo(v: HTMLVideoElement | null) {
    if (!isMobile() || !v) return;
    try {
      const p = v.play();
      if (p && p.then) {
        p.then(() => {
          try {
            v.pause();
          } catch {}
        }).catch(() => {});
      }
    } catch {}
  }

  function onFirstGesture() {
    if (userReady) return;
    userReady = true;
    SEGMENTS.forEach((s) => primeVideo(s.video || null));
  }

  window.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true });
  window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true });

  seedParticles(particles, reduce || coarse);

  const scrollHandler = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(read);
    }
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  function onResize() {
    if (coarse && window.innerWidth === laidOutW) return;
    layout();
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', layout);

  layout();
  rafId = requestAnimationFrame(raf);

  // Return cleanup method for React
  return {
    destroy: () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', layout);
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('touchstart', onFirstGesture);
      container.innerHTML = '';
      container.classList.remove('sw-root');
    },
    jumpTo,
  };

  // Helpers
  function el(tag: string, cls?: string) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }
  function pad(n: number) {
    return String(n).padStart(2, '0');
  }
  function esc(s: string) {
    return String(s).replace(/[&<>"]/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c)
    );
  }
}

function seedParticles(host: HTMLElement | null, reduce: boolean) {
  if (!host || reduce) return;
  const kinds = ['dot', 'dot', 'ring'];
  const seeds = [7, 23, 41, 58, 71, 88, 12, 34, 52, 66, 83, 95, 18, 29, 47, 63, 77, 91, 5, 38, 55, 69, 82, 97];
  for (let k = 0; k < 20; k++) {
    const s = document.createElement('span');
    s.className = 'sw-pt sw-pt--' + kinds[k % kinds.length];
    s.style.left = seeds[k % seeds.length] + 'vw';
    s.style.top = ((seeds[(k * 3) % seeds.length] * 1.3) % 100) + 'vh';
    s.style.setProperty('--sw-sc', (0.5 + ((seeds[(k * 5) % seeds.length] % 60) / 60) * 1.1).toFixed(2));
    const dur = 14 + (seeds[(k * 7) % seeds.length] % 22);
    s.style.animationDuration = dur + 's';
    host.appendChild(s);
  }
}

function injectCSS() {
  if (typeof document === 'undefined' || document.getElementById('sw-css')) return;
  const css = `
  :root, .sw-root {
    --sw-bg: #09090b;
    --sw-ink: #f4f4f5;
    --sw-ink-soft: #a1a1aa;
    --sw-accent: #e5b072;
    --sw-font-display: -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif;
    --sw-font-body: -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif;
  }
  .sw-root {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--sw-bg);
    color: var(--sw-ink);
    font-family: var(--sw-font-body);
    overflow-x: clip;
  }
  .sw-sky {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 10;
    overflow: hidden;
  }
  .sw-sky__grad {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--sw-accent) 12%, transparent), transparent 70%);
    opacity: 0.8;
  }
  .sw-sky__glow {
    position: absolute;
    left: 20%;
    top: 30%;
    width: 60vw;
    height: 60vh;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--sw-accent) 10%, transparent), transparent 60%);
    filter: blur(80px);
  }
  .sw-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .sw-pt {
    position: absolute;
    border-radius: 50%;
    opacity: 0.35;
    animation: sw-drift linear infinite;
  }
  .sw-pt--dot {
    width: 3px;
    height: 3px;
    background: var(--sw-accent);
  }
  .sw-pt--ring {
    width: 8px;
    height: 8px;
    border: 1px solid var(--sw-accent);
    background: transparent;
  }
  @keyframes sw-drift {
    0% { transform: translateY(0) scale(var(--sw-sc, 1)); }
    50% { transform: translateY(-30px) scale(var(--sw-sc, 1)); }
    100% { transform: translateY(0) scale(var(--sw-sc, 1)); }
  }
  .sw-scrollbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    z-index: 60;
    background: rgba(255,255,255,0.06);
  }
  .sw-scrollbar span {
    display: block;
    height: 100%;
    width: 100%;
    transform-origin: 0 50%;
    transform: scaleX(0);
    background: var(--sw-accent);
    box-shadow: 0 0 10px var(--sw-accent);
    transition: transform 0.05s linear;
  }
  .sw-stage {
    position: fixed;
    inset: 0;
    z-index: 20;
    pointer-events: none;
  }
  .sw-scene {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.2s linear;
    will-change: opacity;
  }
  .sw-scene__still, .sw-scene__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 48%;
  }
  .sw-scene__still {
    filter: brightness(0.72) contrast(1.05);
    transition: transform 0.1s linear;
  }
  .sw-scene__video {
    opacity: 0;
    transition: opacity 0.4s ease;
    filter: brightness(0.75) contrast(1.05);
  }
  .sw-scene.has-clip .sw-scene__video {
    opacity: 1;
  }
  .sw-scene.has-clip .sw-scene__still {
    opacity: 0;
  }
  .sw-copylayer {
    position: fixed;
    inset: 0;
    z-index: 30;
    pointer-events: none;
  }
  .sw-copylayer::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 55%;
    background: linear-gradient(90deg, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.45) 60%, transparent 100%);
    pointer-events: none;
  }
  .sw-copy {
    position: absolute;
    left: clamp(24px, 7vw, 120px);
    top: 50%;
    transform: translateY(-50%);
    width: min(44vw, 540px);
    opacity: 0;
    will-change: opacity, transform;
  }
  .sw-copy__num {
    font-family: ui-monospace, Menlo, monospace;
    font-size: 0.76rem;
    letter-spacing: 0.16em;
    color: var(--sw-ink-soft);
  }
  .sw-copy__eyebrow {
    display: block;
    margin-top: 14px;
    font-family: var(--sw-font-display);
    font-weight: 600;
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--sw-accent);
  }
  .sw-copy__title {
    font-family: var(--sw-font-display);
    font-weight: 600;
    color: var(--sw-ink);
    font-size: clamp(2.1rem, 4.2vw, 3.6rem);
    line-height: 1.15;
    margin: 12px 0 0;
    letter-spacing: -0.02em;
    text-shadow: 0 4px 24px rgba(0,0,0,0.8);
  }
  .sw-copy__body {
    margin-top: 18px;
    font-size: clamp(0.98rem, 1.2vw, 1.12rem);
    line-height: 1.7;
    color: color-mix(in srgb, var(--sw-ink) 82%, var(--sw-ink-soft));
    text-shadow: 0 2px 14px rgba(0,0,0,0.8);
  }
  .sw-copy__tags {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 22px 0 0;
    padding: 0;
  }
  .sw-copy__tags li {
    font-size: 0.78rem;
    font-weight: 500;
    color: color-mix(in srgb, var(--sw-accent) 85%, #fff);
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(229, 176, 114, 0.1);
    border: 1px solid rgba(229, 176, 114, 0.28);
    backdrop-filter: blur(6px);
  }
  .sw-copy__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
    pointer-events: auto;
  }
  .sw-btn {
    text-decoration: none;
    font-weight: 600;
    font-size: 0.92rem;
    padding: 12px 24px;
    border-radius: 999px;
    transition: transform 0.2s, background 0.2s, border-color 0.2s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .sw-btn--primary {
    color: #09090b;
    background: var(--sw-accent);
    border: 1px solid var(--sw-accent);
  }
  .sw-btn--primary:hover {
    transform: translateY(-2px);
    background: #fff;
    border-color: #fff;
  }
  .sw-btn--ghost {
    color: var(--sw-ink);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(6px);
  }
  .sw-btn--ghost:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.12);
    border-color: var(--sw-accent);
  }
  .sw-route {
    position: fixed;
    right: clamp(16px, 2.8vw, 36px);
    top: 50%;
    z-index: 40;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding: 18px 10px;
  }
  .sw-route::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 22px;
    bottom: 22px;
    width: 1px;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.15);
  }
  .sw-route__dot {
    position: relative;
    border: 0;
    background: transparent;
    cursor: pointer;
    width: 16px;
    height: 16px;
    display: grid;
    place-items: center;
  }
  .sw-route__dot i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
  }
  .sw-route__dot:hover i {
    transform: scale(1.3);
    background: var(--sw-accent);
  }
  .sw-route__dot.is-active i {
    background: var(--sw-accent);
    transform: scale(1.4);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--sw-accent) 25%, transparent);
  }
  .sw-route__label {
    position: absolute;
    right: 26px;
    top: 50%;
    transform: translateY(-50%) translateX(6px);
    white-space: nowrap;
    font-size: 0.74rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--sw-ink);
    background: rgba(18, 18, 20, 0.85);
    backdrop-filter: blur(8px);
    padding: 5px 12px;
    border-radius: 999px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s, transform 0.25s;
    border: 1px solid rgba(255,255,255,0.12);
  }
  .sw-route__dot:hover .sw-route__label,
  .sw-route__dot.is-active .sw-route__label {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
  .sw-hint {
    position: fixed;
    left: 50%;
    bottom: 28px;
    z-index: 30;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--sw-ink-soft);
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .sw-hint i {
    width: 20px;
    height: 32px;
    border-radius: 12px;
    border: 1.5px solid rgba(255,255,255,0.3);
    position: relative;
  }
  .sw-hint i::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 6px;
    width: 3px;
    height: 6px;
    border-radius: 2px;
    background: var(--sw-accent);
    transform: translateX(-50%);
    animation: sw-wheel 1.7s ease-in-out infinite;
  }
  @keyframes sw-wheel {
    0% { opacity: 0; top: 6px; }
    40% { opacity: 1; }
    100% { opacity: 0; top: 16px; }
  }
  .sw-track {
    position: relative;
    z-index: 1;
    width: 100%;
    pointer-events: none;
  }
  @media (max-width: 860px) {
    .sw-copylayer::before {
      width: 100%;
      height: 70%;
      top: auto;
      bottom: 0;
      background: linear-gradient(0deg, rgba(9,9,11,0.95) 15%, rgba(9,9,11,0.6) 60%, transparent 100%);
    }
    .sw-copy {
      left: clamp(20px, 5vw, 40px);
      right: clamp(20px, 5vw, 40px);
      top: auto;
      bottom: calc(clamp(48px, 10vh, 90px) + env(safe-area-inset-bottom));
      transform: none;
      width: auto;
      max-width: 540px;
    }
    .sw-copy__title {
      font-size: clamp(1.8rem, 7vw, 2.5rem);
    }
    .sw-copy__body {
      font-size: clamp(0.92rem, 3.4vw, 1.05rem);
      line-height: 1.6;
    }
    .sw-route {
      right: 8px;
      gap: 16px;
    }
    .sw-route__label {
      display: none;
    }
  }
  `;

  const style = document.createElement('style');
  style.id = 'sw-css';
  style.textContent = css;
  document.head.appendChild(style);
}
