# Implementation Plan: Login

**Frame**: `GzbNeVGJHz-Login`
**Date**: 2026-04-10
**Spec**: `specs/GzbNeVGJHz-Login/spec.md`

---

## Summary

Build the Login landing page for SAA 2025 — a full-screen hero page with a background key visual, header with logo and language selector, hero content with "ROOT FURTHER" branding, a "LOGIN With Google" button powered by Supabase Auth (Google OAuth), and a copyright footer. The page is the application entry point and the sole authentication method is Google OAuth via Supabase.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, @supabase/ssr, @supabase/supabase-js
**Database**: PostgreSQL (Supabase)
**Testing**: Vitest (unit/integration), Playwright (E2E) — both MUST be added as devDependencies
**State Management**: React Server Components + minimal client state (loading/error)
**API Style**: Next.js Route Handlers (auth callback)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

| Constitution Principle | Plan Compliance | Detail |
|------------------------|-----------------|--------|
| **I. Clean Architecture** | ✅ Compliant | Feature-based folders (`components/login/`, `components/shared/`), `@/*` imports, single responsibility per file, TypeScript strict |
| **II. TDD (NON-NEGOTIABLE)** | ✅ Planned | Tests written before implementation in each phase. Vitest for unit/integration, Playwright for E2E. Coverage targets: 90%+ core flows, 85%+ integrations, 75%+ edge cases |
| **III. Security (OWASP)** | ✅ Compliant | Supabase Auth exclusively (no custom auth), env-based secrets, no `dangerouslySetInnerHTML`, PKCE flow for OAuth, error messages do not leak internals, CSRF via Supabase built-in |
| **IV. Responsive & Accessible** | ✅ Planned | Mobile-first approach, 3 breakpoints (320-767, 768-1023, 1024+), WCAG 2.1 AA, semantic HTML, keyboard nav, `aria-label` on interactive elements, 44px touch targets |
| **V. Tech Stack Best Practices** | ✅ Compliant | RSC by default, `"use client"` only for GoogleLoginButton, `next/font/google` for fonts, `@supabase/ssr` clients, TailwindCSS utilities, `<Image>` for asset optimization |

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — `src/components/login/` for Login-specific components, `src/components/shared/` for Header/Footer reused across pages
- **Styling Strategy**: TailwindCSS v4 utilities with CSS custom properties for design tokens (colors, fonts). Mobile-first responsive approach.
- **Data Fetching**: Server Component renders the page. Login button is a Client Component that triggers Supabase OAuth. Auth callback handled by a Route Handler.
- **Fonts**: Montserrat (700) and Montserrat Alternates (700) via `next/font/google`

### Backend Approach

- **Auth Flow**: Supabase Google OAuth PKCE flow
  1. User clicks "LOGIN With Google"
  2. Client calls `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '<origin>/auth/callback' } })` — MUST use absolute URL constructed from `window.location.origin`
  3. User completes Google sign-in
  4. Google redirects to Supabase, which redirects to `/auth/callback`
  5. Route Handler at `/auth/callback` exchanges the code for a session via `exchangeCodeForSession(code)`
  6. User is redirected to `/dashboard` (or `next` query param if present)
- **Middleware**: Root-level `middleware.ts` to:
  1. Refresh Supabase auth sessions on every request
  2. Redirect unauthenticated users from protected routes to `/`
  3. Redirect authenticated users from `/` to `/dashboard`
- **Authenticated redirect destination**: Create a minimal placeholder page at `/dashboard` that displays user info (email, name from Google). This is a temporary landing page — the actual dashboard is out of scope but we need a redirect target to avoid loops.
- **No database migrations needed** — Supabase Auth handles user table automatically

### Integration Points

