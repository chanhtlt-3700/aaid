# Tasks: Language Dropdown

**Frame**: `hUyaaugye2-Dropdown-ngon-ngu`
**Plan**: `plan.md`
**Date**: 2026-04-10

---

## Phase 0: Asset Preparation

- [x] **T-001**: Download/create EN flag SVG asset (`public/assets/login/icons/en-flag.svg`) — UK flag, 24x24 viewBox, 20x15 actual flag. Matches VN flag format.

## Phase 1: Core Component (US1 — Switch Language)

- [x] **T-002**: Create `src/components/shared/LanguageSelector.tsx` — Client Component with trigger button, dropdown panel, language state (`useState`), cookie persistence, click-outside handling (`useRef` + `useEffect`), Escape key close, chevron rotation, ARIA attributes (`role="listbox"`, `role="option"`, `aria-expanded`, `aria-selected`).
- [x] **T-003**: Modify `src/components/shared/Header.tsx` — Replace inline language button with `<LanguageSelector />` import. Header remains a Server Component.

## Phase 2: Visual Polish & Accessibility (US2 — View Dropdown)

> Visual polish (hover states, animation, keyboard nav, ARIA) was implemented inline in T-002.

- [x] **T-004**: Hover states — Unselected items: `hover:bg-white/10`. Selected items: `hover:bg-[rgba(255,234,158,0.3)]`.
- [x] **T-005**: Open/close animation — `150ms ease-out` fade-in with translateY.
- [x] **T-006**: Keyboard navigation — ArrowDown/Up moves focus, Enter/Space selects, Escape closes, Tab closes.
- [x] **T-007**: ARIA attributes — `aria-expanded`, `aria-haspopup="listbox"`, `role="listbox"`, `role="option"`, `aria-selected`.
- [x] **T-008**: Mobile positioning — `right: 0` absolute positioning to prevent viewport overflow.

## Phase 3: Tests

- [x] **T-009**: Create `tests/components/shared/LanguageSelector.test.tsx` — 16 tests covering: trigger render, open/close, selection, outside click, Escape key, cookie persistence, cookie read on mount, default fallback, toggle, chevron rotation, ArrowDown open, flag dimensions.
- [x] **T-010**: Update `tests/components/shared/Header.test.tsx` — Simplified to 3 tests: logo, LanguageSelector presence, semantic header element.

## Phase 4: Verification

- [x] **T-011**: All tests pass (33/33).
- [x] **T-012**: ESLint passes with zero errors.
- [x] **T-013**: Next.js build compiles successfully.
