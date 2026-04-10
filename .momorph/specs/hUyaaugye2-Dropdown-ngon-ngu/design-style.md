# Design Style: Language Dropdown

**Frame ID**: `hUyaaugye2`
**Frame Name**: `Dropdown-ngôn ngữ`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-10

---

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-dropdown-bg` | `#00070C` | Dropdown container background |
| `--color-dropdown-border` | `#998C5F` | Dropdown border (gold accent) |
| `--color-dropdown-selected` | `rgba(255, 234, 158, 0.2)` | Selected item highlight (gold 20%) |
| `--color-dropdown-hover` | `rgba(255, 255, 255, 0.1)` | Item hover state |
| `--color-text-white` | `#FFFFFF` | Language code text |

### Typography

| Element | Font Family | Weight | Size | Line Height | Letter Spacing | Color |
|---------|-------------|--------|------|-------------|----------------|-------|
| Language code ("VN", "EN") | Montserrat | 700 (Bold) | 16px | 24px | 0.15px | `#FFFFFF` |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Dropdown container padding | 6px | Inner padding around items |
| Item internal padding | 16px | Padding inside each language option |
| Icon-to-text gap | 4px | Between flag icon and language code |

### Border & Radius

| Element | Value |
|---------|-------|
| Dropdown container | `border: 1px solid #998C5F`, `border-radius: 8px` |
| Selected item | `border-radius: 2px` |
| Item button | `border-radius: 4px` |

---

## Layout Specifications

### Dropdown Container (`525:11713`)

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| position | absolute | Positioned below trigger button |
| z-index | 50 | Above page content |

### Layout Structure (ASCII)

```
Header Trigger Button (existing)
        │
        ▼ (dropdown appears below, right-aligned)
┌─────────────────────────────────┐ ← Container: 122x124px
│  padding: 6px                   │    bg: #00070C
│  border: 1px solid #998C5F      │    border-radius: 8px
│                                 │
│  ┌───────────────────────────┐  │
│  │  A.1 VN (selected)       │  │ ← 108x56px
│  │  bg: rgba(255,234,158,0.2)│  │    border-radius: 2px
│  │  ┌────────────────────┐  │  │
│  │  │ padding: 16px      │  │  │ ← Inner button: 108x56px
│  │  │ [🇻🇳 flag] [VN]    │  │  │    border-radius: 4px
│  │  │  gap: 4px           │  │  │    gap: 2px (outer)
│  │  └────────────────────┘  │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │  A.2 EN (unselected)     │  │ ← 110x56px
│  │  bg: transparent          │  │    border-radius: 0px
│  │  ┌────────────────────┐  │  │
│  │  │ padding: 16px      │  │  │ ← Inner button: 110x56px
│  │  │ [🇬🇧 flag] [EN]    │  │  │    border-radius: 4px
│  │  │  gap: 4px           │  │  │
│  │  └────────────────────┘  │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

---

## Component Style Details

### A_Dropdown-List — Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `525:11713` | — |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background: var(--color-dropdown-bg)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-dropdown-border)` |
| border-radius | 8px | `border-radius: 8px` |

---

### A.1_tiếng Việt — Selected Language Item

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6085` | — |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| background | rgba(255, 234, 158, 0.2) | `background: rgba(255, 234, 158, 0.2)` |
| border-radius | 2px | `border-radius: 2px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |

**Inner Button:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6085;186:1821` | — |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| border-radius | 4px | `border-radius: 4px` |
| gap | 2px | `gap: 2px` |
| cursor | pointer | `cursor: pointer` |

**Children:**
- Flag icon container: 24x24px, contains VN flag SVG 20x15px
- Text "VN": Montserrat Bold 16px/24px, white, letter-spacing 0.15px

**States:**
| State | Changes |
|-------|---------|
| Default (selected) | background: `rgba(255, 234, 158, 0.2)` |
| Hover | background: `rgba(255, 234, 158, 0.3)` (slightly more opaque) |

---

### A.2_tiếng Anh — Unselected Language Item

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6128` | — |
| width | 110px | `width: 110px` |
| height | 56px | `height: 56px` |
| background | transparent | `background: transparent` |
| border-radius | 0px | `border-radius: 0px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

**Inner Button:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6128;186:1903` | — |
| width | 110px | `width: 110px` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| border-radius | 4px | `border-radius: 4px` |
| cursor | pointer | `cursor: pointer` |

