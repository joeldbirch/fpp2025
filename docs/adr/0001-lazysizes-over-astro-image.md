# Keep lazysizes + WP Offload CDN over Astro Image

We use lazysizes with images served from the existing WP Offload Media CDN (`assets.fppdesign.com.au`) rather than Astro's built-in `Image` component. Astro `Image` processes images at build time — the same slow build experience that motivated this migration away from Gatsby. WP Offload already generates responsive sizes and serves them from CDN. Lazysizes' `auto-sizes` feature eliminates the developer burden of maintaining `sizes` attributes as the design evolves.

**Considered options**:
- **Astro Image**: build-time resizing, blur-up placeholders, srcset generation. Same DX pain as Gatsby.
- **Native `loading="lazy"`**: zero JS, but loses auto-sizes and blur-up placeholder transitions.
- **lazysizes**: 3KB JS, auto-sizes, works with CDN-hosted images, no build cost.
