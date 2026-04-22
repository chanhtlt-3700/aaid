# Design Style: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-10

---

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#00101A` / `rgba(0, 16, 26, 1)` | Page root background |
| `--color-header-bg` | `rgba(16, 20, 23, 0.8)` | Header background (semi-transparent) |
| `--color-accent-gold` | `#FFEA9E` / `rgba(255, 234, 158, 1)` | Primary accent — CTA buttons, highlighted text, selected nav, section titles |
| `--color-accent-gold-10` | `rgba(255, 234, 158, 0.10)` | Outlined button background (10% gold) |
| `--color-border-gold` | `#998C5F` | Outlined button border, gold accent borders |
| `--color-text-primary` | `#FFFFFF` / `rgba(255, 255, 255, 1)` | Body text, nav links, labels |
| `--color-text-dark` | `#00101A` / `rgba(0, 16, 26, 1)` | Text on gold backgrounds (buttons) |
| `--color-divider` | `#2E3940` | Footer top border |
| `--color-gradient-base` | `#00101A` | Hero gradient overlay base |
| `--color-gradient-mid` | `rgba(0, 18, 29, 0.46)` | Hero gradient mid-stop |
| `--color-gradient-transparent` | `rgba(0, 19, 32, 0.00)` | Hero gradient end (transparent) |
| `--color-glow-gold` | `#FAE287` | Box-shadow glow on award cards and widget button |
| `--color-shadow-dark` | `rgba(0, 0, 0, 0.25)` | General drop shadow |
| `--color-kudos-watermark` | `#DBD1C1` / `rgba(219, 209, 193, 1)` | "KUDOS" watermark text |

### Typography

| Element | Font Family | Weight | Size | Line Height | Letter Spacing | Color |
|---------|-------------|--------|------|-------------|----------------|-------|
| Nav link (normal) | Montserrat | 700 (Bold) | 14px | 20px | 0.1px | `#FFFFFF` |
| Nav link (selected) | Montserrat | 700 (Bold) | 14px | 20px | 0.1px | `#FFEA9E` |
| Language selector ("VN") | Montserrat | 700 (Bold) | 16px | 24px | — | `#FFFFFF` |
| "Coming soon" label | Montserrat | 700 (Bold) | 24px | 32px | — | `#FFFFFF` |
| Countdown digit | Digital Numbers | 400 (Regular) | 49px | — | — | `#FFFFFF` |
| Countdown unit (DAYS etc.) | Montserrat | 700 (Bold) | 24px | 32px | — | `#FFFFFF` |
| Event info label | Montserrat | 700 (Bold) | 16px | 24px | 0.15px | `#FFFFFF` |
| Event info value | Montserrat | 700 (Bold) | 24px | 32px | — | `#FFEA9E` |
| Livestream note | Montserrat | 700 (Bold) | 16px | 24px | 0.5px | `#FFFFFF` |
| CTA button text (filled) | Montserrat | 700 (Bold) | 22px | 28px | — | `#00101A` |
| CTA button text (outlined) | Montserrat | 700 (Bold) | 22px | 28px | — | `#FFFFFF` |
| Root Further body text | Montserrat | 700 (Bold) | 24px | 32px | — | `#FFFFFF` |
| Root Further quote | Montserrat | 700 (Bold) | 20px | 32px | — | `#FFFFFF` |
| Section caption | Montserrat | 700 (Bold) | 24px | 32px | — | `#FFFFFF` |
| Section title | Montserrat | 700 (Bold) | 57px | 64px | -0.25px | `#FFEA9E` |
| Award card title | Montserrat | 400 (Regular) | 24px | 32px | — | `#FFEA9E` |
| Award card description | Montserrat | 400 (Regular) | 16px | 24px | 0.5px | `#FFFFFF` |
| Award "Chi tiet" link | Montserrat | 500 (Medium) | 16px | 24px | 0.15px | `#FFFFFF` |
| Kudos description | Montserrat | 700 (Bold) | 16px | 24px | 0.5px | `#FFFFFF` |
| Kudos "Chi tiet" button | Montserrat | 700 (Bold) | 16px | 24px | — | `#00101A` |
| Kudos watermark | SVN-Gotham | 400 (Regular) | 96px | — | -13% | `#DBD1C1` |
| Widget "/" text | Montserrat | 700 (Bold) | 24px | 32px | — | `#00101A` |
| Footer nav links | Montserrat | 700 (Bold) | 16px | 24px | 0.15px | `#FFFFFF` |
| Footer copyright | Montserrat Alternates | 700 (Bold) | 16px | 24px | — | `#FFFFFF` |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Page side padding (desktop) | 144px | Header, main content horizontal padding |
| Header vertical padding | 12px | Top and bottom of header |
| Header nav gap | 24px | Between navigation links |
| Main content vertical padding | 96px | Top/bottom of main content container |
| Main section gap | 120px | Between major page sections |
| Hero content gap | 40px | Between hero sub-sections |
| Countdown column gap | 40px | Between countdown tiles |
| Countdown digit gap | 14px | Between individual digits and unit label |
| CTA button gap | 40px | Between "ABOUT AWARDS" and "ABOUT KUDOS" buttons |
| Button internal padding | 16px 24px | CTA button padding |
| Button internal gap | 8px | Between button text and icon |
| Root Further container padding | 120px 104px | Inner padding of Root Further box |
| Root Further content gap | 32px | Between elements inside Root Further |
| Awards section header gap | 16px | Between caption and title |
| Award card gap | 24px | Between card image and text block |
| Award card text gap | 4px | Between title and description in card |
| Footer padding | 40px 90px | Footer vertical and horizontal padding |
| Footer nav gap | 80px | Between footer navigation links |

