# Tasks: Homepage SAA

**Frame**: `i87tDx10uM-Homepage-SAA`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US9)
- **|**: File path affected by this task

---

## User Story Map

| ID | Title | Priority |
|----|-------|----------|
| US1 | View Homepage After Login | P1 |
| US2 | Countdown Timer | P1 |
| US3 | Navigate to Awards Information | P1 |
| US4 | Navigate to Sun* Kudos | P1 |
| US5 | Header Navigation | P1 |
| US6 | Responsive Layout | P2 |
| US7 | Footer Navigation | P2 |
| US8 | Widget Button | P3 |
| US9 | Internationalization | P2 |

---

## Phase 1: Setup (Assets & Environment)

**Purpose**: Download assets from Figma, source fonts, configure environment variables

- [x] T001 Download 6 award card images from Figma using `get_media_file` tool | public/assets/homepage/images/award-*.png
- [x] T002 [P] Download Kudos section decorative image from Figma | public/assets/homepage/images/kudos-bg.png
- [x] T003 [P] Download Widget button icons from Figma | public/assets/homepage/icons/
- [x] T004 [P] Source "Digital Numbers" font file (.woff2). If unavailable, use "Share Tech Mono" from Google Fonts as fallback | public/assets/fonts/digital-numbers.woff2
- [x] T005 [P] Add `NEXT_PUBLIC_EVENT_DATE` to `.env.example` and `.env.development` with value `2025-12-26T18:00:00+07:00` | .env.example, .env.development

---

## Phase 2: Foundation (Design Tokens, i18n, Font, Data)

**Purpose**: Core infrastructure required by ALL user stories — CSS tokens, i18n keys, font registration, typed data

**CRITICAL**: No component work can begin until this phase is complete

- [x] T006 Add new CSS custom properties to globals.css: `--color-gold-primary: #FFEA9E`, `--color-gold-border: #998C5F`, `--color-gold-tint: rgba(255,234,158,0.1)`, `--shadow-gold-glow`. Extend `@theme inline` block | src/app/globals.css
- [x] T007 [P] Register "Digital Numbers" font in layout.tsx via `next/font/local` with `--font-digital-numbers` CSS variable and `display: 'swap'`. Add variable to body className | src/app/layout.tsx
- [x] T008 Extend translations.ts with `homepage` section for both VN and EN: `homepage.hero.*`, `homepage.countdown.*`, `homepage.eventInfo.*`, `homepage.rootFurther.*`, `homepage.awards.*` (6 award items each with title + description), `homepage.kudos.*`, `homepage.nav.*` (header/footer nav labels). Update `Translations` interface | src/i18n/translations.ts
- [x] T009 [P] Create typed award data array with interface `Award { id, titleKey, descriptionKey, imagePath, href }` and 6 award entries (top-talent, top-project, top-project-leader, best-manager, signature-2025-creator, mvp) | src/components/homepage/awardsData.ts

**Checkpoint**: Foundation ready — component implementation can begin

---

## Phase 3: US5 — Header Navigation (Priority: P1)

**Goal**: Enhanced Header with full navigation, active link detection, notification bell, user avatar for authenticated pages

**Independent Test**: Render Header with `variant="full"`, verify 3 nav links visible, "About SAA 2025" has gold active styling, notification bell and avatar icons present

### Implementation (US5)

- [x] T010 [US5] Create HeaderNav client component: 3 nav links ("About SAA 2025", "Awards Information", "Sun* Kudos") using Next.js `<Link>`, active detection via `usePathname()` with gold text + bottom border + text-shadow glow, hover highlight, notification bell icon (stub click), user avatar (stub click). All labels from i18n | src/components/shared/HeaderNav.tsx
- [x] T011 [US5] Modify Header.tsx: add `variant?: "minimal" | "full"` prop (default `"minimal"`). When `"full"`: render logo + `<HeaderNav />` + `<LanguageSelector />`. When `"minimal"`: keep current behavior. Ensure Login page backward compatibility (passes no variant) | src/components/shared/Header.tsx

### Tests (US5)

- [x] T012 [US5] Update Header tests: add test cases for `variant="full"` rendering (nav links visible, active state on dashboard route, notification bell present, avatar present). Verify `variant="minimal"` still works (logo + language selector only) | tests/components/shared/Header.test.tsx

**Checkpoint**: Header fully navigable on authenticated pages, Login page unaffected

---

## Phase 4: US7 — Footer Navigation (Priority: P2)

**Goal**: Enhanced Footer with SAA logo, navigation links, and copyright for authenticated pages

