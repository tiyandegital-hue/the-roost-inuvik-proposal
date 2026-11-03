# DESIGN.md — The Roost, Inuvik (proposal concept site)

## Overview
A multipage proposal website for The Roost, a takeout-and-dine-in restaurant at 108 MacKenzie Rd, Inuvik NT. No own website exists today. Goal: turn "hungry in the Arctic, no idea what's open" into a phone call. One primary CTA everywhere: **Call to order** (tel:+18677772727).

## Psychology brief
- Visitor: an Inuvik local after a −30°C day, or a traveller up the Dempster; hungry, possibly outside late hours.
- Pain: no website — menu, hours, and "is it open?" live only on Facebook and review sites.
- One action: call the restaurant to order.
- Trust gap: a missing website reads as "maybe closed." Solved with real, attributed reviews (Tripadvisor 3.4/5 · 49 reviews; Restaurantji 4.4/5 · 199 ratings), the Inuvik Drum-documented pandemic survival story, and named owners.
- Emotion: warmth against cold. A firelit room above the Arctic Circle.

## Three-word mood + signature
Mood: **Arctic-fire kitchen.** Signature per page, one each (never stacked):
1. Home — Emberfall: rising ember particles over the hero + giant staggered headline.
2. Menu — Ember-hover dish rows: hovering a row lights a flame marker; sticky category nav.
3. Story — Pinned chapter scroll with a timeline rail (2012 backroom reno → COVID → 2022 contest).
4. Burgers — Dish names AS the composition (96px type, one per screen).
5. Pizza & Donair — "Two fires, one oven": split-field contrast layout.
6. Specials — Chalkboard flip-board: cards flip to reveal each day (sample board, labelled).
7. Gallery — Original SVG art tiles (flame, burger, donair, aurora diner).
8. Reviews — Quote wall with honest rating badges, mixed tone kept.
9. Visit — Oversized hours table + address block.
10. Order — A phone number you can't miss: 96px tel: link.
11/12. Privacy / Terms — quiet document pages.

## Tokens
- `--char: #0E0B09` near-black warm (dark fields)
- `--char-2: #171310` raised dark surface
- `--cream: #F4EBDD` warm cream (light fields)
- `--cream-2: #EAE0CE` deeper cream (borders/tints)
- `--ink: #191310` text on cream
- `--muted-lt: #8B7E6E` muted text on cream (body 4.5:1+)
- `--muted-dk: #B3A694` muted text on char (4.5:1+)
- `--ember: #E85A24` THE one chromatic accent (CTAs, flame, key highlights)
- `--ember-deep: #B23A12` ember hover/pressed
- `--ember-ghost: rgba(232,90,36,.12)` tint
- `--hair-d: rgba(244,235,221,.16)` hairlines on dark
- `--hair-l: rgba(25,19,16,.14)` hairlines on light
- 60-30-10: char/cream dominant, ember accent ≤5% per screen.
- Selection: `background: var(--ember); color: #0E0B09;`

## Typography
- Display: **Anton** (Google Fonts, latin subset, display=swap). H1 clamp(48px, 9vw, 108px), line-height .95, tracking −0.02em, uppercase, hand-broken 2–3 lines.
- Body: **Fraunces** (serif), 16–18px, line-height 1.65. Italic for emphasis (never bold on headlines).
- Labels/prices: **IBM Plex Mono**, 11–12px, uppercase, letter-spacing .18em for labels; prices 16px mono, tabular.
- Max measure 68ch. H1 is 5–6× body.

## Layout / composition rules
- 12-col grid, max-width 1180px, gutters 24px desktop / 18px mobile.
- Section rhythm: 120px desktop / 72px mobile. Heading gets ≥2× space above than below.
- First screen: mark + nav + one headline + one sub + 1–2 CTAs + one media plane + at most one quiet strip.
- Anchors rotate: left-column hero (home), editorial columns (story), oversized-type composition (burgers), split-field (pizza & donair).
- Depth = hairlines + layered fields, one rationed ember-tint tier, no drop shadows.
- Radius: 2px (char, match-cut) — buttons 2px, cards 2px, chips pill allowed.
- Marquee strip (home + menu): CSS keyframes translateX loop, engineered seam (duplicated content, 50% translate), pauses on reduced-motion.

## Motion numbers
- Entrance order: nav → eyebrow → H1 → sub → CTA; steps .12s apart, done by ~1.4s.
- Base: opacity 0→1 + translateY 24px, .8s cubic-bezier(0.16,1,0.3,1).
- Headline treatment: masked line rise (overflow hidden + translateY 100%→0).
- Ember canvas: ≤48 particles, rAF, IntersectionObserver pause off-screen, prefers-reduced-motion → static.
- Hovers ≤1.04 scale, 180ms; :active .97. No pulsing, no shimmer.
- Scrub is decoration only; readable content animates on trigger to completion.
- If JS fails: everything visible (no JS-set initial hidden state; reveals use `.js` class on `<html>`).

## Copy rules
- Headline 3–9 words, 2–3 lines, two-beat or contrast pair. Sub 15–30 words, one concrete benefit.
- Banned words: elevate, unlock, cutting-edge, seamless, "the best" (no basis), superlatives without sources.
- Menu prices: ALL marked illustrative — footer note on every menu surface: "Sample prices — the board moves with the seasons. Call +1 867-777-2727 for today's numbers." A few prices trace to Wikivoyage (Mar 2024: burgers ~$15, combo ~$23) and are cited.
- Dish names from real reviews/news: The Roost Special Pizza, cheeseburger, donair, shawarma, falafel wrap, fish & chips, wonton soup, poutine, combo #1, spaghetti, lasagne. Nothing invented as fact.
- Specials board: labelled "Sample board — call to hear what's on today."
- Reviews: short excerpts, attributed to platform + date, linked to the real Tripadvisor listing. Mixed tone kept (incl. "basic but filling").

## Components
- Nav: logo mark (flame glyph, SVG) + THE ROOST; 5 links (Menu, Story, Specials, Reviews, Visit) + Order CTA button. Mobile: details-free JS toggle, aria-expanded, focus-visible ring ember.
- Footer: address / phone / hours summary / social links (Facebook, Instagram) / legal (Privacy, Terms) / "Concept site prepared by Tiyan Digital" credit + honesty note.
- Dish row: grid (name+desc | price), hover → flame dot ignites, price turns ember.
- Flip card (specials): 3D flip on click/tap + keyboard (button), front = day, back = special.
- Big CTA: 2px-radius ember button, verb-first label ("Call to order"), 48px min height.

## Known gaps (honesty section)
- No real photos — SVG art placeholders only; owner photos replace them.
- Menu prices are illustrative; owner confirms.
- Hours as listed online (Tripadvisor, crawled 2026-11-01) — "call to confirm" note on Visit.
- Address postal code: task brief says X0E 0A5; Tripadvisor lists X0E 0T0 — owner confirms which is current.
- No online ordering — phone-only, stated plainly.

## Verification
- Link check: every href resolves (script below).
- Overflow audit: no fixed widths, no min-width > 100vw; `overflow-x: clip` on body as guard.
- Contrast: cream-on-char, char-on-cream, muted variants all ≥ 4.5:1 (script check).
- Console: JS reviewed; canvas guarded; no external requests except Google Fonts.
