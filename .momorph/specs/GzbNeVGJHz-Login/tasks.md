# Tasks: Login

**Frame**: `GzbNeVGJHz-Login`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, assets, design tokens, test framework

- [x] T001 Download and organize media assets from Figma to public/assets/login/ per plan.md Phase 0 (saa-logo.png, vn-flag.svg, root-further.png, google.svg, key-visual.png) | public/assets/login/
- [x] T002 [P] Install test devDependencies: vitest, @testing-library/react, @testing-library/jest-dom, jsdom | package.json
- [x] T003 [P] Create Vitest configuration with jsdom environment and @/* path alias | vitest.config.ts
- [x] T004 [P] Add design token CSS custom properties to globals.css and register in @theme inline block per design-style.md Colors table (--color-bg-primary, --color-header-bg, --color-btn-login-bg, --color-btn-login-text, --color-text-primary, --color-divider) | src/app/globals.css
- [x] T005 [P] Add Montserrat (700) and Montserrat Alternates (700) via next/font/google, expose as CSS variables --font-montserrat and --font-montserrat-alt, register in @theme inline | src/app/layout.tsx

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Auth infrastructure required by ALL user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create root middleware: refresh Supabase auth session, redirect unauthenticated from /dashboard/* to /, redirect authenticated from / to /dashboard, configure matcher to exclude static files | middleware.ts
- [x] T007 [P] Create auth callback route handler: extract code from searchParams, exchange code for session via supabase.auth.exchangeCodeForSession(), redirect to /dashboard on success or / on failure, extract next param for post-login redirect | src/app/auth/callback/route.ts
- [x] T008 [P] Create dashboard placeholder page: check auth (redirect to / if unauthenticated), display user email and name from user_metadata, include logout button calling supabase.auth.signOut() | src/app/dashboard/page.tsx

**Checkpoint**: Auth infrastructure ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Google Login (Priority: P1) MVP

**Goal**: User can view the Login page and authenticate with Google OAuth via Supabase

**Independent Test**: Navigate to /, click "LOGIN With Google", complete OAuth, verify redirect to /dashboard

### Components (US1)

- [x] T009 [P] [US1] Create Header shared component (Server Component): absolute positioned, full width, z-10, semi-transparent dark bg rgba(11,15,18,0.8), logo (52x48 Image) on left, language selector placeholder (VN text + flag icon + chevron inline SVG) on right, padding 12px 144px desktop, responsive px-6 md:px-16 lg:px-[144px] | src/components/shared/Header.tsx
- [x] T010 [P] [US1] Create Footer shared component (Server Component): full width, border-top 1px solid #2E3940, centered text "Bản quyền thuộc về Sun* © 2025" in Montserrat Alternates Bold 16px/24px white, padding 40px 90px desktop, semantic footer element, responsive px-6 py-6 md:px-12 lg:px-[90px] lg:py-10 | src/components/shared/Footer.tsx
- [x] T011 [P] [US1] Create GoogleLoginButton client component ("use client"): state isLoading + error, onClick calls createClient() then supabase.auth.signInWithOAuth with provider google and redirectTo using window.location.origin + /auth/callback, gold bg #FFEA9E rounded-lg px-6 py-4, text "LOGIN With Google" Montserrat Bold 22px/28px #00101A, Google icon 24x24 SVG right of text, disabled state with opacity-60 and spinner, error display below button, aria-label, double-click prevention | src/components/login/GoogleLoginButton.tsx
- [x] T012 [P] [US1] Create HeroSection server component: relative container min-h-screen, background layers (key-visual Image z-1 with fill+priority+object-cover, left gradient div z-2 linear-gradient 90deg, bottom gradient div z-3 linear-gradient 0deg), content z-4 (ROOT FURTHER logo Image 451x200 priority, 80px gap, description text Montserrat Bold 20px/40px white with 16px left padding, 24px gap, GoogleLoginButton), responsive padding px-6 md:px-16 lg:px-[144px] | src/components/login/HeroSection.tsx
- [x] T013 [US1] Compose Login page: Server Component, check auth via createClient + supabase.auth.getUser, if authenticated redirect to /dashboard, else render main with Header + HeroSection + Footer, min-h-screen bg-[#00101A] flex flex-col, semantic main element | src/app/page.tsx

### Tests (US1)

- [x] T014 [P] [US1] Test GoogleLoginButton: renders button with correct text and Google icon, calls signInWithOAuth with provider google and correct redirectTo on click, shows loading state and disables button during OAuth, shows error message on OAuth failure, prevents double-click | tests/components/login/GoogleLoginButton.test.tsx
- [x] T015 [P] [US1] Test auth callback route: redirects to / when code param missing, exchanges code for session and redirects to /dashboard on success, redirects to / on exchange failure without leaking error, respects next query param for redirect target | tests/app/auth/callback/route.test.ts
- [x] T016 [US1] Test Login page: renders Header, HeroSection with GoogleLoginButton, and Footer when unauthenticated, redirects to /dashboard when user is authenticated | tests/app/page.test.tsx

**Checkpoint**: User Story 1 complete — user can log in with Google and reach dashboard

---

## Phase 4: User Story 2 - View Login Page (Priority: P2)

**Goal**: Login page renders correctly and responsively at all breakpoints matching Figma design

**Independent Test**: Navigate to / at mobile/tablet/desktop widths, verify layout adapts correctly

### Responsive & Visual Polish (US2)

- [x] T017 [P] [US2] Add responsive breakpoints to Header: mobile padding 12px 24px with logo 40x36, tablet padding 12px 64px with logo 48x44, hide language text below 480px (icon-only) | src/components/shared/Header.tsx
- [x] T018 [P] [US2] Add responsive breakpoints to Footer: mobile padding 24px font-size 14px centered, tablet padding 32px 48px | src/components/shared/Footer.tsx
- [x] T019 [P] [US2] Add responsive breakpoints to HeroSection: mobile padding 48px 24px with ROOT FURTHER logo max-w-[280px] and description 16px/32px, tablet padding 64px 64px with logo max-w-[360px] and description 18px/36px | src/components/login/HeroSection.tsx
- [x] T020 [P] [US2] Add responsive breakpoints to GoogleLoginButton: mobile full-width font-size 18px, tablet min-width 280px font-size 20px, desktop 305px auto font-size 22px | src/components/login/GoogleLoginButton.tsx
- [x] T021 [P] [US2] Add hover and interaction states: login button hover shadow-lg -translate-y-px transition 200ms + active translate-y-0, language selector hover bg-white/10 cursor-pointer transition 150ms | src/components/login/GoogleLoginButton.tsx, src/components/shared/Header.tsx
- [x] T022 [P] [US2] Add loading and error states to GoogleLoginButton: spinner animation replacing Google icon when loading, error text in red below button auto-clearing after 5s or on retry | src/components/login/GoogleLoginButton.tsx
- [x] T023 [US2] Image optimization verification: key-visual uses Image fill priority sizes="100vw" quality={80}, ROOT FURTHER logo uses priority with explicit width/height, all SVG icons served directly, verify no layout shift | src/components/login/HeroSection.tsx, src/components/shared/Header.tsx

### Tests (US2)

- [x] T024 [US2] Test visual rendering: all images have correct alt attributes, Header/Hero/Footer render all expected text content and elements, verify page structure matches Figma layout | tests/app/page.visual.test.tsx

**Checkpoint**: User Stories 1 & 2 complete — login works and looks correct at all breakpoints

---

## Phase 5: User Story 3 - Language Selector (Priority: P3)

**Goal**: Language selector in header displays correctly with VN flag, text, and chevron

**Independent Test**: Verify language selector button renders with flag icon, "VN" text, and down chevron

### Language Selector (US3)

- [x] T025 [US3] Refine language selector in Header: ensure flag icon 20x15 SVG renders correctly, VN text Montserrat Bold 16px/24px white letter-spacing 0.15px, down chevron inline SVG 24x24, outer container 108x56 padding-16 rounded-4px gap-2px, hover bg-white/10 + pointer, aria-label="Select language" | src/components/shared/Header.tsx

### Tests (US3)

- [x] T026 [US3] Test language selector: renders VN text, flag icon, and chevron icon, has correct aria-label, shows hover state styles | tests/components/shared/Header.test.tsx

**Checkpoint**: All user stories complete

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, final quality checks

- [x] T027 [P] Accessibility audit: verify semantic HTML (header, main, footer, button elements), keyboard navigation Tab order (language selector then login button), Enter/Space activates buttons, focus rings outline-2 outline-offset-2 on interactive elements, color contrast white on dark >=4.5:1 and dark on gold >=4.5:1 | src/app/page.tsx, src/components/**
- [x] T028 [P] Final lint check: run ESLint with zero errors, verify TypeScript compiles with strict mode, remove any dead code or unused imports | all files
- [x] T029 Code cleanup: verify all @/* import aliases, no relative imports beyond one parent, consistent naming conventions (PascalCase components, camelCase hooks/utils), trim login button trailing space from Figma | all files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 completion (design tokens + fonts needed) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 completion (middleware + callback needed for auth flow)
- **US2 (Phase 4)**: Depends on Phase 3 completion (components must exist before adding responsive)
- **US3 (Phase 5)**: Depends on Phase 3 completion (Header component must exist)
  - US2 and US3 can proceed in parallel
- **Polish (Phase 6)**: Depends on all user stories being complete

### Within Each Phase

- Tasks marked [P] can run in parallel
- Tests should be written alongside or before implementation per TDD (constitution II)
- Components before page composition
- Auth infrastructure before auth-dependent components

### Parallel Opportunities

- **Phase 1**: T002, T003, T004, T005 all run in parallel (after T001 assets)
- **Phase 2**: T007, T008 run in parallel (T006 middleware can also be parallel if no deps)
- **Phase 3**: T009, T010, T011, T012 all run in parallel (different files). T014, T015 parallel. Then T013 (depends on all components), T016 (depends on T013)
- **Phase 4**: T017, T018, T019, T020, T021, T022 all run in parallel
- **Phase 5**: US3 can start as soon as Phase 3 is done (parallel with Phase 4)
- **Phase 6**: T027, T028 run in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (US1 — Google Login)
3. **STOP and VALIDATE**: Test login flow end-to-end with `make up && make dev`
4. Deploy if login works

### Incremental Delivery

1. Setup + Foundation (Phase 1+2)
2. Add US1 (Login) → Test → Verify auth works
3. Add US2 (Responsive) → Test → Verify at all breakpoints
4. Add US3 (Language Selector) → Test → Verify selector renders
5. Polish (Phase 6) → Final audit → Ready for review

---

## Notes

- Commit after each task or logical group (per constitution: conventional commits)
- Run `yarn lint` and `yarn test` before moving to next phase
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- The constitution mandates TDD — write tests alongside implementation
- Total estimated tasks: 29