- **Existing Services**: `src/libs/supabase/client.ts` (browser), `src/libs/supabase/server.ts` (server), `src/libs/supabase/middleware.ts` (middleware utility)
- **Shared Components**: Header and Footer will be reusable across all pages
- **API Contracts**: Supabase Auth API (Google OAuth), no custom API endpoints needed beyond the callback

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/GzbNeVGJHz-Login/
├── spec.md              # Feature specification
├── plan.md              # This file
├── design-style.md      # Design tokens and styles
└── research.md          # Codebase research findings (optional)
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── page.tsx                      # MODIFY — Replace default with Login page
│   ├── layout.tsx                    # MODIFY — Update fonts (add Montserrat)
│   ├── globals.css                   # MODIFY — Add design tokens as CSS variables
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts              # NEW — Auth callback Route Handler
│   └── dashboard/
│       └── page.tsx                  # NEW — Minimal placeholder for authenticated users
├── components/
│   ├── shared/
│   │   ├── Header.tsx                # NEW — Header with logo + language selector
│   │   └── Footer.tsx                # NEW — Footer with copyright
│   └── login/
│       ├── HeroSection.tsx           # NEW — Hero content area
│       └── GoogleLoginButton.tsx     # NEW — "LOGIN With Google" button (client component)
├── libs/
│   └── supabase/
│       ├── client.ts                 # EXISTS — Browser client
│       ├── server.ts                 # EXISTS — Server client
│       └── middleware.ts             # EXISTS — Middleware utility
middleware.ts                         # NEW — Root middleware for session refresh + auth routing
public/
├── assets/
│   └── login/
│       ├── icons/
│       │   ├── google.svg            # NEW — Google icon
│       │   └── vn-flag.svg           # NEW — Vietnam flag icon
│       ├── logos/
│       │   ├── saa-logo.png          # NEW — SAA 2025 logo
│       │   └── root-further.png      # NEW — "ROOT FURTHER" logo
│       └── images/
│           └── key-visual.png        # NEW — Background key visual (optimized)
```

### New Files

| File | Purpose |
|------|---------|
| `src/app/auth/callback/route.ts` | Exchange OAuth code for session, redirect to `/dashboard` or `next` param |
| `src/app/dashboard/page.tsx` | Minimal placeholder — displays authenticated user info, logout link |
| `src/components/shared/Header.tsx` | Reusable header — logo + language selector (Server Component) |
| `src/components/shared/Footer.tsx` | Reusable footer — copyright text (Server Component) |
| `src/components/login/HeroSection.tsx` | Hero area — key visual, gradients, title, description (Server Component) |
| `src/components/login/GoogleLoginButton.tsx` | "LOGIN With Google" button — triggers OAuth (Client Component) |
| `middleware.ts` (root) | Refreshes Supabase session, redirects unauth from protected routes, redirects auth from `/` |
| `public/assets/login/*` | Media assets: 2 icons (google.svg, vn-flag.svg), 2 logos (saa-logo.png, root-further.png), 1 image (key-visual.png) |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/page.tsx` | Replace default Next.js boilerplate with Login page: import Header, HeroSection, Footer; check auth state; compose full-page layout |
| `src/app/layout.tsx` | Add Montserrat (700) + Montserrat Alternates (700) via `next/font/google`; set CSS variables `--font-montserrat` and `--font-montserrat-alt`; update `<html>` className |
| `src/app/globals.css` | Add CSS custom properties for design tokens (8 colors, spacing, border-radius); register tokens in `@theme inline` block for TailwindCSS v4 |
| `package.json` | Add devDependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` (Playwright added separately if E2E is in scope) |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vitest` | ^3.x | Unit/integration test runner |
| `@testing-library/react` | ^16.x | React component testing utilities |
| `@testing-library/jest-dom` | ^6.x | DOM assertion matchers |
| `jsdom` | ^25.x | DOM environment for Vitest |

---

## Implementation Approach

### Phase 0: Asset Preparation

- Download all media files from Figma using `get_media_files` tool:
  - `saa-logo.png` — SAA 2025 logo (header) — node `I662:14391;178:1033;178:1030`
  - `vn-flag.svg` — Vietnam flag icon (language selector) — node `I662:14391;186:1696;186:1821;186:1709`
  - `root-further.png` — "ROOT FURTHER" title logo — node `2939:9548`
  - `google.svg` — Google icon (login button) — node `I662:14426;186:1766`
  - `key-visual.png` — Background artwork — extracted from frame background
- Organize under `public/assets/login/{icons,logos,images}/`
- **Image optimization for key-visual.png**:
  - Convert to WebP format if possible (fallback to optimized PNG)
  - Target max file size: ~200KB (compress with quality 80-85%)
  - Next.js `<Image>` component will handle responsive sizing via `sizes` prop
  - Use `priority` prop since it's above-the-fold content
- Verify asset naming: kebab-case per constitution
- Down chevron icon is unavailable (null from MoMorph) — create a simple inline SVG: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="white" stroke-width="2" fill="none"/></svg>`

### Phase 1: Foundation (Setup & Infrastructure)

1. **Test framework setup** — Add devDependencies and configure:
   - `yarn add -D vitest @testing-library/react @testing-library/jest-dom jsdom`
   - Create `vitest.config.ts` with jsdom environment, path aliases
   - Add `"test": "vitest"` script to `package.json`

2. **Design tokens** — Add CSS custom properties to `globals.css`:
   ```css
   :root {
     --color-bg-primary: #00101A;
     --color-header-bg: rgba(11, 15, 18, 0.8);
     --color-btn-login-bg: #FFEA9E;
     --color-btn-login-text: #00101A;
     --color-text-primary: #FFFFFF;
     --color-divider: #2E3940;
   }
   ```
   Register in `@theme inline` block for TailwindCSS v4 consumption.

3. **Fonts** — Update `layout.tsx`:
   - Add `Montserrat` (weight 700) and `Montserrat_Alternates` (weight 700) via `next/font/google`
   - Expose as CSS variables: `--font-montserrat`, `--font-montserrat-alt`
   - Register in `@theme inline` block

4. **Root middleware** — Create `middleware.ts` at project root:
   - Import and use `src/libs/supabase/middleware.ts` utility to create Supabase client
   - Refresh auth session on every request (`supabase.auth.getUser()`)
   - **Auth routing logic**:
     - Protected routes (e.g., `/dashboard/*`): if no session → redirect to `/`
     - Login route (`/`): if valid session → redirect to `/dashboard`
   - Configure `matcher` to exclude: `/_next/static`, `/_next/image`, `/favicon.ico`, `/assets/*`

### Phase 2: Shared Components + Core Page

**Goal**: All visual components built, Login page fully rendered and functional.

> **Note**: Header and Footer MUST be created BEFORE page.tsx composition. They are listed first in this phase.

1. **Header** — `src/components/shared/Header.tsx`:
   - Server Component
   - Positioned absolute/fixed at top, full width, z-index 10
   - Left: SAA 2025 logo (52x48px) — `<Image src="/assets/login/logos/saa-logo.png" alt="SAA 2025" width={52} height={48} />`
   - Right: Language selector button (visual only for MVP):
     - Flag icon (20x15px SVG), "VN" text (Montserrat Bold 16px/24px, white), down chevron (inline SVG)
     - Hover state: `bg-white/10`, cursor pointer
     - `aria-label="Select language"` for accessibility
   - Background: `rgba(11, 15, 18, 0.8)`, padding: `12px 144px` (desktop)
   - Responsive: `py-3 px-6 md:px-16 lg:px-[144px]`

2. **Footer** — `src/components/shared/Footer.tsx`:
   - Server Component
   - Full width, bottom of page
   - Top border: `1px solid #2E3940`
   - Text: "Bản quyền thuộc về Sun* © 2025" — Montserrat Alternates Bold 16px/24px, white, centered
   - Padding: `40px 90px` (desktop)
   - Semantic: `<footer>` element
   - Responsive: `px-6 py-6 md:px-12 md:py-8 lg:px-[90px] lg:py-10`

3. **HeroSection** — `src/components/login/HeroSection.tsx`:
   - Server Component (wraps the Client Component GoogleLoginButton)
   - Relative container, full height (min-h-screen minus header/footer)
   - **Background layers** (absolute positioned, stacking order):
     1. Key visual image (z-1): `<Image src="/assets/login/images/key-visual.png" fill alt="" priority sizes="100vw" className="object-cover" />`
     2. Left-to-right gradient (z-2): `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)`
     3. Bottom-to-top gradient (z-3): `linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)`
   - **Content** (z-4, relative):
     - "ROOT FURTHER" logo: `<Image src="/assets/login/logos/root-further.png" alt="ROOT FURTHER" width={451} height={200} priority />` — responsive max-width
     - Gap: 80px between logo and text block
     - Description text: Montserrat Bold 20px/40px, white, letter-spacing 0.5px, padding-left 16px
       - "Bắt đầu hành trình của bạn cùng SAA 2025."
       - "Đăng nhập để khám phá!"
     - Gap: 24px between text and button
     - `<GoogleLoginButton />` — Client Component (see below)
   - Responsive padding: `px-6 pt-12 md:px-16 md:pt-16 lg:px-[144px] lg:pt-24`

4. **GoogleLoginButton** — `src/components/login/GoogleLoginButton.tsx`:
   - Client Component (`"use client"`)
   - State: `isLoading` (boolean), `error` (string | null)
   - On click:
     1. Set `isLoading = true`, clear error
     2. Create Supabase browser client via `createClient()`
     3. Call `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: \`\${window.location.origin}/auth/callback\` } })`
     4. If error: set error message, set `isLoading = false`
   - Styled per design-style.md B.3:
     - `bg-[#FFEA9E] rounded-lg px-6 py-4 flex items-center gap-2`
     - Text: "LOGIN With Google" — Montserrat Bold 22px/28px, color `#00101A`
     - Google icon: `<Image src="/assets/login/icons/google.svg" alt="" width={24} height={24} />` — right of text
   - States:
     - Default: gold background
     - Hover: `shadow-lg transform -translate-y-px transition-all duration-200`
     - Disabled/Loading: `opacity-60 cursor-not-allowed` + spinner icon
     - Focus: `outline-2 outline-[#FFEA9E] outline-offset-2`
   - Error display: small red text below button (if error)
   - `aria-label="Login with Google"`, `type="button"`
   - **Double-click prevention**: Disabled immediately on click via `isLoading` state

5. **Auth callback route** — `src/app/auth/callback/route.ts`:
   - Handle GET request
   - Extract `code` from `searchParams`
   - If no code: redirect to `/` (no error exposed)
   - If code present:
     - Create server Supabase client
     - Call `supabase.auth.exchangeCodeForSession(code)`
     - On success: redirect to `next` param or `/dashboard`
     - On error: redirect to `/` (log error server-side, no leak to client)
   - Extract `next` param for post-login redirect

6. **Login page** — `src/app/page.tsx`:
   - Server Component
   - Check auth state via `createClient()` + `supabase.auth.getUser()`
   - If authenticated: `redirect('/dashboard')`
   - If not: render `<main>` with Header, HeroSection (full viewport), Footer
   - Layout: `min-h-screen bg-[#00101A] flex flex-col`
   - Semantic: `<main>` wrapping hero, `<header>` and `<footer>` elements

7. **Dashboard placeholder** — `src/app/dashboard/page.tsx`:
   - Server Component
   - Check auth state; if unauthenticated: `redirect('/')`
   - Display: user email, user name (from `user_metadata`), "Logged in" message
   - Include a "Logout" button/link (calls `supabase.auth.signOut()`)
   - Minimal styling — this is a placeholder, not a designed page

### Phase 3: Polish & Responsive Design

1. **Responsive breakpoints** (apply to all components from Phase 2):
   - **Mobile (320-767px)**: Padding reduced to 24px sides, "ROOT FURTHER" logo max-width 280px, description 16px/32px, login button full-width, footer text 14px, language selector icon-only on <480px
   - **Tablet (768-1023px)**: Padding 64px sides, logo max-width 360px, description 18px/36px, button min-width 280px
   - **Desktop (1024px+)**: Full Figma layout (144px padding, 451px logo, 20px/40px text, 305px button)

2. **Hover & interaction states**:
   - Login button: `hover:shadow-[0_4px_12px_rgba(255,234,158,0.4)] hover:-translate-y-px active:translate-y-0 active:shadow-[0_2px_6px_rgba(255,234,158,0.3)] transition-all duration-200`
   - Language selector: `hover:bg-white/10 cursor-pointer transition-colors duration-150`

3. **Loading states**:
   - Login button: disabled + opacity 60% + spinner animation replacing Google icon
   - Error: red text below button, auto-clears after 5 seconds or on retry

4. **Accessibility**:
   - Semantic HTML: `<header>`, `<main>`, `<footer>`, `<button>`, `<nav>` (if header has nav role)
   - `alt` text: SAA logo ("SAA 2025"), ROOT FURTHER logo ("ROOT FURTHER"), Google icon (decorative, `alt=""`), key visual (decorative, `alt=""`)
   - Keyboard: Tab order — language selector → login button. Enter/Space activates.
   - Color contrast: white `#FFFFFF` on dark `#00101A` = ratio ~19:1 ✅ (exceeds 4.5:1). Dark `#00101A` on gold `#FFEA9E` = ratio ~12:1 ✅
   - `aria-label="Login with Google"` on button, `aria-label="Select language"` on language selector
   - Focus ring: `outline-2 outline-offset-2` on interactive elements

5. **Image optimization**:
   - Key visual: `<Image fill priority sizes="100vw" quality={80} />` — Next.js auto-serves WebP
   - ROOT FURTHER logo: `priority` (above fold), explicit `width/height` for layout stability
   - SAA logo: small file, explicit dimensions
   - SVG icons (google, vn-flag): served as-is, small file size

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Header, HeroSection, GoogleLoginButton, Footer composition
- [x] **External dependencies**: Supabase Auth Google OAuth flow
- [x] **User workflows**: Click login → Google OAuth → callback → redirect

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Login button click triggers OAuth, loading state toggle, error display |
| App ↔ External API | Yes | Supabase Auth OAuth initiation, callback code exchange |
| Cross-platform | Yes | Responsive layout at mobile/tablet/desktop breakpoints |

### Test Environment

- **Environment type**: Local (Vitest with jsdom for unit/integration)
- **Test data strategy**: Mock Supabase client for unit tests; local Supabase for integration
- **Isolation approach**: Fresh state per test, mock OAuth provider

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth client (`createClient`) | Mock | OAuth redirect cannot be tested E2E in unit tests. Mock `signInWithOAuth` and `exchangeCodeForSession` return values. |
| Google OAuth provider | Not tested | External service — trust Supabase SDK handles the redirect correctly |
| Next.js `redirect()` | Mock | Server-side redirect throws, must be caught in tests |
| Next.js `<Image>` | Passthrough | Use `@testing-library/react` to verify render; image optimization is Next.js concern |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Login page renders Header, HeroSection, GoogleLoginButton, Footer
   - [x] All images render with correct `alt` attributes
   - [x] Clicking "LOGIN With Google" calls `signInWithOAuth` with correct params
   - [x] Auth callback with valid code exchanges session and redirects to `/dashboard`
   - [x] Authenticated user on `/` is redirected to `/dashboard`

2. **Error Handling**
   - [x] Auth callback with missing `code` param redirects to `/`
   - [x] Auth callback with invalid code redirects to `/` (no error leak)
   - [x] `signInWithOAuth` failure shows error message, button returns to default state
   - [x] Supabase service unavailable shows user-friendly error message

3. **Edge Cases**
   - [x] Button disabled during loading prevents duplicate `signInWithOAuth` calls
   - [x] Error message auto-clears on retry
   - [x] Language selector renders with correct visual elements (flag, VN, chevron)

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core login flow (button → OAuth → callback → redirect) | 90%+ | High |
| Component rendering (Header, Hero, Footer) | 85%+ | High |
| Error/edge cases (invalid code, double-click, service down) | 75%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` created and reviewed
- [x] `design-style.md` created and reviewed
- [x] Supabase Google OAuth configured (confirmed in `supabase/config.toml`)
- [x] Supabase client utilities exist (`src/libs/supabase/`)
- [ ] Google OAuth credentials configured in `.env` (developer setup — see `.env.example`)

### External Dependencies

- Google OAuth API (via Supabase Auth) — requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Supabase Auth service (local Docker via `make up`, or hosted)

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Google OAuth credentials not configured | Medium | High | Validate env vars in middleware — log warning if missing. Document setup in `.env.example`. Login button shows "Configuration required" state if OAuth fails. |
| Key visual image large file size (1441x1022px) | Medium | Medium | Serve via Next.js `<Image>` with `quality={80}`, `sizes="100vw"`, and `priority`. Next.js auto-converts to WebP. Target: <200KB compressed. |
| Montserrat font loading delay (FOUT) | Low | Low | Use `next/font/google` with built-in font optimization. Fonts are self-hosted by Next.js, no external requests. |
| Cloudflare Workers edge compatibility | Low | Medium | `@supabase/ssr` is edge-compatible. Verify middleware runs on edge runtime. Avoid Node.js-only APIs (`fs`, `crypto` from node). |
| Redirect loop (auth check on `/` ↔ `/dashboard`) | Low | High | Middleware logic: only redirect auth users from exact `/` path. Dashboard checks auth separately. Test both directions explicitly. |

### Estimated Complexity

- **Frontend**: Medium (5 components, responsive design, gradient overlays, image optimization)
- **Backend**: Low (1 callback route, 1 middleware, 1 placeholder page)
- **Testing**: Medium (OAuth flow mocking, component rendering, responsive)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (assets → foundation → components → polish)

---

## Notes

- The language selector (A.2_Language) links to a dropdown frame (`721:4942` — "Dropdown-ngon-ngu") but this is **out of scope** for the Login MVP. The selector will be rendered visually but the dropdown functionality will be implemented in a separate feature.
- The page serves as both the landing page (`/`) and the login page — there is no separate `/login` route.
- Email signup is disabled in Supabase config (`enable_signup = false` for email). Google OAuth is the only auth method.
- The "ROOT FURTHER" text is rendered as an image/logo, not as text — preserves the specific typography from Figma design.
- Down chevron icon for language selector returned `null` from media files — use inline SVG fallback: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="white" stroke-width="2" fill="none"/></svg>`
- Google icon in the login button is positioned to the **right** of the text (text first, then icon), per Figma layout order.
- The login button text in Figma has a trailing space ("LOGIN With Google ") — MUST be trimmed in implementation.
- The `/dashboard` placeholder is temporary — it will be replaced by the actual dashboard feature in a future iteration.
