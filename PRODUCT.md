# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** people in and around Mostar (Bosnia and Herzegovina) looking for flowers for a gift or occasion. They land on the site (often from Instagram or Google Maps), check the offer, price ranges, and working hours, then **order by phone, Instagram DM, or by visiting the shop** — there is no online ordering today. Mobile-first usage is the norm for this audience.

**Secondary:** occasion planners (weddings — *bidermajer* — and event décor) who use the site as portfolio and first contact; and the *#huzurljudi* community who follow the shop's story through the blog.

**Internal:** the shop team, who currently edit content through code/Markdown (blog posts, `banner-config.json`). A planned admin panel will replace this (see Capabilities).

## Product Purpose

huzurmostar.ba is the public web presence of **Huzur Mostar**, a flower shop at Maršala Tita 134, Mostar. It presents the offer (fresh bouquets, dried-flower arrangements, potted plants, small gifts such as magnets), tells the shop's story and philosophy, answers practical questions (lead times, prices, payment, delivery), collects contact inquiries, and publishes a blog.

**Success today:** more phone calls, messages, contact-form submissions, Instagram follows, and shop visits.

**Success in the next year:** **online ordering.** The direction in `docs/PRD-Backend-Implementation.md` (Laravel admin panel, customer accounts, orders) is the active plan. Front-end work must not paint the site into a brochure-only corner: product catalog, cart/checkout, and account surfaces are coming.

## Positioning

*Huzur* means peace/tranquility (Turkish loanword in Bosnian). The shop's claim is not "flowers fast" but **"peace, one bouquet at a time"**: happiness is enjoying the process — choosing, preparing, arranging — and the moment *huzur ljudi* pick up their arrangement. Every bouquet and arrangement has a woman's name (Amna, Ajla, Sara, Lola, Saraj, Đula…) and a short poetic line; bouquets are described through the symbolism of their colors and flowers. Neighbors sell flowers; Huzur sells a philosophy and a named, personal object. Customers describe it as "an osvježenje (breath of fresh air) in this city".

## Operating Context

- Physical shop in the center of Mostar, Maršala Tita 134. Hours: Mon–Fri 9:00–16:30, Sat 9:00–15:00, Sun closed. Phone +387 60 33 52 011, info@huzurmostar.ba.
- Orders are placed off-site (phone, Instagram @huzur.mostar, Facebook, in person). The site's contact form is the only on-site conversion.
- **No home delivery** (FAQ is the truth; the README's "same-day delivery" claim is stale and must not be repeated).
- **Weddings (bidermajer) and event décor are offered on request**; recommended lead time 10–15 days for bidermajer, 5–7 days for a planned arrangement.
- Payment: cash and bank transfer (*žiralno*).
- Seasonal rhythm: the shop closes for a winter break (e.g. 29 Dec 2025 – 14 Jan 2026), communicated through the runtime announcement banner (`public/banner-config.json`).
- Instagram is the main marketing channel; testimonials are real customer DMs.

## Capabilities and Constraints

**Current site (Angular 21, prerendered static, Bosnian):** one-page landing (home slideshow, about, three product carousels, FAQ accordion, flip-card testimonials, contact form), blog list + posts from Markdown, terms/privacy, dark mode, announcement banner, scroll animations, optimized WebP images.

**Product catalog in code:** `ProductsComponent` holds three categories — *Huzur aranžmani sa svježim cvijećem* (fresh bouquets), *Huzur aranžmani sa suhim cvijećem* (dried arrangements), *Huzur lončanice* (potted plants) — plus magnets. Names and copy are real and current. **No per-product prices**; the FAQ gives real price bands by bouquet size: S 15–25 KM, M 30–45 KM, L 50–70 KM, XL 75–95 KM, XXL >100 KM.

**Terminology (keep):** *huzur* (peace), *huzur ljudi* / *#huzurljudi* (customers/community), *bidermajer* (bridal bouquet), *lončanice* (potted plants), *suhi aranžman* (dried arrangement), *magnetić* (magnet), *buket* (bouquet). Currency KM (BAM).

**Technical constraints (see `.claude/CLAUDE.md`):** same build ships to GlobalHost shared hosting (PHP contact backend) and Netlify (Netlify Forms) — backend chosen at runtime by hostname; CSP lives in `netlify.toml`; per-component CSS budget 32 kB; external assets currently Google Fonts (Alex Brush), Font Awesome 5 CDN, Google Analytics.

**Planned:** Laravel backend on GlobalHost — admin panel (blog, media, page content), customer accounts, orders. Not built yet.

**Language:** Bosnian now; **English planned later** (tourists, diaspora). New surfaces should tolerate two languages (no hard-coded text-length assumptions, i18n-friendly structure). Note `index.html` currently declares `lang="en"` — a bug for a Bosnian site.

**Explicitly undecided:** whether online ordering will include delivery; product-level pricing display; timeline for the backend.

## Brand Commitments

- Name: **Huzur Mostar** (logo `public/huzur-logo.jpg`, also `src/assets/img/huzur-logo.jpg`; header wordmark styles "Huzur*Mostar*").
- Slogan (binding): **„Huzur nađite, huzur budite"** (footer). Community tag: **#huzurljudi**.
- Voice (binding): warm, poetic, first-person-plural Bosnian; reflective and spiritual without being preachy (blog titles like *Sreća je znati uživati u procesu*, *Ja vjerujem u Boga i Božije određenje*). Product lines are short poetic fragments ("…kao jesen, kao sjeta…"). Never generic e-commerce copy.
- Team: small, women-run, opened 2023. Story-driven; the shop is "a whole flower story whose introduction is still being written".
- Social: instagram.com/huzur.mostar, facebook.com/huzur.mostar, Google Maps listing.

## Evidence on Hand

- Real product photos: `src/assets/img/products/{bouquets,dry-flowers,magnets,...}`, optimized variants in `src/assets/img-optimized/`.
- Shop photo `src/assets/img/huzur-radnja.jpg`; home slideshow images `src/assets/img/home/`; about images `src/assets/img/about/`.
- Six real testimonials (customer DMs) with screenshots: `src/assets/img/testimonials/recenzija-1..6.jpg`, text in `TestimonialsComponent`.
- Six blog posts (Apr 2025 – Jun 2026) in `src/assets/blog-posts/`, images in `src/assets/img/blog/`.
- Real FAQ answers (lead times, price bands, payment, no delivery) in `FaqComponent`.
- **Absent — do not fabricate:** Google rating/review count, order counts, press, awards, named customers, delivery promises, per-product prices.

## Product Principles

1. **Peace over pressure.** The site should feel like the shop: unhurried. No urgency tricks, countdowns, or aggressive upsell.
2. **The phone and the DM are the checkout — until they aren't.** Every surface makes calling, messaging, and visiting effortless, while structure stays ready for catalog, cart, and accounts.
3. **Truth in the practical details.** Hours, prices, lead times, and delivery status are the highest-value content for the primary user and must always be accurate and easy to find.
4. **Named, personal, storied.** Products keep their names and poetic lines; the philosophy and the blog are part of the offer, not decoration.
5. **Built for two languages and small screens.** Bosnian first, English later; mobile is the primary device.

## Accessibility & Inclusion

No formal standard required. Practical needs: diacritics-safe typography (č ć đ š ž), respects `prefers-reduced-motion` given heavy scroll/carousel animation, readable in dark mode, contact details reachable without JavaScript-heavy interaction.
