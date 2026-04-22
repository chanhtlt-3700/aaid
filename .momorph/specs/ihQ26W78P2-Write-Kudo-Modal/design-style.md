# Design Style: Write Kudo Modal

**Frame ID**: `ihQ26W78P2`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C/?node-id=520-11602
**Extracted At**: 2026-04-22

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| --color-modal-bg | #00070C | Modal container |
| --color-modal-border | #998C5F | Modal outer border (gold muted) |
| --color-backdrop | rgba(0,0,0,0.6) | Overlay |
| --color-gold | #FFEA9E | Submit button, active hashtag |
| --color-gold-soft | rgba(255,234,158,0.10) | Hover/active bg |
| --color-field-bg | rgba(255,255,255,0.05) | Input bg |
| --color-field-border | #2E3940 | Input border |
| --color-field-border-focus | #FFEA9E | Input focus border |
| --color-field-border-error | #EF4444 | Error |
| --color-text | #FFFFFF | Primary text |
| --color-text-muted | rgba(255,255,255,0.6) | Placeholder, hint |

### Typography

| Token | Family | Size | Weight | Line | Letter |
|-------|--------|------|--------|------|--------|
| --text-modal-title | Montserrat | 20px | 700 | 28px | 0 |
| --text-label | Montserrat | 14px | 700 | 20px | 0.15px |
| --text-input | Montserrat | 15px | 400 | 22px | 0.15px |
| --text-button | Montserrat | 14px | 700 | 20px | 0.15px |
| --text-hint | Montserrat | 12px | 500 | 16px | 0.25px |
| --text-chip | Montserrat | 13px | 700 | 16px | 0.15px |

### Spacing

| Token | Value |
|-------|-------|
| --gap-field | 16px |
| --padding-field | 14px 16px |
| --padding-modal | 24px |

### Radius

| Token | Value |
|-------|-------|
| --radius-modal | 12px |
| --radius-input | 8px |
| --radius-chip | 9999px |

---

## Layout Structure (ASCII)

```
[ Backdrop — rgba(0,0,0,0.6) ]

  ┌─ Modal (640×auto, max-h 90vh, scroll-y) ─┐
  │                                          │
  │  Gửi lời cám ơn và ghi nhận...   [×]     │
  │                                          │
  │  * Người nhận                            │
  │  [ Tìm kiếm ▾                     ]      │
  │  [chip] [chip]                           │
  │                                          │
  │  Toolbar: B I S 1. 🔗 "                  │
  │  ┌────────────────────────────────┐      │
  │  │ Hãy gửi gắm lời cảm ơn...      │      │
  │  │                                │      │
  │  └────────────────────────────────┘      │
  │  "@ + tên" để nhắc đồng nghiệp           │
  │                                          │
  │  * Hashtag             Tối đa 5          │
  │  [+ Hashtag] [#Dedicated ×] [#Team ×]    │
  │                                          │
  │  Image                 Tối đa 5          │
  │  [+ Image] [🖼 ×] [🖼 ×]                 │
  │                                          │
  │  ⬜ Gửi ẩn danh                           │
  │  [ Tên ẩn danh (nếu toggle ON) ]         │
  │                                          │
  │                      [Hủy]  [Gửi ▶]      │
  │                                          │
  └──────────────────────────────────────────┘
```

---

## Component Style Details

### Modal Container

- width 640px (desktop), 100vw (mobile)
- max-height 90vh + internal scroll
- background #00070C
- border 1px solid #998C5F
- border-radius 12px (top only on mobile)
- padding 24px
- box-shadow 0 20px 40px rgba(0,0,0,0.5)

### Form Field (standard)

| Property | Value |
|----------|-------|
| label | text-label muted, `*` prefix for required |
| input | h 44px, padding 14px 16px, bg rgba(255,255,255,0.05), border 1px solid #2E3940, radius 8px |
| focus | border #FFEA9E, outline none |

### Chip

| Property | Value |
|----------|-------|
| padding | 4px 10px |
| gap | 4px |
| radius | 9999px |
| bg | rgba(255,234,158,0.15) |
| color | #FFEA9E |
| close × | 12px, muted |

### Buttons

- **Submit (Gửi)**: bg #FFEA9E, text #00101A, radius 8px, h 44px, font-bold 14px, hover #fff8e1, disabled opacity 40%
- **Cancel (Hủy)**: transparent bg, border 1px solid #2E3940, text white, same dimensions
- **Toolbar button**: 32×32 square, bg transparent, hover bg #FFEA9E/10, icon 20×20 white (disabled: opacity 40%)

---

## Responsive

| Breakpoint | Layout |
|-----------|--------|
| Mobile (<768) | modal full width + top radius only |
| Tablet+ | modal 640px centered, all-radius |

---

## Implementation Mapping

| Design | Node ID | Component |
|--------|---------|-----------|
| Modal root | `520:11647` | `<WriteKudoModal />` |
| Title "Gửi lời…" | `520:9870` | `<h2>` |
| Recipient field | `520:9871` | `<RecipientPicker />` |
| Toolbar | `520:9877` | `<EditorToolbar />` (stub) |
| Textarea | `520:9886` | `<textarea>` |
| Hashtag field | `520:9890` | `<HashtagPicker />` |
| Image field | `520:9896` | `<ImageUploader />` |
| Anonymous toggle | `520:14099` | `<AnonymousToggle />` |
| Footer buttons | `520:9905` | `<SubmitFooter />` |

---

## Notes

- Toolbar buttons visible nhưng disabled để show design; không có Tiptap.
- Scrollbar tùy chỉnh: thin, track `#111C27`, thumb `#998C5F`.
- Focus ring bắt buộc trên tất cả interactive elements (a11y).
