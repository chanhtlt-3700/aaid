# Implementation Plan: Language Dropdown

**Frame**: `hUyaaugye2-Dropdown-ngon-ngu`
**Date**: 2026-04-10
**Spec**: `specs/hUyaaugye2-Dropdown-ngon-ngu/spec.md`

---

## Summary

Add a functional language dropdown to the existing Header language selector button. When the user clicks the button, a styled overlay appears with VN and EN options. Selecting an option closes the dropdown and persists the choice in a cookie. The implementation requires extracting the current static language button from the Server Component `Header.tsx` into a new Client Component `LanguageSelector.tsx`, and creating the dropdown panel as a child of that component. No backend API or database changes are needed — this is a pure client-side UI feature.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, next/image
**Database**: N/A (no data layer)
**Testing**: Vitest + @testing-library/react
**State Management**: React `useState` (local component state) + cookie persistence
**API Style**: N/A (client-side only)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

| Constitution Principle | Plan Compliance | Detail |
|------------------------|-----------------|--------|
| **I. Clean Architecture** | ✅ Compliant | Feature-based folder (`components/shared/`), `@/*` imports, single responsibility per file, TypeScript strict |
| **II. TDD (NON-NEGOTIABLE)** | ✅ Planned | Tests written before/alongside implementation. Vitest for unit/integration. Coverage: 90%+ core flows |
| **III. Security (OWASP)** | ✅ Compliant | No user input, no `dangerouslySetInnerHTML`, no external API calls. Language stored in cookie — standard, non-sensitive data |
| **IV. Responsive & Accessible** | ✅ Planned | `role="listbox"` / `role="option"`, `aria-expanded`, keyboard navigation (Escape, Enter, Arrow keys), WCAG 2.1 AA |
| **V. Tech Stack Best Practices** | ✅ Compliant | RSC default for Header, `"use client"` only for LanguageSelector (interactive), Tailwind utilities, `<Image>` for flags |

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: The Header remains a Server Component. The interactive language selector is extracted into a dedicated Client Component `LanguageSelector.tsx` in `src/components/shared/`. This minimizes the client JS boundary — only the selector and its dropdown are client-side.
- **Styling Strategy**: TailwindCSS v4 utilities for all styling. Dropdown colors use inline values matching design-style.md (`#00070C`, `#998C5F`, `rgba(255,234,158,0.2)`). No new CSS custom properties needed beyond what exists.
- **State Management**: Local `useState` for `isOpen` (boolean) and `currentLanguage` ("VN" | "EN"). Language persists via a `lang` cookie set with `document.cookie`. Initial value read from the cookie on mount (default: "VN").
- **Click Outside Handling**: `useRef` on the dropdown container + `useEffect` mousedown listener on `document`. When click target is outside the ref, close the dropdown.
- **Keyboard Navigation**: `onKeyDown` handler on the trigger and dropdown items. Escape closes. Enter/Space on trigger toggles. Enter/Space on item selects. Arrow up/down moves focus between items.

### Backend Approach

N/A — no backend changes. Language is a client-side preference. When an i18n system is added in the future, this component will integrate via a `value`/`onChange` prop pattern.

### Integration Points

- **Existing Components**: `Header.tsx` (modify — extract language button into `LanguageSelector`), `Footer.tsx` (no change), `GoogleLoginButton.tsx` (no change)
- **Shared Assets**: VN flag SVG already exists at `public/assets/login/icons/vn-flag.svg`. EN flag SVG needs to be downloaded from Figma.
- **API Contracts**: None

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/hUyaaugye2-Dropdown-ngon-ngu/
├── spec.md              # Feature specification
├── plan.md              # This file
├── design-style.md      # Design tokens and styles
└── assets/
    └── frame.png        # Figma frame reference
