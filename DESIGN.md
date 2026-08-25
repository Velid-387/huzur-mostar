---
name: Huzur Mostar
description: Pastel, handwritten-card visual system for a Mostar flower shop — script headings, tissue-paper colors, pill buttons that glow on touch.
colors:
  rose-deep: "#df7b99"
  tissue-pink: "#f5c0c0"
  mint-leaf: "#c8e4b2"
  sage-deep: "#7cad7f"
  sky-wash: "#b5e3eb"
  lavender-wash: "#d9c6e0"
  peach-wash: "#f8d6b3"
  butter-wash: "#f5e6ad"
  rose-ink: "#a85a72"
  sage-ink: "#4f7d53"
  slate-ink: "#4a5759"
  charcoal-text: "#333333"
  muted-text: "#666666"
  paper-white: "#ffffff"
  linen-off-white: "#f8f9fa"
  footer-mist: "#f7f7f7"
  hairline: "#e0e0e0"
  rose-deep-dark: "#b56c82"
  tissue-pink-dark: "#c09a9a"
  mint-leaf-dark: "#91b478"
  sage-deep-dark: "#5a8d5e"
  sky-wash-dark: "#84b5c1"
  lavender-wash-dark: "#b09cb8"
  night-slate: "#333a3c"
  night-surface: "#1e1e1e"
  night-deep: "#121212"
  night-text: "#e9e9e9"
  success-bg: "#d4edda"
  success-text: "#155724"
  error-bg: "#f8d7da"
  error-text: "#721c24"
  danger: "#dc3545"
typography:
  display:
    fontFamily: "'Alex Brush', cursive"
    fontSize: "5.5rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.5px"
  headline:
    fontFamily: "'Alex Brush', cursive"
    fontSize: "3.2rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.5px"
  title:
    fontFamily: "'Alex Brush', cursive"
    fontSize: "2.2rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.5px"
  subtitle:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "20px"
  full: "50%"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "4rem"
  section: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.tissue-pink}"
    textColor: "{colors.slate-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.mint-leaf}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
  button-primary-active:
    backgroundColor: "{colors.rose-deep}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.rose-deep}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.linen-off-white}"
    textColor: "{colors.charcoal-text}"
    rounded: "{rounded.sm}"
    padding: "1.5rem"
  card-elevated:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.charcoal-text}"
    rounded: "{rounded.md}"
    padding: "15px"
  input:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.charcoal-text}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: "0.8rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.rose-deep}"
    rounded: "{rounded.pill}"
  social-icon:
    backgroundColor: "{colors.tissue-pink}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.full}"
    size: "50px"
  faq-item:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.charcoal-text}"
    rounded: "{rounded.sm}"
    padding: "20px"
---

# Design System: Huzur Mostar

## Overview

**Creative North Star: "The Handwritten Bouquet Card"**

Every bouquet at Huzur leaves the shop with a small card carrying a name and a line written by hand. The website is that card, enlarged: Alex Brush script does the talking for anything that carries feeling (the name of the shop, section titles, bouquet names, the slogan), while a clean geometric sans (Poppins) does the practical work of hours, prices, and forms. Colors are tissue-paper wraps — blush pink, mint, sky, lavender, peach — laid over white and linen paper. Nothing is saturated; the one deeper rose (`rose-deep`) is the ink of the pen.

The system is soft and pastel, warm and personal, and deliberately unhurried — *huzur* means peace, and the page should feel like the shop does on a quiet weekday morning. It is also playful: buttons glow when touched, the hero call-to-action bounces, testimonial cards flip to reveal a real customer message, product carousels drift forward on their own with a small ring-timer. The rule is that playfulness lives in **response to the visitor** (hover, tap, arrival in the viewport) and in **a few signature moments** (hero, testimonials), never as ambient noise across the whole page.

