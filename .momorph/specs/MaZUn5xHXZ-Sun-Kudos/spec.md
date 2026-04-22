# Feature Specification: Sun* Kudos Page

**Frame ID**: `MaZUn5xHXZ`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-22
**Status**: Draft (MVP scope)

---

## Overview

Trang Sun* Kudos (`/sun-kudos`) — live board hiển thị tất cả lời cảm ơn (kudos) mà Sunner gửi cho nhau trong sự kiện SAA 2025. Trang có:
1. Keyvisual banner với title lớn
2. Ô "Write Kudo" (CTA mở modal gửi lời cảm ơn — modal thực hiện ở Phase 3.5)
3. **HIGHLIGHT KUDOS** — TOP kudos nhiều tim nhất
4. **SPOTLIGHT BOARD** — word cloud tên người nhận (ngoài scope MVP)
5. **ALL KUDOS** feed + right sidebar thống kê cá nhân + leaderboards

Trang này là đích của CTA "ABOUT KUDOS" ở Homepage và KudosSection button "Chi tiết", cũng như Awards Information's Kudos promo.

**MVP scope**: trang shell + mock data cho HIGHLIGHT + ALL KUDOS + stats. SPOTLIGHT word cloud, filters, carousel navigation, Copy Link toast, and Supabase integration — ngoài scope và làm ở phase riêng.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Truy cập Kudos page (Priority: P1)

User click "ABOUT KUDOS" button trên Homepage hoặc "Sun* Kudos" link trên header → landing `/sun-kudos`.

**Why this priority**: Unblock navigation từ Homepage. Liên kết hiện tại trả 404.

**Acceptance Scenarios**:

1. **Given** user đã đăng nhập, **When** user truy cập `/sun-kudos`, **Then** hiển thị: Header (full variant, "Sun* Kudos" active), Keyvisual banner, Write Kudo bar, Highlight Kudos section (3 cards mock), All Kudos feed (5 cards mock), Sidebar stats, Footer, WidgetButton.
2. **Given** user chưa login, **When** user truy cập, **Then** middleware redirect `/?redirect=/sun-kudos`.

---

### User Story 2 - Xem Highlight Kudos và All Kudos (Priority: P1)

User xem các kudo có sẵn. Không cần tương tác sâu.

**Acceptance Scenarios**:

1. **Given** có mock kudos, **When** user xem, **Then** mỗi card hiện: avatar + tên người gửi, avatar + tên người nhận, timestamp, nội dung (truncate 3 dòng), danh sách hashtags, số tim, nút Copy Link (stub), button "Xem chi tiết" (stub).
2. **Given** list rỗng, **When** user xem, **Then** hiện text "Hiện tại chưa có Kudos nào." / "No kudos yet.".

---

### User Story 3 - Sidebar stats cá nhân (Priority: P2)

User thấy số kudos đã nhận/gửi, tim, secret boxes của mình.

**Acceptance Scenarios**:

1. **Given** user vào trang, **When** page load, **Then** sidebar hiện stats (tạm thời mock = 0) + button "Mở quà" (disabled vì secret box = 0) + 2 placeholder lists "Chưa có dữ liệu".

---

### User Story 4 - Click Write Kudo CTA (Priority: P2)

User click ô "Hôm nay, bạn muốn gửi lời cảm ơn..." → hiện alert/modal placeholder cho MVP.

**Acceptance Scenarios**:

1. **Given** user đã login, **When** user click write-kudo bar, **Then** hiện toast/alert "Coming soon" (modal thực hiện ở Phase 3.5).

---

### User Story 5 - I18n (Priority: P2)

Toàn bộ text (banner title, section titles, labels, empty states) phải support VN/EN.

---

### Edge Cases

- Mobile (< 768): sidebar stats chuyển xuống dưới feed hoặc ẩn (MVP ẩn).
- Feed dài: MVP scroll tự nhiên, infinite scroll tương lai.
- Clipboard "Copy Link": MVP gọi `navigator.clipboard.writeText` với current URL + kudo id, toast placeholder.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| KudosKeyvisual | Banner với title "Hệ thống ghi nhận lời cảm ơn" + logo SAA 2025 KUDOS | Tĩnh |
| KudosWriteBar | Pill input, placeholder "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?" | Click → mở modal (stub ở MVP) |
| HighlightKudos | 3-5 kudo cards nổi bật (xếp ngang) | Hover nổi bật |
| KudoCard | Sender, recipients, time, content, hashtags, heart count, copy link, detail | Heart toggle, Copy link, navigate |
| AllKudosFeed | Feed vertical các kudo cards | Scroll |
| KudosSidebar | Stats (6 lines) + Open Gift button + 2 leaderboard lists | Stats stubbed |
| Header (full) | "Sun* Kudos" nav item active | |
| Footer (full) + WidgetButton | | |

