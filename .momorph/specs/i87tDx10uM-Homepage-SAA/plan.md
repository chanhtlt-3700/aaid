# Implementation Plan: Homepage SAA

**Frame**: `i87tDx10uM-Homepage-SAA`
**Date**: 2026-04-10
**Spec**: `specs/i87tDx10uM-Homepage-SAA/spec.md`

---

## Summary

Replace the current placeholder dashboard with the full Homepage SAA — a long-scroll authenticated landing page with seven sections: enhanced Header (full navigation), Hero with countdown timer and CTA buttons, Root Further content, Awards card grid (6 categories), Sun* Kudos promotion, floating Widget button, and enhanced Footer. All content is static/i18n with no backend API. The countdown reads the event target date from an environment variable. The existing Header and Footer components are enhanced to conditionally render full navigation for authenticated pages vs. minimal for the Login page.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, next/image, next/font, next/link
**Database**: N/A (no data layer for this feature)
**Testing**: Vitest + @testing-library/react
**State Management**: React `useState` (countdown interval) + existing LanguageContext
**API Style**: N/A (client-side only; Supabase Auth for page guard)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

| Constitution Principle | Plan Compliance | Detail |
|------------------------|-----------------|--------|
| **I. Clean Architecture** | ✅ Compliant | Feature-based folder (`components/homepage/`), `@/*` imports, single responsibility per file, TypeScript strict |
| **II. TDD (NON-NEGOTIABLE)** | ✅ Planned | Tests written before/alongside implementation. Vitest for unit/integration. Coverage: 90%+ core flows |
| **III. Security (OWASP)** | ✅ Compliant | Auth check in Server Component, no user input, no `dangerouslySetInnerHTML`, env vars for config |
| **IV. Responsive & Accessible** | ✅ Planned | Mobile-first Tailwind, 3 breakpoints, semantic HTML, ARIA for countdown, keyboard-navigable cards, WCAG AA |
| **V. Tech Stack Best Practices** | ✅ Compliant | RSC default for page, `"use client"` only for interactive (Countdown, Header nav, Widget), Tailwind utilities, `<Image>` for all images, `<Link>` for navigation |

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Route Strategy**: Repurpose `/dashboard` route. The `page.tsx` remains a Server Component (auth check). Replace `DashboardContent` with the new Homepage. The post-login redirect stays as-is.
- **Component Structure**: Feature-based folder `src/components/homepage/` for page-specific components. Shared components enhanced in `src/components/shared/`.
- **Header Enhancement**: The Header currently renders only logo + language selector. Enhance it to accept an `variant` prop:
  - `variant="minimal"` (default): current behavior — logo + language selector (Login page).
  - `variant="full"`: logo + nav links + notification bell + language selector + user avatar (authenticated pages).
  - Header remains a Server Component for the wrapper. Navigation interactions (`active link highlight`, `scroll to top`) are handled by a client child component `HeaderNav`.
- **Footer Enhancement**: Similar approach — `variant="minimal"` (copyright only) vs `variant="full"` (logo + nav links + copyright).
- **Styling Strategy**: TailwindCSS v4 utilities. New CSS custom properties in `globals.css` for design tokens not yet defined (gold glow box-shadow, countdown font). Extend `@theme inline` block.
- **State Management**: Only the countdown timer needs client-side state (`useState` + `useEffect` with `setInterval`). All other sections are static. The existing `LanguageContext` provides i18n.
- **Data Architecture**: All award card data defined as a typed constant array in `src/components/homepage/awardsData.ts`. Static content accessed via i18n keys.

### Backend Approach

N/A — no backend changes. Auth check uses existing Supabase `getUser()` in the Server Component.

### Integration Points

