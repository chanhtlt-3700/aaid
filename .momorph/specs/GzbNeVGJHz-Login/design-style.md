# Design Style: Login

**Frame ID**: `GzbNeVGJHz`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-10

---

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#00101A` / `rgba(0, 16, 26, 1)` | Page background |
| `--color-header-bg` | `rgba(11, 15, 18, 0.8)` | Header background (semi-transparent) |
| `--color-btn-login-bg` | `#FFEA9E` / `rgba(255, 234, 158, 1)` | Login button background |
| `--color-btn-login-text` | `#00101A` / `rgba(0, 16, 26, 1)` | Login button text |
| `--color-text-primary` | `#FFFFFF` / `rgba(255, 255, 255, 1)` | Body text, headings, labels |
| `--color-divider` | `#2E3940` | Footer top border |
| `--color-gradient-dark` | `#00101A` | Gradient overlay base color |
| `--color-gradient-dark-alt` | `#001320` / `rgba(0, 19, 32, 1)` | Bottom gradient overlay base |

### Typography

| Element | Font Family | Weight | Size | Line Height | Letter Spacing | Color |
|---------|-------------|--------|------|-------------|----------------|-------|
| Language selector text ("VN") | Montserrat | 700 (Bold) | 16px | 24px | 0.15px | `#FFFFFF` |
| Hero description | Montserrat | 700 (Bold) | 20px | 40px | 0.5px | `#FFFFFF` |
| Login button text | Montserrat | 700 (Bold) | 22px | 28px | 0px | `#00101A` |
| Footer copyright | Montserrat Alternates | 700 (Bold) | 16px | 24px | 0% | `#FFFFFF` |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Page side padding (desktop) | 144px | Header, hero section horizontal padding |
| Header vertical padding | 12px | Top and bottom of header |
| Hero section padding | 96px 144px | Vertical and horizontal padding |
| Hero content gap | 80px | Between key visual and text+button block |
| Text-to-button gap | 24px | Between description text and login button |
| Button internal padding | 16px 24px | Login button padding |
| Button icon gap | 8px | Between button text and Google icon |
| Footer padding | 40px 90px | Footer vertical and horizontal padding |
| Language selector padding | 16px | Internal padding of language button |

### Border Radius

| Element | Value |
|---------|-------|
| Login button | 8px |
| Language selector button | 4px |
| Page container | 0px |

---

## Component Styles

### A. Header (`662:14391`)

```css
/* Container */
display: flex;
width: 1440px; /* full-width */
height: 80px;
padding: 12px 144px;
align-items: center;
justify-content: space-between;
background: rgba(11, 15, 18, 0.8);
position: absolute; /* overlays hero */
top: 0;
z-index: 10;
```

**Responsive notes**:
- Mobile: padding `12px 24px`, logo scales to 40x36px
- Tablet: padding `12px 64px`

#### A.1 Logo (`I662:14391;186:2166`)

```css
width: 52px;
height: 48px; /* actual image container; parent frame is 52x56px */
```

- Asset: `saa-logo.png` (PNG)
- Figma node: `MM_MEDIA_Logo`

#### A.2 Language Selector (`I662:14391;186:1601`)

```css
/* Outer button */
display: flex;
width: 108px;
height: 56px;
padding: 16px;
align-items: center;
justify-content: space-between;
border-radius: 4px;
gap: 2px;
```

**Children**:
- Flag icon: 24x24px container, 20x15px flag SVG (`vn-flag.svg`)
- Text "VN": Montserrat Bold 16px/24px, white, letter-spacing 0.15px
- Down chevron: 24x24px icon (fallback — use inline SVG)

**States**:
- Default: Transparent background, white text
- Hover: Background `rgba(255, 255, 255, 0.1)`, cursor pointer

### B. Hero Section (`662:14393`)

```css
/* Container */
display: flex;
width: 1440px; /* full-width */
height: 845px;
padding: 96px 144px;
flex-direction: column;
align-items: flex-start;
position: relative;
```

**Responsive notes**:
- Mobile: padding `48px 24px`, height auto (min-height 100vh minus header/footer)
- Tablet: padding `64px 64px`

#### Background Layers (stacking order, bottom to top)

