# Feature Specification: Write Kudo Modal

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viết Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-22
**Status**: Draft (MVP — plain textarea, no Tiptap)

---

## Overview

Modal cho phép user viết một kudo gửi đến đồng đội. Mở bằng cách click **KudosWriteBar** trên `/sun-kudos` (hoặc FAB từ Homepage ở Phase 3.6 sau này). Modal có:
- Recipient picker (autocomplete, required, ≥1)
- Textarea với toolbar format (Bold/Italic/Strike/Number/Link/Quote) — **MVP: toolbar buttons stub (disabled)**
- Hashtag picker (chip multi-select, required, 1-5)
- Image upload (optional, max 5)
- Anonymous toggle + optional pseudonym
- Hủy / Gửi buttons

**MVP deliberately skips**:
- Tiptap rich text editor (bundle size concern) — dùng plain textarea
- Real API submission (hiện tại console.log + close modal)
- Image upload tới server (chỉ preview local)
- @mention autocomplete trong textarea
- Field-level error messages chi tiết

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gửi một Kudo cơ bản (Priority: P1)

User mở modal từ `/sun-kudos`, chọn 1 recipient, điền nội dung, chọn 1 hashtag, nhấn Gửi.

**Acceptance Scenarios**:

1. **Given** user ở `/sun-kudos`, **When** user click KudosWriteBar, **Then** modal mở overlay với form trống.
2. **Given** modal mở, **When** user chọn recipient "Trần Văn Khang" từ autocomplete, **Then** chip recipient hiển thị, input xoá.
3. **Given** đã chọn recipient + content + hashtag, **When** user click Gửi, **Then** form submit (MVP: alert "Kudo submitted!"), modal đóng, form reset.
4. **Given** user chưa điền đủ required fields, **When** user click Gửi, **Then** button Gửi disabled, không submit.

---

### User Story 2 - Chỉnh sửa nội dung (Priority: P2)

User muốn format nội dung hoặc thêm ảnh/ẩn danh.

**Acceptance Scenarios**:

1. **Given** modal mở, **When** user click toolbar button (Bold, etc.), **Then** MVP: không có hiệu ứng (stub). Không crash.
2. **Given** modal mở, **When** user click "+ Hashtag" và chọn từ dropdown, **Then** chip được thêm. Max 5; đạt 5 → button "+ Hashtag" disable.
3. **Given** modal mở, **When** user click "+ Image" và chọn file, **Then** thumbnail hiện bên cạnh. Max 5.
4. **Given** modal mở, **When** user toggle "Gửi ẩn danh", **Then** input "Tên ẩn danh" hiện. Bỏ toggle → input ẩn.

---

### User Story 3 - Hủy (Priority: P2)

**Acceptance Scenarios**:

1. **Given** modal mở với nội dung đã điền, **When** user click Hủy hoặc nhấn Escape hoặc click backdrop, **Then** modal đóng, không submit.

---

### Edge Cases

- User paste > 500 chars → hiển thị counter (optional), cho phép hoặc cắt (MVP: cho phép tất cả, chỉ hiển thị counter).
- Image > 5MB hoặc không phải ảnh → alert lỗi, không thêm.
- Mobile: modal full-screen; desktop: center với max-width 640px.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Backdrop | Overlay đen mờ full-viewport | Click → close |
| Modal container | Card trung tâm, 720×auto (max-h 90vh) với scroll | — |
| Title | "Gửi lời cám ơn và ghi nhận đến đồng đội" | — |
| RecipientPicker | Autocomplete input + chips, required | Type → filter, select → chip |
| ContentTextarea | Plain textarea + toolbar (stub) + counter + hint "@+tên…" | Type, toolbar disabled |
| HashtagPicker | + Hashtag button + chips, max 5 | Click → dropdown, chip remove × |
| ImageUploader | + Image button + thumbnails, max 5 | File picker, × remove |
| AnonymousToggle | Switch + optional name input | Toggle, input conditional |
| Footer | Hủy button + Gửi button (gold) | Cancel close / Submit + validation |

Chi tiết: [design-style.md](./design-style.md).

### Visual Requirements

- Desktop: modal 640px wide, centered, radius 12px, dark bg #00070C
- Mobile: modal full-width, border-radius top only
- Backdrop: rgba(0,0,0,0.6)
- Animation: fade-in 150ms

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Modal trigger từ KudosWriteBar; modal state managed ở parent page.
- **FR-002**: Required validation: ≥1 recipient, content.trim().length > 0, ≥1 hashtag.
- **FR-003**: Gửi button disabled khi required chưa đủ.
- **FR-004**: Escape + backdrop click đóng modal không submit.
- **FR-005**: Focus trap trong modal khi mở; restore focus trigger khi đóng.
- **FR-006**: All text support VN/EN.
- **FR-007**: MVP submit handler: console.log payload + alert + close + reset.

### Technical Requirements

- **TR-001**: Client component, Modal render qua React state (không dùng Radix portal — giữ bundle gọn).
- **TR-002**: Recipient autocomplete dùng mock user list từ `mockKudos.ts`.
- **TR-003**: Hashtag options hardcoded trong file riêng.
- **TR-004**: Images lưu dưới dạng `File[]` + preview URL `URL.createObjectURL()`; cleanup với `URL.revokeObjectURL()` khi remove/close.
- **TR-005**: Toolbar: render buttons với `disabled` hoặc không handler — KHÔNG dùng Tiptap.

### Key Entities

- **WriteKudoFormValues**: { recipients: KudoUser[], content: string, hashtags: string[], images: File[], isAnonymous: boolean, anonymousName?: string }

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/kudos` | POST | (future) create kudo | Not exists |
| `/api/uploads` | POST | (future) upload images | Not exists |

MVP: no network calls.

---

## Success Criteria *(mandatory)*

- **SC-001**: Open/close modal < 100ms perceived.
- **SC-002**: Submit flow từ click đến form reset < 500ms (MVP no API).

---

## Out of Scope (MVP)

- Tiptap rich text editor (sẽ add deps ở feature riêng sau).
- @mention dropdown.
- Server-side validation + API calls.
- Image upload tới Supabase Storage.
- Field-level inline errors.
- Edit existing kudo (chỉ tạo mới).
- Localization cho hashtag options.
- A11y: focus trap nâng cao (MVP đủ: autofocus + Escape + basic).

---

## Dependencies

- [x] Phase 3.3 Sun* Kudos page — host modal
- [x] `mockKudos.ts` — user list để autocomplete
- [ ] Phase 3.6 FAB — có thể reuse modal từ Homepage

---

## Notes

- Reference source `agentic-coding-demo-saa-2025/src/components/kudos/WriteKudoModal.tsx` dùng Tiptap đầy đủ — port sẽ tốn dep. MVP hiện tại: plain textarea + toolbar stub.
- Submit handler có log format giống payload API để dễ hook API sau.
