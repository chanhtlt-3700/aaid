# Design Style: Sun* Kudos Page

**Frame ID**: `MaZUn5xHXZ`
**Frame Name**: `Sun* Kudos - Live board`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/?node-id=2940-13431
**Extracted At**: 2026-04-22

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| --color-bg-primary | #00101A | Page bg |
| --color-card-bg | rgba(255,255,255,0.04) | Kudo card bg |
| --color-card-border | #2E3940 | Card border |
| --color-gold | #FFEA9E | Accent text, heart active |
| --color-gold-subtle | rgba(255,234,158,0.10) | Button bg |
| --color-hashtag | #FFEA9E | Hashtag text |
| --color-text | #FFFFFF | Primary text |
| --color-text-muted | rgba(255,255,255,0.6) | Secondary text |
| --color-heart-inactive | rgba(255,255,255,0.4) | Default heart |
| --color-heart-active | #FF6B6B | Liked heart |

### Typography

| Token | Family | Size | Weight | Line | Letter |
|-------|--------|------|--------|------|--------|
| --text-kv-title | Montserrat | 40px | 700 | 48px | 0 |
| --text-section-title | Montserrat | 32px | 700 | 40px | -0.25px |
| --text-section-subtitle | Montserrat | 14px | 500 | 20px | 0.5px |
| --text-kudo-content | Montserrat | 15px | 400 | 22px | 0.15px |
| --text-kudo-meta | Montserrat | 13px | 500 | 18px | 0.15px |
| --text-user-name | Montserrat | 14px | 700 | 20px | 0.15px |
| --text-hashtag | Montserrat | 13px | 700 | 18px | 0.15px |
| --text-stat-label | Montserrat | 13px | 500 | 18px | 0.15px |
| --text-stat-value | Montserrat | 24px | 700 | 32px | 0 |

### Spacing

| Token | Value |
|-------|-------|
| --gap-section | 64px |
| --gap-card | 16px |
| --padding-card | 20px |
| --padding-page-x | 144px (lg) / 48px (md) / 16px (sm) |

### Border / Radius

| Token | Value |
|-------|-------|
| --radius-card | 12px |
| --radius-pill | 9999px |
| --radius-tag | 4px |

---

## Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────┐
│ Header (full variant) — "Sun* Kudos" active      │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  Keyvisual banner                        │    │
│  │  Title: Hệ thống ghi nhận lời cảm ơn     │    │
│  │  Logo: SAA 2025 KUDOS                    │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────── 🖊 write kudo ──────────┐  │
│  │ Hôm nay, bạn muốn gửi lời cảm ơn...       │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  HIGHLIGHT KUDOS (sub: Sun* Annual Awards 2025)  │
│  ┌───────┐ ┌───────┐ ┌───────┐                   │
│  │ Kudo  │ │ Kudo  │ │ Kudo  │ ...              │
│  └───────┘ └───────┘ └───────┘                   │
│                                                  │
│  SPOTLIGHT BOARD (sub: Sun* Annual Awards 2025)  │
│  ┌──────────────────────────────────────────┐    │
│  │  (MVP placeholder — "Coming soon")        │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────┬──────────────────┐         │
│  │ ALL KUDOS feed   │ Sidebar stats    │         │
│  │ ┌──────────────┐ │ ┌──────────────┐ │         │
│  │ │ Kudo card    │ │ │ 25 received  │ │         │
│  │ │ sender/recip │ │ │ 10 sent      │ │         │
│  │ │ content ...  │ │ │ 50 hearts    │ │         │
│  │ │ #hashtag ... │ │ │ 2 boxes      │ │         │
│  │ │ ♥ 10  copy   │ │ │ [Mở quà]     │ │         │
│  │ └──────────────┘ │ └──────────────┘ │         │
│  │  (4 more cards)  │ │ 10 Sunner ... │ │         │
│  └──────────────────┴──────────────────┘         │
│                                                  │
│  Footer (full) + WidgetButton                    │
└──────────────────────────────────────────────────┘
```

---

## Component Style Details

### KudosKeyvisual

- Background: dark key visual image (reuse `/assets/login/images/key-visual.png`)
- Gradient overlay top→bottom from transparent → #00101A
- Title "Hệ thống ghi nhận lời cảm ơn" 40px bold white
- Logo SAA 2025 KUDOS (text for MVP, image later)

### KudosWriteBar

| Property | Value |
|----------|-------|
| shape | pill (rounded-full) |
| height | 56px |
| padding-x | 24px |
| bg | rgba(255,255,255,0.08) |
| border | 1px solid #2E3940 |
| placeholder text | muted white 60% |
| pen icon | 24×24 left |

### KudoCard

- border-radius 12px
- bg rgba(255,255,255,0.04)
- border 1px solid #2E3940
- padding 20px
- gap 12px between sections
- sender row: avatar 40×40 rounded-full + name + dept
- recipients row: same pattern, "→" arrow between sender và recipients
- content: 15px line-height 22px, truncate 3 lines (`line-clamp-3`)
- hashtags: pills gold text, small
- footer row: heart + count, copy link button, "Xem chi tiết" link

### KudosSidebar

- width 320px fixed desktop, full width mobile
- bg rgba(255,255,255,0.04)
- border 1px solid #2E3940
- radius 12px
- padding 20px
- 6 stat rows: label (muted) + value (gold, bold)
- "Mở quà" button — pill, gold bg, disabled if secret_boxes = 0
- 2 leaderboard lists "Chưa có dữ liệu"

### Section Header (HIGHLIGHT / ALL KUDOS)

- Subtitle: 14px uppercase tracking wide muted
- Title: 32px bold gold

---

## Responsive

| Breakpoint | Layout |
|-----------|--------|
| Mobile (<768) | 1 col, sidebar hidden, cards full-width |
| Tablet (768-1023) | 1 col feed, sidebar below at end |
| Desktop (≥1024) | 2 col: feed flex-1 + sidebar 320px |

---

## Icons

- pen (write) 24×24 gold stroke
- heart (filled + outlined) 24×24
- link 20×20
- arrow (→) 16×16 between sender/recipients
- gift (mở quà) 20×20

---

## Implementation Mapping

| Design | Node ID | Tailwind / CSS | Component |
|--------|---------|----------------|-----------|
| Keyvisual | `2940:13437` | `relative w-full h-64 md:h-80 bg-cover bg-center` | `<KudosKeyvisual />` |
| Write bar | `2940:13449` | `flex items-center gap-3 rounded-full bg-white/5 border border-[#2E3940] h-14 px-6` | `<KudosWriteBar />` |
| Highlight section | `2940:13451` | `flex flex-col gap-6` | `<HighlightKudos />` |
| Kudo card | `B.3/C.2` | `rounded-xl bg-white/5 border border-[#2E3940] p-5 flex flex-col gap-3` | `<KudoCard />` |
| All kudos feed | `C` | `flex-1 flex flex-col gap-4` | `<AllKudosFeed />` |
| Sidebar | `D` | `w-80 rounded-xl bg-white/5 border border-[#2E3940] p-5` | `<KudosSidebar />` |

---

## Notes

- MVP không implement carousel navigation, spotlight word cloud, filters dropdowns.
- Avatar mock dùng initials (DiceBear API hoặc SVG inline fallback).
- Timestamp format: `HH:mm - DD/MM/YYYY` theo Figma.
