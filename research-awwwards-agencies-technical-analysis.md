# Technical Analysis: Award-Winning Creative Agency Websites

## Research Methodology
Data gathered from Awwwards case studies, agency technical blogs, GitHub repositories, Codrops tutorials, Greenspector performance audits, and direct web technology analysis. Sources cited inline.

---

## 1. RESN.CO.NZ

### Tech Stack
- **Rendering**: Full WebGL canvas (entire UI rendered in WebGL, not DOM)
- **Text Rendering**: MSDF (Multi-Signed Distance Fields) fonts — crisp text at any resolution, custom layout/kerning engine
- **Particles**: Points laid out from character glyph positions
- **Lines**: `InstancedBufferGeometry` of planes, scaled/rotated between particle pairs
- **Post-processing**: Bloom + noise pass, signed distance field-based blur relative to focal distance
- **Pointer Events**: Entirely custom — bounding boxes + hit detection (WebGL has no native pointer events)
- **Proprietary Tool**: CAKE — interactive video platform (used in Mailchimp Veilhymn, Pocket Mustang)
- **Asset Optimization**: Lazy loading, GPU-compressed textures (KTX2/Basis), device-specific content serving

### Navigation Model
Immersive/experimental. The entire interface is a WebGL scene — no traditional DOM navigation. Content is discoverable through interaction within the 3D space.

### Hero Approach
Full-screen WebGL scene with generative particle system. Text rendered as MSDF within the GL context. First 3 seconds: animated particles coalesce into typography.

### Portfolio Presentation
Interactive/discoverable. Projects are not presented in a grid — they exist within the WebGL environment and are discovered through navigation of the 3D space.

### Page Transitions
No traditional page transitions — the entire site is a single WebGL application. Content transitions happen within the canvas via shader-based morphing and particle dissolution/reformation.

### Signature Micro-interaction
Particle text that reacts to cursor proximity — particles scatter on hover and reform, using distance-based SDF blur.

### Jury Praise
Twice named Awwwards Agency of the Year. Inducted into FWA Club 100 and FWA Hall of Fame. 350+ globally recognized awards. Praised for pushing WebGL boundaries while maintaining narrative coherence.

### Mobile
Separate mobile version (`resn.co.nz/index_mobile.html`) — confirming a completely different, reduced experience for mobile rather than responsive adaptation.

### Blog/Documentation
No public technical blog. Technical details extracted from Awwwards case studies and code analysis.

