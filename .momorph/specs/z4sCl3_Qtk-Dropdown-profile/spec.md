# Feature Specification: Profile Dropdown

**Frame ID**: `z4sCl3_Qtk`
**Frame Name**: `Dropdown-profile`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-22
**Status**: Draft

---

## Overview

Menu thả xuống ngắn gọn gắn vào nút avatar trên Header (variant `full`) sau khi user đăng nhập. Cho phép user nhanh chóng điều hướng tới trang **Profile** hoặc thực hiện **Logout** mà không rời khỏi trang hiện tại. Dropdown đóng khi click ra ngoài hoặc chọn một item.

Dropdown là component phụ trợ cho Homepage (`i87tDx10uM-Homepage-SAA`) và dự kiến xuất hiện trên tất cả trang authenticated (Awards Information, Sun* Kudos,…).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mở dropdown và Logout (Priority: P1)

Sau khi đăng nhập, user cần một lối thoát nhanh. Click avatar ở Header mở dropdown; click **Logout** thực hiện `supabase.auth.signOut()` và đưa user về `/`.

**Why this priority**: Thiếu logout đúng chuẩn là vấn đề bảo mật/UX nghiêm trọng. Là đường thoát bắt buộc của mọi trang authenticated.

**Independent Test**: Mount HeaderNav với user đã login, click avatar, click "Logout" → verify Supabase signOut được gọi và router redirect về `/`.

**Acceptance Scenarios**:

1. **Given** user đã đăng nhập, **When** user click avatar button ở Header, **Then** dropdown hiển thị ngay bên dưới avatar với 2 item "Profile" và "Logout".
2. **Given** dropdown đang mở, **When** user click "Logout", **Then** `supabase.auth.signOut()` được gọi, dropdown đóng, user được redirect về `/`.
3. **Given** dropdown đang mở, **When** user click vùng ngoài dropdown hoặc nhấn `Escape`, **Then** dropdown đóng, không có tác dụng phụ.

---

### User Story 2 - Điều hướng tới Profile (Priority: P2)

User muốn xem/chỉnh sửa thông tin cá nhân.

**Why this priority**: Trang Profile chưa có, nên link cần navigate đến route dự kiến (`/profile`). Ngay ở MVP có thể stub điểm đến (404 tạm thời) — scope trang Profile ngoài spec này.

**Independent Test**: Click item "Profile" → verify router.push("/profile") hoặc `<Link href="/profile">`.

**Acceptance Scenarios**:

1. **Given** dropdown đang mở, **When** user click "Profile", **Then** browser navigate tới `/profile` và dropdown đóng.

---

### User Story 3 - Tương tác bàn phím & accessibility (Priority: P3)

User dùng bàn phím phải mở/đóng/chọn được dropdown.

**Why this priority**: Nâng cao nhưng không block MVP.

**Acceptance Scenarios**:

1. **Given** avatar button đang focus, **When** user nhấn `Enter` hoặc `Space`, **Then** dropdown mở.
2. **Given** dropdown đang mở, **When** user nhấn `ArrowDown`/`ArrowUp`, **Then** focus di chuyển giữa Profile và Logout.
3. **Given** dropdown đang mở, **When** user nhấn `Escape`, **Then** dropdown đóng và focus quay về avatar.

---

### Edge Cases

- User click liên tục avatar → dropdown toggle đúng (không tạo nhiều instance).
- Trên mobile (< 768px) HeaderNav ẩn, dropdown không xuất hiện — ngoài scope này.
- Khi signOut fail (network lỗi) → hiển thị error banner (tái sử dụng cơ chế `?error=` của Login page) và không redirect.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Trigger (avatar button) | Nút tròn 40×40 hiện ở HeaderNav | Click → toggle dropdown |
| Dropdown container | Box 215×304 (chính nội dung 128×120), border gold, bg #00070C | Click outside → close |
| Profile item | 119×56px, icon user + text "Profile", active state có bg gold 10% + text-shadow glow | Click → navigate `/profile` |
| Logout item | 121×56px, icon chevron-right + text "Logout" | Click → `supabase.auth.signOut()` + redirect `/` |

Chi tiết visual: xem [design-style.md](./design-style.md).

### Navigation Flow

- **Trigger**: avatar button trong `HeaderNav` (`src/components/shared/HeaderNav.tsx`)
- **From**: `/dashboard` (và các trang authenticated tương lai)
- **To**: `/profile` (Profile item) hoặc `/` (sau khi logout)

### Visual Requirements

- Responsive: dropdown chỉ hiện trên `md:` trở lên (theo HeaderNav hiện tại)
- Transition: opacity + translateY 150ms ease-out khi mở/đóng
- Accessibility: WCAG AA, keyboard navigation, `aria-expanded`, `aria-haspopup="menu"`, `role="menu"`, `role="menuitem"`

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render Profile Dropdown gắn liền với avatar button ở Header variant `full`.
- **FR-002**: System MUST toggle dropdown khi click avatar.
- **FR-003**: Users MUST click "Profile" → navigate `/profile` và dropdown đóng.
- **FR-004**: Users MUST click "Logout" → `supabase.auth.signOut()` và redirect về `/`.
- **FR-005**: System MUST đóng dropdown khi click ra ngoài hoặc `Escape`.
- **FR-006**: System MUST hỗ trợ i18n (VN/EN) cho text "Profile" và "Logout".
- **FR-007**: System MUST focus avatar button sau khi Escape đóng dropdown.

### Technical Requirements

- **TR-001**: Client Component (`"use client"`) — cần state + event handlers.
- **TR-002**: Dùng `createClient()` từ `src/libs/supabase/client.ts` cho signOut.
- **TR-003**: Dùng `useRouter` từ `next/navigation` để redirect sau logout.
- **TR-004**: Reuse pattern click-outside của `LanguageSelector.tsx` (useRef + mousedown listener).

### Key Entities

- **User session**: Supabase Auth (`sb-*-auth-token` cookie); signOut clear session.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase `auth.signOut()` | SDK | Clear session cookies, invalidate refresh token | Exists |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% user đã login có thể logout thành công (bỏ qua network error).
- **SC-002**: Dropdown mở/đóng trong < 100ms (perceived).
- **SC-003**: Navigation từ Profile → `/profile` xảy ra < 500ms.

---

## Out of Scope

- Trang `/profile` (user profile page) — spec riêng trong tương lai.
- Admin variant của ProfileDropdown (reference source có `Dropdown-profile Admin` = `54rekaCHG1`).
- Avatar image với URL của user — hiện tại dùng SVG generic.
- Animation phức tạp (spring, stagger).

---

## Dependencies

- [x] Constitution (`.momorph/constitution.md`)
- [x] Homepage SAA spec (`.momorph/specs/i87tDx10uM-Homepage-SAA/`) — nơi dropdown xuất hiện
- [x] Login spec (`.momorph/specs/GzbNeVGJHz-Login/`) — pair với signOut flow
- [x] Supabase client (`src/libs/supabase/client.ts`)
- [x] Middleware (`src/middleware.ts`) — redirect user chưa login về `/`

---

## Notes

- Reference source (`agentic-coding-demo-saa-2025/src/components/common/ProfileDropdown.tsx`) có version phức tạp hơn (admin variant, user avatar URL). Bản này giữ tối thiểu theo đúng Figma.
- Trang `/profile` chưa tồn tại; link "Profile" sẽ dẫn đến 404 tạm thời — cần flag cho team.
- Item "Profile" hiển thị trạng thái active (bg gold 10% + text-shadow) mặc định theo Figma — sẽ áp dụng khi hover/focus, không phải default.
