---
name: Microblogging Design System
description: Playful & Friendly microblogging design system with soft lifted layers and active animations.
colors:
  primary: "#333333"              # Primary base (Deep Charcoal / Warm Ink)
  primary-foreground: "#fafafa"   # Primary text on dark backgrounds
  accent: "#f08b70"               # Playful Peach/Coral accent
  accent-foreground: "#ffffff"    # Text on peach accent
  background: "#ffffff"           # Standard background
  foreground: "#252525"           # Body text
  card: "#ffffff"                 # Card surface
  card-foreground: "#252525"      # Card text
  border: "#ebebeb"               # Standard border
  muted: "#f7f7f7"                # Muted gray elements
  muted-foreground: "#8c8c8c"     # Muted text
typography:
  display:
    fontFamily: "Geist Sans, Inter, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist Sans, Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  button-secondary:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
---

# Design System: Microblogging

## 1. Overview

**Creative North Star: "The Daily Playground"**

A cozy, warm, and highly tactile space where sharing is casual, and interactions feel soft, organic, and lively. The design is tuned to make microblogging feel less like an information firehose and more like a game or a friendly community bulletin board. Rather than a sterile web app, this interface feels physically responsive, inviting, and approachable.

It explicitly rejects cold, corporate tech-dashboard aesthetics (sharp corners, default monochrome shades, sterile forms) and infinite-scroll bloated timelines filled with high visual noise.

**Key Characteristics:**
- **Pill-Shaped & Rounded**: Generous round corners on cards, buttons, and badges, giving everything a soft, non-threatening appearance.
- **Warm Contrast**: Deep, warm ink charcoal paired with a vibrant peach/coral accent, avoiding the cold blue and harsh black palettes.
- **Physical Feedback**: Highly reactive button, link, and input states that shift or "pop" when interacted with.

## 2. Colors

A playful and welcoming palette defined by high-readability warm charcoal and friendly peach/coral highlights.

### Primary
- **Warm Ink** (`#333333` / `oklch(0.205 0 0)`): Used for primary text, headings, and high-emphasis solid buttons. Gives a softer reading experience than pure black.

### Secondary
- **Peach/Coral** (`#f08b70` / `oklch(0.7 0.15 35)`): Used for brand accentuation, highlights, active states, and focus rings. Evokes a sense of warmth and play.

### Neutral
- **Paper White** (`#ffffff` / `oklch(1 0 0)`): The primary canvas background.
- **Soft Border** (`#ebebeb` / `oklch(0.922 0 0)`): Soft gray divider line to separate sections without high visual weight.
- **Muted Gray** (`#f7f7f7` / `oklch(0.97 0 0)`): Used for secondary cards, inputs, and button backgrounds.

### Named Rules
**The Rarity Rule.** The vibrant Peach/Coral accent is used on ≤10% of any given screen. Its role is strictly to guide the user's eye to primary actions (like posting or checking updates) and highlight active tabs.
**The No-Pure-Black Rule.** Never use pure black (`#000000`) for text or backgrounds. Always use Warm Ink (`oklch(0.205 0 0)`) to maintain the approachable, softer aesthetic.

## 3. Typography

**Display Font:** Geist Sans (with Inter, system-ui, sans-serif fallbacks)
**Body Font:** Geist Sans (with Inter, system-ui, sans-serif fallbacks)

**Character:** Clean, highly legible geometric sans-serif that balances modern digital precision with friendly readability.

### Hierarchy
- **Display** (800, `clamp(2rem, 5vw, 3.5rem)`, 1.1): Used for main page titles and large welcome headlines.
- **Headline** (700, `1.5rem`, 1.25): Used for section headers.
- **Title** (600, `1.125rem`, 1.3): Used for subheadings and post titles.
- **Body** (400, `0.875rem`, 1.5): Used for post content and general copy. Max line length is restricted to 65–75ch for comfortable reading.
- **Label** (500, `0.75rem`, 1.4): Used for timestamps, counts, and metadata.

### Named Rules
**The Content Contrast Rule.** Body text must always maintain at least a 4.5:1 contrast ratio against the background. Muted helper text must be dark enough to be legible without strain.

## 4. Elevation

The system uses physical layering and soft structural shadows to establish depth. Surfaces are flat at rest but elevate or depress in response to user actions.

### Shadow Vocabulary
- **Card Shadow** (`box-shadow: 0 4px 12px oklch(0.145 0 0 / 4%)`): Soft structural shadow under cards to lift them slightly off the background canvas.
- **Active Lift** (`box-shadow: 0 8px 24px oklch(0.145 0 0 / 8%)`): Increased depth for hovered cards or open dropdowns.

### Named Rules
**The Hover Lift Rule.** Cards and buttons are flat or lightly shadowed at rest. On hover, they lift upward slightly (`transform: translateY(-2px)`) and gain a softer shadow.

## 5. Components

Every component features soft round shapes, tactile state transitions, and high color accessibility.

### Buttons
- **Shape**: Rounded corners (`var(--radius-md)` / `12px` or `var(--radius-lg)` / `20px` for pill style).
- **Primary**: Solid Warm Ink background with White text (`bg-primary text-primary-foreground`). On hover, transitions to Peach/Coral (`bg-accent`) with a subtle translate effect.
- **Secondary**: Light gray background with Warm Ink text (`bg-secondary text-secondary-foreground`).
- **Tactile State**: Active/press state translates the button downward (`translate-y-px`) to mimic a real button click.

### Cards / Containers
- **Corner Style**: Highly rounded (`var(--radius-lg)` / `20px`).
- **Background**: Pure Paper White (`bg-card`) or Muted Gray (`bg-muted`) for secondary content.
- **Shadow Strategy**: Uses Card Shadow to create a physical layer on top of the main background canvas.

### Inputs / Fields
- **Shape**: Muted Gray background, soft borders, and rounded corners (`var(--radius-md)` / `12px`).
- **Focus**: Transitions the border to Peach/Coral (`oklch(0.7 0.15 35)`) with a soft glow ring (`ring-3 ring-ring/50`).

### Navigation
- **Style**: Highly rounded pill indicators that highlight the active route using Peach/Coral or secondary backgrounds. Navigation links expand slightly on hover.

## 6. Do's and Don'ts

### Do:
- **Do** use large, bold display text (`clamp(2rem, 5vw, 3.5rem)`) for empty states and welcome screens to set a friendly tone.
- **Do** apply `text-wrap: balance` to headings to prevent awkward text wrapping on smaller devices.
- **Do** use `var(--radius-lg)` (20px) for all content card containers to maintain the soft playground aesthetic.

### Don't:
- **Don't** use sharp 90-degree corners on any button, card, or inputs.
- **Don't** build a busy, multi-sidebar layout that crowds the timeline with high visual noise.
- **Don't** animate image elements on hover. Hover animations should be restricted to container background shifts, translate-up lifts, or shadows.
- **Don't** use side-stripe borders as colored accents on cards.
