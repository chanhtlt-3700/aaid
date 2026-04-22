# Feature Specification: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-10
**Status**: Draft

---

## Overview

The Homepage SAA is the main landing page of the Sun* Annual Awards 2025 (SAA 2025) web application. It is the first screen authenticated users see after login, replacing the current placeholder dashboard at `/dashboard`. The page is a long-scroll single page composed of seven sections: a fixed Header with full navigation, a Hero/Keyvisual section with countdown timer and CTA buttons, a "Root Further" themed content section, an Awards grid showcasing six award categories, a Sun* Kudos promotion block, a floating Widget button for quick actions, and a Footer with navigation links and copyright. All text content supports Vietnamese and English via the existing i18n system. No backend APIs are required for the static content sections — the awards list and all copy are hardcoded with i18n keys.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Homepage After Login (Priority: P1)

As an authenticated user, I want to see the Homepage with all sections so that I can understand the SAA 2025 event and navigate to awards or kudos information.

**Why this priority**: This is the core purpose of the page — serving as the authenticated landing experience. Without it, users see a bare placeholder dashboard.

**Independent Test**: Log in via Google OAuth, verify redirect lands on the Homepage with all seven sections visible when scrolling.

**Acceptance Scenarios**:

1. **Given** the user is authenticated, **When** they navigate to `/dashboard` (or the post-login route), **Then** the Homepage renders with Header, Hero, Root Further content, Awards section, Sun* Kudos section, Widget button, and Footer — all visible when scrolling.
2. **Given** the user is unauthenticated, **When** they navigate to the Homepage route, **Then** they are redirected to the Login page (`/`).
3. **Given** the user is on the Homepage, **When** they scroll down through the full page, **Then** each section renders in the correct order and the Header remains fixed at the top.

---

### User Story 2 - Countdown Timer (Priority: P1)

As a user, I want to see a live countdown timer to the SAA 2025 event so that I know how much time is left before the ceremony.

**Why this priority**: The countdown is the primary dynamic element of the hero section and a key engagement feature for the event.

**Independent Test**: Load the Homepage, verify the countdown displays Days/Hours/Minutes and updates every 60 seconds.

**Acceptance Scenarios**:

1. **Given** the event date is in the future, **When** the Homepage loads, **Then** the countdown displays the correct number of days, hours, and minutes remaining, and the "Coming soon" subtitle is visible.
2. **Given** the countdown is running, **When** 60 seconds elapse, **Then** the minutes value updates by 1 (or hours/days roll over accordingly) without a page reload.
3. **Given** the event date has passed (countdown reaches 0), **When** the Homepage loads, **Then** the countdown displays "00" for all units and the "Coming soon" subtitle is hidden.
4. **Given** the `NEXT_PUBLIC_EVENT_DATE` environment variable is set to a valid ISO-8601 date, **When** the countdown initializes, **Then** it counts down to that specific date/time.
5. **Given** the `NEXT_PUBLIC_EVENT_DATE` environment variable is missing or invalid, **When** the countdown initializes, **Then** it falls back to a hardcoded default date (2025-12-26T00:00:00+07:00) and logs a warning in development.

---

### User Story 3 - Navigate to Awards Information (Priority: P1)

As a user, I want to click on an award card or the "ABOUT AWARDS" button so that I can see detailed information about a specific award category.

**Why this priority**: Navigation to the Awards Information page is a primary user flow and the main interactive purpose of the awards grid.

**Independent Test**: Click an award card (e.g., "Top Talent"), verify navigation to the Awards Information page with the correct hash anchor.

**Acceptance Scenarios**:

1. **Given** the user is on the Homepage, **When** they click any of the 6 award cards, **Then** the browser navigates to the Awards Information page with a hash anchor identifying the specific award (e.g., `/awards-information#top-talent`).
2. **Given** the user is on the Homepage, **When** they click "ABOUT AWARDS" CTA button in the hero section, **Then** the browser navigates to the Awards Information page.
3. **Given** the user hovers over an award card, **When** the cursor is within the card bounds, **Then** the card displays a hover state (pointer cursor, visual feedback).
4. **Given** the user is on the Homepage, **When** they click the "Chi tiết" link on an award card, **Then** the behavior is identical to clicking the card — navigation to Awards Information with the correct hash anchor.