1. **C_Keyvisual** (`662:14388`): Full-screen background image
   ```css
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   object-fit: cover;
   z-index: 1;
   ```
   - Asset: `key-visual.png` (large decorative artwork)

2. **Left-to-right gradient** (`662:14392`):
   ```css
   position: absolute;
   width: 100%;
   height: 100%;
   background: linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0, 16, 26, 0.00) 100%);
   z-index: 2;
   ```

3. **Bottom-to-top gradient** (`662:14390`):
   ```css
   position: absolute;
   width: 100%;
   height: 100%;
   background: linear-gradient(0deg, #00101A 22.48%, rgba(0, 19, 32, 0.00) 51.74%);
   z-index: 3;
   ```

4. **Content** (z-index: 4) — text and buttons above gradients.

#### B.1 Key Visual Title (`662:14395`)

```css
display: flex;
width: 100%; /* constrained by parent */
flex-direction: column;
gap: 24px;
```

- "ROOT FURTHER" logo: 451x200px image
- Asset: `root-further.png` (PNG)
- Figma node: `MM_MEDIA_Root Further Logo`

**Responsive notes**:
- Mobile: max-width 280px, height auto (aspect-ratio preserved)
- Tablet: max-width 360px

#### B.2 Content Text (`662:14753`)

```css
width: 480px;
padding-left: 16px;
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 20px;
line-height: 40px;
letter-spacing: 0.5px;
color: #FFFFFF;
```

- Text content (Vietnamese):
  - Line 1: "Bắt đầu hành trình của bạn cùng SAA 2025."
  - Line 2: "Đăng nhập để khám phá!"

**Responsive notes**:
- Mobile: width 100%, font-size 16px, line-height 32px
- Tablet: width 100%, font-size 18px

#### B.3 Login Button (`662:14425`)

```css
/* Outer frame */
display: flex;
width: 305px;
height: 60px;
gap: 40px;
```

```css
/* Inner button (Instance: Button-IC About) */
display: flex;
padding: 16px 24px;
align-items: center;
gap: 8px;
border-radius: 8px;
background: #FFEA9E;
cursor: pointer;
```

**Children**:
- Text "LOGIN With Google": Montserrat Bold 22px/28px, color `#00101A` (trim trailing space from Figma)
- Google icon: 24x24px SVG (`google.svg`) — positioned **right** of text

**States**:
- Default: `background: #FFEA9E`
- Hover: `box-shadow: 0 4px 12px rgba(255, 234, 158, 0.4); transform: translateY(-1px);` (subtle elevation)
- Active/Pressed: `transform: translateY(0); box-shadow: 0 2px 6px rgba(255, 234, 158, 0.3);`
- Disabled/Loading: `opacity: 0.6; cursor: not-allowed;` + spinner replacing or next to Google icon
- Focus: `outline: 2px solid #FFEA9E; outline-offset: 2px;` (accessibility)

**Responsive notes**:
- Mobile: width 100% (full container width), font-size 18px
- Tablet: width auto, min-width 280px

### D. Footer (`662:14447`)

```css
display: flex;
width: 1440px; /* full-width */
padding: 40px 90px;
align-items: center;
justify-content: space-between;
border-top: 1px solid #2E3940;
```

**Text**: "Bản quyền thuộc về Sun* © 2025"
```css
font-family: 'Montserrat Alternates', sans-serif;
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
text-align: center;
```

**Responsive notes**:
- Mobile: padding `24px`, font-size 14px, text centered
- Tablet: padding `32px 48px`

---

## Gradient Overlays

The Login page uses two gradient overlays on top of the key visual background to ensure text readability:

| Overlay | Direction | CSS |
|---------|-----------|-----|
| Left fade | Left → Right | `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0, 16, 26, 0.00) 100%)` |
| Bottom fade | Bottom → Top | `linear-gradient(0deg, #00101A 22.48%, rgba(0, 19, 32, 0.00) 51.74%)` |

Both overlays are absolutely positioned, covering the full hero area, and stacked between the background image and the content.

---

## Media Assets

