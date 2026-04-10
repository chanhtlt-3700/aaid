# Feature Specification: Login

**Frame ID**: `GzbNeVGJHz`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-10
**Status**: Draft

---

## Overview

The Login screen is the application entry point for SAA 2025 (Sun Annual Awards 2025). It presents a full-viewport hero page with a decorative key visual background, "ROOT FURTHER" branding, and a single "LOGIN With Google" call-to-action button. Authentication is handled exclusively via Google OAuth through Supabase Auth. The page also includes a header with the SAA logo and a language selector, plus a copyright footer.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Google Login (Priority: P1)

As a user, I want to log in with my Google account so that I can access the SAA 2025 application.

**Why this priority**: This is the core and only authentication method. Without it, no user can access the application.

**Independent Test**: Navigate to `/`, click "LOGIN With Google", complete Google OAuth, verify redirect to authenticated area.

**Acceptance Scenarios**:

1. **Given** the user is unauthenticated and on the Login page, **When** the user clicks "LOGIN With Google", **Then** the browser redirects to Google's OAuth consent screen via Supabase Auth.
2. **Given** the user completes Google OAuth successfully, **When** Google redirects back to `/auth/callback` with a valid code, **Then** the system exchanges the code for a session and redirects the user to the post-login destination (e.g., dashboard or home).
3. **Given** the user cancels or fails Google OAuth, **When** the callback receives an error or no code, **Then** the user is redirected back to the Login page and no session is created.
4. **Given** the user is already authenticated (valid session), **When** they navigate to `/`, **Then** they are redirected to the authenticated area without seeing the Login page.

---

### User Story 2 - View Login Page (Priority: P2)

As a user, I want to see a visually appealing landing page with clear branding so that I understand what SAA 2025 is and how to proceed.

**Why this priority**: The visual presentation and branding are important for user experience but secondary to functional login.

