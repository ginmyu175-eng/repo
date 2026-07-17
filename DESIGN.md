---
name: Citrus Celebration
colors:
  surface: '#fbf9f1'
  surface-dim: '#dcdad2'
  surface-bright: '#fbf9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ec'
  surface-container: '#f0eee6'
  surface-container-high: '#eae8e0'
  surface-container-highest: '#e4e3db'
  on-surface: '#1b1c17'
  on-surface-variant: '#574235'
  inverse-surface: '#30312c'
  inverse-on-surface: '#f3f1e9'
  outline: '#8b7263'
  outline-variant: '#dec1af'
  surface-tint: '#954a00'
  primary: '#954a00'
  on-primary: '#ffffff'
  primary-container: '#ff8200'
  on-primary-container: '#5f2c00'
  inverse-primary: '#ffb785'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fcd400'
  on-secondary-container: '#6e5c00'
  tertiary: '#006e1c'
  on-tertiary: '#ffffff'
  tertiary-container: '#56b959'
  on-tertiary-container: '#00450e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc6'
  primary-fixed-dim: '#ffb785'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#723700'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#94f990'
  tertiary-fixed-dim: '#78dc77'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005313'
  background: '#fbf9f1'
  on-background: '#1b1c17'
  surface-variant: '#e4e3db'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  button-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is crafted to capture the zest and vitality of the Jeju Mandarin Expo. It balances the high-energy "festival" atmosphere with a professional, clean interface suitable for a world-class exhibition. 

The aesthetic is **High-Contrast Modernism**—utilizing bold, saturated citrus tones against expansive white and cream canvases. The brand personality is optimistic, organic, and accessible. It should evoke the feeling of a sun-drenched orchard through the use of vibrant gradients, soft organic shapes, and a spacious layout that avoids clutter.

## Colors

The palette is led by **Mandarin Orange**, a high-chroma hue used for primary actions and brand emphasis. **Citrus Yellow** acts as a supporting highlight to add warmth and sunshine, while **Leaf Green** provides a natural anchor, representing the lush groves of Jeju.

- **Primary (Mandarin):** Used for main CTA buttons, active states, and primary branding.
- **Secondary (Yellow):** Used for decorative accents, warnings, or highlights within cards.
- **Tertiary (Green):** Used for success states, environmental/nature-related content, and secondary tags.
- **Neutral (Cream & White):** Backgrounds should primarily use the soft cream to reduce eye strain, with pure white reserved for elevated card surfaces.
- **Text (Charcoal):** A warm-toned deep grey is used instead of pure black to maintain a soft, friendly contrast.

## Typography

This design system utilizes **Plus Jakarta Sans** for all headers to provide a friendly, modern, and slightly rounded geometric feel. Its bold weights are particularly effective for creating a festive hierarchy.

**Be Vietnam Pro** is used for body copy and labels. It offers exceptional legibility with a contemporary flair that complements the headline font without competing for attention.

- **Scalability:** Display sizes use tight leading and negative letter-spacing for a high-impact, editorial look.
- **Body Text:** Generous line-height (1.6) is maintained to ensure readability across long-form descriptions of expo events.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width of 1280px for desktop. It uses a 12-column system that collapses to 4 columns on mobile devices.

- **Rhythm:** An 8px base grid governs all spatial relationships.
- **Margins:** Desktop views should maintain a minimum of 48px outer margins, while mobile views use 20px.
- **White Space:** High "breathing room" is prioritized. Sections are separated by large vertical gaps (lg or xl units) to emphasize the clean, modern aesthetic.

## Elevation & Depth

Depth in the design system is achieved through **Tonal Layers** and **Ambient Shadows**. 

- **Surfaces:** The base layer is the soft cream (`#FFFDF5`). Interactive elements like cards sit on a pure white surface (`#FFFFFF`).
- **Shadows:** Instead of neutral greys, shadows are subtly tinted with the primary Mandarin Orange (e.g., `hsla(25, 100%, 20%, 0.08)`). They are highly diffused with a large blur radius to feel "airy" rather than "heavy."
- **Interactive Depth:** On hover, cards should slightly lift (increase shadow blur and Y-offset) and buttons should feel "squishy" by scaling slightly (98%) on click.

## Shapes

The shape language is consistently **Rounded**. Sharp corners are avoided to maintain the friendly and organic brand personality.

- **Standard Radius:** 0.5rem (8px) for small components like input fields.
- **Large Radius (LG):** 1rem (16px) for cards and containers.
- **Pill (Full):** Used for tags, chips, and specific "Floating Action Buttons" to mimic the rounded profile of a mandarin orange.

## Components

### Buttons
- **Primary:** Large (min-height 56px), Mandarin Orange background, white text. Bold, rounded corners. 
- **Secondary:** Leaf Green border (2px) with transparent background and green text.
- **Hover Effects:** Primary buttons should use a subtle glow effect (box-shadow) and shift to a slightly deeper orange on hover.

### Cards
- White background with a 1px soft cream border. 
- Image-led: Cards for the expo should feature high-quality photography of citrus or Jeju landscapes with a slight zoom-in effect on hover.

### Chips & Tags
- Used for categories (e.g., "Workshop," "Tasting," "Conference").
- Shape: Pill-shaped.
- Color: Soft pastel versions of the brand colors (e.g., light citrus yellow) with dark text.

### Input Fields
- Soft cream background with a focus state that highlights the border in Mandarin Orange and adds a subtle orange outer glow.

### Playful Elements
- **Leaf Detail:** Small green leaf icons or shapes can be used as decorative flourishes on the corners of cards or at the end of progress bars.