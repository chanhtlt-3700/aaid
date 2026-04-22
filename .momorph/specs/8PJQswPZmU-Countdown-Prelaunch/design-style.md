# Design Style: Countdown Prelaunch Page

**Frame ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/?node-id=2268-35127
**Extracted At**: 2026-04-22

---

## Design Tokens (kế thừa từ homepage)

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| --color-bg-primary | #00101A | Page bg |
| --color-gold | #FFEA9E | Title highlight |
| --color-text | #FFFFFF | Body text |
| --color-digit-active | #FFEA9E | Seven-segment digit ON |
| --color-digit-ghost | rgba(255,234,158,0.18) | Seven-segment digit OFF |

### Typography

Reuse từ Homepage spec:
- Countdown digits: 49px font-digital (Share Tech Mono fallback)
- Labels DAYS/HOURS/MINUTES: Montserrat 24px bold uppercase, letter-spacing 2px

---

## Layout Specifications

### Layout Structure (ASCII)

```
┌────────────────────────────────────────────────┐
│ Header (minimal)                               │
├────────────────────────────────────────────────┤
│                                                │
│           [Hero background image]              │
│           [dark gradient overlay]              │
│                                                │
│         ROOT FURTHER logo (optional)           │
│                                                │
│         Title: "Coming soon"                   │
│                                                │
│    ┌──────┐  ┌──────┐  ┌──────┐                │
│    │  0 5 │  │  1 2 │  │  4 5 │                │
│    │ DAYS │  │ HOURS│  │ MINS │                │
│    └──────┘  └──────┘  └──────┘                │
│                                                │
│    26/12/2025 · Âu Cơ Art Center               │
│                                                │
├────────────────────────────────────────────────┤
│ Footer (minimal)                               │
└────────────────────────────────────────────────┘
```

### Container

| Property | Value |
|----------|-------|
| min-height | 100vh |
| display | flex col |
| align-items | center |
| justify-content | center |

---

## Component Style Details

### CountdownTimer (reused)

Reuse `src/components/homepage/CountdownTimer.tsx` với prop `onExpired` để redirect.

### Page Title

- font-size: 40px (desktop) / 28px (mobile)
- font-weight: 700
- color: #FFEA9E
- text-transform: uppercase
- tracking: 2px

---

## Responsive

| Breakpoint | Layout |
|-----------|--------|
| Mobile (<768) | countdown 3 units wrap 2 hàng (2 + 1) |
| Tablet+ | countdown 3 units 1 hàng |

---

## Implementation Mapping

| Design | Node ID | Tailwind / CSS | Component |
|--------|---------|----------------|-----------|
| Countdown wrapper | frame 2268:35127 | `flex flex-row gap-6 justify-center` | `<CountdownTimer>` reused |
| Days unit | `2268:35139` | — | `<SevenSegmentDigit>` |
| Hours unit | `2268:35144` | — | `<SevenSegmentDigit>` |
| Minutes unit | `2268:35149` | — | `<SevenSegmentDigit>` |

---

## Notes

- Homepage countdown đã implement đầy đủ; chỉ cần thêm prop `onExpired` và tách logic target date.
- CountdownTimer hiện tại poll mỗi 60s — phù hợp với yêu cầu "cập nhật tự động" từ Figma (không cần seconds-level).