**Independent Test**: Navigate to `/` while unauthenticated, verify all visual elements render correctly.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/` while unauthenticated, **When** the page loads, **Then** the user sees the Header (SAA logo, language selector), Hero section (key visual background, "ROOT FURTHER" logo, description text, login button), and Footer (copyright).
2. **Given** the page is viewed on a mobile device (320-767px), **When** the page renders, **Then** all content is readable and the layout adapts to the smaller screen without horizontal scrolling.
3. **Given** the page is viewed on a tablet (768-1023px), **When** the page renders, **Then** the layout adapts with appropriate spacing and all elements remain accessible.

---

### User Story 3 - Language Selector (Priority: P3)

As a user, I want to see a language selector in the header so that I can change the display language.

**Why this priority**: The language selector is visible in the design but the dropdown functionality depends on a separate frame (`721:4942` — Dropdown-ngon-ngu). For MVP, the selector is rendered visually without dropdown interaction.

**Independent Test**: Verify the language selector button renders with "VN" text and flag icon.

**Acceptance Scenarios**:

1. **Given** the user is on the Login page, **When** the page loads, **Then** the language selector displays "VN" with the Vietnam flag icon and a down chevron.
2. **Given** the language selector is visible, **When** the user hovers over it, **Then** a highlight effect and pointer cursor appear.

---

### Edge Cases

- What happens when the Supabase service is unavailable? — The login button click MUST show an error message (e.g., "Login service is temporarily unavailable. Please try again later.") and the button MUST return to its default state.
- What happens when the user double-clicks the login button? — The button MUST be disabled immediately after the first click to prevent duplicate OAuth requests. A loading indicator (spinner) MUST appear.
- What happens when the auth callback receives a malformed or expired code? — The user MUST be redirected to `/` with no session created. No error details are exposed to the user.
- What happens when cookies are disabled? — Supabase Auth requires cookies for session management. If cookies are blocked, the OAuth flow will fail silently and the user remains on the Login page.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Figma ID | Description | Interactions |
|-----------|----------|-------------|--------------|
| A_Header | `662:14391` | Top navigation bar with semi-transparent dark background. Contains logo (left) and language selector (right). | None (static). Language selector has hover state. |
| A.1_Logo | `I662:14391;186:2166` | SAA 2025 logo, 52x48px, top-left corner. | None (non-interactive). |
| A.2_Language | `I662:14391;186:1601` | Language selector button showing "VN" with Vietnam flag icon and down chevron. | Click: Opens language dropdown (P3 — out of MVP scope). Hover: Highlight effect + pointer cursor. |
| B_Bia (Hero) | `662:14393` | Full-height hero section with background key visual, gradient overlays, "ROOT FURTHER" logo, description text, and login button. | None (container). |
| B.1_Key Visual | `662:14395` | "ROOT FURTHER" logo image, 451x200px. | None (decorative branding). |
| B.2_content | `662:14753` | Two-line description text: "Bắt đầu hành trình của bạn cùng SAA 2025." and "Đăng nhập để khám phá!" | None (static text). |
| B.3_Login | `662:14425` | "LOGIN With Google" button with Google icon. Gold/yellow background, rounded corners. | Click: Initiates Google OAuth via Supabase. Hover: Slight elevation/shadow. Disabled state: Dimmed, no click response, shows loading spinner. |
| C_Keyvisual | `662:14388` | Full-screen decorative background artwork (abstract colorful wave pattern). | None (decorative). |
| D_Footer | `662:14447` | Bottom bar with copyright text, separated by a top border line. | None (static). |

### Navigation Flow

- **Entry**: Direct URL `/` (application root), or redirect from any protected page when unauthenticated.
- **Exit (success)**: After successful Google OAuth → `/auth/callback` → redirect to authenticated area.
- **Exit (cancel)**: User cancels Google OAuth → returns to Login page.
- **Language dropdown**: Click language selector → opens dropdown overlay (separate frame `721:4942`, out of MVP scope).

### Visual Requirements

- **Responsive breakpoints**: Mobile (320-767px), Tablet (768-1023px), Desktop (1024px+)
- **Animations/Transitions**: Login button hover — subtle shadow/elevation transition (~200ms ease). No page load animations.
- **Accessibility**: WCAG 2.1 AA compliance. Keyboard navigation (Tab to login button, Enter to activate). Screen reader: `aria-label` on login button and language selector. Alt text on all images.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate users exclusively via Google OAuth through Supabase Auth.
- **FR-002**: System MUST redirect unauthenticated users to the Login page when accessing protected routes.
- **FR-003**: System MUST redirect already-authenticated users away from the Login page to the authenticated area.
- **FR-004**: System MUST handle the OAuth callback at `/auth/callback` — exchange authorization code for a session and redirect.
- **FR-005**: System MUST display a loading state on the login button while OAuth is in progress.
- **FR-006**: System MUST prevent multiple simultaneous OAuth requests (disable button after click).
- **FR-007**: System MUST refresh the Supabase auth session via middleware on every request.
- **FR-008**: System MUST display the Login page with all visual elements: header, hero section (key visual, title, description, login button), and footer.

### Technical Requirements

- **TR-001**: Page MUST load within 3 seconds on a 3G connection (optimize images, lazy-load key visual).
- **TR-002**: Authentication MUST use Supabase Auth Google OAuth with PKCE flow via `@supabase/ssr`.
- **TR-003**: Root middleware MUST refresh Supabase auth sessions on all non-static routes.
- **TR-004**: All media assets (logos, icons) MUST be served from `public/assets/` and loaded via Next.js `<Image>` component where applicable.
- **TR-005**: Fonts (Montserrat, Montserrat Alternates) MUST be loaded via `next/font/google` to avoid FOUT.
- **TR-006**: Page MUST render as a Server Component. Only the login button and its interaction logic require a Client Component.
- **TR-007**: CSS custom properties for design tokens MUST be defined in `globals.css` and consumed via TailwindCSS theme extensions.

### Key Entities *(if feature involves data)*

- **User (Supabase Auth)**: Managed entirely by Supabase Auth. Fields: `id`, `email`, `user_metadata` (name, avatar from Google). No custom user table needed for login.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/auth/callback` | GET | Exchange OAuth code for Supabase session, redirect to authenticated area | New |
| Supabase Auth `signInWithOAuth` | Client SDK | Initiate Google OAuth PKCE flow | Exists (Supabase SDK) |
| Supabase Auth `exchangeCodeForSession` | Server SDK | Exchange auth code for session in callback | Exists (Supabase SDK) |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: User can complete Google OAuth login from click to authenticated redirect in under 10 seconds (excluding Google consent screen time).
- **SC-002**: Login page renders all visual elements matching the Figma design at desktop resolution (1440px) with pixel-level accuracy.
- **SC-003**: Login page is fully functional and visually correct at all three breakpoints (mobile, tablet, desktop).
- **SC-004**: Lighthouse accessibility score of 90+ on the Login page.

---

## Out of Scope

- Language dropdown functionality (separate frame `721:4942` — will be implemented as a separate feature).
- User registration — Google OAuth is the only method; no email/password signup.
- Password reset / account recovery — not applicable with OAuth-only auth.
- Post-login destination page (dashboard/home) — separate feature.
- Internationalization (i18n) system — language selector is visual-only for MVP.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`) — does not exist yet
- [x] Supabase Auth configured for Google OAuth (`supabase/config.toml`)
- [x] Supabase client utilities exist (`src/libs/supabase/`)
- [ ] Google OAuth credentials configured in `.env` (developer setup required)

---

## Notes

- The Figma design is at 1440x1024px (desktop). Responsive adaptations for mobile/tablet are inferred from constitution guidelines since no separate mobile frames exist.
- The "ROOT FURTHER" title is rendered as an image (451x200px PNG), not as text — this preserves the custom typography from the Figma design.
- Email signup is explicitly disabled in `supabase/config.toml` (`enable_signup = false`). Google OAuth is the sole auth provider enabled.
- The down chevron icon for the language selector returned `null` from MoMorph media — a simple SVG chevron or TailwindCSS icon will be used as fallback.
- Footer text uses Vietnamese: "Bản quyền thuộc về Sun* © 2025" (Montserrat Alternates font).
- Google icon in the login button is positioned to the **right** of the text (text first, then icon), per Figma layout order.
- The login button text in Figma has a trailing space ("LOGIN With Google ") — this MUST be trimmed in implementation.