**Independent Test**: Render Footer with `variant="full"`, verify SAA logo, 4 nav links, copyright text, border-top styling

### Implementation (US7)

- [x] T013 [P] [US7] Create FooterNav client component: SAA logo (69x64px), 4 nav links ("About SAA 2025", "Awards Information", "Sun* Kudos", "Tiêu chuẩn chung") using `<Link>`, flex row with 80px gap. All labels from i18n | src/components/shared/FooterNav.tsx
- [x] T014 [US7] Modify Footer.tsx: add `variant?: "minimal" | "full"` prop (default `"minimal"`). When `"full"`: render `<FooterNav />` + copyright with flex justify-between layout, padding 40px 90px, border-top 1px solid #2E3940. When `"minimal"`: keep current behavior | src/components/shared/Footer.tsx

### Tests (US7)

- [x] T015 [US7] Create Footer tests: verify `variant="full"` renders logo, 4 nav links with correct hrefs, copyright text. Verify `variant="minimal"` renders copyright only | tests/components/shared/Footer.test.tsx

**Checkpoint**: Footer fully navigable on authenticated pages, Login page unaffected

---

## Phase 5: US2 — Countdown Timer (Priority: P1)

**Goal**: Live countdown showing Days/Hours/Minutes to event date, auto-updating every 60 seconds

**Independent Test**: Render CountdownTimer, verify it shows correct remaining time. Advance fake timer by 60s, verify update. Set past date, verify 00/00/00 and "Coming soon" hidden.

### Implementation (US2)

- [x] T016 [US2] Create CountdownTimer client component: read `NEXT_PUBLIC_EVENT_DATE` env var (fallback `2025-12-26T00:00:00+07:00`), calculate days/hours/minutes, `setInterval` 60s update, cleanup on unmount, zero-pad 2 digits, Digital Numbers font for digits, Montserrat Bold 24px for unit labels ("DAYS"/"HOURS"/"MINUTES"), `role="timer"` + `aria-live="polite"`. Export `isExpired` via callback prop `onExpired?: (expired: boolean) => void` | src/components/homepage/CountdownTimer.tsx

### Tests (US2)

- [x] T017 [US2] Create CountdownTimer tests using `vi.useFakeTimers()`: renders correct time remaining, updates after 60s tick, shows 00/00/00 when expired, hides "Coming soon" via onExpired callback, falls back to default when env var missing, falls back when env var invalid, cleans up interval on unmount | tests/components/homepage/CountdownTimer.test.tsx

**Checkpoint**: Countdown timer works standalone, all edge cases covered

---

## Phase 6: US1 + US3 + US4 — Core Homepage Sections (Priority: P1)

**Goal**: All page content sections — Hero, Root Further, Awards grid, Kudos block, CTA navigation

**Independent Test**: Render full page, verify all 7 sections visible. Click award card → correct href. Click CTA → correct href. Switch language → all text updates.

### Hero Section (US1, US3, US4)

