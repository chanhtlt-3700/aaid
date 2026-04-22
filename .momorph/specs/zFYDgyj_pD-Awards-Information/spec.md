# Feature Specification: Awards Information Page

**Frame ID**: `zFYDgyj_pD`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-22
**Status**: Draft

---

## Overview

Trang chi tiết "Hệ thống giải thưởng SAA 2025" tại route `/awards-information`. Hiển thị thông tin đầy đủ 6 hạng mục giải thưởng (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP) dưới dạng cards với hình ảnh, mô tả, số lượng giải và giá trị thưởng. Có sidebar navigation bên trái để user nhảy nhanh tới từng hạng mục, và Kudos promo block ở cuối.

Trang này là đích của tất cả các AwardCard trên Homepage (deep-link với anchor `#top-talent`, `#top-project`,...).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem chi tiết tất cả hạng mục giải thưởng (Priority: P1)

User click một award card trên Homepage hoặc nút "ABOUT AWARDS" → landing trang Awards Information và thấy đầy đủ thông tin.

**Why this priority**: Trang Homepage hiện đang link đến `/awards-information#<slug>` nhưng trả 404. Ưu tiên P1 để unblock user journey.

**Independent Test**: Navigate trực tiếp `/awards-information` → thấy 6 award cards + sidebar + kudos promo.

**Acceptance Scenarios**:

1. **Given** user đã đăng nhập, **When** user truy cập `/awards-information`, **Then** trang hiển thị: Header (full variant), Keyvisual banner, Title section ("Hệ thống giải thưởng SAA 2025"), Sidebar nav với 6 mục, 6 Award detail cards tương ứng, Kudos promo block, Footer.
2. **Given** user chưa login, **When** user truy cập `/awards-information`, **Then** middleware redirect về `/?redirect=/awards-information`.
3. **Given** user truy cập `/awards-information#mvp`, **When** page load, **Then** browser scroll đến phần MVP và sidebar MVP item active.

---

### User Story 2 - Điều hướng nhanh bằng Sidebar (Priority: P1)

User click vào một item trong sidebar trái → trang scroll mượt tới award tương ứng, item đó active (gold text + underline).

**Why this priority**: Trang dài, sidebar là công cụ navigation chính.

**Acceptance Scenarios**:

1. **Given** user đang trên `/awards-information`, **When** user click "Top Project Leader" trong sidebar, **Then** page scroll mượt đến section đó và item đó highlight active.
2. **Given** user scroll thủ công, **When** section mới vào viewport, **Then** sidebar cập nhật active state tương ứng (scroll spy).

---

### User Story 3 - Xem thông tin giải chi tiết (Priority: P2)

User cần biết: tên giải, mô tả, số lượng giải, giá trị thưởng, đối tượng (cá nhân/tập thể).

**Acceptance Scenarios**:

1. **Given** award card Top Talent, **When** user xem, **Then** hiển thị: image 336×336, title, description, "Số lượng giải thưởng: 10 Cá nhân", "Giá trị giải thưởng: 7.000.000 VNĐ cho mỗi giải thưởng".
2. **Given** award Signature 2025 có giá trị khác nhau theo đối tượng, **When** user xem, **Then** hiển thị "5.000.000 / 8.000.000 VNĐ cho giải cá nhân / tập thể".

---

### User Story 4 - Internationalization (Priority: P2)

Toàn bộ nội dung (title, description, labels) phải switch được VN ↔ EN.

**Acceptance Scenarios**:

1. **Given** user đang ở VN, **When** đổi sang EN qua LanguageSelector, **Then** tất cả text (tên giải, mô tả, labels như "Quantity", "Value") đổi sang EN mà không reload page.

---

### Edge Cases

- User truy cập hash không tồn tại (e.g. `#foo`) → bỏ qua scroll, hiển thị từ đầu trang.
- Mobile (< 768px): sidebar collapse thành accordion hoặc ẩn, các card stack vertically.
- Image load fail: dùng aspect-ratio placeholder, không vỡ layout.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Header (full) | SAA logo + HeaderNav + LanguageSelector + ProfileDropdown | Active state cho "Awards Information" |
| KeyvisualBanner | Hero banner 1200×871px với ROOT FURTHER + Sun* Annual Award 2025 | Tĩnh |
| Title section | Caption "Sun* annual awards 2025" + title "Hệ thống giải thưởng SAA 2025" | Tĩnh |
| SidebarNav | Sticky column trái, 6 menu items + icon, active indicator | Click → scroll; scroll spy |
| AwardDetailCard × 6 | image 336×336 + content (title/desc/qty/value) | Tĩnh |
| KudosSection | Tái sử dụng từ Homepage (`src/components/homepage/KudosSection.tsx`) | CTA → `/sun-kudos` |
| Footer (full) | FooterNav + copyright | — |