| Asset Name | Figma Node ID | Type | Dimensions | File | Usage |
|------------|---------------|------|------------|------|-------|
| SAA 2025 Logo | `I662:14391;178:1033;178:1030` | PNG | 52x48px | `saa-logo.png` | Header logo |
| Vietnam Flag | `I662:14391;186:1696;186:1821;186:1709` | SVG | 20x15px | `vn-flag.svg` | Language selector flag |
| Root Further Logo | `2939:9548` | PNG | 451x200px | `root-further.png` | Hero title branding |
| Google Icon | `I662:14426;186:1766` | SVG | 24x24px | `google.svg` | Login button icon |
| Key Visual BG | `662:14389` | PNG | 1441x1022px | `key-visual.png` | Full-screen background artwork |
| Down Chevron | `I662:14391;186:1696;186:1821;186:1441` | SVG | 24x24px | N/A (null) | Language selector — use fallback inline SVG |

### Asset Download URLs (from MoMorph)

- SAA Logo: Available (PNG)
- VN Flag: Available (SVG)
- Root Further Logo: Available (PNG)
- Google Icon: Available (SVG)
- Key Visual BG: Part of frame background (use `get_frame_image` or extract)
- Down Chevron: Not available — create inline SVG fallback

---

## Implementation Mapping

| Figma Node | CSS / TailwindCSS | React Component |
|------------|-------------------|-----------------|
| `A_Header` | `fixed top-0 w-full flex items-center justify-between px-[144px] py-3 bg-[rgba(11,15,18,0.8)] z-10` | `<Header />` (Server Component) |
| `A.1_Logo` | `w-[52px] h-[48px]` + `<Image>` | Inside `<Header />` |
| `A.2_Language` | `flex items-center gap-1 px-4 py-4 rounded cursor-pointer hover:bg-white/10` | Inside `<Header />` |
| `C_Keyvisual` | `absolute inset-0 object-cover z-[1]` | Background `<Image>` in `<HeroSection />` |
| Gradient (left) | `absolute inset-0 z-[2]` + `bg-gradient-to-r from-[#00101A] via-[#00101A] to-transparent` | `<div>` overlay in `<HeroSection />` |
| Gradient (bottom) | `absolute inset-0 z-[3]` + custom gradient via `style` prop | `<div>` overlay in `<HeroSection />` |
| `B.1_Key Visual` | `relative z-[4] max-w-[451px]` + `<Image>` | Inside `<HeroSection />` |
| `B.2_content` | `relative z-[4] font-montserrat font-bold text-xl leading-[40px] tracking-[0.5px] text-white pl-4` | `<p>` inside `<HeroSection />` |
| `B.3_Login` | `relative z-[4] flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg font-montserrat font-bold text-[22px] leading-7 text-[#00101A] hover:shadow-lg transition-all` | `<GoogleLoginButton />` (Client Component) |
| `D_Footer` | `w-full flex items-center justify-center px-[90px] py-10 border-t border-[#2E3940]` | `<Footer />` (Server Component) |

---

## Page Layout Structure

```
┌─────────────────────────────────────────┐
│  Header (fixed, z-10)                   │
│  [Logo]                    [VN ▼]       │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Key Visual BG (z-1)             │  │
│  │  Left Gradient (z-2)             │  │
│  │  Bottom Gradient (z-3)           │  │
│  │                                   │  │
│  │  Content (z-4):                   │  │
│  │    [ROOT FURTHER logo]            │  │
│  │                                   │  │
│  │    Bắt đầu hành trình...          │  │
│  │    Đăng nhập để khám phá!         │  │
│  │                                   │  │
│  │    [LOGIN With Google  G]         │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
├─────────────────────────────────────────┤
│  Footer                                 │
│  Bản quyền thuộc về Sun* © 2025         │
└─────────────────────────────────────────┘
```

---

## Responsive Behavior Summary

| Element | Mobile (320-767px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-------------------|--------------------|--------------------|
| Header padding | 12px 24px | 12px 64px | 12px 144px |
| Logo size | 40x36px | 48x44px | 52x48px |
| Language selector | Icon only (hide text on <480px) | Full (flag + VN + chevron) | Full |
| Hero padding | 48px 24px | 64px 64px | 96px 144px |
| ROOT FURTHER logo | max-width 280px | max-width 360px | 451x200px |
| Description text | 16px/32px | 18px/36px | 20px/40px |
| Login button | Full width | min-width 280px | 305px (auto) |
| Button text | 18px | 20px | 22px |
| Footer padding | 24px | 32px 48px | 40px 90px |
| Footer text | 14px | 16px | 16px |
