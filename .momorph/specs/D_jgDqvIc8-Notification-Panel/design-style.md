# Design Style: Notification Panel

**Frame ID**: `D_jgDqvIc8`
**Extracted At**: 2026-04-22

Layout inferred (no design items available in Figma).

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --color-panel-bg | #00070C | Panel bg |
| --color-panel-border | #998C5F | Panel outline |
| --color-item-hover | rgba(255,255,255,0.05) | Hover bg |
| --color-item-unread | rgba(255,234,158,0.08) | Unread item bg |
| --color-unread-dot | #FFEA9E | Unread indicator |
| --color-badge-bg | #EF4444 | Badge red |

### Typography

| Token | Value |
|-------|-------|
| --text-panel-title | Montserrat 16px bold text-[#FFEA9E] |
| --text-item-title | Montserrat 14px bold text-white |
| --text-item-message | Montserrat 13px 400 text-white/80 line-clamp-2 |
| --text-item-time | Montserrat 12px 500 text-white/50 |
| --text-link | Montserrat 13px 700 text-[#FFEA9E] |

---

## Layout

```
 ┌───── Bell button (40×40) ─────┐
 │  [🔔]  [badge: 3]             │
 └───────────────────────────────┘
       │
       ▼
 ┌─── Panel (380×auto, max-h 480) ──┐
 │ Thông báo        Đánh dấu đã đọc │
 ├──────────────────────────────────┤
 │ ● icon | Title                   │
 │       | Message...               │
 │       | 2 phút trước             │
 ├──────────────────────────────────┤
 │ ● icon | Title                   │
 ├──────────────────────────────────┤
 │ ... scroll ...                   │
 ├──────────────────────────────────┤
 │         Xem tất cả               │
 └──────────────────────────────────┘
```

### Panel

- width 380px (desktop), 320px (mobile)
- max-height 480px + scroll
- bg #00070C, border 1px #998C5F, radius 12
- box-shadow 0 10px 30px rgba(0,0,0,0.5)

### Notification item

- padding 12px 16px, gap 12px
- unread: bg rgba(255,234,158,0.08) + gold dot prefix (h-2 w-2)
- read: bg transparent
- hover: bg rgba(255,255,255,0.05), cursor pointer

### Badge

- Position absolute top-right of bell
- Min-width 18px, height 18px, radius full
- Bg #EF4444, text white 11px bold

---

## Implementation Mapping

| Element | Component |
|---------|-----------|
| Bell trigger + badge | `<NotificationPanel>` trigger |
| Panel root | `<NotificationPanel>` dropdown |
| Item | `<NotificationItem>` (inline) |
| Mock data | `mockNotifications.ts` |

---

## Notes

- Icon mapping per notification type: kudo → ♥, heart → ❤️, gift → 🎁, system → ⚙️ (MVP emoji; future: SVG icon set).