- **Existing Components**: `Header.tsx` (enhance), `Footer.tsx` (enhance), `LanguageSelector.tsx` (no change)
- **Shared Assets**: Key visual (`public/assets/login/images/key-visual.png`) and ROOT FURTHER logo (`public/assets/login/logos/root-further.png`) reused from Login. New assets for award images, widget icons.
- **i18n System**: `src/i18n/translations.ts` extended with new sections (`homepage.*`)
- **API Contracts**: None

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/i87tDx10uM-Homepage-SAA/
├── spec.md              # Feature specification
├── plan.md              # This file
├── design-style.md      # Design tokens and styles
└── assets/
    └── frame.png        # Figma frame reference
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── globals.css                     # MODIFY — Add new CSS custom properties
│   └── dashboard/
│       ├── page.tsx                     # MODIFY — Replace DashboardContent with Homepage
│       ├── DashboardContent.tsx         # DELETE — Replaced by Homepage
│       └── LogoutButton.tsx             # KEEP — May be used in profile dropdown later
├── components/
│   ├── shared/
│   │   ├── Header.tsx                  # MODIFY — Add variant prop, conditionally render full nav
│   │   ├── HeaderNav.tsx               # NEW — Client Component: nav links, active state, bell, avatar
│   │   ├── Footer.tsx                  # MODIFY — Add variant prop, conditionally render full footer
│   │   ├── FooterNav.tsx               # NEW — Client Component: nav links
│   │   └── LanguageSelector.tsx        # NO CHANGE
│   └── homepage/
│       ├── HeroSection.tsx             # NEW — Hero with key visual, gradients, countdown, event info, CTAs
│       ├── CountdownTimer.tsx          # NEW — Client Component: countdown logic + display
│       ├── EventInfo.tsx               # NEW — Static event info block (date, venue, livestream)
│       ├── CTAButtons.tsx              # NEW — Client Component: ABOUT AWARDS + ABOUT KUDOS buttons
│       ├── RootFurtherSection.tsx      # NEW — Static content section with themed text
│       ├── AwardsSection.tsx           # NEW — Section header + grid of award cards
│       ├── AwardCard.tsx               # NEW — Single award card component
│       ├── awardsData.ts               # NEW — Typed award data array
│       ├── KudosSection.tsx            # NEW — Sun* Kudos promotional block
│       └── WidgetButton.tsx            # NEW — Floating action button (Client Component)
├── i18n/
│   └── translations.ts                # MODIFY — Add homepage.* translation keys (VN + EN)
public/
├── assets/
│   ├── homepage/
│   │   └── images/
│   │       ├── award-top-talent.png    # NEW — Award card image
│   │       ├── award-top-project.png   # NEW — Award card image
│   │       ├── award-top-project-leader.png # NEW
│   │       ├── award-best-manager.png  # NEW
│   │       ├── award-signature-creator.png  # NEW
│   │       ├── award-mvp.png           # NEW
│   │       └── kudos-bg.png            # NEW — Sun* Kudos section image
│   └── fonts/
│       └── digital-numbers.woff2       # NEW — Countdown digit font
tests/
├── components/
│   ├── shared/
│   │   ├── Header.test.tsx             # MODIFY — Test variant="full" rendering
│   │   └── Footer.test.tsx             # NEW — Footer nav link tests
│   └── homepage/
│       ├── CountdownTimer.test.tsx      # NEW — Countdown logic, interval, edge cases
│       ├── AwardsSection.test.tsx       # NEW — Grid rendering, card links, responsive
│       ├── AwardCard.test.tsx           # NEW — Card render, click navigation, a11y
│       ├── HeroSection.test.tsx         # NEW — Hero rendering, CTA links
│       ├── KudosSection.test.tsx        # NEW — Kudos render, button navigation
│       └── WidgetButton.test.tsx        # NEW — Fixed positioning, click handler
└── app/
    └── dashboard/
        └── page.test.tsx               # NEW — Auth guard, section rendering