### Border & Radius

| Element | Value |
|---------|-------|
| CTA button (filled) | `border-radius: 8px` |
| CTA button (outlined) | `border: 1px solid #998C5F`, `border-radius: 8px` |
| Root Further container | `border-radius: 8px` |
| Nav hover state | `border-radius: 4px` |
| Selected nav bottom | `border-bottom: 1px solid #FFEA9E` |
| Widget button | `border-radius: 100px` (pill) |
| Footer top border | `border-top: 1px solid #2E3940` |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card-glow` | `0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 0 6px 0 #FAE287` | Award card images, widget button |
| `--shadow-nav-text` | `0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287` | Selected nav link text-shadow |

---

## Layout Specifications

### Container

| Property | Value |
|----------|-------|
| Page root width | 1512px |
| Page root height | 4480px (content-driven) |
| Page root background | `#00101A` |
| Main content container width | 1512px (outer), content area 1224px (with 144px side padding) |

### Grid

| Property | Value |
|----------|-------|
| Awards grid columns (desktop) | 3 columns |
| Awards grid columns (tablet) | 2 columns |
| Awards grid columns (mobile) | 1 column |
| Award card width | 336px per card |

### Page Layout (ASCII)

```
┌──────────────────────────────────────────────────────────────┐
│  A1 — Header (fixed, z-50)                           80px   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [Logo 52x48]   [Nav Links gap:24px]   [Bell][VN][User] │ │
│  │                 About SAA 2025 (gold, underline)        │ │
│  │                 Sun* Kudos (white)                      │ │
│  └─────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  3.5 — Hero / Keyvisual                           1392px     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Background: Key Visual (cover)                  z-1    │ │
│  │  Gradient overlay (12deg)                        z-2    │ │
│  │                                                         │ │
│  │  Content (z-3): padding 96px 144px                      │ │
│  │                                                         │ │
│  │  ┌── Hero Content (1224px) ──────────────────────────┐  │ │
│  │  │                                                   │  │ │
│  │  │  B1 — Countdown                                   │  │ │
│  │  │  ┌─────────────────────────────────────────────┐  │  │ │
│  │  │  │ "Coming soon"                               │  │  │ │
│  │  │  │ ┌──────┐  ┌──────┐  ┌──────┐               │  │  │ │
│  │  │  │ │  00  │  │  00  │  │  00  │               │  │  │ │
│  │  │  │ │ DAYS │  │ HOURS│  │ MINS │               │  │  │ │
│  │  │  │ └──────┘  └──────┘  └──────┘               │  │  │ │
│  │  │  └─────────────────────────────────────────────┘  │  │ │
│  │  │                                                   │  │ │
│  │  │  B2 — Event Info                                  │  │ │
│  │  │  ┌─────────────────────────────────────────────┐  │  │ │
│  │  │  │ Thoi gian: [value in gold]                  │  │  │ │
│  │  │  │ Dia diem:  [value in gold] | Livestream     │  │  │ │
│  │  │  └─────────────────────────────────────────────┘  │  │ │
│  │  │                                                   │  │ │
│  │  │  B3 — CTA Buttons                                 │  │ │
│  │  │  ┌──────────────┐  ┌──────────────────────┐       │  │ │
│  │  │  │ ABOUT AWARDS │  │ ABOUT KUDOS (outline)│       │  │ │
│  │  │  │  (gold fill) │  │ (gold border)        │       │  │ │
│  │  │  └──────────────┘  └──────────────────────┘       │  │ │
│  │  │                                                   │  │ │
│  │  └───────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  Bia — Main Content Container (padding: 96px 144px)          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                                                         │ │
│  │  B4 — Root Further Content                              │ │
│  │  ┌─────────────────────────────────────────────────┐    │ │
│  │  │ padding: 120px 104px, radius: 8px               │    │ │
│  │  │ [ROOT FURTHER logo 290x134]                     │    │ │
│  │  │ Main text (24px/32px bold white)                │    │ │
│  │  │ Quote text (20px/32px bold white italic)        │    │ │
│  │  │ Body paragraphs (24px/32px bold white)          │    │ │
│  │  └─────────────────────────────────────────────────┘    │ │
│  │                                      gap: 120px         │ │
│  │  C1 — Awards Section Header                             │ │
│  │  ┌─────────────────────────────────────────────────┐    │ │
│  │  │ "Sun* annual awards 2025" (24px white)          │    │ │
│  │  │ "He thong giai thuong" (57px gold)              │    │ │
│  │  └─────────────────────────────────────────────────┘    │ │
│  │                                      gap: implied       │ │
│  │  C2 — Awards Grid (3 columns)                           │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                │ │
│  │  │ Award 1  │ │ Award 2  │ │ Award 3  │                │ │
│  │  │ 336x504  │ │ 336x504  │ │ 336x504  │                │ │
│  │  └──────────┘ └──────────┘ └──────────┘                │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                │ │
│  │  │ Award 4  │ │ Award 5  │ │ Award 6  │                │ │
│  │  └──────────┘ └──────────┘ └──────────┘                │ │
│  │                                      gap: 120px         │ │
│  │  D1 — Sun* Kudos Section                                │ │
│  │  ┌─────────────────────────────────────────────────┐    │ │
│  │  │ "Phong trao ghi nhan" (24px white)              │    │ │
│  │  │ "Sun* Kudos" (57px gold)                        │    │ │
│  │  │ Description (16px white)                        │    │ │
│  │  │ "KUDOS" watermark (96px, #DBD1C1)               │    │ │
│  │  │ [Chi tiet] button                               │    │ │
│  │  └─────────────────────────────────────────────────┘    │ │
│  │                                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  6 — Widget Button (fixed, bottom-right)                     │
│  ┌────────┐                                                  │
│  │   /    │  106x64px pill, gold bg, glow shadow             │
│  └────────┘                                                  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  7 — Footer                                                  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [Logo 69x64]    [Nav links gap:80px]    [Copyright]     │ │
│  │                  border-top: 1px solid #2E3940          │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A1 — Header (`2167:9091`)

```css
/* Container */
display: flex;
width: 1512px;
height: 80px;
padding: 12px 144px;
align-items: center;
justify-content: space-between;
background: rgba(16, 20, 23, 0.8);
flex-direction: row;
position: fixed;
top: 0;
z-index: 50;
```

**Responsive notes**:
- Mobile: padding `12px 24px`, logo scales to 40x36px, nav collapses to hamburger menu
- Tablet: padding `12px 64px`

#### A1.1 Logo (`I2167:9091;178:1033`)

```css
width: 52px;
height: 48px;
```

- Asset: `saa-logo.png` (PNG)

#### A1.2 Navigation Links Container

```css
display: flex;
flex-direction: row;
gap: 24px;
align-items: center;
```

#### A1.3 Nav Link — Selected ("About SAA 2025")

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 14px;
line-height: 20px;
letter-spacing: 0.1px;
color: #FFEA9E;
border-bottom: 1px solid #FFEA9E;
text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287;
```

