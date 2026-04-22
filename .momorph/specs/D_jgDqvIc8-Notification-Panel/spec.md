# Feature Specification: Notification Panel

**Frame ID**: `D_jgDqvIc8`
**Frame Name**: `Notification`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-22
**Status**: Draft (MVP — Figma frame has no design items; layout inferred from reference pattern)

---

## Overview

Dropdown panel gắn với nút chuông thông báo ở HeaderNav. Khi user click bell → panel hiện danh sách các thông báo gần đây (Kudo mới nhận, heart mới, secret box, cập nhật hệ thống...). MVP scope: UI-only với mock data, không có backend; mark-as-read + dismiss-all hoạt động local state.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem thông báo (Priority: P1)

**Acceptance Scenarios**:

1. **Given** user đang ở `/dashboard`, **When** user click bell icon, **Then** panel dropdown hiện list 3+ thông báo mock (title, message, timestamp, unread dot).
2. **Given** có unread notifications, **When** chưa open panel, **Then** bell hiển thị badge đỏ với số lượng unread.

---

### User Story 2 - Mark as read (Priority: P2)

**Acceptance Scenarios**:

1. **Given** panel mở, **When** user click một notification, **Then** item đó chuyển trạng thái read (unread dot biến mất), badge count giảm.
2. **Given** panel mở, **When** user click "Đánh dấu đã đọc tất cả", **Then** tất cả items → read, badge biến mất.

---

### User Story 3 - Close panel (Priority: P3)

**Acceptance Scenarios**:

1. **Given** panel mở, **When** user click outside hoặc Escape, **Then** panel đóng; focus trở về bell button.

---

### Edge Cases

- No notifications → hiển thị empty state "Chưa có thông báo mới".
- Panel quá dài → internal scroll max-height 480px.

---

## UI/UX Requirements

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Bell trigger | 40×40 circle button với badge khi unread > 0 | Click → toggle panel |
| Panel | Dropdown 380×auto (max-h 480), dark bg border gold muted | Click outside close |
| Header | "Thông báo" + "Đánh dấu đã đọc" link | Click link mark all |
| Notification item | avatar/icon + title + message + time + unread dot | Click → mark read |
| Empty state | Icon + text | — |
| Footer link | "Xem tất cả" (stub to future `/notifications` page) | Click (stub) |

---

## Requirements

### Functional Requirements

- **FR-001**: Bell button render only in HeaderNav (variant `full`).
- **FR-002**: Badge count = unread count; ẩn khi = 0.
- **FR-003**: Click item → mark as read (local state).
- **FR-004**: "Mark all as read" → set unread = 0 for all.
- **FR-005**: Click outside / Escape close panel.
- **FR-006**: All text VN/EN.

### Technical Requirements

- **TR-001**: `NotificationPanel` client component, state: `notifications[]`, `isOpen`.
- **TR-002**: Mock data trong `mockNotifications.ts`.
- **TR-003**: Reuse pattern click-outside + keyboard từ `LanguageSelector`/`ProfileDropdown`.

### Key Entities

- **Notification**: { id, type ("kudo"|"heart"|"gift"|"system"), title, message, timestamp, isRead }

---

## Out of Scope (MVP)

- Real-time via Supabase Realtime / WebSocket.
- Push notifications.
- Deep link navigation khi click notification.
- Filter by type.
- "Xem tất cả" page.

---

## Success Criteria

- **SC-001**: Panel open/close < 100ms.
- **SC-002**: Badge cập nhật ngay khi mark-as-read.

---

## Dependencies

- [x] HeaderNav (bell icon đã có, sẽ replace bằng trigger của NotificationPanel)

---

## Notes

- Frame Figma `D_jgDqvIc8` trống design items — MVP dựa trên pattern chuẩn.