Chi tiết visual: xem [design-style.md](./design-style.md).

### Navigation Flow

- **From**: `/dashboard` (click award card hoặc CTA "ABOUT AWARDS")
- **To**: `/sun-kudos` (CTA Kudos), `/dashboard` (nav About SAA 2025)
- **Sidebar**: anchor scroll trong cùng trang

### Visual Requirements

- Responsive breakpoints: mobile (<768), tablet (768-1023), desktop (≥1024)
- Desktop: sidebar sticky trái 240px, content flexible bên phải
- Tablet/Mobile: sidebar ẩn hoặc collapse; awards cards xếp dọc
- Smooth scroll: `scroll-behavior: smooth` trên `<html>` hoặc `behavior: "smooth"` trong JS
- Accessibility: sidebar items là `<a href="#slug">`, focus ring; heading anchors là `<h3 id="slug">`

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Route `/awards-information` MUST được auth-protected (middleware đã có sẵn).
- **FR-002**: Page MUST render 6 award cards theo đúng thứ tự: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025, MVP.
- **FR-003**: Mỗi card MUST có: image, title, description, quantity + quantity_unit, prize_value + prize_note (optional).
- **FR-004**: SidebarNav MUST show active state cho section đang trong viewport (scroll spy, threshold ~30%).
- **FR-005**: Click sidebar item MUST scroll smooth tới section tương ứng và update URL hash.
- **FR-006**: Hash anchor khi page load (vd `#mvp`) MUST scroll tới đúng section.
- **FR-007**: All text MUST support VN/EN via `useLanguage()`.
- **FR-008**: HeaderNav active state cho `/awards-information` MUST highlight "Awards Information" link.

### Technical Requirements

- **TR-001**: Page là Server Component; SidebarNav và scroll-spy là Client Components.
- **TR-002**: Award data tách ra `src/components/awards/awardsDetailData.ts` (static array).
- **TR-003**: Scroll spy dùng `IntersectionObserver` (không dùng scroll event polling).
- **TR-004**: Reuse `KudosSection` từ `src/components/homepage/`.
- **TR-005**: Images có thể dùng lại glow background + title PNG đã có trong `public/assets/homepage/images/` (Top Talent title, etc.).

### Key Entities

- **AwardDetail**: { slug, key (i18n), titleImagePath, thumbnail, description (i18n), quantity, quantityUnitKey, prizeValue, prizeNoteKey? }

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| — | — | MVP: data tĩnh, không gọi API | N/A |

Trong tương lai có thể fetch từ Supabase `award_categories` table (ref source có) — ngoài scope MVP.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Awards Information page load < 2s (desktop 3G throttle).
- **SC-002**: Click award card từ homepage → scroll đến đúng section trong < 1s.
- **SC-003**: 100% text đổi ngôn ngữ VN/EN đúng.

---

## Out of Scope

- Fetch award data từ Supabase (MVP dùng static).
- Admin CRUD awards.
- Award winner reveal (sẽ có ở trang khác sau khi công bố).
- Animation scroll mượt phức tạp (chỉ dùng native smooth).

---

## Dependencies

- [x] Middleware auth guard (`src/middleware.ts`)
- [x] Homepage spec (`i87tDx10uM-Homepage-SAA`) — `AwardCard` link source
- [x] i18n (`src/i18n/translations.ts`) — extend với `awardsPage.*`
- [x] Reuse `KudosSection` từ homepage

---

## Notes

- Reference source `agentic-coding-demo-saa-2025/src/app/awards/page.tsx` có code chi tiết; port thẳng cấu trúc.
- Award titles và descriptions dài (~500-800 chars) — chuyển sang translations theo lang.
- KudosPromoSection của reference = KudosSection của current source (tương đương). Reuse.
