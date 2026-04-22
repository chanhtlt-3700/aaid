# Feature Specification: Floating Action Button (FAB) + Kudos Rules Modal

**Frame IDs**:
- `_hphd32jN2` — Floating Action Button (collapsed)
- `Sv7DFwBw1h` — Floating Action Button 2 (expanded)
- `b1Filzi9i6` — Thể lệ UPDATE (Rules modal content)

**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-22
**Status**: Draft

---

## Overview

Thay thế `WidgetButton` stub hiện tại trên Homepage, Awards Information, và Sun* Kudos pages bằng một Floating Action Button tương tác đầy đủ. FAB mở rộng thành 2 lựa chọn:
1. **Viết KUDOS** → mở `WriteKudoModal` (đã có ở Phase 3.5)
2. **Thể lệ** → mở `KudosRulesModal` (feature mới)

Plus nút × (cancel) để thu gọn lại về trạng thái đầu.

**Kudos Rules Modal**: scrollable panel với nội dung thể lệ SAA 2025 Kudos (title, description, danh sách phần thưởng, 6 badges). Có footer 2 buttons: Đóng + Viết KUDOS (chain tới Write Kudo Modal).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mở Write Kudo từ FAB (Priority: P1)

**Acceptance Scenarios**:

1. **Given** user ở `/dashboard` (hoặc trang authenticated khác), **When** user click FAB (chế độ collapsed), **Then** FAB expand thành 2 options + nút Cancel đỏ.
2. **Given** FAB expanded, **When** user click "Viết KUDOS", **Then** FAB collapse, `WriteKudoModal` mở.
3. **Given** FAB expanded, **When** user click nút × (Cancel), **Then** FAB collapse về trạng thái đầu.

---

### User Story 2 - Xem Thể lệ (Priority: P2)

**Acceptance Scenarios**:

1. **Given** FAB expanded, **When** user click "Thể lệ", **Then** FAB collapse, `KudosRulesModal` mở với tiêu đề, mô tả, danh sách phần thưởng, 6 badges.
2. **Given** Rules Modal mở, **When** user click "Đóng" hoặc Escape hoặc backdrop, **Then** modal đóng.
3. **Given** Rules Modal mở, **When** user click "Viết KUDOS" (footer CTA), **Then** Rules Modal đóng, Write Kudo Modal mở.

---

### User Story 3 - I18n (Priority: P2)

Tất cả label FAB + Rules Modal hỗ trợ VN/EN.

---

### Edge Cases

- Click outside FAB expanded (nhưng không phải × button) → FAB collapse.
- Rules Modal content dài → scroll bên trong modal.
- Mobile: FAB vẫn bottom-right; Rules Modal full-screen.

---

## UI/UX Requirements *(from Figma)*

### FAB Collapsed (`_hphd32jN2`)

- Gold pill 106×64px bottom-right fixed
- Icons: pen + "/" + SAA
- `box-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`

### FAB Expanded (`Sv7DFwBw1h`)

3 buttons stacked vertically từ trên xuống:
- "Thể lệ" (gold, 149×64)
- "Viết KUDOS" (gold, 149×64)
- × Cancel (đỏ, tròn 56×56)

### Kudos Rules Modal (`b1Filzi9i6`)

- Modal 720×auto (max-h 90vh), dark bg
- Title + description
- Rewards list
- 6 badge icons (row)
- Footer: [Đóng] [Viết KUDOS]

Chi tiết: [design-style.md](./design-style.md).

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: FAB MUST fixed bottom-right across Homepage, Awards, Kudos pages.
- **FR-002**: Click FAB collapsed MUST toggle expanded state.
- **FR-003**: Click outside expanded FAB MUST collapse (except cancel button which explicitly collapses).
- **FR-004**: Click "Viết KUDOS" trong expanded HOẶC trong Rules Modal MUST open WriteKudoModal.
- **FR-005**: Click "Thể lệ" MUST open KudosRulesModal.
- **FR-006**: Rules Modal MUST scroll khi content vượt height. Escape/backdrop/Đóng MUST close.
- **FR-007**: All text support VN/EN.

### Technical Requirements

- **TR-001**: Replace `WidgetButton` with new `FloatingActionButton` component wherever used.
- **TR-002**: FAB manages expanded + write-modal-open + rules-modal-open state internally.
- **TR-003**: Reuse `WriteKudoModal` component.
- **TR-004**: Rules content (static text) trong i18n keys `kudosRules.*`.

---

## Success Criteria *(mandatory)*

- **SC-001**: FAB expand/collapse animation < 200ms.
- **SC-002**: Modal open/close < 150ms.
- **SC-003**: Tất cả interactions hoạt động bằng mouse + keyboard.

---

## Out of Scope

- Click + drag FAB reposition.
- Nested FAB animations (stagger reveal).
- Rules content images/illustrations (MVP dùng text + icon emoji đơn giản).
- Video/media trong rules modal.

---

## Dependencies

- [x] Phase 3.5 WriteKudoModal
- [x] Homepage WidgetButton (sẽ được replace)
- [x] Awards page + Kudos page (sẽ import FAB mới)

---

## Notes

- Reference source `agentic-coding-demo-saa-2025/src/components/common/FloatingActionButton.tsx` và `HomepageFAB.tsx` cho cấu trúc pattern.
- Badge icons tạm dùng emoji hoặc inline SVG đơn giản, không có file image.
