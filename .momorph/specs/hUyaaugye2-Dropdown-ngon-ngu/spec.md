# Feature Specification: Language Dropdown

**Frame ID**: `hUyaaugye2`
**Frame Name**: `Dropdown-ngôn ngữ`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-10
**Status**: Draft

---

## Overview

The Language Dropdown is a small overlay menu that lets users switch the application display language between Vietnamese (VN) and English (EN). It appears when the user clicks the language selector button in the Header component. The dropdown displays two options — each showing a country flag icon and language code — with the currently selected language highlighted. This feature is referenced from the Login screen spec (`GzbNeVGJHz-Login`) where the language selector was rendered as visual-only for MVP.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Switch Language (Priority: P1)

As a user, I want to select a different display language from the dropdown so that the application UI is shown in my preferred language.

**Why this priority**: This is the core purpose of the dropdown — without it, the language selector button is non-functional.

**Independent Test**: Click the language selector in the Header, select "EN", verify the dropdown closes and the selector now shows "EN" with the English flag.

**Acceptance Scenarios**:

1. **Given** the user is on any page with the Header visible and the dropdown is closed, **When** the user clicks the language selector button, **Then** the dropdown opens showing VN and EN options with the current language highlighted.
2. **Given** the dropdown is open and "VN" is the current language, **When** the user clicks "EN", **Then** the dropdown closes, the language selector button updates to show the English flag + "EN", and the application display language switches to English.
3. **Given** the dropdown is open, **When** the user clicks the already-selected language (e.g., "VN" when VN is active), **Then** the dropdown closes with no change.
4. **Given** the dropdown is open, **When** the user clicks outside the dropdown area, **Then** the dropdown closes without changing the language.

---

### User Story 2 - View Dropdown (Priority: P2)

As a user, I want to see the dropdown rendered correctly with flag icons, language codes, and a selected-state highlight so that I can easily identify and choose my language.

**Why this priority**: Visual correctness and hover feedback are important for usability but secondary to functional language switching.

**Independent Test**: Open the dropdown at desktop and mobile breakpoints, verify all visual elements render correctly (flags, text, borders, highlight).

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user views it, **Then** each language option displays a flag icon (20x15px), language code ("VN" or "EN"), and the selected option has a gold-tinted highlight background.
2. **Given** the dropdown is open, **When** the user hovers over an unselected option, **Then** a background highlight appears as a hover state.
3. **Given** the page is viewed on a mobile device (< 480px), **When** the dropdown opens, **Then** it positions correctly relative to the header without overflowing the viewport.

---

### Edge Cases