**Children:**
- Flag icon container: 24x24px, contains EN/UK flag SVG 20x15px
- Text "EN": Montserrat Bold 16px/24px, white, letter-spacing 0.15px

**States:**
| State | Changes |
|-------|---------|
| Default (unselected) | background: transparent |
| Hover | background: `rgba(255, 255, 255, 0.1)` |
| Active | background: `rgba(255, 234, 158, 0.2)` (matches selected state when clicked) |

---

## Component Hierarchy with Styles

```
Dropdown Container (bg: #00070C, border: 1px solid #998C5F, radius: 8px, p: 6px)
├── LanguageItem[selected=true] (108x56, bg: rgba(255,234,158,0.2), radius: 2px)
│   └── Button (p: 16px, flex, items-center, justify-between, radius: 4px)
│       ├── Content (flex, items-center, gap: 4px)
│       │   ├── FlagIcon (24x24 container, 20x15 flag SVG — VN)
│       │   └── Text "VN" (Montserrat 700, 16px/24px, white, tracking: 0.15px)
│       └── (no chevron in dropdown items)
│
└── LanguageItem[selected=false] (110x56, bg: transparent)
    └── Button (p: 16px, flex, items-center, justify-between, radius: 4px)
        ├── Content (flex, items-center, gap: 4px)
        │   ├── FlagIcon (24x24 container, 20x15 flag SVG — EN/UK)
        │   └── Text "EN" (Montserrat 700, 16px/24px, white, tracking: 0.15px)
        └── (no chevron in dropdown items)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | -- |

### Responsive Changes

The dropdown is a small overlay component, so responsive adjustments are minimal:

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Dropdown container | Ensure right edge does not overflow viewport. Add `right: 0` positioning relative to trigger. Min padding from viewport edge: 8px. |

#### Tablet and Desktop (>= 768px)

| Component | Changes |
|-----------|---------|
| Dropdown container | Positioned below trigger, right-aligned. No changes needed. |

---

## Icon Specifications

| Icon Name | Size (container) | Size (actual) | Format | Source |
|-----------|-----------------|---------------|--------|--------|
| VN Flag | 24x24px | 20x15px | SVG | `public/assets/login/icons/vn-flag.svg` (existing) |
| EN Flag | 24x24px | 20x15px | SVG | `public/assets/login/icons/en-flag.svg` (needs download — Figma node `I525:11713;362:6128;186:1903;186:1709`) |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown container | opacity, transform | 150ms | ease-out | Open (0→1 opacity, translateY(-4px)→0) |
| Dropdown container | opacity, transform | 100ms | ease-in | Close (1→0 opacity, 0→translateY(-4px)) |
| Language item | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | React Component |
|----------------|---------------|----------------|-----------------|
| Dropdown container | `525:11713` | `flex flex-col p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg` | `<LanguageDropdown />` (Client Component) |
| Selected item (VN) | `I525:11713;362:6085` | `flex items-center px-4 py-4 rounded-sm bg-[rgba(255,234,158,0.2)]` | `<LanguageOption selected />` |
| Unselected item (EN) | `I525:11713;362:6128` | `flex items-center px-4 py-4 rounded hover:bg-white/10` | `<LanguageOption />` |
| Flag icon | various | `w-6 h-6 flex items-center justify-center` | `<Image>` inside option |
| Language text | various | `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white` | `<span>` inside option |

---

## Notes

- All colors should use CSS variables where they overlap with existing design tokens (e.g., the gold accent is related to `--color-btn-login-bg`).
- The selected state gold (`rgba(255, 234, 158, 0.2)`) is the login button gold at 20% opacity — this is intentional brand consistency.
- The dropdown border gold (`#998C5F`) is a darker gold used specifically for borders/details.
- Flag icons must be SVGs for crisp rendering at small sizes. The VN flag already exists; the EN flag needs to be added.
- The component should be built as a controlled component, accepting `value` and `onChange` props, so it can integrate with any future i18n system.