#### A1.4 Nav Link — Hover

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 14px;
line-height: 20px;
letter-spacing: 0.1px;
color: #FFFFFF;
background: rgba(255, 255, 255, 0.1);
border-radius: 4px;
```

#### A1.5 Nav Link — Normal ("Sun* Kudos")

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 14px;
line-height: 20px;
letter-spacing: 0.1px;
color: #FFFFFF;
```

#### A1.6 Right Controls

| Element | Size | Notes |
|---------|------|-------|
| Notification bell | 40x40px | Icon button |
| Language selector "VN" | auto | Montserrat 700 16px/24px white |
| User avatar | 40x40px | Circular avatar image |

---

### 3.5 — Hero / Keyvisual (`2167:9027`)

```css
/* Container */
width: 1512px;
height: 1392px;
position: relative;
overflow: hidden;
```

#### Background Layer

```css
/* Key visual background image */
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
object-fit: cover;
z-index: 1;
```

#### Gradient Overlay (`2167:9027` child)

```css
/* Diagonal gradient */
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
background: linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%);
z-index: 2;
```

---

### Bia — Main Content Container (`2167:9030`)

```css
display: flex;
width: 1512px;
height: 4220px;
padding: 96px 144px;
flex-direction: column;
gap: 120px;
align-items: center;
```

---

### Hero Content (`2167:9031`)

```css
display: flex;
width: 1224px;
height: 596px;
flex-direction: column;
gap: 40px;
position: relative;
z-index: 3;
```

---

### B1 — Countdown Section (`2167:9035`)

```css
/* Container */
display: flex;
width: 1224px;
height: 176px;
flex-direction: column;
gap: 16px;
```

#### B1.2 — "Coming soon" (`2167:9036`)

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
color: #FFFFFF;
text-align: left;
```

#### B1.3 — Countdown Row (`2167:9037`)

```css
display: flex;
flex-direction: row;
gap: 40px;
width: 429px;
```

---

### Countdown Tile (e.g. Days — `2167:9038`)

```css
/* Tile container */
display: flex;
width: 116px;
height: 128px;
flex-direction: column;
gap: 14px;
justify-content: center;
align-items: center;
```

#### Digits Row

```css
display: flex;
flex-direction: row;
gap: 14px;
width: 116px;
height: 82px;
align-items: center;
justify-content: center;
```

#### Each Digit

```css
font-family: 'Digital Numbers', monospace;
font-weight: 400;
font-size: 49px;
color: #FFFFFF;
```

#### Unit Label (DAYS / HOURS / MINS)

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
color: #FFFFFF;
text-transform: uppercase;
```

---

### B2 — Event Info (`2167:9053`)

```css
/* Container */
display: flex;
width: 637px;
height: 64px;
flex-direction: column;
gap: 8px;
```

#### Event Label ("Thoi gian:", "Dia diem:")

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.15px;
color: #FFFFFF;
display: inline;
```

#### Event Value

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
color: #FFEA9E;
display: inline;
```

