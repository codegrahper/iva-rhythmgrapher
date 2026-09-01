# RHYTHMGRAPHER — Phase 1 Website Rebuild

## 0. 프로젝트 목표

기존 Wix `rhythmgrapher.com`의 콘텐츠를 새로운 코드 기반 웹사이트로 이전한다.

Phase 1에서는 기존 디자인을 복제하지 않는다.

목표는 다음 세 가지다.

1. 기존 사이트의 텍스트 콘텐츠를 빠짐없이 보존한다.
2. 복잡한 상위/하위 페이지 구조를 하나의 심플한 랜딩 페이지 정보 구조로 재편한다.
3. 향후 Scroll World 인터랙션을 적용하기 쉬운 콘텐츠 구조를 만든다.

이번 단계는 **Content Architecture First** 작업이다.

---

# 1. Phase 1 핵심 원칙

## 유지

- 기존 사이트의 모든 의미 있는 텍스트
- 작품명
- 앨범명
- 발매 정보
- 크레딧
- BIO
- 작품 설명
- 외부 링크
- YouTube 링크
- Drum School 링크
- MyLOG 링크
- Instagram 링크
- Contact 정보
- PDF 링크가 필요한 경우 다운로드 링크

## 제거

- Wix 음악 플레이어
- Wix Gallery
- 이미지
- 배경 이미지
- 앨범 커버 이미지
- 사진
- 영상 파일
- YouTube iframe embed
- 자동 재생
- 슬라이더
- 캐러셀
- Wix 애니메이션
- Wix 레이아웃
- Wix 전용 코드
- CMS
- 데이터베이스

YouTube 콘텐츠는 영상 자체를 삽입하지 않고 다음과 같은 일반 링크만 사용한다.

`Watch on YouTube ↗`

모든 외부 링크는 새 탭에서 열 수 있도록 처리한다.

---

# 2. 기술 스택

Phase 1에서는 의존성을 최소화한다.

권장:

- Next.js
- App Router
- TypeScript
- plain CSS
- Vercel
- GitHub

사용하지 않는다:

- Tailwind
- UI Component Library
- GSAP
- Framer Motion
- Three.js
- CMS
- Database
- Scroll World engine
- Higgsfield
- Monid

Scroll World 관련 코드와 영상 생성은 Phase 1에 포함하지 않는다.

Phase 1은 완전히 정적인 텍스트 사이트여야 한다.

---

# 3. 새로운 정보 구조

기존의 여러 페이지를 아래 6개의 큰 섹션으로 재편한다.

## 01 — INTRO

RHYTHMGRAPHER

사이트와 작업자의 가장 짧은 소개.

현재 홈페이지에서 의미 있는 텍스트가 있다면 이 영역으로 이동한다.

---

## 02 — RHYTHMGRAPHER

기존:

`/rhythm-grapher`

내용:

- RHYTHM
- 리듬을 그리는 사람
- RHYTHM GRAPHER
- RhythmGrapher에 대한 정의와 설명

이 섹션은 프로젝트의 개념을 설명한다.

---

## 03 — BIO

기존:

`/blank-6`

BIO 페이지의 모든 텍스트를 보존한다.

하위 정보:

- Biography
- Discography history
- Solo Exhibition
- Travel
- Solo Performance
- Team Exhibition
- 기타 기존 프로필 정보

이미지는 사용하지 않는다.

---

## 04 — DISCOGRAPHY

기존의 Discography 페이지들을 하나의 섹션 아래에 배치한다.

### Human Fractal

기존:
`/humanfractal`

표시:

- 작품명
- 발매일
- 설명
- 제작 정보
- 연주자
- Credits
- YouTube 링크가 있다면 표시

---

### 현의 몸짓 — Re:DRUMS Vol.1

기존:
`/redrums`

표시:

- 작품명
- 작품 설명
- 제작 정보
- Credits
- Full Story PDF 링크
- Press Review 링크
- YouTube 링크가 있다면 표시

---

### 낯섬에 떠도는 그리움

기존:
`/낯섬에-떠도는-그리움`

표시:

- 작품명
- 발매일
- 작품 설명
- 리뷰
- Credits
- YouTube 링크가 있다면 표시

---

### REsequence 4 — Re:DRUMS Vol.2