---

### User Story 4 - Navigate to Sun* Kudos (Priority: P1)

As a user, I want to click the "ABOUT KUDOS" button or the Kudos section "Chi tiết" button so that I can learn about the Sun* Kudos initiative.

**Why this priority**: Navigation to Sun* Kudos is a primary user flow and one of the two main CTAs.

**Independent Test**: Click "ABOUT KUDOS" in the hero section, verify navigation to the Sun* Kudos page.

**Acceptance Scenarios**:

1. **Given** the user is on the Homepage, **When** they click the "ABOUT KUDOS" CTA button in the hero section, **Then** the browser navigates to the Sun* Kudos page.
2. **Given** the user is on the Homepage, **When** they click the "Chi tiết" button in the Sun* Kudos section (D1), **Then** the browser navigates to the Sun* Kudos page.

---

### User Story 5 - Header Navigation (Priority: P1)

As a user, I want to use the Header navigation to move between major sections of the application so that I can access Awards Information, Sun* Kudos, or other pages.

**Why this priority**: The Header is the persistent navigation mechanism across the application and needs to be fully functional on the Homepage.

**Independent Test**: Click each nav link in the Header, verify correct navigation. Verify the active link is highlighted.

**Acceptance Scenarios**:

1. **Given** the user is on the Homepage, **When** they view the Header, **Then** they see the SAA logo, three navigation links ("About SAA 2025", "Awards Information", "Sun* Kudos"), a notification bell icon, the language selector, and a user avatar.
2. **Given** the user is on the Homepage, **When** the "About SAA 2025" nav link is displayed, **Then** it appears in the selected state (gold text #FFEA9E, bottom border, text-shadow glow).
3. **Given** the user is on the Homepage, **When** they click "Awards Information" in the Header, **Then** the browser navigates to the Awards Information page.
4. **Given** the user is on the Homepage, **When** they click "Sun* Kudos" in the Header, **Then** the browser navigates to the Sun* Kudos page.
5. **Given** the user is on the Homepage, **When** they click the SAA logo in the Header, **Then** the page scrolls to the top.
6. **Given** the user is on the Homepage, **When** they click the notification bell, **Then** the notification panel opens.
7. **Given** the user is on the Homepage, **When** they click the user avatar, **Then** the profile dropdown opens (linkedFrameId: `721:5223`, Dropdown-profile).

---

### User Story 6 - Responsive Layout (Priority: P2)

As a user on a mobile or tablet device, I want the Homepage layout to adapt correctly so that I can browse all content comfortably.

**Why this priority**: Responsive design is important for broad accessibility but is secondary to core functional flows.

**Independent Test**: View the Homepage at 375px (mobile), 768px (tablet), and 1440px (desktop) viewports. Verify layout adapts at each breakpoint.

**Acceptance Scenarios**:

1. **Given** the page is viewed on desktop (1024px+), **When** the Awards section renders, **Then** the award cards display in a 3-column grid.
2. **Given** the page is viewed on tablet (768-1023px), **When** the Awards section renders, **Then** the award cards display in a 2-column grid.
3. **Given** the page is viewed on mobile (320-767px), **When** the Awards section renders, **Then** the award cards display in a 2-column grid (smaller cards) or stack vertically depending on available width.
4. **Given** the page is viewed on mobile, **When** the Hero section renders, **Then** the CTA buttons stack vertically, the countdown timer scales proportionally, and no horizontal scrolling occurs.
5. **Given** the page is viewed on mobile, **When** the Header renders, **Then** navigation links may collapse or adapt, and all interactive elements maintain a minimum 44x44px touch target.
6. **Given** the page is viewed on any breakpoint, **When** the Footer renders, **Then** it displays correctly with no horizontal overflow.

---

### User Story 7 - Footer Navigation (Priority: P2)

As a user, I want to use the Footer navigation links to access different sections of the application so that I have an alternative navigation method at the bottom of the page.

**Why this priority**: Footer nav provides redundancy to the Header and is expected but not the primary navigation.

**Independent Test**: Scroll to the Footer, click each nav link, verify correct navigation.

**Acceptance Scenarios**:

1. **Given** the user is on the Homepage, **When** they view the Footer, **Then** they see the SAA logo (69x64px), four navigation links ("About SAA 2025", "Awards Information", "Sun* Kudos", "Tieu chuan chung"), and the copyright text.
2. **Given** the user clicks "Awards Information" in the Footer, **When** the navigation completes, **Then** the user is on the Awards Information page.
3. **Given** the user clicks "Sun* Kudos" in the Footer, **When** the navigation completes, **Then** the user is on the Sun* Kudos page.
4. **Given** the user clicks "About SAA 2025" in the Footer while already on the Homepage, **When** the navigation completes, **Then** the page scrolls to the top.

---

### User Story 8 - Widget Button (Priority: P3)

As a user, I want to see a floating action button so that I can quickly access common actions from anywhere on the page.

**Why this priority**: The widget is a convenience feature. Its internal menu content is likely defined in a separate feature spec.

**Independent Test**: Verify the floating button renders fixed at the bottom-right. Click it and verify the quick action menu opens.

**Acceptance Scenarios**:

1. **Given** the user is on the Homepage, **When** the page loads, **Then** a floating action button (105x64px, gold pill shape) is visible fixed at the bottom-right corner of the viewport.
2. **Given** the user scrolls down the page, **When** the widget button is visible, **Then** it remains fixed in position at the bottom-right.
3. **Given** the user clicks the widget button, **When** the click event fires, **Then** a quick action menu opens.

---

### User Story 9 - Internationalization (Priority: P2)

As a user, I want all Homepage text to appear in my selected language (Vietnamese or English) so that I can understand the content.

**Why this priority**: i18n is necessary for the bilingual audience but secondary to core navigation and layout.

**Independent Test**: Switch language to EN via the language dropdown, verify all Homepage text updates to English.

**Acceptance Scenarios**:

1. **Given** the user has selected "VN" as their language, **When** the Homepage loads, **Then** all text content (hero subtitle, section titles, award names, award descriptions, button labels, footer text) displays in Vietnamese.
2. **Given** the user has selected "EN" as their language, **When** the Homepage loads, **Then** all text content displays in English.
3. **Given** the user changes language while on the Homepage, **When** the language switch completes, **Then** all text on the page updates immediately without a page reload.

---

### Edge Cases

- What happens when the `NEXT_PUBLIC_EVENT_DATE` environment variable is not set? — The countdown MUST fall back to a hardcoded default date (2025-12-26T00:00:00+07:00) and log a console warning in development mode only.
- What happens when the countdown reaches zero while the user is viewing the page? — The countdown MUST stop at 00/00/00, the "Coming soon" subtitle MUST hide, and no negative values are displayed.
- What happens when an award card image fails to load? — A placeholder or fallback image MUST be shown. The card MUST remain clickable and functional.
- What happens when the user navigates to an award but the Awards Information page does not exist yet? — The link MUST still navigate to the configured route. A 404 or "coming soon" placeholder is acceptable until that page is built.
- What happens when the page is loaded on a very slow connection (3G)? — Images MUST be lazy-loaded (except the hero key visual which is priority). The countdown MUST still initialize correctly even if images are pending.
- What happens when JavaScript is disabled? — The page MUST render all static content via Server Components. The countdown will not function (acceptable degradation), but all text, images, and links remain accessible.
- What happens when the user rapidly clicks a CTA button? — Navigation MUST only trigger once. No duplicate route pushes.
- What happens on ultra-wide screens (2560px+)? — Content MUST remain constrained to `max-w-[1224px]` and centered. The background key visual extends full-width.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Section | Description | Interactions |
|-----------|---------|-------------|--------------|
| A1_Header | Header | Fixed navigation bar at top. Semi-transparent dark background rgba(11,15,18,0.8). Contains: SAA logo (left), 3 nav links (center-left), notification bell, language selector, user avatar (right). Max-width 1224px, centered. | Logo click: scroll to top. Nav links: navigate to respective pages. Bell: open notification panel. Language selector: open language dropdown. Avatar: open profile dropdown (linkedFrameId: 721:5223). |
| A1.1_NavLink-Active | Header | Active nav link style: gold text (#FFEA9E), bottom border accent, text-shadow glow effect. Applied to "About SAA 2025" when on Homepage. | Click: scroll to top (already on this page). |
| A1.2_NavLink-Default | Header | Default nav link style: white text, no border. Hover: background highlight with rounded corners. | Click: navigate to target page. Hover: highlight effect + pointer cursor. |
| A1.3_NotificationBell | Header | Bell icon, white. Badge indicator for unread notifications (optional, may be separate feature). | Click: open notification panel. |
| A1.4_UserAvatar | Header | User profile image, circular, sourced from Google OAuth user metadata. | Click: open profile dropdown. |
| 3.5_Hero | Hero/Keyvisual | Full-width hero section. Background key visual image with gradient overlay (left-to-right #00101A fade, bottom-to-top fade). Contains "ROOT FURTHER" title image, countdown timer, event info, and CTA buttons. | Countdown auto-updates every 60s. CTA buttons are clickable. |
| 3.5.1_KeyVisualBG | Hero | Full-width background artwork image (same key-visual.png from Login). Gradient overlays applied on top. | None (decorative). |
| 3.5.2_RootFurtherTitle | Hero | "ROOT FURTHER" large title rendered as an image (PNG). Centered or left-aligned in the hero area. | None (decorative branding). |
| 3.5.3_Countdown | Hero | Three digit groups: Days, Hours, Minutes. Each group: large digit (Digital Numbers font ~49px), unit label below (Montserrat Bold 24px white). Updates every 60 seconds via client-side interval. | Auto-updates. No direct user interaction. |
| 3.5.4_ComingSoon | Hero | "Coming soon" subtitle text below countdown. Montserrat. Hidden when event date has passed. | None (conditional visibility). |
| 3.5.5_EventInfo | Hero | Event details block: Date "26/12/2025", time, venue "Au Co Art Center", livestream note. Labels in white 16px, values in gold (#FFEA9E) 24px. | None (static informational). |
| 3.5.6_CTA-AboutAwards | Hero | "ABOUT AWARDS" button. Solid gold background (#FFEA9E), dark text (#00101A), Montserrat Bold 22px, rounded 8px, padding 16px 24px. | Click: navigate to Awards Information page. Hover: visual swap to outlined style. |
| 3.5.7_CTA-AboutKudos | Hero | "ABOUT KUDOS" button. Gold border (#998C5F), gold tint bg rgba(255,234,158,0.1), white text, Montserrat Bold 22px, rounded 8px, padding 16px 24px. | Click: navigate to Sun* Kudos page. Hover: visual swap to filled style. |
| B4_RootFurther | Root Further Content | Long-form text section explaining the "Root Further" theme. Contains a quote and multiple paragraphs. Static content, no interactions. | None (static). Scroll to read. |
| C_Awards | Awards Section | Section with header ("Sun* annual awards 2025" caption, "He thong giai thuong" large title, description) and a grid of 6 award cards. | Cards are clickable. |
| C.1_AwardsHeader | Awards Section | Section header: small caption text, large gold title, descriptive paragraph. | None (static). |
| C.2_AwardCard | Awards Section | Repeated 6 times. 336px wide. Contains: image thumbnail (336x336px, gold glow box-shadow, screen blend mode), title (Montserrat 400 24px gold #FFEA9E), description (Montserrat 400 16px white, max 2 lines with text-ellipsis), "Chi tiet" link (Montserrat 500 16px white with arrow icon). | Click anywhere on card: navigate to Awards Information with hash anchor. Hover: pointer cursor, visual feedback. |
| C.2.1_TopTalent | Awards Section | Award card: "Top Talent" — image, title, description, detail link. Hash: `#top-talent`. | Click: navigate to `/awards-information#top-talent`. |
| C.2.2_TopProject | Awards Section | Award card: "Top Project" — image, title, description, detail link. Hash: `#top-project`. | Click: navigate to `/awards-information#top-project`. |
| C.2.3_TopProjectLeader | Awards Section | Award card: "Top Project Leader" — image, title, description, detail link. Hash: `#top-project-leader`. | Click: navigate to `/awards-information#top-project-leader`. |
| C.2.4_BestManager | Awards Section | Award card: "Best Manager" — image, title, description, detail link. Hash: `#best-manager`. | Click: navigate to `/awards-information#best-manager`. |
| C.2.5_Signature2025Creator | Awards Section | Award card: "Signature 2025 - Creator" — image, title, description, detail link. Hash: `#signature-2025-creator`. | Click: navigate to `/awards-information#signature-2025-creator`. |
| C.2.6_MVP | Awards Section | Award card: "MVP (Most Valuable Person)" — image, title, description, detail link. Hash: `#mvp`. | Click: navigate to `/awards-information#mvp`. |
| D1_SunKudos | Sun* Kudos Section | Promotion block. Contains: "Phong trao ghi nhan" label (Montserrat Bold 24px white), "Sun* Kudos" title (Montserrat Bold 57px gold #FFEA9E), description text (Montserrat Bold 16px white), "Chi tiet" button (dark bg, gold-ish text), decorative image. | "Chi tiet" button: navigate to Sun* Kudos page. |
| 6_Widget | Widget Button | Floating action button. Fixed position bottom-right. 105x64px, gold pill shape. Contains pencil icon and SAA icon. | Click: open quick action menu. |
| 7_Footer | Footer | Full-width footer with border-top (1px solid #2E3940). Contains: SAA logo (69x64px, left), 4 nav links (Montserrat Bold 16px white, 80px gap), copyright text (Montserrat Alternates Bold 16px white, right). Padding 40px 90px. | Nav links: navigate to respective pages. Logo: non-interactive or navigate to Homepage. |

### Navigation Flow

- **Entry**: Redirect from Login page after successful Google OAuth (currently redirects to `/dashboard`). Direct URL navigation by authenticated user.
- **Internal scrolling**: Long-scroll page. Header remains fixed. All sections accessible via scroll.
- **Exit — Awards Information**: Click "ABOUT AWARDS" CTA, any award card, "Awards Information" header/footer nav link.
- **Exit — Sun* Kudos**: Click "ABOUT KUDOS" CTA, Kudos section "Chi tiet" button, "Sun* Kudos" header/footer nav link.
- **Exit — Notification Panel**: Click notification bell in Header.
- **Exit — Profile Dropdown**: Click user avatar in Header (linkedFrameId: `721:5223`).
- **Exit — Language Dropdown**: Click language selector in Header (linkedFrameId: `hUyaaugye2`).
- **Exit — Widget Menu**: Click floating widget button.
- **Exit — Tieu chuan chung**: Click "Tieu chuan chung" footer nav link.

### Visual Requirements

- **Page background**: #00101A (dark navy), applied to body or page container.
- **Content max-width**: 1224px, centered horizontally.
- **Content horizontal padding**: 144px on desktop (within the 1224px container), scaling down on tablet/mobile.
- **Responsive breakpoints**: Mobile (320-767px), Tablet (768-1023px), Desktop (1024px+). Mobile-first approach per constitution.
- **Typography**:
  - Primary font: Montserrat (weights 400, 500, 700) via `next/font/google`.
  - Secondary font: Montserrat Alternates (Bold) for copyright text.
  - Special font: "Digital Numbers" for countdown digits (~49px). Must be loaded as a custom font or web font.
- **Color palette**:
  - Gold primary: #FFEA9E (titles, active nav, countdown, CTA fill)
  - Gold border: #998C5F (CTA outline, dropdown borders)
  - Gold tint: rgba(255, 234, 158, 0.1) (CTA outlined bg)
  - White: #FFFFFF (body text, nav links default)
  - Dark bg: #00101A (page background)
  - Header bg: rgba(11, 15, 18, 0.8) (semi-transparent)
  - Footer border: #2E3940
  - Dark text on gold: #00101A
- **Animations/Transitions**:
  - CTA button hover: transition between filled and outlined styles (~200ms ease).
  - Nav link hover: background highlight transition (~150ms ease).
  - Countdown digit changes: no animation required (instant update).
  - No page entrance animations unless explicitly designed.
- **Accessibility**: WCAG 2.1 AA compliance.
  - All images MUST have meaningful `alt` attributes (decorative images use `alt=""`).
  - Interactive elements (cards, buttons, links) MUST be keyboard-navigable with visible focus indicators.
  - Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>` where appropriate.
  - Color contrast MUST meet 4.5:1 for normal text, 3:1 for large text (gold #FFEA9E on #00101A passes).
  - Award cards MUST be focusable and activatable via keyboard (Enter/Space).
  - Countdown MUST use `aria-live="polite"` or `role="timer"` for screen reader announcements.
  - Skip-to-content link recommended.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render the Homepage for authenticated users only. Unauthenticated users MUST be redirected to the Login page.
- **FR-002**: System MUST display a fixed Header with SAA logo, 3 navigation links, notification bell, language selector, and user avatar.
- **FR-003**: System MUST highlight the "About SAA 2025" navigation link as active (gold text, bottom border, text-shadow glow) when the user is on the Homepage.
- **FR-004**: System MUST display a Hero section with background key visual, gradient overlays, "ROOT FURTHER" title image, countdown timer, event info, and two CTA buttons.
- **FR-005**: System MUST display a live countdown timer showing Days, Hours, and Minutes remaining until the event date, updating every 60 seconds.
- **FR-006**: System MUST hide the "Coming soon" subtitle when the event date has passed or the countdown reaches zero.
- **FR-007**: System MUST read the event target date from the `NEXT_PUBLIC_EVENT_DATE` environment variable (ISO-8601 format).
- **FR-008**: System MUST display the "Root Further" themed content section with static text (quote and paragraphs).
- **FR-009**: System MUST display 6 award cards in a grid layout (3 columns desktop, 2 columns tablet/mobile), each with image, title, description (max 2 lines with ellipsis), and "Chi tiet" detail link.
- **FR-010**: System MUST navigate to the Awards Information page with the correct hash anchor when any award card is clicked.
- **FR-011**: System MUST display the Sun* Kudos promotional section with title, description, "Chi tiet" button, and decorative image.
- **FR-012**: System MUST navigate to the Sun* Kudos page when the Kudos "Chi tiet" button or "ABOUT KUDOS" CTA is clicked.
- **FR-013**: System MUST display a floating widget button (fixed bottom-right, 105x64px gold pill) that opens a quick action menu on click.
- **FR-014**: System MUST display a Footer with SAA logo, 4 navigation links, and copyright text.
- **FR-015**: System MUST support Vietnamese and English for all text content via the existing i18n system (LanguageProvider + useLanguage hook + translations.ts).
- **FR-016**: System MUST navigate to the Awards Information page when the "ABOUT AWARDS" CTA button is clicked.
- **FR-017**: System MUST scroll to the top of the page when the SAA logo in the Header is clicked while on the Homepage.

### Technical Requirements

- **TR-001**: Page MUST use Next.js App Router. The route MUST be `/dashboard` (replacing the current placeholder) or a dedicated `/home` route — to be decided during planning. Authentication check MUST happen in a Server Component.
- **TR-002**: Static content sections (Hero text, Root Further content, Awards list, Kudos text) MUST NOT require API calls. All content is defined via i18n translation keys.
- **TR-003**: The countdown timer MUST be implemented as a Client Component (`"use client"`) using `setInterval` with a 60-second tick. It MUST clean up the interval on unmount.
- **TR-004**: The `NEXT_PUBLIC_EVENT_DATE` environment variable MUST be an ISO-8601 datetime string (e.g., `2025-12-26T18:00:00+07:00`). Fallback MUST be `2025-12-26T00:00:00+07:00`.
- **TR-005**: Award card images MUST be served from `public/assets/homepage/images/` and loaded via Next.js `<Image>` component with explicit width/height (336x336px) for layout stability.
- **TR-006**: The "Digital Numbers" font for the countdown MUST be loaded as a local font via `next/font/local` or as a web font. It MUST NOT block page rendering (use `font-display: swap`).
- **TR-007**: Hero key visual MUST use `priority` loading (above the fold). All other images MUST use lazy loading (`loading="lazy"` or Next.js default).
- **TR-008**: All new i18n keys MUST be added to `src/i18n/translations.ts` following the existing structure. The `Translations` interface MUST be extended with new sections (homepage.hero, homepage.rootFurther, homepage.awards, homepage.kudos, etc.).
- **TR-009**: The Header component (`src/components/shared/Header.tsx`) MUST be enhanced to support navigation links, notification bell, and user avatar while maintaining backward compatibility with the Login page (which shows only logo + language selector).
- **TR-010**: The Footer component (`src/components/shared/Footer.tsx`) MUST be enhanced to support navigation links and SAA logo while maintaining backward compatibility with the Login page (which shows only copyright text).
- **TR-011**: Award cards MUST use semantic `<article>` elements wrapped in Next.js `<Link>` components for proper navigation and SEO.
- **TR-012**: Page MUST load within 3 seconds on a 3G connection. Images MUST be optimized (WebP where supported via Next.js Image optimization). Total page weight MUST NOT exceed 2MB on initial load.
- **TR-013**: CSS custom properties for new design tokens (countdown font, gold glow box-shadow, etc.) MUST be defined in `globals.css` and consumed via TailwindCSS theme extensions.
- **TR-014**: The floating widget button MUST use `position: fixed` with `z-index` high enough to stay above all page content but below modal overlays.
- **TR-015**: All award data (title, description, image path, hash anchor) MUST be defined as a typed constant array, not inline JSX, to enable maintainability and i18n mapping.
- **TR-016**: Component structure MUST follow feature-based organization per constitution:
  - `src/components/homepage/` — Homepage-specific components (HeroSection, CountdownTimer, AwardsSection, AwardCard, KudosSection, WidgetButton, RootFurtherSection)
  - `src/components/shared/` — Enhanced Header and Footer

### Key Entities *(if feature involves data)*

- **Award**: Static data object. Fields: `id` (string, kebab-case slug), `titleKey` (i18n key), `descriptionKey` (i18n key), `imagePath` (string, path to image in public/assets), `href` (string, route with hash anchor). Six instances, hardcoded.
- **EventConfig**: Derived from environment. Fields: `targetDate` (Date, from `NEXT_PUBLIC_EVENT_DATE`), `venue` (i18n key), `livestreamNote` (i18n key).
- **User (Supabase Auth)**: Existing entity. Used to display avatar in Header. Fields consumed: `user_metadata.avatar_url`, `user_metadata.full_name`.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| N/A | N/A | No API needed — all Homepage content is static/i18n | N/A |
| Supabase Auth `getUser` | Server SDK | Verify authentication on page load (Server Component) | Exists |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 7 page sections render correctly at desktop resolution (1440px) matching the Figma design with pixel-level accuracy.
- **SC-002**: The countdown timer displays correct remaining time and updates every 60 seconds without memory leaks (interval properly cleaned up).
- **SC-003**: All 6 award cards navigate to the correct Awards Information URL with the correct hash anchor.
- **SC-004**: Both CTA buttons ("ABOUT AWARDS", "ABOUT KUDOS") navigate to their respective target pages.
- **SC-005**: Page is fully functional and visually correct at all three breakpoints (mobile 375px, tablet 768px, desktop 1440px).
- **SC-006**: All text content switches correctly between Vietnamese and English when the language is changed.
- **SC-007**: Lighthouse performance score of 80+ and accessibility score of 90+ on the Homepage.
- **SC-008**: Page loads within 3 seconds on simulated 3G connection (Lighthouse throttling).
- **SC-009**: Header navigation correctly highlights "About SAA 2025" as the active link.
- **SC-010**: Footer renders with all 4 navigation links and copyright text matching the Figma design.

---

## Out of Scope

- Awards Information page — separate feature spec. This spec only covers navigation TO that page.
- Sun* Kudos page — separate feature spec. This spec only covers navigation TO that page.
- Notification panel content and functionality — separate feature. This spec only covers the bell icon trigger.
- Profile dropdown (Dropdown-profile, linkedFrameId: `721:5223`) — separate feature spec. This spec only covers the avatar trigger.
- Widget button quick action menu content — separate feature. This spec only covers the button itself.
- "Tieu chuan chung" (General Standards) page — separate feature. Footer link navigates to it but the page is out of scope.
- Real-time data or API-driven content — all Homepage content is static/i18n.
- Page entrance animations or scroll-triggered animations — not specified in the Figma design.
- Search functionality.
- Breadcrumbs or secondary navigation.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Login screen spec exists (`.momorph/specs/GzbNeVGJHz-Login/`)
- [x] Language dropdown spec exists (`.momorph/specs/hUyaaugye2-Dropdown-ngon-ngu/`)
- [x] Header component exists (`src/components/shared/Header.tsx`) — needs enhancement for nav links, bell, avatar
- [x] Footer component exists (`src/components/shared/Footer.tsx`) — needs enhancement for nav links and logo
- [x] i18n system exists (`src/i18n/LanguageContext.tsx`, `src/i18n/translations.ts`) — needs new translation keys
- [x] Supabase Auth configured and working (Login flow functional)
- [x] Key visual image exists (`public/assets/login/images/key-visual.png`) — can be reused for Hero background
- [x] ROOT FURTHER logo exists (`public/assets/login/logos/root-further.png`) — can be reused for Hero title
- [ ] Award card images (6 images, 336x336px each) — need to be exported from Figma and placed in `public/assets/homepage/images/`
- [ ] Sun* Kudos section decorative image — needs to be exported from Figma
- [ ] Widget button icons (pencil icon, SAA icon) — need to be exported from Figma
- [ ] "Digital Numbers" font file — needs to be sourced and added to the project
- [ ] `NEXT_PUBLIC_EVENT_DATE` environment variable — needs to be added to `.env.example` and `.env.development`
- [ ] Awards Information page route (`/awards-information`) — does not exist yet (navigation target)
- [ ] Sun* Kudos page route — does not exist yet (navigation target)

---

## Notes

- The current `/dashboard` page is a placeholder (`DashboardContent.tsx` with welcome message and logout button). The Homepage will replace or extend this. During planning, decide whether to keep the `/dashboard` route and transform it, or create a new `/home` route and update the post-login redirect.
- The existing Header component only renders the SAA logo and language selector. It needs significant enhancement to add navigation links, notification bell, and user avatar. Consider making the Header accept props or use route detection to conditionally render the full navigation (Homepage/authenticated pages) vs. minimal (Login page).
- The existing Footer component only renders copyright text. It needs enhancement to add the logo, navigation links, and updated layout. Similar conditional rendering approach as Header.
- The hero section reuses the same key visual background and "ROOT FURTHER" logo from the Login page. These assets already exist at `public/assets/login/`. Consider moving shared assets to a common directory or referencing the existing paths.
- The countdown uses "Digital Numbers" font which is not a standard Google Font. It may need to be sourced as a .woff2 file and loaded via `next/font/local`. If unavailable, a monospace fallback that mimics a digital clock aesthetic (e.g., "Share Tech Mono" from Google Fonts) should be used.
- Award card descriptions use `max 2 lines with ellipsis` — implement with CSS `line-clamp` (TailwindCSS `line-clamp-2`).
- Award card images have `gold glow box-shadow` and `screen blend mode` — the box-shadow creates a gold ambient glow effect around the image. The `mix-blend-mode: screen` makes the image blend with the dark background for a luminous effect.
- The CTA buttons have a hover swap behavior: the filled button becomes outlined on hover, and the outlined button becomes filled. This is a non-standard hover pattern — implement via CSS hover pseudo-class toggling background and border styles.
- Event info values (date "26/12/2025", venue "Au Co Art Center") should be i18n keys, not hardcoded, even though they appear static — the date format and venue name may differ between VN and EN locales.
- The "Coming soon" subtitle visibility is tied to the countdown state. When `targetDate <= now`, both the subtitle hides and the countdown shows zeroes. This logic should be centralized in the countdown component or a shared hook.
- Footer nav includes "Tieu chuan chung" (General Standards) which is not in the Header nav. This is a fourth link unique to the Footer.
- The Figma design is at 1440x1024px (desktop). Responsive adaptations for mobile/tablet are inferred from constitution guidelines since no separate mobile frames exist. The 3-to-2 column grid change for awards is explicitly specified in the design context.
