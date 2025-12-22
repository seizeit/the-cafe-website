# The.Cafe - Redesigned Website

A complete redesign of The.Cafe website, inspired by the logo's overlapping circles motif and modern design principles.

## Design Philosophy

The redesign is built around the logo's core elements:
- **Overlapping Circles**: The logo features two overlapping white circles, which inspired the geometric background elements throughout the site
- **Red Accent**: The red table in the logo becomes a strategic accent color for CTAs and highlights
- **Conversation Theme**: The chairs and table represent gathering and conversation, reflected in the content presentation

## Key Improvements

### Visual Design
- **Logo-Inspired Backgrounds**: Animated overlapping circles throughout sections, creating depth and visual interest
- **Enhanced Typography**: Better hierarchy with Space Grotesk for headings and Inter for body text
- **Sophisticated Animations**: Smooth scroll reveals, parallax effects, and hover interactions
- **Better Spacing**: Improved use of whitespace and 8px grid system

### User Experience
- **Fixed Header**: Sticky navigation with blur effect and scroll-based styling
- **Smooth Scrolling**: Enhanced anchor link navigation with proper offset
- **Scroll Animations**: Elements fade in as they enter the viewport
- **Interactive Cards**: Hover effects on service and work cards with subtle shadows

### Technical Enhancements
- **Performance**: Optimized animations with `requestAnimationFrame`
- **Accessibility**: Respects `prefers-reduced-motion` for users who need it
- **Responsive**: Fully responsive design that works on all devices
- **Modern CSS**: Uses CSS custom properties, modern layout techniques, and smooth transitions

## Files Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS design system
├── script.js           # Interactive features and animations
├── assets/
│   └── images/
│       └── logo-transparent.png  # Logo image
└── README.md           # This file
```

## Features

- **Hero Section**: Dramatic full-screen hero with animated background circles
- **Philosophy Section**: Three-column grid with icon-enhanced cards
- **Services Section**: Six service cards with hover effects
- **Result Flow**: Visual flow diagram showing the value proposition
- **Work Section**: Project showcase with detailed information
- **Contact Section**: Simple, focused contact CTA
- **Footer**: Brand information and navigation links

## Browser Support

Modern browsers that support:
- CSS Custom Properties
- Intersection Observer API
- CSS Grid and Flexbox
- Backdrop Filter

## Notes

The favicon files (favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png) are referenced in the HTML but need to be added to the `assets/images/` directory. You can generate these from the logo or download them from the original site.