기존:
`/resequence4`

표시:

- 작품명
- 작품 설명
- 리뷰
- 제작 정보
- Credits
- YouTube 링크가 있다면 표시

---

# 05 — WORKS

기존 Works 하위 페이지를 하나의 Works 섹션 안에 넣는다.

### Performance

기존:
`/performance`

텍스트가 존재하면 모두 이전한다.

영상은 넣지 않는다.

YouTube 주소가 존재한다면:

`Watch Performance on YouTube ↗`

형태로 링크만 표시한다.

---

### TimeScape

기존:
`/timescape`

텍스트 + YouTube 링크만 사용한다.

---

### RhythmScape

기존:
`/rhythmscape`

텍스트 + YouTube 링크만 사용한다.

---

### DrumScape

기존:
`/drumscape`

텍스트 + YouTube 링크만 사용한다.

---

# 06 — LINKS / CONTACT

한 섹션으로 단순화한다.

포함:

DRUM SCHOOL  
MyLOG  
Instagram  
Email / Contact

기존 Wix Contact Form은 Phase 1에서 제거해도 된다.

우선 이메일 링크:

`mailto:`

또는 Contact 텍스트만 제공한다.

실제 Contact Form은 필요할 때 Phase 2에서 추가한다.

---

# 4. Navigation

상단 Navigation 역시 6개 항목만 사용한다.

RHYTHMGRAPHER  
BIO  
DISCOGRAPHY  
WORKS  
LINKS  
CONTACT

모두 같은 페이지 내부 anchor navigation으로 동작한다.

예:

`/#rhythmgrapher`

`/#bio`

`/#discography`

`/#works`

`/#links`

`/#contact`

별도의 페이지 이동은 Phase 1에서 최소화한다.

---

# 5. 사이트 구조

Phase 1에서는 기본적으로 Single Page Website로 만든다.

예:

```text
/
├── Header
│
├── Intro
│
├── RhythmGrapher
│
├── Bio
│
├── Discography
│   ├── Human Fractal
│   ├── 현의 몸짓
│   ├── 낯섬에 떠도는 그리움
│   └── REsequence 4
│
├── Works
│   ├── Performance
│   ├── TimeScape
│   ├── RhythmScape
│   └── DrumScape
│
├── Links
│
├── Contact
│
└── Footer
```

---

# 6. 콘텐츠와 화면 코드 분리

매우 중요하다.

사이트의 텍스트를 React component 내부에 직접 길게 작성하지 않는다.

콘텐츠를 별도의 데이터 파일로 관리한다.

예:

```text
src/
├── app/
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Header.tsx
│   ├── Section.tsx
│   ├── DiscographyItem.tsx
│   ├── WorkItem.tsx
│   ├── ExternalLink.tsx
│   └── Footer.tsx
│
└── content/
    ├── site.ts
    ├── bio.ts
    ├── discography.ts
    ├── works.ts
    └── links.ts
```

또는 하나의:

```text
content.ts
```

파일로 시작해도 된다.

Phase 1에서는 단순한 쪽을 선택한다.

---

# 7. 향후 Scroll World를 위한 데이터 구조

각 주요 랜딩 섹션에는 고유 ID를 부여한다.

```ts
type SiteSection = {
  id: string
  eyebrow?: string
  title: string
  body?: string
}
```

예:

```ts
const sections = [
  {
    id: "intro",
    title: "RHYTHMGRAPHER"
  },
  {
    id: "rhythmgrapher",
    title: "리듬을 그리는 사람"
  },
  {
    id: "bio",
    title: "BIO"
  },
  {
    id: "discography",
    title: "DISCOGRAPHY"
  },
  {
    id: "works",
    title: "WORKS"
  },
  {
    id: "contact",
    title: "CONTACT"
  }
]
```

나중에 이 6개 섹션을 각각 Scroll World의 하나의 Scene으로 사용할 수 있도록 한다.

따라서 DOM 구조와 콘텐츠 구조를 강하게 결합하지 않는다.

---

# 8. Phase 1 디자인

디자인 목표:

**Editorial / Minimal / Typography First**

색상:

- background: black 또는 off-black
- text: white 또는 off-white
- muted text: gray

장식은 최소화한다.

사용 가능한 요소:

- typography
- whitespace
- thin divider
- section number
- small uppercase label
- text link
- hover underline

사용하지 않는다:

- gradient
- card UI 남발
- border box 남발
- rounded card
- glassmorphism
- glow
- decorative icon
- stock graphic
- hero image
- background video

사이트의 시각적 중심은 텍스트다.

---

# 9. Typography

영문과 한글 모두 읽기 쉬운 구조로 한다.

우선 시스템 폰트 또는 무료 웹폰트 하나만 사용한다.

예:

```css
font-family:
  Pretendard,
  "Noto Sans KR",
  Arial,
  sans-serif;
```

Display font와 Body font를 여러 개 혼용하지 않는다.

Scroll World 디자인 단계에서 최종 typography를 다시 결정한다.

---

# 10. 기본 화면

첫 화면은 매우 단순해야 한다.

예:

```text
RHYTHMGRAPHER

Rhythm / Sound / Movement

Scroll to explore

↓
```

단, 기존 사이트에 존재하지 않는 브랜드 설명 문장을 임의로 만들어 추가하지 않는다.

새로운 문장이 필요하면 TODO로 남긴다.

---

# 11. 콘텐츠 이전 규칙

코딩 에이전트는 기존 Wix 사이트의 텍스트를 임의로 수정하지 않는다.

금지:

- 문장 개선
- 문체 통일
- 번역
- 요약
- 내용 추가
- 날짜 수정
- 크레딧 수정
- 작품명 변경

기존 콘텐츠에 서로 다른 날짜나 표현이 있어도 자동으로 수정하지 않는다.

다음과 같이 표시한다.

```text
TODO: verify source information
```

콘텐츠 정리는 별도의 Phase에서 진행한다.

---

# 12. Old URL 처리

새 사이트가 완성되기 전까지 기존 URL 정보를 기록한다.

예:

```text
/blank-6
/rhythm-grapher
/humanfractal
/redrums
/낯섬에-떠도는-그리움
/resequence4
/performance
/timescape
/rhythmscape
/drumscape
/blank-7
```

Phase 1에서는 `/` 랜딩 페이지에 콘텐츠를 통합한다.

실제 도메인을 새 사이트로 이전할 때는 기존 URL을 적절한 anchor 또는 새 URL로 redirect한다.

예:

```text
/humanfractal
→ /#human-fractal
```

이 작업은 콘텐츠 구축이 끝난 뒤 한다.

---

# 13. Gallery 처리

기존 Gallery는 이미지 전용 콘텐츠이므로 Phase 1에서는 완전히 제외한다.

Navigation에서도 제거한다.

나중에 필요하면 별도 Archive 또는 Gallery로 다시 만들 수 있다.

---

# 14. YouTube 규칙

YouTube iframe을 사용하지 않는다.

Thumbnail도 사용하지 않는다.

영상 자동 로딩도 하지 않는다.

오직 텍스트 링크만 사용한다.

예:

```text
Watch on YouTube ↗
```

또는:

```text
YouTube — Performance ↗
```

---

# 15. 접근성

최소한 다음 기준은 지킨다.