```

### Source Code (affected areas)

```text
src/
├── components/
│   └── shared/
│       ├── Header.tsx              # MODIFY — Replace inline language button with <LanguageSelector />
│       └── LanguageSelector.tsx    # NEW — Client Component: trigger button + dropdown
public/
├── assets/
│   └── login/
│       └── icons/
│           ├── vn-flag.svg         # EXISTS
│           └── en-flag.svg         # NEW — English/UK flag icon
tests/
├── components/
│   └── shared/
│       ├── Header.test.tsx         # MODIFY — Update for extracted LanguageSelector
│       └── LanguageSelector.test.tsx  # NEW — Dropdown behavior tests
```

### New Files

| File | Purpose |
|------|---------|
| `src/components/shared/LanguageSelector.tsx` | Client Component — trigger button, dropdown panel, language state, cookie persistence |
| `public/assets/login/icons/en-flag.svg` | English/UK flag SVG icon (20x15px) |
| `tests/components/shared/LanguageSelector.test.tsx` | Unit tests for dropdown open/close, selection, keyboard nav, outside click |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/shared/Header.tsx` | Remove inline language button markup. Import and render `<LanguageSelector />` in its place. Header stays as a Server Component. |
| `tests/components/shared/Header.test.tsx` | Update to mock `LanguageSelector` and verify it's rendered. Language-specific tests move to LanguageSelector.test.tsx. |

### Dependencies

None — no new packages needed. All functionality uses React built-ins (`useState`, `useEffect`, `useRef`) and existing project dependencies.

---

## Implementation Approach

### Phase 0: Asset Preparation

- Download EN flag SVG from Figma (node `I525:11713;362:6128;186:1903;186:1709`) using `get_media_file` tool.
- Save to `public/assets/login/icons/en-flag.svg`.
- Verify both flag SVGs render correctly at 20x15px.

### Phase 1: Core Component — LanguageSelector (US1)

**Goal**: Functional dropdown that opens, selects a language, closes, and persists the choice.

1. **Create `LanguageSelector.tsx`** (Client Component):
   - Define language data: `{ code: "VN" | "EN", flag: string, label: string }[]`
   - State: `isOpen` (boolean), `currentLanguage` (string, initialized from cookie or "VN")
   - **Trigger button**: Reuse existing markup from Header (flag + code text + chevron). Add `onClick` to toggle `isOpen`. Add `aria-expanded={isOpen}`.
   - **Dropdown panel**: Rendered conditionally when `isOpen`. Absolute positioned below trigger, right-aligned. Styled per design-style.md (bg `#00070C`, border `1px solid #998C5F`, rounded-lg, p-1.5).
   - **Language options**: Map over language data. Each option is a `<button>` with `role="option"`. Selected option gets gold highlight bg. `onClick` sets `currentLanguage`, writes cookie, closes dropdown.
   - **Click outside**: `useRef` on wrapper, `useEffect` mousedown listener to close when outside.
   - **Escape key**: `onKeyDown` on wrapper to close on Escape.
   - **Chevron rotation**: Rotate chevron SVG 180deg when `isOpen` via `transition-transform` + conditional `rotate-180`.

2. **Modify `Header.tsx`**:
   - Remove the inline `<button>` with language selector markup (lines 14–32).
   - Import and render `<LanguageSelector />` in the same position.
   - Header remains a Server Component since `LanguageSelector` is a self-contained client island.

3. **Cookie persistence**:
   - On language change: `document.cookie = \`lang=\${code}; path=/; max-age=31536000\``
   - On mount: read initial value from `document.cookie` via a parser (or default "VN")
   - Cookie name: `lang`. Value: "VN" or "EN".

### Phase 2: Visual Polish & Accessibility (US2)

1. **Hover states**: Unselected items get `hover:bg-white/10`. Selected items get slightly more opaque gold on hover.
2. **Animation**: Dropdown open/close uses `transition-all duration-150` with opacity + translateY.
3. **Keyboard navigation**:
   - Arrow Down/Up moves focus between dropdown items.
   - Enter/Space on a focused item selects it and closes.
   - Tab past last item closes the dropdown.
   - Focus returns to trigger button when dropdown closes.