#### Livestream Note

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.5px;
color: #FFFFFF;
display: inline;
```

---

### B3 — CTA Buttons (`2167:9062`)

```css
/* Container */
display: flex;
flex-direction: row;
gap: 40px;
width: 570px;
```

#### B3.1 — "ABOUT AWARDS" — Filled Button (`2167:9063`)

```css
/* Default state */
display: flex;
width: 276px;
height: 60px;
padding: 16px 24px;
align-items: center;
justify-content: center;
gap: 8px;
border-radius: 8px;
background: #FFEA9E;
cursor: pointer;
```

```css
/* Text */
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 22px;
line-height: 28px;
color: #00101A;
```

**States:**

| State | Changes |
|-------|---------|
| Default | `background: #FFEA9E; color: #00101A` |
| Hover | Swaps to outlined style: `background: rgba(255, 234, 158, 0.10); border: 1px solid #998C5F; color: #FFFFFF` |
| Active | `transform: scale(0.98)` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

#### B3.2 — "ABOUT KUDOS" — Outlined Button (`2167:9064`)

```css
/* Default state */
display: flex;
padding: 16px 24px;
align-items: center;
justify-content: center;
gap: 8px;
border-radius: 8px;
border: 1px solid #998C5F;
background: rgba(255, 234, 158, 0.10);
cursor: pointer;
```

```css
/* Text */
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 22px;
line-height: 28px;
color: #FFFFFF;
```

**States:**

| State | Changes |
|-------|---------|
| Default | `background: rgba(255, 234, 158, 0.10); border: 1px solid #998C5F; color: #FFFFFF` |
| Hover | Swaps to filled style: `background: #FFEA9E; border: none; color: #00101A` |
| Active | `transform: scale(0.98)` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

---

### B4 — Root Further Content (`5001:14827`)

```css
/* Outer container */
display: flex;
width: 1224px;
flex-direction: column;
align-items: center;
```

#### Frame 486 — Inner Container (`3204:10152`)

```css
display: flex;
width: 1152px;
padding: 120px 104px;
border-radius: 8px;
flex-direction: column;
gap: 32px;
```

#### ROOT FURTHER Logo

```css
width: 290px;
height: 134px;
/* Image asset */
```

#### Main Text

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
color: #FFFFFF;
```

#### Quote Text

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 20px;
line-height: 32px;
color: #FFFFFF;
font-style: italic;
```

#### Body Paragraphs

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
color: #FFFFFF;
```

---

### C1 — Awards Section Header (`2167:9069`)

```css
/* Container */
display: flex;
width: 1224px;
height: 129px;
flex-direction: column;
gap: 16px;
```

#### Caption ("Sun* annual awards 2025")

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
color: #FFFFFF;
```

#### Title ("He thong giai thuong")

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 57px;
line-height: 64px;
letter-spacing: -0.25px;
color: #FFEA9E;
```

---

### C2 — Awards Grid (`5005:14974`)

```css
/* Grid container */
display: grid;
width: 1224px;
height: 1144px;
grid-template-columns: repeat(3, 336px);
gap: 24px; /* calculated from available space */
justify-content: space-between;
```

---

### Award Card (e.g. Top Talent — `2167:9075`)

```css
/* Card container */
display: flex;
width: 336px;
height: 504px; /* approximate, content-driven */
flex-direction: column;
gap: 24px;
```

#### Card Image (Picture-Award)

```css
width: 336px;
height: 336px;
padding: 150px 53px; /* centers content within frame */
box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 0 6px 0 #FAE287;
mix-blend-mode: screen;
```

#### Card Text Container

```css
display: flex;
width: 336px;
height: 144px;
flex-direction: column;
gap: 4px;
```

#### Card Title

```css
font-family: 'Montserrat', sans-serif;
font-weight: 400;
font-size: 24px;
line-height: 32px;
color: #FFEA9E;
```

#### Card Description

```css
font-family: 'Montserrat', sans-serif;
font-weight: 400;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.5px;
color: #FFFFFF;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
```

#### "Chi tiet" Link

```css
font-family: 'Montserrat', sans-serif;
font-weight: 500;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.15px;
color: #FFFFFF;
display: inline-flex;
align-items: center;
gap: 4px;
cursor: pointer;
```

**States:**

| State | Changes |
|-------|---------|
| Default | `color: #FFFFFF` |
| Hover | `color: #FFEA9E; text-decoration: underline` |

---

### D1 — Sun* Kudos Section (`3390:10349`)

```css
/* Outer container */
display: flex;
width: 1224px;
height: 500px;
flex-direction: column;
align-items: center;
justify-content: center;
```

#### Inner Container (SunKudos)

```css
width: 1120px;
height: 500px;
position: relative;
```

#### Section Caption ("Phong trao ghi nhan")

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
color: #FFFFFF;
```

#### Section Title ("Sun* Kudos")

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 57px;
line-height: 64px;
letter-spacing: -0.25px;
color: #FFEA9E;
```

#### Description

```css
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.5px;
color: #FFFFFF;
```

#### "KUDOS" Watermark