- semantic HTML
- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`
- heading 순서 유지
- 키보드 navigation
- 충분한 text contrast
- focus-visible
- external link 명확하게 표시

이미지가 없으므로 alt 처리 문제는 없다.

---

# 16. SEO 기본값

Phase 1에서만 다음을 적용한다.

- page title
- meta description
- canonical
- Open Graph text metadata
- sitemap
- robots.txt
- semantic heading hierarchy

Open Graph 이미지는 Phase 1에서는 없어도 된다.

---

# 17. Responsive

Desktop / Tablet / Mobile 모두 동일한 콘텐츠 구조를 유지한다.

복잡한 breakpoint를 만들지 않는다.

기본:

```text
content max-width: 약 960–1200px
body text column: 약 600–760px
```

모바일에서는 자연스럽게 1 column으로 축소한다.

---

# 18. Animation

Phase 1에는 애니메이션을 넣지 않는다.

허용:

- 링크 hover
- 아주 짧은 opacity transition

금지:

- scroll animation
- parallax
- reveal animation
- smooth-scroll dependency
- GSAP
- canvas
- WebGL

Scroll World 작업과 충돌할 수 있기 때문이다.

---

# 19. Phase 1 작업 순서

## STEP 1 — Content Inventory

현재 Wix 사이트의 모든 공개 페이지를 조사한다.

각 페이지에서:

- URL
- Page title
- Heading
- Paragraph
- Credit
- Date
- External link
- YouTube link
- PDF link

를 추출한다.

결과를:

```text
CONTENT_INVENTORY.md
```

에 기록한다.

---

## STEP 2 — Sitemap Mapping

현재 Wix hierarchy와 새로운 hierarchy를 비교한다.

결과를:

```text
SITE_MAP.md
```

에 기록한다.

형식:

```text
OLD URL
→ NEW SECTION
→ NEW ANCHOR
```

---

## STEP 3 — Content Data

확인된 텍스트를:

```text
src/content/
```

에 저장한다.

이 단계에서는 CSS 작업을 최소화한다.

---

## STEP 4 — Semantic HTML

6개의 main section을 구현한다.

1. Intro
2. RhythmGrapher
3. Bio
4. Discography
5. Works
6. Contact / Links

---

## STEP 5 — Minimal Styling

Typography, width, spacing, divider만 적용한다.

목표는 완성된 디자인이 아니라:

**정보 구조가 한눈에 읽히는 것**

이다.

---

## STEP 6 — Links

다음 링크를 검사하고 연결한다.

- YouTube
- Drum School
- MyLOG
- Instagram
- Press Review
- PDF
- 기타 기존 외부 링크

깨진 링크는 삭제하지 않는다.

`TODO / broken source link`

로 기록한다.

---

## STEP 7 — QA

검사:

- 기존 텍스트 누락 여부
- 작품명
- 날짜
- Credits
- 한국어 깨짐
- 외부 링크
- 모바일
- heading hierarchy
- keyboard navigation

---

# 20. Phase 1 완료 기준

다음 조건을 모두 충족하면 완료다.

- Wix의 의미 있는 텍스트가 모두 이전됨
- 이미지 0개
- 영상 파일 0개
- YouTube iframe 0개
- Wix music player 0개
- Gallery 0개
- animation dependency 0개
- CMS 0개
- database 0개
- 하나의 랜딩 페이지에서 전체 콘텐츠 탐색 가능
- 6개 major section 구조 완성
- 모든 작품이 Discography 또는 Works 하위에 위치
- 모든 외부 링크 확인
- Desktop/Mobile 모두 읽을 수 있음
- 콘텐츠 데이터와 UI 코드가 분리되어 있음

---

# 21. Phase 2 — 추후 작업

Phase 1에서는 하지 않는다.

Phase 2에서:

- 카피 정리
- 영문/한글 hierarchy 개선
- 최종 typography
- section pacing
- navigation 디자인
- motion direction

을 결정한다.

---

# 22. Phase 3 — Scroll World

Phase 1의 6개 section을 Scroll World의 6개 Scene으로 변환한다.

예:

```text
SCENE 01 — INTRO
SCENE 02 — RHYTHM
SCENE 03 — BIO
SCENE 04 — DISCOGRAPHY
SCENE 05 — WORKS
SCENE 06 — CONTACT
```

이 단계에서 처음으로:

- scene art direction
- camera style
- still generation
- video generation
- connector clips
- scroll scrub engine
- mobile video strategy

를 결정한다.

Phase 1에서는 이 작업을 절대 선행하지 않는다.

---

# 23. Coding Agent 핵심 지시

Before writing code:

1. Audit the current public RhythmGrapher website.
2. Create `CONTENT_INVENTORY.md`.
3. Create `SITE_MAP.md`.
4. Extract all meaningful text exactly as published.
5. Do not download or use images or videos.
6. Do not embed YouTube.
7. Preserve YouTube URLs as text links only.
8. Flatten the existing Wix hierarchy into six semantic landing-page sections.
9. Store content separately from UI components.
10. Do not redesign or rewrite the content.
11. Build the semantic text-only version first.
12. Do not add animation.
13. Do not add Scroll World yet.
14. Do not invent missing information.
15. Mark uncertain source information with TODO.
16. Finish all six sections before polishing visual design.

The result should feel like a clean editorial document on the web, not a finished cinematic website.

The architecture must make it possible to replace the static section background later with a Scroll World scrubbed visual layer without rewriting the site's content.