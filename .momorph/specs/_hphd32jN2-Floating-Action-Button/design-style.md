# Design Style: FAB + Kudos Rules Modal

**Frame IDs**: `_hphd32jN2` (FAB collapsed), `Sv7DFwBw1h` (FAB expanded), `b1Filzi9i6` (Rules modal)

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --color-fab-bg | #FFEA9E | Gold FAB |
| --color-fab-cancel-bg | #EF4444 | Cancel red |
| --color-fab-glow | #FAE287 | Glow shadow |
| --color-modal-bg | #00070C | Rules modal bg |
| --color-modal-border | #998C5F | Rules modal border |

### Typography

| Token | Value |
|-------|-------|
| --text-fab-label | Montserrat 16px bold tracking 0.15 |
| --text-rules-title | Montserrat 24px bold #FFEA9E |
| --text-rules-body | Montserrat 15px 400 #FFF line-height 24px |

---

## FAB Collapsed

- position: fixed bottom 32, right 32
- size: 106×64 (h-16 w-[106px])
- radius: 100px
- bg: #FFEA9E
- icons: pen 24, "/" 16 muted, SAA logo 24
- shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287
- z-index: 40

## FAB Expanded

Stack từ trên xuống, gap 16px:
- "Thể lệ" button: 149×64, gold #FFEA9E, radius 12, icon + label
- "Viết KUDOS" button: 149×64, gold #FFEA9E, radius 12, pen icon + label
- "×" cancel: 56×56 circle, red #EF4444, white × icon

Animation: fade + translateY slide-up 200ms

## Rules Modal

- width 720px desktop, 100vw mobile
- max-h 90vh, internal scroll
- bg #00070C, border 1px solid #998C5F, radius 12
- padding 24px
- sections: title (gold) + description + rewards list + 6-badge row + footer buttons

Badge row: 6 pill chips with emoji/icon + text (horizontal scrollable on mobile)

Footer: [Đóng] [Viết KUDOS] — same as Write Kudo Modal footer

---

## Responsive

- FAB: luôn bottom-right, scale nhẹ on hover
- Rules modal: mobile full-width, desktop 720

---

## Implementation Mapping

| Design | Node ID | Component |
|--------|---------|-----------|
| FAB collapsed | `313:9138` | `<FloatingActionButton>` collapsed state |
| FAB expanded: Thể lệ btn | `I313:9140;214:3799` | `<button>` inside expanded |
| FAB expanded: Viết KUDOS | `I313:9140;214:3732` | `<button>` inside expanded |
| FAB cancel | `I313:9140;214:3827` | `<button>` inside expanded |
| Rules modal root | `3204:6053` | `<KudosRulesModal>` |
| Rules modal footer | `3204:6092` | `<ModalFooter>` |

---

## Notes

- FAB và WriteKudoModal chia sẻ trạng thái `writeModalOpen` qua parent wrapper `<HomepageActionButtons>` hoặc component tương tự.
- Rules modal tái dùng pattern modal từ WriteKudoModal (backdrop, escape, focus).