```

### New Files

| File | Purpose |
|------|---------|
| `src/components/shared/HeaderNav.tsx` | Client Component — nav links with active state, notification bell, user avatar |
| `src/components/shared/FooterNav.tsx` | Client Component — footer nav links |
| `src/components/homepage/HeroSection.tsx` | Hero section: key visual bg, gradients, countdown, event info, CTAs |
| `src/components/homepage/CountdownTimer.tsx` | Client Component: countdown logic with `setInterval`, display digits |
| `src/components/homepage/EventInfo.tsx` | Static event info (date, venue, livestream note) |
| `src/components/homepage/CTAButtons.tsx` | Client Component: two CTA buttons with hover state swap |
| `src/components/homepage/RootFurtherSection.tsx` | Static themed text content section |
| `src/components/homepage/AwardsSection.tsx` | Section header + responsive grid of AwardCards |
| `src/components/homepage/AwardCard.tsx` | Single award card: image, title, description, detail link |
| `src/components/homepage/awardsData.ts` | Typed constant array of award data |
| `src/components/homepage/KudosSection.tsx` | Sun* Kudos promotion block with CTA |
| `src/components/homepage/WidgetButton.tsx` | Client Component: floating action button |
| `public/assets/fonts/digital-numbers.woff2` | Countdown digit font |
| `public/assets/homepage/images/*.png` | Award card images (6) + Kudos section image |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/globals.css` | Add CSS custom properties: `--color-gold-primary`, `--color-gold-border`, `--color-gold-tint`, `--shadow-gold-glow`, `--font-digital-numbers` |
| `src/components/shared/Header.tsx` | Add `variant` prop. `"full"` renders `<HeaderNav>` with nav links, bell, avatar. `"minimal"` (default) keeps current behavior. |
| `src/components/shared/Footer.tsx` | Add `variant` prop. `"full"` renders logo, `<FooterNav>`, copyright. `"minimal"` (default) keeps current behavior. |
| `src/app/dashboard/page.tsx` | Replace `DashboardContent` import with Homepage sections. Keep auth guard. Render Header(full) + main content + Footer(full). |
| `src/i18n/translations.ts` | Add `homepage` section with subsections: `hero`, `countdown`, `eventInfo`, `rootFurther`, `awards` (including 6 award items), `kudos`, `footer`, `widget` |
| `src/app/layout.tsx` | Register "Digital Numbers" font via `next/font/local` |
| `tests/components/shared/Header.test.tsx` | Add tests for `variant="full"` rendering |

### Dependencies

| Dependency | Status | Purpose |
|------------|--------|---------|
| None new | — | All functionality uses React built-ins and existing project dependencies |

**Font dependency**: "Digital Numbers" `.woff2` file needs to be sourced. Fallback: `"Share Tech Mono"` from Google Fonts if Digital Numbers is unavailable.

---

## Implementation Approach

### Phase 0: Asset Preparation

- Download 6 award card images from Figma using `get_media_file` tool → `public/assets/homepage/images/`
- Download Kudos section decorative image → `public/assets/homepage/images/kudos-bg.png`
- Download Widget button icons from Figma
- Source "Digital Numbers" font file → `public/assets/fonts/digital-numbers.woff2`
- Add `NEXT_PUBLIC_EVENT_DATE` to `.env.example` and `.env.development`
- Verify all existing shared assets (key-visual.png, root-further.png, saa-logo.png) still work

### Phase 1: Foundation — Design Tokens, i18n, Font Setup

**Goal**: All infrastructure in place before building components.

1. **Update `globals.css`** — Add new CSS custom properties:
   ```
   --color-gold-primary: #FFEA9E
   --color-gold-border: #998C5F
   --color-gold-tint: rgba(255, 234, 158, 0.1)
   --color-footer-border: #2E3940 (already exists as --color-divider)
   --shadow-gold-glow: 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287
   ```
   Extend `@theme inline` block with new tokens.

2. **Register Digital Numbers font** in `layout.tsx` via `next/font/local`:
   ```ts
   const digitalNumbers = localFont({ src: '../../public/assets/fonts/digital-numbers.woff2', variable: '--font-digital-numbers', display: 'swap' });
   ```

3. **Extend `translations.ts`** — Add `homepage` section with all VN + EN keys:
   - `homepage.hero.comingSoon`, `homepage.hero.aboutAwards`, `homepage.hero.aboutKudos`
   - `homepage.countdown.days`, `homepage.countdown.hours`, `homepage.countdown.minutes`
   - `homepage.eventInfo.dateLabel`, `homepage.eventInfo.dateValue`, `homepage.eventInfo.venueLabel`, `homepage.eventInfo.venueValue`, `homepage.eventInfo.livestreamNote`
   - `homepage.rootFurther.quote`, `homepage.rootFurther.paragraph1`, `homepage.rootFurther.paragraph2`, `homepage.rootFurther.paragraph3`
   - `homepage.awards.caption`, `homepage.awards.title`, `homepage.awards.description`, `homepage.awards.detailLink`
   - 6 award items: `homepage.awards.topTalent.title`, `.description`, etc.
   - `homepage.kudos.label`, `homepage.kudos.title`, `homepage.kudos.description`, `homepage.kudos.detailButton`
   - `homepage.footer.aboutSAA`, `homepage.footer.awardsInfo`, `homepage.footer.sunKudos`, `homepage.footer.standards`

4. **Create `awardsData.ts`** — Typed constant:
   ```ts
   interface Award { id: string; titleKey: string; descriptionKey: string; imagePath: string; href: string; }
   ```

### Phase 2: Shared Component Enhancement — Header & Footer (US5, US7)

**Goal**: Header and Footer support full navigation for authenticated pages.

1. **Create `HeaderNav.tsx`** (Client Component):
   - Nav links with `pathname`-based active detection (use `usePathname()` from `next/navigation`)
   - Active state: gold text, bottom border, text-shadow glow
   - Hover state: background highlight
   - Notification bell icon (click handler — stub for now, opens nothing)
   - User avatar (from Supabase user metadata, click handler — stub for now)
   - All text through i18n

2. **Modify `Header.tsx`**:
   - Add `variant?: "minimal" | "full"` prop (default: `"minimal"`)
   - When `"full"`: render logo + `<HeaderNav />` + language selector
   - When `"minimal"`: keep current behavior (logo + language selector only)
   - Login page passes no prop (uses default). Dashboard passes `variant="full"`.

3. **Create `FooterNav.tsx`** (Client Component):
   - 4 nav links: About SAA 2025, Awards Information, Sun* Kudos, Tiêu chuẩn chung
   - Click handlers for navigation
   - SAA logo on the left

4. **Modify `Footer.tsx`**:
   - Add `variant?: "minimal" | "full"` prop (default: `"minimal"`)
   - When `"full"`: render logo + `<FooterNav />` + copyright
   - When `"minimal"`: keep current behavior (copyright only)

5. **Update tests**: Header.test.tsx, new Footer.test.tsx

### Phase 3: Core Page — Hero, Countdown, CTAs (US1, US2, US3, US4)

**Goal**: Hero section with all interactive elements.

1. **Create `CountdownTimer.tsx`** (Client Component):
   - Read `NEXT_PUBLIC_EVENT_DATE` env var (or fallback)
   - Calculate days/hours/minutes remaining
   - `setInterval` every 60 seconds to update
   - Clean up on unmount
   - Display with Digital Numbers font
   - Zero-pad all values (2 digits)
   - When reached 0: display 00/00/00, emit `isExpired` state
   - `aria-live="polite"` or `role="timer"` for a11y

2. **Create `EventInfo.tsx`**:
   - Static display: date, time, venue, livestream note
   - All values from i18n translations

3. **Create `CTAButtons.tsx`** (Client Component):
   - Two Next.js `<Link>` components styled as buttons
   - "ABOUT AWARDS": solid gold, dark text → navigates to `/awards-information`
   - "ABOUT KUDOS": outlined gold → navigates to `/sun-kudos` (or whatever route)
   - Hover state: swap filled/outlined appearance via CSS

4. **Create `HeroSection.tsx`**:
   - Compose: key visual bg + gradient overlays + ROOT FURTHER logo + CountdownTimer + "Coming soon" (conditional) + EventInfo + CTAButtons
   - Key visual image: `priority` loading
   - "Coming soon" hidden when countdown isExpired

5. **Tests**: CountdownTimer.test.tsx, HeroSection.test.tsx

### Phase 4: Static Content — Root Further, Awards, Kudos (US1, US3, US4)

**Goal**: All remaining content sections.

1. **Create `RootFurtherSection.tsx`**:
   - Static text section with quote and paragraphs
   - ROOT FURTHER small logo image
   - Content from i18n translations

2. **Create `AwardCard.tsx`**:
   - `<article>` wrapped in `<Link href={award.href}>`
   - Image (336x336px, gold glow box-shadow, mix-blend-mode: screen)
   - Title (gold), description (white, line-clamp-2), "Chi tiết" link with arrow
   - Hover: pointer cursor, visual feedback
   - Keyboard accessible: focusable, activatable

3. **Create `AwardsSection.tsx`**:
   - Section header: caption + title + description
   - Responsive grid: 3 columns desktop, 2 columns tablet/mobile
   - Map over `awardsData` array to render `<AwardCard>` instances

4. **Create `KudosSection.tsx`**:
   - "Phong trào ghi nhận" label + "Sun* Kudos" title + description
   - "Chi tiết" button → navigates to Sun* Kudos page
   - Decorative image
   - "KUDOS" watermark text (SVN-Gotham font — use Montserrat as fallback if SVN-Gotham unavailable)

5. **Tests**: AwardsSection.test.tsx, AwardCard.test.tsx, KudosSection.test.tsx

### Phase 5: Widget & Page Assembly (US1, US8)

**Goal**: Floating button and full page assembly.

1. **Create `WidgetButton.tsx`** (Client Component):
   - `position: fixed`, bottom-right, z-50
   - Gold pill shape (106x64px, border-radius: 100px)
   - Pencil icon + "/" + SAA icon
   - Gold glow box-shadow
   - Click handler: stub (opens nothing for now, future feature)

2. **Modify `dashboard/page.tsx`**:
   - Keep Server Component with auth guard
   - Render: `<Header variant="full" />` + `<main>` with all homepage sections + `<Footer variant="full" />` + `<WidgetButton />`
   - Remove `DashboardContent` import

3. **Delete `DashboardContent.tsx`** — replaced by homepage sections

4. **Tests**: WidgetButton.test.tsx, dashboard/page.test.tsx (auth guard + section rendering)

### Phase 6: Polish & Verification

1. **Responsive testing** at 375px, 768px, 1440px
2. **Accessibility audit**: keyboard navigation, screen reader, contrast
3. **i18n verification**: switch VN/EN, verify all text updates
4. **Performance**: Lighthouse audit, image optimization
5. **Visual comparison**: screenshot vs Figma design
6. **Build + lint + test**: all passing, zero errors

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Header nav active state, countdown timer lifecycle, award card navigation
- [x] **External dependencies**: Supabase Auth (getUser for page guard)
- [x] **User workflows**: Login → Homepage → click award → Awards Info page; Login → Homepage → click CTA
- [x] **Data layer**: N/A (no database)

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown timer state, active nav detection, language switching |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A (auth only) |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive grid layout at 3 breakpoints |

### Test Environment

- **Environment type**: Local (Vitest with jsdom)
- **Test data strategy**: Static award data, mock `Date.now()` for countdown, mock Supabase auth
- **Isolation approach**: Fresh render per test, mock cleanup

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| `next/image` | Passthrough (mock as `<img>`) | Image optimization is a Next.js concern |
| `next/link` | Passthrough (mock as `<a>`) | Navigation testing via href attribute |
| `next/navigation` | Mock `usePathname()` | Control active nav state in tests |
| `next/font/local` | Mock | Font loading not relevant in jsdom |
| Supabase `getUser` | Mock | Return controlled user/null for auth tests |
| `Date.now` / `setInterval` | `vi.useFakeTimers()` | Control countdown behavior |
| `LanguageProvider` | Real (wrap renders) | Test i18n integration |
| `process.env.NEXT_PUBLIC_EVENT_DATE` | Set in test | Control countdown target |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Homepage renders all 7 sections for authenticated user
   - [x] Countdown displays correct time remaining
   - [x] Award cards render 6 items in grid
   - [x] CTA buttons have correct href attributes
   - [x] Active nav link has gold styling
   - [x] Language switch updates all text

2. **Error Handling**
   - [x] Unauthenticated user redirected to login
   - [x] Missing event date env var falls back to default
   - [x] Invalid event date env var falls back to default

3. **Edge Cases**
   - [x] Countdown at zero: shows 00/00/00, hides "Coming soon"
   - [x] Countdown updates after 60 seconds (fake timer advance)
   - [x] Award card description truncated at 2 lines
   - [x] Widget button stays fixed during scroll

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Countdown timer logic | 95%+ | High |
| Award card rendering & navigation | 90%+ | High |
| Header/Footer nav variants | 85%+ | High |
| i18n text switching | 80%+ | Medium |
| Responsive layout | Manual testing | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` created and reviewed
- [x] Design-style data extracted from Figma
- [x] Header component exists (`src/components/shared/Header.tsx`)
- [x] Footer component exists (`src/components/shared/Footer.tsx`)
- [x] i18n system exists (`src/i18n/LanguageContext.tsx`, `src/i18n/translations.ts`)
- [x] Supabase Auth configured and working
- [x] Key visual and ROOT FURTHER logo exist in `public/assets/login/`
- [ ] Award card images (6) — need to be downloaded from Figma
- [ ] Kudos section image — need to be downloaded from Figma
- [ ] Widget button icons — need to be downloaded from Figma
- [ ] "Digital Numbers" font file — need to be sourced
- [ ] `NEXT_PUBLIC_EVENT_DATE` added to `.env.example`

### External Dependencies

None. Pure client-side feature with Supabase Auth (already configured).

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| "Digital Numbers" font not freely available | Medium | Low | Fallback to "Share Tech Mono" from Google Fonts or Courier-style monospace |
| Award card images not available via Figma media API | Low | Low | Use placeholder images during development, replace when available |
| Header/Footer enhancement breaks Login page | Low | High | `variant` prop with default "minimal" ensures backward compatibility. Existing tests catch regressions. |
| SVN-Gotham font (Kudos watermark) not available | High | Low | Use Montserrat Bold as fallback — watermark is decorative only |
| Awards Information / Sun* Kudos pages don't exist yet | Expected | Low | Navigation links point to future routes. Link still works, page returns 404 until implemented. |
| Bundle size increase from 6 new images | Low | Medium | Use Next.js Image optimization (WebP), lazy load all non-hero images |

### Estimated Complexity

- **Frontend**: Medium-High (many components, responsive grid, countdown logic, Header/Footer enhancement)
- **Backend**: None
- **Testing**: Medium (countdown timer testing with fake timers, responsive testing is manual)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (assets → foundation → shared → core → polish)

---

## Notes

- The Homepage replaces the current `/dashboard` placeholder. The route stays `/dashboard`. Consider renaming to `/home` in a future refactor if needed — for now, minimal routing change.
- The `DashboardContent.tsx` is deleted but `LogoutButton.tsx` is kept — it may be reused in the profile dropdown feature.
- Header and Footer use a `variant` prop pattern instead of separate components. This keeps the import structure simple and avoids breaking existing pages.
- The Login page currently renders `<Header />` and `<Footer />` with no props — they default to `"minimal"` variant, so no changes needed on the Login page.
- The `"Coming soon"` subtitle and countdown zero state are linked: both depend on whether `targetDate <= now`. The `CountdownTimer` component exposes this via a `isExpired` boolean that the parent `HeroSection` uses to conditionally render the subtitle.
- Award card images use `mix-blend-mode: screen` — this creates a luminous glow effect where the image blends with the dark background. This requires the image container to have the correct background color for the blend to work.
- The CTA button hover "swap" effect (filled ↔ outlined) is implemented purely via CSS pseudo-classes — no state needed.
- The Widget button's quick action menu is out of scope. The button renders and has a click handler that does nothing (or logs) until the menu feature is implemented.
- All new text must be added to translations.ts for both VN and EN per the project's i18n rule. This includes award titles, descriptions, event info, and all labels.
- The Header nav's notification bell and user avatar clicks are stubbed — they render the icons and have click handlers but don't open panels/dropdowns (those are separate features with their own specs).
