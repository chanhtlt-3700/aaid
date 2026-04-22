# Feature Specification: Countdown Prelaunch Page

**Frame ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-22
**Status**: Draft

---

## Overview

Trang **Countdown Prelaunch** (`/countdown`) — landing page công khai hiển thị khi SAA 2025 chưa "mở". Hệ thống đóng tới thời điểm `NEXT_PUBLIC_SYSTEM_OPEN_AT` → mọi truy cập (login hay chưa) đều bị redirect về đây. Khi đồng hồ về 00:00:00 → user tự động vào flow bình thường.

Mục tiêu:
1. Hiển thị countdown (Days / Hours / Minutes) tới thời điểm mở hệ thống
2. Explainer ngắn về sự kiện
3. Không auth required — ai cũng xem được
4. Khi timer expired → page tự redirect về `/` để user login

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem countdown khi hệ thống đóng (Priority: P1)

Khi `Date.now() < NEXT_PUBLIC_SYSTEM_OPEN_AT`, middleware redirect mọi request tới `/countdown`.

**Why this priority**: Cần để có phase gate hoạt động theo reference.

**Acceptance Scenarios**:

1. **Given** `NEXT_PUBLIC_SYSTEM_OPEN_AT` được set về thời điểm tương lai, **When** user truy cập bất kỳ route nào (trừ `/auth/callback` và `/countdown`), **Then** middleware redirect tới `/countdown`.
2. **Given** user ở `/countdown`, **When** page load, **Then** hiển thị hero với title "Coming soon", countdown timer (ngày/giờ/phút), event info (date, venue), Header minimal + Footer.
3. **Given** `NEXT_PUBLIC_SYSTEM_OPEN_AT` không set hoặc đã qua, **When** user truy cập bất kỳ route, **Then** KHÔNG redirect tới `/countdown` (phase gate disabled).

---

### User Story 2 - Auto-exit khi timer hết (Priority: P2)

**Acceptance Scenarios**:

1. **Given** user đang ở `/countdown`, **When** countdown về 0, **Then** page tự động navigate về `/` (để user login hoặc landing bình thường).

---

### User Story 3 - Truy cập trực tiếp khi hệ thống mở (Priority: P2)

**Acceptance Scenarios**:

1. **Given** phase gate đã qua, **When** user truy cập `/countdown` trực tiếp, **Then** page vẫn render (không có timer vì đã mở) + hiển thị CTA "Vào SAA 2025" dẫn về `/`.

---

### Edge Cases

- `NEXT_PUBLIC_SYSTEM_OPEN_AT` format lỗi → middleware coi như disabled, không redirect.
- Timer rất gần 0 (< 60s) → vẫn hiển thị bình thường.
- Browser tab ẩn rồi hiện lại → countdown tự refresh đúng.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Header (minimal) | Logo + LanguageSelector | — |
| Hero keyvisual | Background + gradient overlay | — |
| Title | "Coming soon" hoặc "SAA 2025 Opens In" | — |
| CountdownTimer | 3 units: DAYS / HOURS / MINUTES LED-style | Auto update mỗi phút |
| EventInfo | Date + venue (reuse từ homepage) | — |
| Footer (minimal) | Copyright | — |

Visual: xem [design-style.md](./design-style.md) — tận dụng `SevenSegmentDigit` và `CountdownTimer` đã có ở homepage.

### Visual Requirements

- Full-height (`h-screen`)
- Centered content
- Dark background với keyvisual
- Desktop: countdown 3 units trên 1 hàng
- Mobile: countdown có thể wrap 2 hàng

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Route `/countdown` MUST không yêu cầu auth (thêm vào `authFreePaths` của middleware).
- **FR-002**: Middleware MUST check `NEXT_PUBLIC_SYSTEM_OPEN_AT`; nếu set và `Date.now() < parsed time` → redirect to `/countdown`.
- **FR-003**: CountdownTimer MUST dùng `NEXT_PUBLIC_SYSTEM_OPEN_AT` khi hiển thị ở `/countdown`.
- **FR-004**: Khi countdown hết → client component redirect `window.location.href = "/"`.
- **FR-005**: Phase gate MUST bypass `/auth/callback` để OAuth flow không vỡ.

### Technical Requirements

- **TR-001**: Middleware đọc `process.env.NEXT_PUBLIC_SYSTEM_OPEN_AT` tại edge runtime.
- **TR-002**: Reuse `CountdownTimer` component từ `src/components/homepage/` — thêm prop `onExpired?: () => void` và cho phép override target date.
- **TR-003**: Page là async Server Component (không cần auth check).

---

## API Dependencies

Không có (tất cả client-side).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Phase gate redirect đúng khi env var set.
- **SC-002**: Timer đếm chính xác ±1 phút.
- **SC-003**: Trang không gây cache mismatch (middleware vô hiệu hoá cache nếu cần).

---

## Out of Scope

- Phase gate dựa trên Supabase table `event_configs` (reference source dùng) — MVP dùng env var cho đơn giản.
- Admin UI để set thời gian mở.
- Push notification khi sắp mở.
- Flip digit animation phức tạp.

---

## Dependencies

- [x] Middleware (`src/middleware.ts`) — extend
- [x] `CountdownTimer`, `SevenSegmentDigit`, `EventInfo` từ homepage — reuse
- [x] i18n — reuse `homepage.comingSoon`, `homepage.countdown.*`, `homepage.eventInfo.*`

---

## Notes

- Reference source dùng Supabase query `event_configs` bảng để check phase gate — MVP không có bảng → dùng env var `NEXT_PUBLIC_SYSTEM_OPEN_AT`.
- Nếu khi deploy admin cần thay đổi mở hệ thống, chỉ cần cập nhật env var + redeploy.