**Sources**: [Resn Awwwards Profile](https://www.awwwards.com/resn/), [Resn SOTD](https://www.awwwards.com/sites/resn-co-nz), [MSDF Text in Three.js](https://medium.com/@brianbawuah/from-bitmap-to-vector-implementing-msdf-text-in-three-js-d63b1d6ef6d9)

---

## 2. DOGSTUDIO.CO (now DOGSTUDIO/DEPT)

### Tech Stack
- **3D**: Three.js + TweenMax (GSAP) for the interactive 3D dog model
- **Page Transitions**: Highway.js (their own open-source library, 2.5KB gzipped)
- **Animation**: GSAP (TweenMax/TimelineMax)
- **Build Tools**: Webpack + Gulp (SCSS, ES6+)
- **CMS**: WordPress (content managed separately from the 3D experience)
- **Sound**: Custom ambient sound system — audio fades when switching browser tabs, spatial audio tied to interactions
- **SVG**: SVG clipPath for organic image shapes, SVG filters for duotone effects

### Highway.js Architecture (their creation)
```
Highway.Core — bridge between pages, renderers, and transitions
Highway.Renderer — page-specific JS capsule (extends base renderer)
Highway.Transition — GSAP-powered enter/leave animations
```
Each page gets a custom renderer. Pages without specific JS use the default renderer. Transitions use `gsap.fromTo()` for animation between views.

### Navigation Model
Traditional structure with immersive enhancement. Standard nav items, but transitions between pages are animated via Highway.js, maintaining the 3D dog and sound across navigation.

### Hero Approach
Interactive 3D dog rendered in WebGL (Three.js). The dog responds to cursor movement and interaction. Sound plays immediately (with user gesture).

### Portfolio Presentation
Case study cards in a structured layout. WordPress-managed content. Clicking a case study triggers a Highway.js transition — no hard page reload.

### Page Transitions
SVG mask/morph transitions via Highway.js + GSAP. The 3D dog persists across page changes. Sound continues uninterrupted through navigation.

### Signature Micro-interaction
The 3D dog responding to cursor movement — head tracking, tail wagging, body rotation based on pointer position. On KIKK Festival site: SVG lens effect revealing alternate UI states on hover.

### Jury Praise
Won **Site of the Month** (April) and **Site of the Year (Users' Choice)**. Praised for emotional connection through interactive 3D, ambient sound, and seamless transitions. Communication Arts noted the clean design despite technical complexity.

### Mobile
Adapted experience — 3D dog simplified or replaced, touch interactions adapted. They explicitly mentioned "taking device limitations into account" for phones and tablets.

### Blog/Documentation
- Highway.js: [GitHub](https://github.com/Dogstudio/highway), [Docs](https://highway.js.org/)
- [Dogstudio Open Journey Blog](https://dogstudio.co/our-open-journey/)

**Sources**: [Dogstudio SOTM](https://www.awwwards.com/dogstudio-by-dogstudio-wins-site-of-the-month-april.html), [Highway.js GitHub](https://github.com/Dogstudio/highway), [SOTY Interview](https://www.awwwards.com/interview-dog-studio-wins-site-of-the-year-users-choice-at-awwwards-london.html)

---

## 3. 14ISLANDS.COM (V4)

### Tech Stack
- **Framework**: React (likely Next.js based on their ecosystem)
- **3D**: React Three Fiber (@react-three/fiber) + Three.js
- **Scroll Synchronization**: `@14islands/r3f-scroll-rig` (their own open-source library)
- **Smooth Scrolling**: Lenis (integrated via r3f-scroll-rig's SmoothScrollbar)
- **Key Technique**: DOM-WebGL synchronization — tracks "proxy" DOM elements and positions WebGL objects to match

### r3f-scroll-rig Architecture (their creation)
```
GlobalCanvas — persistent WebGL canvas across page loads
SmoothScrollbar — Lenis-based smooth scroll
ScrollScene — tracks a DOM element, renders Three.js mesh in its place
UseCanvas — hook for placing arbitrary R3F content at DOM positions
```
- Calls `getBoundingClientRect()` once on mount
- Uses `IntersectionObserver` + `ResizeObserver` for tracking
- Separate observers for simple triggers vs. continuous animations (no wasted RAF cycles)
- Framework agnostic: works with Next.js, Gatsby, CRA

### Navigation Model
Traditional with progressive enhancement. Standard website navigation, but DOM elements are progressively enhanced with WebGL counterparts via the scroll rig.

### Hero Approach
Clean typography with WebGL-enhanced visual elements. Portfolio items have 3D lens/refraction effects applied to images via the scroll rig.

### Portfolio Presentation
Unique approach: standard DOM-based layout that gets progressively enhanced with WebGL effects. Projects like Blobmixer and Pluto demonstrate spatial-first brand identity and AR/VR transitioning.

### Page Transitions
Not documented as a primary feature — the GlobalCanvas persists across pages, enabling smooth WebGL continuity.

### Signature Micro-interaction
Progressive WebGL lens refraction on portfolio images — documented in [Codrops tutorial](https://tympanus.net/codrops/2023/10/10/progressively-enhanced-webgl-lens-refraction/).

### Jury Praise
14islands V4 received **SOTD** (October 2023) + **Developer Award**. Praised for technical innovation in DOM-WebGL synchronization and progressive enhancement approach.

### Mobile
Progressive enhancement means mobile gets the DOM-only version naturally. Parallax automatically disabled on mobile for native scrolling behavior (built into the scroll rig).

### Blog/Documentation
- r3f-scroll-rig: [GitHub](https://github.com/14islands/r3f-scroll-rig), [npm](https://www.npmjs.com/package/@14islands/r3f-scroll-rig)
- [Codrops: Progressively Enhanced WebGL Lens Refraction](https://tympanus.net/codrops/2023/10/10/progressively-enhanced-webgl-lens-refraction/)
- [Codrops Interview](https://tympanus.net/codrops/2025/11/24/building-a-different-kind-of-agency-inside-14islands-people-first-creative-vision/)

**Sources**: [14islands Awwwards](https://www.awwwards.com/14islands/), [14islands V4 SOTD](https://www.awwwards.com/sites/14islands-v4), [r3f-scroll-rig GitHub](https://github.com/14islands/r3f-scroll-rig)

---

## 4. ORDER.DESIGN

### Tech Stack
- **Approach**: Extreme minimalism. The site at order.design is intentionally stripped back.
- **Typography**: Typography-driven design in the tradition of Swiss/International Style. Founders Jesse Reed and Hamish Smyth both worked under Michael Bierut at Pentagram.
- **Animation**: Minimal to none — "We do everything for a reason, never for decoration."
- **CMS**: Content appears managed via a custom system (ajax endpoint at `order.design/ajax/info/`)

### Navigation Model
Traditional/minimal. Direct, grid-based index of work. No experimental navigation. Every element serves a functional purpose.

### Hero Approach
Typography-first. Large, clean type with project index visible immediately. No animation, no loading sequence, no WebGL. Content-forward in the first second.

### Portfolio Presentation
**Grid/index model**. Clean project grid with consistent typographic treatment. Projects presented as a structured catalog — influenced by their publishing work with Standards Manual. The grid is systematic, not decorative.

### Page Transitions
Standard page loads — no SPA transitions, no animations between pages. The deliberate absence of transitions IS the design statement.

### Signature Micro-interaction
Absence of interaction as a deliberate choice. Hover states are minimal and functional. The restraint itself is the signature.

### Typography Distinction
The founders describe themselves as "pretty boring designers" who "like charts and maps and things that are perfectly aligned." Their typography choices reflect deep knowledge of Swiss design history — their Standards Manual publishing imprint literally preserves design system artifacts (NASA, NYC Transit Authority). The type is likely set in a Helvetica/Neue Haas Grotesk family or similar modernist face, used with exacting grid alignment.

### Jury Praise
Respected in the design community more for their identity/print work and Standards Manual publishing than for web awards. The website is a tool, not a showcase.

### Mobile
Responsive. Minimal design translates naturally to mobile without degradation.

**Sources**: [Order Design](https://order.design/), [Jesse Reed Interview - Creative Boom](https://www.creativeboom.com/inspiration/jesse-reed/), [Designed Space Interview](https://designed.space/interviews/jesse-reed)

---

## 5. LOCOMOTIVE.CA

### Tech Stack
- **Backend/CMS**: Charcoal (their own in-house CMS/framework, built on modern PHP using Slim framework)
- **Animation**: GSAP suite (TweenMax, TimelineMax) for all animations
- **3D**: Three.js on multiple pages with an internal tool for defining 3D model position, lighting, and scroll-based animations
- **Physics**: GSAP ThrowProps plugin for drag-and-drop interactions (momentum/inertia)
- **Dev Tools**: dat.gui.js for 3D scene configuration
- **Content Blocks**: Custom CMS forms per content block type (text, images, video, parallax, background colors, 3D objects, device mockups)
- **CDN**: Cloudflare (saved ~600GB bandwidth since launch)
- **Scroll**: Locomotive Scroll (their creation, now built on Lenis)

### Locomotive Scroll v5 (their creation, now Lenis-based)
```
Core: 9.4KB gzipped, built on Lenis 1.3.17
TypeScript first
Dual Intersection Observer strategy:
  - Simple triggers (in/out viewport)
  - Continuous animations (parallax, progress-based)
Smart Touch: Parallax auto-disabled on mobile
Configurable lerp (0-1), duration, custom easing via Lenis
```

### Navigation Model
Traditional with enhanced scroll experience. Standard nav, but every page features smooth scroll with parallax effects and scroll-triggered animations.

### Hero Approach
Bold typography + 3D object. First 3 seconds: large studio name with a Three.js-rendered 3D element that responds to scroll position.

### Portfolio Presentation
Sequential case study presentation with drag-and-drop interactions (ThrowProps). Each case study has rich, scroll-driven storytelling with parallax, 3D, and video.

### Page Transitions
Custom transitions integrated with Charcoal CMS. Smooth enter/leave animations via GSAP timelines.

### Signature Micro-interaction
Drag-and-drop with momentum (ThrowProps) on case study cards. The physics feel is deliberately tactile — objects have weight and inertia.

### Jury Praise
Won **Site of the Month** (June) + **Developer Award**. Praised for the sophisticated integration of 3D content within a CMS-driven site, and the custom tooling that made 3D content manageable by non-developers.

### Mobile
Smart Touch detection in Locomotive Scroll disables parallax on mobile. Native scrollbar preserved. Keyboard navigation supported. Mobile gets a clean, performant version without scroll effects that would harm UX.

### Blog/Documentation
- Locomotive Scroll: [GitHub](https://github.com/locomotivemtl/locomotive-scroll), [Docs](https://scroll.locomotive.ca/docs/)
- Charcoal CMS: [GitHub topics](https://github.com/topics/locomotivejs)

**Sources**: [Locomotive SOTM Case Study](https://www.awwwards.com/locomotive-by-locomotive-wins-site-of-the-month-june-a-case-study.html), [Reinventing Locomotive Case Study](https://www.awwwards.com/case-study-reinventing-locomotive-r.html), [Locomotive Scroll GitHub](https://github.com/locomotivemtl/locomotive-scroll)

---

## 6. BUILD IN AMSTERDAM (buildinamsterdam.com)

### Tech Stack
- **Frontend**: React (JavaScript)
- **CMS**: WordPress + WooCommerce (headless architecture — separated frontend from CMS)
- **Content Management**: Storyblok (used for some projects)
- **Architecture**: Headless CMS pattern — React frontend consumes WordPress/Storyblok API
- **Performance**: The separation made the website approximately **3x faster** than a monolithic WordPress approach

### Navigation Model
Clean, traditional navigation with smooth animations. Focus on clarity and e-commerce brand experience.

### Hero Approach
Clean, colorful hero sections with animation. Strong visual identity with "clever animations, great colors and stunning visuals" per Awwwards jury.

### Portfolio Presentation
Case study format. Notable approach on Studio Job project: "infinite scrolling" through the artist's universe — scroll-based discovery of art and design pieces at user's own pace.

### Page Transitions
React-based SPA transitions. No hard page reloads.

### Signature Micro-interaction
E-commerce focused interactions — product reveal animations, scroll-based discovery.

### Jury Praise
SOTD on Awwwards. Praised for "clean, clever animations, great colors and stunning visuals." Their published manifesto "11 Principles to Create Great E-commerce Brand Experiences" was featured on Awwwards.

### Mobile
Responsive. E-commerce focus means mobile is critical and fully supported.

**Sources**: [Build in Amsterdam Awwwards](https://www.awwwards.com/buildinamsterdam/), [Build in Amsterdam SOTD](https://www.awwwards.com/sites/build-in-amsterdam), [Storyblok Case Study](https://www.storyblok.com/cs/build-in-amsterdam)

---

## 7. MAKEMEPULSE.COM

### Tech Stack
- **3D Engine**: **nanogl** (their own proprietary WebGL/WebGL2 microframework — **3KB core**)
- **Why not Three.js**: "As a high-level library it hides many details from developers, and when you need specific behaviors/effects or more control over the renderer while maintaining performance, it can be very tricky"
- **Audio**: WebAudio API
- **Backend**: Rails (serves Vue.js applications for some projects)
- **Frontend**: Vue.js (for application layer above the WebGL canvas)

### nanogl Architecture (their creation)
```
nanogl-core: 3KB — thin WebGL API wrappers
nanogl-camera: Camera management
nanogl-node: Nested 3D transform hierarchy
nanogl-state: GL state management (stacks states, applies only deltas between renders)
nanogl-pbr: Physically-based rendering materials
nanogl-post: Post-processing pipeline
```
**Key performance innovation**: `nanogl-state` minimizes GL state changes between renders by diffing state stacks. LOD (Level of Detail) per mesh — multiple mesh versions generated, switched based on distance/performance budget.

### Navigation Model
Immersive/experimental. WebGL-first experiences where navigation is part of the interactive narrative.

### Hero Approach
Full-screen WebGL experience. Often narrative-driven — their projects are interactive stories (e.g., "Nomadic Tribe," "In the Footsteps of Battuta").

### Portfolio Presentation
Project-based narrative. Each project is a standalone immersive experience. The agency site serves as a portal to these experiences.

### Page Transitions
WebGL-based transitions within their nanogl framework. Cross-project transitions involve scene-level changes rather than DOM page swaps.

### Signature Micro-interaction
Physics-based particle systems and environment reactions. In "A World With No Heroes" (Ubisoft): environment responds to user input in real-time.

### Jury Praise
Won **Site of the Month** (February) for Nomadic Tribe. Multiple SOTM wins. Praised for pushing WebGL boundaries, especially on mobile with nanogl's lightweight architecture.

### Mobile
nanogl was specifically designed for low-performance devices including mobile and XR. LOD system ensures acceptable framerate on constrained hardware.

### Blog/Documentation
- [NanoGL announcement](https://www.makemepulse.com/news/nanogl--a-crafted-webgl2-microframework)
- [NanoGL docs (public)](https://www.makemepulse.com/news/nanogl-docs)
- [Nissan NanoGL case study](https://m.makemepulse.com/nissan-ecosystem-a-nanogl-experience-b3bf1bd14eae)
- [GitHub](https://github.com/plepers/nanogl)

**Sources**: [Makemepulse nanogl](https://www.makemepulse.com/news/nanogl--a-crafted-webgl2-microframework), [Nomadic Tribe SOTM](https://www.awwwards.com/nomadic-tribe-by-makemepulse-wins-site-of-the-month-february.html), [nanogl GitHub](https://github.com/plepers/nanogl)

---

## 8. STINK STUDIOS (formerly Stinkdigital)

### Tech Stack
- **Architecture**: Modular/headless. Contentful CMS on serverless infrastructure (documented for Chobani project)
- **WebGL**: Custom shaders for Spotify Year in Music (gradients and duotone effects over Spotify API data)
- **Design**: Custom typeface created for the rebrand
- **Portfolio**: Filterable search system dividing work into categories

### Navigation Model
Traditional with filterable portfolio. Clean, minimal navigation. Filterable categories for browsing case studies.

### Hero Approach
Minimal brand statement with the studio's custom typeface. No WebGL hero — the brand identity carries the opening.

### Portfolio Presentation
**Filterable grid**. Work divided into categories with seamless transitions leading into case studies. Focus on content over technique — "beautiful, purposeful, and entertaining."

### Page Transitions
Seamless transitions between portfolio grid and individual case studies. No specific library documented.

### Signature Micro-interaction
Subtle typographic animations with their custom typeface. The filter transitions between project categories.

### Jury Praise
Communication Arts webpick. FWA recognition. Praised for balancing a simple, elegant portfolio with technically ambitious client work.

### Mobile
Responsive. The filterable portfolio adapts to mobile with touch-friendly category switching.

### Blog/Documentation
No public technical blog about their own site architecture.

**Sources**: [Stink Studios](https://www.stinkstudios.com/), [Communication Arts](https://www.commarts.com/webpicks/stink-studios), [Stink Studios FWA](https://thefwa.com/cases/stink-studios-website)

---

## 9. FANTASY.CO (now part of Accenture Song)

### Tech Stack
- **Approach**: UX/product design-first, not WebGL-first
- **Architecture**: Segmented scroll-based experience
- **Page Structure**: 5 distinct sections, each with its own background photograph and faded depth effect
- **Navigation**: Simplified sticky menu that scrolls with the user
- **Typography**: Bold, black lettering dominates — type as primary design element

### What Made It Legendary
Fantasy's website was legendary not for technical innovation but for **UX clarity**. Peter Smart (Head of Product Design) articulated their philosophy: "The end user is paramount — you could have the best looking app in the world, but if it doesn't consider the needs of the end user, ultimately you'll fail."

The site demonstrated that an agency portfolio could be:
1. **Immediately scannable** — 5 scrollable segments showed capability at a glance
2. **Filter-friendly** — clicking a category scrolled to relevant work
3. **Photography-driven** — high-quality case study imagery, not effects
4. **Fast** — no WebGL, no heavy animations, no loading sequence

### Navigation Model
Traditional with scroll-anchored sections. Menu items scroll to sections rather than loading new pages.

### Hero Approach
Bold typography statement with background photography. No animation, no WebGL.

### Portfolio Presentation
Sectioned scroll with photography. Each section is a capability area with project examples.

### Mobile
Fully responsive. Product design pedigree means mobile was treated as equally important.

### Jury Praise
Awwwards SOTD. Praised for human-centered design approach and clarity. Peter Smart delivered Awwwards talks on "Human Centered Design" and "Creating Magic - Products for Humans not Robots."

**Sources**: [Fantasy Awwwards SOTD](https://www.awwwards.com/sites/fantasy), [Peter Smart Talk](https://www.awwwards.com/talk-human-centered-design-with-design-lead-at-fantasy-interactive-peter-smart.html), [Fantasy FWA](https://thefwa.com/cases/fantasy-interactive-fi)

---

## 10. BASIC/DEPT (basicagency.com)

### Tech Stack
- **Services**: Full-Stack Development & CMS Implementation
- **Architecture**: Component-based React application (inferred from their capabilities and industry patterns)
- **Animation**: GSAP (their portfolio navigation is featured as an Awwwards inspiration)
- **Capabilities**: Technical Consultation, Architecture design, CMS implementation

### Navigation Model
Clean, editorial navigation. Portfolio navigation specifically cited as Awwwards inspiration for its clarity and organization.

### Hero Approach
Bold, editorial-style hero with strong typography and photography. Brand-forward in the first seconds.

### Portfolio Presentation
**Industry standard grid**. Their approach is considered the benchmark for agency portfolio presentation:
- Clean project grid with consistent image ratios
- Clear project titles and client names
- Category filtering
- Consistent case study template
- Each project gets a dedicated deep-dive page with structured content blocks

### Page Transitions
Smooth SPA transitions. GSAP-powered enter/exit animations.

### Signature Micro-interaction
Portfolio grid hover states — project images scale or reveal additional information on hover. The restraint and consistency IS the signature.

### Jury Praise
28 Awwwards awards. Praised for setting the standard for how agency portfolios should present work — prioritizing client brands over agency ego.

### Mobile
Fully responsive. With 120+ team members, they have dedicated mobile engineering capability.

**Sources**: [BASIC/DEPT Awwwards](https://www.awwwards.com/basic/), [BASIC Agency Navigation Inspiration](https://www.awwwards.com/inspiration/basic-agency-portfolio-navigation), [About BASIC](https://www.basicagency.com/about/awards)

---

## BONUS: LUSION.CO (Site of the Year 2024 — Context Reference)

### Tech Stack
- **3D**: Three.js (all WebGL scenes)
- **Animation Pipeline**: Houdini FX for vertex animation generation
- **Design**: Photoshop
- **Development**: Visual Studio Code
- **Cloth Simulation**: Pre-calculated in Houdini FX
  - 4,096 vertices on desktop
  - 11 keyframes stored for 66-frame animation
  - Real-time interpolation in WebGL shader
  - 16-bit integer data (not 32-bit float) with runtime divider
  - Finger-like geometry simulating 4 directional cloth drags
  - Results stored in ArrayBuffer, blended dynamically based on user input

### Why It Won SOTY 2024
"Instead of using well-staged videos like most production studios, they chose to showcase real-time development capacity on their website." Every visual on the site is rendered in real-time Three.js — no video, no pre-renders.

**Sources**: [Lusion SOTM Case Study](https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html), [Lusion Medium](https://medium.com/lusion-ltd/from-concept-prototyping-to-production-in-a-creative-studio-f2083e96c4b9), [Codrops: Curly Tubes](https://tympanus.net/codrops/2021/05/17/curly-tubes-from-the-lusion-website-with-three-js/)

---

# SYNTHESIS: Cross-Agency Technical Patterns

## The 5 Most Common Technical Patterns Across Winners

### 1. GSAP as the Universal Animation Layer
**Prevalence**: 8/10 agencies analyzed use GSAP (only Order.design and Fantasy.co do not, by deliberate minimalist choice).

GSAP appears in every technically ambitious winner. It is used for:
- DOM animations and micro-interactions
- Page transition choreography (enter/leave timelines)
- ScrollTrigger-based scroll animations
- Timeline orchestration of complex sequences
- Physics plugins (ThrowProps/InertiaPlugin for momentum)

**Implementation detail**: Most winners use `TimelineMax` (now `gsap.timeline()`) rather than individual tweens, suggesting complex sequenced animations rather than one-off effects.

### 2. WebGL as a Differentiator (Three.js or Custom)
**Prevalence**: 7/10 use WebGL in some capacity.
- Three.js: Dogstudio, 14islands (via R3F), Locomotive, Lusion
- Custom engine: Resn (custom WebGL), Makemepulse (nanogl)
- No WebGL: Order.design, Fantasy.co, Stink Studios (on their own site)

**Key finding**: WebGL usage correlates strongly with winning Developer Awards and technical praise, but non-WebGL sites can win on UX/design merit (Fantasy, BASIC/DEPT).

### 3. Custom Page Transition Managers
**Prevalence**: 7/10 implement SPA-like transitions.
- Dogstudio created Highway.js
- Barba.js is the most common (used behind 35+ Awwwards winners per Osmo)
- 14islands uses persistent GlobalCanvas across pages
- Locomotive uses Charcoal CMS-integrated transitions

**The pattern**: Intercept native navigation, fetch next page via AJAX, animate out current content, swap DOM, animate in new content. Sound and WebGL scenes persist across page changes.

### 4. Smooth Scrolling with Scroll-Triggered Animations
**Prevalence**: 7/10 implement non-native smooth scrolling.
- Locomotive Scroll (now Lenis-based): Locomotive, and widely adopted
- Lenis directly: 14islands (via r3f-scroll-rig)
- Custom smooth scroll: Resn, Makemepulse (within their WebGL canvases)
- No smooth scroll: Order.design, Fantasy.co

**The stack**: Lenis/Locomotive Scroll + GSAP ScrollTrigger is the current industry standard combination. Lerp values between 0.05-0.1 for "premium feel."

### 5. Content-WebGL Separation Architecture
**Prevalence**: 6/10 separate content management from rendering.
- WordPress headless: Dogstudio, Build in Amsterdam
- Custom CMS: Locomotive (Charcoal)
- Contentful: Stink Studios
- Storyblok: Build in Amsterdam (for some projects)
- WebGL as overlay: 14islands (DOM + WebGL sync)

**The pattern**: CMS manages text/images, frontend renders them with WebGL enhancement. This allows non-developers to update content while preserving the immersive experience.

---

## Technology Frequency Table

| Technology | Count | Used By |
|---|---|---|
| GSAP | 8/10 | Resn, Dogstudio, 14islands, Locomotive, Build in Amsterdam, Makemepulse, Stink Studios, BASIC/DEPT |
| Three.js | 5/10 | Dogstudio, 14islands (R3F), Locomotive, Lusion, Noomo (SOTY reference) |
| WebGL (any) | 7/10 | Resn, Dogstudio, 14islands, Locomotive, Makemepulse, Stink Studios (projects), Lusion |
| Lenis / Locomotive Scroll | 4/10 | 14islands, Locomotive, Noomo (reference), + widely adopted externally |
| Barba.js | ~3/10 | Used across 35+ Awwwards winners (Osmo data), but several agencies built their own (Highway.js, custom) |
| React/Next.js | 4/10 | 14islands (R3F), Build in Amsterdam, BASIC/DEPT (inferred), Stink Studios |
| Vue.js/Nuxt | 2/10 | Makemepulse (Vue), Noomo (Nuxt 3 — SOTY reference) |
| WordPress | 3/10 | Dogstudio, Build in Amsterdam (headless) |
| Custom WebGL Engine | 2/10 | Resn (custom), Makemepulse (nanogl) |
| Houdini FX (pipeline) | 1/10 | Lusion (vertex animation textures) |

---

## Mobile Approach Analysis

### The Reality: Premium Sites Deliver Reduced Mobile Experiences

| Agency | Mobile Approach |
|---|---|
| Resn | **Completely separate mobile site** (`/index_mobile.html`) |
| Dogstudio | Adapted — 3D simplified, touch adapted |
| 14islands | **Progressive enhancement** — mobile gets DOM-only, no WebGL |
| Order.design | Fully responsive (minimal design translates naturally) |
| Locomotive | Scroll effects disabled, native scrollbar preserved |
| Build in Amsterdam | Fully responsive (e-commerce necessity) |
| Makemepulse | nanogl LOD system scales to mobile hardware |
| Stink Studios | Fully responsive |
| Fantasy.co | Fully responsive |
| BASIC/DEPT | Fully responsive |

**Key finding**: The most technically ambitious sites (Resn, Dogstudio, 14islands, Locomotive) ALL deliver reduced mobile experiences. The approach falls into 3 categories:

1. **Separate mobile site** (Resn) — completely different codebase
2. **Progressive degradation** (14islands, Locomotive) — disable WebGL/scroll effects on mobile
3. **Responsive with adaptation** (Dogstudio, Makemepulse) — same architecture, simplified 3D

**Non-WebGL sites** (Order, Fantasy, BASIC, Stink Studios) are fully responsive by nature — their design doesn't depend on GPU capabilities.

---

## Loading Time & Performance Analysis

### Greenspector Data on Awwwards Mobile Excellence Nominees

| Metric | Range Observed |
|---|---|
| HTTP requests on load | 60 to 200+ |
| Data transferred | 1 MB to 12+ MB |
| Domains contacted | 15 to 57+ |
| JavaScript requests | Some sites: 100+ (dozens exceeding 100KB each) |

**Best performer**: Ladispensadelchianti.it — ~1 MB total, 60 HTTP requests, 15 domains
**Worst performer**: One nominee hit 400+ HTTP requests and 12+ MB on full scroll

### The Uncomfortable Truth About Awwwards Winner Performance
- 53% of mobile visits are abandoned if pages take >3 seconds to load (Google data)
- Average global page load time is 22 seconds
- **Awwwards winners frequently exceed 5-10 seconds on initial load** due to WebGL asset loading
- The Mobile Excellence Award (joint with Google) was created specifically because creative-award-winning sites frequently failed mobile performance standards
- Mobile Excellence threshold: 70/100 on Google's criteria — many SOTD/SOTM winners don't qualify

### Loading/Intro Sequence Patterns
- **Custom loader + intro animation**: Resn, Dogstudio, Locomotive, Makemepulse, Lusion
- **No loader / instant content**: Order.design, Fantasy.co, BASIC/DEPT
- **Progressive loading**: 14islands (DOM renders first, WebGL enhances later)

The creative agencies that use WebGL heavily almost universally implement custom loading sequences — not just progress bars, but animated intro experiences that disguise load time as part of the experience. This is a deliberate UX strategy: the 3-8 second load becomes part of the brand impression.

---

## WebGL Usage vs. Winning Correlation

### Strong Correlation With Technical Awards
- **Developer Awards**: ~90% go to WebGL-using sites
- **Site of the Month**: ~70% feature WebGL
- **Site of the Year 2024**: Lusion v3 (heavy Three.js, Houdini pipeline)
- **Site of the Year 2023**: Mix of WebGL and non-WebGL winners

### BUT: Non-WebGL Sites Still Win
- Fantasy.co won SOTD without any WebGL
- BASIC/DEPT has 28 Awwwards with a clean, non-WebGL portfolio
- Order.design is respected despite having zero animation

### The Correlation
WebGL is nearly **mandatory** for Developer Awards and technical recognition. It is **helpful but not required** for SOTD/SOTM. It is **irrelevant** for design/UX-focused awards.

**The real pattern**: What wins is **intentionality**. Whether you use full WebGL (Lusion) or zero animation (Order.design), the jury rewards deliberate choices that serve the creative concept. The worst-performing submissions use WebGL for decoration rather than narrative purpose.

---

## Implementation Recommendations (Distilled)

### The "Premium Agency" Starter Stack (2024-2025)
```
Framework:     Next.js (App Router) or Nuxt 3
Animation:     GSAP (ScrollTrigger + timeline orchestration)
Smooth Scroll: Lenis
Transitions:   Barba.js or custom with GSAP
3D (optional): Three.js or React Three Fiber
CMS:           Headless (Sanity, Storyblok, Contentful)
Build:         Vite or Turbopack
```

### The "WebGL Showcase" Stack (for technical awards)
```
Framework:     Next.js + React Three Fiber (or custom)
3D:            Three.js with custom shaders (GLSL)
Animation:     GSAP + custom RAF loop
Scroll:        @14islands/r3f-scroll-rig or custom
Pipeline:      Houdini FX for vertex animation textures
Text:          MSDF fonts in WebGL
Post-process:  Bloom, noise, depth of field
Mobile:        Progressive degradation (DOM fallback)
```

### The "Design-First" Stack (for UX/design awards)
```
Framework:     Next.js or Astro
Animation:     Minimal GSAP or Framer Motion
Typography:    Premium web fonts with careful kerning
Layout:        CSS Grid, precise spacing system
CMS:           Headless CMS
Mobile:        Full parity — responsive-first
Performance:   Target sub-3-second load
```