Density is generous. Sections are full-viewport (`min-height: 100vh`) with 6rem of top breathing room, content sits in a 1200px container, and copy is set large (1.1rem body, 3.2rem headings). Dark mode is a first-class twin: every pastel has a muted, desaturated "-dark" partner and surfaces move to slate/charcoal rather than pure black.

**Key Characteristics:**
- Script for feeling, sans for facts — Alex Brush never sets a form label, Poppins never sets a section title.
- Tissue-paper pastels on paper white; one rose ink accent used sparingly.
- Pill-shaped buttons and links (20px radius) that shift pink → mint on hover with a soft glow, rose on press.
- Gently rounded cards (8–12px) with soft ambient shadows on alternating white / linen sections.
- Motion answers the visitor: fade-and-rise on scroll, lift on hover, flip on tap; a few signature loops (hero bounce, chevrons, heart) and nothing else runs unprompted.
- Complete dark-mode twin with muted pastels on slate.

## Colors

A pastel florist's palette: six tissue-paper washes, two deeper "ink" tones for contrast, slate for text, paper and linen for surfaces.

### Primary
- **Rose Deep** (`rose-deep`, #df7b99): the pen ink. Hero title, section headings (h2), logo wordmark, active nav link and its underline, FAQ left border, testimonial card base line, active carousel dot, pressed-button state. This is the canonical primary accent everywhere, including the header dropdown, blog titles and pagination, and the mobile call button.
- **Tissue Pink** (`tissue-pink`, #f5c0c0): the default button and social-icon fill, nav hover halo (at 20% alpha), input focus border and glow, FAQ open-state border. The most-used pastel; it reads as "this is something you can touch".

### Secondary
- **Mint Leaf** (`mint-leaf`, #c8e4b2): the hover reward. Every pink interactive turns mint on hover with a mint glow. Also the scroll-to-top button fill and the footer's right flower.
- **Sage Deep** (`sage-deep`, #7cad7f): the second ink, for script at 2rem and above (section h3 category names). Anything smaller uses a text-safe twin: **Sage Deep Dark** (`sage-deep-dark`, #5a8d5e) for script under 2rem (bouquet names, `#huzurljudi`, footer headings, slogan) and **Sage Ink** (`sage-ink`, #4f7d53) for sage Poppins text (FAQ questions). Likewise **Rose Deep Dark** (`rose-deep-dark`, #b56c82) for the footer wordmark and **Rose Ink** (`rose-ink`, #a85a72) for small rose Poppins text (footer hour labels).

### Tertiary
- **Sky Wash** (`sky-wash`, #b5e3eb): resting input border. Quiet, only on forms.
- **Lavender Wash** (`lavender-wash`, #d9c6e0): dark-mode sun/moon toggle accent.
- **Peach Wash** (`peach-wash`, #f8d6b3) and **Butter Wash** (`butter-wash`, #f5e6ad): declared palette members, currently unused in components. Available for chips, badges, or blog category tags; do not introduce new hues before using these.

### Neutral
- **Slate Ink** (`slate-ink`, #4a5759): text on pastel fills (buttons, social icons). Cooler than the body text so it sits well on pink and mint.
- **Charcoal Text** (`charcoal-text`, #333333): body text, nav links, labels.
- **Muted Text** (`muted-text`, #666666): card descriptions, FAQ answers, copyright, dates (#888 also appears for blog dates).
- **Paper White** (`paper-white`, #ffffff): home, products, testimonials sections; card faces; inputs.
- **Linen Off-White** (`linen-off-white`, #f8f9fa): about, FAQ, contact sections; product and testimonial card backgrounds when on white sections.
- **Footer Mist** (`footer-mist`, #f7f7f7): the footer gradient's resting tone.
- **Hairline** (`hairline`, #e0e0e0): dropdown and card borders; `#eee` for blog dividers.

### Dark mode
Each pastel has a muted twin (`tissue-pink-dark` #c09a9a, `mint-leaf-dark` #91b478, `rose-deep-dark` #b56c82, `sage-deep-dark` #5a8d5e, `sky-wash-dark` #84b5c1, `lavender-wash-dark` #b09cb8). Surfaces: `night-slate` #333a3c (body), `night-surface` #1e1e1e (about/FAQ/contact, cards), `night-deep` #121212 (products/testimonials); text `night-text` #e9e9e9. Card faces on dark use `rgba(51,58,60,0.6)`.

### Feedback
Bootstrap-derived and only in the contact form and share toast: success `#d4edda` / `#155724` (border #c3e6cb), error `#f8d7da` / `#721c24` (border #f5c6cb), danger `#dc3545` for required marks and invalid borders, `#28a745` for valid borders.

### Named Rules
**The Pen-Ink Rule.** `rose-deep` and `sage-deep` are ink, not paint. They color text, thin lines (2–5px borders), dots, and the pressed state — never large fills. Large fills are always a pastel wash.

**The Ink-Size Rule.** `rose-deep` and `sage-deep` are for script ≥2rem only (h1, h2, h3). Script under 2rem takes the `-dark` twin; Poppins text takes `rose-ink` / `sage-ink`. Every text color clears 3:1 (large) or 4.5:1 (small) on paper and linen.

**The Pink-to-Mint Rule.** Interactive elements rest in Tissue Pink and reward hover with Mint Leaf. Press is Rose Deep with white text. Do not invent a fourth interactive color.

**The Alternating-Paper Rule.** Landing sections alternate `paper-white` → `linen-off-white` → `paper-white` …; cards take the opposite tone of their section so they read as a second sheet of paper.

## Typography

**Display Font:** Alex Brush (Google Fonts; fallback `cursive`)
**Body Font:** Poppins 400/500/600 (Google Fonts, loaded in `src/index.html` alongside Alex Brush; fallback `sans-serif`).

**Character:** A florist's handwriting over a tidy price list. The script is large, light, and loose (letter-spacing 0.5px); the sans is calm, medium-weight, and never shouts. Contrast between the two families *is* the hierarchy — weight and size changes inside one family are secondary.

### Hierarchy
- **Display** (Alex Brush 400, 5.5rem → 2.5rem on ≤768px): the hero "Huzur Mostar" only. Colored `rose-deep`.
- **Headline** (Alex Brush 400, 3.2rem → 2rem mobile; blog titles 3rem → 2.3rem): section h2 (`O nama`, `Naša ponuda`, `Kontaktirajte nas`). Colored `rose-deep`.
- **Title** (Alex Brush 400, 2.2rem; 1.3–1.6rem for bouquet names; 1.5–1.8rem for footer headings and testimonial signature): h3, category names, bouquet names, `#huzurljudi`. Colored `sage-deep` (or its dark twin).
- **Subtitle** (Poppins 600, 1.1–1.2rem): FAQ questions, blog card titles (1.4rem). Colored `sage-deep` in FAQ, `#2c3e50` in the scoped FAQ component (drift; prefer `sage-deep`).
- **Body** (Poppins 400, 1.1rem, line-height 1.6; hero lead 1.3rem; blog post body 1.1rem in an 800px measure): paragraphs, testimonials (0.95rem), card descriptions (0.9rem).
- **Label** (Poppins 500, 0.9–1rem): nav links, form labels, buttons (500), footer meta (0.9–0.95rem). Never uppercase; the system has no all-caps labels.
- **Poetic line** (Poppins 400 italic-feeling, 0.8–1rem): the "…kao jesen, kao sjeta…" product descriptions. Keep them short and ellipsis-wrapped.

### Named Rules
**The Script-Is-Not-For-Reading Rule.** Alex Brush sets names and titles of at most ~6 words. Never set body copy, FAQ answers, form labels, prices, hours, or error messages in script.

**The One-Sans Rule.** Poppins is the only sans; no second sans family is imported anywhere.

## Layout

- **Container:** `max-width: 1200px`, centered, 2rem side padding (1rem on ≤768px). Reading surfaces (FAQ, blog post body) narrow to **800px**.
- **Sections:** each landing section is `min-height: 100vh` with `padding: 6rem 2rem 4rem` (the 6rem clears the fixed 64px header with room to breathe); blog pages use `6rem 2rem` → `4rem 1rem` on mobile. Sections are separated by a faint upward shadow (`0 -2px 10px rgba(0,0,0,0.1)`) plus the alternating paper tone — no hard rules.
- **Two-column split** (about, contact): flex with `gap: 4rem`, collapsing to a single column with `gap: 2rem` at ≤768px. Text column first.
- **Product carousel:** three cards visible on desktop (`min-width: 33.333%`, 15px gutters), the center card active and enlarged; one card on mobile. Drifts forward on a 5s ring timer only until the visitor touches, clicks, or focuses anything in the section (then it stops for good), pauses on hover, and never starts under `prefers-reduced-motion`; prev/next round controls (40px) and 10px dots with a 26px hit area.
- **Fact strip ("Dobro je znati"):** a wrapping row of pill chips under the products intro in alternating Peach and Butter wash, Poppins 500 0.95rem `slate-ink` — the one place the practical truths (price floor, lead times, pickup only, payment) are always visible.
- **Testimonials:** flex-wrap, `gap: 30px`, cards `calc(30% - 30px)` wide, `min-width: 280px`, fixed 300px height on desktop; full-width auto-height on mobile.
- **Blog list:** cards in a 2.5rem gap grid (2rem on mobile).
- **Header:** fixed, 1rem vertical padding, 90% white with a `0 2px 10px` shadow; shrinks on scroll (`header.scrolled`) and on mobile becomes a 56px floating pill (20px radius). Mobile menu is a full-height sheet under the header with staggered link entrance (0.05s increments).
- **Breakpoints:** 768px is the single structural breakpoint; 480px only tightens padding and type. Design mobile-first content order, then widen.
- **Spacing rhythm:** rem-based quarter steps — 0.5 / 1 / 1.5 / 2 / 4 / 6rem. Component internals use 15–20px.

## Elevation & Depth

Hybrid. Depth comes first from **tonal layering** — alternating white and linen sections, cards in the opposite tone — and second from **soft ambient shadows** that make cards read as a sheet of paper resting on another. Shadows are diffuse, low-opacity black, never hard. Interactive elements add a third layer: **colored glow shadows** in the element's own pastel (pink at rest, mint on hover, rose on press) — light through tissue paper, not a drop shadow. Backdrop blur is not used; the header is simply 90% white.

### Shadow Vocabulary
- **Paper rest** (`box-shadow: 0 5px 15px rgba(0,0,0,0.05)`): product cards, FAQ items at rest. Barely there.
- **Paper lift** (`box-shadow: 0 5px 15px rgba(0,0,0,0.1)`): about image, blog cards, testimonial faces (`0 0 10px rgba(0,0,0,0.1)`), FAQ hover (`0 4px 12px rgba(0,0,0,0.1)`).
- **Paper hover** (`box-shadow: 0 10px 25px rgba(0,0,0,0.15)`): blog card hover with `translateY(-5px)`; active carousel card `0 15px 35px rgba(0,0,0,0.2)`.
- **Chrome** (`box-shadow: 0 2px 10px rgba(0,0,0,0.1)`): header, carousel controls, dropdown (`0 4px 15px rgba(0,0,0,0.1)`).
- **Modal** (`box-shadow: 0 20px 60px rgba(0,0,0,0.3)`): announcement banner only, over a 50% black backdrop.
- **Pink glow, rest** (`box-shadow: 0 4px 8px rgba(245,192,192,0.4)`): buttons, social icons, scroll-to-top.
- **Mint glow, hover** (`box-shadow: 0 0 20px rgba(200,228,178,0.8)`, pulsing 10→20px over 1.5s): all pink interactives on hover.
- **Rose glow, press** (`box-shadow: 0 0 25px rgba(223,123,153,0.9)`, 0.5s flash): active/pressed state.
- **Dark mode:** black shadows deepen to 0.2–0.3 alpha; pastel glows swap to their dark twins (`rgba(192,154,154,…)`, `rgba(145,180,120,…)`, `rgba(181,108,130,…)`).

### Named Rules
**The Glow-Means-Touchable Rule.** Colored glow appears only on elements you can click or tap. Cards, sections, and images use neutral shadows.

**The Sheet-of-Paper Rule.** Non-interactive surfaces never exceed the Paper hover shadow; the only thing allowed to float higher is a modal.

## Shapes

Softly rounded, never sharp, never fully bubbly. Four radius registers:
- **Pill (20px)** for anything you press: buttons, nav link halos, mobile menu links, scroll-to-top (also 50% round in the footer variant), the scrolled mobile header. The mobile call button uses 25px.
- **Card (8px / 12px):** 8px for the about image, FAQ items, testimonial faces, blog images inside posts, outline buttons, pagination; 12px for product-card inners, blog cards, featured images. 16px for the announcement modal only.
- **Field (4px):** inputs, textarea, form status.
- **Circle (50%):** social icons (50px landing / 38px footer), carousel controls (40px), dots (10px), footer logo (45px), flower loader petals.

Accent lines are **left or bottom borders 2–5px** in `rose-deep` or `tissue-pink` (FAQ left border 4–5px, testimonial bottom border 5px, active nav underline 2px, blockquote left 4px). Section headings in the footer carry a 2px pink-to-transparent gradient underline. Two decorative SVG "cloud/flower" blobs (200px, pink and mint) sit in the footer corners. No clip-paths, no diagonal cuts, no outlined ghost shapes.

## Components

### Buttons
Soft pill, glowing on touch. Every `<button>` and `.btn` shares one style.
- **Shape:** pill (20px radius), `padding: 0.8rem 1.5rem`, Poppins 500, no border.
- **Primary:** Tissue Pink fill, Slate Ink text, pink glow at rest.
- **Hover:** fill → Mint Leaf, `translateY(-3px)`, pulsing mint glow (`button-glow` 1.5s infinite).
- **Active/press:** fill → Rose Deep, white text, `translateY(1px)`, rose flash 0.5s.
- **Disabled:** `#6c757d` grey fill (contact form only; consider a pastel-muted alternative when revisited).
- **Hero CTA:** same button with a perpetual `bounce` (−15px, 1.5s) — the one button allowed to move unprompted.
- **Outline (blog "back"):** transparent, 1px `rose-deep` border and text, 8px radius, Poppins 600.
- **Icon round (social, scroll-to-top, carousel controls):** 38–50px circles with the same pink → mint → rose sequence; carousel controls are white with `#f8d7da` hover.
- **Dark:** pink-dark / mint-dark / rose-dark fills, `night-text` text.

### Cards / Containers
- **Product card (carousel):** 12px radius, white inner on 15px gutters, `transition: box-shadow 0.5s`; the active center card lifts to `0 15px 35px rgba(0,0,0,0.2)`. Image on top (`object-fit` contain, transparent bg), then 15px padded info: bouquet name in Alex Brush `sage-deep-dark` (1.3rem; 1.6rem and `rose-deep` when active), poetic line 0.9rem muted.
- **Testimonial card:** 3D flip (`perspective: 1000px`, `rotateY(180deg)` over 0.8s) on desktop hover, or tap / Enter / Space (`role="button"`, `aria-pressed`); stays flipped until toggled again. Front: linen, 30px/20px padding, 5px `rose-deep` bottom border, quote centered, `#huzurljudi` signature in Alex Brush sage 1.8rem. Back: the real DM screenshot, `object-fit: cover`.
- **FAQ item:** white (linen in global fallback) 8px card with 1px `#e9ecef` border and a 5px `rose-deep` left border that turns Tissue Pink when open; hover lifts −5px with Paper lift. The question is a real `<button>` (`aria-expanded`/`aria-controls`) inside an `h3`, Poppins 600 1.1rem in `sage-ink`, 20px padding, "+" / "−" glyph at 1.5rem turning rose when open; answer collapses via `max-height` 0.4s. Items stay open until the visitor closes them.
- **Blog card:** white 12px card, Paper lift, hover −5px with Paper hover, image zooms on hover (0.5s). 1.5rem padded content: date 0.85rem `#888`, title 1.4rem, excerpt, small `.blog-btn` (0.6rem 1.2rem).
- **About image:** 8px radius, Paper lift; hover (desktop) / tap (mobile) dims the photo to 50% and reveals the address in Alex Brush white.
- **Announcement modal:** white, 16px radius, Modal shadow, 500px max, slides up 0.4s over a 50% black backdrop; 3rem emoji icon header, round close button.

### Inputs / Fields
- **Style:** white fill, 1px Sky Wash border, 4px radius, `padding: 0.8rem`, 1rem Poppins; textarea 150px, vertical resize; italic `#6c757d` placeholder.
- **Focus:** border → Tissue Pink, `0 0 8px rgba(245,192,192,0.4)` glow; keyboard focus (`:focus-visible`) adds a 2px `rose-deep` outline, 2px offset — the same ring every link and button gets.
- **Valid:** border `#28a745`. **Invalid (touched):** border `#dc3545`, `#fff5f5` fill, 0.2rem red ring on focus; error message 0.875rem red sliding down 0.3s.
- **Label:** Poppins 500 `charcoal-text`, required mark in `danger`.
- **Submit:** primary button, always pressable (an invalid press reveals the field errors); dims to 60% while sending, a full-screen 95% white overlay with a rotating six-petal flower loader (pink petals `#e91e63→#f06292`, amber center) and pulsing "Šaljemo vašu poruku…".
- **Dark:** `rgba(51,58,60,0.4)` fill, `sky-wash-dark` border, `night-text`.

### Navigation
- **Header:** fixed, 90% white, Chrome shadow, slides in from the top on load (0.5s). Logo: 30px round mark + "Huzur Mostar" in Alex Brush `rose-deep` 1.8rem. Links Poppins 500 `charcoal-text`, pill padding 8px 12px, `gap: 2rem`.
- **Hover:** text → `rose-deep`, `translateY(-3px)`, a 20%-alpha pink pill scales in behind the link.
- **Active:** `rose-deep` 600 with a 2px underline that pulses a pink glow (`nav-glow` 1.5s).
- **Products dropdown:** white 8px panel, hairline border, `0 4px 15px` shadow, 10px 16px items; active item inverts to primary fill with white text.
- **Mobile (≤768px):** a persistent "Pozovi" call pill (rose→tissue gradient, 20px radius, bottom-center, hidden while the menu is open); hamburger `<button>` (20px, three 2px bars morphing to an X, `aria-expanded`); header shrinks to a 56px pill when scrolled; menu is a full-height white sheet, links 1.25rem at 15px 20px, staggered fade-in; a full-width `rose-deep` gradient "call" pill with a heartbeat heart at the bottom.
- **Theme toggle:** 30px SVG sun (`rose-deep`) morphing to a crescent moon (`#e6dcab`) with an overshoot ease `cubic-bezier(0.68,-0.55,0.27,1.55)` 0.5s.
- **Dark:** header `rgba(18,18,18,0.9)`, links `night-text`, active/hover `tissue-pink-dark`.

### Footer
Gradient from transparent to Footer Mist with a faint upward shadow and two 200px pastel blob SVGs in the corners. Three columns (brand / contact / hours) collapsing on mobile; headings Alex Brush sage 1.5rem with gradient pink underline; contact icons pink; slogan „Huzur nađite, huzur budite" in Alex Brush sage with `huzur` highlighted pink; social circles 38px; bottom bar with copyright, "Cvjećara u ♥ Mostara" (heartbeat heart), legal links. Scroll-to-top: 45px mint circle with a conic progress ring driven by `--scroll-progress`.

### Motion (belongs to the world above)
- **Arrival:** `.animate-item` fades and rises 30px over 0.8s ease when it enters the viewport (IntersectionObserver); about text/image slide in from left/right; contact form scales in from 0.9; product cards stagger 0.1–0.7s. Hero content fades in after 0.3s.
- **Hover:** `translateY(-3px)` links/buttons, `-5px` cards/FAQ/social, `-10px` legacy grid cards; all `0.3s ease`.
- **Signature loops:** hero CTA bounce, three pink chevrons drifting down (3s), heartbeat heart (1.5s), carousel auto-advance with ring timer, active-nav glow pulse, hover glow pulse. Add no new infinite loops.
- **Easing:** `ease` at 0.3s is the default; 0.5s for carousel and image zoom; 0.8s for reveals and the card flip; overshoot bezier only on the theme toggle.
- **Reduced motion:** `animations.css` ends with a `prefers-reduced-motion: reduce` block — reveals render visible immediately, loops stop, transitions collapse. Keep new motion inside that contract.

### Signature Component: the Flip Testimonial
The one piece a competitor would not have: a linen card carrying a real customer message that turns over to show the actual Instagram DM. It embodies "the customer's handwriting", so keep it — never replace the screenshot with a generic avatar or star rating.

## Do's and Don'ts

### Do:
- **Do** set every emotional heading — hero, h2, h3, bouquet names, `#huzurljudi`, slogan — in Alex Brush 400 with 0.5px tracking, colored `rose-deep` (h1/h2) or `sage-deep` (h3/names).
- **Do** keep all practical text (hours, prices, labels, errors, FAQ answers, body) in Poppins ≥0.9rem on white or linen with `charcoal-text` / `muted-text`, or `rose-ink` / `sage-ink` when it needs brand color.
- **Do** make every phone number a `tel:` link, every email a `mailto:`, and every address a Maps link — the phone and the DM are the checkout.
- **Do** use the pink → mint → rose sequence with matching glows for every interactive element, including new ones (chips, tabs, pagination).
- **Do** alternate `paper-white` and `linen-off-white` for consecutive sections and give cards the opposite tone plus a Paper rest/lift shadow.
- **Do** round buttons to a 20px pill, cards to 8–12px, inputs to 4px, icon buttons to circles.
- **Do** ship a dark-mode twin for every new surface using the `-dark` pastels on `night-surface` / `night-deep`.
- **Do** reveal content with the 0.8s fade-and-rise on viewport entry, and lift 3–5px on hover.
- **Do** keep the 1200px container and the 800px reading measure; keep 768px as the structural breakpoint.

### Don't:
- **Don't** use Alex Brush for body copy, labels, prices, hours, or anything longer than a short title.
- **Don't** introduce `#d14d72` / `#ff6b98` (removed legacy pinks) in new code; use `rose-deep` and `tissue-pink-dark` in dark mode.
- **Don't** import any additional font family; Poppins + Alex Brush only.
- **Don't** fill large areas with `rose-deep` or `sage-deep`; inks color text and thin lines only.
- **Don't** let anything close, flip back, or advance on a timer after the visitor has touched it; motion answers the visitor.
- **Don't** add new infinite animations; the signature loops (hero bounce, chevrons, heartbeat, glow pulses, carousel timer) are the full budget.
- **Don't** use hard, dark, or offset drop shadows; shadows are diffuse black ≤0.2 alpha on surfaces, or the element's own pastel as a glow on interactives.
- **Don't** use pure black backgrounds in dark mode; the darkest surface is `night-deep` #121212 with `night-slate` as the body.
- **Don't** replace real testimonial screenshots with stock imagery, avatars, or star ratings.
- **Don't** use uppercase tracking-out labels, sharp corners, outlined ghost buttons as the primary action, or urgency devices (badges, countdowns) — none exist in the system and they contradict *huzur*.
