# Design Style: Awards Information Page

**Frame ID**: `zFYDgyj_pD`
**Frame Name**: `Hệ thống giải`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/?node-id=313-8436
**Extracted At**: 2026-04-22

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-gold | #FFEA9E | 100% | Title, active nav, prize value |
| --color-gold-border | #998C5F | 100% | Card border, sidebar divider |
| --color-gold-glow | #FAE287 | 100% | Text-shadow glow |
| --color-text-white | #FFFFFF | 100% | Body text |
| --color-text-muted | rgba(255,255,255,0.6) | 60% | Caption "Sun* annual awards 2025" |
| --color-sidebar-active-bg | rgba(255,234,158,0.10) | 10% | Active sidebar item bg |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-page-title | Montserrat | 44px | 700 | 56px | -0.25px |
| --text-caption | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-award-title | Montserrat | 32px | 400 | 40px | 0 |
| --text-award-desc | Montserrat | 16px | 400 | 24px | 0.25px |
| --text-sidebar | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-meta-label | Montserrat | 14px | 500 | 20px | 0.15px |
| --text-meta-value | Montserrat | 18px | 700 | 24px | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --gap-card | 80px | Between award cards |
| --gap-content | 48px | Content stack gap |
| --padding-page-x | 144px | Desktop horizontal padding |
| --padding-section-y | 80px | Vertical page sections |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-image | 8px | Award image corner |
| --radius-card | 12px | Card corner |
| --border-divider | 1px solid #2E3940 | Section divider |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-card | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | Award image glow |
| --text-glow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active sidebar glow |

---

## Layout Specifications

### Page Container

| Property | Value | Notes |
|----------|-------|-------|
| max-width | 1440px (contents: 1152px) | Follows Homepage pattern |
| padding-x | 144px (desktop), 48px (tablet), 16px (mobile) | - |
| background | #00101A | Dark primary |

### Layout Structure (ASCII)

```
┌────────────────────────────────────────────────────────────────┐
│ Header (full variant, fixed)                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Keyvisual Banner (1200x871 crop, gradient overlay)    │    │
│  │  ROOT FURTHER / Sun* Annual Award 2025                 │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                │
│  Caption: Sun* annual awards 2025                              │
│  Title: Hệ thống giải thưởng SAA 2025                          │
│                                                                │
│  ┌──────────┬─────────────────────────────────────────────┐    │
│  │ Sidebar  │  Awards Detail Cards (stack)                │    │
│  │ (sticky) │                                             │    │
│  │          │  ┌──────────┬─────────────────────────────┐ │    │
│  │ ○ Top T  │  │ image    │ Top Talent                  │ │    │
│  │ ○ Top P  │  │ 336×336  │ description...              │ │    │
│  │ ● Top PL │  │ +glow    │ Số lượng: 10 Cá nhân        │ │    │
│  │ ○ Best M │  │          │ Giá trị: 7tr VNĐ            │ │    │
│  │ ○ Sig25  │  └──────────┴─────────────────────────────┘ │    │
│  │ ○ MVP    │                                             │    │
│  │          │  ... (5 cards next)                         │    │
│  │          │                                             │    │
│  └──────────┴─────────────────────────────────────────────┘    │
│                                                                │
│  Kudos Promo Section                                           │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│ Footer (full variant)                                          │
└────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### KeyvisualBanner

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8437` | - |
| width | 100% | `w-full` |
| height | 400px (desktop), 300px (mobile) | `h-[400px] md:h-[400px]` |
| background-image | /assets/awards/images/keyvisual.png | `bg-cover bg-center` |
| overlay | linear-gradient từ trong suốt → #00101A | absolute inset overlay |

### Title Section (A_Title)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8453` | - |
| display | flex | `flex flex-col` |
| gap | 8px | `gap-2` |
| align-items | flex-start | `items-start` |

**Caption "Sun* annual awards 2025":**
- font-family: Montserrat, 16px, 700, line-height 24px, letter-spacing 0.15px
- color: rgba(255,255,255,0.6)

**Title "Hệ thống giải thưởng SAA 2025":**
- font-family: Montserrat, 44px, 700, line-height 56px, letter-spacing -0.25px
- color: #FFEA9E

### SidebarNav (C_Menu list)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8459` | - |
| width | 240px (desktop) | `w-60` |
| position | sticky | `sticky top-28` |
| display | flex | `flex flex-col` |
| gap | 4px | `gap-1` |

**Item (C.1 - C.6):**
| Property | Value | CSS |
|----------|-------|-----|
| padding | 12px 16px | `px-4 py-3` |
| border-radius | 4px | `rounded` |
| background (default) | transparent | - |
| background (active) | rgba(255,234,158,0.10) | - |
| color (default) | #FFFFFF | - |
| color (active) | #FFEA9E | - |
| text-decoration (active) | underline | - |
| text-shadow (active) | glow | - |

### AwardDetailCard (D.1 - D.6)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8467` (D.1 Top Talent) | - |
| display | flex | `flex flex-col md:flex-row` |
| gap | 48px | `gap-12` |
| padding | 32px | `p-8` |
| margin-bottom | 80px | `mb-20` |
| border-bottom | 1px solid #2E3940 | last-child no border |

**Image block (D.1.1):**
| Property | Value |
|----------|-------|
| width × height | 336×336 |
| border-radius | 8px |
| box-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| mix-blend-mode | screen (glow effect) |

**Content block (D.1.2):**
- Title: 32px Montserrat 400, color gold `#FFEA9E`
- Description: 16px Montserrat 400, color white, line-height 24px, letter-spacing 0.25px
- Meta grid: 2 rows (quantity, value) each with label + value
  - Label: 14px Montserrat 500, color rgba(255,255,255,0.6)
  - Value: 18px Montserrat 700, color #FFEA9E

### Implementation Mapping

| Design Element | Node ID | Tailwind / CSS | React Component |
|----------------|---------|----------------|-----------------|
| Page root | — | `min-h-screen bg-bg-primary` | `<AwardsInformationPage>` server |
| KeyvisualBanner | `313:8437` | `relative w-full h-[400px] bg-cover` | `<KeyvisualBanner />` |
| Title section | `313:8453` | `flex flex-col gap-2 mt-20` | `<AwardsPageTitle />` |
| SidebarNav | `313:8459` | `sticky top-28 w-60 flex flex-col gap-1 hidden lg:flex` | `<SidebarNav />` client |
| Sidebar item | `313:8460`… | `px-4 py-3 rounded text-base font-bold` | `<SidebarNavItem />` |
| AwardDetailCard | `313:8467`… | `flex flex-col md:flex-row gap-12 py-12 border-b` | `<AwardDetailCard />` |

---

## Responsive Specifications

| Breakpoint | Sidebar | Card layout | Padding |
|------------|---------|-------------|---------|
| Mobile (<768) | hidden | column stack, image on top | 16px |
| Tablet (768–1023) | hidden | row but image smaller | 48px |
| Desktop (≥1024) | visible, sticky 240px | row, image left 336×336 | 144px |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| dot-indicator | 8×8 | #FFEA9E | Sidebar item active prefix |

---

## Notes

- Keyvisual image phải cung cấp ở `public/assets/awards/images/keyvisual.png` (placeholder cho MVP).
- Các award title images đã có sẵn ở `public/assets/homepage/images/award-*-title.png` — reuse.
- `scroll-margin-top` cần đặt 100px trên heading để anchor scroll không chồng lên Header fixed.