- [x] T018 [P] [US1] Create EventInfo component: static display of date, time/venue, livestream note. Labels (Montserrat Bold 16px white) + values (Montserrat Bold 24px gold #FFEA9E). All values from i18n | src/components/homepage/EventInfo.tsx
- [x] T019 [P] [US3] [US4] Create CTAButtons client component: two `<Link>` styled as buttons. "ABOUT AWARDS" → `/awards-information` (solid gold bg #FFEA9E, dark text #00101A, rounded 8px). "ABOUT KUDOS" → `/sun-kudos` (border #998C5F, tint bg, white text). Hover: swap filled/outlined via CSS. Montserrat Bold 22px/28px | src/components/homepage/CTAButtons.tsx
- [x] T020 [US1] Create HeroSection component: compose key visual bg (`priority` loading) + gradient overlays (linear-gradient 12deg) + ROOT FURTHER logo + "Coming soon" subtitle (conditional on countdown expired) + CountdownTimer + EventInfo + CTAButtons. Full-width with max-w-[1224px] content | src/components/homepage/HeroSection.tsx

### Root Further Section (US1)

- [x] T021 [P] [US1] Create RootFurtherSection component: ROOT FURTHER small logo image + quote text (Montserrat 700 20px/32px) + long paragraphs (Montserrat 700 24px/32px white). Container: max-w-[1152px], padding 120px 104px, border-radius 8px. Content from i18n | src/components/homepage/RootFurtherSection.tsx

### Awards Section (US3)

- [x] T022 [P] [US3] Create AwardCard component: `<article>` wrapped in `<Link href={award.href}>`. Image 336x336px with gold glow box-shadow + mix-blend-mode: screen. Title: Montserrat 400 24px gold. Description: Montserrat 400 16px white, `line-clamp-2`. "Chi tiết" link with arrow icon (Montserrat 500 16px white). Hover: pointer + visual feedback. Keyboard accessible | src/components/homepage/AwardCard.tsx
- [x] T023 [US3] Create AwardsSection component: section header ("Sun* annual awards 2025" caption Montserrat 700 24px + "Hệ thống giải thưởng" title Montserrat 700 57px gold + description). Responsive grid: `grid-cols-2 lg:grid-cols-3`. Map `awardsData` → `<AwardCard>`. Content from i18n | src/components/homepage/AwardsSection.tsx

### Kudos Section (US4)

- [x] T024 [P] [US4] Create KudosSection component: "Phong trào ghi nhận" label (Montserrat 700 24px white) + "Sun* Kudos" title (Montserrat 700 57px gold) + description (Montserrat 700 16px white) + "Chi tiết" `<Link>` button → Sun* Kudos page + decorative image + "KUDOS" watermark text (Montserrat Bold fallback). Container 1224x500px | src/components/homepage/KudosSection.tsx

### Tests (US1, US3, US4)

- [x] T025 [P] [US1] Create HeroSection tests: renders key visual image, ROOT FURTHER logo, countdown timer, event info, both CTA buttons with correct hrefs, "Coming soon" conditional visibility | tests/components/homepage/HeroSection.test.tsx
- [x] T026 [P] [US3] Create AwardCard tests: renders image, title, description (truncated), "Chi tiết" link, correct href with hash anchor, keyboard focusable, has article semantic element | tests/components/homepage/AwardCard.test.tsx
- [x] T027 [P] [US3] Create AwardsSection tests: renders section header, 6 award cards, grid layout class, all cards have distinct hrefs | tests/components/homepage/AwardsSection.test.tsx
- [x] T028 [P] [US4] Create KudosSection tests: renders label, title, description, "Chi tiết" button with correct href | tests/components/homepage/KudosSection.test.tsx

**Checkpoint**: All content sections render correctly, navigation links verified

---

## Phase 7: US8 — Widget Button (Priority: P3)

**Goal**: Floating gold pill button fixed at bottom-right of viewport

**Independent Test**: Render WidgetButton, verify fixed positioning, gold pill styling, click handler fires

### Implementation (US8)

- [x] T029 [US8] Create WidgetButton client component: `position: fixed`, bottom-right, z-50. Gold pill 106x64px, border-radius 100px, bg #FFEA9E, box-shadow gold glow. Pencil icon + "/" + SAA icon. Click handler: stub (console.log or no-op) | src/components/homepage/WidgetButton.tsx

### Tests (US8)

- [x] T030 [US8] Create WidgetButton tests: renders with correct styling classes, click handler fires, has accessible button role | tests/components/homepage/WidgetButton.test.tsx

**Checkpoint**: Widget button renders and is interactive

---

## Phase 8: US1 — Page Assembly (Priority: P1)

**Goal**: Wire all sections into the dashboard page, replace placeholder

**Independent Test**: Log in via auth, navigate to /dashboard, verify all 7 sections render in correct order. Verify auth guard redirects unauthenticated users.

### Implementation (US1)

- [x] T031 [US1] Modify dashboard/page.tsx: keep Server Component with Supabase auth guard. Replace `DashboardContent` import. Render `<Header variant="full" />` + `<main>` containing HeroSection, RootFurtherSection, AwardsSection, KudosSection + `<Footer variant="full" />` + `<WidgetButton />`. Pass user data to Header for avatar | src/app/dashboard/page.tsx
- [x] T032 [US1] Delete DashboardContent.tsx (replaced by homepage sections). Keep LogoutButton.tsx for future use | src/app/dashboard/DashboardContent.tsx

### Tests (US1)

- [x] T033 [US1] Create dashboard page tests: authenticated user sees all sections (Header, Hero, RootFurther, Awards, Kudos, Widget, Footer). Unauthenticated user redirected to login. Mock Supabase getUser | tests/app/dashboard/page.test.tsx

**Checkpoint**: Full homepage assembled, auth guard works, all user stories P1 complete

---

## Phase 9: Polish & Cross-Cutting Concerns (US6, US9)

**Purpose**: Responsive refinement, i18n verification, accessibility, performance, final validation

- [x] T034 [P] [US6] Verify responsive layout at 375px (mobile): hero stacks vertically, CTA buttons stack, countdown scales, awards grid 2-col, header adapts, no horizontal overflow | Manual testing
- [x] T035 [P] [US6] Verify responsive layout at 768px (tablet): awards grid 2-col, content paddings adjust, all sections readable | Manual testing
- [x] T036 [P] [US6] Verify responsive layout at 1440px (desktop): awards grid 3-col, content max-w-1224px centered, full header/footer | Manual testing
- [x] T037 [P] [US9] Verify i18n: switch to EN, confirm all homepage text updates (hero, countdown labels, event info, root further, award titles/descriptions, kudos, nav links, footer). Switch back to VN, confirm revert | Manual testing
- [x] T038 [P] Accessibility audit: keyboard navigation through all interactive elements (nav links, CTA buttons, award cards, widget button). Verify focus indicators visible. Verify countdown has `role="timer"`. Verify award cards have `<article>` semantics | Manual testing
- [x] T039 Run `yarn lint` — zero errors | All files
- [x] T040 Run `yarn build` — compiles successfully with no type errors | All files
- [x] T041 Run `yarn test:run` — all tests pass | All test files
- [x] T042 Visual comparison: screenshot homepage at 1440px vs Figma frame. Adjust any pixel mismatches | All component files

**Checkpoint**: All user stories complete, all quality gates pass

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundation) — BLOCKS all user stories
    ↓
Phase 3 (US5 Header) ──┐
Phase 4 (US7 Footer) ──┤── Can run in parallel
Phase 5 (US2 Countdown)┤
    ↓
Phase 6 (US1+US3+US4 Core) — Depends on Phase 3, 4, 5
    ↓
Phase 7 (US8 Widget) ──── Can run parallel with Phase 6
    ↓
Phase 8 (Page Assembly) — Depends on Phase 6 + 7
    ↓
Phase 9 (Polish US6+US9) — Depends on Phase 8
```

### Within Each Phase

- Tasks marked [P] can run in parallel
- Tests alongside or after implementation within the same phase
- Components before composition (AwardCard before AwardsSection)

### Parallel Opportunities

- **Phase 3 + 4 + 5**: Header, Footer, Countdown can all be built simultaneously (different files, no deps)
- **Phase 6**: EventInfo, CTAButtons, RootFurtherSection, AwardCard, KudosSection can all be built in parallel (all [P])
- **Phase 6 + 7**: WidgetButton can be built alongside core sections
- **Phase 9**: All manual testing tasks are parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US5 Header) — unlocks visible navigation
3. Complete Phase 5 (US2 Countdown) + Phase 6 partial (HeroSection only)
4. **STOP and VALIDATE**: Auth page with Header + Hero section is a viable MVP
5. Continue Phase 6 (Awards, Kudos) + Phase 4 (Footer) + Phase 7 (Widget)
6. Phase 8 (Assembly) + Phase 9 (Polish)

### Incremental Delivery

1. Setup + Foundation → Tokens + i18n ready
2. Header + Footer → Shared nav functional
3. Hero + Countdown → Dynamic hero section
4. Awards + Kudos → Full content sections
5. Widget + Assembly → Complete page
6. Polish → Production-ready

---

## Summary

| Metric | Count |
|--------|-------|
| **Total tasks** | 42 |
| **Phase 1 (Setup)** | 5 tasks |
| **Phase 2 (Foundation)** | 4 tasks |
| **Phase 3 (US5 Header)** | 3 tasks |
| **Phase 4 (US7 Footer)** | 3 tasks |
| **Phase 5 (US2 Countdown)** | 2 tasks |
| **Phase 6 (US1+US3+US4 Core)** | 11 tasks |
| **Phase 7 (US8 Widget)** | 2 tasks |
| **Phase 8 (US1 Assembly)** | 3 tasks |
| **Phase 9 (Polish)** | 9 tasks |
| **Parallel opportunities** | 22 tasks marked [P] |
| **New component files** | 12 |
| **Modified files** | 7 |
| **New test files** | 9 |

---

## Notes

- Commit after each phase or logical group of tasks
- Run `yarn test:run && yarn lint` before moving to next phase
- Update this file: mark tasks `[x]` as you complete them
- All text content must go through i18n (both VN + EN) per project rule
- Header/Footer `variant` prop defaults to "minimal" — Login page needs zero changes
- Award card images may use placeholders until Figma downloads complete
- Widget button click handler is a stub — menu is a separate feature spec
- Header notification bell and user avatar are stubs — separate feature specs
