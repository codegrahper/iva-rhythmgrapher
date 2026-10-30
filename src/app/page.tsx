import { discographyItems } from '@/content/discography';
import { bioContent } from '@/content/bio';
import { externalLinks } from '@/content/links';
import { PortfolioMotion } from '@/components/PortfolioMotion';

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/assets/${path}`;
const albums = [...discographyItems].reverse();
const summaries: Record<string, string> = {
  resequence4: '사물놀이의 네 악기를 해체하고, 하나의 호흡으로 다시 엮다.',
  '낯섬에-떠도는-그리움': '여행에서 만난 32개의 풍경. 사진과 음악으로 쓰는 여행 에세이.',
  redrums: '거문고의 현과 몸통에서 시작된 소리, 드러머의 몸짓으로 다시 태어나다.',
  'human-fractal': '닮음과 어긋남 사이, 사람과 사람의 관계를 소리로 묻다.',
};

export default function Home() {
  return <>
    <PortfolioMotion />
    <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
    <header className="masthead">
      <a className="wordmark" href="#intro" aria-label="리듬그래퍼 처음으로">rhythmgrapher<span className="brand-dot">.</span></a>
      <nav aria-label="주 메뉴"><a href="#works">Works</a><a href="#discography">Music</a><a href="#bio-timeline">About</a><a href="#contact">Contact <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="main-content">
      <section className="hero" id="intro" aria-labelledby="hero-heading">
        <div className="hero-image"><img src={asset('portfolio/performance-hero.webp')} alt="푸른 무대 조명 아래 원형으로 배치된 드럼을 연주하는 양태석" fetchPriority="high" /></div>
        <div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow">YANG TAESEOK · SOUND & VISUAL ARTIST</p><h1 id="hero-heading">리듬을<br />그리는 사람.</h1><p className="hero-description">몸짓에서 소리로, 소리에서 풍경으로.<br />드러머 양태석의 음악과 시각적 실험.</p></div>
        <div className="hero-bottom"><span>RHYTHM / SOUND / MOVEMENT</span><a href="#works">작업을 만나보세요 <span aria-hidden="true">↓</span></a></div>
      </section>
      <section id="works" className="works-section section-shell" aria-labelledby="works-title">
        <div className="section-heading"><p className="eyebrow">01 / SELECTED WORKS</p><h2 id="works-title">소리가 머무는 장면들</h2><p>연주하고, 여행하고, 새로운 형태를 찾습니다.</p></div>
        <div className="story-grid">
          <div className="story-visual" aria-hidden="true">
            <img className="story-frame is-active" data-frame="0" src={asset('images/concept-market.jpg')} alt="" loading="lazy" />
            <img className="story-frame" data-frame="1" src={asset('portfolio/travel-atacama.webp')} alt="" loading="lazy" />
            <img className="story-frame" data-frame="2" src={asset('portfolio/exhibition.webp')} alt="" loading="lazy" />
            <span className="image-index">SELECTED WORKS / <span id="scene-index">01</span></span>
          </div>
          <div className="story-chapters">
            <article className="story-chapter" data-chapter="0"><img className="mobile-story" src={asset('images/concept-market.jpg')} alt="시장 한가운데 펼쳐진 양태석의 드럼 퍼포먼스" loading="lazy" /><p className="eyebrow">PERFORMANCE</p><h3>몸짓이<br />음악이 되는 순간.</h3><p>익숙한 악기의 경계를 넘어, 몸의 움직임으로 소리를 만듭니다. 무대와 일상의 공간에서 이어온 드럼 퍼포먼스.</p><a className="text-link" href="#performance-film">연주 영상 보기 <span aria-hidden="true">↗</span></a></article>
            <article className="story-chapter" data-chapter="1"><img className="mobile-story" src={asset('portfolio/travel-atacama.webp')} alt="넓은 하늘과 산맥이 펼쳐진 아타카마의 풍경" loading="lazy" /><p className="eyebrow">PHOTOGRAPHY & MUSIC</p><h3>낯선 풍경에서<br />나의 리듬을 찾다.</h3><p>세계 곳곳을 여행하며 담은 32장의 사진과 32곡의 음악. 「낯섬에 떠도는 그리움」은 소리로도 읽을 수 있는 여행 에세이입니다.</p><a className="text-link" href="https://youtube.com/playlist?list=PLkAQJ15VOXjxmjuu1cueVf8w1pf3DxTFO" target="_blank" rel="noreferrer">사진과 음악 만나기 <span aria-hidden="true">↗</span></a></article>
            <article className="story-chapter" data-chapter="2"><img className="mobile-story" src={asset('portfolio/exhibition.webp')} alt="낯섬에 떠도는 그리움 전시의 사진과 빛" loading="lazy" /><p className="eyebrow">EXHIBITION</p><h3>사진을 듣고,<br />소리를 바라보다.</h3><p>풍경의 기억이 전시 공간으로 이어집니다. QR 코드로 사진 속 음악을 만나는 음악사진전, 「낯섬에 떠도는 그리움」.</p><p className="caption">Gallery One · 2021.11.06–11.12</p></article>
          </div>
        </div>
      </section>
      <section id="rhythmgraph" className="new-work section-shell" aria-labelledby="rhythmgraph-title">
        <div className="new-work-copy"><p className="eyebrow">02 / NEW EXPLORATION</p><h2 id="rhythmgraph-title">Rhythmgraph<span className="brand-dot">.</span></h2><h3>몸짓이 음표가 되고,<br />음표가 글자가 됩니다.</h3><p>드럼의 타격에 맞춰 한글 자모가 모이고 흩어지는 영상 실험. 연주와 악보, 가사를 하나의 움직임으로 연결합니다.</p><div className="rhythm-letters" aria-label="초성, 중성, 종성이 모여 한글이 됩니다"><span>ㄱ</span><span>ㅏ</span><span>ㅁ</span><i aria-hidden="true">→</i><strong>감</strong></div><p className="caption">하이햇 · 초성 &nbsp; / &nbsp; 스네어 · 중성 &nbsp; / &nbsp; 킥 · 종성</p></div>
        <figure className="rhythm-film"><video controls playsInline preload="none" poster={asset('portfolio/rhythmgraph-poster.webp')} aria-label="Rhythmgraph 여행 연주와 한글 모션그래픽 미리보기"><source src={asset('portfolio/rhythmgraph-preview.mp4')} type="video/mp4" /></video><figcaption>Rhythmgraph / 「여행」 연주 발췌 · 18초 · 무음</figcaption></figure>
      </section>
      <section className="motion-study section-shell" aria-labelledby="study-title"><figure><video controls playsInline preload="none" poster={asset('portfolio/motion-poster.webp')} aria-label="한글 리듬 문법 타격면 모션그래픽 연구 미리보기"><source src={asset('portfolio/motion-preview.mp4')} type="video/mp4" /></video><figcaption>「몸으로 찾아가다」 · 16초 발췌 · 무음</figcaption></figure><div><p className="eyebrow">RHYTHMGRAPH / STUDY IN PROGRESS</p><h2 id="study-title">한글 리듬 문법</h2><p>한글 자모의 관계를 드럼으로 연주합니다.<br />타격마다 글자가 변하고, 쉼을 지나<br />하나의 음절에 도착합니다.</p><p className="caption">연주 · 한글 · 모션그래픽 / 연구 중</p></div></section>
      <section id="discography" className="music-section section-shell" aria-labelledby="music-title">
        <div className="section-heading"><p className="eyebrow">03 / DISCOGRAPHY</p><h2 id="music-title">소리로 남긴 기록</h2><p>각 음반을 펼치면 작업 이야기와 크레딧을 볼 수 있어요.</p></div>
        <div className="album-grid">{albums.map((album, index) => <article className="record" key={album.id}>
          <div className="record-cover"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${album.artwork}`} alt={`${album.title} 음반 아트워크`} loading="lazy" width="600" height="600" /></div>
          <div className="record-meta"><span>0{index + 1}</span><span>{album.id === 'human-fractal' ? '2014' : album.id === '낯섬에-떠도는-그리움' ? '2021' : album.releaseDate}</span></div>
          <h3>{album.title}</h3><p>{summaries[album.id]}</p>
          <details className="record-details"><summary>작업 이야기 <span aria-hidden="true">+</span></summary><div className="record-story">{album.description?.map((p,i)=><p key={i}>{p}</p>)}{album.review && <><p className="eyebrow">ALBUM REVIEW / {album.review.author}</p>{album.review.text.map((p,i)=><p key={i}>{p}</p>)}</>}<h4>Credits</h4><ul>{album.credits.map(c=><li key={c}>{c}</li>)}</ul>{album.links?.map(l=><a className="text-link" key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label}</a>)}</div></details>
        </article>)}</div>
      </section>
      <section id="performance-film" className="film-section section-shell" aria-labelledby="film-title"><div className="section-heading"><p className="eyebrow">04 / MOVING IMAGE</p><h2 id="film-title">리듬의 다른 풍경</h2></div><div className="film-grid"><figure><video controls playsInline preload="none" poster={asset('images/concept-performance.jpg')} aria-label="DrumScape Blackwood 연주 영상"><source src={asset('videos/blackwood.mp4')} type="video/mp4" /></video><figcaption><span>DrumScape</span><span>Blackwood</span></figcaption></figure><figure><video controls playsInline preload="none" poster={asset('images/concept-market.jpg')} aria-label="RhythmScape Istanbul 영상"><source src={asset('videos/rhythmscape-istanbul.mp4')} type="video/mp4" /></video><figcaption><span>RhythmScape</span><span>Istanbul</span></figcaption></figure></div></section>
      <section id="bio-timeline" className="about-section section-shell" aria-labelledby="bio-title"><div className="about-photo"><img src={asset('portfolio/portrait.webp')} alt="리듬그래퍼 양태석의 초상" loading="lazy" width="1000" height="1500" /><p className="caption">YANG TAESEOK / RHYTHMGRAPHER</p></div><div className="about-copy"><p className="eyebrow">05 / ABOUT THE ARTIST</p><h2 id="bio-title">매일매일<br />새롭기 위하여.</h2><p className="about-lead">여행과 예술을 사랑하는<br />시골 드러머, 양태석입니다.</p><p>삶과 여행에서 만나는 강함과 여림, 느림과 빠름, 채움과 비움. 그 차이와 대비에서 발견한 리듬으로 연주하고, 사진을 찍고, 새로운 작업을 만듭니다.</p><p>저의 이름을 건 드럼스쿨에서 일상을 살고, 떠났다가 다시 돌아옵니다. 내가 좋아하고, 내 것을 좋아하는 낯선 누군가와 친구가 되는 일을 사랑합니다.</p><div className="timeline"><div><time>2023</time><p>자동차로 유라시아 횡단<span>37,478km의 여정</span></p></div><div><time>2022</time><p>REsequence 4<span>Re:DRUMS Vol.2</span></p></div><div><time>2021</time><p>낯섬에 떠도는 그리움<span>음반 · 음악사진전</span></p></div><div><time>2011</time><p>Drum? Quest<span>두산아트센터 솔로 퍼포먼스</span></p></div></div><details className="history-details"><summary>더 많은 여정과 활동 <span aria-hidden="true">+</span></summary><div className="history-groups">{[{title:'여행',items:bioContent.history.travel},{title:'공연',items:bioContent.history.soloPerformances},{title:'협업',items:[...bioContent.history.teamExhibitions,'2022 윤회매십전 · 사운드']}].map(g=><div key={g.title}><h3>{g.title}</h3><ul>{g.items.map(i=><li key={i}>{i}</li>)}</ul></div>)}</div></details></div></section>
      <section id="contact" className="contact-section section-shell"><p className="eyebrow">06 / KEEP IN TOUCH</p><h2>다음 리듬이<br />만나는 곳.</h2><div className="contact-bottom"><p>작업에 관한 이야기, 공연과 협업의 제안.<br />인스타그램에서 이야기를 건네주세요.</p><div className="contact-links">{externalLinks.map(l=><a href={l.url} key={l.url} target="_blank" rel="noreferrer">{l.label === 'MyLOG' ? 'Journal' : l.label === 'DRUM SCHOOL' ? 'Drum School' : l.label}<span aria-hidden="true">↗</span></a>)}</div></div></section>
    </main>
    <footer className="site-bottom"><a className="wordmark" href="#intro">rhythmgrapher.</a><span>© 2026 YANG TAESEOK</span><a href="#intro">Back to top ↑</a></footer>
  </>;
}