Visual details: [design-style.md](./design-style.md).

### Navigation Flow

- **From**: `/dashboard` (nav "Sun* Kudos" or homepage CTA), `/awards-information` (kudos promo)
- **To**: (future) `/kudo/[id]` detail, `/profile` (click avatar), WriteKudoModal (Phase 3.5)

### Visual Requirements

- Desktop (≥1024): feed trái + sidebar phải 320px
- Tablet (768-1023): feed full width, sidebar dưới
- Mobile (<768): feed full width, sidebar ẩn
- Kudo card: border-radius 12px, dark bg với gold accent cho hashtag + heart

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Route `/sun-kudos` auth-protected.
- **FR-002**: Render all 7 sections (keyvisual, write bar, highlight, spotlight stub, all kudos, sidebar, footer) theo đúng thứ tự.
- **FR-003**: Heart icon click MUST toggle local state + cập nhật count (not persisted ở MVP).
- **FR-004**: Copy Link click MUST gọi navigator.clipboard và show toast (stub ở MVP).
- **FR-005**: Write Kudo bar click MUST show placeholder interaction (alert or toast).
- **FR-006**: All text support VN/EN.
- **FR-007**: HeaderNav highlight "Sun* Kudos" khi route match.

### Technical Requirements

- **TR-001**: Page Server Component với auth guard. Interactions trong Client Components.
- **TR-002**: Mock data trong `src/components/kudos/mockKudos.ts`.
- **TR-003**: Tái sử dụng WidgetButton + Header + Footer.
- **TR-004**: Copy link fallback: nếu `navigator.clipboard` không khả dụng → fallback `document.execCommand('copy')` hoặc alert.

### Key Entities

- **Kudo**: { id, sender, recipients[], content, hashtags[], created_at, heart_count, is_highlighted, anonymous_name? }
- **KudoUser**: { id, name, avatar_url, department }
- **KudoHashtag**: { id, name }
- **UserStats**: { kudos_received, kudos_sent, hearts_received, hearts_given, secret_boxes, secret_boxes_opened }

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/kudos` | GET | (future) paginated feed | Not exists |
| `/api/kudos/:id/react` | POST | (future) toggle heart | Not exists |
| `/api/users/me/stats` | GET | (future) user stats | Not exists |

MVP dùng mock; API design ở spec tương lai.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Trang render đầy đủ 5+ sections chỉ với client-side state, không lỗi console.
- **SC-002**: Heart toggle phản hồi < 50ms.
- **SC-003**: Switch VN↔EN đổi toàn bộ text feed + sidebar + headers.

---

## Out of Scope (MVP)

- Supabase schema `kudos`, `kudo_recipients`, `hashtags`, `departments`, `kudo_reactions`, `secret_boxes`.
- HIGHLIGHT KUDOS carousel navigation (left/right arrows, pagination).
- SPOTLIGHT BOARD word cloud pan/zoom (B.7).
- Filters: Hashtag dropdown, Phòng ban dropdown (B.1).
- Search Sunner.
- Hover avatar preview (profile mini card).
- Image gallery trong kudo content.
- Edit/Delete kudo (admin).
- Open Secret Box flow + gift reveal.
- Infinite scroll với API.
- WriteKudoModal (Phase 3.5).
- Kudos Rules modal + FAB (Phase 3.6).

---

## Dependencies

- [x] Middleware auth guard
- [x] Homepage spec — link source
- [x] Awards page — link source (kudos promo)
- [ ] Phase 3.5 WriteKudoModal — sẽ link từ write-bar
- [ ] Phase 3.6 FAB rules modal

---

## Notes

- Reference source `agentic-coding-demo-saa-2025/src/app/kudos/page.tsx` dùng Supabase schema đầy đủ + Tiptap editor cho kudo content. MVP hiện tại: tiếp cận UI-only với mock data.
- Toast system hiện chưa có — MVP dùng `alert()` hoặc transient inline message (fade 3s).
- Một số field như `anonymous_name` từ Figma "Ẩn danh" (frame `p9vFVBE_tc`) — MVP: ẩn tên sender nếu `is_anonymous`.