```css
font-family: 'SVN-Gotham', sans-serif;
font-weight: 400;
font-size: 96px;
letter-spacing: -13%;
color: #DBD1C1;
position: absolute;
opacity: 0.1; /* visual decorative, low prominence */
user-select: none;
pointer-events: none;
```

#### "Chi tiet" Button

```css
display: flex;
padding: 16px 24px;
align-items: center;
justify-content: center;
border-radius: 8px;
background: #FFEA9E;
cursor: pointer;
```

```css
/* Text */
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #00101A;
```

---

### 6 — Widget Button (`5022:15169`)

```css
/* Positioning */
position: fixed;
top: 830px;
right: 19px;
z-index: 100;
```

```css
/* Button */
display: flex;
width: 106px;
height: 64px;
padding: 16px;
align-items: center;
justify-content: center;
border-radius: 100px; /* pill shape */
background: #FFEA9E;
box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 0 6px 0 #FAE287;
cursor: pointer;
```

```css
/* "/" text */
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
color: #00101A;
```

**States:**

| State | Changes |
|-------|---------|
| Default | As specified above |
| Hover | `box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.35), 0 0 12px 0 #FAE287; transform: scale(1.05)` |
| Active | `transform: scale(0.98)` |

---

### 7 — Footer (`5001:14800`)

```css
/* Container */
display: flex;
width: 1512px;
padding: 40px 90px;
flex-direction: row;
align-items: center;
justify-content: space-between;
border-top: 1px solid #2E3940;
```

#### Footer Logo

```css
width: 69px;
height: 64px;
```

#### Footer Nav Links

```css
display: flex;
flex-direction: row;
gap: 80px;
```

```css
/* Each link */
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.15px;
color: #FFFFFF;
cursor: pointer;
```

#### Footer Copyright

```css
font-family: 'Montserrat Alternates', sans-serif;
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
```

---

## Component Hierarchy with Styles