- What happens when the user presses Escape while the dropdown is open? — The dropdown MUST close without changing the language.
- What happens when the user presses Tab while the dropdown is open? — Focus MUST move between dropdown items. Tabbing past the last item MUST close the dropdown.
- What happens when the language preference is persisted but the page reloads? — The selected language MUST persist across page navigations (stored in cookie or localStorage).
- What happens if a language change fails (e.g., translation file not loaded)? — The UI SHOULD remain in the previous language and no error is shown. The selector reverts to the previous value.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Figma ID | Description | Interactions |
|-----------|----------|-------------|--------------|
| A_Dropdown-List | `525:11713` | Dropdown container. Dark background (#00070C), gold border (#998C5F), 8px radius, 6px padding. Flex column layout holding language items. | Opens on click of language selector button in Header. Closes on item select or outside click. |
| A.1_tiếng Việt | `I525:11713;362:6085` | Vietnamese language option. 108x56px. Selected state: gold-tinted background rgba(255,234,158,0.2). Contains VN flag icon + "VN" text. | Click: selects Vietnamese, closes dropdown. Hover: highlight. |
| A.2_tiếng Anh | `I525:11713;362:6128` | English language option. 110x56px. Unselected state: transparent background. Contains English flag icon + "EN" text. | Click: selects English, closes dropdown. Hover: highlight. |

### Navigation Flow

- **Entry**: Click language selector button in Header (any page).
- **Exit (select)**: Click a language option → dropdown closes, language updates.
- **Exit (dismiss)**: Click outside dropdown or press Escape → dropdown closes, no change.

### Visual Requirements

- **Positioning**: Dropdown appears directly below the language selector button in the Header, right-aligned.
- **Animations/Transitions**: Fade-in/fade-out on open/close (~150ms ease-out). No page-level animations.
- **Accessibility**: WCAG 2.1 AA compliance. Keyboard navigable (Arrow keys, Enter/Space to select, Escape to close). `role="listbox"` with `role="option"` on items. `aria-expanded` on trigger button. Focus trap within dropdown when open.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST open the language dropdown when the user clicks the language selector button in the Header.
- **FR-002**: System MUST close the dropdown and update the display language when the user selects a language option.
- **FR-003**: System MUST close the dropdown without changing language when the user clicks outside or presses Escape.
- **FR-004**: System MUST visually highlight the currently selected language with a distinct background color.
- **FR-005**: System MUST persist the selected language preference across page navigations.
- **FR-006**: System MUST update the language selector button (flag icon + code text) to reflect the currently selected language.

### Technical Requirements

- **TR-001**: Dropdown MUST be a Client Component (`"use client"`) since it manages open/close state and click handlers.
- **TR-002**: Language preference MUST be stored in a cookie (for SSR access) or localStorage.
- **TR-003**: Dropdown positioning MUST use absolute/fixed positioning relative to the trigger button. It MUST NOT overflow the viewport on mobile.
- **TR-004**: Dropdown MUST close when the component unmounts or the route changes.
- **TR-005**: Flag icons MUST reuse the existing SVG assets from `public/assets/login/icons/` (vn-flag.svg). English flag SVG needs to be added.

### Key Entities *(if feature involves data)*

- **Language**: Code ("VN" | "EN"), flag icon path, display name. Two static options — no database required.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| N/A | N/A | No API needed — language is a client-side preference | N/A |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: User can switch between VN and EN within 2 clicks (click selector → click language).
- **SC-002**: Dropdown renders correctly at all three breakpoints (mobile, tablet, desktop) without viewport overflow.
- **SC-003**: Selected language persists after page reload.
- **SC-004**: Keyboard navigation works end-to-end (Tab to selector, Enter to open, Arrow keys to navigate, Enter to select, Escape to close).

---

## Out of Scope

- Actual internationalization (i18n) translation system — this feature provides the UI selector, not the translation infrastructure.
- More than 2 languages — only VN and EN as shown in the Figma design.
- Server-side language negotiation (Accept-Language header) — may be added later.
- Language-specific URL routing (e.g., `/en/login`, `/vn/login`).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Login screen spec exists (`.momorph/specs/GzbNeVGJHz-Login/`)
- [x] Header component exists (`src/components/shared/Header.tsx`) — language selector button already rendered
- [ ] English flag SVG asset (`public/assets/login/icons/en-flag.svg`) — needs to be downloaded
- [ ] i18n system (out of scope for this feature, but required for actual translation)

---

## Notes

- The Figma frame (`721:4942`) shows the dropdown in its open state with VN selected. The closed state is already implemented in the Header component as a button showing the current language flag + code + chevron.
- The dropdown container background uses `#00070C` (very dark blue), distinct from the page background `#00101A`.
- The gold border `#998C5F` matches the SAA brand's gold accent palette.
- The selected item uses `rgba(255, 234, 158, 0.2)` — the same gold as the login button but at 20% opacity.
- The English flag in Figma is labeled "GB-NIR - Northern Ireland" — this should be treated as the English/UK flag for the EN option.
- The chevron in the Header's language selector should rotate 180deg when the dropdown is open (not shown in Figma but standard UX pattern).
- No down-chevron icon is present in the dropdown items themselves — they appear only on the trigger button.