4. **ARIA attributes**:
   - Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-label="Select language"`
   - Dropdown: `role="listbox"`
   - Items: `role="option"`, `aria-selected` for current language
5. **Mobile positioning**: Ensure dropdown doesn't overflow right edge. Use `right: 0` on the dropdown relative to the trigger's wrapper.

### Phase 3: Tests

1. **LanguageSelector.test.tsx**:
   - Renders trigger button with current language flag and code
   - Opens dropdown on click, shows VN and EN options
   - Selects language on option click, closes dropdown, updates trigger display
   - Closes on outside click without changing language
   - Closes on Escape key without changing language
   - Highlights currently selected language with gold background
   - Persists language choice to cookie
   - Prevents double-click race conditions

2. **Header.test.tsx** (update):
   - Renders `LanguageSelector` component
   - Other Header tests remain (logo, semantic structure)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: LanguageSelector within Header, trigger ↔ dropdown
- [ ] **External dependencies**: None
- [x] **User workflows**: Click trigger → select language → dropdown closes → trigger updates

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Dropdown toggle, language selection, cookie write |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Mobile viewport dropdown positioning |

### Test Environment

- **Environment type**: Local (Vitest with jsdom)
- **Test data strategy**: Static language config, mock `document.cookie`
- **Isolation approach**: Fresh render per test, cookie mock reset

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| `next/image` | Passthrough (mock as `<img>`) | Image optimization is a Next.js concern |
| `document.cookie` | Mock via `Object.defineProperty` | Cookie API not available in jsdom by default |
| Click outside events | Real (fireEvent on document) | Testing-library supports document-level events |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Dropdown opens on trigger click
   - [x] Selecting EN updates trigger to show EN flag + text
   - [x] Selecting VN when VN already selected closes without change
   - [x] Cookie is written with selected language code

2. **Error Handling**
   - [x] Missing cookie falls back to "VN" default

3. **Edge Cases**
   - [x] Outside click closes dropdown
   - [x] Escape key closes dropdown
   - [x] Clicking already-selected language just closes
   - [x] Rapid open/close doesn't cause state issues

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Dropdown open/close/select flow | 90%+ | High |
| Keyboard navigation | 85%+ | Medium |
| Cookie persistence | 90%+ | High |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` created and reviewed
- [x] `design-style.md` created and reviewed
- [x] Header component exists (`src/components/shared/Header.tsx`)
- [x] VN flag SVG exists (`public/assets/login/icons/vn-flag.svg`)
- [ ] EN flag SVG downloaded (`public/assets/login/icons/en-flag.svg`)

### External Dependencies

None. Pure client-side feature with no external service calls.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| EN flag SVG not available from Figma (`get_media_file` returns null) | Low | Low | Create a simple inline SVG fallback of the UK flag, or use an open-source SVG flag set |
| Header refactoring breaks existing Login page layout | Low | High | Header stays as Server Component; only the language button is replaced with a Client Component island. Existing tests catch regressions. |
| Cookie not readable on server for SSR language detection | Medium | Low | Out of scope for this feature (no i18n system yet). Cookie is client-side only for now. When i18n is added, middleware can read it. |
| Dropdown overflows viewport on very small screens | Low | Medium | Use `right: 0` positioning relative to trigger. Add a max-right guard via JS if needed. |

### Estimated Complexity

- **Frontend**: Low (1 new Client Component, 1 modified Server Component)
- **Backend**: None
- **Testing**: Low-Medium (dropdown interaction testing requires click/keyboard event simulation)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (asset → component → integration → tests)

---

## Notes

- The language dropdown does NOT implement actual i18n/translation. It only provides the UI control and persists the user's choice. A future feature will add the translation system that reads this preference.
- The dropdown is designed as a controlled-ready component: its current language comes from local state + cookie, but it can easily be refactored to accept `value`/`onChange` props when integrated with an i18n provider (e.g., `next-intl`, `react-i18next`).
- The Header remains a Server Component. `LanguageSelector` is a client island rendered inside it — this is the standard Next.js pattern for interactive elements within server-rendered layouts.
- The cookie name `lang` is simple and intentional. If the project later uses `next-intl` or similar, the cookie name can be aligned with that library's convention (e.g., `NEXT_LOCALE`).
- The gold border color `#998C5F` is new to this feature (not used in the Login page). It can be added as a CSS custom property if reused elsewhere, but for now it's used inline since it's specific to the dropdown.