```
Page Root (bg: #00101A, 1512x4480)
│
├── A1_Header (fixed, z-50, flex row, bg: rgba(16,20,23,0.8), p: 12px 144px, h: 80px)
│   ├── Logo (52x48px, image)
│   ├── NavLinks (flex row, gap: 24px)
│   │   ├── NavLink[selected] (Montserrat 700 14px/20px, #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow glow)
│   │   ├── NavLink[hover] (Montserrat 700 14px/20px, white, bg rgba(255,255,255,0.1), radius: 4px)
│   │   └── NavLink[normal] (Montserrat 700 14px/20px, white)
│   └── RightControls (flex row)
│       ├── NotificationBell (40x40px)
│       ├── LanguageSelector "VN" (Montserrat 700 16px/24px, white)
│       └── UserAvatar (40x40px)
│
├── 3.5_Hero (relative, 1512x1392)
│   ├── KeyVisual_BG (absolute, cover, z-1)
│   ├── GradientOverlay (absolute, z-2, linear-gradient 12deg)
│   └── HeroContent (z-3, 1224px, flex col, gap: 40px)
│       │
│       ├── B1_Countdown (flex col, gap: 16px)
│       │   ├── "Coming soon" (Montserrat 700 24px/32px, white)
│       │   └── CountdownRow (flex row, gap: 40px, w: 429px)
│       │       ├── Tile_Days (116x128, flex col, gap: 14px)
│       │       │   ├── DigitsRow (flex row, gap: 14px)
│       │       │   │   ├── Digit (Digital Numbers 400 49px, white)
│       │       │   │   └── Digit (Digital Numbers 400 49px, white)
│       │       │   └── "DAYS" (Montserrat 700 24px/32px, white)
│       │       ├── Tile_Hours (same structure)
│       │       └── Tile_Mins (same structure)
│       │
│       ├── B2_EventInfo (flex col, gap: 8px, w: 637px)
│       │   ├── TimeRow: Label (Montserrat 700 16px/24px, white, ls: 0.15px) + Value (Montserrat 700 24px/32px, #FFEA9E)
│       │   └── LocationRow: Label + Value + Livestream note (Montserrat 700 16px/24px, white, ls: 0.5px)
│       │
│       └── B3_CTAButtons (flex row, gap: 40px, w: 570px)
│           ├── "ABOUT AWARDS" (276x60, bg: #FFEA9E, radius: 8px, p: 16px 24px, Montserrat 700 22px/28px, #00101A)
│           └── "ABOUT KUDOS" (border: 1px solid #998C5F, bg: rgba(255,234,158,0.1), radius: 8px, p: 16px 24px, Montserrat 700 22px/28px, white)
│
├── Bia_MainContent (flex col, p: 96px 144px, gap: 120px, center)
│   │
│   ├── B4_RootFurther (w: 1224px)
│   │   └── Frame486 (w: 1152px, p: 120px 104px, radius: 8px, flex col, gap: 32px)
│   │       ├── RootFurtherLogo (290x134px, image)
│   │       ├── MainText (Montserrat 700 24px/32px, white)
│   │       ├── Quote (Montserrat 700 20px/32px, white, italic)
│   │       └── BodyParagraphs (Montserrat 700 24px/32px, white)
│   │
│   ├── C1_AwardsHeader (flex col, gap: 16px, w: 1224px)
│   │   ├── Caption (Montserrat 700 24px/32px, white)
│   │   └── Title (Montserrat 700 57px/64px, #FFEA9E, ls: -0.25px)
│   │
│   ├── C2_AwardsGrid (grid 3col, w: 1224px, h: 1144px)
│   │   └── AwardCard (336px wide, flex col, gap: 24px) x N
│   │       ├── CardImage (336x336, box-shadow glow, mix-blend-mode: screen)
│   │       └── CardText (flex col, gap: 4px, h: 144px)
│   │           ├── Title (Montserrat 400 24px/32px, #FFEA9E)
│   │           ├── Description (Montserrat 400 16px/24px, white, ls: 0.5px, 2-line clamp)
│   │           └── "Chi tiet" (Montserrat 500 16px/24px, white, ls: 0.15px, + arrow icon)
│   │
│   └── D1_SunKudos (flex col, center, 1224x500)
│       └── Inner (1120x500, relative)
│           ├── Caption (Montserrat 700 24px/32px, white)
│           ├── Title (Montserrat 700 57px/64px, #FFEA9E, ls: -0.25px)
│           ├── Description (Montserrat 700 16px/24px, white, ls: 0.5px)
│           ├── Watermark "KUDOS" (SVN-Gotham 400 96px, #DBD1C1, ls: -13%, absolute)
│           └── "Chi tiet" Button (bg: #FFEA9E, radius: 8px, Montserrat 700 16px/24px, #00101A)
│
├── 6_WidgetButton (fixed, right: 19px, top: 830px)
│   └── PillButton (106x64, radius: 100px, bg: #FFEA9E, shadow glow)
│       └── "/" (Montserrat 700 24px/32px, #00101A)
│
└── 7_Footer (flex row, p: 40px 90px, justify-between, border-top: 1px solid #2E3940)
    ├── Logo (69x64px)
    ├── NavLinks (flex row, gap: 80px, Montserrat 700 16px/24px, white, ls: 0.15px)
    └── Copyright (Montserrat Alternates 700 16px/24px, white)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | -- |

### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Header | padding: `12px 24px`, nav links collapse to hamburger menu, logo: 40x36px |
| Hero section | height: auto (min-height 100vh), gradient adjusts for vertical readability |
| Main content padding | `48px 24px` |
| Section gap | 64px (reduced from 120px) |
| Countdown row | flex-wrap: wrap, gap: 16px, tiles shrink to ~90px wide |
| Countdown digit | font-size: 36px |
| Event info | width: 100%, font-size adjustments: value 20px |
| CTA buttons | flex-direction: column, gap: 16px, buttons full width |
| CTA button text | font-size: 18px |
| Root Further padding | 48px 24px |
| Root Further body text | font-size: 18px, line-height: 28px |
| Section title (57px) | font-size: 32px, line-height: 40px |
| Section caption | font-size: 18px |
| Awards grid | grid-template-columns: 1fr, cards full width (max-width: 336px centered) |
| Award card image | width: 100%, height: auto (aspect-ratio 1/1) |
| Kudos section | height: auto, width: 100% |
| Kudos watermark | font-size: 48px |
| Widget button | width: 80px, height: 48px, font-size: 18px |
| Footer | flex-direction: column, gap: 24px, padding: 24px, text-align: center |
| Footer nav | flex-direction: column, gap: 16px |

### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | padding: `12px 64px`, full nav visible |
| Hero section | height: auto, min-height: 900px |
| Main content padding | `64px 64px` |
| Section gap | 80px |
| Countdown row | gap: 24px |
| CTA buttons | gap: 24px |
| Root Further padding | 80px 64px |
| Section title (57px) | font-size: 44px, line-height: 52px |
| Awards grid | grid-template-columns: repeat(2, 1fr), 2 columns |
| Kudos section | width: 100% |
| Kudos watermark | font-size: 72px |
| Footer | padding: `32px 48px` |
| Footer nav gap | 40px |

### Desktop (1024px+)

| Component | Changes |
|-----------|---------|
| All components | Use Figma specifications as defined (1512px design width) |
| Max-width | Content area caps at 1224px (1512px - 2 * 144px padding) |
| Awards grid | 3 columns at 336px each |

---

## Icon Specifications

| Icon Name | Size (Container) | Size (Actual) | Format | Location |
|-----------|-----------------|---------------|--------|----------|
| SAA Logo (header) | 52x48px | 52x48px | PNG | Header left |
| Notification bell | 40x40px | 24x24px (inner) | SVG | Header right controls |
| User avatar | 40x40px | 40x40px (circular) | PNG/JPG | Header right controls |
| Down chevron (language) | 24x24px | 16x16px | SVG | Language selector |
| Arrow right (award card) | 16x16px | 16x16px | SVG | "Chi tiet" link in award cards |
| SAA Logo (footer) | 69x64px | 69x64px | PNG | Footer left |
| VN flag | 24x24px | 20x15px | SVG | Language selector |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger | Description |
|---------|----------|----------|--------|---------|-------------|
| Nav link | color, border-bottom, text-shadow | 200ms | ease-in-out | Hover / Active | Transition between normal white and selected gold with glow |
| Nav link hover bg | background-color | 150ms | ease-in-out | Hover | Subtle background appears on hover |
| CTA button (filled) | background, color, border | 250ms | ease-in-out | Hover | Filled swaps to outlined appearance |
| CTA button (outlined) | background, color, border | 250ms | ease-in-out | Hover | Outlined swaps to filled appearance |
| CTA button | transform | 100ms | ease-out | Active | Scale down to 0.98 on press |
| Award card | transform, box-shadow | 300ms | ease-out | Hover | Slight lift: `translateY(-4px)`, enhanced shadow |
| Award "Chi tiet" link | color | 150ms | ease-in-out | Hover | White to gold color transition |
| Countdown digits | — | 1000ms | — | Interval (1s) | Digits update every second (JS-driven, no CSS animation) |
| Countdown digit change | opacity, transform | 300ms | ease-out | Value change | Fade/slide transition when digit changes: `opacity: 0 -> 1, translateY(-8px) -> 0` |
| Widget button | transform, box-shadow | 200ms | ease-out | Hover | Scale up to 1.05, enhanced glow shadow |
| Widget button | transform | 100ms | ease-out | Active | Scale down to 0.98 |
| Footer link | color | 150ms | ease-in-out | Hover | White to gold transition |
| Page scroll | scroll-behavior | smooth | — | Anchor navigation | Smooth scroll to sections from nav links |

---

## Implementation Mapping

| Figma Node | Node ID | Tailwind / CSS | React Component |
|------------|---------|----------------|-----------------|
| Page Root | `2167:9026` | `min-h-screen bg-[#00101A]` | `<HomepageSAA />` (Server Component) |
| A1_Header | `2167:9091` | `fixed top-0 w-full h-20 flex items-center justify-between px-[144px] py-3 bg-[rgba(16,20,23,0.8)] z-50 backdrop-blur-sm` | `<Header />` (Client Component) |
| A1.1_Logo | `I2167:9091;178:1033` | `w-[52px] h-[48px]` + `<Image>` | Inside `<Header />` |
| A1_NavLinks | — | `flex items-center gap-6` | `<NavLinks />` inside `<Header />` |
| A1_NavLink[selected] | — | `font-montserrat font-bold text-sm leading-5 tracking-[0.1px] text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | `<NavLink active />` |
| A1_NavLink[normal] | — | `font-montserrat font-bold text-sm leading-5 tracking-[0.1px] text-white hover:bg-white/10 hover:rounded` | `<NavLink />` |
| A1_RightControls | — | `flex items-center gap-4` | Inside `<Header />` |
| 3.5_Hero | `2167:9027` | `relative w-full h-[1392px] overflow-hidden` | `<HeroSection />` (Server Component) |
| Hero_KeyVisual | — | `absolute inset-0 object-cover z-[1]` | `<Image>` in `<HeroSection />` |
| Hero_Gradient | — | `absolute inset-0 z-[2]` + `style={{ background: 'linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%)' }}` | `<div>` overlay in `<HeroSection />` |
| HeroContent | `2167:9031` | `relative z-[3] w-[1224px] flex flex-col gap-10` | `<div>` in `<HeroSection />` |
| B1_Countdown | `2167:9035` | `flex flex-col gap-4 w-[1224px]` | `<CountdownSection />` (Client Component) |
| B1.2_Label | `2167:9036` | `font-montserrat font-bold text-2xl leading-8 text-white` | `<h2>` in `<CountdownSection />` |
| B1.3_CountdownRow | `2167:9037` | `flex gap-10 w-[429px]` | `<div>` in `<CountdownSection />` |
| CountdownTile | `2167:9038` | `flex flex-col gap-[14px] items-center justify-center w-[116px] h-[128px]` | `<CountdownTile />` |
| CountdownDigit | — | `font-['Digital_Numbers'] font-normal text-[49px] text-white` | `<span>` in `<CountdownTile />` |
| CountdownUnit | — | `font-montserrat font-bold text-2xl leading-8 text-white uppercase` | `<span>` in `<CountdownTile />` |
| B2_EventInfo | `2167:9053` | `flex flex-col gap-2 w-[637px]` | `<EventInfo />` (Server Component) |
| B2_Label | — | `font-montserrat font-bold text-base leading-6 tracking-[0.15px] text-white` | `<span>` in `<EventInfo />` |
| B2_Value | — | `font-montserrat font-bold text-2xl leading-8 text-[#FFEA9E]` | `<span>` in `<EventInfo />` |
| B3_CTAButtons | `2167:9062` | `flex gap-10 w-[570px]` | `<CTAButtons />` (Client Component) |
| B3.1_AboutAwards | `2167:9063` | `flex items-center justify-center w-[276px] h-[60px] px-6 py-4 bg-[#FFEA9E] rounded-lg font-montserrat font-bold text-[22px] leading-7 text-[#00101A] hover:bg-[rgba(255,234,158,0.1)] hover:border hover:border-[#998C5F] hover:text-white transition-all duration-250` | `<Button variant="filled" />` |
| B3.2_AboutKudos | `2167:9064` | `flex items-center justify-center px-6 py-4 border border-[#998C5F] bg-[rgba(255,234,158,0.1)] rounded-lg font-montserrat font-bold text-[22px] leading-7 text-white hover:bg-[#FFEA9E] hover:border-transparent hover:text-[#00101A] transition-all duration-250` | `<Button variant="outlined" />` |
| B4_RootFurther | `5001:14827` | `w-[1224px] flex flex-col items-center` | `<RootFurtherSection />` (Server Component) |
| B4_InnerFrame | `3204:10152` | `w-[1152px] p-[120px_104px] rounded-lg flex flex-col gap-8` | `<div>` in `<RootFurtherSection />` |
| B4_Logo | — | `w-[290px] h-[134px]` + `<Image>` | Inside `<RootFurtherSection />` |
| C1_AwardsHeader | `2167:9069` | `flex flex-col gap-4 w-[1224px]` | `<SectionHeader />` (Server Component) |
| C1_Caption | — | `font-montserrat font-bold text-2xl leading-8 text-white` | `<p>` in `<SectionHeader />` |
| C1_Title | — | `font-montserrat font-bold text-[57px] leading-[64px] tracking-[-0.25px] text-[#FFEA9E]` | `<h2>` in `<SectionHeader />` |
| C2_AwardsGrid | `5005:14974` | `grid grid-cols-3 gap-6 w-[1224px]` (adjust gap to fit) | `<AwardsGrid />` (Server Component) |
| AwardCard | `2167:9075` | `flex flex-col gap-6 w-[336px] hover:-translate-y-1 transition-transform duration-300` | `<AwardCard />` (Client Component) |
| Card_Image | — | `w-[336px] h-[336px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] mix-blend-screen` | `<Image>` in `<AwardCard />` |
| Card_Title | — | `font-montserrat font-normal text-2xl leading-8 text-[#FFEA9E]` | `<h3>` in `<AwardCard />` |
| Card_Desc | — | `font-montserrat font-normal text-base leading-6 tracking-[0.5px] text-white line-clamp-2` | `<p>` in `<AwardCard />` |
| Card_Link | — | `font-montserrat font-medium text-base leading-6 tracking-[0.15px] text-white hover:text-[#FFEA9E] inline-flex items-center gap-1` | `<Link>` in `<AwardCard />` |
| D1_Kudos | `3390:10349` | `flex flex-col items-center justify-center w-[1224px] h-[500px]` | `<KudosSection />` (Server Component) |
| D1_Inner | — | `w-[1120px] h-[500px] relative` | `<div>` in `<KudosSection />` |
| D1_Title | — | `font-montserrat font-bold text-[57px] leading-[64px] tracking-[-0.25px] text-[#FFEA9E]` | `<h2>` in `<KudosSection />` |
| D1_Watermark | — | `absolute font-['SVN-Gotham'] font-normal text-[96px] tracking-[-13%] text-[#DBD1C1] select-none pointer-events-none` | `<span>` decorative in `<KudosSection />` |
| D1_Button | — | `flex items-center justify-center px-6 py-4 bg-[#FFEA9E] rounded-lg font-montserrat font-bold text-base leading-6 text-[#00101A]` | `<Button />` in `<KudosSection />` |
| 6_Widget | `5022:15169` | `fixed top-[830px] right-[19px] z-[100]` | `<WidgetButton />` (Client Component) |
| 6_PillButton | — | `flex items-center justify-center w-[106px] h-[64px] rounded-full bg-[#FFEA9E] shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] hover:scale-105 active:scale-[0.98] transition-all duration-200` | `<button>` in `<WidgetButton />` |
| 7_Footer | `5001:14800` | `w-full flex items-center justify-between px-[90px] py-10 border-t border-[#2E3940]` | `<Footer />` (Server Component) |
| 7_Logo | — | `w-[69px] h-[64px]` + `<Image>` | Inside `<Footer />` |
| 7_NavLinks | — | `flex gap-20` | `<nav>` in `<Footer />` |
| 7_NavLink | — | `font-montserrat font-bold text-base leading-6 tracking-[0.15px] text-white hover:text-[#FFEA9E] transition-colors duration-150` | `<Link>` in `<Footer />` |
| 7_Copyright | — | `font-['Montserrat_Alternates'] font-bold text-base leading-6 text-white` | `<p>` in `<Footer />` |

---

## Notes

- All gold accent colors (`#FFEA9E`, `#998C5F`, `#FAE287`) are part of the SAA brand palette and should be defined as CSS variables or Tailwind theme extensions for consistency.
- The `Digital Numbers` font is a specialty font for the countdown timer. Include it as a local web font (`@font-face`) with a monospace fallback.
- The `SVN-Gotham` font is used only for the "KUDOS" watermark. If unavailable, use a geometric sans-serif fallback (e.g., Gotham, Century Gothic).
- The hero gradient at 12 degrees is unusual. Use the exact CSS `linear-gradient(12deg, ...)` value from Figma.
- Award card images use `mix-blend-mode: screen` which requires a dark background to render correctly.
- The widget button uses `position: fixed` with `top: 830px`. For better UX, consider converting to `bottom: calc(100vh - 830px - 64px)` or a fixed bottom offset so it remains accessible on scroll.
- The countdown component requires JavaScript for real-time updates. Build as a Client Component with `useEffect` interval.
- CTA button hover states swap filled/outlined appearance. Use CSS transitions on `background`, `color`, and `border` with 250ms duration for smooth effect.
