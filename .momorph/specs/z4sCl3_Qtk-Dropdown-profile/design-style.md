# Design Style: Profile Dropdown

**Frame ID**: `z4sCl3_Qtk`
**Frame Name**: `Dropdown-profile`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/?node-id=721-5223
**Extracted At**: 2026-04-22

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Dropdown border (gold-muted) |
| --color-item-active-bg | #FFEA9E | 10% | Profile/Logout item active + hover |
| --color-text-white | #FFFFFF | 100% | Menu item text |
| --color-glow | #FAE287 | 100% | Text-shadow glow for active item |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-menu-item | Montserrat | 16px | 700 | 24px | 0.15px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --gap-icon-text | 4px | Between icon and label |
| --padding-item | 16px | Inside each menu item |
| --padding-container | 6px | Inside dropdown box |
| --offset-from-trigger | 8px | Below avatar button |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-container | 8px | Dropdown outer corner |
| --radius-item | 4px | Menu item corner |
| --border-container | 1px solid #998C5F | Dropdown outline |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --text-glow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Profile active text-shadow |
| --shadow-dropdown | 0 4px 12px rgba(0,0,0,0.4) | Dropdown elevation (implied) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| position | absolute | Relative to trigger |
| top | 48px (from trigger) | avatar 40px + 8px gap |
| right | 0 | Align right edge with avatar |
| width | auto (hug contents) | ~140px with padding |
| padding | 6px | Internal padding |
| background | #00070C | Dark container |
| border | 1px solid #998C5F | Gold-muted outline |
| border-radius | 8px | Rounded corners |

### Layout Structure (ASCII)

```
┌───────────────────────────┐
│ HeaderNav (md:flex)       │
│                           │
│  [links] 🔔  👤           │
│               │           │
│               ▼           │
│        ┌──────────────┐   │
│        │ Container    │   │  padding: 6px
│        │ border: gold │   │  bg: #00070C
│        │ radius: 8px  │   │
│        │              │   │
│        │ ┌──────────┐ │   │  Profile item
│        │ │ Profile 👤│ │   │  56px tall
│        │ └──────────┘ │   │  bg on hover/active
│        │ ┌──────────┐ │   │  Logout item
│        │ │ Logout  →│ │   │  56px tall
│        │ └──────────┘ │   │
│        └──────────────┘   │
└───────────────────────────┘
```

---

## Component Style Details

### Dropdown Container (A_Dropdown-List)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `666:9601` | - |
| display | flex | `flex flex-col` |
| flex-direction | column | - |
| padding | 6px | `p-1.5` |
| background | #00070C | `bg-[#00070C]` |
| border | 1px solid #998C5F | `border border-[#998C5F]` |
| border-radius | 8px | `rounded-lg` |
| align-items | flex-start | `items-start` |
| z-index | 50 | `z-50` |
| position | absolute | `absolute` |

### Profile Item (A.1_Profile)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7844` | - |
| width | 119px (hug 56×24 text + icon + padding) | `w-full` |
| min-width | 128px | `min-w-[128px]` |
| height | 56px | `h-14` |
| padding | 16px | `px-4 py-4` |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| justify-content | flex-start | `justify-start` |
| gap | 4px | `gap-1` |
| border-radius | 4px | `rounded` |
| background (active) | rgba(255,234,158,0.10) | `bg-[#FFEA9E]/10` |
| background (default) | transparent | - |

**Label "Profile":**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7844;186:1497` | - |
| font-family | Montserrat | `font-montserrat` |
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| color | #FFFFFF | `text-white` |
| text-shadow (active) | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | inline style |

**States:**
| State | Changes |
|-------|---------|
| Default | background: transparent, no text-shadow |
| Hover | background: rgba(255,234,158,0.10), text-shadow glow |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active (currently-on) | background: rgba(255,234,158,0.10), text-shadow glow |

### Logout Item (A.2_Logout)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7868` | - |
| width | 121px (hug) | same as Profile |
| height | 56px | `h-14` |
| padding | 16px | `px-4 py-4` |
| gap | 4px | `gap-1` |
| border-radius | 4px | `rounded` |
| background | transparent | - |

**Label "Logout":** cùng typography với Profile.

**Icon**: chevron-right 24×24 (inline SVG).

**States:** giống Profile nhưng default không có bg/glow; chỉ hover/focus mới có.

---

## Component Hierarchy with Styles

```
HeaderNav (relative)
└── button[avatar] (w:40 h:40 rounded-full, aria-expanded)
    └── ProfileDropdown (absolute top-12 right-0)
        └── menu container (bg:#00070C, border, rounded-lg, p-1.5, flex-col)
            ├── Profile menuitem (h:14, flex, gap-1, p-4, rounded)
            │   ├── span "Profile" (text-white, font-bold, text-base)
            │   └── icon user (24×24)
            └── Logout menuitem (h:14, flex, gap-1, p-4, rounded)
                ├── span "Logout" (text-white, font-bold, text-base)
                └── icon chevron-right (24×24)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

HeaderNav `md:flex` → ẩn trên mobile. Dropdown **không render**. Phiên bản mobile ngoài scope.

#### Tablet/Desktop (≥ 768px)

Dropdown render như thiết kế.

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| icon-user (filled) | 24×24 | #FFFFFF | Profile menuitem trailing |
| icon-chevron-right | 24×24 | #FFFFFF | Logout menuitem trailing |

Icons dùng inline SVG trong component (consistent với `HeaderNav.tsx` hiện tại).

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform (translateY -4px → 0) | 150ms | ease-out | Toggle open |
| Menu item | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | React Component |
|----------------|---------------|----------------|-----------------|
| Dropdown container | `666:9601` | `absolute top-12 right-0 z-50 flex flex-col bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5` | `<div role="menu">` |
| Profile item | `I666:9601;563:7844` | `flex items-center justify-start gap-1 px-4 py-4 min-w-[128px] h-14 rounded hover:bg-[#FFEA9E]/10` | `<button role="menuitem">` |
| Profile label | `I666:9601;563:7844;186:1497` | `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white` | `<span>` |
| Logout item | `I666:9601;563:7868` | same as Profile item | `<button role="menuitem">` |
| Logout label | `I666:9601;563:7868;186:1439` | same typography as Profile | `<span>` |

---

## Notes

- Gold tint `rgba(255,234,158,0.10)` được dùng ở Homepage spec cho active nav bg → đồng nhất theme.
- Text-shadow glow dùng chung với active HeaderNav link (nhất quán visual language).
- Icons bắt buộc inline SVG (không img) theo project convention.
- Dropdown **KHÔNG** set `outline: none` khi focus — giữ focus ring để accessibility.
